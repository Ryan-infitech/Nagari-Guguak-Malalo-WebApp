/**
 * UMKM Types
 * Types untuk sistem UMKM (Usaha Mikro Kecil Menengah)
 */

import { BaseEntity, FileMetadata, Address, ContactInfo } from "./common";
import { User } from "./auth";

// =============================================================================
// UMKM CORE TYPES
// =============================================================================

export type BusinessCategory =
  | "FOOD_BEVERAGE"
  | "FASHION"
  | "HANDICRAFT"
  | "AGRICULTURE"
  | "SERVICES"
  | "TECHNOLOGY"
  | "RETAIL"
  | "MANUFACTURING"
  | "EDUCATION"
  | "HEALTHCARE"
  | "OTHER";

export type BusinessType = "MICRO" | "SMALL" | "MEDIUM";

export type BusinessStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "SUSPENDED"
  | "CLOSED";

export type LegalEntity =
  | "INDIVIDUAL"
  | "CV"
  | "PT"
  | "COOPERATIVE"
  | "FOUNDATION"
  | "OTHER";

export interface UMKM extends BaseEntity {
  // Basic business information
  businessName: string;
  legalName?: string;
  slug: string;
  description: string;
  category: BusinessCategory;
  subCategory?: string;
  type: BusinessType;
  status: BusinessStatus;

  // Owner information
  ownerId: string;
  owner?: User;
  ownerName: string;

  // Legal and registration
  legalEntity: LegalEntity;
  registrationNumber?: string;
  taxNumber?: string; // NPWP
  licenseNumber?: string;
  establishedDate: string;

  // Contact and location
  contactInfo: ContactInfo;
  businessAddress: Address;
  sameAsOwnerAddress: boolean;

  // Business details
  products: UMKMProduct[];
  services: UMKMService[];
  employeeCount: number;
  workingHours: Array<{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isHoliday?: boolean;
  }>;

  // Financial information
  annualRevenue?: number;
  revenueRange?: "UNDER_300M" | "300M_2_5B" | "2_5B_50B" | "OVER_50B";
  assets?: number;
  assetRange?: "UNDER_50M" | "50M_500M" | "500M_10B" | "OVER_10B";

  // Banking and finance
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };

  // Online presence
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    tiktok?: string;
    youtube?: string;
  };

  // Media and marketing
  logo?: FileMetadata;
  coverImage?: FileMetadata;
  gallery: FileMetadata[];
  brochures?: FileMetadata[];

  // Certifications and awards
  certifications: UMKMCertification[];
  awards: UMKMAward[];

  // Market information
  targetMarket: string[];
  distributionChannels: string[];
  competitiveAdvantages: string[];

  // Support and programs
  assistancePrograms: UMKMAssistance[];
  trainingHistory: UMKMTraining[];

  // Performance metrics
  totalOrders?: number;
  totalRevenue?: number;
  averageRating: number;
  totalReviews: number;

  // Verification and approval
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationDocuments?: FileMetadata[];

  // SEO and visibility
  featured: boolean;
  popularityScore: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Additional information
  businessModel?: string;
  challenges?: string[];
  futurePlans?: string;
  additionalNotes?: string;

  // Partnership and collaboration
  partnerships?: UMKMPartnership[];
  collaborations?: string[];

  // Export/import activities
  hasExportActivity: boolean;
  exportDestinations?: string[];
  hasImportActivity: boolean;
  importSources?: string[];
}

export interface UMKMProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  priceRange?: string;
  unit?: string;
  images?: FileMetadata[];
  features?: string[];
  materials?: string[];
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
  };

  // Availability
  inStock: boolean;
  stockQuantity?: number;
  minimumOrder?: number;

  // Certifications
  certifications?: string[];
  halal?: boolean;
  organic?: boolean;

  // Sales information
  totalSold?: number;
  averageRating?: number;
  totalReviews?: number;

  isActive: boolean;
  isFeatured: boolean;
}

