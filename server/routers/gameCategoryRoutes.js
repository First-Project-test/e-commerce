const express = require('express')
const router = express.Router()
const gameCategoryController = require('../controllers/gameCategoryController')
const { authenticateToken, isAdmin } = require('../middleware/auth')


router.get('/',gameCategoryController.getAllCategories)
router.get('/:id',gameCategoryController.getCategoryById)


router.post('/',authenticateToken, isAdmin, gameCategoryController.createCategory)
router.put('/:id',authenticateToken, isAdmin, gameCategoryController.updateCategory)
router.delete('/:id',authenticateToken, isAdmin, gameCategoryController.deleteCategory)

module.exports = router; 