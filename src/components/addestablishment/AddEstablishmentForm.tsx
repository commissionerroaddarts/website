"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Upload, X } from "lucide-react";
import CustomInput from "../global/CustomInput";
import { Box, Dialog, Grid2, IconButton } from "@mui/material";
import ThemeButton from "../buttons/ThemeButton";
import StepsIndicator from "./StepsIndicator";
import LogoUploaderPopup from "./MediaUploader/LogoUploaderPopup";

// Validation schema using yup
const schema = yup.object().shape({
  businessName: yup.string().required("Business Name is required"),
  businessTagline: yup.string().required("Business Tagline is required"),
  businessPhoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone Number must be numeric")
    .required("Business Phone Number is required"),
  businessWebsite: yup
    .string()
    .url("Must be a valid URL")
    .required("Business Website is required"),
  shortDescription: yup
    .string()
    .required("Short Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});

export default function AddEstablishmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      businessName: "",
      businessTagline: "",
      businessPhoneNumber: "",
      businessWebsite: "",
      shortDescription: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Establishments</h1>
        <p className="text-gray-300">
          Fill in the details to add a new listing to the platform
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-3xl p-8 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
      >
        <StepsIndicator currentStep={currentStep} totalSteps={totalSteps} />
        {/* Form Content */}
        <Box>
          <h2 className="text-2xl font-semibold text-center mb-8">
            Basic Information
          </h2>

          <UploadButtons />

          {/* Form Fields */}
          <Grid2 container spacing={2} className="mb-8">
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="businessName"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Business Name"
                    type="text"
                    placeholder="Business Name"
                    className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
                    error={!!errors.businessName?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="businessTagline"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Business Tagline"
                    type="text"
                    placeholder="Tagline"
                    className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
                    error={!!errors.businessTagline?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="businessPhoneNumber"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Business Phone Number"
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
                    error={!!errors.businessPhoneNumber?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="businessWebsite"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Business Website"
                    type="url"
                    placeholder="Website"
                    className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
                    error={!!errors.businessWebsite?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12 }}>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Short Description"
                    multiline
                    rows={4}
                    placeholder="Short Description"
                    className="bg-transparent border-gray-600 rounded-xl min-h-[120px] text-white placeholder:text-gray-400"
                    error={!!errors.shortDescription?.message}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </Box>

        {/* Next Button */}
        <div className="flex justify-center">
          <ThemeButton text="Next" type="submit" />
        </div>
      </form>
    </div>
  );
}

const UploadButtons = () => {
  const [uploadLogo, setUploadLogo] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(false);
  const [uploadVideo, setUploadVideo] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <ThemeButton
        text="Upload Logo"
        type="button"
        icon={<Upload className="w-5 h-5" />}
        onClickEvent={() => setUploadLogo(true)}
      />
      {uploadLogo && (
        <Dialog
          maxWidth="sm"
          fullWidth
          open={uploadLogo}
          onClose={() => setUploadLogo(false)}
          className=" rounded-3xl backdrop-blur-sm relative"
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "white",
              zIndex: 1,
              background: "#ec6dff",
              borderRadius: "50%",
              padding: "0.5rem",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={() => setUploadLogo(false)}
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </IconButton>

          <LogoUploaderPopup />
        </Dialog>
      )}
      <ThemeButton
        text="Upload Media"
        type="button"
        icon={<Upload className="w-5 h-5" />}
      />
      <ThemeButton
        text="Upload Video"
        type="button"
        icon={<Upload className="w-5 h-5" />}
      />
    </div>
  );
};
