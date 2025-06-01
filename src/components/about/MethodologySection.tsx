
import React from 'react';

const MethodologySection: React.FC = () => {
  return (
    <section className="py-16 bg-detective-dark/60 light-theme:bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-detective-accent font-medium mb-2 inline-block">MY METHODOLOGY</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="heading-accent">How I Solve Digital Mysteries</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I approach each project as a mystery to be solved, using systematic investigation and creative problem-solving.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="detective-card p-6 animate-on-scroll">
            <div className="w-12 h-12 bg-detective-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-detective-accent">01</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Investigation</h3>
            <p className="text-muted-foreground">I begin by thoroughly understanding the problem space, gathering requirements, and researching potential solutions.</p>
          </div>
          
          <div className="detective-card p-6 animate-on-scroll">
            <div className="w-12 h-12 bg-detective-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-detective-accent">02</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Analysis</h3>
            <p className="text-muted-foreground">I analyze the gathered information, identify patterns, and determine the most effective approach to solving the problem.</p>
          </div>
          
          <div className="detective-card p-6 animate-on-scroll">
            <div className="w-12 h-12 bg-detective-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-detective-accent">03</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Solution Design</h3>
            <p className="text-muted-foreground">I design a comprehensive solution architecture that addresses all requirements and anticipates future needs.</p>
          </div>
          
          <div className="detective-card p-6 animate-on-scroll">
            <div className="w-12 h-12 bg-detective-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-detective-accent">04</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Implementation</h3>
            <p className="text-muted-foreground">I bring the solution to life using clean, maintainable code and best practices in software development.</p>
          </div>
          
          <div className="detective-card p-6 animate-on-scroll">
            <div className="w-12 h-12 bg-detective-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-detective-accent">05</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Testing</h3>
            <p className="text-muted-foreground">I rigorously test the solution to ensure it meets all requirements and functions flawlessly across all scenarios.</p>
          </div>
          
          <div className="detective-card p-6 animate-on-scroll">
            <div className="w-12 h-12 bg-detective-accent/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-detective-accent">06</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Refinement</h3>
            <p className="text-muted-foreground">I continuously improve and refine the solution based on feedback, new insights, and changing requirements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
