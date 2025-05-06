import { TextField, InputAdornment, IconButton } from "@mui/material";
import { ComponentProps, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps extends ComponentProps<typeof TextField> {
  label: string;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode; // Optional icon
  iconPosition?: "start" | "end"; // Icon position
  border?: string; // Optional custom border style
  borderRadiusPixels?: string; // Optional custom border radius
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  multiline = false,
  rows = 1,
  error = false,
  helperText = "",
  icon,
  iconPosition = "start",
  border,
  borderRadiusPixels,
  onChange,
  type = "text",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordField = type === "password";

  return (
    <TextField
      fullWidth
      onChange={onChange}
      placeholder={label}
      variant="outlined"
      multiline={multiline}
      rows={multiline ? rows : 1}
      error={error}
      helperText={error ? helperText : ""}
      type={isPasswordField && showPassword ? "text" : type}
      slotProps={{
        input: {
          [iconPosition === "start" ? "startAdornment" : "endAdornment"]:
            icon ? (
              <InputAdornment position={iconPosition}>{icon}</InputAdornment>
            ) : undefined,
          endAdornment: isPasswordField ? (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? (
                  <EyeOff color="white" />
                ) : (
                  <Eye color="white" />
                )}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          background: "rgba(22, 12, 24, 0.4)",
          borderRadius: multiline
            ? borderRadiusPixels ?? "25px"
            : borderRadiusPixels ?? "50px",
          outline: "none",
          border: border ?? "none",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "rgba(150, 150, 150, 1)",
        },
      }}
      {...rest}
    />
  );
};

export default CustomInput;
