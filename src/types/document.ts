/**
 * Document Types
 * Types untuk sistem manajemen dokumen dan layanan dokumen
 */

import {
  BaseEntity,
  FileMetadata,
  Priority,
  Status,
  Address,
  ContactInfo,
} from "./common";
import { User } from "./auth";

// =============================================================================
// DOCUMENT CORE TYPES
// =============================================================================

/**
 * Document service types
 */
export type DocumentServiceType =
  | "SKTM" // Surat Keterangan Tidak Mampu
  | "SURAT_DOMISILI" // Surat Domisili
  | "SURAT_PENGANTAR" // Surat Pengantar
  | "SURAT_KETERANGAN_KELAHIRAN" // Surat Keterangan Kelahiran
  | "SURAT_KETERANGAN_KEMATIAN" // Surat Keterangan Kematian
  | "SURAT_KETERANGAN_PINDAH" // Surat Keterangan Pindah
  | "SURAT_KETERANGAN_USAHA" // Surat Keterangan Usaha
  | "SURAT_REKOMENDASI" // Surat Rekomendasi
  | "LEGALISIR_DOKUMEN" // Legalisir Dokumen
  | "SURAT_KETERANGAN_PENGHASILAN" // Surat Keterangan Penghasilan
  | "SURAT_NIKAH" // Surat Nikah
  | "SURAT_CERAI" // Surat Cerai
  | "SURAT_KETERANGAN_CATATAN_KEPOLISIAN" // SKCK
  | "SURAT_KETERANGAN_KESEHATAN" // Surat Keterangan Sehat
  | "IZIN_KERAMAIAN" // Izin Keramaian
  | "IZIN_USAHA" // Izin Usaha
  | "OTHER"; // Lainnya

/**
 * Document request status
 */
export type DocumentRequestStatus =
  | "DRAFT" // Konsep
  | "SUBMITTED" // Disubmit
  | "UNDER_REVIEW" // Sedang Ditinjau
  | "ADDITIONAL_INFO_REQUIRED" // Butuh Info Tambahan
  | "APPROVED" // Disetujui
  | "PROCESSING" // Sedang Diproses
  | "READY_FOR_PICKUP" // Siap Diambil
  | "COMPLETED" // Selesai
  | "REJECTED" // Ditolak
  | "CANCELLED" // Dibatalkan
  | "EXPIRED"; // Kedaluwarsa

/**
 * Document urgency level
 */
export type DocumentUrgency =
  | "NORMAL" // Normal (7-14 hari)
  | "URGENT" // Mendesak (3-5 hari)
  | "VERY_URGENT"; // Sangat Mendesak (1-2 hari)

/**
 * Delivery method
 */
export type DeliveryMethod =
  | "PICKUP" // Ambil di kantor
  | "DELIVERY" // Diantar
  | "EMAIL" // Email (untuk dokumen digital)
  | "WHATSAPP"; // WhatsApp (untuk dokumen digital)

/**
 * Payment status
 */
export type PaymentStatus =
  | "NOT_REQUIRED" // Tidak perlu bayar
  | "PENDING" // Menunggu pembayaran
  | "PAID" // Sudah dibayar
  | "FAILED" // Gagal bayar
  | "REFUNDED"; // Dikembalikan

/**
 * Main document request interface
 */
export interface DocumentRequest extends BaseEntity {
  // Request identification
  requestNumber: string; // Auto-generated unique number
  serviceType: DocumentServiceType;
  title: string;
  description?: string;

  // Applicant information
  applicantId: string;
  applicant?: User;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantAddress: Address;

  // Status and workflow
  status: DocumentRequestStatus;
  urgency: DocumentUrgency;
  priority: Priority;

  // Processing information
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  completedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;

  // Delivery
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: Address;
  deliveryNotes?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
  deliveryConfirmation?: string;

  // Payment
  fee: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentReference?: string;
  paidAt?: string;

  // Documents and attachments
  requiredDocuments: RequiredDocument[];
  submittedDocuments: SubmittedDocument[];
  outputDocuments: OutputDocument[];

