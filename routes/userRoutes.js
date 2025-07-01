const express = require('express');
const router = express.Router();
const { getAllStudents, deleteStudent, getCurrentUser  } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/me', protect, getCurrentUser);
router.get('/students', protect, adminOnly, getAllStudents);

router.delete('/:id', protect, adminOnly, deleteStudent);


module.exports = router;