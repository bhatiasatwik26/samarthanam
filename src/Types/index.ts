export interface User {
  id: string;
  photo: string;
  email: string;
  name: string;
  rank: string;
  eventsVolunteered: number;
  volunteerHour: number;
  pointsForNextRank: number;
  nextRank: string;
  eventsParticipated: number;
}

export interface Event {
  eventId: string;
  tasks: {
    name: string;
    status: string;
    deadline: string;
  }[];
}

export interface Leaderboard {
  _id: string;
  photo: string;
  name: string;
  rank: string;
  pointsForNextRank: number;
}

export interface GeographicalLocation {
  type: string;
  coordinates: [number, number];
}

export interface Event {
  _id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  geographicalLocation: GeographicalLocation;
  photos: string[];
  reviews: string[];
  volunteersAssigned: string[];
}
