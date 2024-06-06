import React, { useState } from 'react';
import HelpPopup from './HelpPopup';
import './styles/header.css';

interface HeaderProps {
  lastDraw: number[];
}

const Header: React.FC<HeaderProps> = ({ lastDraw }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header>
      <div className="header-content">
        <span className='last-draw-title'>Last draw:</span>
        {lastDraw.map((num, index) => (
          <span key={index} className="draw-number">{num}</span>
        ))}
      </div>
      <button className='question-button' onClick={togglePopup}>?</button>
      {isPopupOpen && <HelpPopup onClose={togglePopup} />}
    </header>
  );
};

export default Header;
