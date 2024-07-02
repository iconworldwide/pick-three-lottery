import React, { useEffect, useRef, useState } from 'react';
import coin from '../assets/images/coin.png';
import "./styles/coinDisplay.css";
import ProgressBar from './ProgressBar';
import HelpPopup from './HelpPopup';
import { useUserContext } from '../context/UserContext';

interface CoinDisplayProps {
  username: string;
  coins: number;
  exactMatchCount: number;
  level: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ username, coins, exactMatchCount, level }) => {
  const { user, updateUser } = useUserContext();
  const [progress, setProgress] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const rotatableImageRef = useRef<HTMLImageElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleImageClick = () => {
      const rotatableImage = rotatableImageRef.current;
      const newRotation = currentRotation + 1800; // 5 full flips

      if (rotatableImage) {
          // Quick multiple flips
          rotatableImage.style.transition = 'transform 1s ease-in-out';
          rotatableImage.style.transform = `rotateY(${newRotation}deg)`;

          // Slowly stop flipping
          setTimeout(() => {
              const finalRotation = newRotation + 360; // Additional full flip to stop slowly
              rotatableImage.style.transition = 'transform 3s ease-out';
              rotatableImage.style.transform = `rotateY(${finalRotation}deg)`;
              setCurrentRotation(finalRotation);
          }, 1000); // Wait for the quick flips to complete
      } else {
          setCurrentRotation(newRotation);
      }
  };

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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="coin-display">
      <div className='top-info-display'>
        <div>Exact matches: {exactMatchCount}</div>
        <div>{username}</div>
      </div>
      <div className="image-container-rotate">
        <img src={coin} alt="Coin" className="rotatable-image" ref={rotatableImageRef} onClick={handleImageClick} />
      </div>
      <span>G$ {coins.toLocaleString('en-us', { minimumFractionDigits: 0 })}</span>
      <div className='bottom-info-display'>
        <div>Level {level}<button className='question-button' onClick={togglePopup}>?</button></div>
        {isPopupOpen && <HelpPopup onClose={togglePopup} />}
        <div>G$ {coins.toLocaleString('en-us', { minimumFractionDigits: 0 })}/
          {Math.floor(10000 * Math.pow(2, level - 1)).toLocaleString('en-us', { minimumFractionDigits: 0 })}</div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default CoinDisplay;