  // Processing details
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  processingSteps: ProcessingStep[];
  currentStep: number;

  // Additional information
  specialRequests?: string;
  notes?: string;
  internalNotes?: string;

  // Tracking
  trackingHistory: TrackingEntry[];
  lastUpdated: string;

  // Quality assurance
  qualityCheckPassed?: boolean;
  qualityCheckBy?: string;
  qualityCheckAt?: string;
  qualityCheckNotes?: string;

  // Communication
  notifications: NotificationRecord[];
  remindersSent: number;
  lastReminderAt?: string;

  // Analytics
  processingTime?: number; // in hours
  customerSatisfaction?: number; // 1-5 rating
  feedbackComment?: string;
  referenceSource?: string; // How they heard about the service
}

/**
 * Required document specification
 */
export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  type:
    | "IDENTITY"
    | "ADDRESS_PROOF"
    | "PHOTO"
    | "FORM"
    | "CERTIFICATE"
    | "OTHER";
  required: boolean;
  format: string[]; // Allowed file formats
  maxSize: number; // Max file size in bytes
  quantity: number; // Number of copies required
  specifications?: string; // Special requirements
  examples?: string[]; // Example documents
}

/**
 * Submitted document
 */
export interface SubmittedDocument extends BaseEntity {
  requestId: string;
  requiredDocumentId: string;
  name: string;
  description?: string;
  file: FileMetadata;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  needsReplacement: boolean;
  replacementReason?: string;
}

/**
 * Output document (generated by the system)
 */
export interface OutputDocument extends BaseEntity {
  requestId: string;
  name: string;
  type:
    | "CERTIFICATE"
    | "LETTER"
    | "PERMIT"
    | "RECOMMENDATION"
    | "LEGALIZATION"
    | "OTHER";
  templateId?: string;
  file: FileMetadata;
  digitalSignature?: string;
  verificationCode?: string;
  validUntil?: string;
  generatedBy: string;
  generatedAt: string;
  downloadCount: number;
  lastDownloadAt?: string;
}

/**
 * Processing step
 */
export interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  order: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED" | "FAILED";
  assignedTo?: string;
  assignedAt?: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDuration: number; // hours
  actualDuration?: number; // hours
  notes?: string;
  requiredActions?: string[];
  blockers?: string[];
}

/**
 * Tracking entry
 */
export interface TrackingEntry extends BaseEntity {
  requestId: string;
  action: string;
  description: string;
  performedBy?: string;
  performerRole?: string;
  timestamp: string;
  oldStatus?: DocumentRequestStatus;
  newStatus?: DocumentRequestStatus;
  metadata?: Record<string, any>;
  isPublic: boolean; // Whether visible to applicant
}

/**
 * Notification record
 */
export interface NotificationRecord extends BaseEntity {
  requestId: string;
  type: "EMAIL" | "SMS" | "WHATSAPP" | "IN_APP" | "PUSH";
  recipient: string;
  subject?: string;
  message: string;
  status: "SENT" | "DELIVERED" | "FAILED" | "PENDING";
  sentAt?: string;
  deliveredAt?: string;
  errorMessage?: string;
  retryCount: number;
}

// =============================================================================
// DOCUMENT REQUEST TYPES
// =============================================================================

/**
 * Document request creation
 */
export interface CreateDocumentRequestRequest {
  serviceType: DocumentServiceType;
  title: string;
  description?: string;
  urgency?: DocumentUrgency;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: Address;
  deliveryNotes?: string;
  specialRequests?: string;
  submittedDocuments: Array<{
    requiredDocumentId: string;
    fileId: string;
    description?: string;
  }>;
  referenceSource?: string;
}

/**
 * Document request update
 */
export interface UpdateDocumentRequestRequest {
  title?: string;
  description?: string;
  urgency?: DocumentUrgency;
  deliveryMethod?: DeliveryMethod;
  deliveryAddress?: Address;
  deliveryNotes?: string;
  specialRequests?: string;
  additionalDocuments?: Array<{
    requiredDocumentId: string;
    fileId: string;
    description?: string;
  }>;
}

