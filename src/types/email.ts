/**
 * Email Types
 * Types untuk sistem email dan notifikasi
 */

import { BaseEntity, Priority } from "./common";
import { User, UserRole } from "./auth";

// =============================================================================
// EMAIL CORE TYPES
// =============================================================================

/**
 * Email type categories
 */
export type EmailType =
  | "TRANSACTIONAL" // Transaksional (otomatis)
  | "NOTIFICATION" // Notifikasi sistem
  | "MARKETING" // Pemasaran
  | "NEWSLETTER" // Newsletter
  | "REMINDER" // Pengingat
  | "WELCOME" // Selamat datang
  | "VERIFICATION" // Verifikasi
  | "PASSWORD_RESET" // Reset password
  | "INVITATION" // Undangan
  | "ANNOUNCEMENT" // Pengumuman
  | "PROMOTIONAL" // Promosi
  | "SYSTEM" // Sistem
  | "SUPPORT" // Dukungan
  | "SURVEY" // Survei
  | "OTHER"; // Lainnya

/**
 * Email status
 */
export type EmailStatus =
  | "DRAFT" // Konsep
  | "SCHEDULED" // Terjadwal
  | "QUEUED" // Antrian
  | "SENDING" // Sedang kirim
  | "SENT" // Terkirim
  | "DELIVERED" // Tersampaikan
  | "OPENED" // Dibuka
  | "CLICKED" // Diklik
  | "BOUNCED" // Gagal
  | "FAILED" // Error
  | "CANCELLED" // Dibatalkan
  | "UNSUBSCRIBED"; // Unsubscribe

/**
 * Email priority
 */
export type EmailPriority = Priority;

/**
 * Email template type
 */
export type EmailTemplateType =
  | "BASIC" // Template dasar
  | "PROMOTIONAL" // Template promosi
  | "NEWSLETTER" // Template newsletter
  | "TRANSACTIONAL" // Template transaksional
  | "NOTIFICATION" // Template notifikasi
  | "ANNOUNCEMENT" // Template pengumuman
  | "WELCOME" // Template selamat datang
  | "REMINDER" // Template pengingat
  | "SURVEY" // Template survei
  | "CUSTOM"; // Template kustom

/**
 * Email provider
 */
export type EmailProvider =
  | "SMTP"
  | "SENDGRID"
  | "MAILGUN"
  | "SES"
  | "POSTMARK"
  | "SPARKPOST"
  | "MANDRILL";

// =============================================================================
// EMAIL MESSAGE TYPES
// =============================================================================

/**
 * Main email interface
 */
export interface Email extends BaseEntity {
  // Basic information
  subject: string;
  content: string;
  htmlContent?: string;
  textContent?: string;

  // Sender information
  fromEmail: string;
  fromName: string;
  replyToEmail?: string;
  replyToName?: string;

  // Recipients
  toEmails: string[];
  ccEmails?: string[];
  bccEmails?: string[];

  // Classification
  type: EmailType;
  category?: string;
  tags?: string[];

  // Status and tracking
  status: EmailStatus;
  priority: EmailPriority;

  // Scheduling
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;

  // Template information
  templateId?: string;
  template?: EmailTemplate;
  templateVariables?: Record<string, any>;

  // Attachments
  attachments?: EmailAttachment[];

  // Tracking and analytics
  trackingEnabled: boolean;
  trackingId?: string;
  messageId?: string;
  externalId?: string;

  // Delivery information
  provider?: EmailProvider;
  providerResponse?: any;
  bounceReason?: string;
  errorMessage?: string;
  retryCount: number;
  maxRetries: number;

  // Engagement metrics
  openCount: number;
  clickCount: number;
  uniqueOpens: number;
  uniqueClicks: number;
  unsubscribeCount: number;
  complaintCount: number;

  // Campaign information
  campaignId?: string;
  campaign?: EmailCampaign;

  // User information
  userId?: string;
  user?: User;

  // Personalization
  personalizations?: EmailPersonalization[];

  // Compliance
  unsubscribeUrl?: string;
  listUnsubscribeHeader?: string;

  // Metadata
  customHeaders?: Record<string, string>;
  metadata?: Record<string, any>;

  // Quality score
  spamScore?: number;
  qualityScore?: number;
}

/**
 * Email attachment
 */
export interface EmailAttachment {
  filename: string;
  content: string; // Base64 encoded content
  contentType: string;
  disposition?: "attachment" | "inline";
  contentId?: string; // For inline images
  size: number; // bytes
}

