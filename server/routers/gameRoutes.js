const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { authMiddleware, adminMiddleware } = require('../controllers/userController');

// Public routes
router.get('/', gameController.getAllGames);
router.get('/category/:categoryId', gameController.getGamesByCategory);
router.get('/:id', gameController.getGameById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, gameController.createGame);
router.put('/:id', authMiddleware, adminMiddleware, gameController.updateGame);
router.delete('/:id', authMiddleware, adminMiddleware, gameController.deleteGame);

module.exports = router; 