"use client";
import { Box, Typography, Grid2 } from "@mui/material";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import { User } from "@/types/user";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "@/services/userService";

const phoneRegex = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,14}$/; // Handles intl formats
const nameRegex = /^[A-Za-z\s\-']+$/; // Allows letters, spaces, hyphens, apostrophes
const zipCodeRegex = /^\d{4,10}$/; // Accepts 4-10 digits

const schema = yup.object().shape({
  firstname: yup
    .string()
    .matches(
      nameRegex,
      "Only letters, spaces, hyphens, or apostrophes are allowed"
    )
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be at most 30 characters")
    .required("First name is required"),

  lastname: yup
    .string()
    .matches(
      nameRegex,
      "Only letters, spaces, hyphens, or apostrophes are allowed"
    )
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must be at most 30 characters")
    .required("Last name is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(phoneRegex, "Invalid phone number format")
    .required("Phone number is required")
    .notRequired(),

  country: yup
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(56, "Country name too long")
    .notRequired(),

  state: yup
    .string()
    .min(2, "State name must be at least 2 characters")
    .max(56, "State name too long")
    .notRequired(),

  city: yup
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(56, "City name too long")
    .notRequired(),

  zipCode: yup
    .string()
    .matches(zipCodeRegex, "Zip code must be 4 to 10 digits")
    .notRequired(),

  facebook: yup
    .string()
    .url("Facebook link must be a valid URL")
    .nullable()
    .notRequired(),

  instagram: yup
    .string()
    .url("Instagram link must be a valid URL")
    .nullable()
    .notRequired(),

  twitter: yup
    .string()
    .url("Twitter link must be a valid URL")
    .nullable()
    .notRequired(),

  linkedin: yup
    .string()
    .url("LinkedIn link must be a valid URL")
    .nullable()
    .notRequired(),
});

const EditProfile = ({ user }: { user: User }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      country: user.address?.country ?? "",
      state: user.address?.state ?? "",
      city: user.address?.city ?? "",
      zipCode: user.address?.zipcode ?? "",
      facebook: user.socials?.facebook ?? "",
      instagram: user.socials?.instagram ?? "",
      twitter: user.socials?.twitter ?? "",
      linkedin: user.socials?.linkedin ?? "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    try {
      const updatedUser = {
        ...user,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: {
          country: data.country,
          state: data.state,
          city: data.city,
          zipcode: data.zipCode,
        },
        socials: {
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          linkedin: data.linkedin,
        },
      };

      const response = updateUserProfile(updatedUser);
      console.log("Profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="text.primary"
          mb={2}
        >
          Basic Information
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your First Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Last Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Email"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Phone Number"
                  fullWidth
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box mb={4}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="text.primary"
          mb={2}
        >
          Address Details
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Country"
                  fullWidth
                  variant="outlined"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your State"
                  fullWidth
                  variant="outlined"
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your City"
                  fullWidth
                  variant="outlined"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Zip Code"
                  fullWidth
                  variant="outlined"
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box mb={4}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="text.primary"
          mb={2}
        >
          Social Links
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="facebook"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Facebook Link"
                  fullWidth
                  variant="outlined"
                  error={!!errors.facebook}
                  helperText={errors.facebook?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="instagram"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Instagram Link"
                  fullWidth
                  variant="outlined"
                  error={!!errors.instagram}
                  helperText={errors.instagram?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="twitter"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your Twitter Link"
                  fullWidth
                  variant="outlined"
                  error={!!errors.twitter}
                  helperText={errors.twitter?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Your LinkedIn Link"
                  fullWidth
                  variant="outlined"
                  error={!!errors.linkedin}
                  helperText={errors.linkedin?.message}
                  {...field}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <ThemeButton text={isSubmitting ? "Saving..." : "Save"} type="submit" />
      </Box>
    </form>
  );
};

export default EditProfile;
