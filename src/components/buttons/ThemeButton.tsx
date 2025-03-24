import { Button } from "@mui/material";
import React from "react";
import { ButtonProps } from "../../types/buttonProps";

const ThemeButton = ({ onClickEvent, icon, text }: ButtonProps) => {
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
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="text-center"
          style={{
            fontSize: "16px",
            color: "white",
          }}
        >
          {text}
        </span>
        {icon && <span>{icon}</span>}
      </div>
    </Button>
  );
};

export default ThemeButton;
