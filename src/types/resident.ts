/**
 * Resident Types
 * Types untuk data warga/penduduk
 */

import { BaseEntity, Address, ContactInfo } from "./common";
import { User } from "./auth";

// =============================================================================
// RESIDENT CORE TYPES
// =============================================================================

export type ResidentStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "MOVED"
  | "DECEASED"
  | "PENDING_VERIFICATION";

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";

export type Religion =
  | "ISLAM"
  | "KRISTEN"
  | "KATOLIK"
  | "HINDU"
  | "BUDDHA"
  | "KONGHUCU"
  | "OTHER";

export type Education =
  | "NO_EDUCATION"
  | "ELEMENTARY"
  | "JUNIOR_HIGH"
  | "SENIOR_HIGH"
  | "DIPLOMA"
  | "BACHELOR"
  | "MASTER"
  | "DOCTORATE"
  | "OTHER";

export type Occupation =
  | "STUDENT"
  | "CIVIL_SERVANT"
  | "PRIVATE_EMPLOYEE"
  | "ENTREPRENEUR"
  | "FARMER"
  | "TRADER"
  | "TEACHER"
  | "HEALTHCARE"
  | "RETIRED"
  | "UNEMPLOYED"
  | "OTHER";

export type BloodType = "A" | "B" | "AB" | "O" | "UNKNOWN";

export type IdentityType = "KTP" | "SIM" | "PASSPORT" | "KITAS" | "OTHER";

export interface ResidentProfile extends BaseEntity {
  // Basic personal information
  fullName: string;
  nickname?: string;
  gender: "MALE" | "FEMALE";
  placeOfBirth: string;
  dateOfBirth: string;
  age: number; // Calculated field

  // Identity documents
  identityNumber: string; // NIK
  identityType: IdentityType;
  identityIssuedDate?: string;
  identityExpiryDate?: string;
  familyCardNumber?: string; // No KK

  // Personal details
  religion: Religion;
  maritalStatus: MaritalStatus;
  bloodType?: BloodType;
  nationality: string;

  // Contact and address
  address: Address;
  contactInfo: ContactInfo;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    address?: string;
  };

  // Family information
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  children?: FamilyMember[];

  // Education and occupation
  education: Education;
  occupation: Occupation;
  workplace?: string;
  monthlyIncome?: number;

  // Residence information
  residenceStatus: "OWNER" | "RENT" | "FAMILY" | "OTHER";
  residenceSince: string;
  previousAddress?: Address;

  // Status and verification
  status: ResidentStatus;
  verifiedAt?: string;
  verifiedBy?: string;
  verificationDocuments?: string[]; // File IDs

  // User account linkage
  userId?: string;
  user?: User;

  // Additional information
  disabilities?: string[];
  chronicDiseases?: string[];
  specialNeeds?: string;
  notes?: string;

  // Social programs
  socialPrograms?: SocialProgram[];
  benefits?: ResidentBenefit[];

  // Profile photo
  photoUrl?: string;

  // Data collection
  dataSource: "SELF_REGISTRATION" | "ADMIN_INPUT" | "MIGRATION" | "SURVEY";
  lastUpdated: string;
  updatedBy?: string;

  // Privacy settings
  isDataPublic: boolean;
  consentGiven: boolean;
  consentDate?: string;
}

export interface FamilyMember {
  name: string;
  relationship:
    | "CHILD"
    | "PARENT"
    | "SIBLING"
    | "GRANDPARENT"
    | "GRANDCHILD"
    | "OTHER";
  dateOfBirth: string;
  gender: "MALE" | "FEMALE";
  education?: Education;
  occupation?: Occupation;
  residentId?: string; // If they're also registered residents
}

export interface SocialProgram {
  id: string;
  name: string;
  type:
    | "HEALTHCARE"
    | "EDUCATION"
    | "FOOD_AID"
    | "HOUSING"
    | "CASH_TRANSFER"
    | "OTHER";
  enrolledDate: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "GRADUATED";
  benefits?: string[];
  requirements?: string[];
  expiryDate?: string;
}

export interface ResidentBenefit {
  id: string;
  type: "SUBSIDY" | "ASSISTANCE" | "PROGRAM" | "SERVICE";
  name: string;
  description?: string;
  amount?: number;
  frequency?: "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "ONE_TIME";
  startDate: string;
  endDate?: string;
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED";
}

// =============================================================================
// RESIDENT OPERATIONS
// =============================================================================

export interface CreateResidentRequest {
  fullName: string;
  nickname?: string;
  gender: "MALE" | "FEMALE";
  placeOfBirth: string;
  dateOfBirth: string;

  identityNumber: string;
  identityType?: IdentityType;
  familyCardNumber?: string;

  religion: Religion;
  maritalStatus: MaritalStatus;
  bloodType?: BloodType;
  nationality?: string;

  address: Address;
  contactInfo: ContactInfo;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    address?: string;
  };

  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  children?: Omit<FamilyMember, "residentId">[];

  education: Education;
  occupation: Occupation;
  workplace?: string;
  monthlyIncome?: number;

  residenceStatus: "OWNER" | "RENT" | "FAMILY" | "OTHER";
  residenceSince: string;
  previousAddress?: Address;

  disabilities?: string[];
  chronicDiseases?: string[];
  specialNeeds?: string;
  notes?: string;

  photoFileId?: string;
  verificationDocumentIds?: string[];

  isDataPublic?: boolean;
  consentGiven: boolean;
}

