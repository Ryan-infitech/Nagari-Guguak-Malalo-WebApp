'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

/**
 * Analytics Provider component
 * Handles automatic page view tracking across the entire application
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // This will automatically track page views
  usePageTracking();

  return <>{children}</>;
}
