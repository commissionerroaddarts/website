import * as yup from "yup";

export const amenitiesSchema = yup.object().shape({
  wheelchairAccessible: yup.boolean().optional(),
  outdoorSeating: yup.boolean().optional(),
  heatedPatio: yup.boolean().optional(),
  outdoorSmoking: yup.boolean().optional(),
  acceptsCreditCards: yup.boolean().optional(),
  petFriendly: yup.boolean().optional(),
  freeWiFi: yup.boolean().optional(),
  tvOnSite: yup.boolean().optional(),
  happyHourSpecials: yup.boolean().optional(),
  reservationsAccepted: yup.boolean().optional(),
  privateEventSpace: yup.boolean().optional(),
  bikeParking: yup.boolean().optional(),
  validatedParking: yup.boolean().optional(),
  billiards: yup.boolean().optional(),
  cornhole: yup.boolean().optional(),
  other: yup.array().of(yup.string().trim().max(100)).optional(), // Optional array of custom amenities
});
