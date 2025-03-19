const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes (no login needed)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (need to be logged in)
router.get('/profile', userController.authMiddleware, userController.getProfile);
router.put('/profile', userController.authMiddleware, userController.updateProfile);
router.put('/cart', userController.authMiddleware, userController.updateCart);

// Admin routes
router.get('/', userController.authMiddleware, userController.adminMiddleware, userController.getAllUsers);
router.delete('/:userId', userController.authMiddleware, userController.adminMiddleware, userController.deleteUser);

module.exports = router; 