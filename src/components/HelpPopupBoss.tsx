import React from 'react';

interface HelpPopupBossProps {
  onClose: () => void;
}

const HelpPopupBoss: React.FC<HelpPopupBossProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay-info-play">
      <div className="popup-content-info-play">
        <div>
          <div className='instructions-headline'>Boss Guide</div>
          <div className='instructions-h1'>Benefits of Increasing Boss Level</div>
          <div className='instructions-list'><p>•</p>Unlock More Cards. A higher boss level allows you to purchase more cards.</div>
          <div className='instructions-list'><p>•</p>Future Airdrop Rewards. Higher boss levels qualify you for bigger rewards in our future airdrop.</div>
          <div className='instructions-list'><p>•</p>The more you invest in your boss, the greater the potential rewards.</div>
          <div className='instructions-headline'>Tips</div>
          <div className='instructions-list'><p>•</p>Regularly check your coin balance and boss level to plan your purchases effectively.</div>
          <div className='instructions-list'><p>•</p>Focus on purchasing items that provide the best boost to your boss level.</div>
          <div className='instructions-list'><p>•</p>Keep an eye on new items added to the shop to maximize your growth.</div>
          <div className='instructions-list'><p>•</p>New items will be added accordingly.</div>
          <div className='instructions-body'>The Boss allows you to spend your G$ to purchase items for the boss, increasing your boss level. A higher boss level unlocks more cards for purchase and provides bigger rewards in our future airdrop.</div>
          <div className='instructions-body'>By following this guide, you will have a better understanding of the Boss and how to strategically increase your boss level for maximum benefits. Enjoy building your empire!</div>
        </div>
      <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupBoss;
