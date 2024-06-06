import React, { useState } from 'react';
import './styles/betForm.css';

interface BetFormProps {
  placeBet: (numbers: number[], exactMatch: boolean) => void;
  disableBet: boolean;
}

const BetForm: React.FC<BetFormProps> = ({ placeBet, disableBet }) => {
  const [numbers, setNumbers] = useState<number[]>([null, null, null]);
  const [exactMatch, setExactMatch] = useState(true);

  const selectNumber = (position: number, num: number) => {
    const newNumbers = [...numbers];
    newNumbers[position] = num;
    setNumbers(newNumbers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numbers.every((num) => num !== null)) {
      placeBet(numbers as number[], exactMatch);
    } else {
      alert('Please select a number for each position.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bet-form">
      <div className="play-type">
        <label className="checkbox-label">
          <input
            type="radio"
            checked={exactMatch}
            onChange={() => setExactMatch(true)}
          />
          Exact
        </label>
        <label className="checkbox-label">
          <input
            type="radio"
            checked={!exactMatch}
            onChange={() => setExactMatch(false)}
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
                className={`number-button ${
                  numbers[position] === num ? 'selected' : ''
                }`}
                onClick={() => selectNumber(position, num)}
              >
                {num}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button type="submit" disabled={disableBet} className="bet-button">
        Bet
      </button>
    </form>
  );
};

export default BetForm;
