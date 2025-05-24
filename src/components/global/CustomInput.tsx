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

  const formatPhone = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Strip leading '1' if present (country code)
    const normalized = digits.startsWith("1") ? digits.slice(1) : digits;

    // Format only if we have digits to format
    if (normalized.length === 0) return "";

    if (normalized.length <= 3) {
      return `(${normalized}`;
    } else if (normalized.length <= 6) {
      return `(${normalized.slice(0, 3)}) ${normalized.slice(3)}`;
    } else {
      return `(${normalized.slice(0, 3)}) ${normalized.slice(
        3,
        6
      )}-${normalized.slice(6, 10)}`;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    if (isPhoneField) {
      value = formatPhone(value);
      // Create a synthetic event for controlled forms
      event.target.value = value;
    }

    onChange?.(event);
  };

  const isPasswordField = type === "password";
  const isPhoneField = type === "tel" || label.toLowerCase().includes("phone");

  return (
    <TextField
      fullWidth
      onChange={handleInputChange}
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
          "&.Mui-disabled": {
            color: "#f0f0f0",
            WebkitTextFillColor: "#a0a0a0",
          },
        },
        "& .MuiInputBase-input::placeholder": {
          color: "rgba(150, 150, 150, 1)",
        },
        "& .Mui-disabled .MuiInputBase-input": {
          color: "#a0a0a0",
          WebkitTextFillColor: "#a0a0a0",
        },
      }}
      {...rest}
    />
  );
};

export default CustomInput;
