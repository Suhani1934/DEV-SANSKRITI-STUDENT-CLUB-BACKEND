const EnrollmentRequest = require('../models/EnrollmentRequest');
const User = require('../models/User');
const Club = require('../models/Club');

// Student sends enrollment request
exports.createEnrollmentRequest = async (req, res) => {
  const { clubId } = req.params;
  const { category } = req.body;
  const studentId = req.user.id;
  try {

    const student = await User.findById(studentId);
    const alreadyEnrolled = student.enrolledClubs.find(
      (club) => club.club.toString() === clubId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        error: 'You are already enrolled in this club. You can only enroll in one category per club.',
      });
    }

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    // Check that the club exists and contains this category
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    if (!club.categories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category for this club' });
    }

    // Create request
    const newRequest = new EnrollmentRequest({
      club: clubId,
      student: studentId,
      category,
      status: 'pending',
    });
    
    await newRequest.save();

    res.status(201).json({ message: 'Enrollment request submitted' });
  } catch (err) {
    console.error('[ENROLLMENT REQUEST ERROR]', err);
    res.status(500).json({ error: 'Server error while submitting enrollment request' });
  }
};

// Get requests for logged-in student
exports.getStudentRequests = async (req, res) => {
  const requests = await EnrollmentRequest.find({ student: req.user._id })
    .populate('club', 'name')
    .sort({ createdAt: -1 });

  res.json(requests);
};

// Admin views all enrollment requests
exports.getAllRequests = async (req, res) => {
  const requests = await EnrollmentRequest.find()
    .populate('student', 'name email')
    .populate('club', 'name');

  res.json(requests);
};

// Admin accepts/rejects
exports.updateEnrollmentRequestStatus = async (req, res) => {
  try {
    const { status, message } = req.body;
    const enrollmentRequest = await EnrollmentRequest.findById(req.params.requestId)
      .populate('student')
      .populate('club');

    if (!enrollmentRequest) return res.status(404).json({ error: 'Request not found' });

    enrollmentRequest.status = status;
    enrollmentRequest.message = message || '';
    await enrollmentRequest.save();

    if (status === 'accepted') {
      const student = await User.findById(enrollmentRequest.student._id);

      student.enrolledClubs.push({
        club: enrollmentRequest.club._id,
        category: enrollmentRequest.category,
      });

      await student.save();
    }

    res.json({ message: `Request ${status}` });
  } catch (err) {
    console.error('[UPDATE REQUEST ERROR]', err);
    res.status(500).json({ error: 'Failed to update enrollment request' });
  }
};

