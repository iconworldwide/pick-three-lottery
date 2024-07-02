import React from 'react';

interface HelpPopupCardsProps {
  onClose: () => void;
}

const HelpPopupCards: React.FC<HelpPopupCardsProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
          <div className="table-title">This are your cards</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupCards;
