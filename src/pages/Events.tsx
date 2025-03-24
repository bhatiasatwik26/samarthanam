import { useInView } from "@/lib/animate";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  Heart,
  Search,
  Filter,
  Star,
  TrendingUp,
  ArrowUpRight,
  AlarmClock,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { fetchEvents, registerForEvent } from "@/services/eventsApi";
import Newsletter from "@/components/Newsletter";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/event";

const getEventTime = (dateTimeStr: Date) => {
  try {
    const dateObj = dateTimeStr;

    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }

    return dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error parsing time:", error);
    return "Unknown time";
  }
};

const getEventDate = (dateTimeStr: Date) => {
  try {
    const dateObj = dateTimeStr;

    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Unknown date";
  }
};

const Events = () => {
  const { ref, isVisible } = useInView();
  const { data: events, isLoading, isError, error } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  // const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const featuredEvents = Array.isArray(events) ? events.slice(0, 2) : [];

  const filteredEvents = Array.isArray(events)
    ? events.filter((event) => {
        const matchesSearch =
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
      })
    : [];

  // Filter upcoming events by date
  const upcomingEvents = filteredEvents.filter((event) => {
    const today = new Date();
    try {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    } catch (e) {
      console.error("Invalid date:", e);
      return true; // Include invalid dates to prevent breaking
    }
  });

  const getEventDate = (dateTimeStr: string) => {
    try {
      const dateObj = new Date(dateTimeStr);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }

      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Unknown date";
    }
  };

  // Function to extract the time
  const getEventTime = (dateTimeStr) => {
    try {
      const dateObj = new Date(dateTimeStr);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }

      return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error parsing time:", error);
      return "Unknown time";
    }
  };

  const displayedEvents =
    activeTab === "upcoming" ? upcomingEvents : filteredEvents;
  // Handle event registration
  const handleRegister = async (eventId: string) => {
    try {
      // In a real app, you'd get the userId from auth context
      const userId = "user123";
      const result = await registerForEvent(eventId, userId);

      if (result.success) {
        // Show success notification or redirect to confirmation page
        console.log(result.message);
        alert(
          "Registration successful! You are now registered for this event."
        );
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again later.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 pt-32">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 pt-32">
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <Filter className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-medium mb-2 dark:text-white">
              Error Loading Events
            </h3>
            {/* <p className="text-red-800 dark:text-red-200">{error}</p> */}
            <Button
              variant="outline"
              className="mt-4 border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-800/30"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-red-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-red-600 hover:bg-red-700">
              Find Your Next Event
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-red-950 mb-4 dark:text-white">
              Discover Amazing Events
            </h1>
            <p className="text-lg text-red-800 mb-8 dark:text-red-100">
              Join us at one of our upcoming events and help make a difference
              in the lives of those in need.
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-8"></div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 bg-white dark:bg-slate-800 border-red-200 dark:border-red-800/50 focus:border-red-500 dark:focus:border-red-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                </div>
              </div>
              <select
                className="w-full md:w-[180px] bg-white dark:bg-red-950 h-10 rounded-md border border-red-200 dark:border-red-800/50 px-3 py-2 text-sm focus:outline-none focus:border-red-500 dark:focus:border-red-400"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {/* {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-red-200/30 dark:bg-red-500/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-rose-200/40 dark:bg-rose-500/10 blur-xl"></div>
        <div className="absolute -bottom-5 left-1/4 w-72 h-72 rounded-full bg-orange-200/20 dark:bg-orange-500/10 blur-xl"></div>
      </section>

      {/* Browse Events */}
      <section className="py-16" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-red-500 w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-950 dark:text-white">
                  Browse Events
                </h2>
              </div>
              <p className="text-red-800 mt-2 dark:text-red-200">
                {displayedEvents.length} events available
              </p>
            </div>

            {/* Tabs */}
            <div className="flex overflow-hidden rounded-md border border-red-200 dark:border-red-800">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "all"
                    ? "bg-red-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-800"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Events
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "upcoming"
                    ? "bg-red-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-800"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
            </div>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden group border-red-200 dark:border-red-800 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={event.photos[0]}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600/90 hover:bg-red-700/90 backdrop-blur-sm text-white">
                      {/* {event.tagline} */}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-serif group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {event.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 text-red-800 dark:text-slate-400">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <CalendarIcon size={16} className="mr-2 text-red-500" />
                      <span>{getEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <Clock size={16} className="mr-2 text-red-500" />
                      <span>{getEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <Users size={16} className="mr-2 text-red-500" />
                      <span>
                        Participants required:{" "}
                        {20 + Math.floor(Math.random() * 30)}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                      <AlarmClock size={16} className="mr-2 text-red-500" />
                      <span>
                        Registration deadline:{" "}
                        {new Date(
                          new Date(event.date).getTime() -
                            7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0 pt-0">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <Heart size={16} className="mr-1 text-red-500" />
                    <span>Support this cause</span>
                  </div>
                  <Button
                    asChild
                    variant="default"
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-800 text-white transition-colors"
                  >
                    <Link
                      to={`/event/${event._id}`}
                      className="flex items-center justify-center"
                    >
                      Register <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gradient-to-b from-white to-red-50 dark:from-slate-900 dark:to-red-950">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-950 dark:text-white">
                  Featured Events
                </h2>
              </div>
              <p className="text-red-800 mt-2 dark:text-red-200">
                Don't miss these highly anticipated events
              </p>
            </div>
            <Link
              to="/events"
              className="text-red-600 dark:text-red-400 font-medium flex items-center hover:underline hidden md:flex"
            >
              View all <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    Featured
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={event.photos[0]}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-red-600 hover:bg-red-700">
                        {/* {event.tagline} */}
                      </Badge>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-red-600 dark:group-hover:text-red-400">
                        {event.name}
                      </h3>
                      <p className="text-red-800 dark:text-slate-400 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-slate-600 dark:text-slate-300">
                          <CalendarIcon
                            size={16}
                            className="mr-2 text-red-500"
                          />
                          <span>{getEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300">
                          <Clock size={16} className="mr-2 text-red-500" />
                          <span>{getEventTime(event.date)}</span>
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300">
                          <MapPin size={16} className="mr-2 text-red-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300">
                          <Users size={16} className="mr-2 text-red-500" />
                          <span>
                            Participants required:{" "}
                            {20 + Math.floor(Math.random() * 30)}
                          </span>
                        </div>
                        <div className="flex items-center text-slate-600 dark:text-slate-300 col-span-2">
                          <AlarmClock size={16} className="mr-2 text-red-500" />
                          <span>
                            Registration deadline:{" "}
                            {new Date(
                              new Date(event.date).getTime() -
                                7 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        asChild
                        className="w-full bg-red-600 hover:bg-red-800 text-white transition-colors"
                      >
                        <Link
                          to={`/event/${event.id}`}
                          className="flex items-center justify-center"
                        >
                          Register <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <Newsletter />
    </div>
  );
};

export default Events;
