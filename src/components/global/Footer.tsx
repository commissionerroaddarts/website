import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      textAlign="center"
      py={2}
      sx={{
        background: "#15051B",
        mt: 12,
      }}
    >
      <Typography variant="body2">
        Copyright &copy; {new Date().getFullYear()} Road Dart | 45 B Road NY.
        USA | Tel: <a href="tel:007-123-456">007-123-456</a>
      </Typography>
    </Box>
  );
};

export default Footer;
