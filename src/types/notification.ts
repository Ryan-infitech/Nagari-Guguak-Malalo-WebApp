/**
 * Notification Types
 * Types untuk sistem notifikasi
 */

import { BaseEntity, Priority } from "./common";
import { User } from "./auth";

// =============================================================================
// NOTIFICATION CORE TYPES
// =============================================================================

export type NotificationType =
  | "SYSTEM"
  | "ANNOUNCEMENT"
  | "DOCUMENT_UPDATE"
  | "EVENT_REMINDER"
  | "SERVICE_UPDATE"
  | "COMMENT_REPLY"
  | "USER_MENTION"
  | "ARTICLE_PUBLISHED"
  | "PAYMENT_RECEIVED"
  | "DEADLINE_REMINDER"
  | "SECURITY_ALERT"
  | "WELCOME"
  | "UMKM_PRODUCT_CREATED"
  | "UMKM_PRODUCT_UPDATED"
  | "UMKM_PRODUCT_DELETED"
  | "UMKM_UPDATE"
  | "OTHER";

export type NotificationStatus = "UNREAD" | "READ" | "ARCHIVED" | "DELETED";

export type NotificationChannel =
  | "IN_APP"
  | "EMAIL"
  | "SMS"
  | "PUSH"
  | "WHATSAPP";

export type NotificationCategory =
  | "GENERAL"
  | "SECURITY"
  | "TRANSACTION"
  | "SOCIAL"
  | "REMINDER"
  | "PROMOTIONAL"
  | "SYSTEM";

export interface Notification extends BaseEntity {
  // Basic information
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  priority: Priority;

  // Recipients
  userId: string;
  user?: User;

  // Status and tracking
  status: NotificationStatus;
  readAt?: string;
  archivedAt?: string;

  // Content
  data?: Record<string, any>; // Additional data for frontend
  actionUrl?: string;
  actionText?: string;
  imageUrl?: string;
  icon?: string;

  // Delivery
  channels: NotificationChannel[];
  deliveryStatus: Record<
    NotificationChannel,
    "PENDING" | "SENT" | "DELIVERED" | "FAILED"
  >;
  deliveredAt?: Record<NotificationChannel, string>;
  errorMessages?: Record<NotificationChannel, string>;

  // Source information
  sourceType?: "ARTICLE" | "EVENT" | "DOCUMENT" | "ANNOUNCEMENT" | "SYSTEM";
  sourceId?: string;
  senderId?: string;
  sender?: User;

  // Scheduling
  scheduledAt?: string;
  expiresAt?: string;

  // Grouping
  groupKey?: string; // For grouping similar notifications
  parentNotificationId?: string;

  // Settings
  isDismissible: boolean;
  requiresAction: boolean;
  autoArchive: boolean;

  // Engagement
  clicked: boolean;
  clickedAt?: string;

  // Metadata
  metadata?: Record<string, any>;
  deviceInfo?: string;
}

// =============================================================================
// NOTIFICATION PREFERENCES
// =============================================================================

export interface NotificationPreferences extends BaseEntity {
  userId: string;
  user?: User;

  // Global settings
  enabled: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    timezone: string;
  };

  // Channel preferences
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
  };

  // Type preferences
  types: Record<
    NotificationType,
    {
      enabled: boolean;
      channels: NotificationChannel[];
      frequency: "IMMEDIATE" | "HOURLY" | "DAILY" | "WEEKLY";
    }
  >;

  // Category preferences
  categories: Record<
    NotificationCategory,
    {
      enabled: boolean;
      priority: Priority;
      frequency: "IMMEDIATE" | "HOURLY" | "DAILY" | "WEEKLY";
    }
  >;

  // Digest settings
  digestEnabled: boolean;
  digestFrequency: "DAILY" | "WEEKLY";
  digestTime: string; // HH:MM
  digestDay?:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

  // Custom filters
  filters: Array<{
    id: string;
    name: string;
    conditions: Array<{
      field: string;
      operator: "equals" | "contains" | "starts_with" | "ends_with";
      value: string;
    }>;
    action: "ALLOW" | "BLOCK" | "ARCHIVE";
  }>;

  // Contact preferences
  contactMethods: {
    email: string;
    phone?: string;
    whatsapp?: string;
  };
}

// =============================================================================
// NOTIFICATION OPERATIONS
// =============================================================================

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  category?: NotificationCategory;
  priority?: Priority;

  // Recipients
  userIds?: string[];
  roles?: string[];
  allUsers?: boolean;

  // Content
  actionUrl?: string;
  actionText?: string;
  imageUrl?: string;
  icon?: string;
  data?: Record<string, any>;

  // Delivery
  channels?: NotificationChannel[];
  scheduledAt?: string;
  expiresAt?: string;

  // Source
  sourceType?: string;
  sourceId?: string;

  // Settings
  isDismissible?: boolean;
  requiresAction?: boolean;
  autoArchive?: boolean;
  groupKey?: string;
}

export interface NotificationQuery {
  userId?: string;
  type?: NotificationType | NotificationType[];
  category?: NotificationCategory | NotificationCategory[];
  status?: NotificationStatus | NotificationStatus[];
  priority?: Priority | Priority[];

