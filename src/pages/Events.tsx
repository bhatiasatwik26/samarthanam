import { useInView } from '@/lib/animate';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, Clock, MapPin, ArrowRight, Users, Heart, 
  Search, Filter, Star, TrendingUp, ArrowUpRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '@/data/events';
import Header from '@/components/Header';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

// Create categories based on event subtitles
const eventCategories = ["All", ...new Set(events.map(event => event.subtitle))];

const Events = () => {
  const { ref, isVisible } = useInView();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Featured events (first 2 events)
  const featuredEvents = useMemo(() => events.slice(0, 2), []);
  
  // Filter events based on category and search query
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategory === "All" || event.subtitle === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Get upcoming events (events with future dates)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date.split('-')[0]);
      return eventDate >= today;
    });
  }, [filteredEvents]);

  const displayedEvents = useMemo(() => {
    if (activeTab === "upcoming") return upcomingEvents;
    return filteredEvents;
  }, [activeTab, filteredEvents, upcomingEvents]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-indigo-600 hover:bg-indigo-700">
              Find Your Next Event
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-event-darkest-gray mb-4 dark:text-white">
              Discover Amazing Events
            </h1>
            <p className="text-lg text-event-medium-gray mb-8 dark:text-slate-300">
              Join us at one of our upcoming events and help make a difference in the lives of those in need.
            </p>
            <div className="w-16 h-1 bg-event-blue mx-auto mb-8"></div>
            
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-200/30 dark:bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-xl"></div>
        <div className="absolute -bottom-5 left-1/4 w-72 h-72 rounded-full bg-purple-200/20 dark:bg-purple-500/10 blur-xl"></div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-event-darkest-gray dark:text-white">
                  Featured Events
                </h2>
              </div>
              <p className="text-event-medium-gray mt-2 dark:text-slate-400">Don't miss these highly anticipated events</p>
            </div>
            <Link to="/events" className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center hover:underline hidden md:flex">
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
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                </div>
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-indigo-600 hover:bg-indigo-700">{event.subtitle}</Badge>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {event.title}
                      </h3>
                      <p className="text-event-medium-gray dark:text-slate-400 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-event-medium-gray">
                          <CalendarIcon size={16} className="mr-2 text-indigo-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-event-medium-gray">
                          <Clock size={16} className="mr-2 text-indigo-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-event-medium-gray">
                          <MapPin size={16} className="mr-2 text-indigo-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-event-medium-gray">
                          <Users size={16} className="mr-2 text-indigo-500" />
                          <span>Limited spots</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button 
                        asChild 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        <Link to={`/event/${event.id}`} className="flex items-center justify-center">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Events List */}
      <section className="py-16" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-indigo-500 w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-event-darkest-gray dark:text-white">
                  Browse Events
                </h2>
              </div>
              <p className="text-event-medium-gray mt-2 dark:text-slate-400">
                {displayedEvents.length} events available
              </p>
            </div>
            
            {/* Tabs */}
            <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                onClick={() => setActiveTab('all')}
              >
                All Events
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'upcoming' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
            </div>
          </div>

          {displayedEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Filter className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium mb-2 dark:text-white">No events found</h3>
              <p className="text-event-medium-gray dark:text-slate-400">Try adjusting your filters or search term</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedEvents.map((event, index) => (
                <Card 
                  key={event.id}
                  className={cn(
                    "overflow-hidden group border-slate-200 dark:border-slate-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl",
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-12",
                    { 
                      "transition-delay-100": index % 3 === 0, 
                      "transition-delay-200": index % 3 === 1, 
                      "transition-delay-300": index % 3 === 2 
                    }
                  )}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-indigo-600/90 hover:bg-indigo-700/90 backdrop-blur-sm text-white">
                        {event.subtitle}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-event-medium-gray">
                        <CalendarIcon size={16} className="mr-2 text-indigo-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-event-medium-gray">
                        <Clock size={16} className="mr-2 text-indigo-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-event-medium-gray">
                        <MapPin size={16} className="mr-2 text-indigo-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-event-medium-gray">
                        <Users size={16} className="mr-2 text-indigo-500" />
                        <span>Join {30 + index * 5} others</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0 pt-0">
                    <div className="flex items-center text-sm text-event-medium-gray">
                      <Heart size={16} className="mr-1 text-pink-500" />
                      <span>Support this cause</span>
                    </div>
                    <Button 
                      asChild 
                      variant="default"
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Link to={`/event/${event.id}`} className="flex items-center justify-center">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Show more button if needed */}
          {displayedEvents.length > 6 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="mx-auto border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-950/50">
                Load more events
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter/CTA Section */}
      <section className="bg-indigo-600 dark:bg-indigo-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Never Miss an Event
            </h2>
            <p className="text-indigo-100 mb-8">
              Subscribe to our newsletter and be the first to know about upcoming events, exclusive offers, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-indigo-400/30 text-white placeholder:text-indigo-200"
              />
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
