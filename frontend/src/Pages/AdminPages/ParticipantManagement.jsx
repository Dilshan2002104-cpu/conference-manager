import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import SidePanel from "../../Components/Sidepanel";
import Modal from "../../../Models/Model";
import EditParticipantModal from '../../../Models/EditParticipantModal';
import { Pencil, Trash2 } from 'lucide-react';
import './ParticipantManagement.css';

const socket = io('http://localhost:5000');

const ParticipantManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/participants/allParticepants');
        setParticipants(response.data);
      } catch (err) {
        setError('Error fetching participants');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();

    socket.on('newParticipant', (newParticipant) => {
      setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
    });

    return () => {
      socket.off('newParticipant');
    };
  }, []);

  const handleAddParticipant = async (participant) => {
    try {
      const response = await axios.post('http://localhost:5000/api/participants/addParticipants', participant);
      setParticipants([...participants, response.data]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding participant:', err);
      alert('Error adding participant: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  const handleEditClick = (participant) => {
    setEditingParticipant(participant);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedParticipant) => {
    try {
      // Use the email from the updatedParticipant to send the PUT request
      await axios.put(`http://localhost:5000/api/participants/updateParticipants/email/${updatedParticipant.email}`, updatedParticipant);
      
      // Update the local state with the updated participant
      setParticipants(participants.map(p => 
        p.email === updatedParticipant.email ? updatedParticipant : p
      ));
      
      setIsEditModalOpen(false);
      setEditingParticipant(null);
    } catch (err) {
      console.error('Error updating participant:', err);
    }
  };

  const handleDeleteClick = async (participantEmail) => {
    if (window.confirm('Are you sure you want to delete this participant?')) {
      try {
        await axios.delete(`http://localhost:5000/api/participants/deleteParticipants/email/${participantEmail}`);
        setParticipants(participants.filter(p => p.email !== participantEmail));
      } catch (err) {
        console.error('Error deleting participant:', err);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingParticipant(null);
  };

  const filteredParticipants = participants.filter(participant => 
    participant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <SidePanel />
      <div className="participant-management">
        <div className="content-area">
          <div className="content-header">
            <h1>Participant Management</h1>
            <p>Manage conference registrations and participant details</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Registrations</h3>
              <div className="value">{participants.length}</div>
            </div>
            <div className="stat-card">
              <h3>Sessions Filled</h3>
              <div className="value">85%</div>
            </div>
          </div>
          <div className="content-body">
            <div className="actions-bar">
              <input
                type="search"
                placeholder="Search participants..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className="add-button" 
                onClick={() => setIsModalOpen(true)}
              >
                Add New Participant
              </button>
            </div>

            <div className="participant-list">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Organization</th>
                    <th>Sessions Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.name}</td>
                      <td>{participant.email}</td>
                      <td>{participant.organization}</td>
                      <td>
                        <ul>
                          {participant.sessions_registered?.map((session, idx) => (
                            <li key={idx}>{session}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => handleEditClick(participant)}
                          aria-label="Edit participant"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteClick(participant.email)}
                          aria-label="Delete participant"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddParticipant}
        initialData={null}
      />

      <EditParticipantModal 
      isOpen={isEditModalOpen}
      onClose={handleModalClose}
      participant={editingParticipant}
      onSubmit={handleEditSubmit}/>
    </div>
  );
};

export default ParticipantManagement;