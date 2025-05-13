"use client";
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import { useAppState } from "@/hooks/useAppState";

const CheckoutSummary = () => {
  const { plan } = useAppState(); // Assuming you have a plan object in your Redux store
  const { selectedPlan, promoCode } = plan; // Get the selected plan from Redux store
  const isYearly = selectedPlan?.billingCycle === "yearly";
  const price = isYearly
    ? selectedPlan?.prices?.yearly?.amount
    : selectedPlan?.prices?.monthly?.amount;
  return (
    <Box
      className="w-full bg-[#1f0b2e] relative text-white rounded-2xl p-4 space-y-5 shadow-lg mx-auto"
      sx={{
        "&:before": {
          content: '""',
          position: "absolute",
          top: "75%",
          left: "-20px",
          right: 0,
          bottom: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "rgba(32, 12, 39, 1)",
          //   backgroundColor: "white",
          zIndex: 10,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: "75%",
          right: 0,
          left: "93%",
          bottom: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: " rgba(32, 12, 39, 1)",
          // backgroundColor: "white",
          zIndex: 10,
        },
      }}
    >
      {/* Card Section */}
      <Box className="bg-[#e7dbfd] max-w-[300px] min-h-[400px] mx-auto flex flex-col justify-between -mt-20  text-black rounded-lg p-4">
        <div className="w-full">
          <Box className="flex justify-between items-center">
            <Image
              src="/images/icons/credit-card-chip.png"
              alt="Visa"
              width={70}
              height={70}
              style={{
                transform: "rotate(90deg)",
              }}
            />

            <Image
              src="/images/icons/signal.png"
              alt="Visa"
              width={70}
              height={70}
              style={{
                transform: "rotate(-90deg)",
              }}
            />
          </Box>
          <Box className="mt-6 px-3">
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ fontSize: "2rem", color: "black" }}
            >
              John Joe
            </Typography>
            <Typography
              variant="body2"
              className="tracking-widest"
              sx={{ fontSize: "1.8rem", color: "black" }}
            >
              **** **** **** 3456
            </Typography>
          </Box>
        </div>
        <Box className="flex justify-between items-center mt-4">
          <Typography
            variant="body2"
            sx={{ fontSize: "1.8rem", color: "black" }}
          >
            09/25
          </Typography>
          <div className="flex flex-col items-center justify-center gap-1">
            <Image
              src="/images/icons/mastercard.svg"
              alt="Visa"
              width={70}
              height={70}
            />
            <Typography
              variant="body2"
              sx={{ fontSize: "0.7rem", color: "black" }}
            >
              Mastercard
            </Typography>
          </div>
        </Box>
      </Box>

      {/* Order Info */}
      <Box className="space-y-4 text-md px-4 mb-5">
        <Box className="flex justify-between">
          <Typography className="text-gray-400">Plan</Typography>
          <Typography className="font-semibold capitalize">
            {selectedPlan?.name}
          </Typography>
        </Box>
        {promoCode !== "" && (
          <Box className="flex justify-between">
            <Typography className="text-gray-400">Promo Code</Typography>
            <Typography className="font-semibold">{promoCode}</Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: "white", borderStyle: "dashed" }} />

      {/* Payment Info */}
      <Box className="flex pt-6 pb-2 mt-6 justify-between items-center">
        <Box>
          <Typography className="text-sm text-gray-400">
            You have to pay
          </Typography>
          <Typography
            className=" font-bold tracking-wide"
            sx={{ fontSize: "2rem", color: "white" }}
          >
            {price ? price.toFixed(2) : "0.00"}{" "}
            <span
              className="font-normal uppercase"
              style={{ fontSize: "1rem", textTransform: "uppercase" }}
            >
              {selectedPlan?.currency}
            </span>
          </Typography>
        </Box>
        <Image
          src="/images/icons/price-tag.svg"
          alt="Price Tag"
          width={25}
          height={25}
        />
      </Box>
    </Box>
  );
};

export default CheckoutSummary;
