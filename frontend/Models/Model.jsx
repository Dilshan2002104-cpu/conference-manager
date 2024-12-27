import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Model.css'; 
import axios from 'axios'; 

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [sessionsOptions, setSessionsOptions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sessions/sessions'); 
        const sessions = response.data.map(session => ({
          value: session._id, // Use the session ID as the value
          label: session.title // Use the session title as the label
        }));
        setSessionsOptions(sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleSessionChange = (e) => {
    const value = e.target.value; // This is the session ID
    const session = sessionsOptions.find(session => session.value === value); // Find the session object
    const sessionTitle = session ? session.label : null; // Get the session title

    setSelectedSessions((prev) => 
      prev.includes(sessionTitle) 
        ? prev.filter((session) => session !== sessionTitle) // Remove the title if it's already selected
        : [...prev, sessionTitle] // Add the title if it's not selected
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, organization, sessions_registered: selectedSessions }); // selectedSessions now contains titles
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isOpen ? 'show' : ''}`}>
        <h2>Add New Participant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Organization:</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sessions:</label>
            <div className="session-list">
              {sessionsOptions.map((session) => (
                <div key={session.value} className="session-item">
                  <input
                    type="checkbox"
                    value={session.value} // This is the session ID
                    checked={selectedSessions.includes(session.label)} // Check if the title is selected
                    onChange={handleSessionChange}
                  />
                  <label>{session.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit">Add Participant</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Prop validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;