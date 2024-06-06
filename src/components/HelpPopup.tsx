import React from 'react';

interface HelpPopupProps {
  onClose: () => void;
}

const HelpPopup: React.FC<HelpPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>This is the information text about the game...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopup;
