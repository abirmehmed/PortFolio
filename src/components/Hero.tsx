
import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Twitter, Youtube, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AnimatedText from './AnimatedText';
import { useTheme } from './theme/ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import ProfileHeroPicture from './about/profileHero/ProfileHeroPicture';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState({});
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * 0.35; // Parallax effect intensity
      
      setParallaxStyle({
        transform: `translateY(${translateY}px)`,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: "Your resume download has been initiated.",
      duration: 3000,
    });

    // Create a temporary anchor element to download the file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the path to your actual resume file
    link.setAttribute('download', 'Abir_Mehmed_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      toast({
        title: "Note",
        description: "In a real production app, this would download an actual PDF file.",
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      id="hero"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute h-full w-full object-cover"
          style={{
            opacity: 0.12,
            ...parallaxStyle,
          }}
        >
          <source 
            src={theme === 'dark' 
              ? "https://cdn.pixabay.com/vimeo/694810380/code-119420.mp4?width=1280&hash=8c9e56fadd76fb5f53a6f8d00ae14af6e4367c32"
              : "https://cdn.pixabay.com/vimeo/597113845/programming-79772.mp4?width=1280&hash=8f50aca3b55ecfec1ede41b6d6a8df1cf7b2a41a" 
            } 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-detective-dark/70 via-detective-dark/90 to-detective-dark z-10 light-theme:from-white/70 light-theme:via-white/90 light-theme:to-white"></div>

      <div
        className="absolute inset-0 z-20 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--detective-accent) 1px, transparent 1px), linear-gradient(to right, var(--detective-accent) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
        }}
      />

      <div className="container relative z-30 px-4 mt-10 md:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            {/* Replaced with the enhanced ProfileHeroPicture component */}
            <ProfileHeroPicture 
              size="md" 
              showExperience={true}
              experienceYears={3}
            />
          </div>

          <div className={`mb-3 transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="inline-block px-3 py-1 text-sm font-medium text-detective-dark bg-detective-accent rounded-full">
              <AnimatedText text="Full-Stack Developer | Animation Wizard | Digital Detective" delay={500} />
            </span>
          </div>

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <AnimatedText
              text="Abir Mehmed"
              className="block text-gradient mb-2"
              delay={800}
            />
            <span className="block text-3xl md:text-5xl mt-2 text-balance">
              <AnimatedText
                text="Solving Digital Mysteries"
                className="relative"
                delay={1200}
              />
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <AnimatedText
              text="I investigate complex problems and craft elegant solutions using clean code and creative design."
              typewriter={true}
              delay={1600}
              speed={20}
            />
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button 
              onClick={scrollToProjects}
              className="bg-detective-accent hover:bg-detective-accent/90 text-detective-dark font-medium px-6 py-6 rounded-md transition-all hover:scale-105"
            >
              View Case Files
            </Button>
            <Button 
              variant="outline"
              onClick={handleDownloadResume}
              className="border-detective-accent/50 hover:border-detective-accent text-detective-accent hover:text-detective-accent/90 font-medium px-6 py-6 rounded-md transition-all hover:scale-105 flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </Button>
          </div>

          <div className={`flex justify-center space-x-8 mb-16 transition-all duration-700 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-detective-accent transition-colors transform hover:scale-110">
              <Linkedin size={22} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-detective-accent transition-colors transform hover:scale-110">
              <Github size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-detective-accent transition-colors transform hover:scale-110">
              <Twitter size={22} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-detective-accent transition-colors transform hover:scale-110">
              <Youtube size={22} />
            </a>
          </div>

          <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-subtle transition-all duration-700 delay-800 ${
            isLoaded ? 'opacity-60' : 'opacity-0'
          }`}>
            <ChevronDown size={28} className="text-detective-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
