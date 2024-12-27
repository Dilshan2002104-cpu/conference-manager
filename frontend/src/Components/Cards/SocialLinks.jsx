import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './SocialLinks.css';

const SocialLinks = ({ links }) => (
  <div className="social-links">
    {links.twitter && (
      <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
        <FaXTwitter className="social-icon" />
        <span>Twitter</span>
      </a>
    )}
    {links.linkedin && (
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
        <FaLinkedin className="social-icon" />
        <span>LinkedIn</span>
      </a>
    )}
    {links.github && (
      <a href={links.github} target="_blank" rel="noopener noreferrer" className="social-link">
        <FaGithub className="social-icon" />
        <span>GitHub</span>
      </a>
    )}
  </div>
);

SocialLinks.propTypes = {
  links: PropTypes.shape({
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string,
  }),
};

export default SocialLinks;
