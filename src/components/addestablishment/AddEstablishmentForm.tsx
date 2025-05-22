"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import AddEstablishmentLayout from "./Layout/AddEstablishmentLayout";
import Step1Form from "./Steps/Step1Form";
import Step4Form from "./Steps/Step4Form";
import Step3Form from "./Steps/Step3Form";
import Step2Form from "./Steps/Step2Form";
import Step5Form from "./Steps/Step5Form";
import {
  fetchBusinesses,
  insertBusiness,
  updateBusiness,
} from "@/services/businessService";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import Confetti from "react-confetti"; // 🎉 install it via `npm i react-confetti
import { Business } from "@/types/business";
import UpgradePlan from "@/components/modals/UpgradePlan";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { mediaSchema } from "@/yupSchemas/mediaSchema";
const LOCAL_STORAGE_KEY = "addEstablishmentFormData";

const stepSchemas = [
  yup.object().shape({
    name: yup
      .string()
      .required("Business Name is required")
      .min(3, "Business Name must be at least 3 characters long")
      .max(100, "Business Name cannot exceed 100 characters"),
    tagline: yup
      .string()
      .required("Business Tagline is required")
      .min(5, "Business Tagline must be at least 5 characters long")
      .max(150, "Business Tagline cannot exceed 150 characters"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Phone Number must be numeric")
      .required("Business Phone Number is required")
      .length(10, "Phone Number must be exactly 10 digits"),
    website: yup
      .string()
      .nullable()
      .notRequired()
      .url("Must be a valid URL")
      .matches(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
        "Website URL must be valid and properly formatted"
      ),
    shortDis: yup
      .string()
      .required("Short Description is required")
      .min(20, "Short Description must be at least 20 characters long")
      .max(500, "Short Description cannot exceed 500 characters"),
    tags: yup
      .array()
      .of(yup.string().min(2, "Each tag must be at least 2 characters long"))
      .min(1, "At least one tag is required")
      .max(10, "You can add up to 10 tags"),
    category: yup.string().required("Category is required"),
    bordtype: yup.string().required("Board Type is required"),
    agelimit: yup
      .number()
      .min(0, "Age Limit cannot be negative")
      .max(120, "Age Limit cannot exceed 120 years")
      .required("Age Limit is required"),
    price: yup.object().shape({
      category: yup
        .string()
        .required("Price Category is required")
        .oneOf(["$", "$$", "$$$", "$$$$"], "Invalid price category"),
    }),
    media: mediaSchema,
  }),
  yup.object().shape({
    location: yup.object().shape({
      state: yup
        .string()
        .required("State is required")
        .min(2, "State must be at least 2 characters long"),
      city: yup
        .string()
        .required("City is required")
        .min(2, "City must be at least 2 characters long"),
      zipcode: yup.string().optional(),
      geotag: yup.object().shape({
        lat: yup
          .number()
          .required("Latitude is required")
          .min(-90, "Latitude must be between -90 and 90")
          .max(90, "Latitude must be between -90 and 90"),
        lng: yup
          .number()
          .required("Longitude is required")
          .min(-180, "Longitude must be between -180 and 180")
          .max(180, "Longitude must be between -180 and 180"),
      }),
    }),
  }),
  yup.object().shape({
    timings: yup.object().shape({
      mon: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      tue: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      wed: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      thu: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      fri: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      sat: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      sun: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
    }),
  }),
  yup.object().shape({
    socials: yup.object().shape({
      facebook: yup
        .string()
        .url("Invalid Facebook URL")
        .matches(
          /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(.?)]+/,
          "Invalid Facebook URL"
        )
        .nullable(),
      instagram: yup
        .string()
        .url("Invalid Instagram URL")
        .matches(
          /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(.?)]/,
          "Invalid Instagram URL"
        )
        .nullable(),
      twitter: yup
        .string()
        .url("Invalid Twitter URL")
        .matches(
          /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9(.?)]/,
          "Invalid Twitter URL"
        )
        .nullable(),
      linkedin: yup
        .string()
        .url("Invalid LinkedIn URL")
        .matches(
          /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9(.?)]+/,
          "Invalid LinkedIn URL"
        )
        .nullable(),
      youtube: yup
        .string()
        .url("Invalid YouTube URL")
        .matches(
          /^(https?:\/\/)?(www\.)?youtube\.com\/[a-zA-Z0-9(.?)]/,
          "Invalid YouTube URL"
        )
        .nullable(),
      tiktok: yup
        .string()
        .url("Invalid TikTok URL")
        .matches(
          /^(https?:\/\/)?(www\.)?tiktok\.com\/[a-zA-Z0-9(.?)]+/,
          "Invalid TikTok URL"
        )
        .nullable(),
    }),
  }),
  yup.object().shape({
    faqs: yup
      .array()
      .of(
        yup.object({
          q: yup.string().required("Question is required"),
          a: yup.string().required("Answer is required"),
        })
      )
      .notRequired(), // Make the whole array optional
  }),
];

