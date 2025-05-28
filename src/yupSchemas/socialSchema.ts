import * as yup from "yup";
export const socialSchema = yup.object().shape({
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
});
