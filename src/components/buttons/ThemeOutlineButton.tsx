import { Button } from "@mui/material";
import React from "react";
import { ButtonProps } from "@/types/buttonProps";

const ThemeOutlineButton = ({
  onClickEvent,
  icon,
  text,
  applyMargin,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      onClick={onClickEvent}
      variant="outlined"
      sx={{
        mt: applyMargin ? 4 : 0,
        borderColor: "#fff",
        color: "#fff",
        borderRadius: "100px",
        minWidth: "120px",
        padding: "0.8rem 2rem",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
      {...rest}
    >
      {text}
      {icon && <span>{icon}</span>}
    </Button>
  );
};

export default ThemeOutlineButton;
