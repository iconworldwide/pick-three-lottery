import React, { useEffect, useState } from 'react';
import coin from '../assets/images/coin.png';
import "./styles/coinDisplay.css";
import ProgressBar from './ProgressBar';

interface CoinDisplayProps {
  coins: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins }) => {
  const [level, setLevel] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(100*(coins/10000));
  }, [coins]);
  

  return (
    <div className="coin-display">
      <div className='top-info-display'>
        <div>Exact matches: 3</div>
        <div>Auto draws per hour: 10</div>
      </div>
      <img src={coin} alt="Coin" />
      <span>${coins.toLocaleString('en-us', {minimumFractionDigits: 0})}</span>
      <div className='bottom-info-display'>
        <div>Level 1</div>
        <div>${coins.toLocaleString('en-us', {minimumFractionDigits: 0})}/1,000,000</div>
      </div>
      <ProgressBar progress={progress} level={level} />
    </div>
  );
};

export default CoinDisplay;
