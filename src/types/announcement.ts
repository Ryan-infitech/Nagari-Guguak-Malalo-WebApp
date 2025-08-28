/**
 * Announcement Types
 * Types untuk sistem pengumuman/announcement
 */

import { BaseEntity, FileMetadata, Priority, Status } from "./common";
import { User } from "./auth";

// =============================================================================
// ANNOUNCEMENT CORE TYPES
// =============================================================================

/**
 * Announcement type categories
 */
export type AnnouncementType =
  | "GENERAL"
  | "IMPORTANT"
  | "URGENT"
  | "EVENT"
  | "SERVICE"
  | "MAINTENANCE"
  | "EMERGENCY"
  | "POLICY"
  | "ACHIEVEMENT"
  | "INFORMATION";

/**
 * Announcement priority levels
 */
export type AnnouncementPriority = Priority;

/**
 * Announcement status
 */
export type AnnouncementStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "SCHEDULED"
  | "ARCHIVED"
  | "REJECTED"
  | "EXPIRED";

/**
 * Announcement visibility
 */
export type AnnouncementVisibility =
  | "PUBLIC"
  | "RESIDENTS_ONLY"
  | "VERIFIED_ONLY"
  | "ROLE_BASED"
  | "CUSTOM";

/**
 * Main announcement interface
 */
export interface Announcement extends BaseEntity {
  // Basic information
  title: string;
  content: string;
  excerpt?: string;
  slug: string;

  // Classification
  type: AnnouncementType;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  visibility: AnnouncementVisibility;

  // Author information
  authorId: string;
  author?: User;
  approvedBy?: string;
  approvedAt?: string;

  // Publishing details
  publishedAt?: string;
  scheduledAt?: string;
  expiresAt?: string;
  archivedAt?: string;

  // Content metadata
  tags?: string[];
  categories?: string[];
  featured: boolean;
  sticky: boolean; // Pin to top

  // Media
  coverImage?: FileMetadata;
  attachments?: FileMetadata[];
  gallery?: FileMetadata[];

  // Engagement
  viewCount: number;
  shareCount: number;
  likeCount: number;
  commentCount: number;

  // SEO and metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Targeting
  targetAudience?: {
    roles?: string[];
    locations?: string[];
    ageGroups?: string[];
    customFilters?: Record<string, any>;
  };

  // Settings
  allowComments: boolean;
  allowSharing: boolean;
  sendNotification: boolean;
  sendEmail: boolean;
  sendSMS: boolean;

  // Analytics
  impressions?: number;
  clickThroughRate?: number;
  engagementRate?: number;

  // Additional metadata
  sourceUrl?: string;
  externalId?: string;
  customFields?: Record<string, any>;
}

/**
 * Announcement creation request
 */
export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  excerpt?: string;
  type: AnnouncementType;
  priority: AnnouncementPriority;
  visibility: AnnouncementVisibility;
  status?: AnnouncementStatus;

  // Publishing
  publishedAt?: string;
  scheduledAt?: string;
  expiresAt?: string;

  // Content metadata
  tags?: string[];
  categories?: string[];
  featured?: boolean;
  sticky?: boolean;

  // Media
  coverImageId?: string;
  attachmentIds?: string[];
  galleryIds?: string[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Targeting
  targetAudience?: {
    roles?: string[];
    locations?: string[];
    ageGroups?: string[];
    customFilters?: Record<string, any>;
  };

  // Settings
  allowComments?: boolean;
  allowSharing?: boolean;
  sendNotification?: boolean;
  sendEmail?: boolean;
  sendSMS?: boolean;

  // Additional
  sourceUrl?: string;
  customFields?: Record<string, any>;
}

/**
 * Announcement update request
 */
export interface UpdateAnnouncementRequest
  extends Partial<CreateAnnouncementRequest> {
  id: string;
  reason?: string; // Reason for update
}

