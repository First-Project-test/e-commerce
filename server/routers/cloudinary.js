const express = require('express');
const router = express.Router();
const cloudinaryController = require('../controllers/cloudinary');
const { authMiddleware, adminMiddleware } = require('../controllers/userController')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Protected routes (require authentication and admin role)
router.use(authMiddleware, adminMiddleware);

// Upload single image
router.post('/upload', upload.single('image'), cloudinaryController.uploadImage);

// Upload multiple images
router.post('/upload-multiple', upload.array('images', 5), cloudinaryController.uploadMultipleImages);

// Delete image
router.delete('/:publicId', cloudinaryController.deleteImage);

module.exports = router;
