import React, { useEffect, useState } from 'react';
import './styles/earn.css'
import CoinImage from '../assets/images/coin.png'; // Adjust the path as necessary

const tasks = [
  { logo: '🎯', title: 'Connect your TON wallet', prize: '$500k' },
  { logo: '🏆', title: 'Follow us on Telegram', prize: '$50k' },
  { logo: '🎲', title: 'Follow us on X', prize: '$50k' },
  { logo: '💬', title: 'Refer a Friend', prize: '$200k' },
  { logo: '📈', title: 'Reach Level 10', prize: '$100m' },
  { logo: '🎁', title: 'Daily Login', prize: '$50k' },
];

const Earn: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : Array(tasks.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTaskCompletion = (index: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className="tab-content-earn">
      <div className="earn-container">
        <div className="earn-header">
          <h1 className="earn-title">EARN MORE</h1>
          <img src={CoinImage} alt="Coin" className="coin-image" />
        </div>
        <div className="earn-tasks">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`earn-task ${completedTasks[index] ? 'completed' : ''}`}
              onClick={() => toggleTaskCompletion(index)}
            >
              <div className="task-logo">{task.logo}</div>
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-prize">{task.prize}</div>
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