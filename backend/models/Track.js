const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  trackId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Unique track ID
  title: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Track', TrackSchema);
