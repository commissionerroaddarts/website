"use client";
import React from "react";
import dynamic from "next/dynamic";
const EstablishmentMapLocation = dynamic(
  () => import("@/components/modals/EstablishmentMapLocation")
);
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { Location } from "@/types/business";
import CloseIconButton from "@/components/global/CloseIconButton";

interface BusinessMapPopupProps {
  handleMapClose: () => void;
  openMap: boolean;
  location: Location | null;
}

const BusinessMapPopup = ({
  handleMapClose,
  openMap,
  location,
}: BusinessMapPopupProps) => {
  return (
    <Dialog open={openMap} onClose={handleMapClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box className=" absolute top-1 right-1 md:top-5 md:right-5 z-10">
          <CloseIconButton onClick={handleMapClose} />
        </Box>
        <EstablishmentMapLocation location={location || {}} />
      </DialogContent>
    </Dialog>
  );
};

export default BusinessMapPopup;
