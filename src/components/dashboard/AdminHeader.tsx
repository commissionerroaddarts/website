"use client";
import { Bell, Settings, ChevronDown } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderBottom="1px solid #2d272f"
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src="/placeholder.svg?height=32&width=32"
            sx={{ width: 32, height: 32, bgcolor: "#8224e3" }}
          >
            JD
          </Avatar>
          <ChevronDown style={{ color: "white", width: 16, height: 16 }} />
        </Stack>
      </Stack>
    </Box>
  );
}
