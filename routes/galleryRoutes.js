const express = require('express');
const router = express.Router();
const { uploadImages ,getAllImages } = require("../controllers/galleryController");
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get('/', getAllImages);

router.post(
  "/upload",
  protect,
  adminOnly,
  upload.array("images", 10),
  uploadImages
);

module.exports = router;
