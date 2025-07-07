const Gallery = require("../models/Gallery");

exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error("[GET GALLERY ERROR]", err);
    res.status(500).json({ error: "Failed to fetch gallery images" });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const newImage = new Gallery({
        url: file.path,
        caption: req.body.caption || '',
      });
      await newImage.save();
      uploadedImages.push(newImage);
    }

    res.status(201).json({ message: 'Images uploaded successfully', images: uploadedImages });
  } catch (err) {
    console.error('[UPLOAD IMAGES ERROR]', err);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};


