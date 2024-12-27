import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const EditParticipantModal = ({ isOpen, onClose, participant, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    sessions_registered: []
  });
  
  const [newSession, setNewSession] = useState('');
  const availableSessions = [
    'Keynote Speech',
    'Technical Workshop',
    'Networking Event',
    'Panel Discussion',
    'Product Demo',
    'Professional Development',
    'Industry Insights'
  ];

  useEffect(() => {
    if (participant) {
      setFormData({
        name: participant.name || '',
        email: participant.email || '',
        organization: participant.organization || '',
        sessions_registered: participant.sessions_registered || []
      });
    }
  }, [participant]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSession = () => {
    if (newSession && !formData.sessions_registered.includes(newSession)) {
      setFormData(prev => ({
        ...prev,
        sessions_registered: [...prev.sessions_registered, newSession]
      }));
      setNewSession('');
    }
  };

  const handleRemoveSession = (sessionToRemove) => {
    setFormData(prev => ({
      ...prev,
      sessions_registered: prev.sessions_registered.filter(
        session => session !== sessionToRemove
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...participant,
      ...formData
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="text-xl font-semibold">Edit Participant Details</h2>
          <button
            onClick={onClose}
            className="modal-close-button"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="organization">Organization</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Registered Sessions</label>
            <div className="sessions-list">
              {formData.sessions_registered.map((session, index) => (
                <div key={index} className="session-item">
                  <span>{session}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSession(session)}
                    className="delete-session-button"
                    aria-label="Remove session"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="add-session-container">
              <select
                value={newSession}
                onChange={(e) => setNewSession(e.target.value)}
                className="session-select"
              >
                <option value="">Select a session</option>
                {availableSessions
                  .filter(session => !formData.sessions_registered.includes(session))
                  .map((session, index) => (
                    <option key={index} value={session}>
                      {session}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddSession}
                className="add-session-button"
                disabled={!newSession}
              >
                <Plus size={16} />
                Add Session
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditParticipantModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  participant: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    organization: PropTypes.string,
    sessions_registered: PropTypes.arrayOf(PropTypes.string)
  }),
  onSubmit: PropTypes.func.isRequired
};

export default EditParticipantModal;
