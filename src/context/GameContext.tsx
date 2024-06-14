import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GameContextProps {
  coins: number;
  level: number;
  bonusDrawsPerHour: number;
  bonusDraws: number;
  claimableBonusDraws: number;
  setCoins: (coins: number) => void;
  setLevel: (level: number) => void;
  setBonusDrawsPerHour: (bonusDrawsPerHour: number) => void;
  setBonusDraws: (bonusDraws: number) => void;
  setClaimableBonusDraws: (claimableBonusDraws: number) => void;
  addCoins: (amount: number) => void;
  deductBonusDraws: () => void;
  claimBonusDraws: () => void;
  addBonusDraws: (amount: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

const calculateAccumulatedBonusDraws = (lastClaimedTime: number, bonusDrawsPerHour: number): number => {
  const currentTime = Date.now();
  const elapsedTime = currentTime - lastClaimedTime;
  const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60 * 60)); // Calculate elapsed minutes
  const accumulatedBonusDraws = elapsedMinutes * bonusDrawsPerHour; // Calculate the total bonus draws based on minutes for testing purposes
  return accumulatedBonusDraws; // Return the full accumulated bonus draws
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(() => {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  const [level, setLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('level');
    return savedLevel ? parseInt(savedLevel) : 1;
  });

  const [bonusDrawsPerHour, setBonusDrawsPerHour] = useState<number>(() => {
    const savedBonusDrawsPerHour = localStorage.getItem('bonusDrawsPerHour');
    return savedBonusDrawsPerHour ? parseInt(savedBonusDrawsPerHour) : 0;
  });

  const [bonusDraws, setBonusDraws] = useState<number>(() => {
    const savedBonusDraws = localStorage.getItem('bonusDraws');
    return savedBonusDraws ? parseInt(savedBonusDraws) : 0;
  });

  const savedClaimableBonusDraws = localStorage.getItem('claimableBonusDraws');
  const savedLastClaimedTime = localStorage.getItem('lastClaimedTime');
  const lastClaimedTime = savedLastClaimedTime ? parseInt(savedLastClaimedTime) : Date.now();

  // Calculate initial claimable bonus draws
  const initialClaimableBonusDraws = savedClaimableBonusDraws
    ? parseInt(savedClaimableBonusDraws) + calculateAccumulatedBonusDraws(lastClaimedTime, bonusDrawsPerHour)
    : calculateAccumulatedBonusDraws(lastClaimedTime, bonusDrawsPerHour);

  const [claimableBonusDraws, setClaimableBonusDraws] = useState<number>(initialClaimableBonusDraws);

  const [lastClaimedTimeState, setLastClaimedTime] = useState<number>(lastClaimedTime);

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('level', level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem('bonusDrawsPerHour', bonusDrawsPerHour.toString());
  }, [bonusDrawsPerHour]);

  useEffect(() => {
    localStorage.setItem('bonusDraws', bonusDraws.toString());
  }, [bonusDraws]);

  useEffect(() => {
    localStorage.setItem('claimableBonusDraws', claimableBonusDraws.toString());
  }, [claimableBonusDraws]);

  useEffect(() => {
    localStorage.setItem('lastClaimedTime', lastClaimedTimeState.toString());
  }, [lastClaimedTimeState]);

  const deductBonusDraws = () => {
    setBonusDraws(prevBonusDraws => (prevBonusDraws > 0 ? prevBonusDraws - 1 : 0));
  };

  const addCoins = (amount: number) => {
    setCoins(prevCoins => {
      const newCoins = prevCoins + amount;
      const newLevel = Math.floor(newCoins / 10000) + 1;
      setLevel(newLevel);
      return newCoins;
    });
  };

  const claimBonusDraws = () => {
    if (claimableBonusDraws > 0) {
      setBonusDraws(prevBonusDraws => prevBonusDraws + claimableBonusDraws);
      setClaimableBonusDraws(0); // Reset claimable bonus draws to 0
      setLastClaimedTime(Date.now());
    } else {
      alert('No bonus draws to claim!');
    }
  };

  const addBonusDraws = (amount: number) => {
    setClaimableBonusDraws(prevClaimableBonusDraws => prevClaimableBonusDraws + amount);
  };

  // Refresh claimableBonusDraws every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setClaimableBonusDraws(prevClaimableBonusDraws => prevClaimableBonusDraws + bonusDrawsPerHour);
      setLastClaimedTime(Date.now());
    }, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, [bonusDrawsPerHour]);

  return (
    <GameContext.Provider value={{
      coins, level, bonusDrawsPerHour, bonusDraws, claimableBonusDraws, setCoins,
      setLevel, setBonusDrawsPerHour, setBonusDraws, setClaimableBonusDraws,
      addCoins, deductBonusDraws, claimBonusDraws, addBonusDraws
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const UseGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
