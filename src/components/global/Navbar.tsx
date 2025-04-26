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
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "@/hooks/useAppState";
import { logoutUser } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import { User } from "@/types/user";

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
    href: "/plans",
    label: "Add Listing",
    style: {
      "&:hover": {
        background: "#64546766",
      },
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
  const { user } = useAppState();
  const { userDetails, isLoggedIn } = user || {};

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={() => toggleDrawer(false)}>
      <List>
        {navLinks.map(({ href, label, style }) => (
          <Link key={href} href={href} passHref prefetch>
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
        color={"transparent"}
        elevation={0}
        sx={{ zIndex: 10 }}
      >
        <Toolbar>
          <Link href="/" passHref style={{ flexGrow: 1 }} prefetch>
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
              <NavLinks isLoggedIn={isLoggedIn} />
              {isLoggedIn && userDetails && (
                <ProfileLink userDetails={userDetails} />
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

const NavLinks = ({ isLoggedIn }: { isLoggedIn: boolean | null }) => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ href, label, style }) => {
        if (label === "Sign In" && isLoggedIn) return null;

        const isActive = pathname === href;

        return (
          <Link key={href} href={href}>
            <Button
              sx={{
                color: "white",
                padding: "1rem 1.5rem",
                borderRadius: "86px",
                backgroundColor: isActive ? "#645467" : "transparent",
                ...style,
              }}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </>
  );
};

const ProfileLink = ({ userDetails }: { userDetails: User }) => {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{
          color: "white",
          padding: "1rem 1.5rem",
          borderRadius: "86px",
        }}
        onClick={handleMenuOpen}
      >
        {userDetails?.firstname} {userDetails?.lastname}
        <Avatar
          src={userDetails?.profileImage ?? "/images/default-avatar.png"}
          style={{ borderRadius: "50%", marginLeft: "8px" }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            style: {
              background:
                "linear-gradient(152.76deg, #3F0F50 21.4%, #5D1178 54.49%, #200C27 85.73%)",
              color: "white",
            },
          },
        }}
      >
        <MenuItem onClick={() => router.push("/profile")}>
          <AccountCircleIcon sx={{ marginRight: "8px" }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={() => router.push("/profile/my-reviews")}>
          <RateReviewIcon sx={{ marginRight: "8px" }} />
          View Your Reviews
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <LogoutIcon sx={{ marginRight: "8px" }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
