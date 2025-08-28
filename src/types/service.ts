/**
 * Service Types
 * Types untuk layanan umum
 */

import { BaseEntity, Priority, Address, ContactInfo } from "./common";
import { User } from "./auth";

// =============================================================================
// SERVICE CORE TYPES
// =============================================================================

export type ServiceCategory =
  | "ADMINISTRATIVE"
  | "HEALTHCARE"
  | "EDUCATION"
  | "SOCIAL"
  | "ECONOMIC"
  | "INFRASTRUCTURE"
  | "ENVIRONMENT"
  | "SECURITY"
  | "TOURISM"
  | "TECHNOLOGY"
  | "OTHER";

export type ServiceType =
  | "DIGITAL"
  | "PHYSICAL"
  | "HYBRID"
  | "CONSULTATION"
  | "INFORMATION";

export type ServiceStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "MAINTENANCE"
  | "DISCONTINUED";

export type ServicePriority = Priority;

export interface Service extends BaseEntity {
  // Basic information
  name: string;
  description: string;
  summary?: string;
  slug: string;
  category: ServiceCategory;
  type: ServiceType;
  status: ServiceStatus;
  priority: ServicePriority;

  // Service details
  features: string[];
  benefits: string[];
  requirements: string[];
  procedures: ServiceProcedure[];

  // Availability
  isAvailable247: boolean;
  operatingHours?: OperatingHours[];
  holidays?: string[]; // Dates when service is unavailable

  // Contact and location
  contactInfo: ContactInfo;
  serviceLocation?: Address;
  onlineUrl?: string;

  // Pricing
  isFree: boolean;
  baseFee?: number;
  additionalFees?: ServiceFee[];

  // Requirements and documents
  requiredDocuments: string[];
  eligibilityCriteria: string[];
  ageRestrictions?: {
    minAge?: number;
    maxAge?: number;
  };

  // Processing
  estimatedProcessingTime: string;
  maxProcessingTime?: string;
  processingSteps: string[];

  // Staff and resources
  responsibleDepartment: string;
  serviceOfficers: ServiceOfficer[];
  requiredResources?: string[];

  // Digital service specific
  digitalPlatforms?: string[];
  mobileAppAvailable: boolean;
  apiEndpoint?: string;

  // Quality metrics
  serviceLevel: {
    responseTime: string; // e.g., "24 hours"
    resolutionTime: string; // e.g., "3-5 business days"
    accuracyRate: number; // percentage
    satisfactionTarget: number; // target satisfaction score
  };

  // Performance tracking
  totalRequests: number;
  completedRequests: number;
  averageRating: number;
  totalRatings: number;
  averageProcessingTime: number; // in hours

  // Content and media
  coverImage?: string;
  gallery?: string[];
  videos?: string[];
  brochures?: string[];

  // SEO and metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Settings
  allowOnlineApplication: boolean;
  requiresAppointment: boolean;
  allowWalkIn: boolean;
  sendNotifications: boolean;
  trackProgress: boolean;

  // Version and updates
  version: string;
  lastUpdated: string;
  updatedBy?: string;
  changeLog?: ServiceChange[];

  // Related services
  relatedServices?: string[];
  prerequisiteServices?: string[];

  // Compliance
  legalBasis?: string[];
  regulations?: string[];

  // Analytics
  popularityScore: number;
  usageFrequency: "HIGH" | "MEDIUM" | "LOW";
  seasonalDemand?: boolean;
}

export interface ServiceProcedure {
  step: number;
  title: string;
  description: string;
  estimatedTime?: string;
  location?: string;
  requiredDocuments?: string[];
  fees?: number;
  notes?: string;
}

export interface OperatingHours {
  dayOfWeek:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  openTime: string; // HH:MM format
  closeTime: string; // HH:MM format
  breakStartTime?: string;
  breakEndTime?: string;
  isHoliday?: boolean;
}

export interface ServiceFee {
  name: string;
  amount: number;
  description?: string;
  isOptional: boolean;
  conditions?: string[];
}

