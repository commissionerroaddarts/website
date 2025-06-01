import { Business } from "@/types/business";

// Helper: Validate current step
export const validateStep = async (
  schema: any,
  values: Business,
  setIsLoading: (arg: boolean) => void,
  methods: any
) => {
  try {
    await schema.validate(values, { abortEarly: false });
    return true;
  } catch (validationError: any) {
    if (validationError?.inner) {
      validationError.inner.forEach((err: any) => {
        methods.setError(err.path, {
          type: "manual",
          message: err.message,
        });
      });
    }
    setIsLoading(false);
    return false;
  }
};

// Helper: Calculate next step
export const getNextStep = (
  targetStep: number | "next" | "prev",
  currentStep: number
) => {
  if (typeof targetStep === "number") return targetStep;
  if (targetStep === "next") return currentStep + 1;
  return currentStep - 1;
};
