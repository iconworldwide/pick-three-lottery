import React, { useEffect, useState } from 'react';
import HelpPopup from './HelpPopup';
import './styles/header.css';

interface HeaderProps {
  lastDraw: number[];
}

const Header: React.FC<HeaderProps> = ({ lastDraw }) => {
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);
  
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
      <div className="header-content">
        <span className='last-draw-title'>Last draw:</span>
        {animatedNumbers.map((num, index) => (
          <div key={index} className="draw-number rolling-number">
            <div className="number-container">{num}</div>
          </div>
        ))}
      </div>
  );
};

export default Header;