export interface ServiceOfficer {
  id: string;
  name: string;
  position: string;
  contact: ContactInfo;
  specializations?: string[];
  isAvailable: boolean;
  workingHours?: OperatingHours[];
}

export interface ServiceChange {
  version: string;
  date: string;
  changedBy: string;
  changeType:
    | "FEATURE_ADDED"
    | "FEATURE_REMOVED"
    | "PROCEDURE_UPDATED"
    | "FEE_CHANGED"
    | "REQUIREMENT_CHANGED"
    | "OTHER";
  description: string;
  impact: "LOW" | "MEDIUM" | "HIGH";
}

// =============================================================================
// SERVICE REQUEST TYPES
// =============================================================================

export interface CreateServiceRequest {
  name: string;
  description: string;
  summary?: string;
  category: ServiceCategory;
  type: ServiceType;

  features: string[];
  benefits: string[];
  requirements: string[];
  procedures: Omit<ServiceProcedure, "step">[];

  isAvailable247?: boolean;
  operatingHours?: OperatingHours[];

  contactInfo: ContactInfo;
  serviceLocation?: Address;
  onlineUrl?: string;

  isFree?: boolean;
  baseFee?: number;
  additionalFees?: ServiceFee[];

  requiredDocuments: string[];
  eligibilityCriteria: string[];
  ageRestrictions?: { minAge?: number; maxAge?: number };

  estimatedProcessingTime: string;
  maxProcessingTime?: string;
  processingSteps: string[];

  responsibleDepartment: string;
  serviceOfficers: Omit<ServiceOfficer, "id">[];

  digitalPlatforms?: string[];
  mobileAppAvailable?: boolean;
  apiEndpoint?: string;

  serviceLevel: {
    responseTime: string;
    resolutionTime: string;
    accuracyRate: number;
    satisfactionTarget: number;
  };

  coverImageId?: string;
  galleryIds?: string[];
  videoIds?: string[];
  brochureIds?: string[];

  allowOnlineApplication?: boolean;
  requiresAppointment?: boolean;
  allowWalkIn?: boolean;
  sendNotifications?: boolean;
  trackProgress?: boolean;

  relatedServiceIds?: string[];
  prerequisiteServiceIds?: string[];

  legalBasis?: string[];
  regulations?: string[];

  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  id: string;
  version: string;
  changeType:
    | "FEATURE_ADDED"
    | "FEATURE_REMOVED"
    | "PROCEDURE_UPDATED"
    | "FEE_CHANGED"
    | "REQUIREMENT_CHANGED"
    | "OTHER";
  changeDescription: string;
  impact: "LOW" | "MEDIUM" | "HIGH";
  reason?: string;
}

// =============================================================================
// SERVICE QUERY TYPES
// =============================================================================

export interface ServiceQuery {
  search?: string;
  category?: ServiceCategory | ServiceCategory[];
  type?: ServiceType | ServiceType[];
  status?: ServiceStatus | ServiceStatus[];

  isFree?: boolean;
  isAvailable247?: boolean;
  allowOnlineApplication?: boolean;
  requiresAppointment?: boolean;
  mobileAppAvailable?: boolean;

  department?: string;

  minRating?: number;
  maxRating?: number;
  minFee?: number;
  maxFee?: number;

  usageFrequency?: "HIGH" | "MEDIUM" | "LOW";

  keywords?: string[];

  sortBy?:
    | "name"
    | "createdAt"
    | "averageRating"
    | "totalRequests"
    | "popularityScore";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;

  includeOfficers?: boolean;
  includeStats?: boolean;
  includeRelated?: boolean;
}

export interface PublicServiceQuery {
  search?: string;
  category?: ServiceCategory | ServiceCategory[];
  type?: ServiceType | ServiceType[];
  isFree?: boolean;
  allowOnlineApplication?: boolean;
  mobileAppAvailable?: boolean;
  sortBy?: "name" | "averageRating" | "popularityScore";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

// =============================================================================
// SERVICE ANALYTICS
// =============================================================================

export interface ServiceAnalytics {
  overview: {
    totalServices: number;
    activeServices: number;
    digitalServices: number;
    freeServices: number;
    averageRating: number;
    totalRequests: number;
    completionRate: number;
  };

