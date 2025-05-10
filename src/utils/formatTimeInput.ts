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
