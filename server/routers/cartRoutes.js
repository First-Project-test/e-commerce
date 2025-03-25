const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const { authMiddleware } = require('../controllers/userController')


router.use(authMiddleware)


router.post('/add', cartController.addToCart)
router.get('/', cartController.getCart)
router.put('/:cartItemId', cartController.updateCartItem)
router.delete('/:cartItemId', cartController.removeFromCart)
router.delete('/', cartController.clearCart)

module.exports = router