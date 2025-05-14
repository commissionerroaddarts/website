"use client";
import { User } from "@/types/user";
import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export const TabsComponent = ({
  userDetails,
}: {
  userDetails?: User | null;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isStoreOwner =
    userDetails?.role === "admin" || userDetails?.role === "owner";

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    if (newValue === "profile") {
      router.push(`/profile`);
    } else {
      router.push(`/profile/${newValue}`);
    }
  };

  const tabs = [
    { label: "Edit Profile", value: "profile" },
    ...(isStoreOwner
      ? [{ label: "My Establishments", value: "my-establishments" }]
      : []),
    // { label: "Upgrade Plan", value: "upgrade-plan" },
    { label: "Security Settings", value: "settings" },
  ];

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
        slotProps={{
          indicator: {
            style: { display: "none" },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disabled={
              pathname.split("/")[2] === tab.value ||
              (pathname.split("/")[2] === undefined && tab.value === "profile")
            }
            sx={{
              borderRadius: "50px",
              "&.Mui-selected": {
                background: "purple",
                color: "white",
                pointerEvents: "none", // Prevent click on active tab
              },
              "&:hover": {
                background:
                  pathname.split("/")[2] === tab.value ||
                  (pathname.split("/")[2] === undefined &&
                    tab.value === "profile")
                    ? "inherit"
                    : "#64546766",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
