"use client";

import { ReactNode } from "react";
import StepsIndicator from "./StepsIndicator";
import ThemeButton from "@/components/buttons/ThemeButton";
import { MoveLeft, MoveRight } from "lucide-react";

interface AddEstablishmentLayoutProps {
  readonly children: ReactNode;
  readonly totalSteps: number;
  readonly onStepSubmit: (direction: "next" | "prev") => void;
  readonly currentStep: number;
  readonly isLoading?: boolean;
}

export default function AddEstablishmentLayout({
  children,
  totalSteps,
  onStepSubmit,
  currentStep,
  isLoading = false,
}: AddEstablishmentLayoutProps) {
  const handleNext = () => {
    onStepSubmit("next");
  };

  const handlePrev = () => {
    onStepSubmit("prev");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Establishments</h1>
        <p className="text-gray-300">
          Fill in the details to add a new listing to the platform
        </p>
      </div>

      <div
        className="rounded-3xl p-8 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
      >
        <StepsIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="my-8">{children}</div>
        <div
          className={`flex ${
            currentStep > 1 ? "justify-between" : "justify-center"
          }`}
        >
          {currentStep > 1 && (
            <ThemeButton
              text="Previous"
              type="button"
              icon={<MoveLeft color="white" />}
              onClickEvent={handlePrev}
              disabled={isLoading}
            />
          )}
          <ThemeButton
            text={
              currentStep === 5
                ? isLoading
                  ? "Submitting..."
                  : "Submit"
                : "Next"
            }
            icon={<MoveRight color="white" />}
            type="button"
            onClickEvent={handleNext}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
