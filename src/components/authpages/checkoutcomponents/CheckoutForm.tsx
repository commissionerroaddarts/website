// components/CheckoutForm.tsx
"use client";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/global/CustomInput";
import { Button } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import Image from "next/image";
import { useAppState } from "@/hooks/useAppState";

// Card Number Formatter
const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16); // Only digits, max 16
  const chunks = digits.match(/.{1,4}/g) || [];
  return chunks.join(" - ");
};

const formatCVV = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 4); // Max 4 digits
};

export const formatMonth = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 2);
  if (!digits) return "";

  const num = parseInt(digits, 10);
  if (isNaN(num)) return "";

  if (num <= 0) return "01";
  if (num > 12) return "12";

  return digits.length === 1 ? `0${num}` : digits;
};

export const formatYear = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 2); // 2-digit year (e.g., 24)
};

const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  zip: yup.string().required("ZIP Code is required"),
  cardNumber: yup.string().required("Card Number is required"),
  cvv: yup.string().required("CVV is required"),
  expiryMonth: yup.string().required("Month is required"),
  expiryYear: yup.string().required("Year is required"),
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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  gap-3 p-6  text-white"
    >
      {isLoggedIn ? (
        <p>{userDetails?.firstname}</p>
      ) : (
        <BillingInfoSection control={control} errors={errors} />
      )}

      <h2 className="text-lg font-semibold pt-4">Payment Method</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-md w-full text-white">
            Card Number <br />{" "}
            <span className="text-xs text-gray-400">
              Enter 16 digits card number
            </span>
          </p>
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                icon={
                  <Image
                    src="/images/icons/mastercard.svg"
                    alt="Visa"
                    width={30}
                    height={30}
                  />
                } // Mastercard red color
                iconPosition="start"
                border="1px solid white !important"
                borderRadiusPixels="10px"
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  field.onChange(formatted);
                }}
                label="4242 - 4242 - 4242 - 4242"
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-md w-full !text-white sm:w-[40%]">
            CVV / CVC <br />{" "}
            <span className="text-xs text-gray-400">
              3 digit or 4 digit security code
            </span>
          </p>
          <Controller
            name="cvv"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="054"
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
                icon={<Dashboard fontSize="medium" htmlColor="white" />}
                iconPosition="end"
                onChange={(e) => {
                  const formatted = formatCVV(e.target.value);
                  field.onChange(formatted);
                }}
                border="1px solid white !important"
                borderRadiusPixels="10px"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-center justify-between ">
          <p className="text-md w-full !text-white sm:w-[40%]">
            Expiry Date <br />{" "}
            <span className="text-xs text-gray-400">
              Enter expiration date of the card
            </span>
          </p>
          <div className="grid grid-cols-3 place-items-center">
            <Controller
              name="expiryMonth"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="MM"
                  error={!!errors.expiryMonth}
                  helperText={errors.expiryMonth?.message}
                  onChange={(e) => {
                    const formatted = formatMonth(e.target.value);
                    field.onChange(formatted);
                  }}
                  border="1px solid white !important"
                  borderRadiusPixels="10px"
                />
              )}
            />
            <p>/</p>
            <Controller
              name="expiryYear"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="YY"
                  error={!!errors.expiryYear}
                  helperText={errors.expiryYear?.message}
                  onChange={(e) => {
                    const formatted = formatYear(e.target.value);
                    field.onChange(formatted);
                  }}
                  border="1px solid white !important"
                  borderRadiusPixels="10px"
                />
              )}
            />
          </div>
        </div>
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
  errors: {
    [key: string]: {
      message?: string;
    };
  };
}) => {
  return (
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
              border="1px solid white !important"
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
              border="1px solid white !important"
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
              border="1px solid white !important"
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
              border="1px solid white !important"
              borderRadiusPixels="10px"
            />
          )}
        />
      </div>
    </>
  );
};
