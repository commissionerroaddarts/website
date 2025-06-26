"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
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
import { Building } from "lucide-react";
import ThemeButton from "@/components/buttons/ThemeButton";
import CloseIconButton from "./CloseIconButton";

const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/for-darters", label: "For Darters" },
  { href: "/about", label: "About" },
  { href: "/contact-us", label: "Contact" },
  { href: "/add-establishment", label: "Add Listing" },
];

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAppState();
  const { userDetails, isLoggedIn } = user || {};
  const pathname = usePathname();
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

  const getNavLinks = () => {
    const links = [...baseNavLinks];

    if (isLoggedIn && isMobile) {
      links.push(
        { href: "/profile", label: "Profile" },
        { href: "/logout", label: "Logout" }
      );
    } else if (!isLoggedIn) {
      links.push({ href: "/login", label: "Sign In" });
    }

    return links.map(({ href, label }) => {
      const isActive = pathname === href;
      if (href === "/logout") {
        return (
          <ThemeButton
            key={href}
            onClick={logoutHandler}
            text={label}
            fontSize="1.6rem"
          />
        );
      }

      return (
        <Link
          key={href}
          href={href}
          passHref
          prefetch
          className={`text-white py-3 rounded-[86px] ${
            isActive ? "bg-[#645467] my-2 px-8" : "px-5"
          } ${isMobile ? "text-[2rem]" : "text-[1rem] "} hover:bg-[#64546766]`}
        >
          {label}
        </Link>
      );
    });
  };

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
    <Box sx={{ width: "100vw" }}>
      <List sx={{ padding: "2rem" }}>
        <CloseIconButton onClick={() => toggleDrawer(false)} />

        <CardStaggerAnimation
          stagger={0.1}
          duration={0.1}
          yOffset={-20}
          xOffset={-30}
          delay={0.2}
        >
          {getNavLinks()}
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
          <Box
            sx={{
              flexGrow: 1,
            }}
            className="flex justify-start"
          >
            <Box
              sx={{
                position: "relative", // <-- Required for Image with fill
                width: { xs: "30%", sm: "10%", md: "20%" },
                height: {
                  xs: "100px",
                  sm: "120px",
                  md: "140px",
                  lg: "150px",
                  xl: "200px",
                },
              }}
            >
              <Image
                src="/images/logos/road-darts-logo.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain", cursor: "pointer" }}
                onClick={() => router.push("/")}
              />
            </Box>
          </Box>

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
              {getNavLinks()}
              {isLoggedIn && userDetails && (
                <ProfileLink
                  userDetails={userDetails}
                  logoutHandler={logoutHandler}
                  router={router}
                />
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export const ProfileLink = ({
  userDetails,
  logoutHandler,
  router,
  isAdmin = false,
}: {
  userDetails: User;
  logoutHandler: () => void;
  router: any; // Replace with the correct type for your router
  isAdmin?: boolean;
}) => {
  const isAdminRole = isAdmin || userDetails.role === "admin";
  const prefixUrl = isAdminRole ? "/dashboard/" : "/";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isStoreOwner = userDetails.role === "owner";
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const path = usePathname();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleMenuClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const menuItems = [
    {
      label: "View Profile",
      icon: <AccountCircleIcon sx={{ marginRight: "8px" }} />,
      action: () => router.push(`${prefixUrl}profile`),
    },
    ...(isAdmin
      ? [
          {
            label: "Admin Dashboard",
            icon: <AccountCircleIcon sx={{ marginRight: "8px" }} />,
            action: () => router.push("/dashboard"),
          },
        ]
      : [
          {
            label: "View Your Reviews",
            icon: <RateReviewIcon sx={{ marginRight: "8px" }} />,
            action: () => router.push("/profile/my-reviews"),
          },
        ]),

    ...(isStoreOwner
      ? [
          {
            label: "View Your Listings",
            icon: <Building style={{ marginRight: "8px" }} />,
            action: () => router.push("/profile/view-your-listings"),
          },
        ]
      : []),
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
            textTransform: "capitalize",
            fontSize: "1rem",
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
              textTransform: "capitalize",
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
