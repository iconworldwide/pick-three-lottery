import React from 'react';
import coin from '../assets/images/coin.png';
import "./styles/coinDisplay.css";

interface CoinDisplayProps {
  coins: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins }) => {

  return (
    <div className="coin-display">
      <img src={coin} alt="Coin" />
      <span>${coins.toLocaleString('en-us', {minimumFractionDigits: 0})}</span>
    </div>
  );
};

export default CoinDisplay;