export interface UMKMService {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  priceRange?: string;
  duration?: string;

  // Service details
  features: string[];
  requirements?: string[];
  deliverables?: string[];

  // Availability
  isAvailable: boolean;
  serviceAreas?: string[];

  // Portfolio
  portfolioImages?: FileMetadata[];
  testimonials?: Array<{
    clientName: string;
    comment: string;
    rating: number;
    date: string;
  }>;

  isActive: boolean;
  isFeatured: boolean;
}

export interface UMKMCertification {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate?: string;
  certificateNumber?: string;
  document?: FileMetadata;
  type:
    | "HALAL"
    | "ISO"
    | "SNI"
    | "ORGANIC"
    | "EXPORT"
    | "SAFETY"
    | "QUALITY"
    | "OTHER";
  isActive: boolean;
}

export interface UMKMAward {
  id: string;
  name: string;
  category: string;
  awardedBy: string;
  awardedDate: string;
  level: "LOCAL" | "REGIONAL" | "NATIONAL" | "INTERNATIONAL";
  description?: string;
  certificate?: FileMetadata;
}

export interface UMKMAssistance {
  id: string;
  programName: string;
  type:
    | "FUNDING"
    | "TRAINING"
    | "MENTORING"
    | "EQUIPMENT"
    | "MARKETING"
    | "CERTIFICATION"
    | "OTHER";
  provider: string;
  amount?: number;
  description: string;
  receivedDate: string;
  status: "RECEIVED" | "ONGOING" | "COMPLETED";
  documents?: FileMetadata[];
}

export interface UMKMTraining {
  id: string;
  title: string;
  category: string;
  provider: string;
  startDate: string;
  endDate: string;
  duration: number; // hours
  certificate?: FileMetadata;
  skills: string[];
  status: "COMPLETED" | "ONGOING" | "PLANNED";
}

export interface UMKMPartnership {
  id: string;
  partnerName: string;
  partnerType:
    | "SUPPLIER"
    | "DISTRIBUTOR"
    | "RETAILER"
    | "TECHNOLOGY"
    | "FINANCIAL"
    | "GOVERNMENT"
    | "OTHER";
  description: string;
  startDate: string;
  endDate?: string;
  status: "ACTIVE" | "INACTIVE" | "TERMINATED";
  benefits?: string[];
}

// =============================================================================
// UMKM OPERATIONS
// =============================================================================

export interface CreateUMKMRequest {
  businessName: string;
  legalName?: string;
  description: string;
  category: BusinessCategory;
  subCategory?: string;
  type: BusinessType;

  ownerName: string;
  legalEntity: LegalEntity;
  registrationNumber?: string;
  taxNumber?: string;
  licenseNumber?: string;
  establishedDate: string;

  contactInfo: ContactInfo;
  businessAddress: Address;
  sameAsOwnerAddress?: boolean;

  employeeCount: number;
  annualRevenue?: number;
  assets?: number;

  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    tiktok?: string;
    youtube?: string;
  };

  logoId?: string;
  coverImageId?: string;
  galleryIds?: string[];

  products?: Omit<UMKMProduct, "id">[];
  services?: Omit<UMKMService, "id">[];

  targetMarket: string[];
  distributionChannels: string[];
  competitiveAdvantages: string[];

  businessModel?: string;
  challenges?: string[];
  futurePlans?: string;
  additionalNotes?: string;

  hasExportActivity?: boolean;
  exportDestinations?: string[];
  hasImportActivity?: boolean;
  importSources?: string[];

  verificationDocumentIds?: string[];
}

export interface UpdateUMKMRequest extends Partial<CreateUMKMRequest> {
  id: string;
  reason?: string;
}

export interface UMKMQuery {
  search?: string;
  businessName?: string;
  category?: BusinessCategory | BusinessCategory[];
  type?: BusinessType | BusinessType[];
  status?: BusinessStatus | BusinessStatus[];
  legalEntity?: LegalEntity | LegalEntity[];

