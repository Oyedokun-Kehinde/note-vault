import express from 'express';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleFavorite,
  shareNote,
  getNoteStats
} from '../controllers/note.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getNotes)
  .post(createNote);

router.get('/stats', getNoteStats);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

router.patch('/:id/pin', togglePin);
router.patch('/:id/favorite', toggleFavorite);
router.post('/:id/share', shareNote);

export default router;
