
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectCarousel from '@/components/ProjectCarousel';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Index: React.FC = () => {
  useEffect(() => {
    // Easter egg console message
    console.log("%c 🔍 Detective Portfolio", "font-size: 24px; font-weight: bold; color: #E2A845;");
    console.log("%c You've found the secret message! You have great detective skills.", "font-size: 16px; color: #33c5ff;");
    
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
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      // Cleanup observer
      document.querySelectorAll('section').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          
          {/* About section placeholder - we'll simulate an about section with an ID for navigation */}
          <div id="about" className="h-0 invisible"></div>
          
          <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-detective-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-detective-blue/5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4">
              <div className="text-center mb-14">
                <span className="text-detective-accent font-medium mb-2 inline-block">CONFIDENTIAL</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="heading-accent">Case Files</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A collection of my most successful investigations. Each case demonstrates problem-solving skills 
                  and technical expertise across different domains.
                </p>
              </div>
              
              {/* Project carousel component */}
              <ProjectCarousel />
            </div>
          </section>

          <Skills />
          
          {/* New Ready to Start Section before Contact */}
          <section className="py-20 md:py-24 relative overflow-hidden bg-detective-dark/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-detective-accent/5 to-detective-blue/5"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-detective-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-detective-blue/10 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 bg-detective-accent/20 text-detective-accent rounded-full text-sm font-medium mb-4">
                  READY TO SOLVE YOUR NEXT MYSTERY?
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
                  Let's Start Your Next Digital Adventure
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Whether you need a website, application, or digital solution, I'm ready to bring your vision to life with clean code and creative design.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button 
                    onClick={scrollToContact}
                    size="lg"
                    className="bg-detective-accent hover:bg-detective-accent/90 text-detective-dark font-medium px-8 py-7 rounded-md transition-all hover:scale-105 text-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Start a Project
                  </Button>
                </div>
                
                {/* Decorative elements */}
                <div className="mt-16 flex justify-center">
                  <div className="relative w-24 h-1.5">
                    <div className="absolute inset-0 bg-gradient-to-r from-detective-accent to-detective-blue rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-detective-accent to-detective-blue rounded-full animate-pulse-subtle"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
