import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box textAlign="center" py={4}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Road Darts. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
