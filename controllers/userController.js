const bcrypt = require('bcryptjs');
const Club = require('../models/Club');
const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('enrolledClubs.club', 'name image description categories');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('[GET CURRENT USER ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
};

// Get all students (admin only)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .populate('enrolledClubs.club', 'name')
      .lean();

    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to fetch student data' });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
