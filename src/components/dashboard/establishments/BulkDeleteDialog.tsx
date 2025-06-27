"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  Chip,
} from "@mui/material";
import { Business } from "@/types/business";
import ThemeButton from "@/components/buttons/ThemeButton";
import { toast } from "react-toastify";
import { bulkDeleteBusinesses } from "@/services/businessService";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedBusinesses: Business[];
}

const BulkDeleteDialog = ({ open, onClose, selectedBusinesses }: Props) => {
  const handleApply = async () => {
    try {
      const selectedBusinessIds = selectedBusinesses.map((b) => b._id);
      const response = await bulkDeleteBusinesses(selectedBusinessIds);
      if (response.success) {
        toast.success("Businesses deleted successfully");
        onClose();
      } else {
        toast.error("Failed to delete businesses");
      }
    } catch (error) {
      console.error("Error deleting businesses:", error);
      toast.error("An error occurred while deleting businesses");
    }
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
      <DialogTitle className="bg-[#3e1349]">Bulk Delete Businesses</DialogTitle>
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
          text="Delete Selected Businesses"
          fontSize="0.8rem"
        />
      </DialogActions>
    </Dialog>
  );
};

export default BulkDeleteDialog;
