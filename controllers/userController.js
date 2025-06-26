const bcrypt = require('bcryptjs');
const Club = require('../models/Club');
const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledClubs');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


// Get all students (admin only)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .populate('enrolledClubs', 'name');

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};


// exports.getStudentDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//       .select('-password')
//       .populate('enrolledClubs', 'name category');

//     if (!user || user.role !== 'student') {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching student details:', err);
//     res.status(500).json({ error: 'Failed to get student details' });
//   }
// };

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


// exports.updateProfile = async (req, res) => {
//     const userId = req.user._id;
//     const { name, email, password } = req.body;

//     try {
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ error: 'User not found' });

//         user.name = name || user.name;
//         user.email = email || user.email;

//         if (password) {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             user.password = hashedPassword;
//         }

//         await user.save();
//         res.status(200).json({ message: 'Profile updated successfully', user });
//     } catch (err) {
//         console.error('Update profile error:', err);
//         res.status(500).json({ error: 'Failed to update profile' });
//     }
// };
