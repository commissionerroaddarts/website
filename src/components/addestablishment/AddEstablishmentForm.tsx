"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import AddEstablishmentLayout from "./Layout/AddEstablishmentLayout";
import Step1Form from "./Steps/Step1Form";
import Step4Form from "./Steps/Step4Form";
import Step3Form from "./Steps/Step3Form";
import Step2Form from "./Steps/Step2Form";
import Step5Form from "./Steps/Step5Form";
import { insertBusiness } from "@/services/businessService";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const stepSchemas = [
  yup.object().shape({
    name: yup.string().required("Business Name is required"),
    tagline: yup.string().required("Business Tagline is required"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Phone Number must be numeric")
      .required("Business Phone Number is required"),
    website: yup
      .string()
      .url("Must be a valid URL")
      .required("Website URL is required"),
    shortDis: yup.string().required("Short Description is required").max(500),
    tags: yup.array().of(yup.string()).min(1, "At least one tag is required"),
    category: yup.string().required("Category is required"),
    boardType: yup.string().required("Board Type is required"),
    ageLimit: yup
      .number()
      .typeError("Age Limit must be a number")
      .min(0, "Age Limit cannot be negative")
      .nullable()
      .required("Age Limit is required"),
    price: yup.object().shape({
      category: yup.string().required("Price Category is required"),
      min: yup.number().required("Minimum Price is required"),
      max: yup.number().required("Maximum Price is required"),
    }),
    businessLogo: yup
      .mixed()
      .required("Business Logo is required")
      .test("fileType", "Unsupported file format", (value) => {
        const file = value as File;
        return file && SUPPORTED_FORMATS.includes(file.type);
      })
      .test("fileSize", "Max allowed size is 100KB", (value) => {
        const file = value as File;
        return file && file.size <= MAX_FILE_SIZE;
      }),

    images: yup
      .array()
      .of(
        yup
          .mixed()
          .required()
          .test("fileType", "Only JPG/PNG/WEBP images allowed", (value) => {
            const file = value as File;
            return file && SUPPORTED_FORMATS.includes(file.type);
          })
          .test("fileSize", "Each image must be under 100KB", (value) => {
            const file = value as File;
            return file && file.size <= MAX_FILE_SIZE;
          })
      )
      .min(1, "At least one image is required"),
  }),
  yup.object().shape({
    location: yup.object().shape({
      country: yup.string().required("Country is required"),
      state: yup.string().required("State is required"),
      city: yup.string().required("City is required"),
      zipcode: yup.string().required("Zipcode is required"),
      geotag: yup.object().shape({
        lat: yup.number().required(),
        lng: yup.number().required(),
      }),
    }),
  }),
  yup.object().shape({
    timings: yup.object().shape({
      Monday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      Tuesday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      Wednesday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      Thursday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      Friday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      Saturday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
      Sunday: yup.object().shape({
        open: yup.string().required("Open time is required"),
        close: yup.string().required("Close time is required"),
      }),
    }),
  }),
  yup.object().shape({
    socials: yup.object().shape({
      facebook: yup.string().url("Invalid Facebook URL").nullable(),
      instagram: yup.string().url("Invalid Instagram URL").nullable(),
      twitter: yup.string().url("Invalid Twitter URL").nullable(),
      linkedin: yup.string().url("Invalid LinkedIn URL").nullable(),
      youtube: yup.string().url("Invalid YouTube URL").nullable(),
      tiktok: yup.string().url("Invalid TikTok URL").nullable(),
    }),
  }),
  yup.object().shape({
    faqs: yup.array().of(
      yup.object({
        q: yup.string().required("Question is required"),
        a: yup.string().required("Answer is required"),
      })
    ),
  }),
  // more steps schemas if needed
];

export default function AddEstablishment() {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      tagline: "",
      phone: "",
      website: "",
      shortDis: "",
      location: {
        geotag: {
          lat: 0,
          lng: 0,
        },
        state: "",
        city: "",
        country: "",
        zipcode: "",
      },
      price: {
        category: "$" as "$" | "$$" | "$$$" | "$$$$",
        min: 0,
        max: 0,
      },
      bordtype: "Both" as "Steel Tip" | "Plastic" | "Both",
      timings: {},
      socials: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        youtube: "",
        tiktok: "",
      },
      faqs: [{ q: "", a: "" }],
      ageLimit: 0,
      category: "",
      tags: [],
      images: [],
      businessLogo: "",
      status: "Active" as
        | "Active"
        | "Closed Down"
        | "Coming Soon"
        | "Under Remodel",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const handleStepSubmit = async (direction: "next" | "prev") => {
    const currentSchema = stepSchemas[currentStep - 1]; // currentStep is 1-based
    if (direction === "next" && currentStep === totalSteps) {
      try {
        const values = methods.getValues();
        await currentSchema.validate(values, { abortEarly: false });

        // Call the API service method to insert business
        const response = await insertBusiness(values);
        console.log("Business successfully added:", response);

        // Optionally reset the form or navigate to a success page
        methods.reset();
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
        console.log("Form data:", values);
      } else {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
      }
    } catch (validationError: any) {
      if (validationError?.inner) {
        validationError?.inner.forEach((err: any) => {
          methods.setError(err.path, { type: "manual", message: err.message });
        });
      }
      console.error("Validation failed!", validationError);
    }
  };

  return (
    <FormProvider {...methods}>
      <AddEstablishmentLayout
        totalSteps={totalSteps}
        currentStep={currentStep}
        onStepSubmit={handleStepSubmit}
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
