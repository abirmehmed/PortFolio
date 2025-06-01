
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import ProfileHero from '@/components/about/ProfileHero';
import PersonalInfo from '@/components/about/PersonalInfo';
import ExperienceEducation from '@/components/about/ExperienceEducation';
import MethodologySection from '@/components/about/MethodologySection';
import CTASection from '@/components/about/CTASection';

// Import joke utilities instead of inspirational quotes
import { developerJokes, jokeResponses } from '@/components/about/JokeUtils';

const About: React.FC = () => {
  const [joke, setJoke] = useState<string>(developerJokes[0]);
  const [chatHistory, setChatHistory] = useState<Array<{type: string, message: string}>>([
    {type: 'ai', message: "Hi! I'm your developer joke bot. Ask me for a joke or chat about coding!"}
  ]);
  const [userMessage, setUserMessage] = useState<string>("");
  const { toast } = useToast();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Add refs for sections
  const contactSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add scroll observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Track all sections that should be animated
    document.querySelectorAll('section, .animate-on-scroll').forEach(section => {
      observer.observe(section);
    });

    // Handle scroll animation
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Apply parallax effect to elements with data-speed attribute
      document.querySelectorAll('[data-speed]').forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(window.scrollY * speed);
        const element3d = element as HTMLElement;
        element3d.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);

    // Handle hash navigation when the page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const navbar = document.querySelector('header');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
            window.scrollTo({top: y, behavior: 'smooth'});
          }
        }, 100);
      }
    };

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      // Cleanup observer and event listeners
      document.querySelectorAll('section, .animate-on-scroll').forEach(section => {
        observer.unobserve(section);
      });
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to get a random joke
  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * developerJokes.length);
    setJoke(developerJokes[randomIndex]);
    toast({
      title: "New Developer Joke",
      description: "Hope this makes you laugh!",
      duration: 3000,
    });
  };

  // Chatbot message handling
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userMessage.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, {type: 'user', message: userMessage}]);
    
    // Generate AI response with a developer joke
    setTimeout(() => {
      const intro = jokeResponses[Math.floor(Math.random() * jokeResponses.length)];
      const randomJoke = developerJokes[Math.floor(Math.random() * developerJokes.length)];
      
      setChatHistory(prev => [...prev, {type: 'ai', message: `${intro} "${randomJoke}"`}]);
    }, 500);
    
    setUserMessage("");
  };

  // Function to scroll to contact section
  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <ProfileHero 
            joke={joke}
            getRandomJoke={getRandomJoke}
            handleSendMessage={handleSendMessage}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
            chatHistory={chatHistory}
            scrollToContact={scrollToContact}
          />

          {/* Personal Info Section */}
          <PersonalInfo />

          {/* Experience & Education */}
          <ExperienceEducation />
          
          {/* My Approach Section */}
          <MethodologySection />
          
          {/* CTA Section */}
          <div ref={contactSectionRef}>
            <CTASection />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default About;