export default function AddEstablishment({
  business,
  isEdit = false,
}: {
  readonly business?: Readonly<Business>;
  readonly isEdit?: boolean;
}) {
  const saveToStorage = (data: any) =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

  const loadFromStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  };

  const clearStorage = () => localStorage.removeItem(LOCAL_STORAGE_KEY);

  console.log({ business });

  const methods = useForm<Business>({
    mode: "onBlur",
    defaultValues: !isEdit
      ? loadFromStorage()
      : {
          name: business?.name ?? "",
          tagline: business?.tagline ?? "",
          phone: business?.phone ? business.phone.toString() : "",
          website: business?.website,
          shortDis: business?.shortDis ?? "",
          tags: business?.tags || [],
          category: business?.category ?? "",
          bordtype: business?.bordtype ?? undefined,
          agelimit: business?.agelimit ?? 0,
          price: { category: business?.price?.category ?? "$" },
          location: {
            state: business?.location?.state ?? "",
            city: business?.location?.city ?? "",
            zipcode: business?.location?.zipcode ?? "90210",
            country: business?.location?.country ?? "",
            geotag: {
              lat: business?.location?.geotag?.lat ?? 0,
              lng: business?.location?.geotag?.lng ?? 0,
            },
          },
          timings: {
            mon: {
              open: business?.timings?.mon?.open ?? "",
              close: business?.timings?.mon?.close ?? "",
            },
            tue: {
              open: business?.timings?.tue?.open ?? "",
              close: business?.timings?.tue?.close ?? "",
            },
            wed: {
              open: business?.timings?.wed?.open ?? "",
              close: business?.timings?.wed?.close ?? "",
            },
            thu: {
              open: business?.timings?.thu?.open ?? "",
              close: business?.timings?.thu?.close ?? "",
            },
            fri: {
              open: business?.timings?.fri?.open ?? "",
              close: business?.timings?.fri?.close ?? "",
            },
            sat: {
              open: business?.timings?.sat?.open ?? "",
              close: business?.timings?.sat?.close ?? "",
            },
            sun: {
              open: business?.timings?.sun?.open ?? "",
              close: business?.timings?.sun?.close ?? "",
            },
          },
          media: {
            logo: business?.media?.logo ?? undefined,
            images: business?.media?.images || [],
          },
          socials: {
            facebook: business?.socials?.facebook ?? undefined,
            instagram: business?.socials?.instagram ?? undefined,
            twitter: business?.socials?.twitter ?? undefined,
            linkedin: business?.socials?.linkedin ?? undefined,
            youtube: business?.socials?.youtube ?? undefined,
            tiktok: business?.socials?.tiktok ?? undefined,
          },
          faqs: business?.faqs ?? [],
        },
  });
  const { formState } = methods; // Access formState to track dirty state
  const { isDirty } = formState;

  useEffect(() => {
    const subscription = methods.watch((value) => {
      saveToStorage(value);
    });

    return () => subscription.unsubscribe(); // cleanup
  }, [methods]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        // Modern browsers handle the confirmation dialog with preventDefault
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const router = useRouter();
  const { user } = useAppState();
  const { userDetails, isLoggedIn } = user;
  const { subscription, permissions, _id } = userDetails || {};
  const { plan } = subscription || {};
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});
  console.log({ closedDays });
  const [isOpen, setIsOpen] = useState(false);

  const isUserLoggedIn = isLoggedIn && userDetails?._id;
  const isUserBusinessOwner =
    isUserLoggedIn && business && business.userId === userDetails?._id;

  useEffect(() => {
    if (!isUserLoggedIn) {
      redirect("/plans");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    const evaluatePlanAccess = async () => {
      if (!_id || !plan || !permissions) return;

      try {
        const { data } = await fetchBusinesses(1, 10, {}, _id);
        if (!data) return;

        const businessCount = data?.length;
        const maxListings = permissions.maxListings;

        if (plan === "Basic" && businessCount >= 1) {
          setIsOpen(true);
        } else if (plan === "Standard" && businessCount >= maxListings) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (err) {
        console.error("Failed to evaluate plan access:", err);
      }
    };

    evaluatePlanAccess();
  }, [_id, plan, permissions]);

  if (!isUserBusinessOwner && isEdit) {
    return <div>You are not authorized to edit this business</div>;
  }

  const handleStepSubmit = async (targetStep: number | "next" | "prev") => {
    const currentIndex = currentStep - 1;
    const currentSchema = stepSchemas[currentIndex];
    const values = methods.getValues();

    // Determine actual next step number
    const nextStep =
      typeof targetStep === "number"
        ? targetStep
        : targetStep === "next"
        ? currentStep + 1
        : currentStep - 1;

    // If we're submitting on the final step
    const isFinalStep = nextStep > totalSteps;

    // Run validation only if going forward or submitting
    if (targetStep !== "prev") {
      try {
        await currentSchema.validate(values, { abortEarly: false });
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
        return;
      }
    }

    // Handle final submission
    if (isFinalStep) {
      setIsLoading(true);
      try {
        const payload = isEdit ? { ...values, _id: business?._id } : values;

        const response = isEdit
          ? await updateBusiness(payload)
          : await insertBusiness(payload);

        if (response?.status === 201 || response?.data?.success) {
          toast.success(
            response?.data?.message ??
              (isEdit
                ? "Business updated successfully!"
                : "Congratulations! Your business is now live on Road Darts!")
          );

          if (!isEdit) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            clearStorage();
          }

          methods.reset();
          router.push(`/establishments/${business?._id ?? response.data._id}`);
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsLoading(false);
      }

      return;
    }

    // Set step if within valid bounds
    if (nextStep >= 1 && nextStep <= totalSteps) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <FormProvider {...methods}>
      <UpgradePlan isOpen={isOpen} setIsOpen={setIsOpen} />
      <Dialog
        maxWidth="md"
        open={isLoading}
        onClose={() => setIsLoading(false)}
        className="backdrop-blur-sm relative"
      >
        <DialogContent
          sx={{
            background:
              "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
            padding: "2.5rem",
          }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Submitting your establishment... Please wait...
          </Typography>
        </DialogContent>
      </Dialog>
      {showConfetti && <Confetti />}
      <AddEstablishmentLayout
        totalSteps={totalSteps}
        currentStep={currentStep}
        onStepSubmit={handleStepSubmit}
        isLoading={isLoading}
        isEdit={isEdit}
      >
        {currentStep === 1 && <Step1Form />}
        {currentStep === 2 && <Step2Form />}
        {currentStep === 3 && (
          <Step3Form closedDays={closedDays} setClosedDays={setClosedDays} />
        )}
        {currentStep === 4 && <Step4Form />}
        {currentStep === 5 && <Step5Form />}
      </AddEstablishmentLayout>
    </FormProvider>
  );
}
