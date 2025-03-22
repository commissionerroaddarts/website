import { Button } from "@mui/material";
import React from "react";

interface Prop {
  onClickEvent?: () => void;
  icon?: React.ReactNode;
}

const ThemeButton = ({ onClickEvent, icon }: Prop) => {
  return (
    <Button
      onClick={onClickEvent}
      variant="contained"
      sx={{
        background: "#8224E3",
        borderRadius: "100px",
        minWidth: "120px",
        padding: "0.8rem 1rem",
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
          }}
        >
          {" "}
          Search
        </span>
        {icon && <span>{icon}</span>}
      </div>
    </Button>
  );
};

export default ThemeButton;
