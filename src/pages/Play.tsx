import "../App.css";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import CoinDisplay from "../components/CoinDisplay";
import BetForm from "../components/BetForm";
import DrawButton from "../components/DrawButton";
import { useUserContext } from '../context/UserContext';

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

  const [numbers, setNumbers] = useState<number[]>([]);
  const [exactMatch, setExactMatch] = useState<boolean>(true);

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
    drawNumbers();
  };

  return (
    <StyledApp className="tab-content">
      <AppContainer>
        <div className="container">
        {user && (
            <>
              <CoinDisplay username={user.username} coins={user.coins} exactMatchCount={user.exactMatches} level={user.level} />
              <Header lastDraw={lastDraw} />
              <BetForm
                numbers={numbers}
                exactMatch={exactMatch}
                selectNumber={selectNumber}
                toggleExactMatch={toggleExactMatch}
              />
              <DrawButton drawNumbers={handleDraw} isDisabled={isLoading} numbersSelected={isDrawEnabled} />
            </>
          )}
        </div>
      </AppContainer>
    </StyledApp>
  );
}

export default Play;