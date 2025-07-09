const Testimonial = require("../models/Testimonial");

// Student submits testimonial
exports.submitTestimonial = async (req, res) => {
  try {
    const { name, course, text } = req.body;

    const newTestimonial = new Testimonial({
      name,
      course,
      text,
      photo: req.file
        ? req.file.path
        : "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
      approved: false,
    });

    await newTestimonial.save();
    res.status(201).json({
      message: "Testimonial submitted successfully, pending approval!",
    });
  } catch (err) {
    console.error("[CREATE TESTIMONIAL ERROR]", err);
    res.status(500).json({ error: "Failed to submit testimonial" });
  }
};

// Admin gets pending testimonials
exports.getPendingTestimonials = async (req, res) => {
  try {
    const pending = await Testimonial.find({ status: "pending" });
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
    await Testimonial.findByIdAndUpdate(id, { status: "approved" });
    res.json({ message: "Testimonial approved." });
  } catch (err) {
    console.error("[APPROVE TESTIMONIAL ERROR]", err);
    res.status(500).json({ error: "Failed to approve testimonial." });
  }
};

// Edit testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, course, text } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial)
      return res.status(404).json({ error: "Testimonial not found" });

    testimonial.name = name || testimonial.name;
    testimonial.course = course || testimonial.course;
    testimonial.text = text || testimonial.text;

    await testimonial.save();

    res.status(200).json({ message: "Testimonial updated successfully" });
  } catch (err) {
    console.error("[UPDATE TESTIMONIAL ERROR]", err);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

// Reject/delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    await testimonial.deleteOne();

    res.status(200).json({ message: "Testimonial rejected and deleted successfully" });
  } catch (err) {
    console.error("[DELETE TESTIMONIAL ERROR]", err);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};


// Get approved testimonials for homepage
exports.getApprovedTestimonials = async (req, res) => {
  try {
    const approved = await Testimonial.find({ status: "approved" });
    res.json(approved);
  } catch (err) {
    console.error("[GET APPROVED TESTIMONIALS ERROR]", err);
    res.status(500).json({ error: "Failed to fetch testimonials." });
  }
};
