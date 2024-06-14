import React, { useEffect, useState } from 'react';
import coin from '../assets/images/coin.png';
import "./styles/coinDisplay.css";
import ProgressBar from './ProgressBar';
import HelpPopup from './HelpPopup';

interface CoinDisplayProps {
  coins: number;
  exactMatchCount: number;
  bonusDrawsPerHour: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins, exactMatchCount, bonusDrawsPerHour }) => {
  const [level, setLevel] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setProgress(100*(coins/10000));
  }, [coins]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="coin-display">
      <div className='top-info-display'>
        <div>Exact matches: {exactMatchCount}</div>
        <div>Auto draws per hour: {bonusDrawsPerHour}</div>
      </div>
      <img src={coin} alt="Coin" />
      <span>${coins.toLocaleString('en-us', {minimumFractionDigits: 0})}</span>
      <div className='bottom-info-display'>
        <div>Level 1<button className='question-button' onClick={togglePopup}>?</button></div>
        {isPopupOpen && <HelpPopup onClose={togglePopup} />}
        <div>${coins.toLocaleString('en-us', {minimumFractionDigits: 0})}/10,000</div>
      </div>
      <ProgressBar progress={progress} level={level} />
    </div>
  );
};

export default CoinDisplay;