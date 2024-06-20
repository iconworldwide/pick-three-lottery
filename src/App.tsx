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
import Boss from "./pages/Boss";
import Play from "./pages/Play";
import Earn from "./pages/Earn";
import Roadmap from "./pages/Roadmap";
import Onboarding from './pages/Onboarding';
import { GameProvider } from './context/GameContext';
import { db } from './firebase';  // Import Firestore functions
import { doc, setDoc, getDoc } from "firebase/firestore";
import Cards from "./pages/Cards";

declare global {
  interface Window {
      Telegram:any;
  }
}

function App() {
  // Extract the user_id parameter from the URL
  function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id');
  }

  function getUsernameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
  }
  
  const registerUser = async (userId: string, username: string) => {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await setDoc(userDoc, {
        username: username,
        userId: userId,
        createdAt: new Date(),
        coins: 0,
        level: 1,
        exactMatchCount: 0,
        tries: 100,
        maxTries: 100,
        lastClaimedTime: new Date()
      });
      console.log("User registered successfully!", userDoc);
    } else {
      console.log("User already registered.");
    }
  };

  if (getUserIdFromUrl()) {
    registerUser(getUserIdFromUrl() ?? "", getUsernameFromUrl() ?? "");
    // Add your logic to handle the user ID here
  }

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
              <Route path="/pick-three-lottery/boss" element={<Boss />} />
              <Route path="/pick-three-lottery/cards" element={<Cards />} />
              <Route path="/pick-three-lottery/earn" element={<Earn />} />
              <Route path="/pick-three-lottery/roadmap" element={<Roadmap />} />
            </Routes>
            <nav className="tab-bar">
              <NavLink to="/pick-three-lottery/play" className="tab-link">
                <i className="fas fa-gamepad"></i>
                <span>Play</span>
              </NavLink>
              <NavLink to="/pick-three-lottery/boss" className="tab-link">
                <i className="fas fa-rocket"></i>
                <span>Boss</span>
              </NavLink>

              <NavLink to="/pick-three-lottery/cards" className="tab-link">
                <i className="far fa-file-image"></i>
                <span>Cards</span>
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