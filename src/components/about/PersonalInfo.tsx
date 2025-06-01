
import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PersonalInfo: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-card/5 to-card/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="heading-accent">About Me</span>
          </h2>
          
          <Card className="bg-card/50 backdrop-blur-sm border border-border/30 shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-border/10 bg-gradient-to-r from-detective-dark/50 to-transparent">
              <CardTitle className="text-xl flex items-center gap-3 text-gradient">
                <div className="w-10 h-10 rounded-full bg-detective-accent/20 flex items-center justify-center text-detective-accent">
                  <User className="h-5 w-5" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-6">
                  <InfoItem 
                    icon={User} 
                    label="Full Name" 
                    value="Abir Mehmed" 
                  />
                  
                  <InfoItem 
                    icon={Mail} 
                    label="Email" 
                    value="abir.mehmed@example.com" 
                    isLink 
                    href="mailto:abir.mehmed@example.com" 
                  />
                  
                  <InfoItem 
                    icon={Phone} 
                    label="Phone" 
                    value="+1 (555) 123-4567" 
                    isLink 
                    href="tel:+15551234567" 
                  />
                </div>
                
                <div className="space-y-6">
                  <InfoItem 
                    icon={MapPin} 
                    label="Location" 
                    value="San Francisco, CA" 
                  />
                  
                  <InfoItem 
                    icon={Calendar} 
                    label="Availability" 
                    value="Available for Hire" 
                    highlightValue 
                  />
                  
                  <InfoItem 
                    icon={Heart} 
                    label="Interests" 
                    value="Tech, Chess, Photography" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

interface InfoItemProps {
  icon: React.FC<any>;
  label: string;
  value: string;
  isLink?: boolean;
  href?: string;
  highlightValue?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  isLink = false, 
  href = '#',
  highlightValue = false
}) => {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="w-10 h-10 rounded-full bg-detective-accent/10 flex items-center justify-center flex-shrink-0 text-detective-accent shadow-sm group-hover:bg-detective-accent/20 transition-all duration-300">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm text-muted-foreground mb-1">{label}</h4>
        {isLink ? (
          <a 
            href={href}
            className="text-foreground hover:text-detective-accent transition-colors duration-300 group-hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className={cn(
            "text-foreground",
            highlightValue && "text-detective-accent font-medium"
          )}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
