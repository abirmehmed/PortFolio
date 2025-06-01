
import React from 'react';
import { cn } from '@/lib/utils';

interface ContactHeadingProps {
  isVisible: boolean;
}

const ContactHeading: React.FC<ContactHeadingProps> = ({ isVisible }) => {
  return (
    <div className="text-center mb-16">
      <div className={cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <span className="text-detective-accent font-medium mb-2 inline-block">GET IN TOUCH</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="heading-accent">Let's Connect</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or want to discuss potential collaborations? Reach out and let's discuss how we can work together to
          find the perfect solution for your digital challenges.
        </p>
      </div>
    </div>
  );
};

export default ContactHeading;
