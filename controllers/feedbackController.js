const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { clubId, message } = req.body;
    const studentId = req.user._id;

    const feedback = new Feedback({
      student: studentId,
      club: clubId,
      message,
    });
    await feedback.save();

    res
      .status(201)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    console.error("[FEEDBACK SUBMIT ERROR]", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("student", "name email")
      .populate("club", "name");

    // console.log("[ADMIN GET FEEDBACKS]", feedbacks);

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("[GET FEEDBACKS ERROR]", err);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
};
