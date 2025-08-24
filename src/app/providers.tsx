/**
 * Enhanced Providers Component
 * Portal Nagari Guguak Malalo - Enhanced providers with backend integration
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { AnalyticsProvider } from '@/providers/AnalyticsProvider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { useState } from 'react';

/* ===== QUERY CLIENT CONFIGURATION ===== */

/**
 * Query cache time constants (in milliseconds)
 */
const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 10 * 60 * 1000, // 10 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

/**
 * Stale time constants (in milliseconds)
 */
const STALE_TIME = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 15 * 60 * 1000, // 15 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const;

/**
 * Create optimized query client
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data considered fresh for 5 minutes
        staleTime: STALE_TIME.MEDIUM,

        // Keep in cache for 1 hour after component unmounts
        gcTime: CACHE_TIME.LONG, // Updated from cacheTime in React Query v5

        // Smart retry logic
        retry: (failureCount, error: any) => {
          // Don't retry for 4xx errors (client errors)
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },

        // Exponential backoff retry delay
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

        // Network optimizations
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,

        // Error handling
        throwOnError: false, // Updated from useErrorBoundary
      },
      mutations: {
        // Retry failed mutations once
        retry: (failureCount, error: any) => {
          // Don't retry for 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          return failureCount < 1;
        },

        // Mutation retry delay
        retryDelay: 1000,

        // Error handling for mutations
        throwOnError: false, // Updated from useErrorBoundary
      },
    },
  });
}

/* ===== MAIN PROVIDERS COMPONENT ===== */

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Create query client instance (stable across re-renders)
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* React Query DevTools (development only) */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}

      {/* Theme Provider for dark/light mode */}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        storageKey="nagari-guguak-malalo-theme"
      >
        {/* Tooltip Provider for global tooltip functionality */}
        <TooltipProvider delayDuration={300}>
          {/* Authentication Provider */}
          <AuthProvider>
            {/* Socket Provider for real-time functionality */}
            <SocketProvider>
              {/* Analytics Provider for visitor tracking */}
              <AnalyticsProvider>
                {/* Toast Notifications */}
                <Toaster />
                <Sonner
                  richColors
                  visibleToasts={3}
                  toastOptions={{
                    style: {
                      background: 'var(--background)',
                      border: '1px solid var(--border)',
                      color: 'var(--foreground)',
                    },
                  }}
                />

                {children}
              </AnalyticsProvider>
            </SocketProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/* ===== SPECIALIZED PROVIDERS ===== */

/**
 * Portal Warga Providers
 * Enhanced providers for portal warga with citizen-specific configurations
 */
export function PortalProviders({ children }: ProvidersProps) {
  const [queryClient] = useState(() => {
    const client = createQueryClient();

    // Customize for portal warga
    client.setDefaultOptions({
      queries: {
        ...client.getDefaultOptions().queries,
        staleTime: STALE_TIME.SHORT, // More frequent updates for user data
        refetchOnWindowFocus: true, // Refetch when user returns
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        storageKey="portal-warga-theme"
      >
        <TooltipProvider delayDuration={200}>
          <AuthProvider>
            <SocketProvider>
              <Toaster />
              <Sonner richColors visibleToasts={5} expand />

              {children}
            </SocketProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/**
 * Admin Providers
 * Enhanced providers for admin dashboard with admin-specific configurations
 */
export function AdminProviders({ children }: ProvidersProps) {
  const [queryClient] = useState(() => {
    const client = createQueryClient();

    // Customize for admin
    client.setDefaultOptions({
      queries: {
        ...client.getDefaultOptions().queries,
        staleTime: STALE_TIME.SHORT, // Frequent updates for admin data
        refetchOnWindowFocus: true,
        // Removed auto-refresh: real-time updates handled by Socket.IO
        refetchInterval: false,
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        storageKey="admin-dashboard-theme"
      >
        <TooltipProvider delayDuration={100}>
          <AuthProvider>
            <SocketProvider>
              <Toaster />
              <Sonner richColors visibleToasts={5} expand />

              {children}
            </SocketProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/**
 * Public Providers
 * Lightweight providers for public pages (no authentication required)
 */
export function PublicProviders({ children }: ProvidersProps) {
  const [queryClient] = useState(() => {
    const client = createQueryClient();

    // Optimize for public content
    client.setDefaultOptions({
      queries: {
        ...client.getDefaultOptions().queries,
        staleTime: STALE_TIME.LONG, // Public data changes less frequently
        gcTime: CACHE_TIME.VERY_LONG, // Keep public data longer
        refetchOnWindowFocus: false,
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        storageKey="public-site-theme"
      >
        <TooltipProvider delayDuration={400}>
          <Toaster />
          <Sonner richColors visibleToasts={3} />

          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

/* ===== PROVIDER FACTORY ===== */

/**
 * Provider factory function to get appropriate provider based on context
 */
export function getProviderForContext(context: 'app' | 'portal' | 'admin' | 'public' = 'app') {
  switch (context) {
    case 'portal':
      return PortalProviders;
    case 'admin':
      return AdminProviders;
    case 'public':
      return PublicProviders;
    default:
      return Providers;
  }
}

/* ===== PROVIDER CONFIGURATION ===== */

/**
 * Provider configuration constants
 */
export const providerConfig = {
  queryClient: {
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    defaultRetries: 3,
    defaultRetryDelay: 1000,
  },

  toast: {
    defaultDuration: 4000,
    maxVisible: 3,
  },

  theme: {
    defaultTheme: 'light' as const,
    enableSystem: true,
    disableTransitionOnChange: true,
  },

  tooltip: {
    defaultDelay: 300,
  },
} as const;

/* ===== DEVELOPMENT UTILITIES ===== */

/**
 * Development-only provider with enhanced debugging
 */
export function DevProviders({ children }: ProvidersProps) {
  const [queryClient] = useState(() => {
    const client = createQueryClient();
    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        storageKey="dev-theme"
      >
        <TooltipProvider delayDuration={100}>
          <AuthProvider>
            <SocketProvider>
              <Toaster />
              <Sonner richColors visibleToasts={10} expand />

              {children}
            </SocketProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;
