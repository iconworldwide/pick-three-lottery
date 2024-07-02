import React from 'react';

interface HelpPopupEarnProps {
  onClose: () => void;
}

const HelpPopupEarn: React.FC<HelpPopupEarnProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
          <div className="table-title">In Earn section you can earn additional G$ by executing additional tasks.</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupEarn;
