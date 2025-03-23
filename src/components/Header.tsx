import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Help', href: '#help' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft dark:bg-gray-900/90'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="Samarthanam NGO Home">
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg overflow-hidden">
                <img 
                  src="/images/logo_for_site.jpg" 
                  alt="Samarthanam NGO" 
                  className="h-16 md:h-20 w-auto rounded-md"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-800 text-white font-medium transition-colors shadow-sm hover:shadow-md"
                aria-label={link.name}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-red-600 bg-red-600 text-white hover:bg-red-800"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-red-600 bg-red-600 text-white hover:bg-red-800"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <button
              className="text-white bg-red-600 hover:bg-red-800 p-2 rounded-full transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in bg-white/95 dark:bg-gray-900/95 mt-2 rounded-lg shadow-md">
            <nav className="flex flex-col space-y-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-800 text-white font-medium transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
