/**
 * Error Boundary Provider Component
 * Provider untuk menangani error secara global di aplikasi
 */

'use client';

import { Component, ReactNode, ErrorInfo, createContext, useContext } from 'react';
import { toast } from 'sonner';

import { logger } from '@/utils/logger';

/**
 * Error Boundary State
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

/**
 * Error Context Type
 */
export interface ErrorContextType {
  reportError: (error: Error, errorInfo?: any) => void;
  clearError: () => void;
  hasError: boolean;
}

/**
 * Error Context
 */
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

/**
 * Error Boundary Props
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showToast?: boolean;
  level?: 'page' | 'component' | 'app';
}

/**
 * Error Boundary Class Component
 */
class ErrorBoundaryComponent extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorId: number = 0;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  /**
   * Static method to update state when error occurs
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Component did catch error
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = `error-${Date.now()}-${++this.errorId}`;

    this.setState({
      errorInfo,
      errorId,
    });

    // Log error
    this.logError(error, errorInfo, errorId);

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show toast notification
    if (this.props.showToast !== false) {
      this.showErrorToast(error, this.props.level);
    }
  }

  /**
   * Log error details
   */
  private logError(error: Error, errorInfo: ErrorInfo, errorId: string) {
    const errorData = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      level: this.props.level || 'component',
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Boundary (${errorData.level})`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Error Data:', errorData);
      console.groupEnd();
    }

    // Log using logger utility
    try {
      logger.error('Error Boundary caught error', errorData);
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    // Report to external service (if configured)
    this.reportToExternalService(errorData);
  }

  /**
   * Show error toast notification
   */
  private showErrorToast(error: Error, level?: string) {
    const isNetworkError =
      error.message.toLowerCase().includes('network') ||
      error.message.toLowerCase().includes('fetch');

    const isAuthError =
      error.message.toLowerCase().includes('unauthorized') ||
      error.message.toLowerCase().includes('forbidden');

    let message = 'Terjadi kesalahan tak terduga';

    if (isNetworkError) {
      message = 'Koneksi internet bermasalah. Silakan coba lagi.';
    } else if (isAuthError) {
      message = 'Sesi Anda telah berakhir. Silakan login kembali.';
    } else if (level === 'app') {
      message = 'Aplikasi mengalami kesalahan. Halaman akan dimuat ulang.';
    } else if (level === 'page') {
      message = 'Halaman mengalami kesalahan. Silakan muat ulang halaman.';
    }

    toast.error(message, {
      duration: 5000,
      action: {
        label: 'Muat Ulang',
        onClick: () => {
          if (level === 'app') {
            window.location.reload();
          } else {
            this.clearError();
          }
        },
      },
    });
  }

  /**
   * Report error to external monitoring service
   */
  private reportToExternalService(errorData: any) {
    // Only report in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    try {
      // Report to Sentry, LogRocket, or other monitoring service
      // Example implementation:

      // if (window.Sentry) {
      //   window.Sentry.captureException(errorData.error, {
      //     tags: {
      //       section: 'error-boundary',
      //       level: errorData.level,
      //     },
      //     extra: errorData,
      //   });
      // }

      // Send to custom error tracking endpoint
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      }).catch(() => {
        // Silently fail if error reporting fails
      });
    } catch (reportError) {
      console.error('Failed to report error to external service:', reportError);
    }
  }

  /**
   * Clear error state
   */
  clearError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  /**
   * Report error manually
   */
  reportError = (error: Error, errorInfo?: any) => {
    const errorId = `manual-error-${Date.now()}`;

    this.logError(error, errorInfo || { componentStack: 'Manual report' }, errorId);
    this.showErrorToast(error, this.props.level);
  };

  /**
   * Render error fallback UI
   */
  renderErrorFallback() {
    const { error, errorId } = this.state;
    const { level = 'component' } = this.props;

    // Custom fallback from props
    if (this.props.fallback) {
      return this.props.fallback;
    }

    // App-level error fallback
    if (level === 'app') {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-gray-900">Oops! Terjadi Kesalahan</h2>

            <p className="mb-6 text-gray-600">
              Aplikasi mengalami kesalahan tak terduga. Tim kami telah mendapat laporan dan sedang
              menangani masalah ini.
            </p>

            {errorId && <p className="mb-4 font-mono text-sm text-gray-500">ID Error: {errorId}</p>}

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Muat Ulang Aplikasi
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Page-level error fallback
    if (level === 'page') {
      return (
        <div className="flex min-h-96 items-center justify-center rounded-lg bg-gray-50">
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-lg font-medium text-gray-900">Halaman Bermasalah</h3>

            <p className="mb-4 text-gray-600">Terjadi kesalahan saat memuat halaman ini.</p>

            <button
              onClick={this.clearError}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      );
    }

    // Component-level error fallback
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <div className="flex items-center">
          <svg
            className="mr-2 h-5 w-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div>
            <h4 className="text-sm font-medium text-red-800">Komponen Bermasalah</h4>

            <p className="mt-1 text-sm text-red-700">Terjadi kesalahan pada bagian ini.</p>
          </div>
        </div>

        <button
          onClick={this.clearError}
          className="mt-2 text-sm text-red-600 underline hover:text-red-800"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  /**
   * Render component
   */
  render() {
    if (this.state.hasError) {
      return this.renderErrorFallback();
    }

    // Provide error context to children
    const contextValue: ErrorContextType = {
      reportError: this.reportError,
      clearError: this.clearError,
      hasError: this.state.hasError,
    };

    return (
      <ErrorContext.Provider value={contextValue}>{this.props.children}</ErrorContext.Provider>
    );
  }
}

/**
 * Main Error Boundary Provider
 */
export function ErrorBoundaryProvider({ children, ...props }: ErrorBoundaryProps) {
  return (
    <ErrorBoundaryComponent level="app" showToast={true} {...props}>
      {children}
    </ErrorBoundaryComponent>
  );
}

/**
 * Page Error Boundary
 */
export function PageErrorBoundary({ children, ...props }: Omit<ErrorBoundaryProps, 'level'>) {
  return (
    <ErrorBoundaryComponent level="page" showToast={true} {...props}>
      {children}
    </ErrorBoundaryComponent>
  );
}

/**
 * Component Error Boundary
 */
export function ComponentErrorBoundary({ children, ...props }: Omit<ErrorBoundaryProps, 'level'>) {
  return (
    <ErrorBoundaryComponent level="component" showToast={false} {...props}>
      {children}
    </ErrorBoundaryComponent>
  );
}

/**
 * Hook to use error context
 */
export function useErrorHandler(): ErrorContextType {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error('useErrorHandler must be used within an ErrorBoundaryProvider');
  }

  return context;
}

/**
 * Hook for handling async errors
 */
export function useAsyncError() {
  const { reportError } = useErrorHandler();

  return (error: Error) => {
    reportError(error, { type: 'async-error' });
  };
}

/**
 * Higher-order component for error boundaries
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryConfig?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ComponentErrorBoundary {...errorBoundaryConfig}>
        <Component {...props} />
      </ComponentErrorBoundary>
    );
  };
}

/**
 * Error reporting utilities
 */
export const errorReporting = {
  /**
   * Report error manually
   */
  reportError: (error: Error, context?: any) => {
    // Create error data
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    };

    // Log to console
    console.error('Manual error report:', errorData);

    // Log using logger
    try {
      logger.error('Manual error report', errorData);
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    // Show toast
    toast.error('Terjadi kesalahan. Tim kami telah mendapat laporan.');
  },

  /**
   * Report warning
   */
  reportWarning: (message: string, context?: any) => {
    const warningData = {
      message,
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    };

    console.warn('Warning:', warningData);

    try {
      logger.warn('Warning report', warningData);
    } catch (logError) {
      console.error('Failed to log warning:', logError);
    }
  },
};

export default ErrorBoundaryProvider;
