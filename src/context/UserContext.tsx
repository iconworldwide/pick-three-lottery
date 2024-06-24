import React, { createContext, useState, useContext, ReactNode } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

export interface UserCards {
    id: string;
    title: string;
    description: string;
    price: number;
    requiredLevel: number;
    imageUrl: string;
    startDate: Timestamp;
    endDate: Timestamp;
    passed: boolean;
}

interface InvitedUsers {
  username: string;
  userId: string;
}

interface BossItem {
  title: string;
  description: string;
  level: number;
  price: number;
  imageUrl: string;
}

export interface BossInfo {
  bossLevel: number;
  bossItems: BossItem[];
}

interface EarnInfo {
  tonWalletConnected: boolean;
  followOnX: boolean;
  followOnTelegram: boolean;
  dailyLogin: DailyLogin;
}

interface DailyLogin {
  streak: number;
  price: number;
}

interface User {
    userId: string;
    username: string;
    createdAt: Date;
    coins: number;
    level: number;
    exactMatches: number;
    invitedUsers: InvitedUsers[];
    bossInfo: BossInfo;
    cards: UserCards[];
    earnInfo: EarnInfo;
  }

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    registerUser: (userId: string, username: string, reference?: string) => void;
    updateUser: (user: User) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const registerUser = async (userId: string, username: string, reference?: string) => {
      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);
  
      if (!userSnapshot.exists()) {
        const newUser: User = {
          userId,
          username,
          createdAt: new Date(),
          coins: 0,
          level: 1,
          exactMatches: 0,
          invitedUsers: [],
          bossInfo: { bossLevel: 1, bossItems: [
            { imageUrl: '💰', title: 'Protection', description: 'Increase Boss Level by 1', price: 10000, level: 1 },
            { imageUrl: '🎲', title: 'Gambling', description: 'Increase Boss Level by 1', price: 10000, level: 1 },
            { imageUrl: '🎁', title: 'Cigars', description: 'Increase Boss Level by 1', price: 10000, level: 1 },
            { imageUrl: '🍕', title: 'Pizza', description: 'Increase Boss Level by 1', price: 10000, level: 1 },
            { imageUrl: '💎', title: 'Diamonds', description: 'Increase Boss Level by 1', price: 10000, level: 1 },
            { imageUrl: '🏆', title: 'Cannoli', description: 'Increase Boss Level by 1', price: 10000, level: 1 },
          ] },
          cards: [],
          earnInfo: {
            tonWalletConnected: false,
            followOnX: false,
            followOnTelegram: false,
            dailyLogin: { streak: 0, price: 0 }
          }
        };
        await setDoc(userDoc, newUser);
        setUser(newUser);
        console.log("User registered successfully!");
  
        if (reference) {
          const inviterDoc = doc(db, "users", reference);
          await updateDoc(inviterDoc, {
            invitedUsers: arrayUnion({ username, userId })
          });
        }
      } else {
        const userData = userSnapshot.data() as User;
        setUser(userData);
        console.log("User already registered.");
      }
    };

    const updateUser = async (user: User) => {
      const userDoc = doc(db, 'users', user.userId);
      await setDoc(userDoc, user, { merge: true });
      setUser(user);
    };
    
    return (
      <UserContext.Provider value={{ user, setUser, registerUser, updateUser }}>
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