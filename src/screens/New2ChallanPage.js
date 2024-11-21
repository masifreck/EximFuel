import React, { useState } from 'react';
import Step1 from '../components/Step1';
import Step4 from '../components/Step4';

const new2challan = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle the next step
  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  // Function to handle the previous step
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Render the component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 4:
        return <Step4 onPrevious={handlePrevious} />;
      default:
        return <Step1 onNext={handleNext} />;
    }
  };

  return renderStep();
};

export default new2challan;
