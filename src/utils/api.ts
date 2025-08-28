/**
 * API Utility Functions
 * Fungsi utility untuk HTTP requests dan API handling
 */

// Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  abortSignal?: AbortSignal;
}

// Error handling
export class ApiException extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(message: string, status: number, code?: string, details?: any) {
    super(message);
    this.name = "ApiException";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Create standardized API error
 */
export const createApiError = (
  message: string,
  status: number,
  code?: string,
  details?: any
): ApiError => ({
  message,
  status,
  code,
  details,
});

/**
 * Check if error is API error
 */
export const isApiError = (error: any): error is ApiError => {
  return (
    error &&
    typeof error.status === "number" &&
    typeof error.message === "string"
  );
};

/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (isApiError(error)) return error.message;

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "Terjadi kesalahan yang tidak diketahui";
};

/**
 * Build query string from object
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const filteredParams = Object.entries(params)
    .filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    });

  return filteredParams.length > 0 ? `?${filteredParams.join("&")}` : "";
};

/**
 * Parse query string to object
 */
export const parseQueryString = (queryString: string): Record<string, any> => {
  const params: Record<string, any> = {};
  const urlParams = new URLSearchParams(queryString);

  for (const [key, value] of urlParams) {
    if (key.endsWith("[]")) {
      const arrayKey = key.slice(0, -2);
      if (!params[arrayKey]) params[arrayKey] = [];
      params[arrayKey].push(value);
    } else {
      params[key] = value;
    }
  }

  return params;
};

/**
 * Create URL with base and path
 */
export const createUrl = (
  base: string,
  path: string,
  params?: Record<string, any>
): string => {
  const url = new URL(path, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxRetries) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

/**
 * Create timeout promise
 */
export const createTimeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms);
  });
};

/**
 * Race promise with timeout
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> => {
  return Promise.race([promise, createTimeoutPromise(timeoutMs)]);
};

/**
 * Debounce function for API calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for API calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if response is success (2xx)
 */
export const isSuccessResponse = (status: number): boolean => {
  return status >= 200 && status < 300;
};

/**
 * Check if error is network error
 */
export const isNetworkError = (error: any): boolean => {
  return (
    !error.status ||
    error.message === "Network Error" ||
    error.message === "Request failed" ||
    error.code === "NETWORK_ERROR"
  );
};

/**
 * Check if error is timeout error
 */
export const isTimeoutError = (error: any): boolean => {
  return (
    error.code === "ECONNABORTED" ||
    error.message.includes("timeout") ||
    error.message.includes("Request timeout")
  );
};

/**
 * Sanitize headers for logging
 */
export const sanitizeHeaders = (
  headers: Record<string, string>
): Record<string, string> => {
  const sensitiveHeaders = ["authorization", "cookie", "x-api-key"];
  const sanitized = { ...headers };

  sensitiveHeaders.forEach((header) => {
    if (sanitized[header]) {
      sanitized[header] = "***REDACTED***";
    }
  });

  return sanitized;
};

/**
 * Format API endpoint with parameters
 */
export const formatEndpoint = (
  endpoint: string,
  params: Record<string, string | number>
): string => {
  let formatted = endpoint;

  Object.entries(params).forEach(([key, value]) => {
    formatted = formatted.replace(`:${key}`, String(value));
  });

  return formatted;
};

/**
 * Create abort controller with timeout
 */
export const createAbortController = (timeoutMs?: number): AbortController => {
  const controller = new AbortController();

  if (timeoutMs) {
    setTimeout(() => {
      controller.abort();
    }, timeoutMs);
  }

  return controller;
};