/**
 * Email personalization
 */
export interface EmailPersonalization {
  to: EmailRecipient[];
  cc?: EmailRecipient[];
  bcc?: EmailRecipient[];
  subject?: string;
  headers?: Record<string, string>;
  substitutions?: Record<string, string>;
  customArgs?: Record<string, string>;
  sendAt?: number; // Unix timestamp
}

/**
 * Email recipient
 */
export interface EmailRecipient {
  email: string;
  name?: string;
  substitutions?: Record<string, string>;
  customArgs?: Record<string, string>;
}

// =============================================================================
// EMAIL TEMPLATE TYPES
// =============================================================================

/**
 * Email template
 */
export interface EmailTemplate extends BaseEntity {
  // Basic information
  name: string;
  description?: string;
  type: EmailTemplateType;
  category?: string;

  // Template content
  subject: string;
  htmlContent: string;
  textContent?: string;
  preheader?: string; // Preview text

  // Design information
  designId?: string;
  thumbnailUrl?: string;

  // Variables and personalization
  variables: TemplateVariable[];
  sampleData?: Record<string, any>;

  // Sender information
  defaultFromEmail?: string;
  defaultFromName?: string;
  defaultReplyTo?: string;

  // Settings
  isActive: boolean;
  isDefault: boolean;
  trackingEnabled: boolean;

  // Version control
  version: string;
  parentTemplateId?: string;
  isArchived: boolean;

  // Usage statistics
  usageCount: number;
  lastUsedAt?: string;

  // Approval workflow
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;

  // Creator information
  createdBy: string;
  creator?: User;

  // Testing
  testResults?: TemplateTestResult[];

  // Localization
  language?: string;
  localizations?: Record<string, EmailTemplateLocalization>;

  // Compliance
  includeUnsubscribe: boolean;
  gdprCompliant: boolean;

  // Performance metrics
  averageOpenRate?: number;
  averageClickRate?: number;
  averageConversionRate?: number;
}

/**
 * Template variable
 */
export interface TemplateVariable {
  name: string;
  label: string;
  type:
    | "TEXT"
    | "NUMBER"
    | "DATE"
    | "BOOLEAN"
    | "URL"
    | "EMAIL"
    | "IMAGE"
    | "HTML";
  required: boolean;
  defaultValue?: string;
  description?: string;
  example?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  source?: "USER_INPUT" | "USER_PROFILE" | "SYSTEM" | "EXTERNAL";
  sourceField?: string;
}

/**
 * Template test result
 */
export interface TemplateTestResult {
  id: string;
  testType:
    | "PREVIEW"
    | "SPAM_CHECK"
    | "LINK_CHECK"
    | "DEVICE_TEST"
    | "CLIENT_TEST";
  status: "PASSED" | "FAILED" | "WARNING";
  score?: number;
  details: string;
  recommendations?: string[];
  testedAt: string;
  testedBy: string;
}

/**
 * Template localization
 */
export interface EmailTemplateLocalization {
  language: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  preheader?: string;
  variables?: Record<string, string>;
}

// =============================================================================
// EMAIL CAMPAIGN TYPES
// =============================================================================

/**
 * Email campaign
 */
export interface EmailCampaign extends BaseEntity {
  // Basic information
  name: string;
  description?: string;
  type: EmailType;

  // Template and content
  templateId?: string;
  template?: EmailTemplate;
  subject: string;

  // Targeting
  targetAudience: CampaignAudience;
  recipientCount: number;

  // Scheduling
  scheduledAt?: string;
  timezone?: string;
  sendDate?: string;
  sendTime?: string;

  // Status and progress
  status:
    | "DRAFT"
    | "SCHEDULED"
    | "SENDING"
    | "SENT"
    | "PAUSED"
    | "CANCELLED"
    | "COMPLETED";
  progress: number; // percentage

  // Delivery information
  sentCount: number;
  deliveredCount: number;
  bouncedCount: number;
  failedCount: number;

  // Engagement metrics
  openCount: number;
  clickCount: number;
  unsubscribeCount: number;
  complaintCount: number;
  conversionCount: number;

  // Rates
  deliveryRate: number; // percentage
  openRate: number; // percentage
  clickRate: number; // percentage
  unsubscribeRate: number; // percentage
  complaintRate: number; // percentage
  conversionRate: number; // percentage

