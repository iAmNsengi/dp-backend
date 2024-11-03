const express = require('express');
const cors = require("cors");
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(cors())

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', auth, authController.getCurrentUser);
router.patch('/profile', auth, upload.single('profileImage'), authController.updateProfile);
router.post('/change-password', auth, authController.changePassword);
router.post('/logout', auth, authController.logout);

module.exports = router;
