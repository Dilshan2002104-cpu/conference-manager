import { Target, Users, Lightbulb, Network } from 'lucide-react';
import AboutCard from './AboutCard';
import './AboutSection.css';

const AboutSection = () => {
  const aboutCards = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description: "Fostering innovation and collaboration in technology through meaningful discussions and knowledge exchange."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Key Topics",
      description: "Artificial Intelligence, Sustainable Engineering, Cloud Computing, and emerging technologies shaping our future."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Who Attends",
      description: "Industry leaders, researchers, engineers, and innovators from around the globe, creating a diverse learning environment."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Networking",
      description: "Connect with leading experts, form valuable partnerships, and join a community of forward-thinking professionals."
    }
  ];

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-header">
          <h2>About the Conference</h2>
          <p>Join us for a transformative experience at the International Research Conference, where innovation meets collaboration.</p>
        </div>
        <div className="about-grid">
          {aboutCards.map((card, index) => (
            <AboutCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;