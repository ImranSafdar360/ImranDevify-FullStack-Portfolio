'use client';

import type { Metric } from 'web-vitals';

// Web Vitals thresholds (Google's recommended values)
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, needs_improvement: 0.25 },
  FCP: { good: 1800, needs_improvement: 3000 },
  INP: { good: 200, needs_improvement: 500 },
  LCP: { good: 2500, needs_improvement: 4000 },
  TTFB: { good: 800, needs_improvement: 1800 },
} as const;

export interface PerformanceData {
  metric: Metric;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url: string;
  userAgent: string;
}

// Performance monitoring function
export function reportWebVitals(onPerfEntry?: (metric: PerformanceData) => void) {
  // Only run on client side
  if (typeof window === 'undefined' || !onPerfEntry) return;

  const reportMetric = (metric: Metric) => {
    const rating = getRating(metric);
    const perfData: PerformanceData = {
      metric,
      rating,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
    
    onPerfEntry(perfData);
    
    // Optional: Send to analytics
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      const windowWithGtag = window as Window & { gtag: (...args: unknown[]) => void };
      windowWithGtag.gtag('event', metric.name, {
        custom_parameter_1: metric.value,
        custom_parameter_2: rating,
      });
    }
  };

  // Dynamic import to ensure client-side only execution
  try {
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(reportMetric);
      onFCP(reportMetric);
      onINP(reportMetric);
      onLCP(reportMetric);
      onTTFB(reportMetric);
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });
  } catch (error) {
    console.warn('Dynamic import not supported:', error);
  }
}

// Get rating based on thresholds
function getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metric.name as keyof typeof WEB_VITALS_THRESHOLDS];
  
  if (!thresholds) return 'good';
  
  if (metric.value <= thresholds.good) return 'good';
  if (metric.value <= thresholds.needs_improvement) return 'needs-improvement';
  return 'poor';
}

// Performance observer for custom metrics
export class CustomPerformanceObserver {
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupObservers();
    }
  }

  private setupObservers() {
    // Observe resource loading
    if ('PerformanceObserver' in window) {
      const resourceObserver = new window.PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            this.handleResourceEntry(entry as PerformanceResourceTiming);
          }
        });
      });
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver as unknown as PerformanceObserver);
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error);
      }
    }
  }

  private handleResourceEntry(entry: PerformanceResourceTiming) {
    // Log slow resources
    if (entry.duration > 1000) {
      console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
    }

    // Track specific resource types
    if (entry.name.includes('.js') && entry.duration > 500) {
      console.warn(`Slow JavaScript: ${entry.name}`);
    }

    if (entry.name.includes('.css') && entry.duration > 200) {
      console.warn(`Slow CSS: ${entry.name}`);
    }
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image srcset
  generateSrcSet: (src: string, sizes: number[] = [400, 800, 1200, 1600]) => {
    return sizes
      .map(size => `${src}?w=${size}&q=75 ${size}w`)
      .join(', ');
  },

  // Generate sizes attribute
  generateSizes: (breakpoints: Array<{ minWidth?: string; size: string }>) => {
    return breakpoints
      .map(bp => bp.minWidth ? `(min-width: ${bp.minWidth}) ${bp.size}` : bp.size)
      .join(', ');
  },

  // Lazy loading intersection observer
  createLazyLoader: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    if (typeof window === 'undefined') return null;

    return new IntersectionObserver(callback, {
      rootMargin: '50px 0px',
      threshold: 0.01,
    });
  },
};

// Code splitting utilities
export const codeSplitting = {
  // Dynamic import with error handling
  dynamicImport: async <T>(importFn: () => Promise<T>): Promise<T | null> => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Failed to load module:', error);
      return null;
    }
  },

  // Preload critical modules
  preloadModule: (moduleUrl: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = moduleUrl;
    document.head.appendChild(link);
  },
};

// Memory management utilities
export const memoryManagement = {
  // Monitor memory usage
  getMemoryInfo: () => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
    }
    return null;
  },

  // Clean up event listeners and observers
  cleanup: (cleanupFns: Array<() => void>) => {
    cleanupFns.forEach(fn => {
      try {
        fn();
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    });
  },
};

// Performance budget checker
export const performanceBudget = {
  // Check if resource is within budget
  checkResourceBudget: (entry: PerformanceResourceTiming, budgetMs: number = 1000) => {
    return entry.duration <= budgetMs;
  },

  // Check bundle size budget
  checkBundleBudget: async (budgetKB: number = 500) => {
    if (typeof window === 'undefined') return true;

    try {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsEntries = entries.filter(entry => entry.name.includes('.js'));
      
      const totalSize = jsEntries.reduce((total, entry) => {
        return total + (entry.transferSize || 0);
      }, 0);

      const totalKB = totalSize / 1024;
      return totalKB <= budgetKB;
    } catch (error) {
      console.error('Budget check failed:', error);
      return true;
    }
  },
};
