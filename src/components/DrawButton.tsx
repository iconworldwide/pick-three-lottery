import React from 'react';

interface DrawButtonProps {
  drawNumbers: () => void;
  isDisabled: boolean;
  numbersSelected: boolean;
}

const DrawButton: React.FC<DrawButtonProps> = ({ drawNumbers, isDisabled, numbersSelected }) => {
  const handleClick = () => {
    if (!numbersSelected) {
      alert('Please select a number for each position before drawing.');
    } else {
      drawNumbers();
    }
  };

  return (
    <button className='draw-button' onClick={handleClick} disabled={isDisabled}>
      Draw
    </button>
  );
};

export default DrawButton;