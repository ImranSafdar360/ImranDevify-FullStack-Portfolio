'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="default-light"
      themes={[
        'default-light',
        'default-dark',
        'cyberpunk-light',
        'cyberpunk-dark',
        'nature-light',
        'nature-dark',
      ]}
      enableSystem={false}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
