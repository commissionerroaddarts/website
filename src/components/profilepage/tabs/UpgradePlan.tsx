"use client";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { TabsComponent } from "../TabsComponent";

const UpgradePlan = () => {
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
            Upgrade Your Subscription Plan
          </Typography>

          {/* upgrade plan */}
        </Box>
      </Container>
    </Box>
  );
};

export default UpgradePlan;
