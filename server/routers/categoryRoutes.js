const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const { authMiddleware, adminMiddleware } = require('../controllers/userController')


router.get('/',categoryController.getAllCategories)
router.get('/:id',categoryController.getCategoryById)
router.get('/:name',categoryController.getCategoryByName)

router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory)
router.put('/:id', authMiddleware, adminMiddleware, categoryController.updateCategory)
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory)

module.exports = router;