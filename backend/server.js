const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const participantRoutes = require('./routes/participants');
const sessionRoutes  = require('./routes/sessions'); 
const attendanceRoutes = require('./routes/attendance');
const userRoutes = require('./routes/User');
const trackroute = require('./routes/Track');


const app = express();
// Create HTTP server
const server = require('http').createServer(app);
// Initialize Socket.IO with CORS
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
connectDB();

app.use(express.json());

app.use('/api/participants', participantRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/register', userRoutes);
app.use('/api/login', userRoutes);
app.use('/api/track',trackroute)

app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
