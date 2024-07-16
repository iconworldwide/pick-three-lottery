import "./App.css";
import "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import Boss from "./pages/Boss";
import Play from "./pages/Play";
import Earn from "./pages/Earn";
import Roadmap from "./pages/Roadmap";
import Onboarding from './pages/Onboarding';
import { GameProvider } from './context/GameContext';
import { db } from './firebase';  // Import Firestore functions
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Cards from "./pages/Cards";
import { UserProvider, useUserContext } from './context/UserContext';

declare global {
  interface Window {
      Telegram:any;
  }
}

const AppWrapper: React.FC = () => {
  const { registerUser, user } = useUserContext();
  useEffect(() => {
    const params = new URLSearchParams(window.Telegram.WebApp.initData);
    const userData = Object.fromEntries(params);
    if (userData.user) {
      const userInformation = JSON.parse(userData.user);
      if (userInformation.id && !user) {
        const usernameFirstName = userInformation.username ? userInformation.username : userInformation.first_name;
        registerUser(userInformation.id, usernameFirstName);

        const searchParams = new URLSearchParams(window.location.search);
        const queryString = searchParams.toString();
        if(queryString) {
          const refId = searchParams.get("tgWebAppStartParam");
          if (refId) {
            const refIdString = extractRefIdNumber(refId);
            if (refIdString !== null) {
              saveInvitation(refIdString, userInformation.id, usernameFirstName);
            }
          }
        }
      }
    }
  }, []);

  const saveInvitation = async (refId: string, invitedUserId: number, invitedUsername: string) => {
    try {
      const refUserDoc = doc(db, "users", refId);
      await updateDoc(refUserDoc, {
        invitedUsers: arrayUnion({ userId: invitedUserId, username: invitedUsername })
      });
      console.log("Invitation saved successfully!");
    } catch (error) {
      console.error("Error saving invitation: ", error);
    }
  };

  function extractRefIdNumber(refIdString: string) {
    const refIdPattern = /^refId(\d+)$/;
    const match = refIdString.match(refIdPattern);
    
    if (match) {
      return match[1];  // This will return the numbers after "refId"
    } else {
      return null;  // Return null if the string does not match the pattern
    }
  }

  return null;
};

const App: React.FC = () => {
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
      <UserProvider>
        <AppWrapper />
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Navigate to={`/pick-three-lottery/play`} />} />
              <Route path="/pick-three-lottery" element={<Navigate to={`/pick-three-lottery/play`} />} />
              <Route path="/pick-three-lottery/play" element={<Play />} />
              <Route path="/pick-three-lottery/boss" element={<Boss />} />
              <Route path="/pick-three-lottery/cards" element={<Cards />} />
              <Route path="/pick-three-lottery/earn" element={<Earn />} />
              <Route path="/pick-three-lottery/roadmap" element={<Roadmap />} />
            </Routes>
            <nav className="tab-bar">
              <NavLink to={`/pick-three-lottery/play`} className="tab-link">
                <i className="fas fa-gamepad"></i>
                <span>Play</span>
              </NavLink>
              <NavLink to={`/pick-three-lottery/boss`} className="tab-link">
                <i className="fas fa-rocket"></i>
                <span>Boss</span>
              </NavLink>

              <NavLink to={`/pick-three-lottery/cards`} className="tab-link">
                <i className="far fa-file-image"></i>
                <span>Cards</span>
              </NavLink>

              <NavLink to={`/pick-three-lottery/earn`} className="tab-link">
                <i className="fas fa-coins"></i>
                <span>Earn</span>
              </NavLink>
              <NavLink to={`/pick-three-lottery/roadmap`} className="tab-link">
                <i className="fas fa-globe-americas"></i>
                <span>Roadmap</span>
              </NavLink>
            </nav>
          </div>
        </Router>
      </UserProvider>
  );
}

export default App;