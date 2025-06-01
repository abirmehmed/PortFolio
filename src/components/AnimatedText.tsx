
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  typewriter?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  speed = 50,
  onComplete,
  typewriter = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    
    const timer = setTimeout(() => {
      hasStarted.current = true;
      if (typewriter) {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        }, speed);
        
        return () => clearInterval(typingInterval);
      } else {
        setDisplayedText(text);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, delay, speed, onComplete, typewriter]);

  return (
    <span className={cn('inline-block', typewriter && 'typewriter', className)}>
      {displayedText}
    </span>
  );
};

export default AnimatedText;
