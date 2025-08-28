/**
 * Query Provider Component
 * Provider untuk React Query (TanStack Query)
 */

'use client';

import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

import { CACHE_TIME, STALE_TIME } from '@/utils/queryKeys';
import { isErrorResponse, extractErrorMessage } from '@/utils/response';

/**
 * Query client configuration
 */
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time - how long data is considered fresh
        staleTime: STALE_TIME.MEDIUM, // 5 minutes

        // GC time - how long data stays in cache after component unmounts
        gcTime: CACHE_TIME.LONG, // 1 hour

        // Retry failed requests
        retry: (failureCount, error: any) => {
          // Don't retry for 4xx errors (client errors)
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }

          // Retry up to 3 times for other errors
          return failureCount < 3;
        },

        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

        // Refetch on window focus (disabled by default for better UX)
        refetchOnWindowFocus: false,

        // Refetch on reconnect
        refetchOnReconnect: true,

        // Refetch on mount if data is stale
        refetchOnMount: true,
      },
      mutations: {
        // Retry failed mutations
        retry: (failureCount, error: any) => {
          // Don't retry for 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }

          // Retry once for other errors
          return failureCount < 1;
        },

        // Retry delay
        retryDelay: 1000,
      },
    },

    // Global query cache configuration
    queryCache: new QueryCache({
      onError: (error: any, query) => {
        // Log query errors
        console.error('Query Error:', {
          queryKey: query.queryKey,
          error: error.message || error,
        });

        // Show toast for critical errors
        if (error?.status >= 500) {
          toast.error('Terjadi kesalahan server. Silakan coba lagi nanti.');
        }
      },
      onSuccess: (data: any, query) => {
        // Log successful queries in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Query Success:', {
            queryKey: query.queryKey,
            dataType: typeof data,
          });
        }
      },
    }),

    // Global mutation cache configuration
    mutationCache: new MutationCache({
      onError: (error: any, variables, context, mutation) => {
        console.error('Mutation Error:', {
          mutationKey: mutation.options.mutationKey,
          error: error.message || error,
          variables,
        });

        // Extract error message
        const errorMessage = extractErrorMessage(error);

        // Show error toast
        toast.error(errorMessage || 'Terjadi kesalahan. Silakan coba lagi.');
      },
      onSuccess: (data: any, variables, context, mutation) => {
        // Log successful mutations in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Mutation Success:', {
            mutationKey: mutation.options.mutationKey,
            dataType: typeof data,
          });
        }

        // Show success toast for important operations
        const mutationKey = mutation.options.mutationKey?.[0];
        if (
          mutationKey &&
          ['create', 'update', 'delete'].some((op) => String(mutationKey).includes(op))
        ) {
          const action = String(mutationKey).includes('create')
            ? 'dibuat'
            : String(mutationKey).includes('update')
              ? 'diperbarui'
              : String(mutationKey).includes('delete')
                ? 'dihapus'
                : 'berhasil';

          toast.success(`Data ${action} dengan sukses.`);
        }
      },
    }),
  });
};

/**
 * Query Provider Props
 */
interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Query Provider Component
 */
export function QueryProvider({ children }: QueryProviderProps): JSX.Element {
  // Create query client instance (only once)
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* React Query Devtools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  );
}

/**
 * Hook to get query client instance
 */
export function useQueryClient() {
  const client = QueryClient.prototype;
  return client;
}

/**
 * Query configuration presets
 */
export const queryOptions = {
  // For frequently changing data - now using Socket.IO instead of polling
  realtime: {
    staleTime: 0,
    gcTime: CACHE_TIME.SHORT,
    refetchInterval: false, // Removed polling: using Socket.IO real-time updates
    refetchOnWindowFocus: true,
  },

  // For static/rarely changing data
  static: {
    staleTime: STALE_TIME.VERY_LONG,
    gcTime: CACHE_TIME.VERY_LONG,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },

  // For user-specific data
  user: {
    staleTime: STALE_TIME.MEDIUM,
    gcTime: CACHE_TIME.MEDIUM,
    refetchOnWindowFocus: true,
  },

  // For search results
  search: {
    staleTime: STALE_TIME.SHORT,
    gcTime: CACHE_TIME.SHORT,
    keepPreviousData: true,
  },

  // For infinite scroll data
  infinite: {
    staleTime: STALE_TIME.MEDIUM,
    gcTime: CACHE_TIME.LONG,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  },
} as const;

/**
 * Error boundaries for queries
 */
export function QueryErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return <div>{children}</div>;
}

/**
 * Mutation configuration presets
 */
export const mutationOptions = {
  // For optimistic updates
  optimistic: {
    retry: false,
    onMutate: async (variables: any) => {
      // Cancel outgoing refetches
      // Return context for rollback
      return { previousData: undefined };
    },
    onError: (error: any, variables: any, context: any) => {
      // Rollback optimistic update
      if (context?.previousData) {
        // Restore previous data
      }
    },
    onSettled: () => {
      // Refetch related queries
    },
  },

  // For critical operations
  critical: {
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  // For background operations
  background: {
    retry: 1,
    retryDelay: 1000,
  },
} as const;

/**
 * Custom hooks for common query patterns
 */

// Hook for paginated queries
export function usePaginatedQuery<T>(
  queryKey: any[],
  queryFn: (context: any) => Promise<T>,
  options: any = {}
) {
  // Implementation would go here
  // This is a placeholder for the actual hook
}

// Hook for infinite queries
export function useInfiniteScrollQuery<T>(
  queryKey: any[],
  queryFn: (context: any) => Promise<T>,
  options: any = {}
) {
  // Implementation would go here
  // This is a placeholder for the actual hook
}

// Hook for search queries with debouncing
export function useSearchQuery<T>(
  queryKey: any[],
  queryFn: (context: any) => Promise<T>,
  searchTerm: string,
  options: any = {}
) {
  // Implementation would go here
  // This is a placeholder for the actual hook
}

export default QueryProvider;
