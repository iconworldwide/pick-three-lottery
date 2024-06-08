import React, { useEffect, useState } from 'react';
import HelpPopup from './HelpPopup';
import './styles/header.css';

interface HeaderProps {
  lastDraw: number[];
}

const Header: React.FC<HeaderProps> = ({ lastDraw }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  
  useEffect(() => {
    lastDraw.forEach((num, index) => {
      setTimeout(() => {
        setAnimatedNumbers((prev) => {
          const newNumbers = [...prev];
          newNumbers[index] = num;
          return newNumbers;
        });
      }, index * 1); // Stagger the animations
    });
  }, [lastDraw]);

  return (
    <header>
      <div className="header-content">
        <span className='last-draw-title'>Last draw:</span>
        {animatedNumbers.map((num, index) => (
          <div key={index} className="draw-number rolling-number">
            <div className="number-container">{num}</div>
          </div>
        ))}
      </div>
      <button className='question-button' onClick={togglePopup}>?</button>
      {isPopupOpen && <HelpPopup onClose={togglePopup} />}
    </header>
  );
};

export default Header;
