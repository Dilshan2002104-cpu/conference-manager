import PropTypes from 'prop-types';

const AboutCard = ({ icon, title, description }) => {
  return (
    <div className="about-card">
      <div className="about-card-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

AboutCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AboutCard;
