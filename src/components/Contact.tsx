
import React, { useState, useEffect, useRef } from 'react';
import ContactHeading from './contact/ContactHeading';
import ContactInfo from './contact/ContactInfo';
import ContactForm from './contact/ContactForm';

const Contact = () => {
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
      id="contact" 
      className="py-20 md:py-28 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 -mt-20 -ml-20 w-96 h-96 bg-detective-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-detective-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <ContactHeading isVisible={isVisible} />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <ContactInfo isVisible={isVisible} />
          <ContactForm isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
