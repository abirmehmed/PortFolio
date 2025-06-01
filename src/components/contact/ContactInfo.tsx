
import React from 'react';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactInfoProps {
  isVisible: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isVisible }) => {
  return (
    <div className={cn(
      "lg:col-span-2 transition-all duration-700",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
    )}>
      <div className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg p-6 md:p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold mb-8 border-b border-detective-accent/20 pb-3 text-gradient">Contact Information</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-detective-accent/10 flex items-center justify-center flex-shrink-0 text-detective-accent mt-1">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="font-medium mb-1">Location</h4>
              <p className="text-muted-foreground">San Francisco, CA, United States</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-detective-accent/10 flex items-center justify-center flex-shrink-0 text-detective-accent mt-1">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="font-medium mb-1">Email</h4>
              <a href="mailto:abir.mehmed@example.com" className="text-muted-foreground hover:text-detective-accent transition-colors">
                abir.mehmed@example.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-detective-accent/10 flex items-center justify-center flex-shrink-0 text-detective-accent mt-1">
              <Phone size={18} />
            </div>
            <div>
              <h4 className="font-medium mb-1">Phone</h4>
              <a href="tel:+15551234567" className="text-muted-foreground hover:text-detective-accent transition-colors">
                +1 (555) 123-4567
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-detective-accent/10 flex items-center justify-center flex-shrink-0 text-detective-accent mt-1">
              <Calendar size={18} />
            </div>
            <div>
              <h4 className="font-medium mb-1">Availability</h4>
              <p className="text-muted-foreground">Monday-Friday, 9AM-5PM PST</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4 italic">
              "Every great mystery starts with a simple question. Don't hesitate to reach out."
            </p>
            
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-detective-accent hover:scale-105 transition-all duration-300 shadow-lg mx-auto">
              <img
                src="/lovable-uploads/7e46e234-a227-4085-bd55-f04d0ab2e1dd.png"
                alt="Abir Mehmed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
