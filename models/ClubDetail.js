const mongoose = require('mongoose');

const clubDetailSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  logo: {
    type: String, 
  },
  images: [
    {
      type: String, 
    },
  ],
  coordinator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      category: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('ClubDetail', clubDetailSchema);
