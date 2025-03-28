import { useInView } from "@/lib/animate";
import { ArrowRight, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Description } from "@radix-ui/react-toast";

interface EventHeroProps {
  imageUrl: string;
  description: string;
  tagline: string;
}

const EventHero = ({ imageUrl, description, tagline }: EventHeroProps) => {
  const { ref, isVisible } = useInView();

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden"
      ref={ref}
      id="hero"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/80 mix-blend-multiply z-10"></div>
        <img
          src={imageUrl}
          alt="Volunteers making a difference"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 pt-20 z-10 relative">
        <div className="max-w-3xl">
          <div
            className={cn(
              "transition-all duration-700 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            )}
          >
            <span
              className="inline-block py-1 px-3 rounded-full bg-red-600/10 text-red-200 text-sm font-medium backdrop-blur-sm border border-red-500/20 mb-4"
              aria-label="Samarthanam NGO"
            >
              Samarthanam NGO
            </span>
          </div>

          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 transition-all duration-700 delay-100 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            )}
          >
            {tagline}
          </h1>

          <p
            className={cn(
              "text-lg text-white/90 mb-8 max-w-xl transition-all duration-700 delay-200 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            )}
          >
            {description}
          </p>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 transform",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            )}
          >
            <Button
              className="rounded-full bg-red-600 hover:bg-red-800 text-white px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 button-hover-effect"
              aria-label="Sign up to join Samarthanam NGO"
            >
              <Users className="mr-2 h-5 w-5" />
              Sign Up
            </Button>

            <Link to="/signin">
              <Button
                variant="default"
                className="rounded-full bg-red-600 hover:bg-red-800 text-white px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 button-hover-effect"
                aria-label="Sign in to your account"
              >
                <User className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </Link>

            <Link to="/events">
              <Button
                variant="secondary"
                className="rounded-full bg-red-600 hover:bg-red-700 text-white px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Explore events from Samarthanam NGO"
              >
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Wave Element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>
      <svg
        className="absolute bottom-0 left-0 w-full z-10 text-background fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
      >
        <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,85.3C672,96,768,96,864,96C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default EventHero;
