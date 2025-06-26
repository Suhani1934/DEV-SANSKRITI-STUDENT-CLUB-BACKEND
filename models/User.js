// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['student', 'admin'], default: 'student' },
//   enrolledClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  role: { type: String, default: 'student', enum: ['student', 'admin'] },
  password: { type: String, required: true },
  enrolledClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
