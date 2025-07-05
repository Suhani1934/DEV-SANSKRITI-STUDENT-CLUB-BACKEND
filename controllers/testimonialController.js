const Testimonial = require("../models/Testimonial");

// Student submits testimonial
exports.submitTestimonial = async (req, res) => {
  try {
    const { name, course, text, photo } = req.body;
    const testimonial = new Testimonial({ name, course, text, photo });
    await testimonial.save();
    res.status(200).json({ message: "Testimonial submitted, pending approval." });
  } catch (err) {
    console.error("[SUBMIT TESTIMONIAL ERROR]", err);
    res.status(500).json({ error: "Failed to submit testimonial." });
  }
};

// Admin gets pending testimonials
exports.getPendingTestimonials = async (req, res) => {
  try {
    const pending = await Testimonial.find({ status: 'pending' });
    res.json(pending);
  } catch (err) {
    console.error("[GET PENDING TESTIMONIALS ERROR]", err);
    res.status(500).json({ error: "Failed to fetch testimonials." });
  }
};

// Admin approves testimonial
exports.approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndUpdate(id, { status: 'approved' });
    res.json({ message: "Testimonial approved." });
  } catch (err) {
    console.error("[APPROVE TESTIMONIAL ERROR]", err);
    res.status(500).json({ error: "Failed to approve testimonial." });
  }
};

// Get approved testimonials for homepage
exports.getApprovedTestimonials = async (req, res) => {
  try {
    const approved = await Testimonial.find({ status: 'approved' });
    res.json(approved);
  } catch (err) {
    console.error("[GET APPROVED TESTIMONIALS ERROR]", err);
    res.status(500).json({ error: "Failed to fetch testimonials." });
  }
};
