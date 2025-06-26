const Club = require('../models/Club');
const fs = require('fs');
const path = require('path');

exports.createClub = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!name || !description || !category || !req.file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const club = new Club({ name, description, category, image: `/uploads/${req.file.filename}`, createdBy: req.user._id });

    await club.save();
    res.status(201).json(club);
  } catch (err) {
    console.error('[ERROR IN CLUB CREATE]:', err);
    res.status(500).json({ error: 'Failed to create club' });
  }
}

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate('createdBy', 'name');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};


exports.updateClub = async (req, res) => {
  const { id } = req.params;
  const { name, description, category } = req.body;

  try {
    const club = await Club.findById(id);
    if (!club) return res.status(404).json({ error: 'Club not found' });

    // Update fields
    club.name = name || club.name;
    club.description = description || club.description;
    club.category = category || club.category;

    // If a new image is uploaded, update it
    if (req.file) {
      // Delete old image
      if (club.image) {
        const oldImagePath = path.join(__dirname, '../', club.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      club.image = req.file.path;
    }

    await club.save();

    res.status(200).json({ message: 'Club updated successfully', club });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update club' });
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
