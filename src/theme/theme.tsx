"use client";

import { createTheme } from "@mui/material/styles";
import { Lexend } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const lexand = Lexend({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#200C27",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});

export default theme;
