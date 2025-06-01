
import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileHeroPictureProps {
  borderColorIndex?: number;
  borderColors?: string[];
  size?: 'sm' | 'md' | 'lg';
  showExperience?: boolean;
  experienceYears?: number;
  imageUrl?: string;
}

const ProfileHeroPicture: React.FC<ProfileHeroPictureProps> = ({ 
  borderColorIndex = 0, 
  borderColors = ['border-detective-accent', 'border-detective-blue', 'border-purple-400', 'border-teal-400'],
  size = 'lg',
  showExperience = true,
  experienceYears = 3,
  imageUrl = "/lovable-uploads/7e46e234-a227-4085-bd55-f04d0ab2e1dd.png"
}) => {
  const [currentBorderColorIndex, setCurrentBorderColorIndex] = useState(borderColorIndex);
  
  useEffect(() => {
    // Create a smooth border color animation with longer intervals
    const colorInterval = setInterval(() => {
      setCurrentBorderColorIndex(prevIndex => (prevIndex + 1) % borderColors.length);
    }, 4000); // Slower transition for a more elegant effect
    
    return () => clearInterval(colorInterval);
  }, [borderColors.length]);

  const currentBorderColor = borderColors[currentBorderColorIndex];
  
  // Size classes mapping
  const sizeClasses = {
    sm: "w-28 h-28",
    md: "w-40 h-40",
    lg: "w-64 h-64"
  };

  // Badge size classes mapping
  const badgeSizeClasses = {
    sm: "w-10 h-10 text-xs -bottom-2 -right-2",
    md: "w-12 h-12 text-sm -bottom-2 -right-2",
    lg: "w-14 h-14 text-sm -bottom-2 -right-2"
  };

  return (
    <div className="relative">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden ${currentBorderColor} shadow-lg transition-all duration-2000 ease-in-out`}>
        {/* Gradient overlay for a more professional look */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10"></div>
        
        {/* Animated border with subtle glow effect */}
        <div className={`absolute -inset-1 rounded-full ${currentBorderColor} opacity-75 blur-sm transition-all duration-2000 animate-pulse-subtle`}></div>
        
        {/* Border container with padding */}
        <div className={`absolute inset-0 rounded-full border-4 ${currentBorderColor} transition-all duration-2000`}></div>
        
        {/* Image container */}
        <div className="absolute inset-[5px] rounded-full overflow-hidden">
          <img 
            src={imageUrl}
            alt="Abir Mehmed" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {showExperience && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`absolute ${badgeSizeClasses[size]} bg-gradient-to-br from-detective-accent to-detective-blue text-white font-bold rounded-full flex items-center justify-center border-2 border-background shadow-xl animate-float transition-colors duration-1000`}>
                <span className="relative z-10">{experienceYears}+</span>
                {/* Add subtle gradient animation to the experience badge */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-detective-accent via-detective-blue to-detective-accent bg-size-200 animate-gradient-x opacity-80"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-detective-accent/90 text-detective-dark border-none">
              <p>{experienceYears}+ years of experience</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProfileHeroPicture;
