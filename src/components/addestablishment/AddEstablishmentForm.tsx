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
import { insertBusiness } from "@/services/businessService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import PromoCodePopupComponent from "./PromoCodeComponent";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
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
      // min: yup
      //   .number()
      //   .required("Minimum Price is required")
      //   .test(
      //     "min-max-check",
      //     "Minimum price must be less than maximum price",
      //     function (value) {
      //       const { max } = this.parent;
      //       return max === undefined || value < max;
      //     }
      //   )
      //   .test(
      //     "category-min-check",
      //     "Minimum price does not match the selected category",
      //     function (value) {
      //       const { category } = this.parent;
      //       if (category === "$") return value >= 1 && value <= 10;
      //       if (category === "$$") return value >= 11 && value <= 50;
      //       if (category === "$$$") return value >= 51 && value <= 100;
      //       if (category === "$$$$") return value >= 101;
      //       return true;
      //     }
      //   ),
      // max: yup
      //   .number()
      //   .required("Maximum Price is required")
      //   .test(
      //     "min-max-check",
      //     "Maximum price must be greater than minimum price",
      //     function (value) {
      //       const { min } = this.parent;
      //       return min === undefined || value > min;
      //     }
      //   )
      //   .test(
      //     "category-max-check",
      //     "Maximum price does not match the selected category",
      //     function (value) {
      //       const { category } = this.parent;
      //       if (category === "$") return value >= 1 && value <= 10;
      //       if (category === "$$") return value >= 11 && value <= 50;
      //       if (category === "$$$") return value >= 51 && value <= 100;
      //       if (category === "$$$$") return value >= 101;
      //       return true;
      //     }
      //   ),
    }),
    media: yup.object().shape({
      logo: yup
        .mixed()
        .required("Business Logo is required")
        .test("fileType", "Unsupported file format", (value) => {
          const file = value as File;
          return file && SUPPORTED_FORMATS.includes(file.type);
        })
        .test("fileSize", "Max allowed size is 1MB", (value) => {
          const file = value as File;
          return file && file.size <= MAX_FILE_SIZE;
        }),
      images: yup
        .array()
        .min(1, "At least one image is required")
        .test("required", "Images are required", (value) => {
          return value && value.length > 0;
        })
        .of(
          yup
            .mixed()
            .test(
              "fileRequired",
              "Image is required",
              (file) => file instanceof File
            )
            .test("fileType", "Only JPG/PNG/WEBP images allowed", (value) => {
              if (!value || !(value instanceof File)) return false;
              return SUPPORTED_FORMATS.includes(value.type);
            })
            .test("fileSize", "Each image must be under 1MB", (file) => {
              return file instanceof File && file.size <= MAX_FILE_SIZE;
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
      zipcode: yup
        .string()
        // .required("Zipcode is required")
        .matches(/^\d{5}(-\d{4})?$/, "Invalid Zipcode format"),
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
          q: yup
            .string()
            .required("Question is required")
            .min(10, "Question must be at least 10 characters long"),
          a: yup
            .string()
            .required("Answer is required")
            .min(10, "Answer must be at least 10 characters long"),
        })
      )
      .min(1, "At least one FAQ is required"),
  }),
  // more steps schemas if needed
];

export default function AddEstablishment() {
  const methods = useForm({
    mode: "onBlur",
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
  const { subscription } = userDetails || {};
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isLoading, setIsLoading] = useState(false);

  // if (!subscription) {
  //   return <PromoCodePopupComponent />;
  // }

  const handleStepSubmit = async (direction: "next" | "prev") => {
    const currentSchema = stepSchemas[currentStep - 1]; // currentStep is 1-based
    if (direction === "next" && currentStep === totalSteps) {
      try {
        setIsLoading(true);
        const values = methods.getValues();
        await currentSchema.validate(values, { abortEarly: false });

        // Call the API service method to insert business
        const response = await insertBusiness(values);
        if (response.status === 201) {
          const { _id } = response.data;
          if (_id) {
            toast.success("Business added successfully!");
            // Optionally reset the form or navigate to a success page
            methods.reset();
            setIsLoading(false);
            router.push(`/establishments/${_id}`); // Redirect to establishments page
          }
        }
      } catch (apiError) {
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
        validationError?.inner.forEach((err: any) => {
          methods.setError(err.path, { type: "manual", message: err.message });
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <AddEstablishmentLayout
        totalSteps={totalSteps}
        currentStep={currentStep}
        onStepSubmit={handleStepSubmit}
        isLoading={isLoading}
      >
        {currentStep === 1 && <Step1Form />}
        {currentStep === 2 && <Step2Form />}
        {currentStep === 3 && <Step3Form />}
        {currentStep === 4 && <Step4Form />}
        {currentStep === 5 && <Step5Form />}
      </AddEstablishmentLayout>
    </FormProvider>
  );
}
