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
  try {
    const userId = req.user._id;
    const { clubId } = req.params;

    const user = await User.findById(userId);
    const beforeLength = user.enrolledClubs.length;

    user.enrolledClubs = user.enrolledClubs.filter(
      (enrollment) => enrollment && enrollment.club && enrollment.club.toString() !== clubId
    );

    if (user.enrolledClubs.length === beforeLength) {
      return res.status(400).json({ error: 'Enrollment not found for club' });
    }

    await user.save();
    res.json({ message: 'Successfully unenrolled' });
  } catch (err) {
    console.error('[UNENROLL ERROR]', err);
    res.status(500).json({ error: 'Unenrollment failed' });
  }
};

