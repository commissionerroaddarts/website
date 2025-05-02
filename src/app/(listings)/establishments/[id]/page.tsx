"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Business } from "@/types/business";
import { baseUrl } from "@/constants/baseUrl";
import EstablishmentGallery from "@/components/establishmentpage/EstablishmentGallery";
import EstablishmentHeader from "@/components/establishmentpage/EstablishmentHeader";
import { Box, Grid2 } from "@mui/material";
import EstablishmentFAQ from "@/components/establishmentpage/EstablishmentFAQ";
import EstablishmentReview from "@/components/establishmentpage/EstablishmentReview";
import EstablishmentLocation from "@/components/establishmentpage/EstablishmentLocation";

export default function EstablishmentPage() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await fetch(`${baseUrl}/businesses/${id}`);
      const data = await res.json();
      setBusiness(data);
    };

    if (id) fetchBusiness();
  }, [id]);

  if (!business) return <p>Loading...</p>;

  return (
    <div className="p-6 min-h-screen">
      <Grid2 container spacing={6} sx={{ padding: "0 6rem" }}>
        {/* Gallery */}
        {business.media && (
          <Grid2 size={{ xs: 12 }}>
            <EstablishmentGallery images={business.media.images || []} />
          </Grid2>
        )}

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box>
            {/* Header Section */}
            <EstablishmentHeader
              name={business.name}
              tagline={business.tagline}
              shortDis={business.shortDis}
            />

            {/* FAQs */}
            {business.faqs && <EstablishmentFAQ faqs={business.faqs} />}

            {/* Reviews */}
            <EstablishmentReview id={business._id} />
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box>
            {business.location && <EstablishmentLocation business={business} />}
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
}
