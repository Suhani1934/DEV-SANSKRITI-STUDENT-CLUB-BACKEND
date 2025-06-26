const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    categories: {
      type: [String],
      validate: [array => array.length >= 3, 'At least 3 categories are required']
    },
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
