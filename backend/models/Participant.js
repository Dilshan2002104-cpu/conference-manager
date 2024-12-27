const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({ 
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  organization: { type: String }, 
  QR_code: { type: String }, 
  sessions_registered: { type: [String] } });

module.exports = mongoose.model('Participant', ParticipantSchema);