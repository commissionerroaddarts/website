"use client";

import { Controller, useFormContext } from "react-hook-form";
import CustomInput from "@/components/global/CustomInput";
import { Box, Grid2, Typography } from "@mui/material";
import ThemeButton from "@/components/buttons/ThemeButton";
import { useState } from "react";
import LogoUploaderPopup from "../MediaUploader/LogoUploaderPopup";
import { Upload } from "lucide-react";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import { boardTypeOptions, categoryOptions } from "@/utils/dropdowns";
import ImagesUploaderPopup from "../MediaUploader/ImagesUploader";

const priceCategories = [
  { label: "budget", value: "$" },
  { label: "midrange", value: "$$" },
  { label: "luxury", value: "$$$" },
  { label: "exclusive", value: "$$$$" },
];

export default function Step1Form() {
  const { control, setValue } = useFormContext(); // Notice: useFormContext instead of useForm!

  return (
    <Box>
      <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
        Basic Information
      </Typography>

      {/* Upload buttons here if needed */}

      <Grid2 container spacing={2} className="mb-8">
        <Grid2 size={{ xs: 12 }}>
          <UploadButtons />
        </Grid2>
        {/* Business Name */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Name"
                type="text"
                placeholder="Business Name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Business Tagline */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="tagline"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Tagline"
                type="text"
                placeholder="Business Tagline"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Business Phone Number */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Phone Number"
                type="tel"
                placeholder="Phone Number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Business Website */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="website"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Business Website"
                type="url"
                placeholder="Website"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="bg-transparent border-gray-600 rounded-xl py-6 text-white placeholder:text-gray-400"
              />
            )}
          />
        </Grid2>

        {/* Tags Field (multiple tags input) */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Tags"
                placeholder="Enter tags separated by commas"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) =>
                  setValue(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                value={field.value?.join(", ") ?? ""}
                fullWidth
              />
            )}
          />
        </Grid2>
        {/* Age Limit Field */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="ageLimit"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                label="Age Limit"
                onChange={(e) => setValue("ageLimit", e.target.value)}
                value={field.value === 0 ? undefined : field.value}
                type="number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Enter minimum age (e.g., 18)"
                fullWidth
              />
            )}
          />
        </Grid2>
        {/* Category Dropdown */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <SelectSearchDropDown
                {...field}
                label="Category"
                options={categoryOptions}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(value) => setValue("category", value.target.value)}
              />
            )}
          />
        </Grid2>

        {/* Board Type Dropdown */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name="bordType"
            control={control}
            render={({ field, fieldState }) => (
              <SelectSearchDropDown
                {...field}
                label="Board Type"
                options={boardTypeOptions}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(value) => setValue("bordType", value.target.value)}
              />
            )}
          />
        </Grid2>

        {/* Short Description */}
        <Grid2 size={{ xs: 12 }}>
          <Controller
            name="shortDis"
            control={control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                multiline
                rows={4}
                label="Short Description"
                placeholder="Short Description"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => setValue("shortDis", e.target.value)}
                value={field.value}
              />
            )}
          />
        </Grid2>
      </Grid2>
      {/* Pricing Details */}
      <Box mb={4}>
        <Typography variant="h5" textAlign="center" gutterBottom mb={2}>
          Pricing Details
        </Typography>

        <Controller
          name="price.category"
          control={control}
          render={({ field, fieldState }) => (
            <SelectSearchDropDown
              label="Price Category"
              {...field}
              value={field.value}
              onChange={(value) =>
                setValue("price.category", value.target.value)
              }
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              options={priceCategories}
            />
          )}
        />
        <Grid2 container spacing={2} mt={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="price.min"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  label="Minimum Price"
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  placeholder="Enter minimum price"
                  type="number"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value));
                    setValue("price.min", value);
                  }}
                  fullWidth
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="price.max"
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  label="Maximum Price"
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  placeholder="Enter maximum price"
                  onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value));
                    setValue("price.max", value);
                  }}
                  type="number"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

const UploadButtons = () => {
  const [uploadLogo, setUploadLogo] = useState(false);
  const [uploadMedia, setUploadMedia] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <Box className="flex flex-col items-center justify-center gap-2">
        <ThemeButton
          text="Upload Logo"
          type="button"
          icon={<Upload className="w-5 h-5" />}
          onClickEvent={() => setUploadLogo(true)}
        />
        {typeof errors?.businessLogo?.message === "string" && (
          <Typography color="error" variant="body2" className="mt-2">
            {errors.businessLogo.message}
          </Typography>
        )}
      </Box>

      {uploadLogo && (
        <LogoUploaderPopup open={uploadLogo} setOpen={setUploadLogo} />
      )}

      <Box className="flex flex-col items-center justify-center gap-2">
        <ThemeButton
          text="Upload Media"
          type="button"
          icon={<Upload className="w-5 h-5" />}
          onClickEvent={() => setUploadMedia(true)}
        />
        {typeof errors?.images?.message === "string" && (
          <Typography color="error" variant="body2" className="mt-2">
            {errors.images.message}
          </Typography>
        )}
      </Box>
      {uploadMedia && (
        <ImagesUploaderPopup open={uploadMedia} setOpen={setUploadMedia} />
      )}
    </div>
  );
};
