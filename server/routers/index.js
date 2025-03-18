const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const electronicsRoutes = require('./electronicsRoutes');
const cloudinaryRoutes = require('./cloudinary');

// Mount routes
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/electronics', electronicsRoutes);
router.use('/cloudinary', cloudinaryRoutes);

module.exports = router;