export interface UpdateResidentRequest extends Partial<CreateResidentRequest> {
  id: string;
  reason?: string;
}

export interface ResidentQuery {
  search?: string;
  identityNumber?: string;
  familyCardNumber?: string;

  gender?: "MALE" | "FEMALE";
  religion?: Religion | Religion[];
  maritalStatus?: MaritalStatus | MaritalStatus[];
  education?: Education | Education[];
  occupation?: Occupation | Occupation[];
  status?: ResidentStatus | ResidentStatus[];

  ageMin?: number;
  ageMax?: number;
  birthDateAfter?: string;
  birthDateBefore?: string;

  address?: string;
  village?: string;
  district?: string;
  city?: string;
  province?: string;
  postalCode?: string;

  residenceStatus?: string;
  residenceSinceAfter?: string;
  residenceSinceBefore?: string;

  monthlyIncomeMin?: number;
  monthlyIncomeMax?: number;

  hasDisabilities?: boolean;
  hasChronicDiseases?: boolean;
  hasUser?: boolean;
  verified?: boolean;

  inSocialProgram?: string;
  hasBenefits?: boolean;

  sortBy?: "fullName" | "dateOfBirth" | "createdAt" | "lastUpdated";
  sortOrder?: "asc" | "desc";

  page?: number;
  limit?: number;

  includeUser?: boolean;
  includeFamily?: boolean;
  includePrograms?: boolean;
}

// =============================================================================
// RESIDENT ANALYTICS
// =============================================================================

export interface ResidentAnalytics {
  overview: {
    totalResidents: number;
    verifiedResidents: number;
    activeResidents: number;
    newResidentsThisMonth: number;
    averageAge: number;
  };

  demographics: {
    byGender: Array<{ gender: string; count: number; percentage: number }>;
    byAge: Array<{ ageGroup: string; count: number; percentage: number }>;
    byReligion: Array<{
      religion: Religion;
      count: number;
      percentage: number;
    }>;
    byMaritalStatus: Array<{
      status: MaritalStatus;
      count: number;
      percentage: number;
    }>;
    byEducation: Array<{
      education: Education;
      count: number;
      percentage: number;
    }>;
    byOccupation: Array<{
      occupation: Occupation;
      count: number;
      percentage: number;
    }>;
  };

  geographic: {
    byVillage: Array<{ village: string; count: number; density: number }>;
    byDistrict: Array<{ district: string; count: number }>;
    populationDensity: number; // per km²
    migrationTrends: Array<{
      month: string;
      inbound: number;
      outbound: number;
    }>;
  };

  socioeconomic: {
    incomeDistribution: Array<{
      incomeRange: string;
      count: number;
      percentage: number;
    }>;
    employmentRate: number;
    educationLevel: number; // average education score
    socialProgramParticipation: number;
    povertyRate: number;
  };

  trends: Array<{
    month: string;
    newRegistrations: number;
    births: number;
    deaths: number;
    migrations: number;
  }>;

  insights: {
    growthRate: number; // annual percentage
    dependencyRatio: number;
    literacyRate: number;
    healthcoverage: number;
    digitalAdoption: number; // percentage with user accounts
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const RESIDENT_CONSTANTS = {
  MIN_AGE: 0,
  MAX_AGE: 150,
  IDENTITY_NUMBER_LENGTH: 16, // NIK length
  FAMILY_CARD_NUMBER_LENGTH: 16,
  RETIREMENT_AGE: 65,
  WORKING_AGE_MIN: 15,
  WORKING_AGE_MAX: 64,
  ELDERLY_AGE: 60,
  CHILD_AGE: 17,
  MAX_CHILDREN: 20,
  MAX_DISABILITIES: 10,
  MAX_CHRONIC_DISEASES: 10,
} as const;

export const RELIGION_LABELS: Record<Religion, string> = {
  ISLAM: "Islam",
  KRISTEN: "Kristen Protestan",
  KATOLIK: "Kristen Katolik",
  HINDU: "Hindu",
  BUDDHA: "Buddha",
  KONGHUCU: "Konghucu",
  OTHER: "Lainnya",
} as const;

export const EDUCATION_LABELS: Record<Education, string> = {
  NO_EDUCATION: "Tidak Sekolah",
  ELEMENTARY: "SD/Sederajat",
  JUNIOR_HIGH: "SMP/Sederajat",
  SENIOR_HIGH: "SMA/Sederajat",
  DIPLOMA: "Diploma",
  BACHELOR: "Sarjana (S1)",
  MASTER: "Magister (S2)",
  DOCTORATE: "Doktor (S3)",
  OTHER: "Lainnya",
} as const;

export const OCCUPATION_LABELS: Record<Occupation, string> = {
  STUDENT: "Pelajar/Mahasiswa",
  CIVIL_SERVANT: "PNS",
  PRIVATE_EMPLOYEE: "Karyawan Swasta",
  ENTREPRENEUR: "Wiraswasta",
  FARMER: "Petani",
  TRADER: "Pedagang",
  TEACHER: "Guru/Dosen",
  HEALTHCARE: "Tenaga Kesehatan",
  RETIRED: "Pensiunan",
  UNEMPLOYED: "Tidak Bekerja",
  OTHER: "Lainnya",
} as const;

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  SINGLE: "Belum Menikah",
  MARRIED: "Menikah",
  DIVORCED: "Cerai",
  WIDOWED: "Janda/Duda",
} as const;
