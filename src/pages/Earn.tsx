import React, { useEffect, useRef, useState } from 'react';
import './styles/earn.css'
import CoinImage from '../assets/images/coin.png';
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { useUserContext } from '../context/UserContext';
import { Timestamp } from 'firebase/firestore';
import Godfather from '../assets/images/godfather.png';
import Loading from '../assets/images/spinner.gif';
import HelpPopupEarn from '../components/HelpPopupEarn';

const tasks = [
  { title: 'Follow us on Telegram', prize: 50000, url: "https://t.me/gangstergamesio", key: 'followOnTelegram'},
  { title: 'Follow us on X', prize: 50000, url: "https://x.com/GangsterGamesio", key: 'followOnX'},
  { title: 'Follow us on Youtube', prize: 50000, url: "https://www.youtube.com/@GangsterGamesPick3", key: 'followOnYoutube'},
  { title: 'Follow us on TikTok', prize: 50000, url: "https://www.tiktok.com/@gangstergamespick3", key: 'followTikTok'},
];

const Earn: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const { connected, wallet } = useTonConnect();
  const [canClaimDaily, setCanClaimDaily] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const rotatableImageRef = useRef<HTMLImageElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleImageClick = () => {
      const rotatableImage = rotatableImageRef.current;
      const newRotation = currentRotation + 1800; // 5 full flips

      if (rotatableImage) {
          // Quick multiple flips
          rotatableImage.style.transition = 'transform 1s ease-in-out';
          rotatableImage.style.transform = `rotateY(${newRotation}deg)`;

          // Slowly stop flipping
          setTimeout(() => {
              const finalRotation = newRotation + 360; // Additional full flip to stop slowly
              rotatableImage.style.transition = 'transform 3s ease-out';
              rotatableImage.style.transform = `rotateY(${finalRotation}deg)`;
              setCurrentRotation(finalRotation);
          }, 1000); // Wait for the quick flips to complete
      } else {
          setCurrentRotation(newRotation);
      }
  };

  useEffect(() => {
    if (user && !user.earnInfo.tonWalletConnected && connected) {
      const newCoins = user.coins + 500000;
      updateUser({
        ...user,
        coins: newCoins,
        earnInfo: {
          ...user.earnInfo,
          tonWalletConnected: true,
          tonWallet: wallet ?? '',
        }
      });
    }
  }, [connected]);

  const checkDailyLoginStatus = () => {
    if (!user) return;
    const now = new Date();
    const lastLogin = user.earnInfo.dailyLogin.lastLogin.toDate();
    if (now.toDateString() !== lastLogin.toDateString()) {
      setCanClaimDaily(true);
    } else {
      setCanClaimDaily(false);
    }
  };

  const handleDailyLogin = async () => {
    if (!user) return;
    const now = new Date();
    const lastLogin = user.earnInfo.dailyLogin.lastLogin.toDate(); // Convert Firestore Timestamp to Date
    const isNewStreakDay = now.getDate() !== lastLogin.getDate() || now.getMonth() !== lastLogin.getMonth() || now.getFullYear() !== lastLogin.getFullYear();
    const newStreak = isNewStreakDay ? user.earnInfo.dailyLogin.streak + 1 : 1;

    const newCoins = user.coins + 50000;
    const updatedUser = {
      ...user,
      coins: newCoins,
      earnInfo: {
        ...user.earnInfo,
        dailyLogin: {
          streak: newStreak,
          lastLogin: Timestamp.fromDate(now),
        }
      }
    };

    await updateUser(updatedUser);
    setCanClaimDaily(false);
    alert("Daily reward claimed!");
  };

  const handleFollowTaskCompletion = async (taskKey: string, prize: number) => {
    if (!user || user.earnInfo[taskKey]) return;
    const newCoins = user.coins + prize;
    const updatedUser = {
      ...user,
      coins: newCoins,
      earnInfo: {
        ...user.earnInfo,
        [taskKey]: true,
      }
    };
    await updateUser(updatedUser);
  };

  const handleClaimInviteReward = async (index: number, prize: number) => {
    if (!user) return;
    const newCoins = user.coins + prize;
    const updatedUser = {
      ...user,
      coins: newCoins,
      invitedUsers: user.invitedUsers.map((invitedUser, i) => 
        i === index ? { ...invitedUser, claimed: true } : invitedUser
      )
    };
    await updateUser(updatedUser);
  };

  const handleShare = () => {
    const message = `Check out Gangster Games! Join through this link: https://t.me/gangster_games_pick3_bot/GangsterGamesPick3?startapp=refId${user?.userId}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
    window.Telegram.WebApp.openTelegramLink(url);
};

  useEffect(() => {
    checkDailyLoginStatus();
  }, [user]);

  if (!user) {
    return <div className='no-user'>
      <div>
        <img style={{ width: '240px'}} src={Godfather} alt="godfather" />
      </div>
      <div>
        <img style={{ width: '100px'}} src={Loading} alt="spinner" />
      </div>
    </div>;
  }

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="tab-content-earn">
      <div className="earn-container">
        <div className="earn-header">
          <h1 className="earn-title">Earn More<button className='question-button' onClick={togglePopup}>?</button></h1>
          <div className="image-container-rotate">
            <img src={CoinImage} alt="Coin" className="coin-image rotatable-image" ref={rotatableImageRef} onClick={handleImageClick} />
          </div>
        </div>
        <div className="earn-tasks">
          <div className='earn-task'>
            <div className="task-info">
              <div className="task-title"><TonConnectButton /></div>
              <div className="task-prize">G$ 500,000</div>
            </div>
            {connected && <div className="task-checkmark">✔</div>}
          </div>

          <div className='earn-task'>
            <div className="task-info">
              <div className="task-title">Login Streak: {user.earnInfo.dailyLogin.streak}</div>
              <button className='task-button' onClick={handleDailyLogin} disabled={!canClaimDaily}>G$ 50,000</button>
            </div>
          </div>

          <div className='earn-task-invite'>
            <div className='earn-task-invite-inner'>
              <div className='earn-invite-text'>Invite Friend</div>
              <div className='earn-button-container'>
                <button onClick={handleShare} className='task-button'>Share</button>
                <button onClick={() => { navigator.clipboard.writeText('https://t.me/gangster_games_pick3_bot/GangsterGamesPick3?startapp=refId' + user.userId); alert('Invite link copied to clipboard') }} className='task-button'><i className="far fa-copy"></i> Invite Link</button>
              </div>
            </div>
              {user.invitedUsers.map((invitedUser, index) => (
                <div className='invited-friends' key={index}>
                  <div className='invited-friends-row'>
                    <div className='invited-friends-row-title'>{index + 1}. {invitedUser.username}</div>
                    <button onClick={() => handleClaimInviteReward(index, 200000)} disabled={invitedUser.claimed} className='task-button'>
                      {invitedUser.claimed ? 'Claimed' : 'G$ 200,000'}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {tasks.map((task, index) => (
            <div key={index} className="earn-task">
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-prize">
                  <button className='task-button' onClick={() => {
                    window.open(task.url, '_blank');
                    handleFollowTaskCompletion(task.key, task.prize);
                  }}>
                    {user.earnInfo[task.key] ? 'Visit' : `G$ ${task.prize.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      {isPopupOpen && <HelpPopupEarn onClose={togglePopup} />}
    </div>
  );
};

export default Earn;