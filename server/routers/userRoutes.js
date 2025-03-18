const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (require authentication)
router.use(authMiddleware);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/cart', userController.updateCart);

// Admin routes
router.use(adminMiddleware);
router.get('/', userController.getAllUsers);
router.delete('/:userId', userController.deleteUser);

module.exports = router; 