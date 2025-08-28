/**
 * Admin Dashboard Types
 * Types untuk dashboard admin dan management
 */

import {
  BaseEntity,
  BasicStats,
  TimeSeriesData,
  ChartData,
  Priority,
  Status,
} from "./common";
import { User, UserRole, SecurityLog } from "./auth";

// =============================================================================
// DASHBOARD OVERVIEW TYPES
// =============================================================================

/**
 * Dashboard overview statistics
 */
export interface DashboardStats {
  // User statistics
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    verified: number;
    growth: number; // percentage
    byRole: Record<UserRole, number>;
    byStatus: Record<string, number>;
  };

  // Content statistics
  content: {
    articles: BasicStats;
    announcements: BasicStats;
    events: BasicStats;
    documents: BasicStats;
    services: BasicStats;
  };

  // Service requests
  serviceRequests: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    rejected: number;
    avgProcessingTime: number; // hours
    completionRate: number; // percentage
  };

  // Tourism & UMKM
  business: {
    tourismDestinations: BasicStats;
    umkmRegistrations: BasicStats;
    activeBusinesses: number;
    pendingApprovals: number;
  };

  // System metrics
  system: {
    totalStorage: number; // bytes
    usedStorage: number; // bytes
    bandwidth: number; // bytes
    uptime: number; // percentage
    errors: number;
    warnings: number;
  };

  // Financial metrics (for UMKM transactions)
  financial?: {
    totalRevenue: number;
    monthlyRevenue: number;
    transactionCount: number;
    averageOrderValue: number;
  };
}

/**
 * Real-time dashboard metrics
 */
export interface RealtimeMetrics {
  activeUsers: number;
  onlineVisitors: number;
  currentRequests: number;
  systemLoad: number; // percentage
  responseTime: number; // ms
  errorRate: number; // percentage
  lastUpdated: string;
}

/**
 * Activity summary
 */
export interface ActivitySummary {
  recentActions: AdminAction[];
  popularContent: PopularContent[];
  topUsers: TopUser[];
  systemAlerts: SystemAlert[];
}

// =============================================================================
// ADMIN ACTIONS & LOGS
// =============================================================================

/**
 * Admin action types
 */
export type AdminActionType =
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "USER_SUSPENDED"
  | "USER_VERIFIED"
  | "CONTENT_PUBLISHED"
  | "CONTENT_UNPUBLISHED"
  | "CONTENT_DELETED"
  | "SERVICE_APPROVED"
  | "SERVICE_REJECTED"
  | "DOCUMENT_APPROVED"
  | "DOCUMENT_REJECTED"
  | "SYSTEM_UPDATED"
  | "SETTINGS_CHANGED"
  | "BACKUP_CREATED"
  | "MAINTENANCE_MODE"
  | "BULK_OPERATION";

/**
 * Admin action log
 */
export interface AdminAction extends BaseEntity {
  type: AdminActionType;
  description: string;
  performedBy: string;
  performedByName: string;
  targetType: string; // Entity type (user, article, etc.)
  targetId: string;
  targetName?: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

/**
 * Popular content item
 */
export interface PopularContent {
  id: string;
  type: "article" | "announcement" | "event" | "service";
  title: string;
  views: number;
  engagement: number;
  author: string;
  publishedAt: string;
}

/**
 * Top user
 */
export interface TopUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loginCount: number;
  lastActive: string;
  contribution: number; // Activity score
}

/**
 * System alert
 */
export interface SystemAlert {
  id: string;
  type: "ERROR" | "WARNING" | "INFO" | "SUCCESS";
  severity: Priority;
  title: string;
  message: string;
  component: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// =============================================================================
// USER MANAGEMENT TYPES
// =============================================================================

/**
 * User management query
 */
export interface UserManagementQuery {
  search?: string;
  role?: UserRole | UserRole[];
  status?: string | string[];
  verified?: boolean;
  hasAvatar?: boolean;
  lastLoginAfter?: string;
  lastLoginBefore?: string;
  registeredAfter?: string;
  registeredBefore?: string;
  sortBy?: "name" | "email" | "createdAt" | "lastLoginAt" | "role";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

/**
 * User bulk operations
 */
export interface UserBulkOperation {
  operation:
    | "activate"
    | "deactivate"
    | "suspend"
    | "verify"
    | "delete"
    | "export"
    | "notify";
  userIds: string[];
  reason?: string;
  notificationMessage?: string;
  options?: Record<string, any>;
}

/**
 * User management action
 */
export interface UserManagementAction {
  userId: string;
  action:
    | "activate"
    | "deactivate"
    | "suspend"
    | "verify"
    | "delete"
    | "reset_password"
    | "unlock";
  reason?: string;
  notifyUser?: boolean;
  customMessage?: string;
}

/**
 * Role assignment
 */
export interface RoleAssignment {
  userId: string;
  newRole: UserRole;
  reason: string;
  effectiveDate?: string;
  expiryDate?: string;
}

// =============================================================================
// CONTENT MANAGEMENT TYPES
// =============================================================================

/**
 * Content overview statistics
 */
export interface ContentStats {
  articles: ContentTypeStats;
  announcements: ContentTypeStats;
  events: ContentTypeStats;
  services: ContentTypeStats;
}

/**
 * Content type statistics
 */
export interface ContentTypeStats {
  total: number;
  published: number;
  draft: number;
  pending: number;
  scheduled: number;
  archived: number;
  thisMonth: number;
  growth: number; // percentage
  topAuthors: Array<{
    authorId: string;
    authorName: string;
    count: number;
  }>;
}

/**
 * Content moderation queue
 */
export interface ModerationQueue {
  pending: ModerationItem[];
  inReview: ModerationItem[];
  total: number;
  avgReviewTime: number; // hours
}

/**
 * Moderation item
 */
export interface ModerationItem {
  id: string;
  type: "article" | "announcement" | "event" | "comment" | "review";
  title: string;
  author: string;
  authorId: string;
  submittedAt: string;
  priority: Priority;
  flaggedReasons?: string[];
  assignedTo?: string;
  reviewDeadline?: string;
  content?: string;
  status: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED";
}

/**
 * Content approval action
 */
export interface ContentApprovalAction {
  itemId: string;
  action: "approve" | "reject" | "request_changes";
  reason?: string;
  feedback?: string;
  assignTo?: string;
  schedulePublish?: string;
}

// =============================================================================
// SYSTEM MANAGEMENT TYPES
// =============================================================================

/**
 * System settings
 */
export interface SystemSettings {
  // General settings
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    adminEmail: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
    maintenanceMessage?: string;
  };

