const express = require("express");
const router = express.Router();
const { getAdminStatus } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/status", protect, adminOnly, getAdminStatus);

module.exports = router;
