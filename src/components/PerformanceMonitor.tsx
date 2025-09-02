'use client';

import { useEffect } from 'react';
import { reportWebVitals, PerformanceData, CustomPerformanceObserver } from '@/lib/performance';

interface PerformanceMonitorProps {
  onMetric?: (data: PerformanceData) => void;
  enableConsoleLogging?: boolean;
  enableAnalytics?: boolean;
}

export default function PerformanceMonitor({ 
  onMetric, 
  enableConsoleLogging = process.env.NODE_ENV === 'development',
  enableAnalytics = process.env.NODE_ENV === 'production'
}: PerformanceMonitorProps) {
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;

    let performanceObserver: CustomPerformanceObserver | null = null;

    const handleMetric = (data: PerformanceData) => {
      // Console logging in development
      if (enableConsoleLogging) {
        console.log(`🚀 ${data.metric.name}:`, {
          value: data.metric.value,
          rating: data.rating,
          delta: data.metric.delta,
        });
      }

      // Send to analytics in production
      if (enableAnalytics && typeof window !== 'undefined') {
        // Google Analytics 4
        const windowWithGtag = window as Window & { gtag?: (...args: unknown[]) => void };
        if (windowWithGtag.gtag) {
          windowWithGtag.gtag('event', 'web_vitals', {
            metric_name: data.metric.name,
            metric_value: data.metric.value,
            metric_rating: data.rating,
            page_location: data.url,
          });
        }

        // Custom analytics endpoint
        fetch('/api/analytics/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).catch(error => {
          console.error('Failed to send performance data:', error);
        });
      }

      // Custom callback
      if (onMetric) {
        onMetric(data);
      }
    };

    // Start Web Vitals monitoring
    reportWebVitals(handleMetric);

    // Start custom performance monitoring
    performanceObserver = new CustomPerformanceObserver();

    // Cleanup
    return () => {
      if (performanceObserver) {
        performanceObserver.disconnect();
      }
    };
  }, [onMetric, enableConsoleLogging, enableAnalytics]);

  // This component doesn't render anything
  return null;
}