  // Security settings
  security: {
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    lockoutDuration: number; // minutes
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      preventCommon: boolean;
    };
    twoFactorRequired: boolean;
    allowedFileTypes: string[];
    maxFileSize: number; // bytes
  };

  // Email settings
  email: {
    provider: "smtp" | "sendgrid" | "mailgun" | "ses";
    fromEmail: string;
    fromName: string;
    replyToEmail?: string;
    templatesEnabled: boolean;
    notificationsEnabled: boolean;
  };

  // Storage settings
  storage: {
    provider: "local" | "s3" | "gcs" | "azure";
    maxStorage: number; // bytes
    retentionPeriod: number; // days
    backupEnabled: boolean;
    backupFrequency: "daily" | "weekly" | "monthly";
  };

  // API settings
  api: {
    rateLimit: number; // requests per minute
    enableCors: boolean;
    allowedOrigins: string[];
    enableDocs: boolean;
    enableMetrics: boolean;
  };

  // Analytics settings
  analytics: {
    enabled: boolean;
    provider?: "google" | "custom";
    trackingId?: string;
    enableHeatmaps: boolean;
    dataRetention: number; // days
  };
}

/**
 * System health check
 */
export interface SystemHealth {
  status: "healthy" | "degraded" | "unhealthy";
  uptime: number; // seconds
  version: string;
  lastCheck: string;
  checks: HealthCheck[];
  metrics: SystemMetrics;
}

/**
 * Health check item
 */
export interface HealthCheck {
  name: string;
  status: "pass" | "warn" | "fail";
  message?: string;
  responseTime?: number; // ms
  lastCheck: string;
  details?: Record<string, any>;
}

/**
 * System metrics
 */
export interface SystemMetrics {
  cpu: {
    usage: number; // percentage
    load: number[];
  };
  memory: {
    used: number; // bytes
    total: number; // bytes
    percentage: number;
  };
  disk: {
    used: number; // bytes
    total: number; // bytes
    percentage: number;
  };
  database: {
    connections: number;
    queries: number;
    responseTime: number; // ms
  };
  api: {
    requests: number;
    errors: number;
    responseTime: number; // ms
  };
}

// =============================================================================
// ANALYTICS & REPORTING TYPES
// =============================================================================

/**
 * Analytics overview
 */
export interface AnalyticsOverview {
  visitors: {
    total: number;
    unique: number;
    returning: number;
    growth: number; // percentage
    timeline: TimeSeriesData;
  };

  pageViews: {
    total: number;
    growth: number; // percentage
    timeline: TimeSeriesData;
    topPages: Array<{
      path: string;
      views: number;
      uniqueViews: number;
    }>;
  };

  engagement: {
    avgSessionDuration: number; // seconds
    bounceRate: number; // percentage
    pagesPerSession: number;
    conversionRate: number; // percentage
  };

  demographics: {
    countries: Array<{
      country: string;
      visitors: number;
      percentage: number;
    }>;
    devices: Array<{
      device: string;
      visitors: number;
      percentage: number;
    }>;
    browsers: Array<{
      browser: string;
      visitors: number;
      percentage: number;
    }>;
  };
}

/**
 * Report configuration
 */
export interface ReportConfig {
  type: "users" | "content" | "services" | "analytics" | "system" | "custom";
  name: string;
  description?: string;
  filters: Record<string, any>;
  columns: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  dateRange: {
    start: string;
    end: string;
  };
  format: "csv" | "excel" | "pdf" | "json";
  frequency?: "once" | "daily" | "weekly" | "monthly";
  recipients?: string[];
}

