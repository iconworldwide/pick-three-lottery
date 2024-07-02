import React, { useState } from 'react';
import './styles/roadmap.css';
import HelpPopupRoadmap from '../components/HelpPopupRoadmap';

const steps = [
  { title: 'Step 1: TON Release', description: 'Release Pick 3 Lottery on TON', completed: true },
  { title: 'Step 2: Marketing', description: 'Start the promotion of the game', completed: true },
  { title: 'Step 3: NFT Releases', description: 'Develop the NFT concept, so Cards can be purchased as NFTs.', completed: false },
  { title: 'Step 4: Community Competitions', description: 'The community will vote thru our system for next week cards.', completed: false },
  { title: 'Step 5: Airdrop', description: 'Airdrop to users based on their cards, invited friends, levels and exact matches.', completed: false },
  { title: 'Step 6: Post-Launch', description: 'Open Gangster Games Game Studio, all holders will be airdropped Governance Token so we all decide what is next for us.', completed: false },
];



const Roadmap: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="tab-content-roadmap">
      <div className="roadmap-container">
        <h1 className="roadmap-title">Roadmap<button className='question-button' onClick={togglePopup}>?</button></h1>
        <div className="roadmap-steps">
          {steps.map((step, index) => (
            <div key={index} className={`roadmap-step ${steps[index].completed ? 'completed' : ''}`}>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
      {isPopupOpen && <HelpPopupRoadmap onClose={togglePopup} />}
    </div>
  );
};

export default Roadmap;
