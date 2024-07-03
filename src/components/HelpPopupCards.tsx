import React from 'react';

interface HelpPopupCardsProps {
  onClose: () => void;
}

const HelpPopupCards: React.FC<HelpPopupCardsProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay-info-play">
      <div className="popup-content-info-play">
        <div>
          <div className='instructions-headline'>Cards Guide</div>
          <div className='instructions-h1'>Collecting Cards</div>
          <div className='instructions-list'>• Enjoy the thrill of collecting unique and rare cards.</div>
          <div className='instructions-list'>• Display your collection in the Owned tab.</div>
          <div className='instructions-list'>• Participate in the community voting system.</div>
          <div className='instructions-list'>• Earn rewards by proposing popular card designs.</div>
          <div className='instructions-list'>• In the future, own digital assets that can be traded, sold, or held as collectibles.</div>
          <div className='instructions-headline'>Tips</div>
          <div className='instructions-list'>• Regularly check the Current tab for new cards available for purchase.</div>
          <div className='instructions-list'>• Monitor your coin balance to ensure you have enough to purchase desired cards.</div>
          <div className='instructions-list'>• Stay updated with future developments to take advantage of the NFT purchases and community voting system.</div>
          <div className='instructions-list'>• Update your Boss level, so you can purchase cards with higher required Boss level.</div>
          <div className='instructions-body'>The Cards screen allows users to purchase and collect various cards using their coins. Users can view both current and past cards. Future developments include the ability to purchase cards as NFTs and a community voting system to influence card creation.</div>
          <div className='instructions-body'>By following this guide, you will have a better understanding of the Cards screen and how to strategically collect and purchase cards for maximum enjoyment and future rewards. Happy collecting!</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupCards;
