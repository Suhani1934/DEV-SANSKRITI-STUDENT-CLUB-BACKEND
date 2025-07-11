const Club = require('../models/Club.js')
const ClubDetail = require('../models/ClubDetail.js');
const EnrollmentRequest = require('../models/EnrollmentRequest.js')

exports.createClub = async (req, res) => {
  try {
    const { name, description, categories } = req.body;
    const categoriesArray = JSON.parse(categories);

    // If multer uploaded image (with Cloudinary storage), the file URL is in req.file.path
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path;
    }

    const newClub = new Club({
      name,
      description,
      categories: categoriesArray,
      image: imageUrl,
      createdBy: req.user._id, 
    });

    await newClub.save();
    res.status(201).json({ message: 'Club created successfully', club: newClub });
  } catch (err) {
    console.error('[CREATE CLUB ERROR]', err);
    res.status(500).json({ error: 'Failed to create club' });
  }
};

exports.getClubById = async (req, res) => {
  try {
    const club = await ClubDetail.findById(req.params.clubId)
    .populate('club')
    .populate('coordinator')
    .populate('members.student');
      
    if (!club) return res.status(404).json({ error: 'Club not found' });

    const acceptedRequests = await EnrollmentRequest.find({
      club: club._id,
      status: 'accepted',
    }).populate('student', 'name email');

    const members = acceptedRequests.map((req) => ({
      student: req.student,
      category: req.category,
    }));

    const responseData = {
      _id: club._id,
      name: club.name,
      description: club.description,
      categories: club.categories,
      coordinator: club.coordinator,
      members,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error('[GET CLUB BY ID ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch club' });
  }
};

// GET /api/clubs/:id/members
exports.getClubMembers = async (req, res) => {
  try {
    const clubId = req.params.id;
    const students = await User.find({ 'enrolledClubs.club': clubId }).select('name email').lean();
    res.json(students);
  } catch (err) {
    console.error('[GET CLUB MEMBERS ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};


exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    console.error('[GET CLUBS ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};

exports.updateClub = async (req, res) => {
  try {
    const clubId = req.params.id;
    const { name, description, categories } = req.body;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ error: 'Club not found' });

    // Update fields
    club.name = name || club.name;
    club.description = description || club.description;

    // Categories should come as a JSON string (as you’re sending in the frontend)
    if (categories) {
      const parsedCategories = Array.isArray(categories)
        ? categories
        : JSON.parse(categories);

      if (!Array.isArray(parsedCategories) || parsedCategories.length === 0) {
        return res.status(400).json({ error: 'Categories must be a non-empty array' });
      }

      club.categories = parsedCategories;
    }

    // If a new image was uploaded, update it
   if (req.file && req.file.path) {
      club.image = req.file.path;
    }

    await club.save();

    res.json({ message: 'Club updated successfully', club });
  } catch (err) {
    console.error('[UPDATE CLUB ERROR]', err);
    res.status(500).json({ error: 'Server error updating club' });
  }
};

exports.deleteClub = async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete club' });
  }
};
