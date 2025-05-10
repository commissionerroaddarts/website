import { Event } from "@/types/event";
import { Skeleton } from "@mui/material";
import EventCard from "./EventCard";

interface Props {
  events: Event[]; // Replace with your type
  isLoading: boolean; // Add a loading state prop
}

const EventPageGrid = ({ events, isLoading }: Props) => {
  return (
    <section className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={`event${index}`} className="p-4">
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))
          : events.map((event) => <EventCard key={event._id} event={event} />)}
      </div>
    </section>
  );
};

export default EventPageGrid;
