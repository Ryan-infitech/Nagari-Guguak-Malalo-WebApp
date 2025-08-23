// Main API types export
// Central export untuk semua API types dalam project

// =============================================================================
// CORE EXPORTS
// =============================================================================

// Common types
export type {
  ApiResponse,
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  ApiError,
  ValidationError,
  ResponseMetadata,
  PaginationMetadata,
  PaginationParams,
  SortParams,
  FilterParams,
  SearchParams,
  FileMetadata,
  AuditInfo,
  Status,
  ProcessingStatus,
} from './common';

// Auth types
export type {
  User,
  UserRole,
  UserProfile,
  ResidentProfile,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TokenPair,
  AuthState,
  AuthContextValue,
} from './auth';

// User types
export type {
  UserSettings,
  UserActivity,
  UserStatisticsData,
  UpdateUserProfileRequest,
  UserProfileResponse,
  UserSettingsResponse,
} from './user';

// Service types
export type {
  Service,
  ServiceSummary,
  ServiceSearchRequest,
  ServicesResponse,
  ServiceResponse,
} from './service';

// Document types
export type {
  DocumentRequest,
  DocumentRequestSummary,
  DocumentService,
  CreateDocumentRequestRequest,
  DocumentRequestsResponse,
} from './document';

// Article types
export type {
  Article,
  ArticleSummary,
  CreateArticleRequest,
  ArticlesResponse,
  ArticleResponse,
} from './article';

// Event types
export type {
  Event,
  EventSummary,
  CreateEventRequest,
  EventsResponse,
  EventResponse,
} from './event';

// Tourism types
export type {
  TourismDestination,
  TourismPackage,
  TourismReview,
  TourismDestinationsResponse,
} from './tourism';

// UMKM types
export type {
  UMKM,
  UMKMProgram,
  UMKMProgramScheduleItem,
  UMKMProgramParticipant,
  UMKMProgramRegistration,
  CreateUMKMProgramData,
  UpdateUMKMProgramData,
  UMKMProgramFilters,
  UMKMProgramStats,
  UMKMProgramResponse,
  UMKMProgramListResponse,
  UMKMProgramStatsResponse,
  UMKMCategory,
  UMKMStatus,
  UMKMProgramCategory,
  UMKMProgramStatus,
  RegisterUMKMRequest,
  UMKMListResponse,
} from './umkm';

// Other core types
export type { Announcement, AnnouncementSummary } from './announcement';
export type { Notification, NotificationPreferences } from './notification';
export type { Feedback, FeedbackStatistics } from './feedback';
export type { FileInfo, UploadFileRequest } from './file';
export type { DashboardStats, ServiceAnalytics } from './analytics';

// =============================================================================
// TYPE ALIASES & UNIONS
// =============================================================================

// Common ID types
export type EntityId = string;
export type UserId = string;
export type ServiceId = string;
export type DocumentId = string;
export type EventId = string;
export type ArticleId = string;

// Common status unions untuk filtering
export type AnyStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'COMPLETED'
  | 'CANCELLED';

// Common priority levels
export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

// Common visibility levels
export type Visibility = 'PUBLIC' | 'PRIVATE' | 'SHARED' | 'INTERNAL';

// =============================================================================
// UTILITY TYPE HELPERS
// =============================================================================

import { SuccessResponse, PaginatedResponse } from './common';

/**
 * Extract the data type from API response
 */
export type ExtractResponseData<T> = T extends SuccessResponse<infer U> ? U : never;

/**
 * Extract array item type from paginated response
 */
export type ExtractPaginatedData<T> = T extends PaginatedResponse<infer U> ? U : never;

/**
 * Make all properties of request type optional except specified keys
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Create update request type from create request type (with id required)
 */
export type UpdateRequestFrom<T> = Partial<T> & { id: string };

/**
 * Create search params type with common fields
 */
export type SearchParamsFor<T> = {
  search?: string;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
} & Partial<T>;

// =============================================================================
// API ERROR TYPES
// =============================================================================

/**
 * Standardized error codes used throughout the API
 */
export const API_ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_VALUE: 'INVALID_VALUE',

  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',

  // Business logic errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
  DEPENDENCY_ERROR: 'DEPENDENCY_ERROR',

  // System errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',

  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',

  // File upload errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  VIRUS_DETECTED: 'VIRUS_DETECTED',
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

// =============================================================================
// COMMON CONSTANTS
// =============================================================================

/**
 * Default pagination settings
 */
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

/**
 * File upload limits
 */
export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ] as const,
} as const;

/**
 * Date format constants
 */
export const DATE_FORMATS = {
  API: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  ISO_DATE: 'YYYY-MM-DD',
} as const;

// =============================================================================
// FRONTEND-SPECIFIC TYPES
// =============================================================================

/**
 * Loading states untuk UI components
 */
export interface LoadingState {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error?: string | null;
}

/**
 * Form states untuk handling forms
 */
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}

/**
 * Table/List states untuk data display
 */
export interface TableState<T = any> {
  data: T[];
  loading: LoadingState;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sorting: {
    field?: string;
    direction?: 'asc' | 'desc';
  };
  filters: Record<string, any>;
  selection: string[];
}

/**
 * Modal/Dialog states
 */
export interface ModalState {
  isOpen: boolean;
  data?: any;
  mode?: 'create' | 'edit' | 'view' | 'delete';
}

// =============================================================================
// EXPORT SUMMARY
// =============================================================================

/*
File exports summary:

1. common.ts - Base API types, pagination, error handling
2. auth.ts - Authentication, authorization, user session
3. user.ts - User management, profile, settings
4. resident.ts - Resident profiles, family data, documents
5. article.ts - Articles, news, blog posts
6. announcement.ts - Official announcements, notices
7. event.ts - Events, activities, registrations
8. service.ts - Public services, government services
9. document.ts - Document requests, templates, processing
10. tourism.ts - Tourism destinations, packages, reviews
11. umkm.ts - UMKM registration, programs, reviews
12. notification.ts - Notifications, preferences, channels
13. analytics.ts - Analytics data, reports, statistics
14. feedback.ts - Feedback, complaints, suggestions
15. file.ts - File management, uploads, storage

This index file provides:
- Complete type exports
- Utility types for common patterns
- Error codes and constants
- Frontend-specific state types
- Documentation and organization
*/