  performance: {
    topServices: Array<{
      serviceId: string;
      serviceName: string;
      requests: number;
      completionRate: number;
      averageRating: number;
      popularityScore: number;
    }>;

    byCategory: Array<{
      category: ServiceCategory;
      serviceCount: number;
      totalRequests: number;
      averageRating: number;
      completionRate: number;
    }>;

    byDepartment: Array<{
      department: string;
      serviceCount: number;
      totalRequests: number;
      averageProcessingTime: number;
      satisfactionScore: number;
    }>;
  };

  trends: Array<{
    month: string;
    newServices: number;
    totalRequests: number;
    completedRequests: number;
    averageSatisfaction: number;
  }>;

  usage: {
    digitalAdoption: number; // percentage of digital requests
    mobileUsage: number; // percentage of mobile requests
    peakUsageTimes: Array<{
      hour: number;
      dayOfWeek: number;
      requestCount: number;
    }>;

    userSegments: Array<{
      segment: string;
      count: number;
      preferredServices: string[];
      satisfaction: number;
    }>;
  };

  efficiency: {
    processingTimeByService: Array<{
      serviceId: string;
      serviceName: string;
      averageTime: number;
      targetTime: number;
      efficiency: number;
    }>;

    bottlenecks: Array<{
      service: string;
      step: string;
      averageDelay: number;
      frequency: number;
    }>;

    resourceUtilization: Array<{
      resource: string;
      utilization: number; // percentage
      capacity: number;
      demand: number;
    }>;
  };

  quality: {
    satisfactionByService: Array<{
      serviceId: string;
      serviceName: string;
      averageRating: number;
      totalRatings: number;
      npsScore: number;
    }>;

    complaintsByCategory: Array<{
      category: string;
      count: number;
      resolutionRate: number;
      averageResolutionTime: number;
    }>;

    qualityIndicators: {
      firstCallResolution: number;
      customerRetention: number;
      serviceAvailability: number;
      responseTime: number;
    };
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SERVICE_CONSTANTS = {
  MAX_NAME_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_SUMMARY_LENGTH: 500,
  MAX_FEATURES: 20,
  MAX_BENEFITS: 20,
  MAX_REQUIREMENTS: 20,
  MAX_PROCEDURES: 50,
  MAX_OFFICERS: 20,
  MAX_RELATED_SERVICES: 10,
  MAX_KEYWORDS: 15,
  SLUG_MAX_LENGTH: 100,

  RATING_MIN: 1,
  RATING_MAX: 5,

  DEFAULT_PROCESSING_TIME: "3-5 hari kerja",
  DEFAULT_RESPONSE_TIME: "24 jam",

  POPULARITY_SCORE_WEIGHTS: {
    requests: 0.4,
    rating: 0.3,
    recency: 0.2,
    completion: 0.1,
  },
} as const;

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  ADMINISTRATIVE: "Administrasi",
  HEALTHCARE: "Kesehatan",
  EDUCATION: "Pendidikan",
  SOCIAL: "Sosial",
  ECONOMIC: "Ekonomi",
  INFRASTRUCTURE: "Infrastruktur",
  ENVIRONMENT: "Lingkungan",
  SECURITY: "Keamanan",
  TOURISM: "Pariwisata",
  TECHNOLOGY: "Teknologi",
  OTHER: "Lainnya",
} as const;

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  DIGITAL: "Digital",
  PHYSICAL: "Fisik",
  HYBRID: "Hybrid",
  CONSULTATION: "Konsultasi",
  INFORMATION: "Informasi",
} as const;

export const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
  ACTIVE: "Aktif",
  INACTIVE: "Tidak Aktif",
  MAINTENANCE: "Dalam Pemeliharaan",
  DISCONTINUED: "Dihentikan",
} as const;
