const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', gameController.getAllGames);
router.get('/search', gameController.searchGames);
router.get('/:id', gameController.getGameById);

// Admin routes (require authentication and admin role)
router.use(authMiddleware, adminMiddleware);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router; 