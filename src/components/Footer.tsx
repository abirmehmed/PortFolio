
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Youtube, Heart, Code, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const handleEasterEggClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setTimeout(() => setIsRevealed(false), 5000);
    }
  };

  return (
    <footer className="bg-detective-muted/30 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-detective-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16">
            <div className="mb-6 md:mb-0">
              <a 
                href="#" 
                className="text-lg font-bold flex items-center space-x-2"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="text-2xl text-detective-accent">D</span>
                <span className="text-xl">Detective</span>
                <span className="text-xl text-detective-accent">Portfolio</span>
              </a>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:animate-pulse-glow">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:animate-pulse-glow">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:animate-pulse-glow">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon hover:animate-pulse-glow">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-detective-accent font-medium mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('hero');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('about');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('projects');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('skills');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-detective-accent font-medium mb-4">Case Files</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    E-Commerce Project
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Real-time Chat App
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Portfolio Generator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    All Projects
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-detective-accent font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Code Snippets
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-detective-accent font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">San Francisco, CA</li>
                <li>
                  <a href="mailto:detective@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    detective@example.com
                  </a>
                </li>
                <li>
                  <a href="tel:+15555555555" className="text-muted-foreground hover:text-foreground transition-colors">
                    +1 (555) 555-5555
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-muted/30 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Detective Portfolio. All rights reserved.
            </p>
            
            <div className="flex items-center">
              <div 
                className="inline-flex items-center relative mr-6 cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleEasterEggClick}
              >
                <p className="text-sm text-muted-foreground group-hover:text-detective-accent transition-colors">
                  Made with <Heart size={14} className="inline mx-1 text-detective-accent animate-pulse" /> and a dash of detective work
                </p>
                
                {/* Easter egg magnifying glass effect */}
                {isHovered && (
                  <div 
                    className="fixed w-24 h-24 rounded-full border-2 border-detective-accent pointer-events-none z-50 hidden md:block"
                    style={{
                      left: `${mousePosition.x - 48}px`,
                      top: `${mousePosition.y - 48}px`,
                      background: 'radial-gradient(circle, transparent 30%, rgba(18, 24, 38, 0.9) 70%)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(226, 168, 69, 0.3)'
                    }}
                  />
                )}
                
                {/* Easter egg reveal */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 transform transition-all duration-500 bg-detective-accent/80 backdrop-blur-sm text-detective-dark p-2 rounded text-sm",
                  isRevealed 
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0 pointer-events-none"
                )}>
                  <p>You've found a clue! Check the console...</p>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-b-detective-accent/80 border-l-transparent border-r-transparent"></div>
                </div>
              </div>
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm flex items-center text-muted-foreground hover:text-detective-accent transition-colors"
              >
                <Code size={14} className="mr-1" />
                <span>Source</span>
                <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
