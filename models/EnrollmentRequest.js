const mongoose = require('mongoose');

const enrollmentRequestSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    selectedCategory: { type: String, required: true },
    rejectionReason: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('EnrollmentRequest', enrollmentRequestSchema);
