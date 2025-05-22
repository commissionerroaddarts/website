import * as yup from "yup";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];

export const mediaSchema = yup.object().shape({
  logo: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("is-empty", "Skip if empty", (value) => {
      return (
        !value ||
        value === "" ||
        typeof value === "string" ||
        value instanceof Blob
      );
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value || typeof value === "string") return true;

      const file = value as Blob;
      return SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "Max allowed size is 5MB", (value) => {
      if (!value || typeof value === "string") return true;

      const file = value as Blob;
      return file.size <= MAX_FILE_SIZE;
    }),
  cover: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("is-empty", "Skip if empty", (value) => {
      return (
        !value ||
        value === "" ||
        typeof value === "string" ||
        value instanceof Blob
      );
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value || typeof value === "string") return true;

      const file = value as Blob;
      return SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "Max allowed size is 5MB", (value) => {
      if (!value || typeof value === "string") return true;

      const file = value as Blob;
      return file.size <= MAX_FILE_SIZE;
    }),

  images: yup
    .array()
    .of(
      yup
        .mixed()
        .nullable()
        .notRequired()
        .test("is-empty", "Skip if empty", (value) => {
          return (
            !value ||
            value === "" ||
            typeof value === "string" ||
            value instanceof Blob
          );
        })
        .test("fileType", "Only JPG, PNG, or JPEG images allowed", (value) => {
          if (!value || typeof value === "string") return true;

          return (
            value instanceof Blob && SUPPORTED_FORMATS.includes(value.type)
          );
        })
        .test("fileSize", "Each image must be under 5MB", (value) => {
          if (!value || typeof value === "string") return true;

          return value instanceof Blob && value.size <= MAX_FILE_SIZE;
        })
    )
    .nullable()
    .notRequired()
    .test("arrayLength", "Skip if array is empty", (arr) => {
      return !arr || arr.length === 0 || Array.isArray(arr);
    }),
});
