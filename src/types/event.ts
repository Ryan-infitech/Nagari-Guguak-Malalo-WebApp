/**
 * Event Types
 * Types untuk sistem manajemen acara/event
 */

import {
  BaseEntity,
  FileMetadata,
  Priority,
  Address,
  ContactInfo,
} from "./common";
import { User } from "./auth";

// =============================================================================
// EVENT CORE TYPES
// =============================================================================

export type EventType =
  | "GOVERNMENT"
  | "COMMUNITY"
  | "RELIGIOUS"
  | "CULTURAL"
  | "SPORTS"
  | "EDUCATION"
  | "TOURISM"
  | "BUSINESS"
  | "HEALTH"
  | "ENVIRONMENT"
  | "OTHER";

export type EventStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "PUBLISHED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED"
  | "POSTPONED"
  | "ARCHIVED";

export type EventVisibility =
  | "PUBLIC"
  | "PRIVATE"
  | "INVITED_ONLY"
  | "MEMBERS_ONLY";

export type RegistrationStatus =
  | "OPEN"
  | "CLOSED"
  | "FULL"
  | "WAITLIST"
  | "INVITATION_ONLY";

export type AttendeeStatus =
  | "REGISTERED"
  | "CONFIRMED"
  | "ATTENDED"
  | "NO_SHOW"
  | "CANCELLED"
  | "WAITLISTED";

export interface Event extends BaseEntity {
  // Basic information
  title: string;
  description: string;
  summary?: string;
  slug: string;
  type: EventType;
  status: EventStatus;
  visibility: EventVisibility;

  // Date and time
  startDate: string;
  endDate: string;
  timezone: string;
  isAllDay: boolean;
  isRecurring: boolean;
  recurrenceRule?: string; // RRULE format

  // Location
  venue?: string;
  address?: Address;
  isOnline: boolean;
  onlineUrl?: string;
  coordinates?: { lat: number; lng: number };

  // Registration
  registrationStatus: RegistrationStatus;
  registrationStartDate?: string;
  registrationEndDate?: string;
  maxAttendees?: number;
  currentAttendees: number;
  waitlistCount: number;
  requiresApproval: boolean;

  // Pricing
  isFree: boolean;
  price?: number;
  discountPrice?: number;
  currency: string;

  // Organizer
  organizerId: string;
  organizer?: User;
  contactInfo: ContactInfo;

  // Media
  coverImage?: FileMetadata;
  gallery?: FileMetadata[];
  videos?: Array<{
    title: string;
    url: string;
    thumbnail?: string;
  }>;

  // Content
  agenda?: EventAgendaItem[];
  speakers?: EventSpeaker[];
  sponsors?: EventSponsor[];

  // Settings
  allowComments: boolean;
  allowSharing: boolean;
  sendReminders: boolean;
  featured: boolean;

  // Metrics
  viewCount: number;
  shareCount: number;
  interestedCount: number;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Custom fields
  customFields?: Record<string, any>;
}

export interface EventAgendaItem {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  speaker?: string;
  location?: string;
  type?: "PRESENTATION" | "WORKSHOP" | "BREAK" | "NETWORKING" | "OTHER";
}

export interface EventSpeaker {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  company?: string;
  photo?: FileMetadata;
  email?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface EventSponsor {
  id: string;
  name: string;
  description?: string;
  logo: FileMetadata;
  website?: string;
  level: "PLATINUM" | "GOLD" | "SILVER" | "BRONZE" | "PARTNER";
  order: number;
}

export interface EventRegistration extends BaseEntity {
  eventId: string;
  event?: Event;
  userId?: string;
  user?: User;

  // Registration details
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  title?: string;

  // Status
  status: AttendeeStatus;
  registeredAt: string;
  confirmedAt?: string;
  checkedInAt?: string;

  // Additional info
  dietaryRequirements?: string;
  accessibilityNeeds?: string;
  notes?: string;

  // Payment
  paymentRequired: boolean;
  paymentStatus?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentAmount?: number;

  // Communication
  remindersSent: number;
  lastReminderAt?: string;

  // Custom registration fields
  customFields?: Record<string, any>;
}

// =============================================================================
// EVENT REQUEST TYPES
// =============================================================================

export interface CreateEventRequest {
  title: string;
  description: string;
  summary?: string;
  type: EventType;
  visibility?: EventVisibility;

  startDate: string;
  endDate: string;
  timezone?: string;
  isAllDay?: boolean;

  venue?: string;
  address?: Address;
  isOnline?: boolean;
  onlineUrl?: string;

  maxAttendees?: number;
  requiresApproval?: boolean;
  registrationStartDate?: string;
  registrationEndDate?: string;

