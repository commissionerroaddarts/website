import React from "react";
import { Button, ButtonProps as MuiButtonProps } from "@mui/material";

// Extend MUI's ButtonProps to make the component more reusable
interface ThemeButtonProps extends MuiButtonProps {
  onClickEvent?: () => void;
  icon?: React.ReactNode;
  text: string;
  backgroundColor?: string; // Optional prop for background color
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  onClickEvent,
  icon,
  text,
  backgroundColor = "#8224E3", // Default background color
  ...rest
}) => {
  return (
    <Button
      onClick={onClickEvent}
      variant="contained"
      sx={{
        background: backgroundColor,
        borderRadius: "100px",
        minWidth: "120px",
        padding: "0.8rem 2rem",
        textTransform: "capitalize",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: icon ? "8px" : "0",
        color: "white",
        fontWeight: "600", // font-semibold
        transition: "all 0.3s", // transition-all duration-300
        "&:hover": {
          transform: "translate(-4px, -4px)", // hover:translate-x-[-4px] hover:translate-y-[-4px]
          borderRadius: "90px", // hover:rounded-md
          boxShadow: "4px 4px 0px black", // hover:shadow-[4px_4px_0px_black]
        },
        "&:active": {
          transform: "translate(0px, 0px)", // active:translate-x-[0px] active:translate-y-[0px]
          borderRadius: "120px", // active:rounded-2xl
          boxShadow: "none", // active:shadow-none
        },
      }}
      {...rest}
    >
      {text}
      {icon && <span>{icon}</span>}
    </Button>
  );
};

export default ThemeButton;
