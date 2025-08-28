/**
 * Tourism Types
 * Types untuk sistem pariwisata
 */

import { BaseEntity, FileMetadata, Address, ContactInfo } from './common';
import { User } from './auth';

// =============================================================================
// TOURISM CORE TYPES
// =============================================================================

export type TourismCategory =
  | 'NATURAL'
  | 'CULTURAL'
  | 'HISTORICAL'
  | 'ADVENTURE'
  | 'CULINARY'
  | 'RELIGIOUS'
  | 'RECREATIONAL'
  | 'EDUCATIONAL'
  | 'WELLNESS'
  | 'OTHER';

export type DestinationStatus = 'ACTIVE' | 'INACTIVE' | 'UNDER_DEVELOPMENT' | 'CLOSED_TEMPORARILY';

export type TourismFacility =
  | 'PARKING'
  | 'RESTROOM'
  | 'RESTAURANT'
  | 'GIFT_SHOP'
  | 'GUIDE_SERVICE'
  | 'WIFI'
  | 'ATM'
  | 'FIRST_AID'
  | 'WHEELCHAIR_ACCESS'
  | 'PRAYER_ROOM';

export interface TourismDestination extends BaseEntity {
  // Basic information
  name: string;
  description: string;
  summary?: string;
  slug: string;
  category: TourismCategory;
  status: DestinationStatus;

  // Location details
  address: Address;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  elevation?: number; // meters above sea level
  area?: number; // in hectares

  // Contact and management
  contactInfo: ContactInfo;
  managedBy: string; // Organization or person
  managerContact?: ContactInfo;

  // Operational details
  operatingHours: Array<{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isHoliday?: boolean;
  }>;

  // Entry fees
  isFree: boolean;
  entryFees?: Array<{
    category: 'ADULT' | 'CHILD' | 'STUDENT' | 'SENIOR' | 'FOREIGN' | 'GROUP';
    price: number;
    description?: string;
  }>;

  // Facilities and amenities
  facilities: TourismFacility[];
  amenities: string[];
  accessibility: {
    wheelchairAccessible: boolean;
    disabilityFriendly: boolean;
    elderlyFriendly: boolean;
    childFriendly: boolean;
    petFriendly: boolean;
  };

  // Media content
  coverImage?: FileMetadata;
  gallery: FileMetadata[];
  galleryImages?:
    | string
    | string[]
    | Array<{
        url?: string;
        imageUrl?: string;
        [key: string]: any;
      }>;
  mainImageUrl?: string;
  videos?: Array<{
    title: string;
    url: string;
    thumbnail?: string;
    type: 'PROMOTIONAL' | 'VIRTUAL_TOUR' | 'DOCUMENTARY' | 'USER_GENERATED';
  }>;

  // Tourism information
  bestTimeToVisit?: string;
  averageVisitDuration: string; // e.g., "2-3 hours"
  difficultyLevel?: 'EASY' | 'MODERATE' | 'CHALLENGING' | 'DIFFICULT';
  recommendedActivities: string[];

  // Safety and guidelines
  safetyGuidelines: string[];
  restrictions?: string[];
  weatherDependency: boolean;

  // Nearby attractions
  nearbyDestinations?: string[]; // IDs of nearby destinations
  nearbyServices: Array<{
    type: 'RESTAURANT' | 'HOTEL' | 'GAS_STATION' | 'HOSPITAL' | 'ATM' | 'SHOP';
    name: string;
    distance: number; // in meters
    contact?: string;
  }>;

  // Statistics and ratings
  totalVisitors: number;
  monthlyVisitors: number;
  averageRating: number;
  totalRatings: number;
  popularityScore: number;

  // SEO and metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Content management
  featured: boolean;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;

  // Additional information
  historicalSignificance?: string;
  culturalImportance?: string;
  environmentalInfo?: string;
  conservationEfforts?: string;

  // Tourism packages
  tourPackages?: TourPackage[];

  // Events and activities
  upcomingEvents?: TourismEvent[];

  // User-generated content
  allowReviews: boolean;
  allowPhotos: boolean;
  moderationRequired: boolean;
}

