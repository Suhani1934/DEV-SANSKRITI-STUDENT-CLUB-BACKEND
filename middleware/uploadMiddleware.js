// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Allowed file types
const allowedTypes = /jpeg|jpg|png|gif/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Make sure 'uploads/' folder exists at root
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, gif)'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
});

module.exports = upload;
