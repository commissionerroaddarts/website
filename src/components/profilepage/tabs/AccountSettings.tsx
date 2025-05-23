"use client";
import { Box, Container, Grid2, Typography } from "@mui/material";
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserPassword } from "@/services/userService";
import { PasswordChange } from "@/types/user";
import { TabsComponent } from "../TabsComponent";
import { toast } from "react-toastify";
import { useAppState } from "@/hooks/useAppState";
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const AccountSettings = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { user } = useAppState();
  const { userDetails } = user;

  const onSubmit = async (data: any) => {
    try {
      const updatedPassword: PasswordChange = {
        newPassword: data.password,
      };

      const response = await updateUserPassword(updatedPassword);
      if (response.status === 200) {
        toast.success(response.data.message);
        window.location.reload();
      }

      toast.error("Error resetting password");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1 }}>
        <TabsComponent userDetails={userDetails ?? null} />

        <Box
          sx={{
            background:
              "linear-gradient(139deg, #200C27 -4.72%, #4A1C5A 48.82%, #3F0F50 102.37%)",
            borderRadius: "16px",
            p: 4,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            textAlign="center"
            mb={4}
          >
            Reset Your Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={4}>
              <Grid2 container spacing={2}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      label="Your New Password"
                      fullWidth
                      type="password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      label="Confirm New Password"
                      fullWidth
                      type="password"
                      variant="outlined"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      {...field}
                    />
                  )}
                />
              </Grid2>
            </Box>

            <Box display="flex" justifyContent="center" mt={4}>
              <ThemeButton
                text={isSubmitting ? "Resetting..." : "Reset Password"}
                type="submit"
              />
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AccountSettings;
