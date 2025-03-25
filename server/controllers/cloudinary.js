const cloudinary = require("cloudinary").v2
require("dotenv").config()
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" })

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, uploadResult) => {
          if (error) reject(error)
          else resolve(uploadResult)
        }
      )
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream)
    })

    res.json({ url: result.secure_url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" })

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, uploadResult) => {
            if (error) reject(error)
            else resolve(uploadResult.secure_url)
          }
        )
        streamifier.createReadStream(file.buffer).pipe(uploadStream)
      })
    })

    const urls = await Promise.all(uploadPromises)
    res.json({ urls })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { uploadImage, uploadMultipleImages }
