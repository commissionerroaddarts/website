"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={() => toggleDrawer(false)}>
      <List>
        <Link href="/about" passHref>
          <ListItem component="a">
            <ListItemText primary="About" />
          </ListItem>
        </Link>
        <Link href="/contact-us" passHref>
          <ListItem component="a">
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
        <Link href="/add-listing" passHref>
          <ListItem component="a">
            <ListItemText primary="Add Listing" />
          </ListItem>
        </Link>
        <Link href="/login" passHref>
          <ListItem component="a">
            <ListItemText primary="Sign In" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="relative z-[200]"
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ zIndex: 10 }}
      >
        <Toolbar>
          <Link href="/" passHref style={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "white", cursor: "pointer" }}
            >
              <Image
                src="/images/logos/road-darts-logo.png"
                alt="Logo"
                width={160}
                height={160}
                style={{ height: "120px", width: "auto" }}
              />
            </Typography>
          </Link>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Link href="/about" passHref>
                <Button sx={{ color: "white" }}>About</Button>
              </Link>
              <Link href="/contact-us" passHref>
                <Button sx={{ color: "white" }}>Contact</Button>
              </Link>
              <Link href="/plans" passHref>
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
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Navbar;
