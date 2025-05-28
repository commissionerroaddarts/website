import * as yup from "yup";

export const faqSchema = yup
  .array()
  .of(
    yup.object({
      q: yup.string().required("Question is required"),
      a: yup.string().required("Answer is required"),
    })
  )
  .notRequired(); // Make the whole array optional
