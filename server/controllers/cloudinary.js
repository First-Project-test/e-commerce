const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryController = {
  uploadImage: async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "uploads" }, (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }).end(req.file.buffer);
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  uploadMultipleImages: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: "uploads" }, (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          }).end(file.buffer);
        });
      });

      const results = await Promise.all(uploadPromises);
      res.json({ urls: results.map(result => result.secure_url) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteImage: async (req, res) => {
    try {
      const { publicId } = req.params;
      await cloudinary.uploader.destroy(publicId);
      res.json({ message: "Image deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = cloudinaryController;
