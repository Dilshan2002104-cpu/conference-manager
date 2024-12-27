const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  session_id: { 
    type: String, 
    unique: true, 
    required: true, 
    default: () => new mongoose.Types.ObjectId().toHexString() 
  },
  track_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Track', 
    required: false 
  },
  track_title: { 
    type: String, 
    required: false // Optional field, set to true if necessary
  },
  description: { 
    type: String, 
    required: false // Optional field, set to true if necessary
  },
  title: { 
    type: String, 
    required: true 
  },
  speaker: { 
    type: String, 
    required: true 
  },
  time: { 
    type: Date, 
    required: true 
  },
  venue: { 
    type: String, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  registered_count: { 
    type: Number, 
    default: 0 
  },
});

module.exports = mongoose.model('Session', SessionSchema);