// =============================================================================
// ANNOUNCEMENT QUERY TYPES
// =============================================================================

/**
 * Announcement query parameters
 */
export interface AnnouncementQuery {
  // Search
  search?: string;
  searchFields?: ("title" | "content" | "excerpt" | "tags")[];

  // Filters
  type?: AnnouncementType | AnnouncementType[];
  priority?: AnnouncementPriority | AnnouncementPriority[];
  status?: AnnouncementStatus | AnnouncementStatus[];
  visibility?: AnnouncementVisibility | AnnouncementVisibility[];

  // Author
  authorId?: string;
  authorName?: string;

  // Date filters
  publishedAfter?: string;
  publishedBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  expiresAfter?: string;
  expiresBefore?: string;

  // Content filters
  tags?: string[];
  categories?: string[];
  featured?: boolean;
  sticky?: boolean;
  hasAttachments?: boolean;
  hasCoverImage?: boolean;

  // Engagement filters
  minViews?: number;
  maxViews?: number;
  minShares?: number;
  maxShares?: number;
  minLikes?: number;
  maxLikes?: number;

  // Targeting
  targetRoles?: string[];
  targetLocations?: string[];

  // Sorting
  sortBy?:
    | "createdAt"
    | "publishedAt"
    | "updatedAt"
    | "title"
    | "viewCount"
    | "priority"
    | "expiresAt";
  sortOrder?: "asc" | "desc";

  // Pagination
  page?: number;
  limit?: number;
  offset?: number;

  // Include relations
  includeAuthor?: boolean;
  includeAttachments?: boolean;
  includeStats?: boolean;
}

/**
 * Public announcement query (for frontend)
 */
export interface PublicAnnouncementQuery {
  search?: string;
  type?: AnnouncementType | AnnouncementType[];
  priority?: AnnouncementPriority | AnnouncementPriority[];
  tags?: string[];
  categories?: string[];
  featured?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: "publishedAt" | "title" | "viewCount" | "priority";
  sortOrder?: "asc" | "desc";
}

// =============================================================================
// ANNOUNCEMENT INTERACTION TYPES
// =============================================================================

/**
 * Announcement like
 */
export interface AnnouncementLike extends BaseEntity {
  announcementId: string;
  userId: string;
  user?: User;
  ipAddress?: string;
}

/**
 * Announcement share
 */
