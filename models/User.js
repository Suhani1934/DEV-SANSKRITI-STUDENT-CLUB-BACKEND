const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  role: { type: String, default: 'student', enum: ['student', 'admin'] },
  password: { type: String, required: true },
  enrolledClubs: [
    {
      club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true, },
      category: { type: String, required: true, },
    },
  ],
  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
