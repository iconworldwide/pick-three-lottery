import React, { useState } from 'react';
import './styles/onboarding.css';

import onboarding2 from '../assets/images/onboarding2.png';

const onboardingImages = [onboarding2];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < onboardingImages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('newOnboardingCompleted', 'true');
      onComplete();
    }
  };

  return (
    <div className="onboarding-container" onClick={handleNextStep}>
      <img
        src={onboardingImages[currentStep]}
        alt={`Onboarding step ${currentStep + 1}`}
        className="onboarding-image"
      />
    </div>
  );
};

export default Onboarding;