  unreadOnly?: boolean;
  hasAction?: boolean;

  createdAfter?: string;
  createdBefore?: string;
  readAfter?: string;
  readBefore?: string;

  sourceType?: string;
  sourceId?: string;
  senderId?: string;

  search?: string;

  sortBy?: "createdAt" | "readAt" | "priority";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;

  includeDeleted?: boolean;
}

export interface NotificationBulkOperation {
  operation: "mark_read" | "mark_unread" | "archive" | "delete" | "restore";
  notificationIds: string[];
  userId: string;
}

// =============================================================================
// NOTIFICATION TEMPLATES
// =============================================================================

export interface NotificationTemplate extends BaseEntity {
  name: string;
  description?: string;
  type: NotificationType;
  category: NotificationCategory;

  // Template content
  titleTemplate: string;
  messageTemplate: string;

  // Channel-specific templates
  emailTemplate?: {
    subject: string;
    htmlContent: string;
    textContent?: string;
  };

  smsTemplate?: {
    content: string;
    maxLength: number;
  };

  pushTemplate?: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    sound?: string;
  };

  // Variables
  variables: Array<{
    name: string;
    label: string;
    type: "TEXT" | "NUMBER" | "DATE" | "BOOLEAN" | "URL";
    required: boolean;
    defaultValue?: string;
    description?: string;
  }>;

  // Settings
  isActive: boolean;
  isDefault: boolean;
  priority: Priority;

  // Usage
  usageCount: number;
  lastUsedAt?: string;

  // Version control
  version: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
}

// =============================================================================
// NOTIFICATION ANALYTICS
// =============================================================================

export interface NotificationAnalytics {
  overview: {
    totalSent: number;
    totalDelivered: number;
    totalRead: number;
    totalClicked: number;
    deliveryRate: number;
    readRate: number;
    clickRate: number;
  };

  breakdown: {
    byType: Array<{
      type: NotificationType;
      sent: number;
      delivered: number;
      read: number;
      clicked: number;
    }>;
    byChannel: Array<{
      channel: NotificationChannel;
      sent: number;
      delivered: number;
      success: number;
    }>;
    byCategory: Array<{
      category: NotificationCategory;
      sent: number;
      read: number;
      engagement: number;
    }>;
  };

  trends: Array<{
    date: string;
    sent: number;
    delivered: number;
    read: number;
    clicked: number;
  }>;

  performance: {
    topPerformingTemplates: Array<{
      templateId: string;
      templateName: string;
      sent: number;
      readRate: number;
      clickRate: number;
    }>;

    engagementByTime: Array<{
      hour: number;
      dayOfWeek: number;
      sent: number;
      readRate: number;
    }>;

    userEngagement: Array<{
      userId: string;
      userName: string;
      notificationsReceived: number;
      readRate: number;
      responseTime: number; // average minutes to read
    }>;
  };

  issues: {
    failedDeliveries: number;
    bounceRate: number;
    unsubscribeRate: number;
    spamComplaints: number;

    failureReasons: Array<{
      reason: string;
      count: number;
      channel: NotificationChannel;
    }>;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const NOTIFICATION_CONSTANTS = {
  MAX_TITLE_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 500,
  MAX_SMS_LENGTH: 160,
  MAX_PUSH_TITLE_LENGTH: 50,
  MAX_PUSH_BODY_LENGTH: 150,

  DEFAULT_EXPIRY_DAYS: 30,
  MAX_BATCH_SIZE: 1000,
  RETRY_ATTEMPTS: 3,

  QUIET_HOURS_DEFAULT: {
    start: "22:00",
    end: "07:00",
  },

  DIGEST_LIMITS: {
    DAILY: 50,
    WEEKLY: 200,
  },

  RATE_LIMITS: {
    PER_USER_PER_MINUTE: 10,
    PER_USER_PER_HOUR: 100,
    GLOBAL_PER_MINUTE: 1000,
  },
} as const;

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  SYSTEM: "Sistem",
  ANNOUNCEMENT: "Pengumuman",
  DOCUMENT_UPDATE: "Update Dokumen",
  EVENT_REMINDER: "Pengingat Acara",
  SERVICE_UPDATE: "Update Layanan",
  COMMENT_REPLY: "Balasan Komentar",
  USER_MENTION: "Disebutkan",
  ARTICLE_PUBLISHED: "Artikel Diterbitkan",
  PAYMENT_RECEIVED: "Pembayaran Diterima",
  DEADLINE_REMINDER: "Pengingat Deadline",
  SECURITY_ALERT: "Peringatan Keamanan",
  WELCOME: "Selamat Datang",
  UMKM_PRODUCT_CREATED: "Produk UMKM Ditambahkan",
  UMKM_PRODUCT_UPDATED: "Produk UMKM Diperbarui",
  UMKM_PRODUCT_DELETED: "Produk UMKM Dihapus",
  UMKM_UPDATE: "Update UMKM",
  OTHER: "Lainnya",
} as const;

export const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> =
  {
    IN_APP: "Dalam Aplikasi",
    EMAIL: "Email",
    SMS: "SMS",
    PUSH: "Push Notification",
    WHATSAPP: "WhatsApp",
  } as const;
