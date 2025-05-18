"use client";

import { Box, Grid2, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import ThemeButton from "@/components/buttons/ThemeButton";

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
  textField: {
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
  },
};

export default function Step3Form() {
  const { control, setValue, getValues } = useFormContext();

  const timings = getValues("timings");
  console.log(timings);
  const [sameHours, setSameHours] = useState(false);
  const [allDaysHours, setAllDaysHours] = useState({ open: "", close: "" });
  const handleSameHoursApply = () => {
    daysOfWeek.forEach((day) => {
      setValue(`timings.${day.value}.open`, allDaysHours.open);
      setValue(`timings.${day.value}.close`, allDaysHours.close);
    });
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
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Business Hours & Pricing Details
      </Typography>

      {/* Business Hours */}
      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Business Hours</Typography>
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
                label="With Time Clock"
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
                slotProps={timePickerStyles}
              />

              <TimePicker
                label="Closing Time"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={
                  allDaysHours.close
                    ? dayjs(allDaysHours.close, "hh:mm A")
                    : null
                }
                onChange={(newValue) =>
                  setAllDaysHours({
                    ...allDaysHours,
                    close: newValue ? newValue.format("hh:mm A") : "",
                  })
                }
                slotProps={timePickerStyles}
              />
            </Box>
          ) : (
            <Grid2 container spacing={2}>
              {daysOfWeek.map((day) => (
                <Grid2 size={{ xs: 12, md: 6 }} key={day.value}>
                  <Typography color="textSecondary" gutterBottom>
                    {day.label}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Controller
                      name={`timings.${day.value}.closed`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <ThemeButton
                          text={field.value ? "Closed" : "Open"}
                          onClickEvent={() => field.onChange(!field.value)}
                          style={{
                            backgroundColor: field.value
                              ? "#d32f2f"
                              : "#388e3c",
                            color: "#fff",
                            minWidth: 80,
                            padding: "6px 16px",
                          }}
                        />
                      )}
                    />
                    <Controller
                      name={`timings.${day.value}.open`}
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Open"
                          {...field}
                          disabled={getValues(`timings.${day.value}.closed`)}
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
                          slotProps={timePickerStyles}
                        />
                      )}
                    />
                    <Controller
                      name={`timings.${day.value}.close`}
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Close"
                          {...field}
                          disabled={getValues(`timings.${day.value}.closed`)}
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
                          slotProps={timePickerStyles}
                        />
                      )}
                    />
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          )}
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
