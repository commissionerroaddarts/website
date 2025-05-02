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
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
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
        listbox: {
          "& .MuiAutocomplete-option": {
            fontFamily: "Lexend",
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
  ...rest
}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: "100%", "::placeholder": { color: "white" } }}
          onScroll={onScroll}
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
          renderInput={(params) => (
            <TextField
              name={name}
              variant="outlined"
              value={value}
              {...rest}
              error={error}
              sx={{
                background: "#160C1866",
                color: "white",
                borderRadius: "100px",
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white", width: "100%" },
                "& .MuiInputBase-input::placeholder": { fontFamily: "Lexend" },
              }}
              {...params}
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
      </div>
    </ThemeProvider>
  );
};

export default SelectSearchDropDown;
