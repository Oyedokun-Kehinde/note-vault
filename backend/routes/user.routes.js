import express from 'express';
import {
  getProfile,
  updateProfile,
  updatePreferences,
  searchUsers
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/preferences', updatePreferences);
router.get('/search', searchUsers);

export default router;
