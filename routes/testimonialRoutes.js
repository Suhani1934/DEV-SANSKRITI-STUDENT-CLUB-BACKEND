const express = require("express");
const router = express.Router();
const {submitTestimonial,getPendingTestimonials,approveTestimonial,getApprovedTestimonials, updateTestimonial, deleteTestimonial} = require("../controllers/testimonialController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", upload.single("photo"),submitTestimonial);
router.get("/pending", protect, adminOnly, getPendingTestimonials);
router.put("/:id/approve", protect, adminOnly, approveTestimonial);
router.put("/:id", protect, adminOnly, updateTestimonial);     
router.delete("/:id", protect, adminOnly, deleteTestimonial);
router.get("/approved", getApprovedTestimonials);

module.exports = router;
