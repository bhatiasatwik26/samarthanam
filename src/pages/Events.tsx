
import { useInView } from '@/lib/animate';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin, ArrowRight, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '@/data/events';
import Header from '@/components/Header';

const Events = () => {
  const { ref, isVisible } = useInView();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-event-darkest-gray mb-4 dark:text-white">
              Upcoming Events
            </h1>
            <p className="text-lg text-event-medium-gray mb-8 dark:text-slate-300">
              Join us at one of our upcoming events and help make a difference in the lives of those in need.
            </p>
            <div className="w-16 h-1 bg-event-blue mx-auto"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-200/30 dark:bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-xl"></div>
      </section>

      {/* Events List */}
      <section className="py-16" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card 
                key={event.id}
                className={cn(
                  "overflow-hidden group border-slate-200 dark:border-slate-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl",
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12",
                  { "transition-delay-100": index === 0, "transition-delay-200": index === 1, "transition-delay-300": index === 2, "transition-delay-400": index >= 3 }
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
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/90 text-white text-sm font-medium backdrop-blur-sm">
                      {event.subtitle}
                    </span>
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
        </div>
      </section>
    </div>
  );
};

export default Events;
