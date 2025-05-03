import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconsComponent } from "../layout";

const PromoCodePopupComponent = () => {
  return (
    <>
      <IconsComponent />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "linear" }}
        className="flex justify-center items-center "
      >
        <Box sx={{ marginBlock: "-3rem" }}>
          <Link href="/plans" passHref>
            <Image
              src="/images/banners/promo.svg" // Replace with your image path
              alt="Promo"
              width={500} // Adjust width as needed
              height={500} // Adjust height as needed
            />
          </Link>
        </Box>
      </motion.div>
    </>
  );
};

export default PromoCodePopupComponent;
