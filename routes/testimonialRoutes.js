const express = require("express");
const router = express.Router();
const {submitTestimonial,getPendingTestimonials,approveTestimonial,getApprovedTestimonials} = require("../controllers/testimonialController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", upload.single("photo"),submitTestimonial);
router.get("/pending", protect, adminOnly, getPendingTestimonials);
router.put("/:id/approve", protect, adminOnly, approveTestimonial);
router.get("/approved", getApprovedTestimonials);

module.exports = router;
