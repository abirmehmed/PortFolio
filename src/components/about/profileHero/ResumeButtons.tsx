
import React from 'react';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ResumeButtonsProps {
  scrollToContact?: () => void;
}

const ResumeButtons: React.FC<ResumeButtonsProps> = ({ scrollToContact }) => {
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
    if (scrollToContact) {
      // Use the passed scroll function from parent
      scrollToContact();
    } else {
      // Fallback to scrolling to the contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If all else fails, open email client as last resort
        window.location.href = "mailto:abir.mehmed@example.com?subject=Inquiry from Portfolio";
      }
    }
  };

  return (
    <div className="space-x-3">
      <Button 
        onClick={handleDownloadResume} 
        className="bg-detective-accent hover:bg-detective-accent/90 text-detective-dark transition-all duration-300 shadow-md">
        <Download className="mr-2 h-4 w-4" />
        Download Resume
      </Button>
      <Button 
        onClick={handleContactMe}
        variant="outline" 
        className="border-detective-accent/50 text-detective-accent hover:border-detective-accent transition-all duration-300 shadow-md">
        <Mail className="mr-2 h-4 w-4" />
        Contact Me
      </Button>
    </div>
  );
};

export default ResumeButtons;
