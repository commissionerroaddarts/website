"use client";
import { Box, Typography } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import CustomInput from "@/components/global/CustomInput";
import { PlusCircle, Trash } from "lucide-react";
import ThemeOutlineButton from "@/components/buttons/ThemeOutlineButton";

const Step6Form = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs", // 'faqs' must be an array in your form schema
  });

  const handleAddFaq = () => {
    const newFaq = { q: "", a: "" };
    append(newFaq);
  };

  const handleRemoveFaq = (index: number) => {
    remove(index);
  };

  return (
    <Box mb={5} className="flex justify-center flex-col items-center">
      <Typography variant="h5" textAlign="center">
        Venue Frequently Asked Questions (FAQs){" "}
      </Typography>
      <Typography>
        List of Questions Frequently asked about your establishment.
      </Typography>
      {fields.length > 0 && (
        <Box
          className={` px-10 w-full md:w-[80%]  mx-auto mt-10  ${
            fields.length > 1 ? "max-h-[45vh]  overflow-y-scroll " : ""
          }`}
        >
          {fields.map((item, index) => (
            <Box
              key={item.id}
              display="flex"
              flexDirection="column"
              gap={2}
              mb={3}
              width="100%"
              maxWidth="100%"
            >
              <Controller
                name={`faqs.${index}.q`}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomInput
                    label={`Question ${index + 1}`}
                    error={!!fieldState.error}
                    helperText={fieldState?.error?.message}
                    {...field}
                    fullWidth
                    className="w-full"
                  />
                )}
              />
              <Controller
                name={`faqs.${index}.a`}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomInput
                    multiline
                    rows={4}
                    label={`Answer`}
                    error={!!fieldState.error}
                    helperText={fieldState?.error?.message}
                    {...field}
                    fullWidth
                    className="w-full"
                  />
                )}
              />
              <Box className="flex justify-center  gap-3 ">
                {fields.length > 0 && (
                  <ThemeOutlineButton
                    text={`Remove FAQ ${index + 1}`}
                    onClickEvent={() => handleRemoveFaq(index)}
                    icon={<Trash />}
                    className=" w-full"
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <ThemeOutlineButton
        text={fields.length > 0 ? "Add Another FAQ" : "Add FAQ"}
        icon={<PlusCircle color="white" />}
        onClickEvent={handleAddFaq}
        applyMargin={fields.length === 0}
      />
    </Box>
  );
};

export default Step6Form;
