import React, { useEffect, useRef, useState } from 'react';
import "./styles/coinDisplay.css";
import ProgressBar from './ProgressBar';
import HelpPopup from './HelpPopup';
import { useUserContext } from '../context/UserContext';
import HelpPopupInfoPlay from './HelpPopupInfoPlay';

interface CoinDisplayProps {
  username: string;
  coins: number;
  exactMatchCount: number;
  level: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ username, coins, exactMatchCount, level }) => {
  const { user, updateUser } = useUserContext();
  const [progress, setProgress] = useState<number>(0);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  useEffect(() => {
    const coinsForNextLevel = 10000 * Math.pow(2, level - 1);
    let updatedCoins = coins;
    let updatedLevel = level;
    let levelUpOccurred = false;

    if (coins >= coinsForNextLevel) {
      updatedCoins -= coinsForNextLevel;
      updatedLevel += 1;
      levelUpOccurred = true;
      setProgress(100 * (updatedCoins / (10000 * Math.pow(2, updatedLevel - 1))));
    } else {
      setProgress(100 * (updatedCoins / coinsForNextLevel));
    }

    if (levelUpOccurred && user) {
      const upUser = async () => {
        const updatedUser = { ...user, coins: updatedCoins, level: updatedLevel };
        await updateUser(updatedUser);
      };
      upUser();
    }

  }, [coins, level]);

  const toggleInfoPopup = () => {
    setIsInfoPopupOpen(!isInfoPopupOpen);
  };

  return (
    <div className="coin-display">
      <div className='top-info-display'>
        <div>Exact matches: {exactMatchCount}</div>
        <div>{username}<button className='question-button' onClick={toggleInfoPopup}>?</button></div>
      </div>
      <span className='balance-display'>G$ {coins.toLocaleString('en-us', { minimumFractionDigits: 0 })}</span>
      <div className='bottom-info-display'>
        <div>Level {level}</div>
        {isInfoPopupOpen && <HelpPopupInfoPlay onClose={toggleInfoPopup} />}
        <div>G$ {coins.toLocaleString('en-us', { minimumFractionDigits: 0 })}/
          {Math.floor(10000 * Math.pow(2, level - 1)).toLocaleString('en-us', { minimumFractionDigits: 0 })}</div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default CoinDisplay;
