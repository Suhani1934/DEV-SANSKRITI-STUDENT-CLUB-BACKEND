const express = require('express');
const router = express.Router();
const {enrollInClub, unenrollFromClub } = require('../controllers/enrollmentController')
const { protect } = require('../middleware/authMiddleware');

router.post('/:clubId', protect, enrollInClub);
router.delete('/unenroll/:clubId', protect, unenrollFromClub);

module.exports = router;
