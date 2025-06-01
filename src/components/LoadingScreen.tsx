
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading amazing content..." 
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-detective-accent/30 border-t-detective-accent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-detective-accent">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-muted-foreground">{message}</p>
      <div className="mt-6 max-w-md text-center">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-detective-accent animate-progress-indeterminate"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