export interface AnnouncementShare extends BaseEntity {
  announcementId: string;
  userId?: string;
  user?: User;
  platform:
    | "facebook"
    | "twitter"
    | "whatsapp"
    | "telegram"
    | "email"
    | "copy_link"
    | "download";
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

/**
 * Announcement comment
 */
export interface AnnouncementComment extends BaseEntity {
  announcementId: string;
  userId: string;
  user?: User;
  parentId?: string; // For nested comments
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  moderatedBy?: string;
  moderatedAt?: string;
  moderationReason?: string;
  likeCount: number;
  replyCount: number;
  edited: boolean;
  editedAt?: string;
  ipAddress?: string;
}

/**
 * Announcement view tracking
 */
export interface AnnouncementView extends BaseEntity {
  announcementId: string;
  userId?: string;
  sessionId: string;
  ipAddress: string;
  userAgent?: string;
  referrer?: string;
  viewDuration?: number; // seconds
  scrollDepth?: number; // percentage
  source?: "direct" | "search" | "social" | "email" | "notification" | "link";
}

// =============================================================================
// ANNOUNCEMENT MANAGEMENT TYPES
// =============================================================================

/**
 * Announcement approval workflow
 */
export interface AnnouncementApproval extends BaseEntity {
  announcementId: string;
  announcement?: Announcement;
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED";
  priority: Priority;
  deadline?: string;
  reviewNotes?: string;
  changes?: AnnouncementChange[];
  notificationSent: boolean;
}

/**
 * Announcement change tracking
 */
export interface AnnouncementChange extends BaseEntity {
  announcementId: string;
  changedBy: string;
  changeType:
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "PUBLISH"
    | "UNPUBLISH"
    | "APPROVE"
    | "REJECT"
    | "ARCHIVE";
  fieldName?: string;
  oldValue?: any;
  newValue?: any;
  reason?: string;
  metadata?: Record<string, any>;
}

/**
 * Announcement bulk operations
 */
export interface AnnouncementBulkOperation {
  operation:
    | "publish"
    | "unpublish"
    | "archive"
    | "delete"
    | "approve"
    | "reject"
    | "feature"
    | "unfeature";
  announcementIds: string[];
  reason?: string;
  scheduledAt?: string;
  notifyAuthors?: boolean;
  customMessage?: string;
}

/**
 * Announcement template
 */
export interface AnnouncementTemplate extends BaseEntity {
  name: string;
  description?: string;
  type: AnnouncementType;
  titleTemplate: string;
  contentTemplate: string;
  defaultPriority: AnnouncementPriority;
  defaultVisibility: AnnouncementVisibility;
  defaultSettings: {
    allowComments?: boolean;
    allowSharing?: boolean;
    sendNotification?: boolean;
    sendEmail?: boolean;
    sendSMS?: boolean;
  };
  placeholders?: Array<{
    key: string;
    label: string;
    type: "text" | "number" | "date" | "select" | "textarea";
    required: boolean;
    options?: string[];
    defaultValue?: string;
  }>;
  isActive: boolean;
  usageCount: number;
  createdBy: string;
}

// =============================================================================
// ANNOUNCEMENT STATISTICS TYPES
// =============================================================================

/**
 * Announcement statistics
 */
export interface AnnouncementStats {
  announcement: Announcement;
  metrics: {
    views: {
      total: number;
      unique: number;
      today: number;
      thisWeek: number;
      thisMonth: number;
      growth: number; // percentage
    };
    engagement: {
      likes: number;
      shares: number;
      comments: number;
      averageReadTime: number; // seconds
      engagementRate: number; // percentage
    };
    reach: {
      impressions: number;
      clickThroughRate: number; // percentage
      conversionRate: number; // percentage (if applicable)
    };
    demographics: {
      byAge: Array<{ ageGroup: string; count: number; percentage: number }>;
      byLocation: Array<{
        location: string;
        count: number;
        percentage: number;
      }>;
      byRole: Array<{ role: string; count: number; percentage: number }>;
    };
    timeline: Array<{
      date: string;
      views: number;
      likes: number;
      shares: number;
      comments: number;
    }>;
  };
  performance: {
    score: number; // 0-100
    ranking: number;
    category: "excellent" | "good" | "average" | "poor";
    recommendations: string[];
  };
}

/**
 * Announcement analytics overview
 */
export interface AnnouncementAnalytics {
  overview: {
    totalAnnouncements: number;
    publishedAnnouncements: number;
    draftAnnouncements: number;
    scheduledAnnouncements: number;
    totalViews: number;
    totalEngagement: number;
    averageEngagementRate: number;
  };

  performance: {
    topPerforming: Announcement[];
    recentlyPublished: Announcement[];
    mostEngaged: Announcement[];
    trending: Announcement[];
  };

  trends: {
    viewTrends: Array<{ date: string; views: number; engagement: number }>;
    typeTrends: Array<{
      type: AnnouncementType;
      count: number;
      growth: number;
    }>;
    engagementTrends: Array<{
      date: string;
      likes: number;
      shares: number;
      comments: number;
    }>;
  };

