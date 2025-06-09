import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Filter {
  label: string;
  value: string;
  id?: number;
}

interface Props {
  options: Filter[];
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScroll?: React.UIEventHandler<HTMLUListElement>;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: string
  ) => void;
  name?: string;
  error?: boolean;
  helperText?: string;
}

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          margin: "0.5rem 0",
          background: " rgba(21, 5, 27, 1)",
          borderRadius: "23px",
        },
        noOptions: {
          color: "white", // 🔥 this changes "No options" text to white
          fontFamily: "Lexend",
        },
        listbox: {
          "& .MuiAutocomplete-option": {
            fontFamily: "Lexend",
            zIndex: 1000,
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          },
        },
        endAdornment: {
          "& .MuiAutocomplete-clearIndicator": {
            color: "white",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "white",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Lexend",
          "&.Mui-focused": {
            color: "white",
          },
        },
      },
    },
  },
});

const SelectSearchDropDown = ({
  options,
  label,
  value,
  onChange,
  onScroll,
  name,
  error,
  helperText,
  onInputChange,
  ...rest
}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: "100%" }}
        slotProps={{
          listbox: {
            onScroll,
          },
        }}
        value={options.find((option) => option.value === value) ?? null}
        onChange={(event, newValue) => {
          if (newValue) {
            onChange({
              target: {
                name: name ?? "",
                value: newValue.value,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        onInputChange={(e, value, reason) => {
          console.log("Local input change", value, reason);
          onInputChange?.(e, value, reason); // call parent if available
        }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            variant="outlined"
            error={error}
            sx={{
              background: "#160C1866",
              borderRadius: "100px",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": {
                color: "white",
                width: "100%",
                fontFamily: "Lexend",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                fontFamily: "Lexend",
              },
            }}
            label={label}
          />
        )}
      />

      {helperText && (
        <p
          style={{
            marginTop: "3px",
            color: error ? "#d32f2f" : "white",
            fontFamily: "Lexend",
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: "1.5rem",
            marginInline: "14px",
          }}
        >
          {helperText}
        </p>
      )}
    </ThemeProvider>
  );
};

export default SelectSearchDropDown;
