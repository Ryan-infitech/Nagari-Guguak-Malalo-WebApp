/**
 * Providers Index
 * Central export untuk semua providers
 */

// Main providers
export {
  QueryProvider as QueryProviderComponent,
  useQueryClient,
  queryOptions,
  mutationOptions,
} from './QueryProvider';
export { default as QueryProvider } from './QueryProvider';

export {
  AuthProvider as AuthProviderComponent,
  useAuth,
  withAuth,
  useAuthGuard,
} from './AuthProvider';
export { default as AuthProvider } from './AuthProvider';

export {
  ErrorBoundaryProvider as ErrorBoundaryProviderComponent,
  PageErrorBoundary,
  ComponentErrorBoundary,
  useErrorHandler,
  useAsyncError,
  withErrorBoundary,
  errorReporting,
} from './ErrorBoundaryProvider';
export { default as ErrorBoundaryProvider } from './ErrorBoundaryProvider';

// Combined providers component
export { default as AppProviders } from './AppProviders';

// Provider types
export type { AuthContextType, RegisterData, User, LoginData } from './AuthProvider';
export type { ErrorContextType, ErrorBoundaryState } from './ErrorBoundaryProvider';

/**
 * Re-export common provider utilities
 */

// Query utilities
export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
};

// Auth utilities
export const authConfig = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  userKey: 'user_data',
  redirectPaths: {
    login: '/login',
    dashboard: '/portal-warga',
    admin: '/admin',
    unauthorized: '/unauthorized',
  },
};

// Error boundary utilities
export const errorConfig = {
  reportToConsole: true,
  reportToService: true,
  showToast: true,
  autoReload: false,
  maxRetries: 3,
};