export interface TourPackage extends BaseEntity {
  // Basic information
  name: string;
  description: string;
  type: 'DAY_TRIP' | 'MULTI_DAY' | 'WEEKEND' | 'CUSTOM';

  // Destinations included
  destinations: string[]; // Destination IDs

  // Package details
  duration: string; // e.g., "1 day", "2 days 1 night"
  groupSize: {
    min: number;
    max: number;
  };

  // Pricing
  price: number;
  priceIncludes: string[];
  priceExcludes: string[];

  // Itinerary
  itinerary: Array<{
    day: number;
    time: string;
    activity: string;
    location?: string;
    duration?: string;
    notes?: string;
  }>;

  // Booking information
  availableDates: string[];
  bookingDeadline: number; // days before trip
  cancellationPolicy: string;

  // Provider information
  providerId: string;
  provider?: TourProvider;
  guideIncluded: boolean;
  transportIncluded: boolean;
  mealsIncluded: string[]; // 'BREAKFAST', 'LUNCH', 'DINNER'

  // Requirements
  requirements: string[];
  recommendations: string[];
  ageRestrictions?: {
    minAge?: number;
    maxAge?: number;
  };

  // Media
  images: FileMetadata[];

  // Status
  isActive: boolean;
  totalBookings: number;
  averageRating: number;
}

export interface TourProvider extends BaseEntity {
  // Basic information
  name: string;
  description: string;
  type: 'INDIVIDUAL' | 'AGENCY' | 'COMPANY' | 'GOVERNMENT';

  // Contact and location
  contactInfo: ContactInfo;
  address: Address;

  // Business information
  licenseNumber?: string;
  certifications: string[];
  establishedYear?: number;

  // Services
  services: string[];
  specializations: TourismCategory[];
  languages: string[];

  // Ratings and reviews
  averageRating: number;
  totalRatings: number;
  totalTours: number;

  // Verification
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;

  // Media
  logo?: FileMetadata;
  gallery?: FileMetadata[];

  // Status
  isActive: boolean;
}

export interface TourismEvent extends BaseEntity {
  name: string;
  description: string;
  destinationId?: string;
  destination?: TourismDestination;

  startDate: string;
  endDate: string;
  type: 'FESTIVAL' | 'CULTURAL' | 'SEASONAL' | 'COMPETITION' | 'EXHIBITION' | 'OTHER';

  organizer: string;
  contactInfo: ContactInfo;

  ticketRequired: boolean;
  ticketPrice?: number;

  expectedAttendees?: number;
  registrationRequired: boolean;
  registrationDeadline?: string;

  images?: FileMetadata[];

  isAnnual: boolean;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

// =============================================================================
// TOURISM REVIEWS AND RATINGS
// =============================================================================

export interface TourismReview extends BaseEntity {
  destinationId?: string;
  destination?: TourismDestination;
  packageId?: string;
  package?: TourPackage;
  providerId?: string;
  provider?: TourProvider;

  userId: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };

  // Additional review fields from backend
  reviewerName: string;
  reviewerEmail: string;
  reviewTitle?: string;
  reviewContent: string;
  isVerified: boolean;
  isFeatured: boolean;
  ipAddress?: string;

  // Media fields
  mediaUrls?: Array<{
    url: string;
    type: 'image' | 'video';
    filename: string;
    size: number;
    mimeType: string;
  }>;
  mediaCount: number;
  hasPhotos: boolean;
  hasVideos: boolean;

  // Review content (legacy)
  rating: number; // 1-5
  title?: string;
  content: string;

  // Detailed ratings
  detailedRatings?: {
    cleanliness?: number;
    facilities?: number;
    accessibility?: number;
    value?: number;
    safety?: number;
    staff?: number;
  };

  // Visit information
  visitDate?: string;
  visitType: 'SOLO' | 'COUPLE' | 'FAMILY' | 'FRIENDS' | 'GROUP' | 'BUSINESS';
  visitPurpose: 'LEISURE' | 'EDUCATION' | 'BUSINESS' | 'PHOTOGRAPHY' | 'RESEARCH' | 'OTHER';