/**
 * Generated report
 */
export interface GeneratedReport {
  id: string;
  config: ReportConfig;
  status: "GENERATING" | "COMPLETED" | "FAILED";
  progress: number; // percentage
  fileUrl?: string;
  fileSize?: number;
  recordCount?: number;
  generatedAt?: string;
  generatedBy: string;
  error?: string;
  expiresAt?: string;
}

// =============================================================================
// BACKUP & MAINTENANCE TYPES
// =============================================================================

/**
 * Backup configuration
 */
export interface BackupConfig {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  time: string; // HH:MM format
  retention: number; // days
  includeFiles: boolean;
  includeDatabase: boolean;
  includeUploads: boolean;
  compression: boolean;
  encryption: boolean;
  destination: "local" | "s3" | "gcs" | "azure";
  notifications: boolean;
}

/**
 * Backup record
 */
export interface BackupRecord {
  id: string;
  type: "FULL" | "INCREMENTAL" | "DIFFERENTIAL";
  status: "RUNNING" | "COMPLETED" | "FAILED";
  size: number; // bytes
  duration: number; // seconds
  location: string;
  checksum?: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
  restorable: boolean;
}

/**
 * Maintenance schedule
 */
export interface MaintenanceSchedule {
  id: string;
  title: string;
  description: string;
  type:
    | "SYSTEM_UPDATE"
    | "DATABASE_MAINTENANCE"
    | "SECURITY_PATCH"
    | "FEATURE_DEPLOYMENT";
  scheduledAt: string;
  estimatedDuration: number; // minutes
  affectedServices: string[];
  maintenanceMode: boolean;
  notifyUsers: boolean;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdBy: string;
}

// =============================================================================
// NOTIFICATION & COMMUNICATION TYPES
// =============================================================================

/**
 * System notification
 */
export interface SystemNotification {
  id: string;
  type: "INFO" | "WARNING" | "ERROR" | "SUCCESS" | "MAINTENANCE";
  title: string;
  message: string;
  targetAudience: "ALL" | "ADMINS" | "USERS" | "ROLE_BASED" | "CUSTOM";
  targetRoles?: UserRole[];
  targetUsers?: string[];
  priority: Priority;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  dismissible: boolean;
  actionUrl?: string;
  actionText?: string;
  createdBy: string;
  createdAt: string;
}

/**
 * Broadcast message
 */
export interface BroadcastMessage {
  id: string;
  subject: string;
  content: string;
  contentType: "text" | "html" | "markdown";
  recipients: {
    type: "ALL" | "ROLE_BASED" | "CUSTOM";
    roles?: UserRole[];
    userIds?: string[];
    filters?: Record<string, any>;
  };
  channels: Array<"EMAIL" | "SMS" | "PUSH" | "IN_APP">;
  scheduledAt?: string;
  status: "DRAFT" | "SCHEDULED" | "SENDING" | "SENT" | "FAILED";
  sentCount?: number;
  failedCount?: number;
  createdBy: string;
  createdAt: string;
  sentAt?: string;
}

// =============================================================================
// ADMIN USER TYPES
// =============================================================================

/**
 * Admin user permissions
 */
export interface AdminPermissions {
  dashboard: {
    view: boolean;
    export: boolean;
  };
  users: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    suspend: boolean;
    verify: boolean;
    bulkOperations: boolean;
  };
  content: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    publish: boolean;
    moderate: boolean;
    bulkOperations: boolean;
  };
  services: {
    view: boolean;
    manage: boolean;
    approve: boolean;
    reject: boolean;
  };
  system: {
    viewSettings: boolean;
    editSettings: boolean;
    viewLogs: boolean;
    backup: boolean;
    maintenance: boolean;
    analytics: boolean;
  };
  reports: {
    view: boolean;
    create: boolean;
    schedule: boolean;
    export: boolean;
  };
}

/**
 * Admin activity log query
 */
export interface AdminActivityQuery {
  adminId?: string;
  actionType?: AdminActionType | AdminActionType[];
  targetType?: string;
  severity?: string | string[];
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "severity" | "actionType";
  sortOrder?: "asc" | "desc";
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Admin constants
 */
export const ADMIN_CONSTANTS = {
  DASHBOARD_REFRESH_INTERVAL: 30000, // 30 seconds
  REALTIME_METRICS_INTERVAL: 5000, // 5 seconds
  DEFAULT_PAGE_SIZE: 25,
  MAX_BULK_OPERATIONS: 1000,
  SESSION_WARNING_TIME: 5 * 60 * 1000, // 5 minutes before expiry
  AUTO_LOGOUT_TIME: 30 * 60 * 1000, // 30 minutes inactivity
  BACKUP_RETENTION_DAYS: 30,
  LOG_RETENTION_DAYS: 90,
  REPORT_EXPIRY_DAYS: 7,
  MAX_NOTIFICATION_LENGTH: 500,
  MAX_BROADCAST_RECIPIENTS: 10000,
} as const;
