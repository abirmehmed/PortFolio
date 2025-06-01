
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, FileCode, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useToast } from "@/hooks/use-toast";

// Fallback image to use when project images fail to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop";

// Projects array - no need to modify this
const projects = [
  {
    id: 1,
    title: "Mini E-Commerce API + Frontend",
    description: "A complete e-commerce solution with product management, shopping cart, and user authentication capabilities.",
    tags: ["React", "Node.js", "MySQL", "JWT Auth"],
    image: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?q=80&w=2665&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Product CRUD", "Cart System", "JWT Auth", "Search Filters"]
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description: "End-to-end encrypted chat platform with real-time messaging, file sharing, and video calls.",
    tags: ["WebSocket", "Firebase", "React", "TypeScript"],
    image: FALLBACK_IMAGE, // Use fallback image directly for problematic URLs
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Real-time Messaging", "File Sharing", "End-to-End Encryption", "User Presence"]
  },
  {
    id: 3,
    title: "Portfolio Generator",
    description: "AI-powered tool that helps developers create stunning portfolios with minimal effort.",
    tags: ["Next.js", "TailwindCSS", "OpenAI API", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["AI Text Generation", "Template Library", "Custom Animations", "SEO Optimization"]
  },
  {
    id: 4,
    title: "Blockchain Wallet App",
    description: "A secure cryptocurrency wallet with multi-chain support and NFT management.",
    tags: ["Web3.js", "React", "Ethers.js", "Solidity"],
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2332&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Multi-chain Support", "NFT Gallery", "Transaction History", "Gas Fee Estimator"]
  },
  {
    id: 5,
    title: "AI Image Generator",
    description: "Create stunning AI-generated images with text prompts using the latest diffusion models.",
    tags: ["Python", "React", "TensorFlow", "Flask"],
    image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?q=80&w=2832&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    features: ["Text-to-Image", "Style Transfer", "Batch Processing", "Custom Presets"]
  }
];

const ProjectCarousel = () => {
  // Setup the embla carousel with improved options for seamless looping
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      containScroll: 'keepSnaps',
      dragFree: true,
      skipSnaps: false, // Ensures we don't skip slides during fast drags
      inViewThreshold: 0.7 // How much of a slide should be visible to be considered in view
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Navigation handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Mouse handlers for hover interactions
  const handleMouseEnter = useCallback(() => {
    setHoverPaused(true);
    emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    setHoverPaused(false);
    emblaApi?.plugins()?.autoplay?.play();
  }, [emblaApi]);

  // Update active slide index on slide change with proper looping behavior
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      // Get the current index properly in loop mode
      const index = emblaApi.selectedScrollSnap();
      setActiveIndex(index);
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Initial call to set the active index
    onSelect();

    // Set loading to false after initialization
    setIsLoading(false);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  // Function to calculate distance between indexes in a circular array
  const getCircularDistance = (index1, index2, arrayLength) => {
    // Calculate both clockwise and counterclockwise distances
    const clockwiseDistance = (index2 - index1 + arrayLength) % arrayLength;
    const counterClockwiseDistance = (index1 - index2 + arrayLength) % arrayLength;
    
    // Return the smaller of the two distances
    return Math.min(clockwiseDistance, counterClockwiseDistance);
  };

  // Handle image error
  const handleImageError = (projectId, imageUrl) => {
    console.warn(`Failed to load image for project ${projectId}:`, imageUrl);
    // Show toast notification only once
    toast({
      title: "Image Loading Issue",
      description: "Some project images couldn't be loaded and have been replaced with fallback images.",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 relative">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50">
          <div className="w-16 h-16 border-4 border-detective-accent/30 border-t-detective-accent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Navigation buttons - improved styling and positioning */}
      <button 
        onClick={scrollPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-detective-dark/80 hover:bg-detective-accent text-white rounded-full p-2 transition-all duration-300 shadow-lg hover:scale-110"
        aria-label="Previous project"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={scrollNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-detective-dark/80 hover:bg-detective-accent text-white rounded-full p-2 transition-all duration-300 shadow-lg hover:scale-110"
        aria-label="Next project"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Carousel container */}
      <div 
        className="overflow-hidden" 
        ref={emblaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex">
          {projects.map((project, index) => {
            // Calculate circular distance for a truly cyclic effect
            const distance = getCircularDistance(index, activeIndex, projects.length);
            
            return (
              <div 
                key={project.id} 
                className={cn(
                  "flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_28%] min-w-0 px-4 transition-all duration-500",
                  {
                    "z-20": distance === 0, // Active item gets highest z-index
                    "z-10": distance === 1, // Adjacent items get middle z-index
                    "z-0": distance > 1,    // Further items get lowest z-index
                  }
                )}
                style={{
                  transform: `scale(${1 - distance * 0.1})`, // Scale down based on distance
                  opacity: 1 - distance * 0.2,               // Fade out based on distance
                  filter: distance > 0 ? `blur(${distance * 0.5}px)` : 'none', // Add blur effect for non-active items
                }}
              >
                <Card className={cn(
                  "detective-card h-full overflow-hidden transition-all duration-500 hover:shadow-detective-accent/30 hover:shadow-xl group",
                  hoverPaused && "cursor-pointer"
                )}>
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-detective-dark to-transparent z-10"></div>
                    {/* Improved image loading with better error handling */}
                    <img 
                      key={`project-image-${project.id}`}
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                        handleImageError(project.id, project.image);
                      }}
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-detective-accent/90 text-detective-dark">
                        Case #{project.id}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-start gap-2">
                      <FileCode className="flex-shrink-0 text-detective-accent mt-1" size={20} />
                      <span>{project.title}</span>
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold mb-2 text-detective-accent">Key Findings:</h4>
                      <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="text-sm flex items-center">
                            <span className="w-1.5 h-1.5 bg-detective-accent rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-muted/30">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-detective-accent hover:text-detective-accent/80 transition-colors"
                      >
                        <Github size={16} className="mr-1" />
                        Source Code
                      </a>
                      
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-detective-blue hover:text-detective-blue/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Live Demo
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Improved progress indicators with active project number */}
      <div className="flex flex-col items-center mt-6 gap-2">
        <p className="text-sm text-muted-foreground mb-2">
          Case {activeIndex + 1} of {projects.length}
        </p>
        <div className="flex justify-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                idx === activeIndex 
                  ? "bg-detective-accent scale-125" 
                  : "bg-muted hover:bg-detective-accent/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
