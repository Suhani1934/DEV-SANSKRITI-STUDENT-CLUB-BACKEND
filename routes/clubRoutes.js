const express = require('express');
const { createClub, getAllClubs, updateClub, deleteClub } = require('../controllers/clubController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getAllClubs);

router.post('/', protect, adminOnly, upload.single('image'), createClub);
router.put('/:id', protect, adminOnly, upload.single('image'), updateClub);
router.delete('/:id', protect, adminOnly, deleteClub);

module.exports = router;
