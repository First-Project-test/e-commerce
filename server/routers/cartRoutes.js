const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../controllers/userController');

// All cart routes require authentication
router.use(authMiddleware);

// Cart routes
router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/:cartItemId', cartController.updateCartItem);
router.delete('/:cartItemId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router; 