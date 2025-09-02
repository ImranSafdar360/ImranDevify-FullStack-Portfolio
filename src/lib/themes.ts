export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    info: string;
    infoForeground: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    hero: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const themes: Record<string, { light: Theme; dark: Theme }> = {
  default: {
    light: {
      id: 'default-light',
      name: 'Default Light',
      description: 'Clean and professional light theme',
      colors: {
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        secondary: '#f1f5f9',
        secondaryForeground: '#0f172a',
        accent: '#f1f5f9',
        accentForeground: '#0f172a',
        background: '#ffffff',
        foreground: '#171717',
        muted: '#f8fafc',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#3b82f6',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        success: '#10b981',
        successForeground: '#ffffff',
        warning: '#f59e0b',
        warningForeground: '#ffffff',
        info: '#06b6d4',
        infoForeground: '#ffffff',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        secondary: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        accent: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animations: {
        duration: '0.3s',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
    dark: {
      id: 'default-dark',
      name: 'Default Dark',
      description: 'Sleek and modern dark theme',
      colors: {
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        secondary: '#1e293b',
        secondaryForeground: '#f8fafc',
        accent: '#1e293b',
        accentForeground: '#f8fafc',
        background: '#0a0a0a',
        foreground: '#ededed',
        muted: '#1e293b',
        mutedForeground: '#94a3b8',
        border: '#334155',
        input: '#334155',
        ring: '#3b82f6',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        success: '#10b981',
        successForeground: '#ffffff',
        warning: '#f59e0b',
        warningForeground: '#ffffff',
        info: '#06b6d4',
        infoForeground: '#ffffff',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        secondary: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        accent: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animations: {
        duration: '0.3s',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
      },
    },
  },
  cyberpunk: {
    light: {
      id: 'cyberpunk-light',
      name: 'Cyberpunk Light',
      description: 'Futuristic neon-inspired light theme',
      colors: {
        primary: '#ff0080',
        primaryForeground: '#ffffff',
        secondary: '#f0f0f0',
        secondaryForeground: '#1a1a1a',
        accent: '#00ff80',
        accentForeground: '#000000',
        background: '#ffffff',
        foreground: '#1a1a1a',
        muted: '#f5f5f5',
        mutedForeground: '#666666',
        border: '#e0e0e0',
        input: '#e0e0e0',
        ring: '#ff0080',
        destructive: '#ff4444',
        destructiveForeground: '#ffffff',
        success: '#00ff80',
        successForeground: '#000000',
        warning: '#ffaa00',
        warningForeground: '#000000',
        info: '#00aaff',
        infoForeground: '#ffffff',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #ff0080 0%, #ff4444 100%)',
        secondary: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
        accent: 'linear-gradient(135deg, #00ff80 0%, #00aaff 100%)',
        hero: 'linear-gradient(135deg, #ff0080 0%, #00ff80 50%, #00aaff 100%)',
      },
      animations: {
        duration: '0.2s',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(255 0 128 / 0.1)',
        md: '0 4px 6px -1px rgb(255 0 128 / 0.2), 0 2px 4px -2px rgb(255 0 128 / 0.1)',
        lg: '0 10px 15px -3px rgb(255 0 128 / 0.2), 0 4px 6px -4px rgb(255 0 128 / 0.1)',
        xl: '0 20px 25px -5px rgb(255 0 128 / 0.2), 0 8px 10px -6px rgb(255 0 128 / 0.1)',
      },
    },
    dark: {
      id: 'cyberpunk-dark',
      name: 'Cyberpunk Dark',
      description: 'Neon-lit cyberpunk dark theme',
      colors: {
        primary: '#ff0080',
        primaryForeground: '#ffffff',
        secondary: '#1a1a1a',
        secondaryForeground: '#ffffff',
        accent: '#00ff80',
        accentForeground: '#000000',
        background: '#0d0d0d',
        foreground: '#ffffff',
        muted: '#1a1a1a',
        mutedForeground: '#cccccc',
        border: '#333333',
        input: '#333333',
        ring: '#ff0080',
        destructive: '#ff4444',
        destructiveForeground: '#ffffff',
        success: '#00ff80',
        successForeground: '#000000',
        warning: '#ffaa00',
        warningForeground: '#000000',
        info: '#00aaff',
        infoForeground: '#ffffff',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #ff0080 0%, #ff4444 100%)',
        secondary: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
        accent: 'linear-gradient(135deg, #00ff80 0%, #00aaff 100%)',
        hero: 'linear-gradient(135deg, #ff0080 0%, #00ff80 50%, #00aaff 100%)',
      },
      animations: {
        duration: '0.2s',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(255 0 128 / 0.3), 0 0 4px rgb(0 255 128 / 0.2)',
        md: '0 4px 6px -1px rgb(255 0 128 / 0.4), 0 2px 4px -2px rgb(0 255 128 / 0.3)',
        lg: '0 10px 15px -3px rgb(255 0 128 / 0.4), 0 4px 6px -4px rgb(0 255 128 / 0.3)',
        xl: '0 20px 25px -5px rgb(255 0 128 / 0.4), 0 8px 10px -6px rgb(0 255 128 / 0.3)',
      },
    },
  },
  nature: {
    light: {
      id: 'nature-light',
      name: 'Nature Light',
      description: 'Earth-inspired natural light theme',
      colors: {
        primary: '#22c55e',
        primaryForeground: '#ffffff',
        secondary: '#f0fdf4',
        secondaryForeground: '#14532d',
        accent: '#dcfce7',
        accentForeground: '#14532d',
        background: '#fefffe',
        foreground: '#1c1917',
        muted: '#f5f5f4',
        mutedForeground: '#78716c',
        border: '#e7e5e4',
        input: '#e7e5e4',
        ring: '#22c55e',
        destructive: '#dc2626',
        destructiveForeground: '#ffffff',
        success: '#16a34a',
        successForeground: '#ffffff',
        warning: '#ea580c',
        warningForeground: '#ffffff',
        info: '#0ea5e9',
        infoForeground: '#ffffff',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        secondary: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        accent: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
        hero: 'linear-gradient(135deg, #84cc16 0%, #22c55e 50%, #0ea5e9 100%)',
      },
      animations: {
        duration: '0.4s',
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(34 197 94 / 0.1)',
        md: '0 4px 6px -1px rgb(34 197 94 / 0.2), 0 2px 4px -2px rgb(34 197 94 / 0.1)',
        lg: '0 10px 15px -3px rgb(34 197 94 / 0.2), 0 4px 6px -4px rgb(34 197 94 / 0.1)',
        xl: '0 20px 25px -5px rgb(34 197 94 / 0.2), 0 8px 10px -6px rgb(34 197 94 / 0.1)',
      },
    },
    dark: {
      id: 'nature-dark',
      name: 'Nature Dark',
      description: 'Forest-inspired natural dark theme',
      colors: {
        primary: '#22c55e',
        primaryForeground: '#ffffff',
        secondary: '#1c2e1c',
        secondaryForeground: '#dcfce7',
        accent: '#2d4a2d',
        accentForeground: '#dcfce7',
        background: '#0f1b0f',
        foreground: '#f7f7f6',
        muted: '#1c2e1c',
        mutedForeground: '#a8a29e',
        border: '#2d4a2d',
        input: '#2d4a2d',
        ring: '#22c55e',
        destructive: '#dc2626',
        destructiveForeground: '#ffffff',
        success: '#16a34a',
        successForeground: '#ffffff',
        warning: '#ea580c',
        warningForeground: '#ffffff',
        info: '#0ea5e9',
        infoForeground: '#ffffff',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        secondary: 'linear-gradient(135deg, #1c2e1c 0%, #2d4a2d 100%)',
        accent: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
        hero: 'linear-gradient(135deg, #84cc16 0%, #22c55e 50%, #0ea5e9 100%)',
      },
      animations: {
        duration: '0.4s',
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(34 197 94 / 0.3)',
        md: '0 4px 6px -1px rgb(34 197 94 / 0.4), 0 2px 4px -2px rgb(34 197 94 / 0.3)',
        lg: '0 10px 15px -3px rgb(34 197 94 / 0.4), 0 4px 6px -4px rgb(34 197 94 / 0.3)',
        xl: '0 20px 25px -5px rgb(34 197 94 / 0.4), 0 8px 10px -6px rgb(34 197 94 / 0.3)',
      },
    },
  },
};

export const getTheme = (themeId: string, mode: 'light' | 'dark'): Theme | null => {
  const themeName = themeId.replace('-light', '').replace('-dark', '');
  return themes[themeName]?.[mode] || null;
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--color-${cssVar}`, value);
  });
  
  // Apply gradients
  Object.entries(theme.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--gradient-${key}`, value);
  });
  
  // Apply animations
  root.style.setProperty('--animation-duration', theme.animations.duration);
  root.style.setProperty('--animation-easing', theme.animations.easing);
  
  // Apply shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
};
