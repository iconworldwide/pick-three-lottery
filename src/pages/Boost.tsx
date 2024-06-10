import React, { useEffect, useState } from 'react';
import './styles/boost.css';
import Godfather from '../assets/images/godfather.png';
import ConfirmationDialog from '../components/ConfirmationDialog';

interface BoostItem {
  icon: string;
  text: string;
  subtext: string;
  level: number;
  price: number;
}

interface BoostProps {
  coins: number;
  updateCoins: (newCoins: number) => void;
  drawsPerHour: number;
  updateDrawsPerHour: (newDrawsPerHour: number) => void;
}

const Boost: React.FC<BoostProps> = ({ coins, updateCoins, drawsPerHour, updateDrawsPerHour }) => {
  const initialItems: BoostItem[] = [
    { icon: '🎲', text: 'Gambling', subtext: 'Increase auto draws per day by 10', level: 1, price: 10000 },
    { icon: '💰', text: 'Ransom', subtext: 'Increase auto draws per day by 10', level: 1, price: 10000 },
    { icon: '🎁', text: 'Gifts', subtext: 'Increase auto draws per day by 10', level: 1, price: 10000 },
    { icon: '🍕', text: 'Pizza', subtext: 'Increase auto draws per day by 10', level: 1, price: 10000 },
    { icon: '🏆', text: 'Prizes', subtext: 'Increase auto draws per day by 10', level: 1, price: 10000 },
    { icon: '💎', text: 'Diamonds', subtext: 'Increase auto draws per day by 10', level: 1, price: 10000 },
  ];

  const [items, setItems] = useState<BoostItem[]>(() => {
    const savedItems = localStorage.getItem('boostItems');
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('boostItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const savedDrawsPerHour = localStorage.getItem('drawsPerHour');
    if (savedDrawsPerHour) {
      updateDrawsPerHour(parseInt(savedDrawsPerHour));
    }
  }, [updateDrawsPerHour]);

  useEffect(() => {
    localStorage.setItem('drawsPerHour', drawsPerHour.toString());
  }, [drawsPerHour]);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
    setIsDialogVisible(true);
  };

  const handleConfirm = () => {
    // setIsDialogVisible(false);
    if (selectedItem !== null && coins >= items[selectedItem].price) {
      const newItems = [...items];
      newItems[selectedItem] = {
        ...newItems[selectedItem],
        level: newItems[selectedItem].level + 1,
        price: newItems[selectedItem].price + 50000, // Increment price by 50k for each level
      };

      setItems(newItems);
      updateCoins(coins - items[selectedItem].price);
      updateDrawsPerHour(drawsPerHour + 10);
      setIsDialogVisible(false);
    } else {
      alert('Not enough coins to purchase the boost!');
      setIsDialogVisible(false);
    }
  };

  const handleCancel = () => {
    setIsDialogVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className="tab-content-boost">
      <div className="boost-container">
      <div className="boost-header">
          <span className="boost-label">Auto Draws per Hour: {drawsPerHour}</span>
          <span className="boost-label">Coins: ${coins.toLocaleString()}</span>
        </div>
        <div className="boost-image">
          <img src={Godfather} alt="Godfather" />
        </div>
        <div className="boost-items">
          {items.map((item, index) => (
            <div key={index} className="boost-item" onClick={() => handleItemClick(index)}>
              <div className="boost-item-icon">{item.icon} {item.text}</div>
              <div className="boost-item-subtext">{item.subtext}</div>
              <div className="boost-item-level-price">
                <div>Level {item.level}</div>
                <div>|</div>
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

export default Boost;
