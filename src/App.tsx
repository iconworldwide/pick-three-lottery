import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import CoinDisplay from "./components/CoinDisplay";
import BetForm from "./components/BetForm";
import DrawButton from "./components/DrawButton";

const StyledApp = styled.div`
  background-color: #e8e8e8;
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

function App() {
  
  const [lastDraw, setLastDraw] = useState<number[]>([]);
  const [coins, setCoins] = useState<number>(0);
  const [userBets, setUserBets] = useState<{ numbers: number[], exactMatch: boolean }[]>([]);
  const [isDrawEnabled, setIsDrawEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [exactMatch, setExactMatch] = useState<boolean>(true);

  // Load balance from localStorage when the app initializes

  useEffect(() => {
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins !== null) {
      setCoins(Number(savedCoins));
    }
  }, []);

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

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
  }

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

  const drawNumbers = async () => {
    setIsLoading(true);

    // Simulate drawing numbers with a delay
    const newDraw = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    setDrawnNumbers(newDraw);

    // Calculate winnings
    let winnings = 0;
    if (exactMatch) {
      const exactMatches = calculateExactMatches(numbers, newDraw);
      if (exactMatches === 3) {
        winnings = 1500;
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
    setCoins(coins + winnings);
    setIsLoading(false);
    setUserBets([]);
  };
  
  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <div className="container">
            <Header lastDraw={lastDraw} />
            <CoinDisplay coins={coins} />
            <BetForm
              numbers={numbers}
              exactMatch={exactMatch}
              selectNumber={selectNumber}
              toggleExactMatch={toggleExactMatch}
            />
            <DrawButton drawNumbers={drawNumbers} isDisabled={isLoading} numbersSelected={isDrawEnabled} />    
          </div>
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;