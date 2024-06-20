import React, { useState } from 'react';
import './styles/betForm.css';

interface BetFormProps {
  numbers: number[];
  exactMatch: boolean;
  selectNumber: (position: number, num: number) => void;
  toggleExactMatch: () => void;
}

const BetForm: React.FC<BetFormProps> = ({ numbers, exactMatch, selectNumber, toggleExactMatch }) => {
  return (
    <div className="bet-form">
      <div className="play-type">
        <div className='radio-item'>
            <input
              id='exactMatch'
              type="radio"
              checked={exactMatch}
              onChange={toggleExactMatch}
            />
            <label htmlFor='exactMatch' className="checkbox-label">
            Exact Order
          </label>
        </div>
        <div className='radio-item'>
            <input
              id='anyMatch'
              type="radio"
              checked={!exactMatch}
              onChange={toggleExactMatch}
            />
            <label htmlFor='anyMatch' className="checkbox-label">
            Any Order
          </label>
        </div>
      </div>
      <div className="number-grid">
        {[0, 1, 2].map((position) => (
          <div key={position} className="number-line">
            {[...Array(10).keys()].map((num) => (
              <button
                key={num}
                type="button"
                className={`number-button ${numbers[position] === num ? 'selected' : ''}`}
                onClick={() => selectNumber(position, num)}
              >
                {num}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetForm;
