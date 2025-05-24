import CustomInput from "@/components/global/CustomInput";
import { Controller } from "react-hook-form";

const BillingInfoSection = ({
  control,
  errors,
}: {
  control: any;
  errors: { [key: string]: { message?: string } };
}) => (
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
            border="1px solid white"
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
            border="1px solid white"
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
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            border="1px solid white"
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
            border="1px solid white"
            borderRadiusPixels="10px"
          />
        )}
      />
    </div>
  </>
);

export default BillingInfoSection;
