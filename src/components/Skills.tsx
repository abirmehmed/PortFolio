
import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Layout, Laptop, Lightbulb, Braces, Globe, GanttChart, Smartphone, Bitcoin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  percentage: number;
  category: string;
}

// Updated skills categories
const frontendSkills: Skill[] = [
  { name: "React / Next.js", percentage: 92, category: "frontend" },
  { name: "TailwindCSS", percentage: 95, category: "frontend" },
  { name: "JavaScript / TypeScript", percentage: 90, category: "frontend" },
  { name: "Framer Motion / GSAP", percentage: 85, category: "frontend" },
];

const backendSkills: Skill[] = [
  { name: "Node.js / Express", percentage: 88, category: "backend" },
  { name: "API Development", percentage: 90, category: "backend" },
  { name: "SQL / NoSQL", percentage: 85, category: "backend" },
  { name: "Authentication & Security", percentage: 82, category: "backend" },
];

const uiuxSkills: Skill[] = [
  { name: "Figma / Adobe XD", percentage: 87, category: "uiux" },
  { name: "User Experience Design", percentage: 85, category: "uiux" },
  { name: "Responsive Design", percentage: 93, category: "uiux" },
  { name: "Animation & Interaction", percentage: 88, category: "uiux" },
];

const appDevSkills: Skill[] = [
  { name: "React Native", percentage: 84, category: "appdev" },
  { name: "Flutter", percentage: 78, category: "appdev" },
  { name: "iOS / Android", percentage: 75, category: "appdev" },
  { name: "App Store Optimization", percentage: 80, category: "appdev" },
];

const web3Skills: Skill[] = [
  { name: "Solidity / Smart Contracts", percentage: 82, category: "web3" },
  { name: "Web3.js / Ethers.js", percentage: 85, category: "web3" },
  { name: "DApp Development", percentage: 80, category: "web3" },
  { name: "Blockchain Integration", percentage: 78, category: "web3" },
];

interface SkillBarProps {
  skill: Skill;
  delay: number;
  isVisible: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, delay, isVisible }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className={cn(
          "text-sm font-medium transition-all duration-1000 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          {skill.percentage}%
        </span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full bg-detective-accent rounded-full transition-all duration-1000",
            isVisible ? "animate-progress-fill" : "w-0"
          )}
          style={{ 
            '--skill-percentage': `${skill.percentage}%`,
            transitionDelay: `${delay * 100}ms`
          } as React.CSSProperties}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("frontend");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  const getSkillsByCategory = () => {
    switch(activeTab) {
      case "frontend":
        return frontendSkills;
      case "backend":
        return backendSkills;
      case "uiux":
        return uiuxSkills;
      case "appdev":
        return appDevSkills;
      case "web3":
        return web3Skills;
      default:
        return frontendSkills;
    }
  };

  const getTabIcon = (tab: string) => {
    switch(tab) {
      case "frontend": return <Laptop size={22} />;
      case "backend": return <Database size={22} />;
      case "uiux": return <Layout size={22} />;
      case "appdev": return <Smartphone size={22} />;
      case "web3": return <Bitcoin size={22} />;
      default: return <Code size={22} />;
    }
  };

  const getTabTitle = (tab: string) => {
    switch(tab) {
      case "frontend": return "Frontend Forensics";
      case "backend": return "Backend Mysteries";
      case "uiux": return "UI/UX Profiling";
      case "appdev": return "App Development";
      case "web3": return "Web3 Development";
      default: return "";
    }
  };

  const getTabDescription = (tab: string) => {
    switch(tab) {
      case "frontend": return "User interfaces and client-side logic";
      case "backend": return "Servers, APIs, and data management";
      case "uiux": return "Design, prototyping, and user experience";
      case "appdev": return "Mobile app development for iOS and Android";
      case "web3": return "Blockchain and decentralized applications";
      default: return "";
    }
  };

  return (
    <section 
      id="skills" 
      className="py-20 md:py-28 bg-detective-muted/20 relative overflow-hidden light-theme:bg-gray-100"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-detective-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-detective-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <span className="text-detective-accent font-medium mb-2 inline-block">EXPERTISE</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="heading-accent">Skills Database</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of tools and technologies I've mastered throughout my 
              investigation career. Each skill has been thoroughly tested in real-world scenarios.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {["frontend", "backend", "uiux", "appdev", "web3"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "p-4 rounded-lg flex flex-col items-center text-center transition-all",
                  activeTab === tab 
                    ? "bg-card border border-detective-accent/20 shadow-lg" 
                    : "bg-transparent hover:bg-card/50"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all",
                  activeTab === tab ? "bg-detective-accent text-detective-dark" : "bg-muted/30 text-muted-foreground"
                )}>
                  {getTabIcon(tab)}
                </div>
                <h3 className="font-medium text-lg mb-1">{getTabTitle(tab)}</h3>
                <p className="text-sm text-muted-foreground">{getTabDescription(tab)}</p>
              </button>
            ))}
          </div>

          <div className={cn(
            "bg-card border border-border/40 rounded-lg p-6 md:p-8 shadow-lg transition-all duration-500 light-theme:bg-white",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            {getSkillsByCategory().map((skill, index) => (
              <SkillBar 
                key={skill.name} 
                skill={skill} 
                delay={index + 1} 
                isVisible={isVisible} 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { 
              icon: <Code />, 
              count: "10+", 
              label: "Programming Languages",
              delay: 1  
            },
            { 
              icon: <Globe />, 
              count: "30+", 
              label: "Projects Completed",
              delay: 2 
            },
            { 
              icon: <GanttChart />, 
              count: "5+", 
              label: "Years Experience",
              delay: 3  
            },
            { 
              icon: <Lightbulb />, 
              count: "99%", 
              label: "Client Satisfaction",
              delay: 4  
            },
          ].map((item, index) => (
            <div 
              key={index}
              className={cn(
                "detective-card flex flex-col items-center p-6 text-center transition-all duration-700 transform light-theme:bg-white",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${item.delay * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-detective-accent/10 flex items-center justify-center mb-4 text-detective-accent">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-1">{item.count}</h3>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
