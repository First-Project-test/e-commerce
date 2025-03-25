const express = require("express")
const multer = require("multer")
const { uploadImage, uploadMultipleImages } = require("../controllers/cloudinary.js")
const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post("/upload", upload.single("image"), uploadImage)
router.post("/upload-multiple", upload.array("images", 5), uploadMultipleImages)

module.exports = router;
