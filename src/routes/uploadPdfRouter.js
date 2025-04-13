const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Resource = require('../models/resource'); // Import the Resource model

// Multer configuration for handling PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/pdfs');  // Specify the destination folder for PDFs
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp to prevent filename clashes
  }
});

const upload = multer({ storage });  // Initialize multer with the storage configuration

// Define the route to handle PDF upload
router.post('/upload', upload.single('resource'), async (req, res) => {
  const { title, subject, year } = req.body;
  const filePath = `/uploads/pdfs/${req.file.filename}`;

  try {
      const newResource = new Resource({ title, subject, year, filePath });
      await newResource.save();
      res.redirect('/resources');
  } catch (err) {
      console.error(err);
      res.status(500).send("Failed to upload PDF");
  }
});

module.exports = router;  // Export the router
