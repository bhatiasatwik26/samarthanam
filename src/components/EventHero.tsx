import { useInView } from '@/lib/animate';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EventHeroProps {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
}

const EventHero = ({
  title,
  subtitle,
  description,
  date,
  time,
  location,
  imageUrl,
}: EventHeroProps) => {
  const { ref, isVisible } = useInView();

  return (
    <div
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      ref={ref}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/80 mix-blend-multiply z-10"></div>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 pt-20 z-10 relative">
        <div className="max-w-3xl">
          <div className={cn(
            "transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <span className="inline-block py-1 px-3 rounded-full bg-red-600/10 text-red-200 text-sm font-medium backdrop-blur-sm border border-red-500/20 mb-4">
              {subtitle}
            </span>
          </div>

          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 transition-all duration-700 delay-100 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            {title}
          </h1>

          <p className={cn(
            "text-lg text-white/90 mb-8 max-w-xl transition-all duration-700 delay-200 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            {description}
          </p>

          <div className={cn(
            "flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-300 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <div className="flex items-center text-white/80">
              <Calendar size={18} className="mr-2 text-red-500" />
              <span>{date}</span>
            </div>
            <div className="flex items-center text-white/80">
              <Clock size={18} className="mr-2 text-red-500" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-white/80">
              <MapPin size={18} className="mr-2 text-red-500" />
              <span>{location}</span>
            </div>
          </div>

          <div className={cn(
            "flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <Button className="rounded-full bg-red-600 hover:bg-red-800 text-white px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 button-hover-effect">
              Register Now
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10 px-8 py-6 backdrop-blur-sm transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
    </div>
  );
};

export default EventHero;
