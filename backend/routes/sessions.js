const express = require('express');
const Session = require('../models/Session');
const Track = require('../models/Track');
const multer = require('multer');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define your upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


router.post('upload-proceedings', upload.single('proceedings'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  console.log(req.file); 
  res.status(200).send('File uploaded successfully.');
});


router.post('/sessions', async (req, res) => {
  const { title, speaker, time, venue, capacity, track_title, description } = req.body;

  if (!title || !speaker || !time || !venue || !capacity || !track_title) {
      return res.status(400).json({ message: 'All fields except description are required.' });
  }

  try {
      const newSession = new Session(req.body);
      await newSession.save();
      res.status(201).json(newSession);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});



// Get all sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find().populate('track_id');
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Get seesion using id 
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('track_id');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a session
router.put('/sessions/:id', async (req, res) => {
  const { title, speaker, time, venue, capacity, track_title, description } = req.body;

  // Validate required fields
  if (!title || !speaker || !time || !venue || !capacity || !track_title) {
    return res.status(400).json({ message: 'All fields except description are required.' });
  }

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      { title, speaker, time, venue, capacity, track_title, description },
      { new: true, runValidators: true } // Options: new returns the updated document, runValidators ensures validation
    );

    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(updatedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete a session
router.delete('/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from the URL parameters
    const deletedSession = await Session.findByIdAndDelete(id); // Use findByIdAndDelete to delete by _id
    
    if (!deletedSession) {
      return res.status(404).json({ message: 'Session with the specified ID not found' });
    }
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;