const express = require("express");
const router = express.Router();
const {submitTestimonial,getPendingTestimonials,approveTestimonial,getApprovedTestimonials} = require("../controllers/testimonialController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, submitTestimonial);
router.get("/pending", protect, adminOnly, getPendingTestimonials);
router.put("/:id/approve", protect, adminOnly, approveTestimonial);
router.get("/approved", getApprovedTestimonials);

module.exports = router;
