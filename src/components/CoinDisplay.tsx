import React, { useEffect, useState } from 'react';
import coin from '../assets/images/coin.png';
import "./styles/coinDisplay.css";
import ProgressBar from './ProgressBar';
import HelpPopup from './HelpPopup';

interface CoinDisplayProps {
  coins: number;
  exactMatchCount: number;
  level: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins, exactMatchCount, level }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const coinsForNextLevel = 10000 * Math.pow(2, level - 1);
    setProgress(100 * (coins / coinsForNextLevel));
  }, [coins, level]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="coin-display">
      <div className='top-info-display'>
        <div>Exact matches: {exactMatchCount}</div>
        <div>Username</div>
      </div>
      <img src={coin} alt="Coin" />
      <span>${coins.toLocaleString('en-us', { minimumFractionDigits: 0 })}</span>
      <div className='bottom-info-display'>
        <div>Level {level}<button className='question-button' onClick={togglePopup}>?</button></div>
        {isPopupOpen && <HelpPopup onClose={togglePopup} />}
        <div>${coins.toLocaleString('en-us', { minimumFractionDigits: 0 })}/
          {Math.floor(10000 * Math.pow(2, level - 1)).toLocaleString('en-us', { minimumFractionDigits: 0 })}</div>
      </div>
      <ProgressBar progress={progress} level={level} />
    </div>
  );
};

export default CoinDisplay;
