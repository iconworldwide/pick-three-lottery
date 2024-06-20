import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GameContextProps {
  coins: number;
  level: number;
  setCoins: (coins: number) => void;
  setLevel: (level: number) => void;
  addCoins: (amount: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(() => {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  const [level, setLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('level');
    return savedLevel ? parseInt(savedLevel) : 1;
  });

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('level', level.toString());
  }, [level]);

  const addCoins = (amount: number) => {
    setCoins(prevCoins => {
      let newCoins = prevCoins + amount;
      let newLevel = level;
      let coinsForNextLevel = 10000 * Math.pow(2, newLevel - 1);
      while (newCoins >= coinsForNextLevel) {
        newCoins -= coinsForNextLevel;
        newLevel += 1;
        coinsForNextLevel = 10000 * Math.pow(2, newLevel - 1);
      }
      if (newLevel > level) {
        setLevel(newLevel);
      }

      return newCoins;
    });
  };

  return (
    <GameContext.Provider value={{ coins, level, setCoins, setLevel, addCoins }}>
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
