import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from '../firebase';  // Import Firestore functions
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

interface UserContextProps {
    userId: string | null;
    username: string | null;
    coins: number;
    level: number;
    exactMatches: number;
    registerUser: (userId: string, username: string, reference?: string) => Promise<void>;
    fetchUserData: (userId: string) => Promise<void>;
    addCoins: (amount: number) => void;
    updateLevel: (level: number) => void;
    updateExactMatches: (exactMatch: number) => void;
  }

  const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [coins, setCoins] = useState<number>(0);
    const [level, setLevel] = useState<number>(1);
    const [exactMatches, setExactMatches] = useState<number>(0);

    const registerUser = async (userId: string, username: string, reference?: string) => {
        const userDoc = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDoc);

        if (!userSnapshot.exists()) {
          await setDoc(userDoc, {
            username: username,
            userId: userId,
            createdAt: new Date(),
            coins: 0,
            level: 1,
            exactMatches: 0,
            invitedUsers: []
          });
          setUserId(userId);
          setUsername(username);
          console.log("User registered successfully!");
    
          if (reference) {
            const inviterDoc = doc(db, "users", reference);
            await updateDoc(inviterDoc, {
              invitedUsers: arrayUnion({ username, userId })
            });
          }
        } else {
          const userData = userSnapshot.data();
          setUserId(userData.userId);
          setUsername(userData.username);
          setCoins(userData.coins);
          setLevel(userData.level);
          setExactMatches(userData.exactMatches)
          // TODO: - set last active date
          // TODO: - add boss level
          // TODO: - add boss items levels
          // TODO: - add cards
          // TODO: - add Earn Tab 
          // TODO: - 
          console.log("User already registered.");
        }
      };

    const fetchUserData = async (userId: string) => {
        const userDoc = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDoc);
    
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserId(userData.userId);
          setUsername(userData.username);
          setCoins(userData.coins);
          setLevel(userData.level);
          setExactMatches(userData.exactMatches)
          // TODO: - set last active date
        }
      };

      const addCoins = async (amount: number) => {
        if (userId) {
          const userDoc = doc(db, "users", userId);
          const newCoins = coins + amount;
          await updateDoc(userDoc, { coins: newCoins });
          setCoins(newCoins);
        }
      };
    
      const updateLevel = async (newLevel: number) => {
        if (userId) {
          const userDoc = doc(db, "users", userId);
          await updateDoc(userDoc, { level: newLevel });
          setLevel(newLevel);
        }
      };

      const updateExactMatches = async (exactMatch: number) => {
        if (userId) {
          const userDoc = doc(db, "users", userId);
          const newExactMatches = exactMatches + exactMatch;
          await updateDoc(userDoc, { exactMatches: newExactMatches });
          setExactMatches(newExactMatches);
        }
      };
    
    return (
        <UserContext.Provider value={{
            userId, username, coins, level, exactMatches, registerUser, fetchUserData, addCoins, updateLevel, updateExactMatches
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};