  isFree?: boolean;
  price?: number;

  contactInfo: ContactInfo;

  coverImageId?: string;
  galleryIds?: string[];

  agenda?: Omit<EventAgendaItem, "id">[];
  speakers?: Omit<EventSpeaker, "id">[];
  sponsors?: Omit<EventSponsor, "id">[];

  allowComments?: boolean;
  allowSharing?: boolean;
  sendReminders?: boolean;

  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  customFields?: Record<string, any>;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
  reason?: string;
}

// =============================================================================
// EVENT QUERY TYPES
// =============================================================================

export interface EventQuery {
  search?: string;
  type?: EventType | EventType[];
  status?: EventStatus | EventStatus[];
  visibility?: EventVisibility | EventVisibility[];

  organizerId?: string;

  startDateAfter?: string;
  startDateBefore?: string;
  endDateAfter?: string;
  endDateBefore?: string;

  isFree?: boolean;
  isOnline?: boolean;
  featured?: boolean;
  hasAvailableSpots?: boolean;

  location?: string;

  tags?: string[];

  sortBy?:
    | "startDate"
    | "endDate"
    | "createdAt"
    | "title"
    | "viewCount"
    | "attendeeCount";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;

  includeOrganizer?: boolean;
  includeStats?: boolean;
}

export interface PublicEventQuery {
  search?: string;
  type?: EventType | EventType[];
  startDateAfter?: string;
  startDateBefore?: string;
  isFree?: boolean;
  isOnline?: boolean;
  featured?: boolean;
  hasAvailableSpots?: boolean;
  location?: string;
  limit?: number;
  offset?: number;
  sortBy?: "startDate" | "title" | "viewCount";
  sortOrder?: "asc" | "desc";
}

// =============================================================================
// EVENT ANALYTICS TYPES
// =============================================================================

export interface EventAnalytics {
  overview: {
    totalEvents: number;
    upcomingEvents: number;
    ongoingEvents: number;
    completedEvents: number;
    totalAttendees: number;
    totalRegistrations: number;
    averageAttendanceRate: number;
  };

  performance: {
    topEvents: Array<{
      eventId: string;
      title: string;
      attendees: number;
      registrations: number;
      attendanceRate: number;
      rating: number;
    }>;

    popularTypes: Array<{
      type: EventType;
      count: number;
      totalAttendees: number;
      growth: number;
    }>;

    monthlyTrends: Array<{
      month: string;
      events: number;
      registrations: number;
      attendees: number;
    }>;
  };

  insights: {
    peakRegistrationTimes: Array<{
      hour: number;
      dayOfWeek: number;
      registrations: number;
    }>;

    popularVenues: Array<{
      venue: string;
      eventCount: number;
      averageAttendance: number;
    }>;

    attendeeRetention: {
      newAttendees: number;
      returningAttendees: number;
      retentionRate: number;
    };
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const EVENT_CONSTANTS = {
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 10000,
  MAX_SUMMARY_LENGTH: 500,
  MAX_ATTENDEES_DEFAULT: 1000,
  REMINDER_INTERVALS: [24, 1], // hours before event
  MAX_SPEAKERS: 50,
  MAX_SPONSORS: 20,
  MAX_AGENDA_ITEMS: 100,
  SLUG_MAX_LENGTH: 100,
  MAX_CUSTOM_FIELDS: 20,
} as const;

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  GOVERNMENT: "Pemerintahan",
  COMMUNITY: "Masyarakat",
  RELIGIOUS: "Keagamaan",
  CULTURAL: "Budaya",
  SPORTS: "Olahraga",
  EDUCATION: "Pendidikan",
  TOURISM: "Pariwisata",
  BUSINESS: "Bisnis",
  HEALTH: "Kesehatan",
  ENVIRONMENT: "Lingkungan",
  OTHER: "Lainnya",
} as const;

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  DRAFT: "Konsep",
  PENDING_APPROVAL: "Menunggu Persetujuan",
  APPROVED: "Disetujui",
  PUBLISHED: "Dipublikasikan",
  ONGOING: "Sedang Berlangsung",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  POSTPONED: "Ditunda",
  ARCHIVED: "Diarsipkan",
} as const;

export const ATTENDEE_STATUS_LABELS: Record<AttendeeStatus, string> = {
  REGISTERED: "Terdaftar",
  CONFIRMED: "Dikonfirmasi",
  ATTENDED: "Hadir",
  NO_SHOW: "Tidak Hadir",
  CANCELLED: "Dibatalkan",
  WAITLISTED: "Daftar Tunggu",
} as const;
