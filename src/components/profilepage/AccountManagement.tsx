"use client";
import { Box, Container, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TabsComponent } from "./TabsComponent";
import { useAppState } from "@/hooks/useAppState";
import EditProfile from "./tabs/EditProfile";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import ProfileImageEditor from "./tabs/ProfileImageEditor";
import Preloader from "@/components/global/Preloader";
import { toast } from "react-toastify";
import { updateUserProfileImage } from "@/services/userService";
import ThemeButton from "../buttons/ThemeButton";
import { verifyEmail } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function AccountManagementPage() {
  const { user } = useAppState();
  const { isLoggedIn, userDetails } = user;
  const router = useRouter(); // Assuming you're using Next.js router
  const isUserLoggedIn = isLoggedIn && userDetails?._id !== undefined; // Check if the user is logged in

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, [isUserLoggedIn, router]);

  if (!userDetails) {
    return <Preloader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1, py: 2 }}>
        <TabsComponent userDetails={userDetails} />

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
            Manage Your Profile
          </Typography>

          <ProfileImage userDetails={userDetails} />

          <EditProfile user={userDetails} />
        </Box>
      </Container>
    </Box>
  );
}

const ProfileImage = ({ userDetails }: { userDetails: User }) => {
  const [openEditor, setOpenEditor] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    userDetails?.profileImg ?? "/placeholder.svg"
  );
  const handleSave = async (blob: Blob, fileUrl: string) => {
    setProfileImage(fileUrl);
    // You can also send `blob` to backend via FormData

    try {
      // Convert Blob to File
      const file = new File([blob], "profile-image.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("profileImg", file); // Now sending as a File
      const response = await updateUserProfileImage(formData);
      if (response.success) {
        toast.success("Profile image updated successfully!");
        window.location.reload();
      }
      toast.error("Failed to update profile image.");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      // Logic to resend the verification email
      const verificationResponse = await verifyEmail({
        email: userDetails.email,
      });
      if (
        verificationResponse?.status === 200 ||
        verificationResponse?.status === 201
      ) {
        toast.success("Email verified successfully!");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to verify.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
      <Box position="relative" mb={2}>
        <Avatar src={profileImage} sx={{ width: 120, height: 120 }} />
        <IconButton
          onClick={() => setOpenEditor(true)}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
      </Box>

      <ProfileImageEditor
        open={openEditor}
        onClose={() => setOpenEditor(false)}
        onSave={handleSave}
      />

      <Typography
        variant="h6"
        fontWeight="bold"
        color="text.primary"
        textTransform={"capitalize"}
      >
        {userDetails.firstname} {userDetails.lastname}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          {userDetails.email}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            ml: 1,
            px: 2,
            py: 0.5,
            borderRadius: "16px",
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            textTransform: "capitalize",
          }}
        >
          {userDetails.status}
        </Typography>
      </Box>

      {userDetails.status === "unverified" && (
        <Box mt={2}>
          <ThemeButton
            text="Resend Verification Email"
            onClick={handleResendVerification}
          />
        </Box>
      )}
    </Box>
  );
};
