import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Accessibility, CircleOff, Monitor, Moon, Sun, ZoomIn, ZoomOut, Eye } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

const AccessibilityMenu = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
      toast({
        title: "Font Size Increased",
        description: `Font size set to ${newSize}%`,
      });
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > 70) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
      toast({
        title: "Font Size Decreased",
        description: `Font size set to ${newSize}%`,
      });
    }
  };
  
  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
    toast({
      title: "Font Size Reset",
      description: "Font size restored to default",
    });
  };
  
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add('high-contrast');
      toast({
        title: "High Contrast Mode Enabled",
        description: "Visual contrast has been increased",
      });
    } else {
      document.documentElement.classList.remove('high-contrast');
      toast({
        title: "High Contrast Mode Disabled",
        description: "Visual contrast has been restored to default",
      });
    }
  };
  
  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    if (!reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      toast({
        title: "Reduced Motion Enabled",
        description: "Animations have been minimized",
      });
    } else {
      document.documentElement.classList.remove('reduced-motion');
      toast({
        title: "Reduced Motion Disabled",
        description: "Animations have been restored",
      });
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Accessibility options">
          <Accessibility className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">Theme</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => toggleTheme()}>
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">Text Size</DropdownMenuLabel>
          <DropdownMenuItem onClick={increaseFontSize}>
            <ZoomIn className="mr-2 h-4 w-4" />
            <span>Increase Text Size</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={decreaseFontSize}>
            <ZoomOut className="mr-2 h-4 w-4" />
            <span>Decrease Text Size</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={resetFontSize}>
            <CircleOff className="mr-2 h-4 w-4" />
            <span>Reset Text Size</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">Visual Preferences</DropdownMenuLabel>
          <DropdownMenuItem onClick={toggleHighContrast}>
            <Eye className="mr-2 h-4 w-4" />
            <span>{highContrast ? "Disable" : "Enable"} High Contrast</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleReducedMotion}>
            <CircleOff className="mr-2 h-4 w-4" />
            <span>{reducedMotion ? "Enable" : "Reduce"} Motion</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityMenu;
