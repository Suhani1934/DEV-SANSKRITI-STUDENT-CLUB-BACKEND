const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createOrUpdateClubDetail,
  addMemberToClub,
  getClubDetail,
} = require('../controllers/clubDetailsController');

const router = express.Router();

router.post('/:clubId', protect, adminOnly, createOrUpdateClubDetail);
router.post('/:clubId/enroll', protect, adminOnly, addMemberToClub);
router.get('/:id', getClubDetail);

module.exports = router;
