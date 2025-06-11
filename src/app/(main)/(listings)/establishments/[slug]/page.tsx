import { baseUrl } from "@/constants/baseUrl";
import EstablishmentGallery from "@/components/establishmentpage/EstablishmentGallery";
import { Box, Grid2 } from "@mui/material";
import EstablishmentFAQ from "@/components/establishmentpage/EstablishmentFAQ";
import EstablishmentReview from "@/components/establishmentpage/EstablishmentReview";
import EstablishmentLocation from "@/components/establishmentpage/EstablishmentLocation";
import EstablishmentProfileHeader from "@/components/establishmentpage/EstablishmentProfileHeader";
import { notFound } from "next/navigation";
import AmenitiesSection from "@/components/establishmentpage/AmenitiesSection";
import RecommendedEstablishment from "@/components/establishmentpage/RecommendedEstablishment";

export default async function EstablishmentPage({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(`${baseUrl}/businesses/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound(); // Automatically shows the 404 page
  }

  const business = await res.json();

  if (business?.message === "Business not found") {
    return notFound();
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  const isBusinessHasAmenities =
    Object.keys(business.amenities ?? {}).length > 0;

  return (
    <div className="p-2  min-h-screen">
      <Grid2
        container
        spacing={6}
        className="max-w-[95%] md:max-w-[90%] mx-auto"
      >
        <EstablishmentProfileHeader
          id={business._id}
          businessUserId={business.userId}
          slug={business.slug}
          media={{
            logo: business.media?.logo,
            images: business.media?.images ?? [],
            cover: business.media?.cover,
          }}
          name={business.name}
          tagline={business.tagline}
          bordtype={business.bordtype}
        />
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box>
            <div className=" space-y-4">
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">
                  Description
                </h2>
                <p className="text-gray-300 capitalize">{business.shortDis}</p>
              </div>
              {isBusinessHasAmenities && (
                <AmenitiesSection amenities={business.amenities} />
              )}
              {(business.media?.images?.length ?? 0) > 1 && (
                <EstablishmentGallery images={business.media?.images ?? []} />
              )}
            </div>

            {/* FAQs */}
            {business.faqs && business.faqs?.length > 0 && (
              <EstablishmentFAQ faqs={business.faqs} />
            )}

            <EstablishmentReview id={business._id} slug={business.slug} />
          </Box>
        </Grid2>
        {business.location && (
          <Grid2 size={{ xs: 12, md: 6 }}>
            <EstablishmentLocation business={business} />
          </Grid2>
        )}

        <Grid2 size={{ xs: 12 }}>
          <RecommendedEstablishment id={id} />
        </Grid2>
      </Grid2>
    </div>
  );
}
