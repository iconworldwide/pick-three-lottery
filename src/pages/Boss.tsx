import React, { useEffect, useState } from 'react';
import './styles/boss.css';
import Godfather from '../assets/images/godfather.png';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useUserContext } from '../context/UserContext';
import { BossInfo } from '../context/UserContext';

const Boss: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // TODO: - check also for telegram user from bot API
  if (!user) {
    return <div>Loading...</div>;
  }

  const { bossInfo, coins } = user;
  const { bossItems, bossLevel } = bossInfo;

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
    setIsDialogVisible(true);
  };

  const handleConfirm = async () => {
    if (selectedItem !== null && coins >= bossItems[selectedItem].price) {
      const newItems = [...bossItems];
      newItems[selectedItem] = {
        ...newItems[selectedItem],
        price: newItems[selectedItem].price + 50000, // Increment price by 50k for each level
        level: newItems[selectedItem].level + 1,
      };

      const newBossInfo: BossInfo = {
        bossItems: newItems,
        bossLevel: bossLevel + 1
      }

      const updatedUser = {
        ...user,
        coins: coins - bossItems[selectedItem].price,
        bossInfo: newBossInfo,
      };

      await updateUser(updatedUser);
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
          <span className="boss-label">Coins: G$ {user.coins.toLocaleString()}</span>
          <span className='boss-label'>Boss Level: {bossLevel}</span>
        </div>
        <div className="boss-image">
          <img src={Godfather} alt="Godfather" />
        </div>
        <div className="boss-items">
          {bossItems.map((item, index) => (
            <div key={index} className="boss-item" onClick={() => handleItemClick(index)}>
              <div className="boss-item-icon"> 
                <img className='boss-image-item' src={item.imageUrl} alt="boss-item" />
                <div>
                  {item.title}
                </div>
              </div>
              <div className="boss-item-subtext">{item.description}</div>
              <div className="boss-item-level-price">
                <div>Level {item.level}</div>
                <div>G$ {item.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
        {isDialogVisible && (
          <ConfirmationDialog
            message={`Do you want to level up ${bossItems[selectedItem!].title}?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Boss;
