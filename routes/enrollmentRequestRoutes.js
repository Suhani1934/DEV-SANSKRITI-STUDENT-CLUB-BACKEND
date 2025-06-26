const express = require('express');
const { sendRequest, getAllRequests, updateRequestStatus, getStudentRequests } = require('../controllers/enrollmentRequestController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Student sends request
router.post('/:clubId', protect, sendRequest);

// Get requests for logged-in student
router.get('/my-requests', protect, getStudentRequests);


// Admin gets all requests
router.get('/', protect, adminOnly, getAllRequests);

// Admin approves/rejects
router.put('/:requestId', protect, adminOnly, updateRequestStatus);

module.exports = router;
