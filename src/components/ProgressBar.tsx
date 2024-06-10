import React from 'react';
import './styles/progressBar.css';

interface ProgressBarProps {
  progress: number;
  level: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, level }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
