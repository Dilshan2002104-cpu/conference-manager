import AboutSection from "../Components/About/AboutSection";
import Speaker from "../Components/Cards/Speaker";
import "./Hero.css";
import Navbar from '../Components/Navbar';

function Hero() {
  return (
    <div>
      <Navbar/>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Experience Innovation at the International Research Conference!
          </h1>
          <p>
            Discover groundbreaking research, connect with global experts, and
            be part of transformative discussions at this year’s International
            Research Conference. Plan your journey through inspiring keynote
            sessions, engaging tracks, and cutting-edge presentations.
          </p>
          <div className="hero-buttons">
            <a href="/register" className="btn btn-primary">
              Register Now
            </a>
            <a href="/session" className="btn btn-secondary">
              View Schedule
            </a>
          </div>
        </div>
      </section>
      <div>
        <AboutSection />
      </div>
      <div>
        <Speaker/>
      </div>
    </div>
  );
}

export default Hero;