  // A/B Testing
  isABTest: boolean;
  abTestConfig?: ABTestConfig;

  // Creator information
  createdBy: string;
  creator?: User;

  // Approval workflow
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;

  // Budget and costs
  budget?: number;
  costPerEmail?: number;
  totalCost?: number;

  // Performance tracking
  revenue?: number;
  roi?: number; // Return on Investment

  // Settings
  trackingEnabled: boolean;
  suppressDuplicates: boolean;
  enableUnsubscribe: boolean;

  // Follow-up campaigns
  followUpCampaigns?: string[];
  parentCampaignId?: string;

  // Custom fields
  customFields?: Record<string, any>;
}

/**
 * Campaign audience
 */
export interface CampaignAudience {
  type: "ALL_USERS" | "ROLE_BASED" | "SEGMENT" | "LIST" | "CUSTOM_QUERY";

  // Role-based targeting
  roles?: UserRole[];

  // Segment targeting
  segmentIds?: string[];

  // List targeting
  listIds?: string[];

  // Custom query
  customQuery?: {
    conditions: Array<{
      field: string;
      operator:
        | "equals"
        | "not_equals"
        | "contains"
        | "starts_with"
        | "ends_with"
        | "greater_than"
        | "less_than"
        | "in"
        | "not_in";
      value: any;
    }>;
    logic: "AND" | "OR";
  };

  // Exclusions
  excludeUnsubscribed: boolean;
  excludeBounced: boolean;
  excludeComplained: boolean;
  excludeUserIds?: string[];
  excludeEmails?: string[];

  // Limits
  maxRecipients?: number;

  // Testing
  testEmailPercentage?: number;
  testEmails?: string[];
}

/**
 * A/B Test configuration
 */
export interface ABTestConfig {
  enabled: boolean;
  testName: string;
  testType: "SUBJECT" | "CONTENT" | "SENDER" | "SEND_TIME";

  // Variants
  variants: ABTestVariant[];

  // Test settings
  testPercentage: number; // What percentage of audience to test
  winnerCriteria: "OPEN_RATE" | "CLICK_RATE" | "CONVERSION_RATE" | "REVENUE";
  testDuration: number; // hours
  confidenceLevel: number; // percentage (e.g., 95)

  // Results
  status: "RUNNING" | "COMPLETED" | "CANCELLED";
  winnerVariantId?: string;
  results?: ABTestResult[];

  // Auto-winner selection
  autoSelectWinner: boolean;
  minSampleSize: number;
}

/**
 * A/B Test variant
 */
export interface ABTestVariant {
  id: string;
  name: string;
  percentage: number; // Percentage of test traffic

  // Variant content
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  fromEmail?: string;
  fromName?: string;
  sendTime?: string;

  // Results
  sentCount?: number;
  openCount?: number;
  clickCount?: number;
  conversionCount?: number;
  revenue?: number;
}

/**
 * A/B Test result
 */
export interface ABTestResult {
  variantId: string;
  variantName: string;

  // Metrics
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  clickCount: number;
  conversionCount: number;
  revenue: number;

  // Rates
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;

  // Statistical significance
  isStatisticallySignificant: boolean;
  confidenceLevel: number;
  pValue: number;

  // Performance
  performanceScore: number;
  isWinner: boolean;
}

// =============================================================================
// EMAIL LIST TYPES
// =============================================================================

/**
 * Email list/segment
 */
export interface EmailList extends BaseEntity {
  // Basic information
  name: string;
  description?: string;
  type: "STATIC" | "DYNAMIC" | "IMPORTED";

  // List statistics
  subscriberCount: number;
  activeSubscribers: number;
  unsubscribedCount: number;
  bouncedCount: number;

  // Dynamic list criteria
  criteria?: {
    conditions: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
    logic: "AND" | "OR";
  };

  // Settings
  isActive: boolean;
  allowSelfSubscribe: boolean;
  requireDoubleOptIn: boolean;

  // Subscription form
  subscriptionFormId?: string;

  // Owner information
  ownerId: string;
  owner?: User;

  // Import information
  importId?: string;
  importSource?: string;

  // Tags and categories
  tags?: string[];
  category?: string;

  // Custom fields for subscribers
  customFields?: Array<{
    name: string;
    type: "TEXT" | "NUMBER" | "DATE" | "BOOLEAN" | "SELECT";
    required: boolean;
    options?: string[];
  }>;

  // Performance metrics
  averageOpenRate: number;
  averageClickRate: number;
  averageUnsubscribeRate: number;