  ownerId?: string;
  ownerName?: string;

  location?: string;
  city?: string;
  province?: string;

  employeeCountMin?: number;
  employeeCountMax?: number;
  revenueRange?: string;
  assetRange?: string;

  establishedAfter?: string;
  establishedBefore?: string;

  verified?: boolean;
  featured?: boolean;
  hasProducts?: boolean;
  hasServices?: boolean;
  hasWebsite?: boolean;
  hasExportActivity?: boolean;

  minRating?: number;
  maxRating?: number;

  sortBy?:
    | "businessName"
    | "establishedDate"
    | "averageRating"
    | "totalRevenue"
    | "popularityScore";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;

  includeOwner?: boolean;
  includeProducts?: boolean;
  includeServices?: boolean;
  includeStats?: boolean;
}

// =============================================================================
// UMKM ANALYTICS
// =============================================================================

export interface UMKMAnalytics {
  overview: {
    totalUMKM: number;
    activeUMKM: number;
    verifiedUMKM: number;
    totalEmployees: number;
    totalRevenue: number;
    averageRating: number;
  };

  breakdown: {
    byCategory: Array<{
      category: BusinessCategory;
      count: number;
      totalRevenue: number;
      averageEmployees: number;
    }>;

    byType: Array<{
      type: BusinessType;
      count: number;
      percentage: number;
      totalRevenue: number;
    }>;

    byLocation: Array<{
      location: string;
      count: number;
      totalRevenue: number;
      averageRating: number;
    }>;
  };

  trends: Array<{
    month: string;
    newRegistrations: number;
    totalRevenue: number;
    averageRevenue: number;
  }>;

  performance: {
    topPerformers: Array<{
      umkmId: string;
      businessName: string;
      revenue: number;
      growth: number;
      rating: number;
    }>;

    growthLeaders: Array<{
      umkmId: string;
      businessName: string;
      growthRate: number;
      revenueIncrease: number;
    }>;
  };

  insights: {
    averageEmployeesPerUMKM: number;
    exportActivePercentage: number;
    digitalAdoptionRate: number;
    certificationRate: number;
    assistanceProgramParticipation: number;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const UMKM_CONSTANTS = {
  MAX_BUSINESS_NAME_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_PRODUCTS: 100,
  MAX_SERVICES: 50,
  MAX_GALLERY_IMAGES: 20,
  MAX_CERTIFICATIONS: 20,
  MAX_AWARDS: 30,
  MIN_EMPLOYEE_COUNT: 1,
  MAX_EMPLOYEE_COUNT: 300,
  RATING_MIN: 1,
  RATING_MAX: 5,
} as const;

export const BUSINESS_CATEGORY_LABELS: Record<BusinessCategory, string> = {
  FOOD_BEVERAGE: "Makanan & Minuman",
  FASHION: "Fashion",
  HANDICRAFT: "Kerajinan",
  AGRICULTURE: "Pertanian",
  SERVICES: "Jasa",
  TECHNOLOGY: "Teknologi",
  RETAIL: "Retail",
  MANUFACTURING: "Manufaktur",
  EDUCATION: "Pendidikan",
  HEALTHCARE: "Kesehatan",
  OTHER: "Lainnya",
} as const;

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  MICRO: "Usaha Mikro",
  SMALL: "Usaha Kecil",
  MEDIUM: "Usaha Menengah",
} as const;

export const LEGAL_ENTITY_LABELS: Record<LegalEntity, string> = {
  INDIVIDUAL: "Perorangan",
  CV: "CV (Commanditaire Vennootschap)",
  PT: "PT (Perseroan Terbatas)",
  COOPERATIVE: "Koperasi",
  FOUNDATION: "Yayasan",
  OTHER: "Lainnya",
} as const;
