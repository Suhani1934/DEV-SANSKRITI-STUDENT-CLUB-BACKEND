const EnrollmentRequest = require('../models/EnrollmentRequest');
const User = require('../models/User');
const Club = require('../models/Club');

// exports.enrollInClub = async (req, res) => {
//     const { category } = req.body;
//     const { clubId } = req.params;
//     const studentId = req.user._id;

//     try {
//         const club = await Club.findById(clubId);
//         if (!club) return res.status(404).json({ error: 'Club not found' });

//         const user = await User.findById(userId);

//         if (user.enrolledClubs.includes(clubId)) {
//             return res.status(400).json({ error: 'Already enrolled in this club' });
//         }

//         user.enrolledClubs.push(clubId);
//         await user.save();

//         res.status(200).json({ message: 'Enrolled successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Enrollment failed' });
//     }
// };

// Student sends enrollment request
exports.sendRequest = async (req, res) => {
    const { clubId } = req.params;

    const existing = await EnrollmentRequest.findOne({
        student: req.user.id,
        club: clubId,
        status: 'pending',
    });

    if (existing) {
        return res.status(400).json({ error: 'You already requested to join this club.' });
    }

    const request = await EnrollmentRequest.create({
        student: req.user.id,
        club: clubId,
    });

    res.status(201).json(request);
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
exports.updateRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const request = await EnrollmentRequest.findById(requestId);

    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = status;
    await request.save();

    // On accept, add student to club
    if (status === 'accepted') {
        const student = await User.findById(request.student);
        if (!student.enrolledClubs.includes(request.club)) {
            student.enrolledClubs.push(request.club);
            await student.save();
        }
    }

    res.json({ message: `Request ${status}` });
};
