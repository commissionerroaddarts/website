"use client";
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Box, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppState } from "@/hooks/useAppState";

const CheckoutForm = () => {
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();

  // Fetch the selected plan from the Redux store
  const { plan } = useAppState();
  const { selectedPlan } = plan;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      // Handle payment processing here
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={4}
      padding={4}
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      {/* Plan Details Column */}
      <Box
        flex={1}
        padding={2}
        border={`1px solid ${theme.palette.divider}`}
        borderRadius={2}
      >
        <Typography variant="h5" gutterBottom>
          Selected Plan
        </Typography>
        <Divider />
        {selectedPlan ? (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Plan Name:</strong> {selectedPlan.name}
            </Typography>
            <Typography variant="body1">
              <strong>Price:</strong> {selectedPlan.price}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {selectedPlan.description}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" color="error">
            No plan selected.
          </Typography>
        )}
      </Box>

      {/* Checkout Form Column */}
      <Box
        flex={1}
        padding={2}
        border={`1px solid ${theme.palette.divider}`}
        borderRadius={2}
      >
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: theme.palette.text.primary,
                  "::placeholder": {
                    color: theme.palette.text.secondary,
                  },
                },
                invalid: {
                  color: theme.palette.error.main,
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Pay {selectedPlan?.price ?? "0.00"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
