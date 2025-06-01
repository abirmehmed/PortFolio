
import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, FileCode, PenTool, Database, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    image: "https://images.unsplash.com/photo-1611746869696-b528c2dc4561?q=80&w=2670&auto=format&fit=crop",
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
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, index * 200); // Staggered animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "detective-card overflow-hidden transition-all duration-700 opacity-0 translate-y-10",
        isVisible && "opacity-100 translate-y-0"
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-detective-dark to-transparent z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-detective-accent/90 text-detective-dark">
            Case #{project.id}
          </span>
        </div>
      </div>

      <div className="p-6">
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
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      className="py-20 md:py-28 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-detective-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-detective-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className={cn(
            "transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="text-detective-accent font-medium mb-2 inline-block">CONFIDENTIAL</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="heading-accent">Case Files</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my most successful investigations. Each case demonstrates problem-solving skills 
              and technical expertise across different domains.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className={cn(
          "mt-12 text-center transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-10"
        )}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-detective-accent hover:text-detective-accent/80 transition-colors"
          >
            <span>View more case files</span>
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
