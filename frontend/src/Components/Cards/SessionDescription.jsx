import PropTypes from 'prop-types';
import './SessionDescription.css';

const SessionDescription = ({ description }) => (
  <div className="session-description">
    <h4>About This Session</h4>
    <p>{description}</p>
  </div>
);

SessionDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default SessionDescription;
