/**
 * Feedback Types
 * Types untuk sistem feedback dan rating
 */

import { BaseEntity } from "./common";
import { User } from "./auth";

// =============================================================================
// FEEDBACK CORE TYPES
// =============================================================================

export type FeedbackType =
  | "SERVICE_RATING"
  | "ARTICLE_RATING"
  | "EVENT_RATING"
  | "GENERAL_FEEDBACK"
  | "BUG_REPORT"
  | "FEATURE_REQUEST"
  | "COMPLAINT"
  | "SUGGESTION"
  | "TESTIMONIAL";

export type FeedbackStatus =
  | "PENDING"
  | "REVIEWED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "REJECTED";

export type FeedbackPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type FeedbackCategory =
  | "WEBSITE"
  | "SERVICE_QUALITY"
  | "STAFF_BEHAVIOR"
  | "PROCESS_IMPROVEMENT"
  | "TECHNICAL_ISSUE"
  | "CONTENT_QUALITY"
  | "USER_EXPERIENCE"
  | "OTHER";

export interface Feedback extends BaseEntity {
  // Basic information
  title: string;
  content: string;
  type: FeedbackType;
  category: FeedbackCategory;
  status: FeedbackStatus;
  priority: FeedbackPriority;

  // Rating (1-5)
  rating?: number;

  // User information
  userId?: string;
  user?: User;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  isAnonymous: boolean;

  // Target information
  targetType?: "SERVICE" | "ARTICLE" | "EVENT" | "DOCUMENT" | "GENERAL";
  targetId?: string;
  targetTitle?: string;

  // Processing
  assignedTo?: string;
  assignedAt?: string;
  resolvedAt?: string;
  responseMessage?: string;
  internalNotes?: string;

  // Engagement
  helpfulCount: number;
  reportCount: number;
  isPublic: boolean;
  isVerifiedPurchase?: boolean;

  // Contact preferences
  requestCallback?: boolean;
  preferredContactMethod?: "EMAIL" | "PHONE" | "WHATSAPP";
  preferredContactTime?: string;

  // Attachments
  attachments?: string[]; // File IDs

  // Metadata
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
  pageUrl?: string;

  // Follow-up
  followUpRequired: boolean;
  followUpAt?: string;
  satisfactionScore?: number; // Post-resolution satisfaction
}

export interface CreateFeedbackRequest {
  title: string;
  content: string;
  type: FeedbackType;
  category: FeedbackCategory;
  rating?: number;
  targetType?: string;
  targetId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  isAnonymous?: boolean;
  requestCallback?: boolean;
  preferredContactMethod?: "EMAIL" | "PHONE" | "WHATSAPP";
  attachmentIds?: string[];
}

export interface FeedbackQuery {
  search?: string;
  type?: FeedbackType | FeedbackType[];
  category?: FeedbackCategory | FeedbackCategory[];
  status?: FeedbackStatus | FeedbackStatus[];
  priority?: FeedbackPriority | FeedbackPriority[];
  rating?: number | number[];
  userId?: string;
  assignedTo?: string;
  targetType?: string;
  targetId?: string;
  isAnonymous?: boolean;
  dateRange?: { start: string; end: string };
  sortBy?: "createdAt" | "rating" | "priority" | "status";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// =============================================================================
// FEEDBACK ANALYTICS
// =============================================================================

export interface FeedbackAnalytics {
  overview: {
    totalFeedback: number;
    averageRating: number;
    responseRate: number;
    resolutionTime: number; // average hours
    satisfactionScore: number;
  };

  breakdown: {
    byType: Array<{ type: FeedbackType; count: number; avgRating: number }>;
    byCategory: Array<{
      category: FeedbackCategory;
      count: number;
      avgRating: number;
    }>;
    byStatus: Array<{
      status: FeedbackStatus;
      count: number;
      percentage: number;
    }>;
    byRating: Array<{ rating: number; count: number; percentage: number }>;
  };

  trends: Array<{
    date: string;
    total: number;
    avgRating: number;
    resolved: number;
  }>;

  insights: {
    commonIssues: Array<{
      issue: string;
      frequency: number;
      sentiment: "positive" | "neutral" | "negative";
    }>;
    topRequestedFeatures: Array<{ feature: string; votes: number }>;
    performanceByStaff: Array<{
      staffId: string;
      name: string;
      resolved: number;
      avgTime: number;
      satisfaction: number;
    }>;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const FEEDBACK_CONSTANTS = {
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 5000,
  MAX_ATTACHMENTS: 10,
  MIN_RATING: 1,
  MAX_RATING: 5,
  RESPONSE_SLA_HOURS: 24,
  RESOLUTION_SLA_DAYS: 7,
} as const;

export const FEEDBACK_TYPE_LABELS: Record<FeedbackType, string> = {
  SERVICE_RATING: "Rating Layanan",
  ARTICLE_RATING: "Rating Artikel",
  EVENT_RATING: "Rating Acara",
  GENERAL_FEEDBACK: "Feedback Umum",
  BUG_REPORT: "Laporan Bug",
  FEATURE_REQUEST: "Permintaan Fitur",
  COMPLAINT: "Keluhan",
  SUGGESTION: "Saran",
  TESTIMONIAL: "Testimoni",
} as const;

export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  PENDING: "Menunggu",
  REVIEWED: "Ditinjau",
  IN_PROGRESS: "Sedang Diproses",
  RESOLVED: "Diselesaikan",
  CLOSED: "Ditutup",
  REJECTED: "Ditolak",
} as const;
