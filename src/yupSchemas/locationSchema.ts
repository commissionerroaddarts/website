import * as yup from "yup";
export const locationSchema = yup.object().shape({
  address: yup
    .string()
    .optional()
    .min(5, "Address must be at least 5 characters long")
    .max(200, "Address cannot exceed 200 characters"),
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters long"),
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
});
