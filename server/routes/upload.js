
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'src/images/';
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Max file size 1MB
}).single('image');

// Upload route
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to upload image.', error: err });
    }
    if (req.file) {
      console.log('Image uploaded successfully.');
      return res.status(200).json({ message: 'Image uploaded successfully.', filename: req.file.filename });
    } else {
      return res.status(400).json({ message: 'No file selected.' });
    }
  });
});




module.exports = router;
