/**
 * API Request/Response Types
 * Types untuk semua komunikasi API
 */

import {
  ApiResponse,
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  PaginationParams,
  SortParams,
  FilterParams,
  SearchParams,
  BaseQuery,
} from "./common";

// =============================================================================
// API CLIENT TYPES
// =============================================================================

/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  retries: number;
  retryDelay: number;
  enableAuth: boolean;
  enableLogging: boolean;
}

/**
 * Request configuration
 */
export interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  retries?: number;
  cache?: boolean;
  validateStatus?: (status: number) => boolean;
}

/**
 * Response interceptor
 */
export interface ApiResponseInterceptor {
  onFulfilled?: (response: any) => any;
  onRejected?: (error: any) => any;
}

/**
 * Request interceptor
 */
export interface ApiRequestInterceptor {
  onFulfilled?: (config: RequestConfig) => RequestConfig;
  onRejected?: (error: any) => any;
}

// =============================================================================
// HTTP METHODS & ENDPOINTS
// =============================================================================

/**
 * HTTP methods
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

/**
 * API endpoints registry
 */
export interface ApiEndpoints {
  // Authentication
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
    profile: string;
    resetPassword: string;
    verifyEmail: string;
  };

  // User management
  users: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    avatar: string;
    settings: string;
    activity: string;
  };

  // Admin
  admin: {
    dashboard: string;
    users: string;
    settings: string;
    logs: string;
    reports: string;
  };

  // Content management
  articles: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    publish: string;
    categories: string;
    tags: string;
  };

  announcements: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    publish: string;
  };

  events: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    register: string;
    participants: string;
  };

  // Services
  services: {
    list: string;
    get: string;
    categories: string;
    requirements: string;
  };

  serviceRequests: {
    list: string;
    create: string;
    get: string;
    update: string;
    delete: string;
    status: string;
    documents: string;
  };

  documents: {
    types: string;
    request: string;
    status: string;
    download: string;
    upload: string;
  };

  // Tourism
  tourism: {
    destinations: string;
    packages: string;
    reviews: string;
    bookings: string;
  };

  // UMKM
  umkm: {
    list: string;
    register: string;
    get: string;
    update: string;
    programs: string;
    statistics: string;
  };

  // Utilities
  files: {
    upload: string;
    download: string;
    delete: string;
    metadata: string;
  };

  notifications: {
    list: string;
    get: string;
    mark: string;
    settings: string;
  };

  feedback: {
    submit: string;
    list: string;
    respond: string;
  };

  analytics: {
    dashboard: string;
    reports: string;
    export: string;
  };
}

// =============================================================================
// REQUEST TYPES
// =============================================================================

/**
 * Base API request
 */
export interface BaseApiRequest {
  endpoint: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

/**
 * Query request (GET)
 */
export interface QueryRequest extends BaseApiRequest {
  method: "GET";
  params?: Record<string, any>;
  query?: BaseQuery;
}

/**
 * Mutation request (POST, PUT, PATCH, DELETE)
 */
export interface MutationRequest<T = any> extends BaseApiRequest {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  data?: T;
  params?: Record<string, any>;
}

/**
 * File upload request
 */
export interface FileUploadRequest extends BaseApiRequest {
  method: "POST";
  files: File[];
  fields?: Record<string, any>;
  onProgress?: (progress: number) => void;
  maxSize?: number;
  allowedTypes?: string[];
}

/**
 * Bulk operation request
 */
export interface BulkOperationRequest<T = any> extends BaseApiRequest {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  items: T[];
  operation: "create" | "update" | "delete" | "approve" | "reject";
  options?: Record<string, any>;
}

// =============================================================================
// RESPONSE TYPES
// =============================================================================

/**
 * API response with timing
 */
export interface TimedApiResponse<T = any> extends ApiResponse<T> {
  timing: {
    start: number;
    end: number;
    duration: number;
  };
}

/**
 * Cached response
 */
export interface CachedResponse<T = any> extends SuccessResponse<T> {
  cache: {
    key: string;
    expiresAt: string;
    isStale: boolean;
    source: "memory" | "storage" | "network";
  };
}

/**
 * Stream response
 */
export interface StreamResponse {
  stream: ReadableStream;
  contentType: string;
  contentLength?: number;
  filename?: string;
}

/**
 * File download response
 */
export interface FileDownloadResponse {
  url: string;
  filename: string;
  contentType: string;
  size: number;
  expiresAt?: string;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

/**
 * API error codes
 */
export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT_ERROR"
  | "PARSE_ERROR"
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "NOT_FOUND_ERROR"
  | "CONFLICT_ERROR"
  | "RATE_LIMIT_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

/**
 * Extended API error
 */
export interface ExtendedApiError {
  code: ApiErrorCode;
  message: string;
  details?: Record<string, any>;
  field?: string;
  value?: any;
  timestamp: string;
  requestId?: string;
  statusCode?: number;
  originalError?: Error;
}

/**
 * API error response with retry info
 */
export interface RetryableErrorResponse extends ErrorResponse {
  retry: {
    attempt: number;
    maxAttempts: number;
    nextRetryAt?: string;
    backoffMs: number;
  };
}

// =============================================================================
// CACHE TYPES
// =============================================================================

/**
 * Cache strategy
 */
export type CacheStrategy =
  | "cache-first"
  | "network-first"
  | "cache-only"
  | "network-only"
  | "stale-while-revalidate";

/**
 * Cache configuration
 */
export interface CacheConfig {
  strategy: CacheStrategy;
  ttl: number; // seconds
  key?: string;
  tags?: string[];
  version?: string;
  invalidateOn?: string[];
}

/**
 * Cache entry
 */
export interface CacheEntry<T = any> {
  key: string;
  data: T;
  timestamp: number;
  expiresAt: number;
  tags: string[];
  version: string;
  accessCount: number;
  lastAccessed: number;
}

// =============================================================================
// RETRY & RESILIENCE TYPES
// =============================================================================

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryCondition?: (error: any) => boolean;
  onRetry?: (attempt: number, error: any) => void;
}

/**
 * Circuit breaker state
 */
export type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringPeriod: number;
  expectedErrors?: string[];
}

