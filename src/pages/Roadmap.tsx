import React, { useState } from 'react';
import './styles/roadmap.css';

const steps = [
  { title: 'Step 1: Concept', description: 'Define the concept and goals.' },
  { title: 'Step 2: Design', description: 'Create the design and prototypes.' },
  { title: 'Step 3: Development', description: 'Develop the application.' },
  { title: 'Step 4: Testing', description: 'Test the application.' },
  { title: 'Step 5: Launch', description: 'Launch the application.' },
  { title: 'Step 6: Post-Launch', description: 'Post-launch support and updates.' },
];

const Roadmap: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(() => {
    const savedCompletedSteps = localStorage.getItem('completedRoadmapSteps');
    return savedCompletedSteps ? JSON.parse(savedCompletedSteps) : [true, true, false, false, false, false];
  });

  const toggleStepCompletion = (index: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = !newCompletedSteps[index];
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem('completedRoadmapSteps', JSON.stringify(newCompletedSteps));
  };

  return (
    <div className="tab-content-roadmap">
      <div className="roadmap-container">
        <h1 className="roadmap-title">Roadmap</h1>
        <div className="roadmap-steps">
          {steps.map((step, index) => (
            <div key={index} className={`roadmap-step ${completedSteps[index] ? 'completed' : ''}`}>
              <div className="step-content" onClick={() => toggleStepCompletion(index)}>
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
