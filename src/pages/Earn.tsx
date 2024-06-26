import React, { useEffect, useState } from 'react';
import './styles/earn.css'
import CoinImage from '../assets/images/coin.png';
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { useUserContext } from '../context/UserContext';

const tasks = [
  { logo: '💎', title: 'Follow us on Telegram', prize: 50000 },
  { logo: '𝕏', title: 'Follow us on X', prize: 50000 },
  { logo: '💬', title: 'Refer a Friend', prize: 200000 },
];

const Earn: React.FC = () => {
  const { user, updateUser } = useUserContext();
  const { connected } = useTonConnect();

  const [completedTasks, setCompletedTasks] = useState<boolean[]>(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : Array(tasks.length).fill(false);
  });

  const [canClaimDaily, setCanClaimDaily] = useState(false);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    if (user && !user.earnInfo.tonWalletConnected && connected) {
      const newCoins = user.coins + 500000;
      updateUser({
        ...user,
        coins: newCoins,
        earnInfo: {
          ...user.earnInfo,
          tonWalletConnected: true,
        }
      });
    }
  }, [connected]);

  const checkDailyLoginStatus = () => {
    if (!user) return;
    const now = new Date();
    const lastLogin = new Date(user.earnInfo.dailyLogin.lastLogin);
    if (now.toDateString() !== lastLogin.toDateString()) {
      setCanClaimDaily(true);
    } else {
      setCanClaimDaily(false);
    }
  };

  const handleDailyLogin = async () => {
    if (!user) return;
    const now = new Date();
    const newStreak = (now.getTime() - new Date(user.earnInfo.dailyLogin.lastLogin).getTime()) / (1000 * 3600 * 24) <= 1
      ? user.earnInfo.dailyLogin.streak + 1
      : 1;

    const newCoins = user.coins + 50000;
    const updatedUser = {
      ...user,
      coins: newCoins,
      earnInfo: {
        ...user.earnInfo,
        dailyLogin: {
          streak: newStreak,
          lastLogin: now,
        }
      }
    };

    await updateUser(updatedUser);
    setCanClaimDaily(false);
    alert("Daily reward claimed!");
  };

  const toggleTaskCompletion = async (index: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);

    if (user && !completedTasks[index]) {
      const newCoins = user.coins + tasks[index].prize;
      const updatedUser = {
        ...user,
        coins: newCoins,
      };
      await updateUser(updatedUser);
    }
  };

  if (!user) {
    // return <div>Loading...</div>;
  }

  return (
    <div className="tab-content-earn">
      <div className="earn-container">
        <div className="earn-header">
          <h1 className="earn-title">EARN MORE</h1>
          <img src={CoinImage} alt="Coin" className="coin-image" />
        </div>
        <div className="earn-tasks">
          <div className='earn-task'>
            <div className="task-logo"></div>
            <div className="task-info">
              <div className="task-title"><TonConnectButton /></div>
              <div className="task-prize">G$ 500,000</div>
            </div>
            {connected && <div className="task-checkmark">✔</div>}
          </div>

          <div className='earn-task' onClick={() => {
            checkDailyLoginStatus();
          }}>
            <div className="task-logo">🎁</div>
            <div className="task-info">
              <div className="task-title">Daily Login</div>
              <button onClick={handleDailyLogin} disabled={!canClaimDaily}>Claim G$ 50,000</button>
            </div>
          </div>

          {tasks.map((task, index) => (
            <div
              key={index}
              className={`earn-task ${completedTasks[index] ? 'completed' : ''}`}
              onClick={() => toggleTaskCompletion(index)}
            >
              <div className="task-logo">{task.logo}</div>
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-prize">G${task.prize.toLocaleString()}</div>
              </div>
              {completedTasks[index] && <div className="task-checkmark">✔</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Earn;