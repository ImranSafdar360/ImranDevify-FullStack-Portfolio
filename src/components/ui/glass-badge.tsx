import React from 'react';
import { cn } from '@/lib/utils';

interface GlassBadgeProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number;
  blur?: number;
  backgroundOpacity?: number;
  borderOpacity?: number;
  paddingX?: number;
  paddingY?: number;
  variant?: 'light' | 'dark';
}

const GlassBadge = ({
  children,
  className,
  borderRadius = 24,
  blur = 20,
  backgroundOpacity,
  borderOpacity,
  paddingX = 16,
  paddingY = 12,
  variant = 'light',
}: GlassBadgeProps) => {
  // iOS-style glassmorphism defaults
  const lightDefaults = {
    background: backgroundOpacity !== undefined 
      ? `rgba(255, 255, 255, ${backgroundOpacity})` 
      : 'rgba(255, 255, 255, 0.1)',
    border: borderOpacity !== undefined 
      ? `rgba(255, 255, 255, ${borderOpacity})` 
      : 'rgba(255, 255, 255, 0.2)',
  };

  const darkDefaults = {
    background: backgroundOpacity !== undefined 
      ? `rgba(0, 0, 0, ${backgroundOpacity})` 
      : 'rgba(0, 0, 0, 0.1)',
    border: borderOpacity !== undefined 
      ? `rgba(255, 255, 255, ${borderOpacity})` 
      : 'rgba(255, 255, 255, 0.1)',
  };

  const styles = variant === 'light' ? lightDefaults : darkDefaults;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center text-center',
        'border',
        'shadow-lg',
        className
      )}
      style={{
        borderRadius: `${borderRadius}px`,
        background: styles.background,
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        borderColor: styles.border,
        borderWidth: '1px',
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
};

export default GlassBadge;