// =============================================================================
// DOCUMENT QUERY TYPES
// =============================================================================

/**
 * Document request query
 */
export interface DocumentRequestQuery {
  // Search
  search?: string;
  requestNumber?: string;

  // Filters
  serviceType?: DocumentServiceType | DocumentServiceType[];
  status?: DocumentRequestStatus | DocumentRequestStatus[];
  urgency?: DocumentUrgency | DocumentUrgency[];
  priority?: Priority | Priority[];
  paymentStatus?: PaymentStatus | PaymentStatus[];
  deliveryMethod?: DeliveryMethod | DeliveryMethod[];

  // Applicant filters
  applicantId?: string;
  applicantName?: string;
  applicantEmail?: string;

  // Staff filters
  reviewedBy?: string;
  approvedBy?: string;
  assignedTo?: string;

  // Date filters
  submittedAfter?: string;
  submittedBefore?: string;
  reviewedAfter?: string;
  reviewedBefore?: string;
  completedAfter?: string;
  completedBefore?: string;

  // Processing filters
  overdue?: boolean;
  nearDeadline?: boolean; // Within 24 hours of deadline
  qualityCheckPassed?: boolean;
  hasSpecialRequests?: boolean;

  // Satisfaction filters
  minSatisfaction?: number;
  maxSatisfaction?: number;
  hasFeedback?: boolean;

  // Fee filters
  minFee?: number;
  maxFee?: number;
  freeService?: boolean;

  // Sorting
  sortBy?:
    | "submittedAt"
    | "updatedAt"
    | "estimatedCompletionDate"
    | "fee"
    | "customerSatisfaction"
    | "processingTime";
  sortOrder?: "asc" | "desc";

  // Pagination
  page?: number;
  limit?: number;

  // Include relations
  includeApplicant?: boolean;
  includeDocuments?: boolean;
  includeTracking?: boolean;
  includeSteps?: boolean;
}

// =============================================================================
// DOCUMENT SERVICE TYPES
// =============================================================================

/**
 * Document service configuration
 */
export interface DocumentService extends BaseEntity {
  type: DocumentServiceType;
  name: string;
  description: string;
  category: string;
  isActive: boolean;

  // Requirements
  requiredDocuments: RequiredDocument[];
  eligibilityCriteria: string[];
  restrictions?: string[];

  // Processing
  estimatedProcessingTime: number; // hours
  maxProcessingTime: number; // hours
  processingSteps: Omit<
    ProcessingStep,
    "status" | "assignedTo" | "startedAt" | "completedAt" | "actualDuration"
  >[];

  // Pricing
  baseFee: number;
  urgentFee: number;
  veryUrgentFee: number;
  additionalFees?: Array<{
    name: string;
    amount: number;
    condition: string;
  }>;

  // Delivery options
  availableDeliveryMethods: DeliveryMethod[];
  deliveryFees: Record<DeliveryMethod, number>;

  // Settings
  requiresApproval: boolean;
  requiresPayment: boolean;
  requiresQualityCheck: boolean;
  allowsUrgentProcessing: boolean;
  maxRequestsPerUser?: number; // per month

  // Templates
  outputTemplates: DocumentTemplate[];
  emailTemplates: EmailTemplate[];

  // Analytics
  totalRequests: number;
  completedRequests: number;
  averageProcessingTime: number; // hours
  averageSatisfaction: number;

  // Metadata
  helpText?: string;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  externalLinks?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
}

/**
 * Document template
 */
export interface DocumentTemplate extends BaseEntity {
  name: string;
  description?: string;
  serviceType: DocumentServiceType;
  templateFile: FileMetadata;
  outputFormat: "PDF" | "DOCX" | "HTML";
  variables: TemplateVariable[];
  isDefault: boolean;
  version: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
  usageCount: number;
}

/**
 * Template variable
 */
export interface TemplateVariable {
  name: string;
  label: string;
  type: "TEXT" | "NUMBER" | "DATE" | "BOOLEAN" | "SELECT" | "MULTISELECT";
  required: boolean;
  defaultValue?: string;
  options?: string[]; // For SELECT and MULTISELECT
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  source?: "USER_INPUT" | "USER_PROFILE" | "REQUEST_DATA" | "SYSTEM";
  sourceField?: string;
  description?: string;
}

