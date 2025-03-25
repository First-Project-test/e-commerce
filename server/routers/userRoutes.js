const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.register)
router.post('/login', userController.login)


router.get('/profile', userController.authMiddleware, userController.getProfile)
router.put('/profile', userController.authMiddleware, userController.updateProfile)
router.put('/cart', userController.authMiddleware, userController.updateCart)


router.get('/', userController.authMiddleware, userController.adminMiddleware, userController.getAllUsers)
router.delete('/:userId', userController.authMiddleware, userController.adminMiddleware, userController.deleteUser)

module.exports = router; 