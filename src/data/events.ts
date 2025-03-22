
export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  scheduleItems: {
    time: string;
    title: string;
    description: string;
  }[];
}

export const events: Event[] = [
  {
    id: "event-1",
    title: "Annual Charity Walkathon 2023",
    subtitle: "Walk for a Cause",
    description: "Join us for our annual walkathon to raise funds for education programs. This family-friendly event welcomes participants of all ages and abilities. Together, we can make a difference in the lives of children who need educational support.",
    date: "October 15, 2023",
    time: "8:00 AM - 12:00 PM",
    location: "Central Park, New York",
    imageUrl: "https://images.unsplash.com/photo-1610799197329-86ef5eb6a6c7?q=80&w=1000&auto=format&fit=crop",
    scheduleItems: [
      {
        time: "8:00 AM",
        title: "Registration & Check-in",
        description: "Arrive early to complete your registration and receive your participant packet."
      },
      {
        time: "8:30 AM",
        title: "Opening Ceremony",
        description: "Welcome address by our Executive Director and special guests."
      },
      {
        time: "9:00 AM",
        title: "Walkathon Begins",
        description: "Start of the 5K walk around the scenic route of Central Park."
      },
      {
        time: "11:00 AM",
        title: "Finish Line Celebration",
        description: "Refreshments, entertainment, and celebration at the finish line."
      }
    ]
  },
  {
    id: "event-2",
    title: "Tech for All Hackathon",
    subtitle: "Coding for Accessibility",
    description: "A 48-hour hackathon focused on developing innovative solutions for people with disabilities. Bring your coding skills and creativity to help create technology that makes a difference in people's lives.",
    date: "November 5-7, 2023",
    time: "Starts at 6:00 PM",
    location: "Tech Hub, San Francisco",
    imageUrl: "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=1000&auto=format&fit=crop",
    scheduleItems: [
      {
        time: "6:00 PM",
        title: "Registration & Networking",
        description: "Meet your fellow participants and form teams."
      },
      {
        time: "7:00 PM",
        title: "Kickoff & Challenge Announcement",
        description: "Learn about the specific challenges and judging criteria."
      },
      {
        time: "8:00 PM",
        title: "Hacking Begins",
        description: "Start working on your innovative solutions."
      },
      {
        time: "Sunday, 12:00 PM",
        title: "Project Submissions Due",
        description: "All teams must submit their projects for judging."
      }
    ]
  },
  {
    id: "event-3",
    title: "Benefit Concert for Education",
    subtitle: "Music for Change",
    description: "An evening of inspiring performances by renowned artists to raise funds for our education initiatives. Enjoy great music while supporting a worthwhile cause.",
    date: "December 10, 2023",
    time: "7:00 PM - 10:00 PM",
    location: "Grand Auditorium, Chicago",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop",
    scheduleItems: [
      {
        time: "6:00 PM",
        title: "Doors Open",
        description: "Early entry for VIP ticket holders."
      },
      {
        time: "7:00 PM",
        title: "Welcome & Introduction",
        description: "Opening remarks about our mission and impact."
      },
      {
        time: "7:30 PM",
        title: "First Performance",
        description: "Live music by our featured artists."
      },
      {
        time: "9:30 PM",
        title: "Closing Remarks",
        description: "Thank you address and information on how to get involved."
      }
    ]
  }
];
