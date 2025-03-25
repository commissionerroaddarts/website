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
}

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#160C1866", // Change dropdown menu background color here
        },
        listbox: {
          "& .MuiAutocomplete-option": {
            fontFamily: "Lexend", // Change dropdown menu text font here
            color: "white", // Change dropdown menu text color here
            "&:hover": {
              backgroundColor: "#333", // Change dropdown menu text background color on hover here
            },
          },
        },
        endAdornment: {
          "& .MuiAutocomplete-clearIndicator": {
            color: "white", // Change cross icon color here
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "white", // Change dropdown icon color here
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Lexend", // Change placeholder font here
          "&.Mui-focused": {
            color: "white", // Change active label color here
          },
        },
      },
    },
  },
});

const SelectSearchDropDown = ({ options, label, value, onChange }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: "100%", "::placeholder": { color: "white" } }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            value={value}
            onChange={onChange}
            sx={{
              background: "#160C1866",
              color: "white",
              borderRadius: "100px",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiInputLabel-root": { color: "white" }, // Change label color here
              "& .MuiInputBase-input": { color: "white" }, // Change input text color here
              "& .MuiInputBase-input::placeholder": { fontFamily: "Lexend" }, // Change placeholder font here
            }}
            {...params}
            label={label}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default SelectSearchDropDown;
