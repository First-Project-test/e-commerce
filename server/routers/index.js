const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const electronicsRoutes = require('./electronicsRoutes');
const cloudinaryRoutes = require('./cloudinary');
const categoryRoutes = require('./categoryRoutes');
const cartRoutes = require('./cartRoutes');
const gameCategoryRoutes = require('./gameCategoryRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/electronics', electronicsRoutes);
router.use('/cloudinary', cloudinaryRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/game-categories', gameCategoryRoutes);

module.exports = router;
