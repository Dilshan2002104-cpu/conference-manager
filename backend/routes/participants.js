const express = require('express');
const QRCode = require('qrcode');
const Participant = require('../models/Participant');
const router = express.Router();

router.post('/addParticipants', async (req, res) => {
  const { name, email, organization, sessions_registered } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }
  try {
    const QR_code = await QRCode.toDataURL(email);

    const newParticipant = new Participant({
      name,
      email,
      organization,
      QR_code,
      sessions_registered,
    });

    await newParticipant.save();

    const io = req.app.get('io');
    // Emit an event to notify clients about the new participant
    io.emit('newParticipant', newParticipant);

    return res.status(201).json(newParticipant);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    return res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/allParticepants', async (req, res) => {
  try {
    const participants = await Participant.find({}, 'name email organization sessions_registered');
    res.status(200).json(participants);
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/updateParticipants/email/:email', async (req, res) => {
  const { email } = req.params;
  const { name, organization, sessions_registered } = req.body;

  // Validate sessions_registered if needed (example: it should be an array)
  if (sessions_registered && !Array.isArray(sessions_registered)) {
    return res.status(400).json({ message: 'sessions_registered should be an array' });
  }

  try {
    const participant = await Participant.findOneAndUpdate(
      { email },
      { name, organization, sessions_registered },
      { new: true }  // Ensure the updated document is returned
    );

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json(participant);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating participant', error: error.message });
  }
});

// Delete participant by email
router.delete('/deleteParticipants/email/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find and delete the participant by email
    const deletedParticipant = await Participant.findOneAndDelete({ email });

    if (!deletedParticipant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json({ message: 'Participant deleted successfully', deletedParticipant });
  } catch (error) {
    console.error('Error deleting participant:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
