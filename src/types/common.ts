/**
 * Common Shared Types
 * Common types yang digunakan di seluruh aplikasi
 */

// =============================================================================
// CORE COMMON TYPES
// =============================================================================

/**
 * Base entity dengan audit fields
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

/**
 * Soft deletable entity
 */
export interface SoftDeletableEntity extends BaseEntity {
  deletedAt?: string;
  deletedBy?: string;
  isDeleted: boolean;
}

/**
 * Versionable entity
 */
export interface VersionableEntity extends BaseEntity {
  version: number;
}

/**
 * Metadata untuk entities
 */
export interface EntityMetadata {
  description?: string;
  tags?: string[];
  category?: string;
  priority?: Priority;
  visibility?: Visibility;
}

// =============================================================================
// COMMON ENUMS & LITERALS
// =============================================================================

/**
 * Status umum
 */
export type Status =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'SUSPENDED';

/**
 * Processing status
 */
export type ProcessingStatus =
  | 'WAITING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED';

/**
 * Priority levels
 */
export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

/**
 * Visibility levels
 */
export type Visibility = 'PUBLIC' | 'PRIVATE' | 'INTERNAL' | 'RESTRICTED';

/**
 * Language codes
 */
export type Language = 'id' | 'en' | 'min'; // Indonesian, English, Minangkabau

/**
 * Indonesia regions (fokus Sumatera Barat)
 */
export type Region =
  | 'SUMBAR'
  | 'AGAM'
  | 'PADANG'
  | 'BUKITTINGGI'
  | 'PAYAKUMBUH'
  | 'SOLOK'
  | 'SIJUNJUNG'
  | 'DHARMASRAYA'
  | 'LIMA_PULUH_KOTA'
  | 'PADANG_PARIAMAN'
  | 'PESISIR_SELATAN'
  | 'TANAH_DATAR'
  | 'PASAMAN'
  | 'PASAMAN_BARAT'
  | 'KEPULAUAN_MENTAWAI';

// =============================================================================
// COMMON RESPONSE TYPES
// =============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiError[];
  metadata?: ResponseMetadata;
  timestamp: string;
}

/**
 * Success response
 */
export interface SuccessResponse<T = any> extends Omit<ApiResponse<T>, 'success' | 'errors'> {
  success: true;
  data: T;
}

/**
 * Error response
 */
export interface ErrorResponse extends Omit<ApiResponse, 'success' | 'data'> {
  success: false;
  errors: ApiError[];
}

/**
 * API Error detail
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  value?: any;
  details?: Record<string, any>;
}

/**
 * Validation error
 */
export interface ValidationError extends ApiError {
  field: string;
  constraints: string[];
}

/**
 * Response metadata
 */
export interface ResponseMetadata {
  requestId?: string;
  version?: string;
  timestamp?: string;
  duration?: number;
  source?: string;
  [key: string]: any;
}

// =============================================================================
// PAGINATION TYPES
// =============================================================================

/**
 * Paginated response
 */
export interface PaginatedResponse<T = any> extends SuccessResponse<T[]> {
  pagination: PaginationMetadata;
}

/**
 * Pagination metadata
 */
export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter parameters
 */
export interface FilterParams {
  status?: Status | Status[];
  visibility?: Visibility | Visibility[];
  category?: string | string[];
  tags?: string | string[];
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
}

/**
 * Search parameters
 */
export interface SearchParams {
  search?: string;
  searchFields?: string[];
  fuzzy?: boolean;
  highlight?: boolean;
}

// =============================================================================
// QUERY TYPES
// =============================================================================

/**
 * Base query parameters
 */
export interface BaseQuery extends PaginationParams, SortParams, FilterParams, SearchParams {
  include?: string[];
  exclude?: string[];
  expand?: string[];
  fields?: string[];
}

/**
 * List query parameters
 */
export interface ListQuery extends BaseQuery {
  ids?: string[];
  userId?: string;
  groupBy?: string;
  aggregations?: string[];
}

// =============================================================================
// FILE & MEDIA TYPES
// =============================================================================

/**
 * File metadata
 */
export interface FileMetadata {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  extension: string;
  url: string;
  thumbnailUrl?: string;
  path?: string;
  bucket?: string;
  checksum?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

/**
 * Image metadata
 */
export interface ImageMetadata extends FileMetadata {
  width: number;
  height: number;
  format: string;
  colorSpace?: string;
  hasAlpha?: boolean;
  orientation?: number;
}

/**
 * Media item
 */
export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  title?: string;
  description?: string;
  altText?: string;
  caption?: string;
  metadata: FileMetadata | ImageMetadata;
  sortOrder?: number;
  isPublic: boolean;
  status: Status;
}

// =============================================================================
// LOCATION & ADDRESS TYPES
// =============================================================================

/**
 * Geographic coordinates
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

/**
 * Indonesian address
 */
