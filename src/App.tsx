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
import { useState } from "react";
import CoinDisplay from "./components/CoinDisplay";
import BetForm from "./components/BetForm";
import DrawButton from "./components/DrawButton";
import OverlayPopup from "./components/OverlayPopup";

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
  
  const [lastDraw, setLastDraw] = useState<number[]>([9, 9, 9]);
  const [coins, setCoins] = useState<number>(1824);
  const [userBets, setUserBets] = useState<{ numbers: number[], exactMatch: boolean }[]>([]);
  const [isDrawEnabled, setIsDrawEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);

  const placeBet = (numbers: number[], exactMatch: boolean) => {
    setUserBets([...userBets, { numbers, exactMatch }]);
    setIsDrawEnabled(true);
  };

  const drawNumbers = async () => {
    setIsLoading(true);
    setShowOverlay(true);

    // Simulate drawing numbers with a delay
    const newDraw = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    setDrawnNumbers(newDraw);

    // Check for winning numbers
    userBets.forEach(bet => {
      const isWinner = bet.exactMatch
        ? bet.numbers.every((num, index) => num === newDraw[index])
        : bet.numbers.every(num => newDraw.includes(num));

      if (isWinner) {
        setCoins(coins + 100); // Update coins based on the win
      }
    });

    setLastDraw(newDraw);
    setIsLoading(false);
    setUserBets([]);
    setIsDrawEnabled(false);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <div className="container">
            <Header lastDraw={lastDraw} />
            <CoinDisplay coins={coins} />
            <BetForm placeBet={placeBet} disableBet={isLoading || isDrawEnabled} />
            <DrawButton drawNumbers={drawNumbers} isDisabled={!isDrawEnabled || isLoading} />
            {showOverlay && <OverlayPopup numbers={drawnNumbers} onClose={closeOverlay} />}
          </div>
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
