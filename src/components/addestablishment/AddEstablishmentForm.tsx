"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

export default function AddEstablishmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  return (
    <Box maxWidth="lg" mx="auto" p={4}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Add New Establishments
        </Typography>
        <Typography color="textSecondary">
          Fill in the details to add a new listing to the platform
        </Typography>
      </Box>

      <Box
        bgcolor="rgba(128, 0, 128, 0.7)"
        borderRadius={3}
        p={4}
        sx={{ backdropFilter: "blur(5px)" }}
      ></Box>
      {/* Step Indicator */}
      <Stepper activeStep={currentStep - 1} alternativeLabel sx={{ mb: 4 }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>

      {/* Form Content */}
      <Box>
        <Typography variant="h5" fontWeight="medium" textAlign="center" mb={4}>
          Basic Information
        </Typography>

        {/* Upload Buttons */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
          mb={4}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<Upload />}
            sx={{ textTransform: "none" }}
          >
            Upload Logo
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Upload />}
            sx={{ textTransform: "none" }}
          >
            Upload Media
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Upload />}
            sx={{ textTransform: "none" }}
          >
            Upload Video
          </Button>
        </Box>

        {/* Form Fields */}
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          <TextField
            variant="outlined"
            label="Business Name"
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />
          <TextField
            variant="outlined"
            label="Tagline"
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />
          <TextField
            variant="outlined"
            label="Phone Number"
            type="tel"
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />
          <TextField
            variant="outlined"
            label="Website"
            type="url"
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />
          <TextField
            variant="outlined"
            label="Short Description"
            multiline
            rows={4}
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "gray" } }}
          />
        </Box>

        {/* Next Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
            }
            sx={{ textTransform: "none", px: 4 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
