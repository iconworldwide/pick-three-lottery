import React from 'react';

interface DrawButtonProps {
  drawNumbers: () => void;
  isDisabled: boolean;
}

const DrawButton: React.FC<DrawButtonProps> = ({ drawNumbers, isDisabled }) => {
  return (
    <button className='draw-button' onClick={drawNumbers} disabled={isDisabled}>Draw</button>
  );
};

export default DrawButton;
