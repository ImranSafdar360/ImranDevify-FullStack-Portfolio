'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { imageOptimization } from '@/lib/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc = '/images/placeholder.png',
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = imageOptimization.createLazyLoader((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer?.unobserve(entry.target);
        }
      });
    });

    const currentImgRef = imgRef.current;
    if (observer && currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (observer && currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [priority, loading]);

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || imageOptimization.generateSizes([
    { minWidth: '768px', size: '50vw' },
    { size: '100vw' },
  ]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(fallbackSrc);
    if (onError) onError();
  };

  // Generate blur data URL if not provided
  const generateBlurDataURL = (width = 10, height = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {isInView && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${hasError ? 'filter grayscale' : ''}
          `}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
          sizes={responsiveSizes}
          quality={quality}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground text-sm"
          style={{ width, height }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
}
