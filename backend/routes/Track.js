const express = require('express');
const Track = require('../models/Track')

const router = express.Router();

router.post('/tracks', async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const newTrack = new Track({ title, description });
      const savedTrack = await newTrack.save();
  
      res.status(201).json(savedTrack);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get all tracks
  router.get('/tracks', async (req, res) => {
    try {
      const tracks = await Track.find();
      res.json(tracks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  module.exports = router;