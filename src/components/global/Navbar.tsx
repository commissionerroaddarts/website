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

const navLinks = [
  {
    href: "/",
    label: "Home",
    style: {
      "&:hover": {
        background: "#64546766",
      },
    },
  },
  {
    href: "/about",
    label: "About",
    style: {
      "&:hover": {
        background: "#64546766",
      },
    },
  },
  {
    href: "/contact-us",
    label: "Contact",
    style: {
      "&:hover": {
        background: "#64546766",
      },
    },
  },
  {
    href: "/add-listing",
    label: "Add Listing",
    style: {
      background: "#64546766",
    },
  },
  {
    href: "/login",
    label: "Sign In",
    style: {
      "&:hover": {
        background: "#64546766",
      },
    },
  },
];

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
        {navLinks.map(({ href, label, style }) => (
          <Link key={href} href={href} passHref>
            <ListItem component="a" sx={style}>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
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
                // Apply blur effect
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
                gap: "5px",
                alignItems: "center",
              }}
            >
              {navLinks.map(({ href, label, style }) => (
                <Link key={href} href={href} passHref>
                  <Button
                    sx={{
                      color: "white",
                      padding: "1rem 1.5rem",
                      borderRadius: "86px",
                      ...style,
                    }}
                  >
                    {label}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Navbar;
