import { TextField } from "@mui/material";

interface CustomInputProps {
  label: string;
  multiline?: boolean;
  rows?: number;
}

// Reusable Input Component
const CustomInput = ({
  label,
  multiline = false,
  rows = 1,
}: CustomInputProps) => {
  return (
    <TextField
      fullWidth
      placeholder={label}
      variant="outlined"
      multiline={multiline}
      rows={multiline ? rows : 1}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: multiline ? "25px" : "50px",
          border: "none",
          outline: "none",
          // "& .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "white",
          // },
        },
      }}
    />
  );
};

export default CustomInput;
