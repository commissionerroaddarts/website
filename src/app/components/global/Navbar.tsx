import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          <Image
            src="/images/logos/road-darts-logo.png"
            alt="Logo"
            width={160}
            height={160}
            style={{ height: "120px", width: "auto" }}
          />
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/about" passHref>
            <Button sx={{ color: "white" }}>About</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button sx={{ color: "white" }}>Contact</Button>
          </Link>

          <Link href="/add-listing" passHref>
            <Button
              sx={{
                color: "white",
                background: "#64546766",
                borderRadius: "86px",
                padding: "1rem 1.5rem",
              }}
            >
              Add Listing
            </Button>
          </Link>

          <Link href="/login" passHref>
            <Button sx={{ color: "white" }}>Sign In</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
