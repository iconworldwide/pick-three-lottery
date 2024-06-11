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
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import Boost from "./pages/Boost";
import Home from "./pages/Play";
import Earn from "./pages/Earn";
import Roadmap from "./pages/Roadmap";

function App() {
  const [coins, setCoins] = useState<number>(() => {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  const [drawsPerHour, setDrawsPerHour] = useState<number>(() => {
    const savedDrawsPerHour = localStorage.getItem('drawsPerHour');
    return savedDrawsPerHour ? parseInt(savedDrawsPerHour) : 10;
  });

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('drawsPerHour', drawsPerHour.toString());
  }, [drawsPerHour]);

  const updateCoins = (newCoins: number) => {
    setCoins(newCoins);
  };

  const updateDrawsPerHour = (newDrawsPerHour: number) => {
    setDrawsPerHour(newDrawsPerHour);
  };

  return (
          <Router>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Navigate to="pick-three-lottery " />} />
                <Route path="/pick-three-lottery" element={<Home />} />
                <Route path="/boost" element={<Boost coins={coins} updateCoins={updateCoins} drawsPerHour={drawsPerHour} updateDrawsPerHour={updateDrawsPerHour} />}/>
                <Route path="/earn" element={<Earn />} />
                <Route path="/roadmap" element={<Roadmap />} />
              </Routes>
              <nav className="tab-bar">
                <NavLink to="/" className="tab-link">
                  <i className="fas fa-gamepad"></i>
                  <span>Play</span>
                </NavLink>
                <NavLink to="/boost" className="tab-link">
                  <i className="fas fa-rocket"></i>
                  <span>Boost</span>
                </NavLink>
                <NavLink to="/earn" className="tab-link">
                  <i className="fas fa-coins"></i>
                  <span>Earn</span>
                </NavLink>
                <NavLink to="/roadmap" className="tab-link">
                  <i className="fas fa-globe-americas"></i>
                  <span>Roadmap</span>
                </NavLink>
              </nav>
            </div>
    </Router>
  );
}

export default App;