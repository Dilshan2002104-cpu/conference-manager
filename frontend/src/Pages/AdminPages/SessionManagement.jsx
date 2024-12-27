// SessionManagement.js
import { useState, useEffect } from 'react';
import './SessionManagement.css';
import SidePanel from '../../Components/Sidepanel';
import axios from 'axios'; // Import axios

const SessionManagement = () => {
    const [sessions, setSessions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        speaker: '',
        time: '',
        venue: '',
        capacity: '',
        track_title: '',
        description: ''
    });
    const [error, setError] = useState(null); // State to handle errors
    const [isEditing, setIsEditing] = useState(false);
    const [editingSessionId, setEditingSessionId] = useState(null);

    // Fetch sessions from the API when the component mounts
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sessions/sessions');
                setSessions(response.data); // Set the fetched sessions to state
            } catch (error) {
                console.error('Failed to fetch sessions:', error);
                setError('Failed to fetch sessions. Please try again later.');
            }
        };

        fetchSessions();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update existing session
                const response = await axios.put(`http://localhost:5000/api/sessions/sessions/${editingSessionId}`, formData);
                const updatedSessions = sessions.map(session => 
                    session._id === editingSessionId ? response.data : session
                );
                setSessions(updatedSessions);
                setIsEditing(false);
                setEditingSessionId(null);
            } else {
                // Add new session
                const response = await axios.post('http://localhost:5000/api/sessions/sessions', formData);
                setSessions([...sessions, response.data]);
            }
            setFormData({
                title: '',
                speaker: '',
                time: '',
                venue: '',
                capacity: '',
                track_title: '',
                description: ''
            });
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    const handleDelete = async (id) => {
        // Optimistically update the UI
        const updatedSessions = sessions.filter(session => session._id !== id);
        setSessions(updatedSessions);
    
        try {
            await axios.delete(`http://localhost:5000/api/sessions/sessions/${id}`);
        } catch (error) {
            console.error('Failed to delete session:', error);
            setError('Failed to delete session. Please try again later.');
            // If the delete fails, revert the state back to the original
            setSessions(sessions);
        }
    };

    const handleEdit = (id) => {
        const sessionToEdit = sessions.find(session => session._id === id);
        if (sessionToEdit) {
            setFormData({
                title: sessionToEdit.title,
                speaker: sessionToEdit.speaker,
                time: new Date(sessionToEdit.time).toISOString().slice(0, 16),
                venue: sessionToEdit.venue,
                capacity: sessionToEdit.capacity,
                track_title: sessionToEdit.track_title,
                description: sessionToEdit.description
            });
            setIsEditing(true);
            setEditingSessionId(id);
        }
    };

    return (
        <>
        <SidePanel/>
        <div className="session-management">
            <h1>Session Management</h1>
            
            <div className="form-container">
                <h2>Add New Session</h2>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Session Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="speaker">Speaker:</label>
                            <input
                                type="text"
                                id="speaker"
                                name="speaker"
                                value={formData.speaker}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="time">Time:</label>
                            <input
                                type="datetime-local"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="venue">Venue:</label>
                            <input
                                type="text"
                                id="venue"
                                name="venue"
                                value={formData.venue}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="capacity">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity }
                                onChange={handleInputChange}
                                required
                                min="1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="track_title">Track Title:</label>
                            <input
                                type="text"
                                id="track_title"
                                name="track_title"
                                value={formData.track_title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="3"
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                    {isEditing ? 'Update Session' : 'Add Session'}
                    </button>
                </form>
            </div>

            <div className="sessions-list">
                <h2>Sessions List</h2>
                <div className="sessions-grid">
                    {sessions.map(session => (
                        <div key={session.id} className="session-card">
                            <h3>{session.title}</h3>

                            <p><strong>SessionId:</strong> {session._id}</p>
                            <p><strong>Speaker:</strong> {session.speaker}</p>
                            <p><strong>Time:</strong> {new Date(session.time).toLocaleString()}</p>
                            <p><strong>Venue:</strong> {session.venue}</p>
                            <p><strong>Capacity:</strong> {session.capacity}</p>
                            <p><strong>Track:</strong> {session.track_title}</p>
                            <p><strong>Description:</strong> {session.description}</p>
                            <button 
                                onClick={() => handleDelete(session._id)}
                                className="delete-btn"
                            >
                                Delete Session
                            </button>

                            <button onClick={() => handleEdit(session._id) }
                                className='delete-btn'>Edit session </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default SessionManagement;