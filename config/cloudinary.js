const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Set your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   
  api_key: process.env.CLOUDINARY_API_KEY,         
  api_secret: process.env.CLOUDINARY_API_SECRET,   
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "club-website-images",      
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
