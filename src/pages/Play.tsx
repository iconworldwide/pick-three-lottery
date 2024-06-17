import "../App.css";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import CoinDisplay from "../components/CoinDisplay";
import BetForm from "../components/BetForm";
import DrawButton from "../components/DrawButton";
import { UseGameContext } from '../context/GameContext';

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
  const { coins, bonusDraws, level, bonusDrawsPerHour, tries, maxTries, setBonusDraws, addCoins, deductBonusDraws, updateTries } = UseGameContext();
  const [lastDraw, setLastDraw] = useState<number[]>([0, 0, 0]);
  const [userBets, setUserBets] = useState<{ numbers: number[], exactMatch: boolean }[]>([]);
  const [isDrawEnabled, setIsDrawEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [exactMatch, setExactMatch] = useState<boolean>(true);
  const [exactMatchCount, setExactMatchCount] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isBonusDraw, setIsBonusDraw] = useState<boolean>(false);

  // Load balance from localStorage when the app initializes
  useEffect(() => {
    const savedExactMatchCount = localStorage.getItem('exactMatchCount');
    if (savedExactMatchCount !== null) {
      setExactMatchCount(Number(savedExactMatchCount));
    }

    const savedBonusDraws = localStorage.getItem('bonusDraws');
    if (savedBonusDraws !== null) {
      setBonusDraws(Number(savedBonusDraws));
    }
  }, [setBonusDraws]);

  useEffect(() => {
    localStorage.setItem('exactMatchCount', exactMatchCount.toString());
  }, [exactMatchCount]);

  useEffect(() => {
    if (tries < maxTries) {
      intervalRef.current = setInterval(() => {
        updateTries(true);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tries, maxTries]);

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
    // Simulate drawing numbers with a delay
    const newDraw = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    setDrawnNumbers(newDraw);

    // Calculate winnings
    let winnings = 0;
    if (exactMatch) {
      const exactMatches = calculateExactMatches(numbers, newDraw);
      if (exactMatches === 3) {
        winnings = 1500;
        setExactMatchCount(prevCount => prevCount + 1);
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
    addCoins(winnings); // Ensure coins are updated correctly
  };

  const drawNumbers = async () => {
    setIsLoading(true);

    if (isBonusDraw) {
      for (let i = 0; i < bonusDraws; i++) {
        if (bonusDraws > 0) {
          await performDraw();
          deductBonusDraws();
          // await new Promise(resolve => setTimeout(resolve, 1)); // Wait 1 second between draws
        }
      }
    } else {
      await performDraw();
      updateTries(false);
    }

    setIsLoading(false);
    setUserBets([]);
  };

  const handleDraw = () => {
    if (tries <= 0 && !isBonusDraw) return;
    drawNumbers();
  };

  return (
    <StyledApp className="tab-content">
      <AppContainer>
        <div className="container">
          <CoinDisplay coins={coins} exactMatchCount={exactMatchCount} bonusDrawsPerHour={bonusDrawsPerHour} level={level} />
          <Header lastDraw={lastDraw} />
          <BetForm
            numbers={numbers}
            exactMatch={exactMatch}
            selectNumber={selectNumber}
            toggleExactMatch={toggleExactMatch}
          />
          <div className="autodraw-container">
            <label className="autodraw-label">Bonus draw mode</label>
            <input
              type="checkbox"
              checked={isBonusDraw}
              onChange={() => setIsBonusDraw(!isBonusDraw)}
              className="autodraw-switch"
            />
          </div>
          <DrawButton drawNumbers={handleDraw} isDisabled={isLoading} numbersSelected={isDrawEnabled} />
          <div className="status">
            <label>Draws: {tries}/{maxTries}</label>
            <label>Bonus draws: {bonusDraws}</label>
          </div>
        </div>
      </AppContainer>
    </StyledApp>
  );
}

export default Play;