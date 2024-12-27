import PropTypes from 'prop-types';
import { calculateOccupancy, getOccupancyColor } from '../utils/seatCalculations';
import SpeakerBio from './SpeakerBio';
import SessionDescription from './SessionDescription';
import './SpeakerCard.css';
import { useNavigate } from 'react-router-dom';

const SpeakerCard = ({ 
  speakerName, 
  title,
  sessionTitle,
  sessionDescription,
  time,
  venue,
  totalSeats,
  availableSeats,
  photo,
}) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const occupancyPercentage = calculateOccupancy(availableSeats, totalSeats);
  const progressColor = getOccupancyColor(occupancyPercentage);

  const handleEnroll = () => {
    
  };

  const handleViewDetails = () => {
    navigate('/session'); // You can also navigate to the same route or a different one
  };

  return (
    <div className="speaker-card">
      <img src={photo} alt={speakerName} className="speaker-photo" />
      
      <div className="speaker-info">
        <h2>{speakerName}</h2>
        <h3>{sessionTitle}</h3>
      </div>

      <SpeakerBio title={title} />
      
      <SessionDescription description={sessionDescription} />
      
      <div className="session-details">
        <div className="detail-item">
          <span className="icon">🕒</span>
          <span>{time}</span>
        </div>
        <div className="detail-item">
          <span className="icon">📍</span>
          <span>{venue}</span>
        </div>
      </div>

      <div className="seats-info">
        <div className="seats-text">
          <span>Available Seats: {availableSeats}/{totalSeats}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${occupancyPercentage}%`,
              backgroundColor: progressColor
            }}
          ></div>
        </div>
      </div>

      <div className="button-container">
        <button 
          className="btn btn-enroll" 
          onClick={handleEnroll}
          disabled={availableSeats === 0}
        >
          Enroll Now
        </button>
        <button 
          className="btn btn-details"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Prop Validation
SpeakerCard.propTypes = {
  speakerName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sessionTitle: PropTypes.string.isRequired,
  sessionDescription: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  totalSeats: PropTypes.number.isRequired,
  availableSeats: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default SpeakerCard;