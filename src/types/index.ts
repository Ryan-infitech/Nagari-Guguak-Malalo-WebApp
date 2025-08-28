// @ts-nocheck
/**
 * Global Types Index
 * Export semua types untuk digunakan di aplikasi
 */

// =============================================================================
// CORE TYPES - Foundation types
// =============================================================================
export * from './common';
export * from './api';

// Auth types - akan direimport dengan alias untuk ResidentProfile conflict
export type {
  User,
  UserRole,
  UserStatus,
  Permission,
  Role,
  LoginCredentials,
  RegisterData,
  TokenPair,
  RefreshTokenRequest,
  PasswordResetRequest,
  PasswordChangeRequest,
  EmailVerificationRequest,
  UserSession,
  UserActivity,
  UserPreferences,
  UserSettings,
  TwoFactorSetup,
  TwoFactorVerification,
  BackupCode,
  SecurityQuestion,
  LoginAttempt,
  SecurityLog,
  OAuthProvider,
  OAuthAccount,
  SocialLogin,
  AuthQuery,
  UserAnalytics,
  AuthContextValue,
  AuthState,
  AuthError,
} from './auth';

// =============================================================================
// ADMIN & MANAGEMENT TYPES
// =============================================================================
export * from './admin';

// Analytics types - akan direimport dengan alias untuk ServiceAnalytics conflict
export type {
  WebsiteAnalytics,
  ContentAnalytics,
  UserAnalytics as UserBehaviorAnalytics,
  AnalyticsMetric,
  AnalyticsFilter,
  AnalyticsQuery,
  AnalyticsExportJob,
  AnalyticsExportConfig,
  AnalyticsSegment,
} from './analytics';

// =============================================================================
// CONTENT TYPES
// =============================================================================
export * from './announcement';
export * from './article';
export * from './event';

// =============================================================================
// SERVICE TYPES
// =============================================================================

// Document types - akan direimport dengan alias untuk EmailTemplate conflict
export type {
  DocumentRequest,
  DocumentTemplate,
  DocumentTemplateField,
  DocumentTemplateSection,
  DocumentRequirement,
  DocumentComment,
  DocumentAttachment,
  DocumentVersion,
  DocumentApproval,
  DocumentNotification,
  DocumentStatistics,
  DocumentQuery,
  // Commented out missing types to fix TypeScript errors
  // DocumentBatch,
  // DocumentWorkflow,
  // DocumentProcessingStep,
  // DocumentError,
  // DocumentValidation,
  // PrintOptions,
  // QRCodeConfig,
  // WatermarkConfig,
  // SignatureConfig,
  // DocumentAnalytics,
  // DocumentMeta,
  DocumentRequestStatus,
  // DocumentRequestPriority,
  // DocumentRequestType,
} from './document';

// Service types - akan direimport dengan alias untuk ServiceAnalytics conflict
export type {
  ServiceCategory,
  Service,
  ServiceStatus,
  ServicePriority,
  ServiceOperatingHours,
  ServiceProcedure,
  ServiceOfficer,
  ServiceFeedback,
  ServiceRating,
  ServiceRequirement,
  ServiceDeliverable,
  ServiceQualityMetric,
  ServiceSchedule,
  ServiceBooking,
  ServiceNotification,
  ServiceStatistics,
  ServiceQuery,
  ServiceBatch,
  ServiceWorkflow,
  ServiceProcessingStep,
  ServiceError,
  ServiceValidation,
  ServiceMeta,
} from './service';

export * from './serviceRequest';

// =============================================================================
// COMMUNICATION TYPES
// =============================================================================

// Email types - akan direimport dengan alias untuk EmailTemplate conflict
export type {
  EmailCampaign,
  EmailCampaignStatus,
  EmailCampaignType,
  EmailRecipient,
  EmailMessage,
  EmailSettings,
  EmailProvider,
  EmailDeliveryStatus,
  EmailEvent,
  EmailMetrics,
  EmailSubscription,
  EmailPreference,
  EmailList,
  EmailSegment,
  EmailAutomation,
  EmailTrigger,
  EmailPersonalization,
  EmailTracking,
  EmailBounce,
  EmailComplaint,
  EmailUnsubscribe,
  EmailQuery,
  EmailBatch,
  EmailAnalytics,
  EmailStatistics,
  EmailCalendar,
  EmailSchedule,
} from './email';

export * from './notification';
export * from './feedback';

// =============================================================================
// MEDIA & FILE TYPES
// =============================================================================

