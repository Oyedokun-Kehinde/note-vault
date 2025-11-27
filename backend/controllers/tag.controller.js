import Note from '../models/Note.model.js';
import Tag from '../models/Tag.model.js';

// @desc    Get all tags for user
// @route   GET /api/tags
// @access  Private
export const getTags = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id, deleted: false });
    
    // Extract all tags and count occurrences
    const tagCount = {};
    notes.forEach(note => {
      note.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    const tags = Object.entries(tagCount).map(([name, count]) => ({
      name,
      count
    })).sort((a, b) => b.count - a.count);

    res.json({
      success: true,
      count: tags.length,
      data: { tags }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get notes by tag
// @route   GET /api/tags/:tag/notes
// @access  Private
export const getNotesByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    const notes = await Note.find({
      userId: req.user.id,
      tags: tag.toLowerCase(),
      deleted: false
    }).sort({ updatedAt: -1 });

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
