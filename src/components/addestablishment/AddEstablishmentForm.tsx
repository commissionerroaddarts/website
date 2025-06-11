"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddEstablishmentLayout from "./Layout/AddEstablishmentLayout";
import Step1Form from "./Steps/Step1Form";
import Step4Form from "./Steps/Step4Form";
import Step3Form from "./Steps/Step3Form";
import Step2Form from "./Steps/Step2Form";
import Step5Form from "./Steps/Step5Form";
import Step6Form from "./Steps/Step6Form";
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
import { stepSchemas } from "@/yupSchemas/mainBusinessSchema";
import { getNextStep, validateStep } from "@/utils/addEstablishmentHelpers";

const LOCAL_STORAGE_KEY = "addEstablishmentFormData";

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
          agelimit: business?.agelimit ?? undefined,
          noAgeLimit: !business?.agelimit,
          price: { category: business?.price?.category ?? "$" },
          promotion: {
            title: business?.promotion?.title ?? "Promotion Space",
            description: business?.promotion?.description ?? undefined,
          },
          location: {
            state: business?.location?.state ?? undefined,
            city: business?.location?.city ?? undefined,
            zipcode: business?.location?.zipcode ?? undefined,
            country: business?.location?.country ?? undefined,
            address: business?.location?.address ?? undefined,
            geotag: {
              lat: business?.location?.geotag?.lat ?? undefined,
              lng: business?.location?.geotag?.lng ?? undefined,
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
          amenities: business?.amenities ?? undefined,
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
  const totalSteps = 6;
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

  // Helper: Handle final submission
  const submitForm = async (values: any) => {
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
        router.push(`/establishments/${business?.slug ?? response.data.slug}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepSubmit = async (targetStep: number | "next" | "prev") => {
    const currentIndex = currentStep - 1;
    const currentSchema = stepSchemas[currentIndex];
    const values = methods.getValues();
    const nextStep = getNextStep(targetStep, currentStep);
    const isFinalStep = nextStep > totalSteps;

    // Only validate if moving forward or submitting
    if (targetStep !== "prev") {
      const isValid = await validateStep(
        currentSchema,
        values,
        setIsLoading,
        methods
      );
      if (!isValid) return;
    }

    if (isFinalStep) {
      await submitForm(values);
      return;
    }

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
        {currentStep === 6 && <Step6Form />}
      </AddEstablishmentLayout>
    </FormProvider>
  );
}
