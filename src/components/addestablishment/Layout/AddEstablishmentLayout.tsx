"use client";

import { ReactNode } from "react";
import StepsIndicator from "./StepsIndicator";
import ThemeButton from "@/components/buttons/ThemeButton";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddEstablishmentLayoutProps {
  readonly children: ReactNode;
  readonly totalSteps: number;
  readonly onStepSubmit: (targetStep: number | "next" | "prev") => void;
  readonly currentStep: number;
  readonly isLoading?: boolean;
  readonly isEdit?: boolean;
}

export default function AddEstablishmentLayout({
  children,
  totalSteps,
  onStepSubmit,
  currentStep,
  isLoading = false,
  isEdit,
}: AddEstablishmentLayoutProps) {
  const router = useRouter();
  const handleNext = () => {
    onStepSubmit("next");
  };

  const handlePrev = () => {
    onStepSubmit("prev");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 relative">
        {isEdit && (
          <div className="absolute -top-2 left-0 z-10">
            <ThemeButton text="Go Back" onClick={() => router.back()} />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2">
          {!isEdit ? "Add New Establishments" : "Edit Establishment"}
        </h1>
        {!isEdit && (
          <p className="text-gray-300">
            Fill in the details to add a new listing to the platform
          </p>
        )}
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
        {!isEdit ? (
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
                currentStep === 6
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
        ) : (
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex justify-between flex-wrap gap-2">
              {Array.from({ length: totalSteps }, (_, idx) => (
                <ThemeButton
                  key={idx}
                  text={`Step ${idx + 1}`}
                  type="button"
                  onClickEvent={() => {
                    if (idx + 1 !== currentStep) {
                      onStepSubmit(idx + 1); // pass target step directly
                    }
                  }}
                  disabled={isLoading || idx + 1 === currentStep}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <ThemeButton
                text="Submit"
                type="submit"
                onClickEvent={
                  () => onStepSubmit(7) // pass target step directly
                }
                disabled={isLoading}
                backgroundColor="#6D3890"
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
