const Club = require('../models/Club');
const ClubDetail = require('../models/ClubDetail');
const EnrollmentRequest = require('../models/EnrollmentRequest');
const User = require('../models/User');
const mongoose = require('mongoose');

// Create or update club detail
exports.createOrUpdateClubDetail = async (req, res) => {
  try {
    const { clubId } = req.params;
    let { description, logo, images, coordinator } = req.body;

    if (!coordinator || coordinator.trim() === '') {
      coordinator = undefined;
    }

    let clubDetail = await ClubDetail.findOne({ club: clubId });

    if (clubDetail) {
      // update existing
      clubDetail.description = description;
      clubDetail.logo = logo;
      clubDetail.images = images;
      clubDetail.coordinator = coordinator;
      await clubDetail.save();
    } else {
      // create new
      clubDetail = new ClubDetail({
        club: clubId,
        description,
        logo,
        images,
        coordinator,
        members: [],
      });
      await clubDetail.save();
    }

    res.status(200).json(clubDetail);
  } catch (err) {
    console.error('[CREATE/UPDATE CLUB DETAIL ERROR]', err);
    res.status(500).json({ error: 'Failed to save club details' });
  }
};

// Add member when student enrolls
exports.addMemberToClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { category } = req.body;
    const studentId = req.user._id;

    // ✅ First: find accepted enrollment request
    const enrollment = await EnrollmentRequest.findOne({
      student: studentId,
      club: clubId,
      status: 'accepted',
    });

    if (!enrollment) {
      return res.status(403).json({ error: 'You must have an approved enrollment to become a member.' });
    }

    // ✅ Find the club detail doc
    let clubDetail = await ClubDetail.findOne({ club: clubId });
    if (!clubDetail) return res.status(404).json({ error: 'Club detail not found' });

    // ✅ Check if already a member
    const alreadyEnrolled = clubDetail.members.some(
      (m) => m.student.toString() === studentId.toString()
    );
    if (alreadyEnrolled) return res.status(400).json({ error: 'Already a member' });

    // ✅ Add student as member with their enrollment category
    clubDetail.members.push({ student: studentId, category: enrollment.category });
    await clubDetail.save();

    res.status(200).json({ message: 'Member added successfully', clubDetail });
  } catch (err) {
    console.error('[ADD MEMBER ERROR]', err);
    res.status(500).json({ error: 'Failed to add member' });
  }
};

// Get full club detail (basic + admin + dynamic members)
exports.getClubDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const clubDetail = await ClubDetail.findOne({ club: id })
      .populate('club', 'name categories')
      .populate('members.student', 'name email') 
      .populate('coordinator', 'name email');

    if (!clubDetail) return res.status(404).json({ error: 'Club detail not found' });

    const basic = {
      id: clubDetail.club?._id,
      name: clubDetail.club?.name,
      categories: clubDetail.club?.categories,
    };

    const admin = {
      description: clubDetail.description,
      logo: clubDetail.logo,
      images: clubDetail.images,
      coordinator: clubDetail.coordinator,
    };

    const members = clubDetail.members;

    res.status(200).json({ basic, admin, members });
  } catch (err) {
    console.error('[GET CLUB DETAIL ERROR]', err);
    res.status(500).json({ error: 'Failed to get club detail' });
  }
};

