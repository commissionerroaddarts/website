import { baseUrl } from "@/constants/baseUrl";
import EstablishmentGallery from "@/components/establishmentpage/EstablishmentGallery";
import EstablishmentHeader from "@/components/establishmentpage/EstablishmentHeader";
import { Box, Grid2 } from "@mui/material";
import EstablishmentFAQ from "@/components/establishmentpage/EstablishmentFAQ";
import EstablishmentReview from "@/components/establishmentpage/EstablishmentReview";
import EstablishmentLocation from "@/components/establishmentpage/EstablishmentLocation";

export default async function EstablishmentPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fetchBusiness = async () => {
    const res = await fetch(`${baseUrl}/businesses/${id}`);
    const data = await res.json();
    return data;
  };

  const business = await fetchBusiness();
  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div className="p-2 md:p-6 min-h-screen">
      <Grid2
        container
        spacing={6}
        className="max-w-[95%] md:max-w-[90%] mx-auto"
      >
        {/* Gallery */}
        {business.media && (
          <Grid2 size={{ xs: 12 }}>
            <EstablishmentGallery images={business.media.images ?? []} />
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
        {business.location && (
          <Grid2 size={{ xs: 12, md: 6 }}>
            <EstablishmentLocation business={business} />
          </Grid2>
        )}
      </Grid2>
    </div>
  );
}
