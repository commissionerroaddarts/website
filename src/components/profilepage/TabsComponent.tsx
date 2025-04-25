"use client";
import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export const TabsComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    if (newValue === "profile") {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${newValue}`);
    }
  };
  return (
    <Box
      sx={{
        background:
          " linear-gradient(95.83deg, #6B6071 -41.47%, #3C2648 52.29%, rgba(130, 124, 133, 0.61) 113.31%)",
        borderRadius: "50px",
        p: 1,
        maxWidth: "700px",
        mx: "auto",
        mb: 4,
      }}
    >
      <Tabs
        value={pathname.split("/")[2] || "profile"}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label="Edit Profile"
          value="profile"
          sx={{
            "&.Mui-selected": {
              background: "rgba(130, 36, 227, 1)",
              borderRadius: "50px",
              color: "white",
              border: "none",
            },
          }}
        />
        <Tab label="Upgrade Plan" value="upgrade-plan" />
        <Tab label="Settings" value="settings" />
        <Tab label="My Reviews" value="my-reviews" />
      </Tabs>
    </Box>
  );
};
