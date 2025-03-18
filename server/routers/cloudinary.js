const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/cloudinary.js");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/upload", upload.single("image"), uploadImage);
module.exports = router;
