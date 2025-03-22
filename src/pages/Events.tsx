
import { useInView } from '@/lib/animate';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events } from '@/data/events';

const Events = () => {
  const { ref, isVisible } = useInView();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-event-blue/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-event-darkest-gray mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg text-event-medium-gray mb-8">
              Join us at one of our upcoming events and help make a difference in the lives of those in need.
            </p>
            <div className="w-16 h-1 bg-event-blue mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card 
                key={event.id}
                className={cn(
                  "overflow-hidden shadow-medium hover:shadow-intense transition-all duration-500 transform hover:-translate-y-1",
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12",
                  { "delay-100": index === 0, "delay-200": index === 1, "delay-300": index === 2, "delay-400": index >= 3 }
                )}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-event-blue/90 text-white text-sm font-medium">
                      {event.subtitle}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-event-medium-gray">
                      <CalendarIcon size={16} className="mr-2 text-event-blue" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-event-medium-gray">
                      <Clock size={16} className="mr-2 text-event-blue" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-event-medium-gray">
                      <MapPin size={16} className="mr-2 text-event-blue" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className="w-full bg-event-blue hover:bg-event-dark-blue text-white"
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
