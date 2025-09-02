'use client';

// Google Analytics types
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
};

// Track events
export interface TrackEventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

export const trackEvent = ({ action, category, label, value, custom_parameters }: TrackEventProps) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters,
  });
};

// Predefined event trackers
export const analytics = {
  // User interactions
  trackClick: (elementName: string, location?: string) => {
    trackEvent({
      action: 'click',
      category: 'user_interaction',
      label: elementName,
      custom_parameters: { location },
    });
  },

  trackFormSubmit: (formName: string, success: boolean = true) => {
    trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
      value: success ? 1 : 0,
      custom_parameters: { success },
    });
  },

  trackDownload: (fileName: string, fileType?: string) => {
    trackEvent({
      action: 'download',
      category: 'engagement',
      label: fileName,
      custom_parameters: { file_type: fileType },
    });
  },

  trackExternalLink: (url: string, linkText?: string) => {
    trackEvent({
      action: 'external_link',
      category: 'engagement',
      label: url,
      custom_parameters: { link_text: linkText },
    });
  },

  // Portfolio specific events
  trackProjectView: (projectName: string, projectId?: string) => {
    trackEvent({
      action: 'project_view',
      category: 'portfolio',
      label: projectName,
      custom_parameters: { project_id: projectId },
    });
  },

  trackSkillView: (skillName: string, skillCategory?: string) => {
    trackEvent({
      action: 'skill_view',
      category: 'portfolio',
      label: skillName,
      custom_parameters: { skill_category: skillCategory },
    });
  },

  trackContactAttempt: (method: string) => {
    trackEvent({
      action: 'contact_attempt',
      category: 'lead_generation',
      label: method,
      value: 1,
    });
  },



  // Performance tracking
  trackPerformance: (metricName: string, value: number, rating: string) => {
    trackEvent({
      action: 'performance_metric',
      category: 'web_vitals',
      label: metricName,
      value: Math.round(value),
      custom_parameters: { rating },
    });
  },

  // Error tracking
  trackError: (errorMessage: string, errorType?: string, fatal: boolean = false) => {
    trackEvent({
      action: 'error',
      category: 'exceptions',
      label: errorMessage,
      value: fatal ? 1 : 0,
      custom_parameters: { 
        error_type: errorType,
        fatal,
        user_agent: navigator.userAgent,
        url: window.location.href,
      },
    });
  },

  // User engagement
  trackScrollDepth: (percentage: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
    });
  },

  trackTimeOnPage: (seconds: number) => {
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: window.location.pathname,
      value: seconds,
    });
  },

  trackSearch: (searchTerm: string, resultsCount?: number) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      value: resultsCount,
      custom_parameters: { results_count: resultsCount },
    });
  },
};

// User behavior tracking
export class UserBehaviorTracker {
  private scrollDepthThresholds = [25, 50, 75, 90, 100];
  private scrollDepthTriggered = new Set<number>();
  private pageStartTime = Date.now();
  private isActive = true;
  private idleTimer: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupEventListeners();
    }
  }

  private setupEventListeners() {
    // Scroll depth tracking
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // Click tracking
    document.addEventListener('click', this.handleClick.bind(this));

    // Form submission tracking
    document.addEventListener('submit', this.handleFormSubmit.bind(this));

    // Page visibility tracking
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

    // User activity tracking
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, this.handleUserActivity.bind(this), { passive: true });
    });

    // Page unload tracking
    window.addEventListener('beforeunload', this.handlePageUnload.bind(this));
  }

  private handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

    this.scrollDepthThresholds.forEach(threshold => {
      if (scrollPercentage >= threshold && !this.scrollDepthTriggered.has(threshold)) {
        this.scrollDepthTriggered.add(threshold);
        analytics.trackScrollDepth(threshold);
      }
    });
  }

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    const elementId = target.id;
    const elementClass = target.className;
    const elementText = target.textContent?.trim().substring(0, 50);

    let elementName = tagName;
    if (elementId) elementName += `#${elementId}`;
    if (elementClass) elementName += `.${elementClass.split(' ')[0]}`;
    if (elementText) elementName += ` (${elementText})`;

    analytics.trackClick(elementName, window.location.pathname);

    // Track external links
    if (tagName === 'a') {
      const href = (target as HTMLAnchorElement).href;
      if (href && !href.startsWith(window.location.origin)) {
        analytics.trackExternalLink(href, elementText);
      }
    }
  }

  private handleFormSubmit(event: SubmitEvent) {
    const form = event.target as HTMLFormElement;
    const formName = form.name || form.id || 'unnamed_form';
    analytics.trackFormSubmit(formName);
  }

  private handleVisibilityChange() {
    if (document.hidden) {
      this.isActive = false;
      const timeOnPage = Math.round((Date.now() - this.pageStartTime) / 1000);
      analytics.trackTimeOnPage(timeOnPage);
    } else {
      this.isActive = true;
      this.pageStartTime = Date.now();
    }
  }

  private handleUserActivity() {
    this.isActive = true;
    
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    // Consider user idle after 30 seconds of inactivity
    this.idleTimer = setTimeout(() => {
      this.isActive = false;
    }, 30000);
  }

  private handlePageUnload() {
    const timeOnPage = Math.round((Date.now() - this.pageStartTime) / 1000);
    analytics.trackTimeOnPage(timeOnPage);
  }

  public isUserActive(): boolean {
    return this.isActive;
  }

  public getTimeOnPage(): number {
    return Math.round((Date.now() - this.pageStartTime) / 1000);
  }

  public destroy() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  }
}

// Cookie consent management
export const cookieConsent = {
  COOKIE_NAME: 'analytics_consent',
  
  hasConsent(): boolean {
    if (typeof document === 'undefined') return false;
    return document.cookie.includes(`${this.COOKIE_NAME}=true`);
  },

  setConsent(consent: boolean) {
    if (typeof document === 'undefined') return;
    
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    
    document.cookie = `${this.COOKIE_NAME}=${consent}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    if (consent) {
      initGA();
    }
  },

  revokeConsent() {
    this.setConsent(false);
    // Clear existing analytics cookies
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = '_ga_*=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
};
