const express = require('express');
const router = express.Router();
const electronicsController = require('../controllers/electronicsController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', electronicsController.getAllElectronics);
router.get('/search', electronicsController.searchElectronics);
router.get('/:id', electronicsController.getElectronicsById);

// Admin routes (require authentication and admin role)
router.use(authMiddleware, adminMiddleware);
router.post('/', electronicsController.createElectronics);
router.put('/:id', electronicsController.updateElectronics);
router.put('/:id/stock', electronicsController.updateStock);
router.delete('/:id', electronicsController.deleteElectronics);

module.exports = router; 