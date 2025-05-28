import * as yup from "yup";
export const timingsSchema = yup.object().shape({
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
});
