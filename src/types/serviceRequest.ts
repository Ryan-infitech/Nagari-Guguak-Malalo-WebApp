/**
 * Service Request Types
 * Types untuk permintaan layanan
 */

import { BaseEntity, Priority, Address, ContactInfo } from "./common";
import { User } from "./auth";
import { Service } from "./service";

// =============================================================================
// SERVICE REQUEST CORE TYPES
// =============================================================================

export type ServiceRequestStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED"
  | "ON_HOLD";

export type ServiceRequestType =
  | "NEW_REQUEST"
  | "FOLLOW_UP"
  | "COMPLAINT"
  | "INQUIRY";

export type ServiceRequestPriority = Priority;

export interface ServiceRequest extends BaseEntity {
  // Request identification
  requestNumber: string;
  serviceId: string;
  service?: Service;
  type: ServiceRequestType;
  status: ServiceRequestStatus;
  priority: ServiceRequestPriority;

  // Requester information
  requesterId: string;
  requester?: User;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterAddress?: Address;

  // Request details
  title: string;
  description: string;
  requestedDate: string;
  urgency: "NORMAL" | "URGENT" | "EMERGENCY";

  // Additional information
  additionalInfo?: Record<string, any>;
  attachments?: string[]; // File IDs

  // Processing
  assignedTo?: string;
  assignedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  completedAt?: string;
  estimatedCompletionDate?: string;

  // Communication
  notes?: string;
  internalNotes?: string;
  statusComments?: string;

  // Feedback
  satisfactionRating?: number;
  feedbackComment?: string;
  feedbackDate?: string;

  // Follow-up
  followUpRequired: boolean;
  followUpDate?: string;
  followUpNotes?: string;

  // Tracking
  trackingHistory: ServiceRequestTracking[];

  // Resolution
  resolution?: string;
  resolutionFiles?: string[];
  resolutionDate?: string;
}

export interface ServiceRequestTracking extends BaseEntity {
  requestId: string;
  status: ServiceRequestStatus;
  action: string;
  description: string;
  performedBy?: string;
  performerName?: string;
  performerRole?: string;
  timestamp: string;
  isPublic: boolean;
  attachments?: string[];
  metadata?: Record<string, any>;
}

// =============================================================================
// SERVICE REQUEST OPERATIONS
// =============================================================================

export interface CreateServiceRequestRequest {
  serviceId: string;
  type?: ServiceRequestType;
  title: string;
  description: string;
  requestedDate?: string;
  urgency?: "NORMAL" | "URGENT" | "EMERGENCY";

  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterAddress?: Address;

  additionalInfo?: Record<string, any>;
  attachmentIds?: string[];
}

export interface UpdateServiceRequestRequest {
  title?: string;
  description?: string;
  urgency?: "NORMAL" | "URGENT" | "EMERGENCY";
  additionalInfo?: Record<string, any>;
  additionalAttachmentIds?: string[];
}

export interface ServiceRequestQuery {
  search?: string;
  requestNumber?: string;
  serviceId?: string;
  requesterId?: string;
  assignedTo?: string;

  status?: ServiceRequestStatus | ServiceRequestStatus[];
  type?: ServiceRequestType | ServiceRequestType[];
  priority?: ServiceRequestPriority | ServiceRequestPriority[];
  urgency?: "NORMAL" | "URGENT" | "EMERGENCY";

  createdAfter?: string;
  createdBefore?: string;
  completedAfter?: string;
  completedBefore?: string;

  hasRating?: boolean;
  minRating?: number;
  maxRating?: number;

  overdue?: boolean;
  followUpRequired?: boolean;

  sortBy?:
    | "createdAt"
    | "updatedAt"
    | "priority"
    | "estimatedCompletionDate"
    | "satisfactionRating";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;

  includeService?: boolean;
  includeRequester?: boolean;
  includeTracking?: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SERVICE_REQUEST_CONSTANTS = {
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 2000,
  MAX_ATTACHMENTS: 10,
  AUTO_NUMBER_PREFIX: "SR",
  DEFAULT_PRIORITY: "MEDIUM" as ServiceRequestPriority,
  SLA_RESPONSE_HOURS: 24,
  SLA_RESOLUTION_DAYS: 7,
  OVERDUE_THRESHOLD_HOURS: 72,
} as const;

export const SERVICE_REQUEST_STATUS_LABELS: Record<
  ServiceRequestStatus,
  string
> = {
  DRAFT: "Konsep",
  SUBMITTED: "Disubmit",
  UNDER_REVIEW: "Sedang Ditinjau",
  APPROVED: "Disetujui",
  IN_PROGRESS: "Sedang Diproses",
  COMPLETED: "Selesai",
  REJECTED: "Ditolak",
  CANCELLED: "Dibatalkan",
  ON_HOLD: "Ditahan",
} as const;
