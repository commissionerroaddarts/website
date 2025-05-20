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
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

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
    media: yup.object().shape({
      logo: yup
        .mixed()
        .test("fileOrUrl", "Unsupported file format", (value) => {
          if (!value) return true;

          if (typeof value === "string") return true; // Accept URL

          const file = value as File;
          return SUPPORTED_FORMATS.includes(file.type);
        })
        .test("fileSize", "Max allowed size is 5MB", (value) => {
          if (!value || typeof value === "string") return true;

          const file = value as File;
          return file.size <= MAX_FILE_SIZE;
        }),

      images: yup.array().of(
        yup
          .mixed()
          .test("fileOrUrl", "Only JPG/PNG/WEBP images allowed", (value) => {
            if (!value) return false;

            if (typeof value === "string") return true; // Accept URL

            return (
              value instanceof File && SUPPORTED_FORMATS.includes(value.type)
            );
          })
          .test("fileSize", "Each image must be under 5MB", (value) => {
            if (!value || typeof value === "string") return true;

            return value instanceof File && value.size <= MAX_FILE_SIZE;
          })
      ),
    }),
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
  const methods = useForm<Business>({
    mode: "onBlur",
    defaultValues: {
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
        logo: business?.media?.logo ?? "",
        images: business?.media?.images || [],
      },
    },
  });
  const { formState } = methods; // Access formState to track dirty state
  const { isDirty } = formState;

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
  const { userDetails } = user;
  const { subscription, permissions, _id } = userDetails || {};
  const { plan } = subscription || {};
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [closedDays, setClosedDays] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!userDetails) {
      redirect("/login");
    }
    if (!subscription) {
      redirect("/plans");
    }
  }, [userDetails, subscription]);

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

  if (business && business.userId !== userDetails?._id) {
    return <div>You are not authorized to edit this business</div>;
  }

  const handleStepSubmit = async (direction: "next" | "prev") => {
    const currentSchema = stepSchemas[currentStep - 1]; // currentStep is 1-based
    if (direction === "next" && currentStep === totalSteps && !isEdit) {
      try {
        setIsLoading(true);
        const values = methods.getValues();
        await currentSchema.validate(values, { abortEarly: false });

        // Call the API service method to insert business
        const response = await insertBusiness(values);
        if (response.status === 201) {
          const { _id } = response.data;
          if (_id) {
            toast.success(
              "🎉 Congratulations! Your business is now live on RoadDart. Get ready to welcome new customers and grow your presence! 🚀"
            );
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            // Optionally reset the form or navigate to a success page
            methods.reset();
            router.push(`/establishments/${_id}`); // Redirect to establishments page
            setIsLoading(false);
          }
        }
      } catch (apiError) {
        setIsLoading(false);
        console.error("Failed to add business:", apiError);
      }
      return;
    } else if (direction === "next" && currentStep === totalSteps && isEdit) {
      try {
        setIsLoading(true);
        const values = methods.getValues();
        await currentSchema.validate(values, { abortEarly: false });

        const updatedValues = { ...values, _id: business?._id };
        // Call the API service method to insert business
        const response = await updateBusiness(updatedValues);
        if (response?.data?.success) {
          toast.success(
            response?.data?.message ?? "Business updated successfully!"
          );
          // Optionally reset the form or navigate to a success page
          methods.reset();
          setIsLoading(false);
          router.push(`/establishments/${business?._id}`); // Redirect to establishments page
        }
      } catch (apiError) {
        setIsLoading(false);
        console.error("Failed to add business:", apiError);
      }
      return;
    }
    try {
      if (direction === "next") {
        const values = methods.getValues();
        await currentSchema.validate(values, { abortEarly: false });
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      } else {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
      }
    } catch (validationError: any) {
      if (validationError?.inner) {
        setIsLoading(false);
        validationError?.inner.forEach((err: any) => {
          console.error(err);
          methods.setError(err.path, { type: "manual", message: err.message });
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <UpgradePlan isOpen={isOpen} setIsOpen={setIsOpen} />
      {isLoading &&
        toast.info("Submitting your establishment... Please wait...", {
          toastId: "loading-toast",
          autoClose: isLoading ? false : 3000,
        })}
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
