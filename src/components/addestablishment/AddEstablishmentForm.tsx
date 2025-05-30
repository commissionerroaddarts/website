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
import { phoneSchema } from "@/yupSchemas/phoneSchema";
import { socialSchema } from "@/yupSchemas/socialSchema";
import { faqSchema } from "@/yupSchemas/faqSchema";
import { timingsSchema } from "@/yupSchemas/timingsSchema";
import { locationSchema } from "@/yupSchemas/locationSchema";
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
    phone: phoneSchema,
    website: yup
      .string()
      .nullable()
      .notRequired()
      .test(
        "is-valid-url",
        "Must be a valid URL (e.g., example.com or example.com/page)",
        (value) => {
          if (!value) return true;

          // Prepend protocol if missing
          const withProtocol =
            value.startsWith("http://") || value.startsWith("https://")
              ? value
              : `https://${value}`;

          try {
            const url = new URL(withProtocol);

            // Must include a valid hostname with at least one dot (e.g., "example.com")
            const isValidDomain = /^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(
              url.hostname
            );
            return isValidDomain;
          } catch {
            return false;
          }
        }
      ),
    shortDis: yup
      .string()
      .required("Short Description is required")
      .min(20, "Short Description must be at least 20 characters long")
      .max(500, "Short Description cannot exceed 500 characters"),
    tags: yup
      .array()
      .optional()
      .of(yup.string().min(2, "Each tag must be at least 2 characters long"))
      .max(10, "You can add up to 10 tags"),
    category: yup.string().required("Category is required"),
    bordtype: yup.string().required("Board Type is required"),
    agelimit: yup
      .number()
      .min(18, "Age Limit must be above 18 years")
      .max(100, "Age Limit cannot exceed 100 years")
      .required("Age Limit is required"),
    price: yup.object().shape({
      category: yup
        .string()
        .required("Price Category is required")
        .oneOf(["$", "$$", "$$$", "$$$$"], "Invalid price category"),
    }),
    promotion: yup.object().shape({
      title: yup.string().optional(),
      description: yup
        .string()
        .optional()
        .max(250, "Promotion description cannot exceed 500 characters"),
    }),
    media: mediaSchema,
  }),
  yup.object().shape({
    location: locationSchema,
  }),
  yup.object().shape({
    timings: timingsSchema,
  }),
  yup.object().shape({
    socials: socialSchema,
  }),
  yup.object().shape({
    faqs: faqSchema,
  }),
];

export default function AddEstablishment({
  business,
  isEdit = false,
}: {
  readonly business?: Readonly<Business>;
  readonly isEdit?: boolean;
}) {
  const saveToStorage = (data: any) => {
    if (typeof window !== "undefined" && window.localStorage) {
      // Remove or serialize File/Blob objects before saving
      const replacer = (_key: string, value: any) => {
        if (
          (typeof File !== "undefined" && value instanceof File) ||
          (typeof Blob !== "undefined" && value instanceof Blob)
        ) {
          // Store only metadata or null for files/blobs
          if (typeof File !== "undefined" && value instanceof File) {
            return { name: value.name, size: value.size, type: value.type };
          }
          // For Blob, omit 'name'
          return { size: value.size, type: value.type };
        }
        return value;
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data, replacer));
    }
  };

  const loadFromStorage = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    }
  };

  const clearStorage = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

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
          promotion: {
            title: business?.promotion?.title ?? "Promotion Space",
            description: business?.promotion?.description ?? undefined,
          },
          location: {
            state: business?.location?.state ?? "",
            city: business?.location?.city ?? "",
            zipcode: business?.location?.zipcode ?? undefined,
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
            cover: business?.media?.cover ?? undefined,
          },
          socials: {
            facebook: business?.socials?.facebook ?? undefined,
            instagram: business?.socials?.instagram ?? undefined,
            twitter: business?.socials?.twitter ?? undefined,
            linkedin: business?.socials?.linkedin ?? undefined,
            youtube: business?.socials?.youtube ?? undefined,
            tiktok: business?.socials?.tiktok ?? undefined,
          },
          faqs: (business?.faqs ?? []).map(({ _id, ...rest }) => rest),
        },
  });
  const { formState } = methods; // Access formState to track dirty state
  const { isDirty } = formState;

  useEffect(() => {
    const subscription = methods.watch((value) => {
      saveToStorage(JSON.stringify(value));
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
  const [isOpen, setIsOpen] = useState(false);
  const [maxListings, setMaxListings] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);

  const isUserLoggedIn =
    isLoggedIn &&
    userDetails?._id &&
    userDetails?.subscription &&
    userDetails?.permissions;
  const isUserBusinessOwner =
    isUserLoggedIn && business && business.userId === userDetails?._id;

  useEffect(() => {
    if (!isUserLoggedIn) {
      redirect("/plans");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    const evaluatePlanAccess = async () => {
      if (!_id || !plan || !permissions || isEdit) return;

      try {
        const { data } = await fetchBusinesses(1, 10, {}, _id);
        if (!data) return;

        const businessCount = data?.length;
        const maxListings = permissions.maxListings;
        console.log(
          `User has ${businessCount} listings, max allowed is ${maxListings}`
        );
        setBusinessCount(businessCount);
        setMaxListings(maxListings);

        if (businessCount >= maxListings) {
          setIsOpen(true);
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
      <UpgradePlan
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        maxListings={maxListings}
        businessCount={businessCount}
      />
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
            {isEdit
              ? "Updating your establishment..."
              : "Submitting your establishment..."}
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
        {currentStep === 1 && (
          <Step1Form isEdit={isEdit} businessId={business?._id} />
        )}
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