  // Compliance
  gdprCompliant: boolean;
  consentRequired: boolean;

  // Sync settings
  autoSync: boolean;
  lastSyncAt?: string;
  syncFrequency?: "HOURLY" | "DAILY" | "WEEKLY";
}

/**
 * Email subscription
 */
export interface EmailSubscription extends BaseEntity {
  // Subscriber information
  email: string;
  firstName?: string;
  lastName?: string;

  // List association
  listId: string;
  list?: EmailList;

  // User association
  userId?: string;
  user?: User;

  // Subscription status
  status:
    | "SUBSCRIBED"
    | "UNSUBSCRIBED"
    | "BOUNCED"
    | "COMPLAINED"
    | "PENDING_CONFIRMATION";

  // Subscription details
  subscribedAt?: string;
  unsubscribedAt?: string;
  unsubscribeReason?: string;

  // Confirmation details
  confirmationRequired: boolean;
  confirmationSentAt?: string;
  confirmedAt?: string;
  confirmationToken?: string;

  // Source information
  source: "MANUAL" | "IMPORT" | "FORM" | "API" | "BULK_UPLOAD";
  sourceDetails?: string;

  // Engagement metrics
  totalEmailsSent: number;
  totalEmailsOpened: number;
  totalEmailsClicked: number;
  lastEmailOpenAt?: string;
  lastEmailClickAt?: string;

  // Custom field values
  customFieldValues?: Record<string, any>;

  // Compliance
  consentGiven: boolean;
  consentTimestamp?: string;
  consentSource?: string;

  // Preferences
  emailFrequency?: "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY";
  preferredLanguage?: string;
  timezone?: string;

  // Quality scores
  engagementScore: number; // 0-100
  deliverabilityScore: number; // 0-100
}

// =============================================================================
// EMAIL ANALYTICS TYPES
// =============================================================================

/**
 * Email analytics overview
 */
export interface EmailAnalytics {
  overview: {
    totalEmailsSent: number;
    totalEmailsDelivered: number;
    totalEmailsOpened: number;
    totalEmailsClicked: number;
    totalUnsubscribes: number;
    totalComplaints: number;

    // Rates
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
    complaintRate: number;
  };

  trends: {
    sentTrends: Array<{ date: string; sent: number; delivered: number }>;
    engagementTrends: Array<{
      date: string;
      opens: number;
      clicks: number;
      unsubscribes: number;
    }>;
    performanceTrends: Array<{
      date: string;
      openRate: number;
      clickRate: number;
      deliveryRate: number;
    }>;
  };

  performance: {
    topCampaigns: Array<{
      campaignId: string;
      campaignName: string;
      sentCount: number;
      openRate: number;
      clickRate: number;
      conversionRate: number;
    }>;
    topTemplates: Array<{
      templateId: string;
      templateName: string;
      usageCount: number;
      averageOpenRate: number;
      averageClickRate: number;
    }>;
    deviceBreakdown: Array<{
      device: string;
      opens: number;
      clicks: number;
      percentage: number;
    }>;
    clientBreakdown: Array<{
      client: string;
      opens: number;
      percentage: number;
    }>;
  };

  audience: {
    totalSubscribers: number;
    activeSubscribers: number;
    newSubscribers: number;
    unsubscribers: number;
    averageEngagementScore: number;

    segmentPerformance: Array<{
      segmentId: string;
      segmentName: string;
      subscribers: number;
      openRate: number;
      clickRate: number;
      engagementScore: number;
    }>;
  };

  deliverability: {
    deliveryRate: number;
    bounceRate: number;
    complaintRate: number;
    reputationScore: number;

    bounceReasons: Array<{
      reason: string;
      count: number;
      percentage: number;
    }>;

    providerPerformance: Array<{
      provider: string;
      deliveryRate: number;
      openRate: number;
      reputation: string;
    }>;
  };

  revenue: {
    totalRevenue: number;
    revenuePerEmail: number;
    conversionRate: number;
    averageOrderValue: number;

    revenueBySource: Array<{
      source: string;
      revenue: number;
      conversions: number;
      conversionRate: number;
    }>;
  };
}

// =============================================================================
// EMAIL SETTINGS TYPES
// =============================================================================

/**
 * Email configuration
 */
