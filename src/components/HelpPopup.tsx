import React from 'react';

interface HelpPopupProps {
  onClose: () => void;
}

const HelpPopup: React.FC<HelpPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
        <div>
          <div className='instructions-headline'>How to Play</div>
          <div className='instructions-h1'>1. Select Order Type:</div>
          <div className='instructions-list'>• Exact Order: Match the exact sequence of numbers to win. Harder but counts towards airdrops.</div>
          <div className='instructions-list'>• Any Order: Match the numbers in any order. Easier and helps increase your coins.</div>
          <div className='instructions-list'>• Choose between Exact Order and Any Order by clicking on the respective option.</div>
          <div className='instructions-h1'>2. Enter Your Numbers:</div>
          <div className='instructions-list'>• Click on the number boxes and enter your chosen digits.</div>
          <div className='instructions-list'>• Ensure you have selected your preferred order type before entering the numbers.</div>
          <div className='instructions-h1'>3. Draw</div>
          <div className='instructions-list'>• Once you have selected your numbers, click on the Draw button to submit your entry.</div>
          <div className='instructions-headline'>Tips</div>
          <div className='instructions-list'>• Match 2 or 3 numbers to win.</div>
          <div className='instructions-list'>• Any match is easier and helps you increase your coins.</div>
          <div className='instructions-list'>• Exact matches are harder but count towards the airdrop.</div>
          <div className='instructions-list'>• Focus on achieving Exact Matches to qualify for airdrops and special rewards.</div>
          <div className='instructions-list'>• Keep an eye on the Last Draw Numbers to help strategize your future picks.</div>
          <div className='instructions-body'>By following this guide, you will have a better understanding of how to participate effectively in the Gangster Games Pick 3 Lottery. Good luck!</div>
        </div>

        <div className="table-title">PICK 3 REWARDS</div>
          <table>
            <tbody>
              <tr className="exact-order">
                <td colSpan={2} className="section-title">EXACT ORDER:<br />Match in exact order.</td>
              </tr>
              <tr>
                <td className="row-subtitle">2 like numbers and 1 different number</td>
                <td>$1,000</td>
              </tr>
              <tr>
                <td className="row-title">3 like numbers</td>
                <td>$1,500</td>
              </tr>
              <tr className="any-order">
                <td colSpan={2} className="section-title">ANY ORDER:<br />Match in any order.</td>
              </tr>
              <tr>
                <td className="row-title">2 like numbers and 1 different number</td>
                <td>$250</td>
              </tr>
              <tr>
                <td className="row-subtitle">3 like numbers</td>
                <td>$500</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopup;
