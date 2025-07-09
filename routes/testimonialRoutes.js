const express = require("express");
const router = express.Router();
const {
  submitTestimonial,
  getPendingTestimonials,
  approveTestimonial,
  cancelTestimonial,
  getAllTestimonials,
  updateTestimonial,
  getApprovedTestimonials,
} = require("../controllers/testimonialController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// Student submits testimonial
router.post("/", upload.single("photo"), submitTestimonial);

// Public route Testimonial Cards
router.get("/approved", getApprovedTestimonials);  

// Admin views
router.get("/all", protect, adminOnly, getAllTestimonials);
router.get("/pending", protect, adminOnly, getPendingTestimonials);

router.put("/:id/approve", protect, adminOnly, approveTestimonial);
router.put("/:id/cancel", protect, adminOnly, cancelTestimonial);
router.put("/:id", protect, adminOnly, updateTestimonial);

module.exports = router;
