import React from "react";
import { deleteBusiness } from "@/services/businessService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import ThemeButton from "@/components/buttons/ThemeButton";

interface DeleteListingDialogProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  _id: string;
  openConfirm: boolean;
  setOpenConfirm: (open: boolean) => void;
}

const DeleteListingDialog = ({
  _id,
  loading,
  setLoading,
  openConfirm,
  setOpenConfirm,
}: Readonly<DeleteListingDialogProps>) => {
  const router = useRouter();
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteBusiness(_id);
      if (response.status === 200) {
        toast.success("Establishment deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting establishment:", error);
      toast.error("Failed to delete establishment");
    } finally {
      setLoading(false);
      setOpenConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
  };

  return (
    <Dialog
      open={openConfirm}
      onClose={handleCancelDelete}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      className="  backdrop-blur-sm relative"
    >
      <DialogContent
        sx={{
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
        className="flex flex-col gap-3 "
      >
        <Typography id="confirm-dialog-title" variant="h4">
          Confirm Deletion
        </Typography>
        <DialogContentText id="confirm-dialog-description">
          Are you sure you want to delete this establishment? This action cannot
          be undone.
        </DialogContentText>
        <Box className="flex gap-2 justify-start ">
          <ThemeButton
            onClick={handleConfirmDelete}
            disabled={loading}
            text={loading ? "Deleting..." : "Delete"}
            backgroundColor="red"
          />
          <ThemeButton
            onClick={handleCancelDelete}
            disabled={loading}
            text=" Cancel"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteListingDialog;
