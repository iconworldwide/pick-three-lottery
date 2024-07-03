import React from 'react';

interface HelpPopupEarnProps {
  onClose: () => void;
}

const HelpPopupEarn: React.FC<HelpPopupEarnProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay-info-play">
      <div className="popup-content-info-play">
        <div>
          <div className='instructions-headline'>Earn Guide</div>
          <div className='instructions-h1'>What to do</div>
          <div className='instructions-list'><p>•</p>Click the Connect Wallet button to link your wallet and receive G$ 500,000. This task can be completed once.</div>
          <div className='instructions-list'><p>•</p>Daily Login. Click the Claim G$ 50,000 button to claim your daily reward. Maintain your streak by logging in daily.</div>
          <div className='instructions-h1'>Follow Us on Social Media</div>
          <div className='instructions-list'><p>•</p>Click the Follow button to open the respective social media platform.</div>
          <div className='instructions-list'><p>•</p>Follow our account to earn coins.</div>
          <div className='instructions-list'><p>•</p>Once completed, the button will display Claimed.</div>
          <div className='instructions-list'><p>•</p>Social media platforms include Telegram, X (formerly Twitter), Youtube, and TikTok.</div>
          <div className='instructions-h1'>Invite Friends</div>
          <div className='instructions-list'><p>•</p>Click the Share button to send an invite message to your friends via Telegram.</div>
          <div className='instructions-list'><p>•</p>Alternatively, click the Invite Link button to copy the invite link to your clipboard.</div>
          <div className='instructions-list'><p>•</p>Share the link with your friends to invite them.</div>
          <div className='instructions-list'><p>•</p>Once your friends join, their usernames will appear in the invited friends list.</div>
          <div className='instructions-list'><p>•</p>Click the Claim G$ 200,000 button next to each friend's name to claim your reward.</div>
          <div className='instructions-headline'>Tips</div>
          <div className='instructions-list'><p>•</p>Regularly check the Earn screen for new tasks and opportunities to earn coins.</div>
          <div className='instructions-list'><p>•</p>Maintain your daily login streak to maximize your earnings.</div>
          <div className='instructions-list'><p>•</p>Invite more friends to earn additional rewards.</div>
          <div className='instructions-list'><p>•</p>Follow us on all available social media platforms to claim all possible rewards.</div>
          <div className='instructions-body'>The Earn screen provides multiple ways for users to earn extra coins by completing daily tasks, inviting friends, and following us on social media.</div>
          <div className='instructions-body'>Future Developments! Additional Earning Options: We are working on adding more tasks and activities for users to earn coins. Stay tuned for updates on new earning opportunities. Happy earning!</div>
        </div>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpPopupEarn;
