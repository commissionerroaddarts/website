import * as yup from "yup";

export const amenitiesSchema = yup.object().shape({
  wheelchairAccessible: yup.boolean().optional(),
  validatedParking: yup.boolean().optional(),
  smokingOutsideOnly: yup.boolean().optional(),
  outdoorSeating: yup.boolean().optional(),
  heatedOutdoorSeating: yup.boolean().optional(),
  bikeParking: yup.boolean().optional(),
  acceptsCreditCards: yup.boolean().optional(),
  freeWiFi: yup.boolean().optional(),
  tv: yup.boolean().optional(),
  happyHourSpecials: yup.boolean().optional(),
  coveredOutdoorSeating: yup.boolean().optional(),
});
