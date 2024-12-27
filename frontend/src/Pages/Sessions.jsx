import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import './Sessions.css';
import Navbar from '../Components/Navbar';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [imageLoaded, setImageLoaded] = useState({});

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sessions/sessions'); // Adjust the URL if needed
        const data = await response.json();
        
        const formattedSessions = data.map(session => ({
          id: session._id,
          trackId: session.track_id, // Assuming track_id is available in the response
          trackTitle: session.track_title,
          title: session.title,
          speaker: session.speaker,
          speakerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", // Placeholder image, replace with actual if available
          time: new Date(session.time).toLocaleString(), // Format the time as needed
          venue: session.venue,
          capacity: session.capacity,
          registeredCount: session.registered_count,
          description: session.description
        }));
        setSessions(formattedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleImageLoad = (sessionId) => {
    setImageLoaded(prev => ({ ...prev, [sessionId]: true }));
  };

  const handleImageError = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.speakerImage = "/api/placeholder/80/80"; // Placeholder for image error
      setSessions([...sessions]);
    }
  };

  const getUniqueTracks = () => {
    const tracks = new Set(sessions.map(session => session.trackTitle));
    return ['all', ...tracks];
  };

  const filteredSessions = selectedTrack === 'all' 
    ? sessions 
    : sessions.filter(session => session.trackTitle === selectedTrack);

  return (
    <>
      <Navbar />
      <div className='content-container'>
        <div className="sessions-container">
          <h1>Conference Sessions</h1>
          
          <div className="track-filter">
            <label>Filter by Track: </label>
            <select 
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="track-select"
            >
              {getUniqueTracks().map(track => (
                <option key={track} value={track}>
                  {track.charAt(0).toUpperCase() + track.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="sessions-grid">
            {filteredSessions.map(session => (
              <div key={session.id} className="session-card">
                <div className="session-header">
                  <span className="track-tag">{session.trackTitle}</span>
                  <h2>{session.title}</h2>
                </div>
                
                <div className="speaker-section">
                  <div className="speaker-image-container">
                    {!imageLoaded[session.id] && (
                      <div className="speaker-placeholder">
                        <User  className="user-icon" />
                      </div>
                    )}
                    <img
                      src={session.speakerImage}
                      alt={session.speaker}
                      className={`speaker-image ${imageLoaded[session.id] ? 'loaded' : ''}`}
                      onLoad={() => handleImageLoad(session.id)}
                      onError={() => handleImageError(session.id)}
                    />
                  </div>
                  <div className="speaker-info">
                    <p className="speaker-name">{session.speaker}</p>
                  </div>
                </div>
                
                <div className="session-info">
                  <p><strong>Time:</strong> {session.time}</p>
                  <p><strong>Venue:</strong> {session.venue}</p>
                  <p><strong >Description:</strong> {session.description}</p>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill" 
                      style={{width: `${(session.registeredCount / session.capacity) * 100}%`}}
                    ></div>
                    <span className="capacity-text">
                      {session.registeredCount}/{session.capacity} Registered
                    </span>
                  </div>
                </div>

                <button 
                  className="register-button"
                  disabled={session.registeredCount >= session.capacity}
                >
                  {session.registeredCount >= session.capacity ? 'Session Full' : 'Enrole'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionsPage;