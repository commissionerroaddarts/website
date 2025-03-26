import { TextField } from "@mui/material";
import { ComponentProps } from "react";

interface CustomInputProps extends ComponentProps<typeof TextField> {
  label: string;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helperText?: string;
}

// Reusable Input Component
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  multiline = false,
  rows = 1,
  error = false,
  helperText = "",
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      placeholder={label}
      variant="outlined"
      multiline={multiline}
      rows={multiline ? rows : 1}
      error={error}
      helperText={error ? helperText : ""}
      sx={{
        "& .MuiOutlinedInput-root": {
          // background: "#160C1866",
          background: " rgba(22, 12, 24, 0.4)",
          borderRadius: multiline ? "25px" : "50px",
          outline: "none",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "background: rgba(150, 150, 150, 1)",
        },
      }}
      {...rest} // Spread remaining props (e.g., value, onChange, etc.)
    />
  );
};

export default CustomInput;
