import BusinessCard from "@/components/allestablishmentspage/BusinessCard";
import { Business } from "@/types/business";
import { Event } from "@/types/event";
import { Skeleton } from "@mui/material";

interface Props {
  businesses: Business[]; // Replace with your type
  isLoading: boolean; // Add a loading state prop
}

const EstablishmentPageGrid = ({ businesses, isLoading }: Props) => {
  return (
    <section className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={`business${index}`} className="p-4">
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))
          : businesses.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
      </div>
    </section>
  );
};

export default EstablishmentPageGrid;
