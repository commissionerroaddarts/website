"use client";
import { Bell, Settings } from "lucide-react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/authService";
import { useAppDispatch } from "@/store";
import { ProfileLink } from "../../global/Navbar";
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
    userDetails = {
      _id: "1234567890abcdef",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      password: "hashedpassword",
      canAdd: true,
      businessCount: 2,
      profileImg: "https://example.com/profile.jpg",
      gender: "Male",
      dob: new Date("1990-01-01"),
      username: "johndoe",
      address: {
        state: "California",
        city: "Los Angeles",
        country: "USA",
        zipcode: "90001",
      },
      socials: {
        twitter: "johndoe",
        linkedin: "john-doe",
      },
      status: "verified",
      role: "admin",
      permissions: {
        maxListings: 5,
      },
      subscription: {
        plan: "premium",
        currentPeriodEnd: 1719878400,
        isAutoRenew: true,
        status: "active",
      },
      stripeSubscriptionId: "sub_1N2xY2AABBCCDD",
      createdAt: new Date("2023-01-01T10:00:00Z"),
      updatedAt: new Date("2023-06-01T12:00:00Z"),
    };
  }

  return (
    <Box
      component="header"
      className="flex items-center justify-between my-3 mx-5 rounded-lg"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
        }}
        className="flex justify-start"
      >
        <Box
          sx={{
            position: "relative",
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

      <Stack
        direction="row"
        alignItems="center"
        sx={{ position: "relative", zIndex: 1 }}
      >
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
          isAdmin={true}
        />
      </Stack>
    </Box>
  );
}
