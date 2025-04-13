"use client";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/global/CustomInput";
import { Button } from "@mui/material";
import { useAppState } from "@/hooks/useAppState";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { baseUrl } from "@/constants/baseUrl";

const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  zip: yup.string().required("ZIP Code is required"),
});

export default function CheckoutForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useAppState();
  const { isLoggedIn, userDetails } = user;

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data: any) => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    // 1. Create payment method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: isLoggedIn
          ? userDetails?.firstname + " " + userDetails?.lastname
          : data.fullName,
        email: isLoggedIn ? userDetails?.email : data.email,
      },
    });

    if (error) return alert(error.message);

    // 2. Call API to create payment intent
    const res = await fetch(`${baseUrl}/subscription/create-payment-intent}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: 5000, // Replace with the amount in cents (e.g., $50.00 = 5000)
        currency: "usd", // Replace with your desired currency
      }),
    });

    const result = await res.json();
    if (result.error) return alert(result.error);

    // 3. Confirm payment
    if (result.clientSecret) {
      const confirm = await stripe.confirmCardPayment(result.clientSecret);
      if (confirm.error) {
        alert(confirm.error.message);
      } else {
        alert("Payment successful!");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-6 text-white w-full"
    >
      {!isLoggedIn ? (
        <BillingInfoSection control={control} errors={errors} />
      ) : (
        <div>
          <h1>
            Logged in as{" "}
            <span className="capitalize">
              {`${userDetails?.firstname} ${userDetails?.lastname}`}
            </span>
          </h1>
        </div>
      )}

      <h2 className="text-lg font-semibold pt-4">Payment Method</h2>
      <div className="flex flex-col gap-6 ">
        <CardElement
          options={{
            style: {
              base: {
                color: "#fff",
                fontSize: "16px",
                "::placeholder": { color: "#888" },
              },
              invalid: { color: "#f44336" },
            },
          }}
        />
      </div>

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
        Confirm & Pay
      </Button>
    </form>
  );
}

const BillingInfoSection = ({
  control,
  errors,
}: {
  control: any;
  errors: { [key: string]: { message?: string } };
}) => (
  <>
    <h2 className="text-lg font-semibold">Billing Information</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            border="1px solid white"
            borderRadiusPixels="10px"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Email Address"
            error={!!errors.email}
            helperText={errors.email?.message}
            border="1px solid white"
            borderRadiusPixels="10px"
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Phone Number"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            border="1px solid white"
            borderRadiusPixels="10px"
          />
        )}
      />
      <Controller
        name="zip"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Zip Code"
            error={!!errors.zip}
            helperText={errors.zip?.message}
            border="1px solid white"
            borderRadiusPixels="10px"
          />
        )}
      />
    </div>
  </>
);
