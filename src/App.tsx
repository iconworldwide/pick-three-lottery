import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
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
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import Boost from "./pages/Boost";
import Play from "./pages/Play";
import Earn from "./pages/Earn";
import Roadmap from "./pages/Roadmap";
import Onboarding from './pages/Onboarding';
import { GameProvider } from './context/GameContext';

function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(() => {
    const onboardingCompleted = localStorage.getItem('newOnboardingCompleted');
    return onboardingCompleted === 'true';
  });

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
    localStorage.setItem('newOnboardingCompleted', 'true');
  };

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const tg = window.Telegram.WebApp;
  tg.enableClosingConfirmation();
  tg.expand();
  return (
    <GameProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/pick-three-lottery/play" />} />
            <Route path="/pick-three-lottery" element={<Navigate to="/pick-three-lottery/play" />} />
            <Route path="/pick-three-lottery/play" element={<Play />} />
            <Route path="/pick-three-lottery/boost" element={<Boost />} />
            <Route path="/pick-three-lottery/earn" element={<Earn />} />
            <Route path="/pick-three-lottery/roadmap" element={<Roadmap />} />
          </Routes>
          <nav className="tab-bar">
            <NavLink to="/pick-three-lottery/play" className="tab-link">
              <i className="fas fa-gamepad"></i>
              <span>Play</span>
            </NavLink>
            <NavLink to="/pick-three-lottery/boost" className="tab-link">
              <i className="fas fa-rocket"></i>
              <span>Boost</span>
            </NavLink>
            <NavLink to="/pick-three-lottery/earn" className="tab-link">
              <i className="fas fa-coins"></i>
              <span>Earn</span>
            </NavLink>
            <NavLink to="/pick-three-lottery/roadmap" className="tab-link">
              <i className="fas fa-globe-americas"></i>
              <span>Roadmap</span>
            </NavLink>
          </nav>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;