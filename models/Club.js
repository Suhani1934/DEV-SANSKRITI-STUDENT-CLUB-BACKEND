const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: String,
  description: String,
  categories: [String],
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
