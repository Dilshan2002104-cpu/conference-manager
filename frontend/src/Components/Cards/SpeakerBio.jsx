import PropTypes from 'prop-types';
import './SpeakerBio.css';

const SpeakerBio = ({ title}) => {
  return (
    <div className="speaker-bio">
      <div className="speaker-title">{title}</div>
    </div>
  );
};

SpeakerBio.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SpeakerBio;
