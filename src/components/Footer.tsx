
import { useInView } from '@/lib/animate';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { ref, isVisible } = useInView();

  const footerLinks = [
    {
      title: 'About Us',
      links: [
        { name: 'Our Mission', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Impact', href: '#' },
      ],
    },
    {
      title: 'Events',
      links: [
        { name: 'Upcoming Events', href: '#' },
        { name: 'Past Events', href: '#' },
        { name: 'Webinars', href: '#' },
        { name: 'Workshops', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Media Kit', href: '#' },
        { name: 'Contact Us', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer 
      className="bg-event-darkest-gray text-white pt-16 pb-8"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className={cn(
              "transition-all duration-700 transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <h3 className="text-2xl font-serif font-bold mb-4">Samarthanam</h3>
              <p className="text-white/70 mb-6 max-w-md">
                Empowering lives through our various initiatives and programs. Join us in our mission to create a more inclusive and supportive society.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div 
              key={section.title}
              className={cn(
                "transition-all duration-700 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                { "delay-100": index === 0, "delay-200": index === 1, "delay-300": index === 2 }
              )}
            >
              <h4 className="text-lg font-medium mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={cn(
          "border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Samarthanam. All rights reserved.
          </p>
          <div className="flex items-center text-white/60 text-sm">
            <a href="#" className="hover:text-white transition-colors mr-6">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors mr-6">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

        <div className={cn(
          "text-center mt-8 text-white/40 text-xs transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-12"
        )}>
          <p className="flex items-center justify-center">
            Made with <Heart size={12} className="mx-1 text-red-400" /> for community impact
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
