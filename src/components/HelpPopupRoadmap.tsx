import React from 'react';

interface HelpPopupRoadmapProps {
  onClose: () => void;
}

const HelpPopupRoadmap: React.FC<HelpPopupRoadmapProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay-info-play">
      <div className="popup-content-info-play">
        <div>
          <div className='instructions-headline'>Roadmap Guide</div>
          <div className='instructions-h1'>The Roadmap screen provides users with the latest updates on our development progress in details. It outlines our planned milestones and gives insight into what we are currently working on and what's coming next.</div>
          <div className='instructions-headline'>In Progress</div>
          <div className='instructions-h1'><p>1.</p>Purchasing Cards as NFTs: We are working on enabling card purchases as NFTs. This will allow you to own digital assets that can be traded or sold.</div>
          <div className='instructions-h1'><p>2.</p>Community Voting System: A voting system will be implemented where the community can propose and vote on new card designs. The top 10 cards from community votes will be added to the game. Creators of the top 10 cards will receive a percentage of every NFT purchase.</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupRoadmap;
