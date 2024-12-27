import SpeakerCard from './SpeakerCard';
import {speakersData} from '../data/speakersData'
import './Speaker.css';

const Speaker = () => {
  return (
    <div className="app-container">
    <h1>Conference Sessions</h1>
    <div className="cards-container">
      {speakersData.map(speaker => (
        <SpeakerCard 
          key={speaker.id}
          {...speaker}
        />
      ))}
    </div>
  </div>
  )
}

export default Speaker