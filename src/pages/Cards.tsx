import React, { useState, useEffect } from 'react';
import { UseGameContext } from '../context/GameContext';
import styled from 'styled-components';
import Collectible from '../components/Collectible';
import { ItemType } from '../models/tyles';
import rudy from '../assets/images/cards/rudy.png';
import airplane from '../assets/images/cards/airplane.png';
import toni from '../assets/images/cards/toni.png';

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#ccc')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#bbb')};
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const initialItems: ItemType[] = [
    {
      id: '1',
      image: airplane,
      title: 'Boeing 737',
      description: 'Buy and private jet!',
      bossLevel: 1,
      price: 1000000000,
      timeRemaining: 3600,
      owned: false,
      passed: false,
    }, {
        id: '2',
        image: rudy,
        title: 'Private meeting with Rudy Giuliani',
        description: "Make the major an offer he can't refuse",
        bossLevel: 100,
        price: 10000000,
        timeRemaining: 3600,
        owned: false,
        passed: false,
      }, {
        id: '3',
        image: toni,
        title: 'Hire Toni Montana to clear your enemies.',
        description: "No people, no problem chiko.",
        bossLevel: 30,
        price: 10000000,
        timeRemaining: 3600,
        owned: false,
        passed: false,
      },
    // Add more items as needed
  ];

const Cards: React.FC = () => {
  const { coins, setCoins } = UseGameContext();
  const [currentTab, setCurrentTab] = useState<'Current' | 'Passed' | 'Owned'>('Current');
  const [items, setItems] = useState<ItemType[]>(initialItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => {
        return prevItems.map(item => {
          if (item.timeRemaining > 0) {
            return { ...item, timeRemaining: item.timeRemaining - 1 };
          } else if (currentTab === 'Current') {
            return { ...item, passed: true };
          }
          return item;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTab]);

  const handleTabChange = (tab: 'Current' | 'Passed' | 'Owned') => {
    setCurrentTab(tab);
  };

  const handlePurchase = (itemId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === itemId && coins >= item.price) {
          setCoins(coins - item.price);
          return { ...item, owned: true };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const filteredItems = items.filter(item => {
    if (currentTab === 'Current') return !item.owned && !item.passed;
    if (currentTab === 'Passed') return item.passed;
    if (currentTab === 'Owned') return item.owned;
  });

  return (
    <div>
      <TabsContainer>
        <TabButton active={currentTab === 'Current'} onClick={() => handleTabChange('Current')}>Current</TabButton>
        <TabButton active={currentTab === 'Passed'} onClick={() => handleTabChange('Passed')}>Passed</TabButton>
        <TabButton active={currentTab === 'Owned'} onClick={() => handleTabChange('Owned')}>Owned</TabButton>
      </TabsContainer>
      <ItemsContainer>
        {filteredItems.map(item => (
          <Collectible key={item.id} item={item} onPurchase={handlePurchase} />
        ))}
      </ItemsContainer>
    </div>
  );
};

export default Cards;