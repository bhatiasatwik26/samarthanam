import { useParams, Link } from "react-router-dom";
import { events } from "@/data/events";
import EventHero from "@/components/EventHero";
import EventSchedule from "@/components/EventSchedule";
import RegistrationForm from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEventById } from "@/hooks/useEvents";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useEventById(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(event.photos[0]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="bg-red-600 hover:bg-red-800 text-white">
          <Link to="/events" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back to Events Button */}
      <div className="container mx-auto px-6 pt-6">
        <Button
          variant="outline"
          asChild
          className="mb-4 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Link to="/events" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <EventHero
        // title={event.name}
        // subtitle={event.subtitle}
        // description={event.description}
        // date={event.date}
        // time={event.time}
        description={
          "Together we can create inclusive communities that empower individuals with disabilities. Be part of our mission to build a world where everyone has equal opportunities to thrive."
        }
        // location={event.location}
        tagline={"Join Hands to Make a Difference"}
        imageUrl={event.photos[0]}
      />

      {/* Event Schedule */}
      {/* <EventSchedule
        title="Event Schedule"
        subtitle="Timeline"
        scheduleItems={event.scheduleItems}
      /> */}

      {/* Registration Form */}
      <RegistrationForm title="Register for this Event" subtitle="Join Us" />
    </div>
  );
};

export default EventDetail;
