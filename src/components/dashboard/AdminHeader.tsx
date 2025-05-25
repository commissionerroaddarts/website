"use client";
import { Bell, Settings } from "lucide-react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/authService";
import { useAppDispatch } from "@/store";
import { ProfileLink } from "../global/Navbar";

import { User } from "@/types/user";

export default function AdminHeader({
  userDetails,
}: {
  readonly userDetails: User;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      //call the logout function from your auth service
      await logoutUser(dispatch);
      // Redirect to the login page or home page after logout
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!userDetails?._id) {
    return null; // Return null if userDetails is not available
  }

  return (
    <Box
      component="header"
      className="flex items-center justify-between border-b border-gray-300 py-2 mx-5"
    >
      <Box
        sx={{
          flexGrow: 1,
        }}
        className="flex justify-start"
      >
        <Box
          sx={{
            position: "relative", // <-- Required for Image with fill
            width: { xs: "30%", sm: "10%" },
            height: {
              xs: "60px",
              lg: "80px",
              xl: "100px",
            },
          }}
        >
          <Image
            src="/images/logos/road-darts-logo.png"
            alt="Logo"
            fill
            style={{ objectFit: "contain", cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          />
        </Box>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton>
          <Bell style={{ color: "white", width: 20, height: 20 }} />
        </IconButton>
        <IconButton>
          <Settings style={{ color: "white", width: 20, height: 20 }} />
        </IconButton>

        <ProfileLink
          userDetails={userDetails}
          logoutHandler={logoutHandler}
          router={router}
        />
      </Stack>
    </Box>
  );
}
