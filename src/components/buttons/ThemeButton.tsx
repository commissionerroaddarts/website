import React from "react";
import { Button, ButtonProps as MuiButtonProps } from "@mui/material";

// Extend MUI's ButtonProps to make the component more reusable
interface ThemeButtonProps extends MuiButtonProps {
  onClickEvent?: () => void;
  icon?: React.ReactNode;
  text: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  onClickEvent,
  icon,
  text,
  ...rest
}) => {
  return (
    <Button
      onClick={onClickEvent}
      variant="contained"
      sx={{
        background: "#8224E3",
        borderRadius: "100px",
        minWidth: "120px",
        padding: "0.8rem 2rem",
        textTransform: "capitalize",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: icon ? "8px" : "0",
        color: "white",
      }}
      {...rest}
    >
      {text}
      {icon && <span>{icon}</span>}
    </Button>
  );
};

export default ThemeButton;
