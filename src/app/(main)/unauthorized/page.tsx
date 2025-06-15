import ThemeButton from "@/components/buttons/ThemeButton";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-[90%] md:max-w-[40%] mx-auto">
      {/* <Image
        src="/images/icons/unauthorized.jpg" // Replace with an appropriate image if available
        alt="Unauthorized Icon"
        width={250}
        height={250}
      /> */}
      <Box className="flex flex-col gap-3 justify-center items-center max-w-[90%] mx-auto">
        <Typography className="text-xl font-bold text-center">
          You don’t have permission to access this page.
        </Typography>
        <Typography className="text-center text-gray-600">
          Please login with the appropriate credentials or return to the
          homepage.
        </Typography>
        <Link href="/" className="w-full">
          <ThemeButton text="Go to Home" className="w-full" />
        </Link>
      </Box>
    </div>
  );
};

export default UnauthorizedPage;
