import React from 'react';

interface HelpPopupBossProps {
  onClose: () => void;
}

const HelpPopupBoss: React.FC<HelpPopupBossProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
          <div className="table-title">This is your Boss, Capo di tutti capi</div>
      </div>
      <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupBoss;
