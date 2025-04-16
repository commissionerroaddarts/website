"use client";

import { useRouter } from "next/navigation";
import RatingForm from "@/components/ratings/RatingForm";
import PastReviews from "@/components/ratings/PastReviews";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RatingModal({ id }: { readonly id: string }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: { bgcolor: "purple.900", color: "white" },
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Rating Modal</span>
          <IconButton
            onClick={handleClose}
            aria-label="Close modal"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <RatingForm id={id} />
        <PastReviews id={id} />
      </DialogContent>
    </Dialog>
  );
}
