import { DateTime, Duration } from "luxon";

export function formatTimeInput(value: string) {
  // Remove any non-digits
  const digits = value.replace(/\D/g, "");

  if (digits.length < 3) {
    return digits;
  }

  let hours = parseInt(digits.slice(0, digits.length - 2), 10);
  let minutes = parseInt(digits.slice(-2), 10);

  if (isNaN(hours)) hours = 0;
  if (isNaN(minutes)) minutes = 0;
  if (minutes > 59) minutes = 59;
  if (hours > 23) hours = 23;

  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const formatDuration = (minutes: number) => {
  const dur = Duration.fromObject({ minutes })
    .shiftTo("hours", "minutes")
    .toObject();
  const hrs = Math.floor(dur.hours ?? 0);
  const mins = Math.round(dur.minutes ?? 0);

  let parts = [];
  if (hrs > 0) parts.push(`${hrs} hr${hrs !== 1 ? "s" : ""}`);
  if (mins > 0) parts.push(`${mins} min${mins !== 1 ? "s" : ""}`);
  return parts.join(" ");
};

export const getBusinessStatus = (open: string, close: string) => {
  const now = DateTime.local();
  let openTime = DateTime.fromFormat(open, "hh:mm a");
  let closeTime = DateTime.fromFormat(close, "hh:mm a");

  // Handle overnight shift (e.g., 6PM - 2AM)
  if (closeTime < openTime) {
    closeTime = closeTime.plus({ days: 1 }); // overnight: close tomorrow or if already opened
  }

  // Also align openTime to tomorrow if now is past both open and close
  if (now > closeTime && now > openTime) {
    openTime = openTime.plus({ days: 1 });
    closeTime = closeTime.plus({ days: 1 });
  }

  if (now >= openTime && now <= closeTime) {
    const minutesLeft = Math.round(closeTime.diff(now, "minutes").minutes);
    return {
      status: "Open",
      message: `Closes in ${formatDuration(minutesLeft)}`,
    };
  } else {
    const minutesUntilOpen = Math.round(openTime.diff(now, "minutes").minutes);
    return {
      status: "Closed",
      message: `Opens in ${formatDuration(minutesUntilOpen)}`,
    };
  }
};
