const Club = require('../models/Club');
const User = require('../models/User');

exports.enrollInClub = async (req, res) => {
    const userId = req.user._id;
    const { clubId } = req.params;

    try {
        const club = await Club.findById(clubId);
        if (!club) return res.status(404).json({ error: 'Club not found' });

        const user = await User.findById(userId);

        if (user.enrolledClubs.includes(clubId)) {
            return res.status(400).json({ error: 'Already enrolled in this club' });
        }

        user.enrolledClubs.push(clubId);
        await user.save();

        res.status(200).json({ message: 'Enrolled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Enrollment failed' });
    }
};

// Unenroll student from a club
exports.unenrollFromClub = async (req, res) => {
    const userId = req.user._id;
    const { clubId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user.enrolledClubs.includes(clubId)) {
            return res.status(400).json({ error: 'You are not enrolled in this club' });
        }

        user.enrolledClubs = user.enrolledClubs.filter(
            (id) => id.toString() !== clubId
        );
        await user.save();

        res.status(200).json({ message: 'Unenrolled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unenrollment failed' });
    }
};

