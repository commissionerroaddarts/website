"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppState } from "@/hooks/useAppState";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import BillingInfoSection from "./BillingInfoSection";
import { toast } from "react-toastify";
import { useState } from "react";
import PaymentForm from "./PaymentFormSection";
import { phoneSchema } from "@/yupSchemas/phoneSchema";

const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: phoneSchema,
  zip: yup.string().required("ZIP Code is required"),
});

const CheckoutForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAppState();
  const { isLoggedIn, userDetails } = user;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    if (!stripe || !elements) {
      console.warn("Stripe.js has not yet loaded.");
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/return`,
        // receipt_email: email,
      },
    });

    if (result.error) {
      toast.error(result.error.message + "");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-6 text-white w-full"
    >
      {isLoggedIn ? (
        <div>
          <h1>
            Logged in as{" "}
            <span className="capitalize">
              {`${userDetails?.firstname} ${userDetails?.lastname}`}
            </span>
          </h1>
        </div>
      ) : (
        <BillingInfoSection control={control} errors={errors} />
      )}

      {/* PAYMENT FORM SECTION */}
      <PaymentForm isLoading={isLoading} />
    </form>
  );
};

export default CheckoutForm;
