const express = require("express");
const router = express.Router();
const {
  submitTestimonial,
  getPendingTestimonials,
//   getApprovedTestimonials,
  approveTestimonial,
  cancelTestimonial,
  getAllTestimonials,
  updateTestimonial,
} = require("../controllers/testimonialController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// Student submits testimonial
router.post("/", upload.single("photo"), submitTestimonial);

// Admin: view + manage
// router.get("/approved", getApprovedTestimonials);
router.get("/pending", protect, adminOnly, getPendingTestimonials);
router.get("/all", protect, adminOnly, getAllTestimonials);
router.put("/:id/approve", protect, adminOnly, approveTestimonial);
router.put("/:id/cancel", protect, adminOnly, cancelTestimonial);
router.put("/:id", protect, adminOnly, updateTestimonial);

module.exports = router;
