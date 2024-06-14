  import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

  interface GameContextProps {
    coins: number;
    level: number;
    autoDraws: number;
    setCoins: (coins: number) => void;
    setLevel: (level: number) => void;
    setAutoDraws: (autoDraws: number) => void;
    addCoins: (amount: number) => void;
    deductAutoDraws: () => void;
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

    const [autoDraws, setAutoDraws] = useState<number>(() => {
      const savedAutoDraws = localStorage.getItem('autoDraws');
      return savedAutoDraws ? parseInt(savedAutoDraws) : 10;
    });

    useEffect(() => {
      localStorage.setItem('coins', coins.toString());
    }, [coins]);

    useEffect(() => {
      localStorage.setItem('level', level.toString());
    }, [level]);

    useEffect(() => {
      localStorage.setItem('autoDraws', autoDraws.toString());
    }, [autoDraws]);

    const deductAutoDraws = () => {
      setAutoDraws(prevAutoDraws => {
        return prevAutoDraws > 0 ? prevAutoDraws - 1 : 0;
      });
    };

    const addCoins = (amount: number) => {
      setCoins(prevCoins => {
        const newCoins = prevCoins + amount;
        const newLevel = Math.floor(newCoins / 10000) + 1;
        setLevel(newLevel);
        return newCoins;
      });
    };

    return (
      <GameContext.Provider value={{ coins, level, autoDraws, setCoins, setLevel, setAutoDraws, addCoins, deductAutoDraws }}>
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