/**
 * Email template
 */
export interface EmailTemplate extends BaseEntity {
  name: string;
  description?: string;
  serviceType: DocumentServiceType;
  trigger:
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "READY_FOR_PICKUP"
    | "COMPLETED"
    | "REMINDER";
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[]; // Available variables
  isActive: boolean;
  sendDelay?: number; // minutes after trigger
  conditions?: Array<{
    field: string;
    operator:
      | "equals"
      | "not_equals"
      | "contains"
      | "greater_than"
      | "less_than";
    value: string;
  }>;
}

// =============================================================================
// DOCUMENT WORKFLOW TYPES
// =============================================================================

/**
 * Document workflow action
 */
export interface DocumentWorkflowAction {
  requestId: string;
  action:
    | "SUBMIT"
    | "REVIEW"
    | "APPROVE"
    | "REJECT"
    | "REQUEST_INFO"
    | "COMPLETE"
    | "CANCEL";
  notes?: string;
  assignTo?: string;
  scheduledFor?: string;
  notifyApplicant?: boolean;
  attachments?: string[]; // File IDs
  metadata?: Record<string, any>;
}

/**
 * Bulk document operation
 */
export interface DocumentBulkOperation {
  operation:
    | "approve"
    | "reject"
    | "assign"
    | "update_status"
    | "send_reminder"
    | "export";
  requestIds: string[];
  targetStatus?: DocumentRequestStatus;
  assignTo?: string;
  reason?: string;
  customMessage?: string;
  scheduledFor?: string;
  exportFormat?: "CSV" | "EXCEL" | "PDF";
}

// =============================================================================
// DOCUMENT ANALYTICS TYPES
// =============================================================================

/**
 * Document service analytics
 */
export interface DocumentServiceAnalytics {
  overview: {
    totalRequests: number;
    completedRequests: number;
    pendingRequests: number;
    completionRate: number;
    averageProcessingTime: number; // hours
    averageSatisfaction: number;
    totalRevenue: number;
  };

  trends: {
    requestTrends: Array<{
      date: string;
      requests: number;
      completed: number;
      revenue: number;
    }>;
    serviceTypeTrends: Array<{
      serviceType: DocumentServiceType;
      requests: number;
      growth: number;
    }>;
    processingTimeTrends: Array<{
      date: string;
      averageTime: number;
      targetTime: number;
    }>;
  };

  performance: {
    byServiceType: Array<{
      serviceType: DocumentServiceType;
      requests: number;
      completionRate: number;
      averageTime: number;
      satisfaction: number;
      revenue: number;
    }>;
    byStaff: Array<{
      staffId: string;
      staffName: string;
      requestsHandled: number;
      averageTime: number;
      satisfaction: number;
      efficiency: number;
    }>;
    byUrgency: Array<{
      urgency: DocumentUrgency;
      requests: number;
      completionRate: number;
      averageTime: number;
      onTimeRate: number;
    }>;
  };

  insights: {
    popularServices: DocumentServiceType[];
    peakRequestTimes: Array<{
      hour: number;
      dayOfWeek: number;
      requests: number;
    }>;
    bottlenecks: Array<{
      stepName: string;
      averageDelay: number;
      frequency: number;
    }>;
    improvementAreas: Array<{
      area: string;
      impact: string;
      recommendation: string;
    }>;
  };
}

/**
 * Staff performance metrics
 */
export interface StaffPerformanceMetrics {
  staffId: string;
  staffName: string;
  period: {
    start: string;
    end: string;
  };

  workload: {
    totalRequests: number;
    completedRequests: number;
    pendingRequests: number;
    averageDaily: number;
    workloadRating: "LOW" | "NORMAL" | "HIGH" | "OVERLOADED";
  };

  efficiency: {
    averageProcessingTime: number;
    targetProcessingTime: number;
    efficiencyRatio: number; // target/actual
    onTimeCompletionRate: number;
    qualityScore: number;
  };

