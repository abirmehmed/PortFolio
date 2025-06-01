
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from 'react';

const ProfileHeroInfo: React.FC = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('abir.mehmed@example.com');
    setCopied(true);
    
    toast({
      title: "Email Copied!",
      description: "Email address copied to clipboard for easy contact",
      duration: 3000,
    });
    
    // Reset copy state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-detective-accent/20 to-detective-blue/10 rounded-full shadow-sm backdrop-blur-sm">
        <span className="text-sm font-medium text-detective-accent">About Me</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
        Abir Mehmed
      </h1>
      
      <p className="text-xl md:text-2xl font-medium mb-4 text-detective-accent">
        Digital Detective & Full-Stack Developer
      </p>
      
      <p className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
        I'm a passionate full-stack developer with over 3 years of experience solving complex digital mysteries. 
        I specialize in creating elegant solutions for challenging problems, using creativity and technical expertise.
      </p>
      
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm"
                variant="outline" 
                onClick={copyEmailToClipboard}
                className="gap-2 text-sm bg-card/50 border-detective-accent/30 hover:bg-detective-accent/10 transition-all duration-300 shadow-sm"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-detective-accent" />
                )}
                <span className="hidden sm:inline">abir.mehmed@example.com</span>
                <span className="sm:hidden">Email</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy email address</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="text-sm text-muted-foreground italic">
          {copied ? "Copied!" : "Email me directly"}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroInfo;
