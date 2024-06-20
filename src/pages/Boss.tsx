import React, { useEffect, useState } from 'react';
import './styles/boss.css';
import Godfather from '../assets/images/godfather.png';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { UseGameContext } from '../context/GameContext';

interface BossItem {
  icon: string;
  text: string;
  subtext: string;
  price: number;
}

const Boss: React.FC = () => {
  const { coins, addCoins } = UseGameContext();

  const initialItems: BossItem[] = [
    { icon: '🎲', text: 'Protection', subtext: 'Increase Boss Level by 1', price: 10000 },
    { icon: '💰', text: 'Gambling', subtext: 'Increase Boss Level by 1', price: 10000 },
    { icon: '🎁', text: 'Cigars', subtext: 'Increase Boss Level by 1', price: 10000 },
    { icon: '🍕', text: 'Pizza', subtext: 'Increase Boss Level by 1', price: 10000 },
    { icon: '🏆', text: 'Diamonds', subtext: 'Increase Boss Level by 1', price: 10000 },
    { icon: '💎', text: 'Cannoli', subtext: 'Increase Boss Level by 1', price: 10000 },
  ];

  const [items, setItems] = useState<BossItem[]>(() => {
    const savedItems = localStorage.getItem('bossItems');
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('bossItems', JSON.stringify(items));
  }, [items]);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
    setIsDialogVisible(true);
  };

  const handleConfirm = () => {
    if (selectedItem !== null && coins >= items[selectedItem].price) {
      const newItems = [...items];
      newItems[selectedItem] = {
        ...newItems[selectedItem],
        price: newItems[selectedItem].price + 50000, // Increment price by 50k for each level
      };

      setItems(newItems);
      addCoins(-items[selectedItem].price); // Deduct coins
      setIsDialogVisible(false);
    } else {
      alert('Not enough coins to purchase the boss item!');
      setIsDialogVisible(false);
    }
  };

  const handleCancel = () => {
    setIsDialogVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className="tab-content-boss">
      <div className="boss-container">
        <div className="boss-header">
          <span className="boss-label">Coins: ${coins.toLocaleString()}</span>
          <span className='boss-label'>Boss Level: 4</span>
        </div>
        <div className="boss-image">
          <img src={Godfather} alt="Godfather" />
        </div>
        <div className="boss-items">
          {items.map((item, index) => (
            <div key={index} className="boss-item" onClick={() => handleItemClick(index)}>
              <div className="boss-item-icon">{item.icon} {item.text}</div>
              <div className="boss-item-subtext">{item.subtext}</div>
              <div className="boss-item-level-price">
                <div>${item.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
        {isDialogVisible && (
          <ConfirmationDialog
            message={`Do you want to level up ${items[selectedItem!].text}?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Boss;