  satisfaction: {
    averageRating: number;
    totalRatings: number;
    positiveRatings: number;
    negativeRatings: number;
    feedbackComments: string[];
  };

  specializations: Array<{
    serviceType: DocumentServiceType;
    expertise: number; // 1-5
    requestsHandled: number;
    satisfaction: number;
  }>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Document constants
 */
export const DOCUMENT_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ["PDF", "JPEG", "JPG", "PNG", "DOC", "DOCX"],
  MAX_ATTACHMENTS: 20,
  DEFAULT_PROCESSING_TIME: 7 * 24, // 7 days in hours
  URGENT_PROCESSING_TIME: 3 * 24, // 3 days in hours
  VERY_URGENT_PROCESSING_TIME: 1 * 24, // 1 day in hours
  REMINDER_INTERVALS: [24, 72, 168], // hours: 1 day, 3 days, 1 week
  MAX_RETRIES: 3,
  SATISFACTION_MIN: 1,
  SATISFACTION_MAX: 5,
  AUTO_REMINDER_DAYS: [1, 3, 7], // Days before deadline to send reminders
  PICKUP_DEADLINE_DAYS: 30, // Days to pickup completed documents
  ARCHIVE_AFTER_DAYS: 365, // Days to keep completed requests
  MAX_SPECIAL_REQUESTS_LENGTH: 1000,
  MAX_NOTES_LENGTH: 2000,
  VERIFICATION_CODE_LENGTH: 8,
  TRACKING_NUMBER_PREFIX: "DOC",
} as const;

/**
 * Document service type labels (Indonesian)
 */
export const DOCUMENT_SERVICE_TYPE_LABELS: Record<DocumentServiceType, string> =
  {
    SKTM: "Surat Keterangan Tidak Mampu",
    SURAT_DOMISILI: "Surat Keterangan Domisili",
    SURAT_PENGANTAR: "Surat Pengantar",
    SURAT_KETERANGAN_KELAHIRAN: "Surat Keterangan Kelahiran",
    SURAT_KETERANGAN_KEMATIAN: "Surat Keterangan Kematian",
    SURAT_KETERANGAN_PINDAH: "Surat Keterangan Pindah",
    SURAT_KETERANGAN_USAHA: "Surat Keterangan Usaha",
    SURAT_REKOMENDASI: "Surat Rekomendasi",
    LEGALISIR_DOKUMEN: "Legalisir Dokumen",
    SURAT_KETERANGAN_PENGHASILAN: "Surat Keterangan Penghasilan",
    SURAT_NIKAH: "Surat Keterangan Nikah",
    SURAT_CERAI: "Surat Keterangan Cerai",
    SURAT_KETERANGAN_CATATAN_KEPOLISIAN: "Surat Keterangan Catatan Kepolisian",
    SURAT_KETERANGAN_KESEHATAN: "Surat Keterangan Sehat",
    IZIN_KERAMAIAN: "Izin Keramaian",
    IZIN_USAHA: "Izin Usaha",
    OTHER: "Lainnya",
  } as const;

/**
 * Document request status labels (Indonesian)
 */
export const DOCUMENT_REQUEST_STATUS_LABELS: Record<
  DocumentRequestStatus,
  string
> = {
  DRAFT: "Konsep",
  SUBMITTED: "Disubmit",
  UNDER_REVIEW: "Sedang Ditinjau",
  ADDITIONAL_INFO_REQUIRED: "Butuh Info Tambahan",
  APPROVED: "Disetujui",
  PROCESSING: "Sedang Diproses",
  READY_FOR_PICKUP: "Siap Diambil",
  COMPLETED: "Selesai",
  REJECTED: "Ditolak",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Kedaluwarsa",
} as const;

/**
 * Document urgency labels (Indonesian)
 */
export const DOCUMENT_URGENCY_LABELS: Record<DocumentUrgency, string> = {
  NORMAL: "Normal (7-14 hari)",
  URGENT: "Mendesak (3-5 hari)",
  VERY_URGENT: "Sangat Mendesak (1-2 hari)",
} as const;
