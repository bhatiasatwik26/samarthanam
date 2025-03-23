import { User, Event, Leaderboard } from "@/Types";
import { useQuery } from "@tanstack/react-query";

interface VolunteerData {
  user: User | null;
  subscribedEvents: Event[];
  leaderboard: Leaderboard[];
  isUserLoading: boolean;
  isLeaderboardLoading: boolean;
  isUserError: boolean;
  isLeaderboardError: boolean;
}

// ✅ Fetch user and subscribed events data
const fetchUserData = async (): Promise<{
  user: User;
  subscribedEvents: Event[];
}> => {
  const response = await fetch(
    "http://localhost:3000/api/users/67df9c187817e5f9f28a8f82",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();

  const user: User = {
    id: data._id,
    photo: data.photo,
    email: data.email,
    name: data.name,
    rank: data.rank,
    eventsVolunteered: data.eventsVolunteered,
    volunteerHour: data.volunteerHour,
    pointsForNextRank: data.pointsForNextRank,
    nextRank: data.nextRank,
    eventsParticipated: data.eventsParticipated,
  };

  const subscribedEvents: Event[] = data.eventsSubscribed.map((event: any) => ({
    eventId: event.eventId,
    tasks: event.assignedTasks.map((task: any) => ({
      name: task.name,
      status: task.status,
      deadline: task.deadline,
    })),
  }));

  return { user, subscribedEvents };
};

// ✅ Fetch leaderboard data with explicit typing
const fetchLeaderboardData = async (): Promise<Leaderboard[]> => {
  const response = await fetch("http://localhost:3000/api/users/leaderboard", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard data");
  }

  const data = await response.json();

  const leaderboard: Leaderboard[] = data.map((person: any) => ({
    _id: person._id,
    photo: person.photo,
    name: person.name,
    rank: person.rank,
    pointsForNextRank: person.pointsForNextRank,
  }));

  return leaderboard;
};

// ✅ Custom hook with proper types and fallback handling
export const useVolunteerData = (): VolunteerData => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    select: (data) => data || { user: null, subscribedEvents: [] }, // Fallback
  });

  const {
    data: leaderboardData,
    isLoading: isLeaderboardLoading,
    isError: isLeaderboardError,
  } = useQuery({
    queryKey: ["leaderboardData"],
    queryFn: fetchLeaderboardData,
    select: (data) => data || [], // Fallback
  });

  return {
    user: userData?.user ?? null, // Use `null` to ensure proper typing
    subscribedEvents: userData?.subscribedEvents ?? [],
    leaderboard: leaderboardData ?? [],
    isUserLoading,
    isLeaderboardLoading,
    isUserError,
    isLeaderboardError,
  };
};
