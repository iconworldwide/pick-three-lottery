import React, { createContext, useState, useContext, ReactNode } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

export interface UserCards {
    id: Number;
    title: string;
    description: string;
    price: number;
    requiredLevel: number;
    imageUrl: string;
    passed: boolean;
}

interface InvitedUsers {
  username: string;
  userId: number;
  claimed: boolean;
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
  tonWallet: string;
  followOnX: boolean;
  followOnTelegram: boolean;
  followOnYoutube: boolean;
  followTikTok: boolean;
  dailyLogin: DailyLogin;
}

interface DailyLogin {
  streak: number;
  lastLogin: Timestamp;
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
    registerUser: (user_Id: number, username: string, reference?: string) => void;
    updateUser: (user: User) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const registerUser = async (user_Id: number, username: string, reference?: string) => {
      const userId = user_Id.toString();
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
            { imageUrl: '💰', title: 'Protection', description: 'Boss Level +1', price: 10000, level: 1 },
            { imageUrl: '🎲', title: 'Gambling', description: 'Boss Level +1', price: 10000, level: 1 },
            { imageUrl: '🎁', title: 'Cigars', description: 'Boss Level +1', price: 10000, level: 1 },
            { imageUrl: '🍕', title: 'Pizza', description: 'Boss Level +1', price: 10000, level: 1 },
            { imageUrl: '💎', title: 'Diamonds', description: 'Boss Level +1', price: 10000, level: 1 },
            { imageUrl: '🏆', title: 'Cannoli', description: 'Boss Level +1', price: 10000, level: 1 },
          ] },
          cards: [],
          earnInfo: {
            tonWalletConnected: false,
            tonWallet: '',
            followOnX: false,
            followOnTelegram: false,
            followOnYoutube: false,
            followTikTok: false,
            dailyLogin: { streak: 0, lastLogin: Timestamp.fromDate(new Date()) }
          }
        };
        await setDoc(userDoc, newUser);
        setUser(newUser);
        console.log("User registered successfully!");
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