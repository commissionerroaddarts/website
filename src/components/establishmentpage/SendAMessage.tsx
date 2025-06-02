"use client";

import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Custom components
import CustomInput from "@/components/global/CustomInput";
import ThemeButton from "@/components/buttons/ThemeButton";
import CloseIconButton from "@/components/global/CloseIconButton";
import { sendMsgToBusiness } from "@/services/businessService";
import { toast } from "react-toastify";
import { useAppState } from "@/hooks/useAppState";
import { useEffect, useState } from "react";

// Validation schema
const schema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
  firstname: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

type FormValues = {
  message: string;
  firstname: string;
  email: string;
};

export default function SendMessageModal({ id }: { readonly id: string }) {
  const router = useRouter();
  const { user, wishlist } = useAppState();
  const { userDetails, isLoggedIn } = user;
  const isUserLoggedIn = isLoggedIn && userDetails?._id !== undefined; // Check if the user is logged in
  const { businessName } = wishlist;
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      message: "",
      firstname: userDetails?.firstname ?? "",
      email: userDetails?.email ?? "",
    },
  });

  useEffect(() => {
    if (!pathname.includes("send-message")) {
      setIsOpen(false);
    }
  }, [pathname]);

  const handleClose = () => {
    const previousUrl = document.referrer;
    if (previousUrl.includes("/login")) {
      router.push("/establishments");
    } else {
      router.back();
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Form Submitted:", data);

    try {
      const response = await sendMsgToBusiness(id, data);
      if (!response?.success) {
        toast.error("Oops! Something went wrong. Please try again.");
        return;
      }
      toast.success(
        `Message sent successfully! ${businessName} will get back to you soon`
      );

      router.back();
    } catch (error) {
      console.error("Failed to send a message", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className="!overflow-hidden p-0 bg-transparent border-none"
      sx={{ backdropFilter: "blur(10px)" }}
      slotProps={{ paper: { sx: { borderRadius: 2 } } }}
    >
      <CloseIconButton onClick={handleClose} />
      <DialogContent
        dividers
        sx={{
          background:
            "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
        }}
        className="flex flex-col gap-2 "
      >
        <Box className="flex flex-col gap-2 p-5">
          <div className="mb-2">
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontWeight: 500 }}
            >
              Send Message To <span className="capitalize">{businessName}</span>
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Share a few details so we can get you in touch with the business
            </Typography>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Can you tell me more about your services?"
                  multiline
                  rows={4}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  {...field}
                />
              )}
            />

            <Box className="flex items-center justify-center gap-1 mt-4 pl-1">
              <Typography>Include your information</Typography>
              {!isUserLoggedIn && (
                <>
                  <Typography>or</Typography>
                  <Link
                    href={`/login?message=${id}`}
                    className="text-teal-600 hover:underline text-sm"
                  >
                    Log In
                  </Link>
                </>
              )}
            </Box>

            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={2}
            >
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="First Name"
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </Box>
            <div className="flex flex-col gap-2 mt-4">
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                We will send your information to the business to help get you a
                response.
              </Typography>

              <ThemeButton
                text={isSubmitting ? "Sending..." : "Send Message"}
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              />

              <Typography variant="body2" color="text.secondary" align="center">
                By proceeding, you agree to our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-teal-600 hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-teal-600 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </Typography>
            </div>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
