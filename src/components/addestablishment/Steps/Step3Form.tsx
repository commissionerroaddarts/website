"use client";

import { Box, Grid2, Typography } from "@mui/material";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import ThemeButton from "@/components/buttons/ThemeButton";
import { FieldErrorTimings } from "@/types/business";

const daysOfWeek = [
  { label: "Monday", value: "mon" },
  { label: "Tuesday", value: "tue" },
  { label: "Wednesday", value: "wed" },
  { label: "Thursday", value: "thu" },
  { label: "Friday", value: "fri" },
  { label: "Saturday", value: "sat" },
  { label: "Sunday", value: "sun" },
];

const timePickerStyles = {
  sx: {
    background: "rgba(22, 12, 24, 0.4)",
    borderRadius: "50px",
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(150, 150, 150, 1)",
    },
    "& .MuiPickersOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSvgIcon-root": {
      color: "#FFFFFF", // White clock icon
    },
  },
};

export default function Step3Form({
  closedDays,
  setClosedDays,
}: {
  readonly closedDays: Record<string, boolean>;
  readonly setClosedDays: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const timings = getValues("timings");

  const [sameHours, setSameHours] = useState(false);
  const [allDaysHours, setAllDaysHours] = useState({ open: "", close: "" });
  const handleSameHoursApply = () => {
    daysOfWeek.forEach((day) => {
      setValue(`timings.${day.value}.open`, allDaysHours.open);
      setValue(`timings.${day.value}.close`, allDaysHours.close);
    });
  };

  const toggleDayClosed = (dayKey: string) => {
    setClosedDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
    if (!closedDays[dayKey]) {
      setValue(`timings.${dayKey}.open`, "closed");
      setValue(`timings.${dayKey}.close`, "closed");
    }
  };

  useEffect(() => {
    if (sameHours) {
      daysOfWeek.forEach((day) => {
        setValue(`timings.${day.value}.open`, allDaysHours.open);
        setValue(`timings.${day.value}.close`, allDaysHours.close);
      });
    }
  }, [sameHours, allDaysHours]);

  return (
    <Box my={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box className="flex gap-2 flex-col">
          <Typography variant="h5">Business Hours</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              width: { xs: "100%", md: "60%" },
            }}
          >
            Select opening and closing times for each day. If your business is
            closed on a specific day, leave both fields empty or mark it as
            "Closed" using the toggle/button.
          </Typography>
        </Box>
        <ThemeButton
          onClickEvent={() => {
            setSameHours(!sameHours);
            if (!sameHours) handleSameHoursApply();
          }}
          text={sameHours ? "Set Individually" : "Same for All Days"}
        />
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {sameHours ? (
          <Box display="flex" gap={2} mb={3}>
            <TimePicker
              label="Opening Time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={
                allDaysHours.open ? dayjs(allDaysHours.open, "hh:mm A") : null
              }
              onChange={(newValue) =>
                setAllDaysHours({
                  ...allDaysHours,
                  open: newValue ? newValue.format("hh:mm A") : "",
                })
              }
              slotProps={{ textField: timePickerStyles }}
            />

            <TimePicker
              label="Closing Time"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={
                allDaysHours.close ? dayjs(allDaysHours.close, "hh:mm A") : null
              }
              onChange={(newValue) =>
                setAllDaysHours({
                  ...allDaysHours,
                  close: newValue ? newValue.format("hh:mm A") : "",
                })
              }
              slotProps={{ textField: timePickerStyles }}
            />
          </Box>
        ) : (
          <Grid2 container spacing={2}>
            {daysOfWeek.map((day) => {
              type DayKey =
                | "mon"
                | "tue"
                | "wed"
                | "thu"
                | "fri"
                | "sat"
                | "sun";
              const fieldErrors = errors as FieldErrors<FieldErrorTimings>;
              const dayKey = day.value as DayKey;
              const errorOpen = fieldErrors.timings?.[dayKey]?.open;
              const errorClose = fieldErrors.timings?.[dayKey]?.close;

              return (
                <Grid2 size={{ xs: 12 }} key={day.value}>
                  <Box className="flex gap-3 items-center mb-3">
                    <Typography color="textSecondary" gutterBottom>
                      {day.label}
                    </Typography>
                    <ThemeButton
                      text={closedDays[day.value] ? "Closed" : "Open"}
                      onClickEvent={() => toggleDayClosed(day.value)}
                      style={{
                        backgroundColor: closedDays[day.value]
                          ? "#d32f2f"
                          : "#388e3c",
                        color: "#fff",
                        minWidth: 80,
                        padding: "6px 16px",
                      }}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box className="flex gap-2 flex-col max-w-[45%]">
                      <Controller
                        name={`timings.${day.value}.open`}
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            label="Open"
                            {...field}
                            disabled={closedDays[day.value]} // Disable if closed
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                              seconds: renderTimeViewClock,
                            }}
                            value={
                              field.value ? dayjs(field.value, "hh:mm A") : null
                            }
                            onChange={(newValue) =>
                              setValue(
                                `timings.${day.value}.open`,
                                newValue ? newValue.format("hh:mm A") : ""
                              )
                            }
                            slotProps={{
                              textField: {
                                ...timePickerStyles,
                                error: !!errorOpen,
                              },
                            }}
                          />
                        )}
                      />
                      {errorOpen?.message && (
                        <Typography color="error" variant="body2">
                          {errorOpen.message}
                        </Typography>
                      )}
                    </Box>

                    <Box className="flex gap-2 flex-col max-w-[45%]">
                      <Controller
                        name={`timings.${day.value}.close`}
                        control={control}
                        render={({ field }) => (
                          <TimePicker
                            label="Close"
                            {...field}
                            disabled={closedDays[day.value]} // Disable if closed
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                              seconds: renderTimeViewClock,
                            }}
                            value={
                              field.value ? dayjs(field.value, "hh:mm A") : null
                            }
                            onChange={(newValue) =>
                              setValue(
                                `timings.${day.value}.close`,
                                newValue ? newValue.format("hh:mm A") : ""
                              )
                            }
                            slotProps={{
                              textField: {
                                ...timePickerStyles,
                                error: !!errorClose,
                              },
                            }}
                          />
                        )}
                      />
                      {errorClose?.message && (
                        <Typography color="error" variant="body2">
                          {errorClose.message}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </LocalizationProvider>
    </Box>
  );
}
