const User = require("../models/User");
const Event = require("../models/Event")
const Club = require("../models/Club");
const Feedback = require("../models/Feedback");
const Testimonial = require("../models/Testimonial");
const EnrollmentRequest = require("../models/EnrollmentRequest");

exports.getAdminStatus = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });

    // distinct--> for remove duplicate student id
    const enrolledStudents = await EnrollmentRequest.distinct("student", {
      status: "accepted",
    });
    const totalClubs = await Club.countDocuments();
    const totalFeedback = await Feedback.countDocuments();
    const totalTestimonials = await Testimonial.countDocuments({
      status: "approved",
    });
    const totalEvents = await Event.countDocuments()
    
    // console.log(totalEvents)

    res.status(200).json({
      totalStudents,
      enrolledStudents: enrolledStudents.length,
      totalClubs,
      totalFeedback,
      totalTestimonials,
      totalEvents,
    });
  } catch (err) {
    console.error("[GET ADMIN status ERROR]", err);
    res.status(500).json({ error: "Failed to fetch status" });
  }
};
