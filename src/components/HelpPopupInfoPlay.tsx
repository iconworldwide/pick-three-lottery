import React from 'react';
import './styles/popupStyles.css';

interface HelpPopupInfoPlayProps {
  onClose: () => void;
}

const HelpPopupInfoPlay: React.FC<HelpPopupInfoPlayProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay-info-play">
      <div className="popup-content-info-play">
        <div>
          <div className='instructions-headline'>How to Play</div>
          <div className='instructions-h1'>1. Select Order Type:</div>
          <div className='instructions-list'><p>•</p>Exact Order: Match the exact sequence of numbers to win. Harder but counts towards airdrops.</div>
          <div className='instructions-list'><p>•</p>Any Order: Match the numbers in any order. Easier and helps increase your coins.</div>
          <div className='instructions-list'><p>•</p>Choose between Exact Order and Any Order by clicking on the respective option.</div>
          <div className='instructions-h1'>2. Enter Your Numbers:</div>
          <div className='instructions-list'><p>•</p>Click on the number boxes and enter your chosen digits.</div>
          <div className='instructions-list'><p>•</p>Ensure you have selected your preferred order type before entering the numbers.</div>
          <div className='instructions-h1'>3. Draw</div>
          <div className='instructions-list'><p>•</p>Once you have selected your numbers, click on the Draw button to submit your entry.</div>
          <div className='instructions-headline'>Tips</div>
          <div className='instructions-list'><p>•</p>Match 2 or 3 numbers to win.</div>
          <div className='instructions-list'><p>•</p>Any match is easier and helps you increase your coins.</div>
          <div className='instructions-list'><p>•</p>Exact matches are harder but count towards the airdrop.</div>
          <div className='instructions-list'><p>•</p>Focus on achieving Exact Matches to qualify for airdrops and special rewards.</div>
          <div className='instructions-list'><p>•</p>Keep an eye on the Last Draw Numbers to help strategize your future picks.</div>
          <div className='instructions-body'>By following this guide, you will have a better understanding of how to participate effectively in the Gangster Games Pick 3 Lottery. Good luck!</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupInfoPlay;
