const prisma = require('../prisma/client');

// @desc    Get all notes for user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  try {
    const { search, category, archived, deleted, favorite, pinned } = req.query;
    
    const where = {
      userId: req.user.id,
      deleted: deleted === 'true' ? true : false,
    };

    if (archived !== undefined) {
      where.archived = archived === 'true';
    }
    if (favorite === 'true') {
      where.isFavorite = true;
    }
    if (pinned === 'true') {
      where.isPinned = true;
    }
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }

    const notes = await prisma.note.findMany({
      where,
      orderBy: [
        { isPinned: 'desc' },
        { updatedAt: 'desc' }
      ],
      include: {
        sharedWith: {
          include: {
            sharedWith: {
              select: {
                id: true,
                username: true,
                email: true,
                avatar: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
const getNote = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
      include: {
        sharedWith: {
          include: {
            sharedWith: {
              select: {
                id: true,
                username: true,
                email: true,
                avatar: true
              }
            }
          }
        },
        attachments: true,
        checkList: true
      }
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Check if user owns the note or has access
    if (note.userId !== req.user.id) {
      const sharedAccess = await prisma.sharedNote.findFirst({
        where: {
          noteId: note.id,
          sharedWithId: req.user.id
        }
      });

      if (!sharedAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this note'
        });
      }
    }

    // Increment view count
    await prisma.note.update({
      where: { id: note.id },
      data: { viewCount: { increment: 1 } }
    });

    res.json({
      success: true,
      data: note
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
const createNote = async (req, res) => {
  try {
    const { title, content, category, tags, color, cover, templateId } = req.body;

    const note = await prisma.note.create({
      data: {
        title: title || 'Untitled',
        content: content || '',
        category: category || 'General',
        tags: tags || [],
        color,
        cover,
        userId: req.user.id,
        templateId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
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
const updateNote = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id }
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    if (note.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this note'
      });
    }

    const updatedNote = await prisma.note.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete note (soft delete)
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id }
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    if (note.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this note'
      });
    }

    // Soft delete
    await prisma.note.update({
      where: { id: req.params.id },
      data: {
        deleted: true,
        deletedAt: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Note moved to trash'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle pin note
// @route   PATCH /api/notes/:id/pin
// @access  Private
const togglePin = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id }
    });

    if (!note || note.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    const updatedNote = await prisma.note.update({
      where: { id: req.params.id },
      data: { isPinned: !note.isPinned }
    });

    res.json({
      success: true,
      message: `Note ${updatedNote.isPinned ? 'pinned' : 'unpinned'}`,
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle favorite note
// @route   PATCH /api/notes/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id }
    });

    if (!note || note.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    const updatedNote = await prisma.note.update({
      where: { id: req.params.id },
      data: { isFavorite: !note.isFavorite }
    });

    res.json({
      success: true,
      message: `Note ${updatedNote.isFavorite ? 'added to' : 'removed from'} favorites`,
      data: updatedNote
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
const getStats = async (req, res) => {
  try {
    const [total, favorites, pinned, archived, deleted, byCategory] = await Promise.all([
      prisma.note.count({ where: { userId: req.user.id, deleted: false } }),
      prisma.note.count({ where: { userId: req.user.id, isFavorite: true, deleted: false } }),
      prisma.note.count({ where: { userId: req.user.id, isPinned: true, deleted: false } }),
      prisma.note.count({ where: { userId: req.user.id, archived: true, deleted: false } }),
      prisma.note.count({ where: { userId: req.user.id, deleted: true } }),
      prisma.note.groupBy({
        by: ['category'],
        where: { userId: req.user.id, deleted: false },
        _count: { category: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        overall: {
          total,
          favorites,
          pinned,
          archived,
          deleted
        },
        byCategory: byCategory.map(item => ({
          _id: item.category,
          count: item._count.category
        }))
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleFavorite,
  getStats
};
