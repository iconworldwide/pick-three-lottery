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
        <label className="checkbox-label">
          <input
            type="radio"
            checked={exactMatch}
            onChange={toggleExactMatch}
          />
          Exact
        </label>
        <label className="checkbox-label">
          <input
            type="radio"
            checked={!exactMatch}
            onChange={toggleExactMatch}
          />
          Any
        </label>
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
