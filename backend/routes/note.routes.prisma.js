const express = require('express');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleFavorite,
  getStats
} = require('../controllers/note.controller.prisma');
const { protect } = require('../middleware/auth.middleware.prisma');

const router = express.Router();

router.get('/stats', protect, getStats);
router.get('/', protect, getNotes);
router.get('/:id', protect, getNote);
router.post('/', protect, createNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);
router.patch('/:id/pin', protect, togglePin);
router.patch('/:id/favorite', protect, toggleFavorite);

module.exports = router;
