"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, Box } from "@mui/material";
import { Clock } from "lucide-react";
import CloseIconButton from "@/components/global/CloseIconButton";
import { getBusinessStatus } from "@/utils/formatTimeInput";

// Helper to convert "12:37 PM" to minutes since midnight
interface Timings {
  [key: string]: {
    open: string;
    close: string;
  };
}

interface TimingsPopupProps {
  timings: Timings;
}

const TimingsPopup: React.FC<TimingsPopupProps> = ({ timings }) => {
  const [open, setOpen] = useState(false);

  // Get today's day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const today = new Date().getDay();
  const days = [
    {
      label: "Sunday",
      value: "sun",
    },
    { label: "Monday", value: "mon" },
    { label: "Tuesday", value: "tue" },
    { label: "Wednesday", value: "wed" },
    { label: "Thursday", value: "thu" },
    { label: "Friday", value: "fri" },
    { label: "Saturday", value: "sat" },
  ];
  const todayKey = days.filter((day) => day.value === days[today].value)[0]
    .value;

  const { status, message } = getBusinessStatus(
    timings[todayKey]?.open,
    timings[todayKey]?.close
  );

  return (
    <div style={{ background: "#200C27", padding: "1rem" }}>
      {/* Trigger Button */}
      <div className="flex items-center space-x-2 justify-between">
        <Box
          display="flex"
          justifyContent={{ md: "space-between" }}
          gap={1}
          alignItems="center"
        >
          <Clock color="white" size={25} />
          <div className="flex flex-col ">
            <span>
              Today: {status}
              {timings[todayKey]?.open === "closed"
                ? " (Closed)"
                : ` (${timings[todayKey]?.open} - ${timings[todayKey]?.close})`}
            </span>
            <span className="text-xs">{message}</span>
          </div>
        </Box>
        <Box
          sx={{
            background: "#5B1D71",
            padding: "0.2rem 0.5rem",
            borderRadius: "4rem",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <button
            className="text-xs text-white cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Expand
          </button>
        </Box>

        <OpeningHoursDialog
          open={open}
          onClose={() => setOpen(false)}
          days={days}
          timings={timings}
        />
      </div>
    </div>
  );
};

interface OpeningHoursDialogProps {
  open: boolean;
  onClose: () => void;
  days: {
    label: string;
    value: string;
  }[];
  timings: Timings;
}

function OpeningHoursDialog({
  open,
  onClose,
  days,
  timings,
}: Readonly<OpeningHoursDialogProps>) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            maxWidth: "36rem",
            width: "100%",
            margin: "16px",
            borderRadius: "1.5rem",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          padding: 0,
          background:
            "linear-gradient(148.71deg, #200C27 2.12%, #6D3880 98.73%)",
        }}
      >
        <CloseIconButton onClick={onClose} />
        <div className="relative z-10 p-10 md:pt-16 md:pb-10">
          <h1 className="text-center font-cursive text-white text-2xl md:text-4xl mb-5">
            Opening Hours
          </h1>

          <div className="space-y-2">
            {days.map((day) => (
              <div
                key={day.value}
                className="flex justify-between items-center"
              >
                <span className="text-white text-sm md:text-xl font-sans">
                  {day.label}
                </span>
                <span className="text-white text-sm md:text-xl font-sans">
                  {timings[day.value]?.open === "closed"
                    ? "Closed"
                    : `${timings[day.value]?.open} - ${
                        timings[day.value]?.close
                      }`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TimingsPopup;
