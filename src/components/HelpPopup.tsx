import React from 'react';

interface HelpPopupProps {
  onClose: () => void;
}

const HelpPopup: React.FC<HelpPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
        <div className="table-title">PICK 3 REWARDS</div>
          <table>
            <tbody>
              <tr className="exact-order">
                <td colSpan={2} className="section-title">EXACT ORDER:<br />Match in exact order.</td>
              </tr>
              <tr>
                <td className="row-subtitle">Match 2 numbers</td>
                <td className='color-white'>$1,000</td>
              </tr>
              <tr>
                <td className="row-title">Match 3 numbers</td>
                <td className='color-white'>$1,500</td>
              </tr>
              <tr className="any-order">
                <td colSpan={2} className="section-title">ANY ORDER:<br />Match in any order.</td>
              </tr>
              <tr>
                <td className="row-title">Match 2 numbers</td>
                <td className='color-white'>$250</td>
              </tr>
              <tr>
                <td className="row-subtitle">Match 3 numbers</td>
                <td className='color-white'>$500</td>
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
