import ThemeButton from "@/components/buttons/ThemeButton";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col  justify-center items-center  max-w-[90%] md:max-w-[40%] mx-auto">
      <Image
        src="/images/icons/404.png"
        alt="Dart Icon"
        width={550}
        height={550}
      />
      <Box className="flex flex-col gap-3 justify-center items-center  max-w-[90%] mx-auto">
        <Typography className="text-xl font-bold text-center">
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable
        </Typography>
        <Link href="/" className="w-full">
          <ThemeButton text="Go to Home" className="w-full" />
        </Link>
      </Box>
    </div>
  );
};

export default NotFoundPage;
