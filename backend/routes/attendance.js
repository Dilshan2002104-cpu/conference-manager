const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

router.post('/check-in', async (req, res) => {
  const { participant_id, session_id } = req.body;
  try {
    const attendance = new Attendance({ participant_id, session_id });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/check-in', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate('participant_id', 'name email') // Populate name and email from Participant
      .populate('session_id', 'title'); // Populate title from Session

    // Transform records to match frontend requirements
    const transformedRecords = attendanceRecords.map(record => ({
      attendance_id: record._id,
      participant_id: record.participant_id._id,
      name: record.participant_id.name,
      email: record.participant_id.email,
      session_title: record.session_id.title,
      check_in_time: record.check_in_time,
    }));

    res.json(transformedRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

module.exports = router;