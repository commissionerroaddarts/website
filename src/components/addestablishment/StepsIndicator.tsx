import React from "react";

const StepsIndicator = ({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <>
          {index > 0 && <div className="w-12 h-0.5 bg-gray-500" />}
          <div
            key={index}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
              index + 1 === currentStep
                ? "bg-purple-500 text-white"
                : "bg-white text-purple-600"
            }`}
          >
            {index + 1}
          </div>
        </>
      ))}
    </div>
  );
};

export default StepsIndicator;
