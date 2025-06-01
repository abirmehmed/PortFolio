
import React from 'react';

const ExperienceEducation: React.FC = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div className="animate-on-scroll">
            <div className="mb-8 text-center lg:text-left">
              <span className="text-detective-accent font-medium mb-2 inline-block">MY PATH</span>
              <h2 className="text-3xl font-bold mb-4">
                <span className="heading-accent">Professional Experience</span>
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-detective-accent/30">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-detective-accent"></div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-detective-accent/10 text-detective-accent mb-2">2020 - Present</span>
                <h3 className="text-xl font-bold mb-1">Senior Full-Stack Developer</h3>
                <p className="text-detective-blue mb-2">TechSolutions Inc.</p>
                <p className="text-muted-foreground">Led a team of 5 developers in creating enterprise-level applications with React, Node.js, and AWS infrastructure.</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-detective-accent/30">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-detective-accent"></div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-detective-accent/10 text-detective-accent mb-2">2017 - 2020</span>
                <h3 className="text-xl font-bold mb-1">Frontend Developer</h3>
                <p className="text-detective-blue mb-2">WebCraft Studios</p>
                <p className="text-muted-foreground">Developed responsive, accessible websites for clients across various industries using modern JavaScript frameworks.</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-detective-accent/30">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-detective-accent"></div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-detective-accent/10 text-detective-accent mb-2">2015 - 2017</span>
                <h3 className="text-xl font-bold mb-1">Junior Developer</h3>
                <p className="text-detective-blue mb-2">DigitalCraft Agency</p>
                <p className="text-muted-foreground">Started my journey building web applications and learning the fundamentals of full-stack development.</p>
              </div>
            </div>
          </div>
          
          {/* Education */}
          <div className="animate-on-scroll">
            <div className="mb-8 text-center lg:text-left">
              <span className="text-detective-accent font-medium mb-2 inline-block">MY LEARNING</span>
              <h2 className="text-3xl font-bold mb-4">
                <span className="heading-accent">Education & Certification</span>
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-detective-blue/30">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-detective-blue"></div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-detective-blue/10 text-detective-blue mb-2">2013 - 2015</span>
                <h3 className="text-xl font-bold mb-1">Master's in Computer Science</h3>
                <p className="text-detective-accent mb-2">Stanford University</p>
                <p className="text-muted-foreground">Specialized in Web Technologies and Cloud Computing with honors.</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-detective-blue/30">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-detective-blue"></div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-detective-blue/10 text-detective-blue mb-2">2009 - 2013</span>
                <h3 className="text-xl font-bold mb-1">Bachelor's in Computer Engineering</h3>
                <p className="text-detective-accent mb-2">MIT</p>
                <p className="text-muted-foreground">Graduated with high distinction, focusing on software engineering principles.</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-detective-blue/30">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-detective-blue"></div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-detective-blue/10 text-detective-blue mb-2">2018 - 2019</span>
                <h3 className="text-xl font-bold mb-1">AWS Certified Solutions Architect</h3>
                <p className="text-detective-accent mb-2">Amazon Web Services</p>
                <p className="text-muted-foreground">Professional certification in designing distributed systems on AWS.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceEducation;
