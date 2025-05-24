import * as yup from "yup";

export const phoneSchema = yup
  .string()
  .transform((value) => value.replace(/\D/g, "")) // remove non-digits
  .test(
    "len",
    "Phone Number must be exactly 10 digits",
    (val) => val?.length === 10
  )
  .required("Phone Number is required");
