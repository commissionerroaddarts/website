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
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

  const [sameHours, setSameHours] = useState(false);
  const [allDaysHours, setAllDaysHours] = useState({ open: "", close: "" });
  const handleSameHoursApply = () => {
    daysOfWeek.forEach((day) => {
      setValue(`timings.${day}.open`, allDaysHours.open);
      setValue(`timings.${day}.close`, allDaysHours.close);
    });
  };

  useEffect(() => {
    if (sameHours) {
      daysOfWeek.forEach((day) => {
        setValue(`timings.${day}.open`, allDaysHours.open);
        setValue(`timings.${day}.close`, allDaysHours.close);
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
                <Grid2 size={{ xs: 12, md: 6 }} key={day}>
                  <Typography color="textSecondary" gutterBottom>
                    {day}
                  </Typography>
                  <Box display="flex" gap={2}>
                    <Controller
                      name={`timings.${day}.open`}
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Open"
                          {...field}
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
                              `timings.${day}.open`,
                              newValue ? newValue.format("hh:mm A") : ""
                            )
                          }
                          slotProps={timePickerStyles}
                        />
                      )}
                    />
                    <Controller
                      name={`timings.${day}.close`}
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Close"
                          {...field}
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
                              `timings.${day}.close`,
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
