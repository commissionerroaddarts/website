import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

export default function LoginForm() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(112.11deg, rgba(201, 201, 201, 0.8) 2.19%, rgba(196, 196, 196, 0.1) 95.99%)",
        borderRadius: "12px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "600px",
        margin: " 0 auto",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" align="center">
        Sign In
      </Typography>
      <Typography variant="body2" align="center">
        Set out participants and emails into master than
      </Typography>

      <TextField
        placeholder="Email"
        variant="outlined"
        InputProps={{ style: { color: "white", borderColor: "#575757" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#575757" },
            "&:hover fieldset": { borderColor: "#969696" },
          },
        }}
      />
      <TextField
        placeholder="Password"
        type="password"
        variant="outlined"
        InputProps={{ style: { color: "white", borderColor: "#575757" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#575757" },
            "&:hover fieldset": { borderColor: "#969696" },
          },
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          background: "#9B51E0",
          color: "white",
          padding: "10px 0",
          borderRadius: "20px",
        }}
      >
        Sign Up
      </Button>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<Google />}
        sx={{
          background: "white",
          color: "#969696",
          borderColor: "#575757",
          padding: "10px 0",
          borderRadius: "20px",
        }}
      >
        Continue with Google
      </Button>
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <span
          style={{ color: "#9B51E0", fontWeight: "bold", cursor: "pointer" }}
        >
          Sign In
        </span>
      </Typography>
    </Box>
  );
}
