const express = require('express');
const {
  register,
  login,
  getMe,
  updatePassword
} = require('../controllers/auth.controller.prisma');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

module.exports = router;
