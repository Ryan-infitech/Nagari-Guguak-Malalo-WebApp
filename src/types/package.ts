/**
 * Tourism Package Types
 * Defines types for tourism packages, bookings, and related operations
 */

import type { User } from './auth';
import type { TourismDestination } from './tourism';

// Define ContactInfo locally since it might not be exported from tourism
interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
  };
}

// Tourism Package types
export interface TourismPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  duration: string;
  price: string; // Backend mengirim sebagai string
  priceValue: number; // Nilai numerik untuk kalkulasi
  originalPrice?: string; // Backend mengirim sebagai string
  originalPriceValue?: number; // Nilai numerik untuk kalkulasi
  currency?: string;
  maxParticipants: number;
  minParticipants: number;
  difficultyLevel: PackageDifficultyLevel;
  category: string; // Backend menggunakan category, bukan packageType
  packageType?: PackageType; // Optional untuk backward compatibility
  status?: PackageStatus; // Optional karena backend mungkin tidak mengirim
  isFeatured: boolean;
  isActive: boolean;
  images: string[];
  imageUrl?: string; // Backend juga mengirim imageUrl
  itinerary?: PackageItinerary[]; // Optional karena backend tidak selalu mengirim
  includes: string[];
  excludes?: string[];
  requirements?: string[];
  contactInfo: ContactInfo;
  termsConditions: string;
  cancellationPolicy?: string;
  destinations: string[]; // Backend mengirim array string ID, bukan object
  destinationCount: number; // Backend mengirim count
  bookings: TourismPackageBooking[];
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  facilities?: string[];
  roomTypes?: Array<{
    type: string;
    price: number;
    capacity: number;
    amenities: string[];
  }>;
  checkInTime?: string;
  checkOutTime?: string;
  houseRules?: string[];
  nearbyAttractions?: string[];
  latitude?: string;
  longitude?: string;
  locationAddress?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateTourismPackageRequest {
  name: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  duration: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  maxParticipants: number;
  minParticipants: number;
  difficultyLevel: PackageDifficultyLevel;
  packageType: PackageType;
  isFeatured?: boolean;
  isActive?: boolean;
  images?: string[];
  itinerary?: PackageItinerary[];
  includes?: string[];
  excludes?: string[];
  requirements?: string[];
  contactInfo?: ContactInfo;
  termsConditions?: string;
  cancellationPolicy?: string;
  destinationIds?: string[];
  tags?: string[];
}

export interface UpdateTourismPackageRequest extends Partial<CreateTourismPackageRequest> {
  id: string;
  status?: PackageStatus;
}

export interface TourismPackageBooking {
  id: string;
  packageId: string;
  package: TourismPackage;
  userId: string;
  user: User;
  participantCount: number;
  totalPrice: number;
  bookingDate: string;
  travelDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  contactInfo: BookingContactInfo;
  createdAt: string;
  updatedAt: string;
}

export interface BookingContactInfo {
  name: string;
  email: string;
  phone: string;
  emergencyContact?: string;
}

export interface PackageItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals: string[];
}

export interface TourismPackageFilters {
  search?: string;
  status?: PackageStatus;
  packageType?: PackageType;
  difficultyLevel?: PackageDifficultyLevel;
  isFeatured?: boolean;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  destinationId?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface TourismPackageStats {
  totalPackages: number;
  activePackages: number;
  featuredPackages: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageRating: number;
}

// Enum types
export type PackageStatus = 'draft' | 'published' | 'archived' | 'suspended';
export type PackageType =
  | 'adventure'
  | 'cultural'
  | 'nature'
  | 'educational'
  | 'religious'
  | 'family'
  | 'romantic'
  | 'business';
export type PackageDifficultyLevel = 'easy' | 'moderate' | 'challenging' | 'expert';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'partial' | 'failed' | 'refunded';
