'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Palette, 
  ChevronDown,
  Sparkles,
  Leaf,
  Zap
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const themeIcons = {
  'default': Monitor,
  'cyberpunk': Zap,
  'nature': Leaf,
} as const;

const modeIcons = {
  light: Sun,
  dark: Moon,
} as const;

export default function ThemeToggle() {
  const { theme, setTheme, availableThemes, cycleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentThemeName = theme?.replace('-light', '').replace('-dark', '') as keyof typeof themeIcons;
  const currentMode = theme?.includes('dark') ? 'dark' : 'light';
  const ThemeIcon = themeIcons[currentThemeName] || Monitor;
  const ModeIcon = modeIcons[currentMode];

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Quick toggle button */}
      <motion.button
        onClick={cycleTheme}
        className="p-2 rounded-lg bg-secondary/80 backdrop-blur-sm border border-border/50 hover:bg-secondary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Cycle themes"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1"
        >
          <ThemeIcon className="w-4 h-4" />
          <ModeIcon className="w-3 h-3" />
        </motion.div>
      </motion.button>

      {/* Advanced theme selector */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 p-2 rounded-lg bg-secondary/80 backdrop-blur-sm border border-border/50 hover:bg-secondary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Theme options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Theme dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Choose Theme</h3>
                </div>
                
                <div className="grid gap-2 max-h-80 overflow-y-auto">
                  {availableThemes.map((themeOption) => {
                    const themeName = themeOption.id.replace('-light', '').replace('-dark', '') as keyof typeof themeIcons;
                    const mode = themeOption.id.includes('dark') ? 'dark' : 'light';
                    const Icon = themeIcons[themeName] || Monitor;
                    const MIcon = modeIcons[mode];
                    const isActive = theme === themeOption.id;
                    
                    return (
                      <motion.button
                        key={themeOption.id}
                        onClick={() => handleThemeSelect(themeOption.id)}
                        className={`
                          relative p-3 rounded-lg text-left transition-all duration-200
                          ${isActive 
                            ? 'bg-primary/10 border-primary/20 border' 
                            : 'hover:bg-muted/50 border border-transparent'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 p-2 rounded-md bg-muted/30">
                            <Icon className="w-4 h-4" />
                            <MIcon className="w-3 h-3" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{themeOption.name}</span>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex items-center"
                                >
                                  <Sparkles className="w-3 h-3 text-primary" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {themeOption.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Theme preview colors */}
                        <div className="flex gap-1 mt-2">
                          {['primary', 'secondary', 'accent'].map((color) => (
                            <div
                              key={color}
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ 
                                backgroundColor: `var(--color-${color})` 
                              }}
                            />
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
