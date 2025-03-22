
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Donate', href: '#', isButton: true },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft dark:bg-event-darkest-gray/90'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-event-dark-blue font-serif text-2xl font-bold">
              Samarthanam
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.isButton ? (
                <Button
                  key={link.name}
                  className="rounded-full px-6 py-2 bg-event-blue hover:bg-event-dark-blue text-white transition-all"
                >
                  {link.name}
                </Button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-event-dark-gray font-medium hover:text-event-blue transition-colors relative animated-border after:bottom-[-4px]"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-event-dark-gray hover:text-event-blue transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.isButton ? (
                  <Button
                    key={link.name}
                    className="rounded-full px-6 py-2 bg-event-blue hover:bg-event-dark-blue text-white transition-all w-full"
                  >
                    {link.name}
                  </Button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-event-dark-gray font-medium hover:text-event-blue transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
