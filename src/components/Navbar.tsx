
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Mail } from 'lucide-react';
import AccessibilityMenu from './AccessibilityMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll to contact section or redirect to homepage contact
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
      // If we're on the current page with a contact section
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname === '/') {
      // If we're on the homepage but couldn't find the contact section (unlikely)
      window.location.href = '/#contact';
    } else {
      // If we're on a different page, navigate to homepage contact
      window.location.href = '/#contact';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 text-gradient hover:opacity-80 transition-opacity"
        >
          <span className="hidden sm:inline">Abir Mehmed</span> Portfolio
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-detective-accent after:transition-all hover:after:w-full ${
                    location.pathname === link.path ? 'text-detective-accent after:w-full' : 'text-foreground/80 hover:text-detective-accent'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <ThemeToggle />
            <Button 
              className="bg-detective-accent text-detective-dark hover:bg-detective-accent/90 hover:scale-105 flex items-center gap-2 transition-all duration-300"
              onClick={scrollToContact}
            >
              <Mail size={16} />
              Contact
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <AccessibilityMenu />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          fixed inset-0 top-[62px] z-40 bg-background/95 backdrop-blur-md
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="h-full flex flex-col p-6">
          <ul className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`
                    text-lg font-medium block py-3 border-b border-muted
                    transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-detective-accent after:transition-all hover:after:w-1/4
                    ${location.pathname === link.path ? 'text-detective-accent after:w-1/4' : 'text-foreground/80 hover:text-detective-accent'}
                  `}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full bg-detective-accent text-detective-dark hover:bg-detective-accent/90 hover:scale-105 flex items-center justify-center gap-2 transition-all duration-300"
            onClick={scrollToContact}
          >
            <Mail size={16} />
            Contact Me
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
