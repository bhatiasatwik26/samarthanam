import { useQuery } from "@tanstack/react-query";
import { Event } from "@/Types";

const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch("http://localhost:3000/api/events", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events data");
  }

  const data = await response.json();

  const events: Event[] = data.map((event: any) => ({
    _id: event._id,
    name: event.name,
    location: event.location,
    date: event.date,
    description: event.description,
    geographicalLocation: {
      type: event.geographicalLocation.type,
      coordinates: [
        event.geographicalLocation.coordinates[0],
        event.geographicalLocation.coordinates[1],
      ],
    },
    photos: event.photos,
    reviews: event.reviews,
    volunteersAssigned: event.volunteersAssigned || [],
  }));

  return events;
};

export const useEvents = () => {
  const {
    data: events,
    isLoading: isEventsLoading,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    select: (data) => data ?? [],
  });

  return { events, isEventsLoading, isEventsError, refetchEvents };
};

const fetchEventById = async (eventId: string) => {
  const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
    method: "GET",
    credentials: "include",
  });
  console.log(res);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch event");
  }

  return res.json();
};

export const useEventById = (eventId: string) => {
  return useQuery<Event>({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventById(eventId),
    enabled: !!eventId,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
