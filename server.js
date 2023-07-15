
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { BSON } = require('mongodb');

const app = express();
const port = 3000;
const router = require('./index.mjs');
app.use('/',router);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a file schema
const fileSchema = new mongoose.Schema({
  name: String,
  data: Number, // Provide the binary data of the GLB file here
  contentType: String,
});

const File = mongoose.model('File', fileSchema);

// Set up multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve the HTML file
app.use(express.static('public'));

// Handle the file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, buffer, mimetype } = req.file;
    const { filename } = req.body;

    // Create a new file document
    const file = new File({
      name: filename || originalname,
      data: buffer,
      contentType: mimetype,
    });

    // Save the file document to the database
    await file.save();

    res.send('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