// File types - akan direimport dengan alias untuk FileUploadRequest dan FileMetadata conflict
export type {
  File,
  FileType,
  FileStatus,
  FileCategory,
  FileVersion,
  FilePermission,
  FileShare,
  FileComment,
  FileTag,
  FileCollection,
  FileSync,
  FileThumbnail,
  FileProcessing,
  FileAnalytics,
  FileStatistics,
  FileQuery,
  FileBatch,
  FileOperation,
  FileError,
  FileValidation,
  UploadConfig,
  ImageProcessingOptions,
  VideoProcessingOptions,
  DocumentProcessingOptions,
  FileStorageProvider,
  FileCDNConfig,
  FileBackup,
  FileMeta,
} from './file';

// =============================================================================
// USER & RESIDENT TYPES
// =============================================================================

// Resident types - akan direimport dengan alias untuk ResidentProfile conflict
export type {
  ResidentDemographics,
  ResidentEducation,
  ResidentOccupation,
  ResidentIncome,
  ResidentFamily,
  ResidentFamilyMember,
  ResidentFamilyRelation,
  ResidentDocument,
  ResidentDocumentType,
  ResidentSocialProgram,
  ResidentProgramParticipation,
  ResidentProgramStatus,
  ResidentHealth,
  ResidentHealthRecord,
  ResidentEmergencyContact,
  ResidentSkill,
  ResidentInterest,
  ResidentComplaint,
  ResidentSuggestion,
  ResidentQuery,
  ResidentStatistics,
  ResidentAnalytics,
  ResidentSegment,
  ResidentSurvey,
  ResidentSurveyResponse,
  ResidentMeta,
} from './resident';

// =============================================================================
// BUSINESS TYPES
// =============================================================================
export * from './tourism';
export * from './package';
export * from './umkm';

// =============================================================================
// RE-EXPORTS WITH ALIASES TO RESOLVE CONFLICTS
// =============================================================================

// Analytics Service Analytics (dari analytics module)
export type { ServiceAnalytics as AnalyticsForServices } from './analytics';

// Document Email Templates (dari document module)
export type {
  EmailTemplate as DocumentEmailTemplate,
  TemplateVariable as DocumentTemplateVariable,
} from './document';

// API File Upload Request (dari api module)
export type { FileUploadRequest as ApiFileUploadRequest } from './api';

// Common File Metadata (dari common module)
export type { FileMetadata as CommonFileMetadata } from './common';

// Auth Resident Profile (dari auth module)
export type { ResidentProfile as AuthResidentProfile } from './auth';

// =============================================================================
// GLOBAL CONSTANTS
// =============================================================================

/**
 * Global application constants
 */
export const GLOBAL_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // File uploads
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],

  // Text limits
  MAX_TITLE_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_CONTENT_LENGTH: 50000,

  // Dates
  DATE_FORMAT: 'DD/MM/YYYY',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',

  // API
  API_TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT: 100, // requests per minute

  // Cache
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes

  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,

  // UI
  ANIMATION_DURATION: 200, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds

  // Responsive breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

/**
 * Indonesian locale constants
 */
export const LOCALE_CONSTANTS = {
  CURRENCY: 'IDR',
  CURRENCY_SYMBOL: 'Rp',
  LANGUAGE: 'id-ID',
  TIMEZONE: 'Asia/Jakarta',

  MONTHS: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],

  DAYS: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],

  DAYS_SHORT: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],

  COMMON_LABELS: {
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    edit: 'Edit',
    view: 'Lihat',
    create: 'Buat',
    update: 'Perbarui',
    search: 'Cari',
    filter: 'Filter',
    sort: 'Urutkan',
    export: 'Ekspor',
    import: 'Impor',
    print: 'Cetak',
    download: 'Unduh',
    upload: 'Unggah',
    next: 'Selanjutnya',
    previous: 'Sebelumnya',
    first: 'Pertama',
    last: 'Terakhir',
    yes: 'Ya',
    no: 'Tidak',
    ok: 'OK',
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    success: 'Berhasil',
    warning: 'Peringatan',
    info: 'Informasi',
    required: 'Wajib diisi',
    optional: 'Opsional',
    all: 'Semua',
    none: 'Tidak ada',
    select: 'Pilih',
    clear: 'Bersihkan',
    reset: 'Reset',
    apply: 'Terapkan',
    close: 'Tutup',
    back: 'Kembali',
    home: 'Beranda',
    profile: 'Profil',
    settings: 'Pengaturan',
    help: 'Bantuan',
    logout: 'Keluar',
    login: 'Masuk',
    register: 'Daftar',
  },
} as const;

// =============================================================================
// TYPE UTILITIES
// =============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    filters?: Record<string, any>;
    sorting?: {
      field: string;
      order: 'asc' | 'desc';
    };
    timestamp: string;
    version: string;
  };
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Generic query parameters
 */
export interface BaseQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

/**
 * Generic form state
 */
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitCount: number;
}

/**
 * Generic modal state
 */
export interface ModalState {
  isOpen: boolean;
  type?: string;
  title?: string;
  data?: any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  backdrop?: boolean;
}

/**
 * Generic loading state
 */
