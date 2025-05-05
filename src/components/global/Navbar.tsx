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
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "@/hooks/useAppState";
import { logoutUser } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import { User } from "@/types/user";
import CardStaggerAnimation from "@/animations/sections/CardStaggerAnimation";
import { X } from "lucide-react";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAppState();
  const { userDetails, isLoggedIn } = user || {};
  const pathname = usePathname();

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleDrawerClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleDrawer(false);
      }
    };

    window.addEventListener("keydown", handleDrawerClose);
    return () => {
      window.removeEventListener("keydown", handleDrawerClose);
    };
  }, []);

  useEffect(() => {
    toggleDrawer(false);
  }, [pathname]);

  const drawer = (
    <Box className="w-screen" sx={{ width: "100vw" }}>
      <List sx={{ padding: "2rem" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
            zIndex: 1,
            background: "#ec6dff",
            borderRadius: "50%",
            padding: "0.5rem",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={() => toggleDrawer(false)}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-white" />
        </IconButton>

        <CardStaggerAnimation
          stagger={0.1}
          duration={0.1}
          yOffset={-20}
          xOffset={-30}
        >
          {navLinks.map(({ href, label, style }) => {
            if (href === "login" && isLoggedIn) return null;
            return (
              <Link
                key={href}
                href={href}
                passHref
                prefetch
                style={{ ...style, fontSize: "2rem" }}
              >
                {label}
              </Link>
            );
          })}
        </CardStaggerAnimation>
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
              sx={{
                color: "white",
                cursor: "pointer",
                position: "relative", // <-- Required for Image with fill
                width: { xs: "30%", sm: "10%" },
                height: { xs: "80px", sm: "100px", md: "120px" },
              }}
            >
              <Image
                src="/images/logos/road-darts-logo.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
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
                sx={{
                  "& .MuiDrawer-paper": {
                    background:
                      "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
                  },
                }}
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
              <NavLinks
                isLoggedIn={isLoggedIn}
                subscriptionStatus={userDetails?.subscription?.status ?? ""}
              />
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

const NavLinks = ({
  isLoggedIn,
  subscriptionStatus,
}: {
  isLoggedIn: boolean | null;
  subscriptionStatus: string | null;
}) => {
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
                padding: "1rem",
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
  const menuItems = [
    {
      label: "View Profile",
      icon: <AccountCircleIcon sx={{ marginRight: "8px" }} />,
      action: () => router.push("/profile"),
    },
    {
      label: "View Your Reviews",
      icon: <RateReviewIcon sx={{ marginRight: "8px" }} />,
      action: () => router.push("/profile/my-reviews"),
    },
    {
      label: "Logout",
      icon: <LogoutIcon sx={{ marginRight: "8px" }} />,
      action: logoutHandler,
    },
  ];

  return (
    <div className="relative z-[200]">
      <Tooltip title="Account settings">
        <Button
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "86px",
          }}
          onClick={handleMenuOpen}
        >
          {userDetails?.firstname} {userDetails?.lastname}
          <Avatar
            src={userDetails.profileImg ?? "/images/default-avatar.png"}
            style={{ borderRadius: "50%", marginLeft: "8px" }}
          />
        </Button>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },

              background: "#160C1866",
              color: "white",
              borderRadius: "16px",
              padding: "8px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        {menuItems.map(({ label, icon, action }, index) => (
          <MenuItem
            key={label}
            onClick={action}
            sx={{
              borderRadius: "16px",
              padding: "8px 16px",
              marginBottom: index < 2 ? "8px" : 0, // Add spacing between items except the last one
              "&:hover": {
                backgroundColor: "#64546766", // Add hover effect
              },
            }}
          >
            {icon}
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