export interface Address {
  street: string;
  village?: string; // Nagari/Desa
  subdistrict: string; // Kecamatan
  district: string; // Kabupaten/Kota
  province: string; // Provinsi
  postalCode: string;
  country: string;
  coordinates?: Coordinates;
  formatted?: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  address?: Address;
  socialMedia?: SocialMediaLink[];
}

/**
 * Social media link
 */
export interface SocialMediaLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'linkedin' | 'website';
  url: string;
  username?: string;
  isVerified?: boolean;
}

// =============================================================================
// AUDIT & TRACKING TYPES
// =============================================================================

/**
 * Audit information
 */
export interface AuditInfo {
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  version: number;
}

/**
 * Activity log
 */
export interface ActivityLog {
  id: string;
  entityType: string;
  entityId: string;
  action: ActivityAction;
  description: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
  userId?: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp: string;
}

/**
 * Activity actions
 */
export type ActivityAction =
  | 'CREATE'
  | 'READ'
  | 'UPDATE'
  | 'DELETE'
  | 'PUBLISH'
  | 'ARCHIVE'
  | 'APPROVE'
  | 'REJECT'
  | 'RESTORE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'DOWNLOAD'
  | 'SHARE'
  | 'COMMENT'
  | 'LIKE'
  | 'BOOKMARK';

// =============================================================================
// STATISTICS & METRICS TYPES
// =============================================================================

/**
 * Basic statistics
 */
export interface BasicStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  growth: number; // percentage
  period: 'day' | 'week' | 'month' | 'year';
}

/**
 * Time series data point
 */
export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

/**
 * Time series data
 */
export interface TimeSeriesData {
  label: string;
  data: TimeSeriesDataPoint[];
  unit?: string;
  color?: string;
}

/**
 * Chart data
 */
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    [key: string]: any;
  }[];
}

// =============================================================================
// SETTINGS & CONFIGURATION TYPES
// =============================================================================

/**
 * Application settings
 */
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: Language;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: 'IDR';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

/**
 * Notification settings
 */
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  browser: boolean;
  frequency: 'realtime' | 'daily' | 'weekly';
  types: Record<string, boolean>;
}

/**
 * Privacy settings
 */
export interface PrivacySettings {
  profileVisibility: Visibility;
  showEmail: boolean;
  showPhone: boolean;
  allowAnalytics: boolean;
  allowMarketing: boolean;
  dataRetention: number; // days
}

// =============================================================================
// FORM & VALIDATION TYPES
// =============================================================================

/**
 * Form field error
 */
export interface FieldError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Form state
 */
export interface FormState<T = any> {
  data: T;
  errors: FieldError[];
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  touchedFields: Set<string>;
}

/**
 * Validation rule
 */
export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'url' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean | Promise<boolean>;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Optional fields
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Required fields
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Timestamp fields
 */
export type WithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
};

/**
 * ID field
 */
export type WithId<T> = T & {
  id: string;
};

/**
 * Extract ID type
 */
export type IdOf<T> = T extends { id: infer U } ? U : never;

/**
 * Deep partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Non-nullable fields
 */
export type NonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Common constants
 */
export const COMMON_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_LANGUAGE: 'id' as Language,
  DEFAULT_TIMEZONE: 'Asia/Jakarta',
  DEFAULT_CURRENCY: 'IDR',
  FILE_SIZE_LIMITS: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    VIDEO: 100 * 1024 * 1024, // 100MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    AUDIO: 25 * 1024 * 1024, // 25MB
  },
  SUPPORTED_LANGUAGES: ['id', 'en', 'min'] as Language[],
  SUPPORTED_REGIONS: [
    'SUMBAR',
    'AGAM',
    'PADANG',
    'BUKITTINGGI',
    'PAYAKUMBUH',
    'SOLOK',
    'SIJUNJUNG',
    'DHARMASRAYA',
    'LIMA_PULUH_KOTA',
    'PADANG_PARIAMAN',
    'PESISIR_SELATAN',
    'TANAH_DATAR',
    'PASAMAN',
    'PASAMAN_BARAT',
    'KEPULAUAN_MENTAWAI',
  ] as Region[],
} as const;

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Check if response is success
 */
export function isSuccessResponse<T>(response: ApiResponse<T>): response is SuccessResponse<T> {
  return response.success === true;
}

/**
 * Check if response is error
 */
export function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  return response.success === false;
}

/**
 * Check if response is paginated
 */
export function isPaginatedResponse<T>(
  response: ApiResponse<T[]>
): response is PaginatedResponse<T> {
  return isSuccessResponse(response) && 'pagination' in response;
}

/**
 * Check if entity has timestamps
 */
export function hasTimestamps(entity: any): entity is WithTimestamps<any> {
  return entity && typeof entity.createdAt === 'string' && typeof entity.updatedAt === 'string';
}

/**
 * Check if entity has ID
 */
export function hasId(entity: any): entity is WithId<any> {
  return entity && typeof entity.id === 'string';
}
