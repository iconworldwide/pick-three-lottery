import React from 'react';

interface HelpPopupBossProps {
  onClose: () => void;
}

const HelpPopupBoss: React.FC<HelpPopupBossProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className="table-container">
        <div className="table-title">This is your Boss, Capo di tutti capi</div>
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

export default HelpPopupBoss;
