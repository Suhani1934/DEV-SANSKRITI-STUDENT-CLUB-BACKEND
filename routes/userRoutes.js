const express = require('express');
const router = express.Router();
const { getAllStudents, deleteStudent, getCurrentUser  } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/me', protect, getCurrentUser);
router.get('/students', protect, adminOnly, getAllStudents);

// router.get('/students/:id', protect, adminOnly, getStudentDetails);
router.delete('/:id', protect, adminOnly, deleteStudent);


// router.put('/update-profile', protect, updateProfile);

module.exports = router;