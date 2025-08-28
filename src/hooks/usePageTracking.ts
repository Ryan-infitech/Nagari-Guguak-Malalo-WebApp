'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import analyticsService from '@/api/services/analytics.service';

/**
 * Hook untuk tracking page views dengan performance metrics
 */
export function usePageTracking() {
  const pathname = usePathname();
  const pageStartTime = useRef<number>(Date.now());
  const interactionCount = useRef<number>(0);
  const maxScrollDepth = useRef<number>(0);
  const pagesVisited = useRef<number>(1);
  const sessionStartTime = useRef<number>(Date.now());

  /**
   * Check if current page should be excluded from tracking
   */
  const shouldExcludeFromTracking = (path: string): boolean => {
    const excludedPaths = [
      '/admin', // Admin dashboard
      '/portal-warga', // Portal warga (private area)
      '/api', // API endpoints
      '/auth', // Authentication pages
      '/_next', // Next.js internal
      '/favicon.ico', // Static assets
      '/robots.txt',
      '/sitemap.xml',
    ];

    // Check if path starts with any excluded path
    return excludedPaths.some((excludedPath) => path.startsWith(excludedPath));
  };

  useEffect(() => {
    // Skip tracking for excluded paths
    if (shouldExcludeFromTracking(pathname)) {
      return;
    }

    // Reset for new page
    pageStartTime.current = Date.now();
    interactionCount.current = 0;
    maxScrollDepth.current = 0;
    pagesVisited.current = pagesVisited.current + 1;

    // Track page view
    const trackPageView = async () => {
      try {
        // Measure page load time
        const loadTime = Date.now() - pageStartTime.current;

        // Track basic page view
        await analyticsService.trackPageView({
          page: pathname,
        });

        // Track performance metrics
        await analyticsService.trackPagePerformance({
          page: pathname,
          loadTime: loadTime,
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Small delay to ensure page is loaded
    const timer = setTimeout(trackPageView, 100);

    // Track interactions
    const handleInteraction = () => {
      interactionCount.current++;
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollDepth = ((scrollTop + windowHeight) / documentHeight) * 100;

      if (scrollDepth > maxScrollDepth.current) {
        maxScrollDepth.current = scrollDepth;
      }
    };

    // Add event listeners
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('scroll', handleScroll, { passive: true });

    // Track page performance when leaving
    const handleBeforeUnload = async () => {
      const timeOnPage = Date.now() - pageStartTime.current;

      try {
        await analyticsService.trackPagePerformance({
          page: pathname,
          loadTime: 0, // Already tracked on page load
          timeOnPage: timeOnPage,
          interactions: interactionCount.current,
          scrollDepth: maxScrollDepth.current,
          exitPage: true,
        });

        // Track session end if this is the last page
        const sessionDuration = Date.now() - sessionStartTime.current;
        await analyticsService.trackSessionEnd({
          sessionDuration: sessionDuration,
          pagesVisited: pagesVisited.current,
          lastPage: pathname,
        });
      } catch (error) {
        console.error('Failed to track page performance:', error);
      }
    };

    // Track when tab becomes hidden (mobile/tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleBeforeUnload();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  // Return pathname for potential use by components
  return { pathname };
}

/**
 * Hook untuk manual tracking dengan custom data
 */
export function useManualTracking() {
  const trackPageView = async (data?: {
    page?: string;
    visitorId?: string;
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
  }) => {
    try {
      await analyticsService.trackPageView(data || {});
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  const trackPagePerformance = async (data: {
    page?: string;
    visitorId?: string;
    loadTime: number;
    timeOnPage?: number;
    interactions?: number;
    scrollDepth?: number;
    exitPage?: boolean;
    userAgent?: string;
    ipAddress?: string;
  }) => {
    try {
      await analyticsService.trackPagePerformance(data);
    } catch (error) {
      console.error('Failed to track page performance:', error);
    }
  };

  const trackSessionEnd = async (data: {
    visitorId?: string;
    sessionDuration: number;
    pagesVisited: number;
    lastPage?: string;
    userAgent?: string;
  }) => {
    try {
      await analyticsService.trackSessionEnd(data);
    } catch (error) {
      console.error('Failed to track session end:', error);
    }
  };

  return { trackPageView, trackPagePerformance, trackSessionEnd };
}
