
import React from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

const VideoBackground: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute h-full w-full object-cover opacity-10"
        >
          <source 
            src={theme === 'dark' 
              ? "https://cdn.pixabay.com/vimeo/368266928/hacker-29917.mp4?width=1280&hash=7bd5a90f54ce8c7bd8adfff0b46e5d5eb8b2fdd2" 
              : "https://cdn.pixabay.com/vimeo/149878162/laptop-1237.mp4?width=1280&hash=4b1d04ca32f2dc1e941c97a08e0a011d5dd02cad"
            } 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="absolute inset-0 bg-detective-dark z-0 opacity-40 light-theme:opacity-5"></div>
    </>
  );
};

export default VideoBackground;
