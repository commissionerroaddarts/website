import * as yup from "yup";
import { mediaSchema } from "@/yupSchemas/mediaSchema";
import { phoneSchema } from "@/yupSchemas/phoneSchema";
import { socialSchema } from "@/yupSchemas/socialSchema";
import { faqSchema } from "@/yupSchemas/faqSchema";
import { timingsSchema } from "@/yupSchemas/timingsSchema";
import { locationSchema } from "@/yupSchemas/locationSchema";
export const stepSchemas = [
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

    noAgeLimit: yup.boolean(),
    agelimit: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" || originalValue === null
          ? null
          : Number(originalValue)
      )
      .nullable()
      .when("noAgeLimit", {
        is: false, // Only validate if 'noAgeLimit' is false
        then: (schema) =>
          schema
            .required("Age Limit is required")
            .min(18, "Age Limit must be above 18 years")
            .max(100, "Age Limit cannot exceed 100 years"),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
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
