import React from 'react';

interface HelpPopupRoadmapProps {
  onClose: () => void;
}

const HelpPopupRoadmap: React.FC<HelpPopupRoadmapProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
          <div className="table-title">We are updating our roadmap regullarly</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupRoadmap;
