const express = require('express');
const router = express.Router();
const {enrollInClub, unenrollFromClub } = require('../controllers/enrollmentController')
const { protect } = require('../middleware/authMiddleware');

router.post('/:clubId', protect, enrollInClub);
router.delete('/unenroll/:clubId', protect, unenrollFromClub);

// // Get all enrolled club IDs for current student
// router.get('/my-clubs', protect, async (req, res) => {
//     try {
//         const enrollments = await Enrollment.find({ student: req.user._id }).populate('club');
//         res.json(enrollments.map((e) => e.club._id));
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch enrolled clubs' });
//     }
// });

module.exports = router;
