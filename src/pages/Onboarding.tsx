import React, { useState } from 'react';
import './styles/onboarding.css';

import onboarding0 from '../assets/images/onboarding0.png';
import onboarding1 from '../assets/images/onboarding1.png';
import onboarding2 from '../assets/images/onboarding2.png';
import onboarding3 from '../assets/images/onboarding3.png';
import onboarding4 from '../assets/images/onboarding4.png';
import onboarding5 from '../assets/images/onboarding5.png';
import onboarding6 from '../assets/images/onboarding6.png';
import onboarding7 from '../assets/images/onboarding7.png';
import onboarding8 from '../assets/images/onboarding8.png';

const onboardingImages = [onboarding0];

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