const express = require('express')
const router = express.Router()
const electronicsController = require('../controllers/electronicsController')
const { authMiddleware, adminMiddleware } = require('../controllers/userController')


router.get('/',electronicsController.getAllElectronics)
router.get('/search',electronicsController.searchElectronics)
router.get('/:id',electronicsController.getElectronicsById)




router.use(authMiddleware, adminMiddleware)
router.post('/', electronicsController.createElectronics)
router.put('/:id', electronicsController.updateElectronics)
router.put('/:id/stock', electronicsController.updateStock)
router.delete('/:id', electronicsController.deleteElectronics)

module.exports = router; 