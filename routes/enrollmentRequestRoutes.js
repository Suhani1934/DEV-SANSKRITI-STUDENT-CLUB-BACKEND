const express = require('express');
const { createEnrollmentRequest, getAllRequests, updateEnrollmentRequestStatus, getStudentRequests } = require('../controllers/enrollmentRequestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Student sends request
router.post('/:clubId', protect, createEnrollmentRequest);

// Get requests for logged-in student
router.get('/my-requests', protect, getStudentRequests);


// Admin gets all requests
router.get('/', protect, adminOnly, getAllRequests);

// Admin approves/rejects
router.put('/:requestId', protect, adminOnly, updateEnrollmentRequestStatus);

module.exports = router;
