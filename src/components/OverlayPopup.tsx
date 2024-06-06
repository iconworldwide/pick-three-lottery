import React, { useEffect, useState } from 'react';
import './styles/overlayPopup.css';

interface OverlayPopupProps {
  numbers: number[];
  onClose: () => void;
}

const OverlayPopup: React.FC<OverlayPopupProps> = ({ numbers, onClose }) => {
  const [visibleNumbers, setVisibleNumbers] = useState<number[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < numbers.length) {
        setVisibleNumbers((prev) => [...prev, numbers[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Change the number display interval as needed

    return () => clearInterval(interval);
  }, [numbers]);

  return (
    <div className="overlay">
      <div className="popup">
        <div className="numbers">
          {visibleNumbers.map((num, index) => (
            <span key={index} className="drawn-number">{num}</span>
          ))}
        </div>
        <div className="buttons">
          <button onClick={onClose}>OK</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OverlayPopup;
