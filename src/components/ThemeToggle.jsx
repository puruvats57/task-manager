import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = React.memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-20 w-20 md:h-24 md:w-24 rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-primary/50 hover:bg-background/80 hover:shadow-xl active:scale-95 shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-200" />
      ) : (
        <Sun className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-200" />
      )}
    </Button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
