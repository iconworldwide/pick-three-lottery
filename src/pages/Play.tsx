import "../App.css";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import CoinDisplay from "../components/CoinDisplay";
import BetForm from "../components/BetForm";
import DrawButton from "../components/DrawButton";
import { useUserContext } from '../context/UserContext';
import Godfather from '../assets/images/godfather.png';
import Loading from '../assets/images/spinner.gif';
import coin from '../assets/images/coin.png';
import HelpPopup from "../components/HelpPopup";

const StyledApp = styled.div`
  background-color: #222;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function Play() {
  const { user, updateUser } = useUserContext();
  const [lastDraw, setLastDraw] = useState<number[]>([0, 0, 0]);
  const [isDrawEnabled, setIsDrawEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [numbers, setNumbers] = useState<number[]>([]);
  const [exactMatch, setExactMatch] = useState<boolean>(true);

  useEffect (() => {
    // Ensure the WebApp is ready before calling the method
    const tg = window.Telegram.WebApp;
    tg.onEvent('webAppReady', () => {
      tg.disableVerticalSwipes(); 
      console.log('Vertical swipes disabled:', !tg.isVerticalSwipesEnabled);
    });
    // If the WebApp is already initialized
    if(tg.initDataUnsafe) {
      tg.disableVerticalSwipes(); 
      console.log('Vertical swipes disabled:', !tg.isVerticalSwipesEnabled);
    }
  }, []) ;

  const selectNumber = (position: number, num: number) => {
    const newNumbers = [...numbers];
    newNumbers[position] = num;
    setNumbers(newNumbers);
    if (newNumbers.every((n) => n !== null)) {
      setIsDrawEnabled(true);
    } else {
      setIsDrawEnabled(false);
    }
  };

  const toggleExactMatch = () => {
    setExactMatch(!exactMatch);
  };

  const calculateExactMatches = (userNumbers: number[], drawnNumbers: number[]): number => {
    let matchCount = 0;
    userNumbers.forEach((num, index) => {
      if (num === drawnNumbers[index]) {
        matchCount++;
      }
    });
    return matchCount;
  };

  const calculateAnyMatches = (userNumbers: number[], drawnNumbers: number[]): number => {
    let matchCount = 0;
    const drawnNumbersCopy = [...drawnNumbers];
    userNumbers.forEach((num) => {
      const index = drawnNumbersCopy.indexOf(num);
      if (index !== -1) {
        matchCount++;
        drawnNumbersCopy[index] = -1; // Mark this number as matched
      }
    });
    return matchCount;
  };

  const performDraw = async () => {
    if (!user) return;
    // Simulate drawing numbers with a delay
    const newDraw = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    // Calculate winnings
    let winnings = 0;
    let exactMatchesCounter = user.exactMatches;
    if (exactMatch) {
      const exactMatches = calculateExactMatches(numbers, newDraw);
      if (exactMatches === 3) {
        winnings = 1500;
        exactMatchesCounter = exactMatchesCounter + 1;
      } else if (exactMatches === 2) {
        winnings = 1000;
      }
    } else {
      const anyMatches = calculateAnyMatches(numbers, newDraw);
      if (anyMatches === 3) {
        winnings = 500;
      } else if (anyMatches === 2) {
        winnings = 250;
      }
    }

    setLastDraw(newDraw);
    // Update user data
    const updatedUser = { ...user, coins: user.coins + winnings, exactMatches: exactMatchesCounter };
    await updateUser(updatedUser);
  };

  const drawNumbers = async () => {
    setIsLoading(true);
    await performDraw();
    setIsLoading(false);
  };

  const handleDraw = () => {
    if (!isDrawEnabled) {
      alert('Please select a number for each position before drawing.');
    } else {
      drawNumbers();
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  if (!user) {
    return <div className='no-user'>
      <div>
        <img style={{ width: '240px'}} src={Godfather} alt="godfather" />
      </div>
      <div>
        <img style={{ width: '100px'}} src={Loading} alt="spinner" />
      </div>
    </div>;
  }

  return (
    <StyledApp className="tab-content">
      <AppContainer>
        <div className="container">
        {user && (
            <>
              <CoinDisplay username={user.username} coins={user.coins} exactMatchCount={user.exactMatches} level={user.level} />
              <BetForm
                numbers={numbers}
                exactMatch={exactMatch}
                selectNumber={selectNumber}
                toggleExactMatch={toggleExactMatch}
              />
              <Header lastDraw={lastDraw} />
              <button className='draw-main-button' onClick={handleDraw} disabled={isLoading}>
                <img src={coin} alt="Coin" className="rotatable-image" />
              </button>
              <div className="instruction-container">
                <span>Tap to play</span>
                <span className="instruction-rewards-container">View rewards<button className='question-button' onClick={togglePopup}>?</button></span>
              </div>
              {isPopupOpen && <HelpPopup onClose={togglePopup} />}
              {/* <DrawButton drawNumbers={handleDraw} isDisabled={isLoading} numbersSelected={isDсrawEnabled} /> */}
            </>
         )}
        </div>
      </AppContainer>
    </StyledApp>
  );
}

export default Play;