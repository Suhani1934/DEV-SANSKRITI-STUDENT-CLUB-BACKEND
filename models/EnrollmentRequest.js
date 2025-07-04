const mongoose = require('mongoose');

const enrollmentRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('EnrollmentRequest', enrollmentRequestSchema);
