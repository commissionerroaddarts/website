import { useSearchParams } from "next/navigation";
import React, { ReactNode, useState } from "react";
// import ThemeButton from "@/components/buttons/ThemeButton";
import { Box, Dialog, DialogContent } from "@mui/material";
import CloseIconButton from "@/components/global/CloseIconButton";
// import { verifyEmail } from "@/services/authService";

const EmailVerificationDialogs = () => {
  const search = useSearchParams();
  const emailverification = search.get("emailverification");

  return (
    <>
      {emailverification === "success" && (
        <VerificationDialog>
          <h2>Email Verification Successful</h2>
          <p>Your email has been successfully verified.</p>
        </VerificationDialog>
      )}
      {emailverification === "failed" && (
        <VerificationDialog>
          <Box className="flex flex-col items-center justify-center p-4 gap-3">
            <h2>Email Verification Failed</h2>
            <p>There was an error verifying your email. Please try again.</p>
            {/* <ThemeButton text="Resend Verification Email" onClick={() => {}} /> */}
          </Box>
        </VerificationDialog>
      )}
    </>
  );
};

const VerificationDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      sx={{ zIndex: 9999 }}
      className="  backdrop-blur-sm relative"
    >
      <DialogContent
        sx={{
          textAlign: "center",
          p: 4,
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
      >
        <CloseIconButton onClick={() => setOpen(false)} />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationDialogs;
