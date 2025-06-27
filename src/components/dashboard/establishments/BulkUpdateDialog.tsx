"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { Business } from "@/types/business";
import { useState } from "react";
import SelectSearchDropDown from "@/components/global/SelectSearchDropDown";
import ThemeButton from "@/components/buttons/ThemeButton";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedBusinesses: Business[];
  onSubmit: (payload: { id: string; data: any }[]) => void;
}

const BulkUpdateDialog = ({
  open,
  onClose,
  selectedBusinesses,
  onSubmit,
}: Props) => {
  const [status, setStatus] = useState("");
  const [validationStatus, setValidationStatus] = useState("");

  const handleApply = () => {
    const payload = selectedBusinesses.map((b) => ({
      id: b._id,
      data: {
        ...(status && { status }),
        ...(validationStatus && { validation: { status: validationStatus } }),
      },
    }));
    onSubmit(payload);
    setStatus("");
    setValidationStatus("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            maxWidth: "36rem",
            width: "100%",
            margin: "16px",
            borderRadius: "1.5rem",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          },
        },
      }}
    >
      <DialogTitle className="bg-[#3e1349]">Bulk Update Businesses</DialogTitle>
      <DialogContent dividers className="bg-[#3a2a3e]">
        <Typography variant="subtitle1" gutterBottom>
          Selected Businesses:
        </Typography>
        <List dense className="grid grid-cols-3 gap-2">
          {selectedBusinesses.map((b) => (
            <ListItem key={b._id} className="!p-0">
              <Chip
                label={b.name}
                sx={{
                  backgroundColor: "#7b1fa2",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "0 8px",
                  fontSize: "0.8rem",
                }}
              />
            </ListItem>
          ))}
        </List>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <SelectSearchDropDown
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Pending", value: "pending" },
            ]}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Validation Status</InputLabel>
          <SelectSearchDropDown
            label="Validation Status"
            value={validationStatus}
            onChange={(e) => setValidationStatus(e.target.value)}
            options={[
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
              { label: "Pending", value: "pending" },
            ]}
          />
        </FormControl>
      </DialogContent>

      <DialogActions className="bg-[#3e1349]">
        <ThemeButton
          onClick={onClose}
          text=" Cancel"
          backgroundColor="#c62828"
          fontSize="0.8rem"
        />
        <ThemeButton
          onClick={handleApply}
          text=" Apply Changes"
          fontSize="0.8rem"
        />
      </DialogActions>
    </Dialog>
  );
};

export default BulkUpdateDialog;
