
import React from 'react';
import { ArrowRight, Download, Mail, Send, MapPin, Phone, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CTASection: React.FC = () => {
  const { toast } = useToast();

  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: "Your resume download has been initiated.",
      duration: 3000,
    });

    // Simulate a download - in a real app, replace with actual download link
    setTimeout(() => {
      toast({
        title: "Note",
        description: "This is a demo. In a real app, this would download an actual PDF file.",
        duration: 5000,
      });
    }, 2000);
  };

  const handleContactMe = () => {
    // Open email client as primary action
    window.location.href = "mailto:abir.mehmed@example.com?subject=Inquiry from Portfolio";
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden scroll-mt-24 bg-gradient-to-b from-transparent to-card/10">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 -mt-20 -ml-20 w-96 h-96 bg-detective-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-detective-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-detective-accent/20 to-detective-blue/10 rounded-full shadow-sm backdrop-blur-sm mb-4">
              <span className="text-sm font-medium text-detective-accent">LET'S CONNECT</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="heading-accent">Ready to Start Your Project?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's work together to transform your ideas into reality. Whether you need a complete web application, 
              a specific feature, or technical consultation, I'm here to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-detective-accent/20 bg-card/50 backdrop-blur-sm shadow-xl h-full rounded-xl overflow-hidden">
                <CardHeader className="border-b border-border/10 bg-gradient-to-r from-detective-dark/30 to-transparent">
                  <CardTitle className="text-xl md:text-2xl font-bold text-gradient">
                    Get in Touch
                  </CardTitle>
                  <CardDescription className="text-base">
                    Have a question or want to work together?
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-6">
                  <ContactItem 
                    icon={Mail} 
                    title="Email" 
                    details="abir.mehmed@example.com"
                    action={handleContactMe}
                  />
                  
                  <ContactItem 
                    icon={Phone} 
                    title="Phone" 
                    details="+1 (555) 123-4567"
                  />
                  
                  <ContactItem 
                    icon={MapPin} 
                    title="Location" 
                    details="San Francisco, CA"
                  />
                  
                  <ContactItem 
                    icon={CalendarDays} 
                    title="Availability" 
                    details="Monday - Friday, 9am - 6pm PST"
                  />
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-detective-accent to-detective-blue hover:opacity-90 text-detective-dark font-medium mt-4"
                    onClick={handleContactMe}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
                
                <CardFooter className="border-t border-border/30 pt-4 text-sm text-muted-foreground bg-card/30">
                  Response time: Usually within 24 hours
                </CardFooter>
              </Card>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-3">
              <Card className="border-detective-accent/20 bg-card/50 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="border-b border-border/10 bg-gradient-to-r from-detective-dark/30 to-transparent">
                  <CardTitle className="text-xl md:text-2xl font-bold text-gradient">
                    Project Details
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form to discuss your project needs
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full p-3 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-detective-accent/30 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="w-full p-3 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-detective-accent/30 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="Project Inquiry"
                        className="w-full p-3 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-detective-accent/30 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full p-3 bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-detective-accent/30 resize-none transition-all duration-300"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-3">
                      <Button 
                        variant="outline"
                        onClick={handleDownloadResume}
                        className="border-detective-accent/50 hover:border-detective-accent text-detective-accent transition-all duration-300"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Button>
                      
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-detective-accent to-detective-blue hover:opacity-90 text-detective-dark font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Message Sent",
                            description: "Thank you for your message! I'll get back to you soon.",
                            duration: 5000,
                          });
                        }}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: React.FC<any>;
  title: string;
  details: string;
  action?: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, title, details, action }) => {
  return (
    <div 
      className={`flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 ${action ? 'cursor-pointer hover:bg-detective-accent/10' : ''}`}
      onClick={action}
    >
      <div className="p-2 bg-detective-accent/10 rounded-full text-detective-accent">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground">{details}</p>
      </div>
    </div>
  );
};

export default CTASection;