export interface LoadingState {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error?: string;
  lastFetch?: string;
}

/**
 * Generic selection state
 */
export interface SelectionState<T = string> {
  selected: T[];
  isAllSelected: boolean;
  isIndeterminate: boolean;
  count: number;
}

/**
 * Generic filter state
 */
export interface FilterState {
  active: Record<string, any>;
  available: Record<string, any[]>;
  count: number;
  isActive: boolean;
}

/**
 * Generic sort state
 */
export interface SortState {
  field: string;
  order: 'asc' | 'desc';
  options: Array<{
    field: string;
    label: string;
  }>;
}

/**
 * Navigation item
 */
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  badge?: string | number;
  children?: NavigationItem[];
  isActive?: boolean;
  isDisabled?: boolean;
  permission?: string;
  roles?: string[];
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

/**
 * Table column definition
 */
export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'image' | 'actions';
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
  format?: (value: any) => string;
  className?: string;
}

/**
 * Action button definition
 */
export interface ActionButton {
  id: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  isLoading?: boolean;
  permission?: string;
  roles?: string[];
  onClick?: () => void;
  href?: string;
}

/**
 * Dashboard widget
 */
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'table' | 'list' | 'custom';
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  data?: any;
  config?: any;
  isLoading?: boolean;
  error?: string;
  permission?: string;
  roles?: string[];
}

/**
 * Application theme
 */
export interface Theme {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  fontFamily: string;
  customCSS?: string;
}

/**
 * Application settings
 */
export interface AppSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo?: string;
  favicon?: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  theme: Theme;
  features: Record<string, boolean>;
  maintenance: {
    enabled: boolean;
    message?: string;
    allowedIPs?: string[];
  };
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    customScripts?: string[];
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
  };
  notifications: {
    enabled: boolean;
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
      whatsapp: boolean;
    };
    templates: Record<string, string>;
  };
  integrations: Record<string, any>;
  customFields: Record<string, any>;
}

/**
 * Error boundary props
 */
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventId?: string;
}

/**
 * Upload progress
 */
export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  url?: string;
}

/**
 * Search result
 */
export interface SearchResult {
  type: string;
  id: string;
  title: string;
  description?: string;
  url?: string;
  image?: string;
  score?: number;
  highlight?: Record<string, string[]>;
  metadata?: Record<string, any>;
}

/**
 * Export job
 */
export interface ExportJob {
  id: string;
  type: string;
  format: 'csv' | 'excel' | 'pdf' | 'json';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  recordCount?: number;
  error?: string;
  createdAt: string;
  completedAt?: string;
  expiresAt?: string;
}

/**
 * Utility types
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Required<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

export type Nullable<T> = T | null;

export type ValueOf<T> = T[keyof T];

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// =============================================================================
// GLOBAL CONSTANTS
// =============================================================================

/**
 * Global application constants
 */
export const GLOBAL_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // File uploads
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],

  // Text limits
  MAX_TITLE_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_CONTENT_LENGTH: 50000,

  // Dates
  DATE_FORMAT: 'DD/MM/YYYY',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',

  // API
  API_TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT: 100, // requests per minute

  // Cache
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes

  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,

  // UI
  ANIMATION_DURATION: 200, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds

  // Responsive breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

/**
 * Indonesian locale constants
 */
export const LOCALE_CONSTANTS = {
  CURRENCY: 'IDR',
  CURRENCY_SYMBOL: 'Rp',
  LANGUAGE: 'id-ID',
  TIMEZONE: 'Asia/Jakarta',

  MONTHS: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],

  DAYS: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],

  DAYS_SHORT: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],

  COMMON_LABELS: {
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    edit: 'Edit',
    view: 'Lihat',
    create: 'Buat',
    update: 'Perbarui',
    search: 'Cari',
    filter: 'Filter',
    sort: 'Urutkan',
    export: 'Ekspor',
    import: 'Impor',
    print: 'Cetak',
    download: 'Unduh',
    upload: 'Unggah',
    next: 'Selanjutnya',
    previous: 'Sebelumnya',
    first: 'Pertama',
    last: 'Terakhir',
    yes: 'Ya',
    no: 'Tidak',
    ok: 'OK',
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    success: 'Berhasil',
    warning: 'Peringatan',
    info: 'Informasi',
    required: 'Wajib diisi',
    optional: 'Opsional',
    all: 'Semua',
    none: 'Tidak ada',
    select: 'Pilih',
    clear: 'Bersihkan',
    reset: 'Reset',
    apply: 'Terapkan',
    close: 'Tutup',
    back: 'Kembali',
    home: 'Beranda',
    profile: 'Profil',
    settings: 'Pengaturan',
    help: 'Bantuan',
    logout: 'Keluar',
    login: 'Masuk',
    register: 'Daftar',
  },
} as const;