export interface EmailConfiguration {
  // Provider settings
  provider: EmailProvider;
  providerConfig: {
    apiKey?: string;
    apiSecret?: string;
    domain?: string;
    region?: string;
    endpoint?: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpUsername?: string;
    smtpPassword?: string;
    smtpSecure?: boolean;
  };

  // Default sender
  defaultFromEmail: string;
  defaultFromName: string;
  defaultReplyTo?: string;

  // Sending limits
  dailyLimit?: number;
  hourlyLimit?: number;
  perMinuteLimit?: number;

  // Tracking settings
  trackingEnabled: boolean;
  trackOpens: boolean;
  trackClicks: boolean;
  trackUnsubscribes: boolean;

  // Bounce handling
  bounceHandlingEnabled: boolean;
  maxBounceRate: number; // percentage
  suppressAfterBounces: number;

  // Complaint handling
  complaintHandlingEnabled: boolean;
  maxComplaintRate: number; // percentage
  suppressAfterComplaints: number;

  // Unsubscribe settings
  oneClickUnsubscribe: boolean;
  unsubscribeRedirectUrl?: string;
  customUnsubscribePage?: string;

  // List management
  doubleOptInRequired: boolean;
  confirmationEmailTemplate?: string;
  welcomeEmailEnabled: boolean;
  welcomeEmailTemplate?: string;

  // Compliance
  includePhysicalAddress: boolean;
  physicalAddress?: string;
  gdprCompliant: boolean;
  canSpamCompliant: boolean;

  // Quality control
  spamCheckEnabled: boolean;
  spamScoreThreshold: number;
  linkCheckEnabled: boolean;
  contentFilteringEnabled: boolean;

  // Retry settings
  maxRetries: number;
  retryIntervals: number[]; // in minutes
  exponentialBackoff: boolean;

  // Webhook settings
  webhookUrl?: string;
  webhookEvents: string[];
  webhookSecret?: string;

  // Integration settings
  integrations: Record<string, any>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Email constants
 */
export const EMAIL_CONSTANTS = {
  MAX_SUBJECT_LENGTH: 255,
  MAX_RECIPIENTS: 1000,
  MAX_ATTACHMENT_SIZE: 25 * 1024 * 1024, // 25MB
  MAX_ATTACHMENTS: 20,
  DEFAULT_RETRY_ATTEMPTS: 3,
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  BOUNCE_THRESHOLD: 5, // percentage
  COMPLAINT_THRESHOLD: 0.1, // percentage
  UNSUBSCRIBE_THRESHOLD: 2, // percentage
  MIN_LIST_SIZE_FOR_AB_TEST: 100,
  AB_TEST_MIN_CONFIDENCE: 90, // percentage
  ENGAGEMENT_SCORE_DECAY_DAYS: 30,
  CLEANUP_BOUNCED_AFTER_DAYS: 90,
  CLEANUP_UNSUBSCRIBED_AFTER_DAYS: 365,
  MAX_TEMPLATE_VARIABLES: 50,
  MAX_CAMPAIGN_NAME_LENGTH: 100,
  MAX_LIST_NAME_LENGTH: 100,
} as const;

/**
 * Email type labels (Indonesian)
 */
export const EMAIL_TYPE_LABELS: Record<EmailType, string> = {
  TRANSACTIONAL: "Transaksional",
  NOTIFICATION: "Notifikasi",
  MARKETING: "Pemasaran",
  NEWSLETTER: "Newsletter",
  REMINDER: "Pengingat",
  WELCOME: "Selamat Datang",
  VERIFICATION: "Verifikasi",
  PASSWORD_RESET: "Reset Password",
  INVITATION: "Undangan",
  ANNOUNCEMENT: "Pengumuman",
  PROMOTIONAL: "Promosi",
  SYSTEM: "Sistem",
  SUPPORT: "Dukungan",
  SURVEY: "Survei",
  OTHER: "Lainnya",
} as const;

/**
 * Email status labels (Indonesian)
 */
export const EMAIL_STATUS_LABELS: Record<EmailStatus, string> = {
  DRAFT: "Konsep",
  SCHEDULED: "Terjadwal",
  QUEUED: "Antrian",
  SENDING: "Sedang Kirim",
  SENT: "Terkirim",
  DELIVERED: "Tersampaikan",
  OPENED: "Dibuka",
  CLICKED: "Diklik",
  BOUNCED: "Gagal",
  FAILED: "Error",
  CANCELLED: "Dibatalkan",
  UNSUBSCRIBED: "Unsubscribe",
} as const;