  // Media
  photos?: FileMetadata[];

  // Moderation
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'HIDDEN';
  moderatedBy?: string;
  moderatedAt?: string;
  moderationReason?: string;

  // Engagement
  helpfulCount: number;
  reportCount: number;

  // Verification
  isVerifiedVisit: boolean;
  verificationMethod?: 'TICKET' | 'PHOTO' | 'GPS' | 'BOOKING';
}

// =============================================================================
// TOURISM ANALYTICS
// =============================================================================

export interface TourismAnalytics {
  overview: {
    totalDestinations: number;
    activeDestinations: number;
    totalVisitors: number;
    averageRating: number;
    totalReviews: number;
    totalProviders: number;
  };

  performance: {
    topDestinations: Array<{
      destinationId: string;
      name: string;
      visitors: number;
      rating: number;
      revenue?: number;
    }>;

    byCategory: Array<{
      category: TourismCategory;
      destinationCount: number;
      totalVisitors: number;
      averageRating: number;
    }>;

    seasonalTrends: Array<{
      month: string;
      visitors: number;
      bookings: number;
      revenue: number;
    }>;
  };

  insights: {
    popularActivities: Array<{ activity: string; frequency: number }>;
    visitorDemographics: Array<{ segment: string; percentage: number }>;
    averageStayDuration: number;
    repeatVisitorRate: number;
    internationalVisitorPercentage: number;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const TOURISM_CONSTANTS = {
  MAX_NAME_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_ACTIVITIES: 20,
  MAX_FACILITIES: 15,
  MAX_PHOTOS_PER_REVIEW: 10,
  MAX_GALLERY_IMAGES: 50,
  RATING_MIN: 1,
  RATING_MAX: 5,
  MAX_GROUP_SIZE: 100,
  REVIEW_MIN_LENGTH: 10,
  REVIEW_MAX_LENGTH: 2000,
} as const;

export const TOURISM_CATEGORY_LABELS: Record<TourismCategory, string> = {
  NATURAL: 'Wisata Alam',
  CULTURAL: 'Wisata Budaya',
  HISTORICAL: 'Wisata Sejarah',
  ADVENTURE: 'Wisata Petualangan',
  CULINARY: 'Wisata Kuliner',
  RELIGIOUS: 'Wisata Religi',
  RECREATIONAL: 'Wisata Rekreasi',
  EDUCATIONAL: 'Wisata Edukasi',
  WELLNESS: 'Wisata Kesehatan',
  OTHER: 'Lainnya',
} as const;

export const TOURISM_FACILITY_LABELS: Record<TourismFacility, string> = {
  PARKING: 'Area Parkir',
  RESTROOM: 'Toilet',
  RESTAURANT: 'Restoran',
  GIFT_SHOP: 'Toko Souvenir',
  GUIDE_SERVICE: 'Layanan Pemandu',
  WIFI: 'WiFi',
  ATM: 'ATM',
  FIRST_AID: 'P3K',
  WHEELCHAIR_ACCESS: 'Akses Kursi Roda',
  PRAYER_ROOM: 'Mushola',
} as const;

// =============================================================================
// API RESPONSE INTERFACES
// =============================================================================

export interface UploadResponse {
  data?: {
    data?: {
      mediaUrls?: Array<{
        url: string;
        type: 'image' | 'video';
        filename: string;
        size: number;
        mimeType: string;
      }>;
    };
    mediaUrls?: Array<{
      url: string;
      type: 'image' | 'video';
      filename: string;
      size: number;
      mimeType: string;
    }>;
  };
}

export interface GalleryResponse {
  data?: {
    photos?: Array<{
      id: string;
      imageUrl: string;
      caption?: string;
      uploadedBy: string;
      createdAt: string;
    }>;
  };
}

export interface ExtendedFile extends File {
  preview?: string;
  isExisting?: boolean;
  originalMedia?: any;
}

export interface ExtendedTourismDestination extends TourismDestination {
  mainImageUrl?: string;
}
