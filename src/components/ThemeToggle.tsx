
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme/ThemeProvider';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full transition-all duration-300 hover:bg-detective-accent/10 relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {theme === 'dark' ? (
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-5 w-5 text-detective-accent absolute" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-5 w-5 text-detective-accent absolute" />
          </motion.div>
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
