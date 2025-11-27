import Note from '../models/Note.model.js';

// @desc    Get all notes for logged in user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req, res) => {
  try {
    const { archived, deleted, category, tags, search, favorite, pinned } = req.query;

    // Build query
    let query = { userId: req.user.id };

    if (archived !== undefined) query.archived = archived === 'true';
    if (deleted !== undefined) query.deleted = deleted === 'true';
    if (category) query.category = category;
    if (favorite !== undefined) query.isFavorite = favorite === 'true';
    if (pinned !== undefined) query.isPinned = pinned === 'true';
    if (tags) query.tags = { $in: tags.split(',') };
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const notes = await Note.find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .populate('sharedWith.user', 'username email avatar');

    res.json({
      success: true,
      count: notes.length,
      data: { notes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('sharedWith.user', 'username email avatar');

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if user owns the note or has access
    const hasAccess = note.userId.toString() === req.user.id ||
      note.sharedWith.some(share => share.user._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this note'
      });
    }

    res.json({
      success: true,
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  try {
    const noteData = {
      ...req.body,
      userId: req.user.id
    };

    const note = await Note.create(noteData);

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check ownership or edit permission
    const hasEditAccess = note.userId.toString() === req.user.id ||
      note.sharedWith.some(share => 
        share.user.toString() === req.user.id && share.permission === 'edit'
      );

    if (!hasEditAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this note'
      });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Note updated successfully',
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Only owner can delete
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this note'
      });
    }

    await note.deleteOne();

    res.json({
      success: true,
      message: 'Note deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle note pin
// @route   PATCH /api/notes/:id/pin
// @access  Private
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      success: true,
      message: `Note ${note.isPinned ? 'pinned' : 'unpinned'} successfully`,
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle note favorite
// @route   PATCH /api/notes/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();

    res.json({
      success: true,
      message: `Note ${note.isFavorite ? 'added to' : 'removed from'} favorites`,
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Share note with another user
// @route   POST /api/notes/:id/share
// @access  Private
export const shareNote = async (req, res) => {
  try {
    const { userId, permission } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note || note.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Note not found or you do not have permission'
      });
    }

    // Check if already shared
    const alreadyShared = note.sharedWith.find(
      share => share.user.toString() === userId
    );

    if (alreadyShared) {
      return res.status(400).json({
        success: false,
        message: 'Note already shared with this user'
      });
    }

    note.sharedWith.push({ user: userId, permission });
    await note.save();

    res.json({
      success: true,
      message: 'Note shared successfully',
      data: { note }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get note statistics
// @route   GET /api/notes/stats
// @access  Private
export const getNoteStats = async (req, res) => {
  try {
    const stats = await Note.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          archived: {
            $sum: { $cond: ['$archived', 1, 0] }
          },
          deleted: {
            $sum: { $cond: ['$deleted', 1, 0] }
          },
          favorites: {
            $sum: { $cond: ['$isFavorite', 1, 0] }
          },
          pinned: {
            $sum: { $cond: ['$isPinned', 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Note.aggregate([
      { $match: { userId: req.user._id, deleted: false } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        overall: stats[0] || {},
        byCategory: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
