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
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
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
    bordtype: yup.string().required("Board Type is required"),
    agelimit: yup
      .number()
      .min(0, "Age Limit cannot be negative")
      .required("Age Limit is required"),
    price: yup.object().shape({
      category: yup.string().required("Price Category is required"),
      min: yup.number().required("Minimum Price is required"),
      max: yup.number().required("Maximum Price is required"),
    }),
    media: yup.object().shape({
      logo: yup.string().required("Business Logo is required"),
      images: yup
        .array()
        .of(yup.string().required())
        .min(1, "At least one image is required"),
    }),
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
      name: "Muhammad Umer khan",
      tagline: "Business Tagline",
      phone: "03343779404",
      website: "https://umer.com",
      tags: ["darts", "playtime", "business"],
      agelimit: "18",
      category: "Restaurant",
      bordtype: "Both",
      shortDis: "adfajfaskfklasjflkajfklasjfj",
      price: {
        category: "$$$",
        min: 5,
        max: 10,
      },
      location: {
        country: "Pakistan",
        state: "Sindh",
        city: "Karachi",
        zipcode: "35700",
        geotag: {
          lat: 24.9015625,
          lng: 67.1143125,
        },
      },
      timings: {
        mon: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
        tue: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
        wed: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
        thu: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
        fri: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
        sat: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
        sun: {
          open: "12:30 AM",
          close: "12:30 AM",
        },
      },
      socials: {},
      faqs: [
        {
          q: "what is umer",
          a: "regdfgdfgdfgdfgf",
        },
      ],
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
          console.error(err);
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
