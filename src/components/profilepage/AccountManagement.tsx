"use client";
import { Box, Container, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TabsComponent } from "./TabsComponent";
import { useAppState } from "@/hooks/useAppState";
import EditProfile from "./tabs/EditProfile";
import { User } from "@/types/user";
import { useState } from "react";
import ProfileImageEditor from "./tabs/ProfileImageEditor";
import Preloader from "@/components/global/Preloader";

export default function AccountManagementPage() {
  const { user } = useAppState();
  const { userDetails } = user;
  if (!userDetails) {
    return <Preloader />;
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1, py: 8 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Manage Your Account
          </Typography>
          <Typography color="text.secondary">
            Shape your profile, aim your journey
          </Typography>
        </Box>

        <TabsComponent />

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
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg");

  const handleSave = (blob: Blob, fileUrl: string) => {
    setProfileImage(fileUrl);
    // You can also send `blob` to backend via FormData
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
      <Typography color="text.secondary">{userDetails.email}</Typography>
    </Box>
  );
};