  insights: {
    bestPerformingTypes: AnnouncementType[];
    optimalPublishTimes: Array<{
      hour: number;
      dayOfWeek: number;
      score: number;
    }>;
    averageLifespan: number; // days
    retentionRate: number; // percentage
  };
}

// =============================================================================
// ANNOUNCEMENT NOTIFICATION TYPES
// =============================================================================

/**
 * Announcement notification preferences
 */
export interface AnnouncementNotificationPreferences {
  userId: string;
  enabled: boolean;
  types: AnnouncementType[];
  priorities: AnnouncementPriority[];
  channels: Array<"EMAIL" | "SMS" | "PUSH" | "IN_APP">;
  frequency: "IMMEDIATE" | "HOURLY" | "DAILY" | "WEEKLY";
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM
    endTime: string; // HH:MM
  };
  location?: string;
  customFilters?: Record<string, any>;
}

/**
 * Announcement notification
 */
export interface AnnouncementNotification extends BaseEntity {
  announcementId: string;
  announcement?: Announcement;
  userId: string;
  user?: User;
  type:
    | "NEW_ANNOUNCEMENT"
    | "ANNOUNCEMENT_UPDATE"
    | "ANNOUNCEMENT_REMINDER"
    | "ANNOUNCEMENT_EXPIRING";
  channel: "EMAIL" | "SMS" | "PUSH" | "IN_APP";
  title: string;
  message: string;
  status: "PENDING" | "SENT" | "DELIVERED" | "FAILED" | "CANCELLED";
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  clickedAt?: string;
  errorMessage?: string;
  retryCount: number;
  metadata?: Record<string, any>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Announcement constants
 */
export const ANNOUNCEMENT_CONSTANTS = {
  MAX_TITLE_LENGTH: 200,
  MAX_EXCERPT_LENGTH: 500,
  MAX_CONTENT_LENGTH: 50000,
  MAX_TAGS: 10,
  MAX_CATEGORIES: 5,
  MAX_ATTACHMENTS: 20,
  MAX_GALLERY_IMAGES: 50,
  DEFAULT_EXPIRY_DAYS: 90,
  FEATURED_LIMIT: 10,
  STICKY_LIMIT: 5,
  AUTO_ARCHIVE_DAYS: 365,
  NOTIFICATION_BATCH_SIZE: 1000,
  VIEW_TRACKING_THROTTLE: 5000, // 5 seconds
  SEARCH_MIN_LENGTH: 3,
  EXCERPT_AUTO_LENGTH: 150,
  SLUG_MAX_LENGTH: 100,
  META_TITLE_MAX_LENGTH: 60,
  META_DESCRIPTION_MAX_LENGTH: 160,
} as const;

/**
 * Announcement type labels (Indonesian)
 */
export const ANNOUNCEMENT_TYPE_LABELS: Record<AnnouncementType, string> = {
  GENERAL: "Umum",
  IMPORTANT: "Penting",
  URGENT: "Mendesak",
  EVENT: "Acara",
  SERVICE: "Layanan",
  MAINTENANCE: "Pemeliharaan",
  EMERGENCY: "Darurat",
  POLICY: "Kebijakan",
  ACHIEVEMENT: "Prestasi",
  INFORMATION: "Informasi",
} as const;

/**
 * Announcement status labels (Indonesian)
 */
export const ANNOUNCEMENT_STATUS_LABELS: Record<AnnouncementStatus, string> = {
  DRAFT: "Konsep",
  PENDING_REVIEW: "Menunggu Persetujuan",
  APPROVED: "Disetujui",
  PUBLISHED: "Dipublikasikan",
  SCHEDULED: "Terjadwal",
  ARCHIVED: "Diarsipkan",
  REJECTED: "Ditolak",
  EXPIRED: "Kedaluwarsa",
} as const;

/**
 * Announcement visibility labels (Indonesian)
 */
export const ANNOUNCEMENT_VISIBILITY_LABELS: Record<
  AnnouncementVisibility,
  string
> = {
  PUBLIC: "Publik",
  RESIDENTS_ONLY: "Khusus Warga",
  VERIFIED_ONLY: "Khusus Terverifikasi",
  ROLE_BASED: "Berdasarkan Peran",
  CUSTOM: "Kustom",
} as const;
