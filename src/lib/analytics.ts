/**
 * Analytics Library
 * Track user behavior, events, and conversions
 * Compatible with Google Analytics 4, Plausible, or custom analytics
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean | null>;
  value?: number;
  category?: string;
  label?: string;
}

/**
 * Track a custom analytics event
 * Works with Google Analytics 4, Plausible, or custom endpoint
 */
export function trackEvent(event: AnalyticsEvent) {
  // Skip if analytics is disabled
  if (typeof window === 'undefined') return;
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'false') return;

  const { name, properties, value, category, label } = event;

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', name, {
      event_category: category,
      event_label: label,
      value,
      ...properties,
    });
  }

  // Plausible Analytics
  if (typeof window.plausible !== 'undefined') {
    window.plausible(name, {
      props: {
        category,
        label,
        value: value?.toString(),
        ...properties,
      },
    });
  }

  // Custom endpoint (for server-side tracking)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        properties: { category, label, value, ...properties },
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
      // Use sendBeacon for better performance
      keepalive: true,
    }).catch(() => {
      // Silently fail for analytics errors
    });
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  trackEvent({
    name: 'pageview',
    properties: {
      path,
      title: title || document.title,
      referrer: document.referrer,
    },
  });
}

/**
 * Track engagement metrics
 */
export const engagement = {
  /**
   * Track time spent on page
   */
  timeOnPage: (seconds: number, path: string) => {
    trackEvent({
      name: 'time_on_page',
      category: 'engagement',
      value: seconds,
      properties: { path, duration_bucket: getTimeBucket(seconds) },
    });
  },

  /**
   * Track scroll depth
   */
  scrollDepth: (depth: number, path: string) => {
    trackEvent({
      name: 'scroll_depth',
      category: 'engagement',
      value: depth,
      properties: { path, depth_percent: `${depth}%` },
    });
  },

  /**
   * Track video engagement
   */
  videoPlay: (videoTitle: string) => {
    trackEvent({
      name: 'video_play',
      category: 'video',
      properties: { video_title: videoTitle },
    });
  },

  videoProgress: (videoTitle: string, percent: number) => {
    trackEvent({
      name: 'video_progress',
      category: 'video',
      value: percent,
      properties: { video_title: videoTitle, progress_percent: `${percent}%` },
    });
  },

  videoComplete: (videoTitle: string) => {
    trackEvent({
      name: 'video_complete',
      category: 'video',
      properties: { video_title: videoTitle },
    });
  },
};

/**
 * Track conversion events
 */
export const conversion = {
  /**
   * Track questionnaire start
   */
  questionnaireStart: () => {
    trackEvent({
      name: 'questionnaire_start',
      category: 'conversion',
      properties: { funnel_stage: 'awareness' },
    });
  },

  /**
   * Track questionnaire completion
   */
  questionnaireComplete: (data: { budget?: string; format?: string }) => {
    trackEvent({
      name: 'questionnaire_complete',
      category: 'conversion',
      properties: {
        funnel_stage: 'consideration',
        ...(data.budget && { budget_tier: data.budget }),
        ...(data.format && { project_format: data.format }),
      },
    });
  },

  /**
   * Track deck quick view
   */
  deckQuickView: (deckTitle: string, deckId: string) => {
    trackEvent({
      name: 'deck_quick_view',
      category: 'engagement',
      properties: { deck_title: deckTitle, deck_id: deckId },
    });
  },

  /**
   * Track CTA clicks
   */
  ctaClick: (ctaText: string, location: string) => {
    trackEvent({
      name: 'cta_click',
      category: 'conversion',
      properties: {
        cta_text: ctaText,
        cta_location: location,
        funnel_stage: 'consideration',
      },
    });
  },

  /**
   * Track external link clicks
   */
  externalLinkClick: (url: string, linkText: string) => {
    trackEvent({
      name: 'external_link_click',
      category: 'outbound',
      properties: { url, link_text: linkText },
    });
  },
};

/**
 * Track errors for monitoring
 */
export const error = {
  /**
   * Track JavaScript errors
   */
  jsError: (errorMessage: string, errorSource: string, lineno: number, colno: number) => {
    trackEvent({
      name: 'javascript_error',
      category: 'error',
      properties: {
        error_message: errorMessage,
        error_source: errorSource,
        line: lineno.toString(),
        column: colno.toString(),
      },
    });
  },

  /**
   * Track API errors
   */
  apiError: (endpoint: string, statusCode?: number) => {
    trackEvent({
      name: 'api_error',
      category: 'error',
      properties: {
        endpoint,
        status_code: statusCode?.toString() || 'unknown',
      },
    });
  },
};

/**
 * Helper function to categorize time spent
 */
function getTimeBucket(seconds: number): string {
  if (seconds < 10) return '0-10s';
  if (seconds < 30) return '10-30s';
  if (seconds < 60) return '30-60s';
  if (seconds < 180) return '1-3m';
  if (seconds < 300) return '3-5m';
  return '5m+';
}

/**
 * Initialize analytics tracking for page views
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Track page view on mount
  trackPageView(window.location.pathname);

  // Track scroll depth milestones
  const maxScroll = () => Math.max(
    window.scrollY,
    document.body.scrollTop,
    document.documentElement.scrollTop
  );

  const scrollMilestones = [25, 50, 75, 90, 100];
  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const scrollTop = maxScroll();
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollMilestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        engagement.scrollDepth(milestone, window.location.pathname);
      }
    });
  };

  let scrollTimer: NodeJS.Timeout;
  const throttledScroll = () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(handleScroll, 100);
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Track time on page when user leaves
  const startTime = Date.now();
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    engagement.timeOnPage(timeSpent, window.location.pathname);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
}

/**
 * React Hook for analytics
 */
export function useAnalytics() {
  return {
    trackEvent,
    engagement,
    conversion,
    error,
  };
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string | undefined> }) => void;
  }
}
