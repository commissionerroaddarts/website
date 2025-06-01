import CustomInput from "@/components/global/CustomInput";
import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const socialMediaFields = [
  {
    name: "socials.facebook",
    label: "Facebook URL",
    placeholder: "https://facebook.com/yourpage",
  },
  {
    name: "socials.instagram",
    label: "Instagram URL",
    placeholder: "https://instagram.com/yourhandle",
  },
  {
    name: "socials.twitter",
    label: "Twitter URL",
    placeholder: "https://x.com/yourhandle",
  },
  {
    name: "socials.linkedin",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/in/yourprofile",
  },
  {
    name: "socials.youtube",
    label: "YouTube URL",
    placeholder: "https://youtube.com/yourchannel",
  },
  {
    name: "socials.tiktok",
    label: "TikTok URL",
    placeholder: "https://tiktok.com/@yourhandle",
  },
];

const Step5Form = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" textAlign="center" gutterBottom mb={5}>
        Connect Social Media
      </Typography>
      <Grid2 container spacing={2}>
        {socialMediaFields.map(({ name, label, placeholder }) => (
          <Grid2 key={name} size={{ xs: 12, md: 6 }}>
            <Controller
              name={name}
              control={control}
              render={({ field, fieldState }) => (
                <CustomInput
                  label={label}
                  placeholder={placeholder}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Step5Form;
