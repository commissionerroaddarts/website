import { Button } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      <h2 className="text-lg font-semibold pt-4">Payment Method</h2>

      <PaymentElement />

      <Button
        type="submit"
        fullWidth
        sx={{
          borderRadius: "30px",
          background: "linear-gradient(to right, #8428F2, #C45EEE)",
          mt: 3,
          py: 1.5,
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {isLoading ? "Processing…" : "Confirm & Pay"}
      </Button>
    </>
  );
};

export default PaymentForm;