// =============================================================================
// MIDDLEWARE TYPES
// =============================================================================

/**
 * API middleware
 */
export interface ApiMiddleware {
  name: string;
  priority: number;
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onResponse?: (response: any) => any | Promise<any>;
  onError?: (error: any) => any | Promise<any>;
}

/**
 * Authentication middleware
 */
export interface AuthMiddleware extends ApiMiddleware {
  name: "auth";
  getToken: () => string | null;
  refreshToken: () => Promise<string | null>;
  onUnauthorized?: () => void;
}

/**
 * Logging middleware
 */
export interface LoggingMiddleware extends ApiMiddleware {
  name: "logging";
  logLevel: "debug" | "info" | "warn" | "error";
  logRequests: boolean;
  logResponses: boolean;
  logErrors: boolean;
  sensitiveHeaders?: string[];
}

// =============================================================================
// PAGINATION TYPES
// =============================================================================

/**
 * Cursor-based pagination
 */
export interface CursorPagination {
  cursor?: string;
  limit?: number;
  direction?: "forward" | "backward";
}

/**
 * Cursor pagination metadata
 */
export interface CursorPaginationMetadata {
  hasNext: boolean;
  hasPrev: boolean;
  nextCursor?: string;
  prevCursor?: string;
  count: number;
}

/**
 * Cursor paginated response
 */
export interface CursorPaginatedResponse<T = any> extends SuccessResponse<T[]> {
  pagination: CursorPaginationMetadata;
}

// =============================================================================
// REAL-TIME TYPES
// =============================================================================

/**
 * WebSocket message types
 */
export type WebSocketMessageType =
  | "NOTIFICATION"
  | "USER_STATUS"
  | "LIVE_UPDATE"
  | "SYSTEM_MESSAGE"
  | "HEARTBEAT"
  | "ERROR";

/**
 * WebSocket message
 */
export interface WebSocketMessage<T = any> {
  type: WebSocketMessageType;
  event: string;
  data: T;
  timestamp: string;
  id?: string;
  userId?: string;
}

/**
 * Real-time subscription
 */
export interface RealtimeSubscription {
  id: string;
  channel: string;
  events: string[];
  filters?: Record<string, any>;
  callback: (message: WebSocketMessage) => void;
  isActive: boolean;
  createdAt: string;
}

// =============================================================================
// BATCH OPERATIONS
// =============================================================================

/**
 * Batch request item
 */
export interface BatchRequestItem {
  id: string;
  method: HttpMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

/**
 * Batch request
 */
export interface BatchRequest extends BaseApiRequest {
  method: "POST";
  requests: BatchRequestItem[];
  continueOnError?: boolean;
}

/**
 * Batch response item
 */
export interface BatchResponseItem<T = any> {
  id: string;
  status: number;
  success: boolean;
  data?: T;
  error?: ExtendedApiError;
}

/**
 * Batch response
 */
export interface BatchResponse<T = any>
  extends SuccessResponse<BatchResponseItem<T>[]> {
  summary: {
    total: number;
    successful: number;
    failed: number;
    duration: number;
  };
}

// =============================================================================
// API MONITORING TYPES
// =============================================================================

/**
 * API metrics
 */
export interface ApiMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  throughput: number; // requests per second
  timestamp: string;
}

/**
 * Endpoint metrics
 */
export interface EndpointMetrics extends ApiMetrics {
  endpoint: string;
  method: HttpMethod;
  statusCodes: Record<number, number>;
}

/**
 * API health status
 */
export interface ApiHealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  uptime: number;
  version: string;
  services: Record<string, "up" | "down" | "degraded">;
  checks: Array<{
    name: string;
    status: "pass" | "fail" | "warn";
    message?: string;
    duration?: number;
  }>;
  timestamp: string;
}

// =============================================================================
// TYPE UTILITIES
// =============================================================================

/**
 * Extract request type from endpoint
 */
export type RequestTypeOf<T> = T extends { request: infer R } ? R : never;

/**
 * Extract response type from endpoint
 */
export type ResponseTypeOf<T> = T extends { response: infer R } ? R : never;

/**
 * API endpoint definition
 */
export interface ApiEndpointDefinition<TRequest = any, TResponse = any> {
  path: string;
  method: HttpMethod;
  request?: TRequest;
  response?: TResponse;
  auth?: boolean;
  cache?: CacheConfig;
  retry?: RetryConfig;
  rateLimit?: {
    requests: number;
    window: number; // seconds
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * API constants
 */
export const API_CONSTANTS = {
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  DEFAULT_RETRIES: 3,
  DEFAULT_RETRY_DELAY: 1000, // 1 second
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MAX_BATCH_SIZE: 50,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  CACHE_TTL: {
    SHORT: 5 * 60, // 5 minutes
    MEDIUM: 30 * 60, // 30 minutes
    LONG: 2 * 60 * 60, // 2 hours
    VERY_LONG: 24 * 60 * 60, // 24 hours
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    VALIDATION_ERROR: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
  CONTENT_TYPES: {
    JSON: "application/json",
    FORM_DATA: "multipart/form-data",
    URL_ENCODED: "application/x-www-form-urlencoded",
    TEXT: "text/plain",
    HTML: "text/html",
    XML: "application/xml",
  },
} as const;
