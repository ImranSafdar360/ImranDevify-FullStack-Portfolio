'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView, UserBehaviorTracker, cookieConsent } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize analytics if consent is given
    if (cookieConsent.hasConsent()) {
      initGA();
    }

    // Initialize user behavior tracker
    const behaviorTracker = new UserBehaviorTracker();

    return () => {
      behaviorTracker.destroy();
    };
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (cookieConsent.hasConsent()) {
      const url = pathname + searchParams.toString();
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}
