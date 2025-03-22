import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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

const SelectSearchDropDown = ({ options, label, value, onChange }: Props) => {
  return (
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
          }}
          {...params}
          label={label}
        />
      )}
    />
  );
};

export default SelectSearchDropDown;
