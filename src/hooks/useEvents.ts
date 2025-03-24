import { useQuery } from "@tanstack/react-query";
export const fetchEvents = async () => {
  const response = await fetch("http://localhost:3000/api/event"); // Replace with your backend URL

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return await response.json();
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
