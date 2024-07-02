import React, { useEffect, useState } from 'react';
import './styles/boss.css';
import Godfather from '../assets/images/godfather.png';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { useUserContext } from '../context/UserContext';
import { BossInfo } from '../context/UserContext';
import Image01 from '../assets/images/boss-items/01.png';
import Image02 from '../assets/images/boss-items/02.png';
import Image03 from '../assets/images/boss-items/03.png';
import Image04 from '../assets/images/boss-items/04.png';
import Image05 from '../assets/images/boss-items/05.png';
import Image06 from '../assets/images/boss-items/06.png';

const Boss: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const images = [Image01, Image02, Image03, Image04, Image05, Image06];

  // TODO: - check also for telegram user from bot API
  if (!user) {
    return <div className='no-user'>We couldn't get your Telegram user_id, please login thru Telegram app.</div>;
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
                <div className='boss-image-item-container'>
                  <img className='boss-image-item' src={images[index]} alt="boss-item" />
                </div>
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
