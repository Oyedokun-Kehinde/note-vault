import express from 'express';
import { getTags, getNotesByTag } from '../controllers/tag.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getTags);
router.get('/:tag/notes', getNotesByTag);

export default router;
