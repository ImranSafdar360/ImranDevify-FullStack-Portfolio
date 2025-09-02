'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Theme, themes, applyTheme, getTheme } from '@/lib/themes';

export interface UseThemeReturn {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  systemTheme: string | undefined;
  currentTheme: Theme | null;
  availableThemes: Array<{ id: string; name: string; description: string }>;
  cycleTheme: () => void;
  isLoading: boolean;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get available themes
  const availableThemes = Object.keys(themes).flatMap(themeKey => [
    {
      id: `${themeKey}-light`,
      name: themes[themeKey].light.name,
      description: themes[themeKey].light.description,
    },
    {
      id: `${themeKey}-dark`,
      name: themes[themeKey].dark.name,
      description: themes[themeKey].dark.description,
    },
  ]);

  // Apply theme when it changes
  useEffect(() => {
    if (resolvedTheme) {
      const mode = resolvedTheme.includes('dark') ? 'dark' : 'light';
      const themeObj = getTheme(resolvedTheme, mode);
      
      if (themeObj) {
        setCurrentTheme(themeObj);
        applyTheme(themeObj);
      } else {
        // Fallback to default theme
        const defaultTheme = themes.default[mode];
        setCurrentTheme(defaultTheme);
        applyTheme(defaultTheme);
      }
      
      setIsLoading(false);
    }
  }, [resolvedTheme]);

  // Cycle through themes
  const cycleTheme = () => {
    if (!theme) return;
    
    const currentIndex = availableThemes.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex].id);
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    currentTheme,
    availableThemes,
    cycleTheme,
    isLoading,
  };
}
