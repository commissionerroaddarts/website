"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const parseTimeToMinutes = (time: string): number => {
  if (!time) return 0;
  const [hours, minutes] = time
    .split(/[:\s]/)
    .filter(Boolean)
    .map((v) => parseInt(v, 10));
  const isPM = time.toLowerCase().includes("pm");
  const adjustedHours =
    isPM && hours !== 12 ? hours + 12 : hours === 12 ? 0 : hours;
  return adjustedHours * 60 + minutes;
};

const TimingsPopup: React.FC<TimingsPopupProps> = ({ timings }) => {
  const [open, setOpen] = useState(false);

  // Get today's day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const today = new Date().getDay();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const todayKey = days[today];

  // Function to check open/close status
  const checkOpenStatus = (day: string): string => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

    const openTime = parseTimeToMinutes(timings[day]?.open);
    const closeTime = parseTimeToMinutes(timings[day]?.close);

    // Handle overnight shifts (close time is before open time)
    if (closeTime < openTime) {
      return currentTime >= openTime || currentTime <= closeTime
        ? "Open"
        : "Closed";
    } else {
      return currentTime >= openTime && currentTime <= closeTime
        ? "Open"
        : "Closed";
    }
  };

  return (
    <div style={{ background: "#200C27", padding: "1rem" }}>
      {/* Trigger Button */}
      <div className="flex items-center space-x-2 justify-between">
        <Box
          display={{ xs: "block", md: "flex" }}
          justifyContent={{ md: "space-between" }}
          gap={1}
          alignItems="center"
        >
          <Image
            src="/images/icons/timings.svg"
            alt="Phone"
            width={30}
            height={30}
          />
          <span>Today: {checkOpenStatus(todayKey)}</span>
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
      </div>

      {/* Popup */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: "black" }}>
          Business Hours
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {days.map((day) => (
            <div
              key={day}
              className="flex justify-between text-black items-center py-1 border-b"
            >
              <span className="capitalize ">{day}</span>
              <span>
                {timings[day]?.open} - {timings[day]?.close}
              </span>
              <span
                className={`text-sm ${
                  checkOpenStatus(day) === "Open"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {checkOpenStatus(day)}
              </span>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimingsPopup;
