
import { useEffect } from 'react';
import Header from '@/components/Header';
import EventHero from '@/components/EventHero';
import EventSchedule from '@/components/EventSchedule';
import RegistrationForm from '@/components/RegistrationForm';
import LocationMap from '@/components/LocationMap';
import ImageGallery from '@/components/ImageGallery';
import CountdownTimer from '@/components/CountdownTimer';
import SocialShare from '@/components/SocialShare';
import Footer from '@/components/Footer';
import { formatDate } from '@/lib/animate';

const Index = () => {
  // Make sections animate in as they come into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.section-fade-up');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Event data
  const eventData = {
    title: "Annual Charity Walkathon 2023",
    subtitle: "Join the Movement",
    description: "Walk for a cause and make a difference in the lives of those in need. Our annual charity walkathon raises funds for educational programs that support underprivileged children.",
    date: formatDate(new Date("2023-12-15")),
    time: "7:00 AM - 12:00 PM",
    location: "Central Park, New York City",
    imageUrl: "https://images.unsplash.com/photo-1579621970590-9d624316904b?q=80&w=2070&auto=format&fit=crop",
    targetDate: new Date("2023-12-15T07:00:00"),
    eventUrl: "https://example.com/annual-charity-walkathon",
    mapImageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2069&auto=format&fit=crop",
    address: "Central Park, 5th Ave, New York, NY 10022, United States",
    timings: "December 15, 2023 • 7:00 AM - 12:00 PM",
    contactPhone: "+1 (555) 123-4567",
    scheduleItems: [
      {
        time: "7:00 AM",
        title: "Registration & Check-in",
        description: "Arrive early to complete registration and collect your participation kit.",
      },
      {
        time: "7:45 AM",
        title: "Opening Ceremony",
        description: "Welcome address by our CEO and special guests to kick off the event.",
      },
      {
        time: "8:00 AM",
        title: "Walkathon Starts",
        description: "The official start of the 5K charity walkathon. Pace yourself and enjoy the route!",
      },
      {
        time: "10:00 AM",
        title: "Refreshment Break",
        description: "Hydration and snack stations will be available along the route.",
      },
      {
        time: "11:30 AM",
        title: "Closing Ceremony",
        description: "Celebration and acknowledgment of participants and sponsors.",
      },
    ],
    galleryImages: [
      { src: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format&fit=crop", alt: "Participants walking together" },
      { src: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2074&auto=format&fit=crop", alt: "Charity event crowd" },
      { src: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=2070&auto=format&fit=crop", alt: "Community support" },
      { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", alt: "Children at charity event" },
      { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop", alt: "Volunteers helping out" },
      { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop", alt: "Event celebration" },
    ],
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      
      <main className="pt-16">
        <EventHero
          title={eventData.title}
          subtitle={eventData.subtitle}
          description={eventData.description}
          date={eventData.date}
          time={eventData.time}
          location={eventData.location}
          imageUrl={eventData.imageUrl}
        />
        
        <CountdownTimer targetDate={eventData.targetDate} />
        
        <EventSchedule
          title="Event Schedule"
          subtitle="Program Details"
          scheduleItems={eventData.scheduleItems}
        />
        
        <RegistrationForm
          title="Register Now"
          subtitle="Join Us"
        />
        
        <LocationMap
          title="Event Location"
          subtitle="Where To Find Us"
          address={eventData.address}
          timings={eventData.timings}
          contactPhone={eventData.contactPhone}
          mapImageUrl={eventData.mapImageUrl}
        />
        
        <ImageGallery
          title="Event Gallery"
          subtitle="Memories"
          images={eventData.galleryImages}
        />
        
        <SocialShare
          title="Share This Event"
          subtitle="Spread The Word"
          eventUrl={eventData.eventUrl}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
