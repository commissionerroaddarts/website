import { Button } from "@mui/material";
import React from "react";
import { ButtonProps } from "../../types/buttonProps";

const ThemeOutlineButton = ({ onClickEvent, icon, text }: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      sx={{
        mt: 4,
        borderColor: "#fff",
        color: "#fff",
        borderRadius: "100px",
        minWidth: "120px",
        padding: "0.5rem 1.2rem",
      }}
    >
      {text}
    </Button>
  );
};

export default ThemeOutlineButton;
