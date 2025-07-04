const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/', protect, adminOnly, getAllFeedbacks);

module.exports = router;
