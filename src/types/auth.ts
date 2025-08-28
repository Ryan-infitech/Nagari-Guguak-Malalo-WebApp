/**
 * Authentication Types
 * Types untuk autentikasi dan otorisasi
 */

import { BaseEntity, WithTimestamps, Address, ContactInfo } from "./common";

// =============================================================================
// USER ROLES & PERMISSIONS
// =============================================================================

/**
 * User roles dalam sistem
 */
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MODERATOR"
  | "STAFF"
  | "RESIDENT"
  | "BUSINESS_OWNER"
  | "VISITOR";

/**
 * Permission types
 */
export type PermissionType =
  | "CREATE"
  | "READ"
  | "UPDATE"
  | "DELETE"
  | "PUBLISH"
  | "APPROVE"
  | "MANAGE"
  | "ADMIN";

/**
 * Resource types
 */
export type ResourceType =
  | "USER"
  | "ARTICLE"
  | "ANNOUNCEMENT"
  | "EVENT"
  | "SERVICE"
  | "SERVICE_REQUEST"
  | "DOCUMENT"
  | "TOURISM"
  | "UMKM"
  | "NOTIFICATION"
  | "FEEDBACK"
  | "ANALYTICS"
  | "SYSTEM";

/**
 * Permission definition
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: ResourceType;
  action: PermissionType;
  conditions?: Record<string, any>;
}

/**
 * Role definition
 */
export interface Role {
  id: string;
  name: UserRole;
  displayName: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
  level: number; // Hierarchy level
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// USER TYPES
// =============================================================================

/**
 * User account status
 */
export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "PENDING_VERIFICATION"
  | "BANNED";

/**
 * User verification status
 */
export interface UserVerification {
  email: boolean;
  phone: boolean;
  identity: boolean;
  ktp: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

/**
 * User profile
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";

  // Contact information
  email: string;
  phone?: string;
  whatsapp?: string;

  // Address
  address?: Address;

  // Identity
  nik?: string; // Nomor Induk Kependudukan
  ktp?: string; // KTP photo URL
  occupation?: string;
  organization?: string;

  // Preferences
  language: "id" | "en" | "min";
  timezone: string;
  newsletter: boolean;
  notifications: boolean;
}

/**
 * Resident profile (specific for residents)
 */
export interface ResidentProfile extends UserProfile {
  // Required for residents
  nik: string;
  ktp: string;

  // Resident-specific data
  familyCardNumber?: string; // Nomor Kartu Keluarga
  marriageStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  religion:
    | "ISLAM"
    | "KRISTEN"
    | "KATOLIK"
    | "HINDU"
    | "BUDDHA"
    | "KONGHUCU"
    | "OTHER";
  education: "SD" | "SMP" | "SMA" | "D3" | "S1" | "S2" | "S3" | "OTHER";
  bloodType?: "A" | "B" | "AB" | "O";

  // Family information
  fatherName?: string;
  motherName?: string;
  spouseName?: string;

  // Economic data
  monthlyIncome?: number;
  profession?: string;
  workplace?: string;

  // Social assistance
  socialAssistance?: {
    pkh: boolean; // Program Keluarga Harapan
    blt: boolean; // Bantuan Langsung Tunai
    other?: string[];
  };

  // Emergency contact
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

/**
 * User entity
 */
export interface User extends BaseEntity {
  // Basic info
  username: string;
  email: string;
  phone?: string;

  // Profile
  profile: UserProfile | ResidentProfile;

  // Authentication
  role: UserRole;
  status: UserStatus;
  verification: UserVerification;

  // Security
  lastLoginAt?: string;
  lastActiveAt?: string;
  loginAttempts: number;
  lockedUntil?: string;
  passwordChangedAt?: string;

  // Settings
  preferences: UserPreferences;
  permissions?: string[]; // Cached permissions

  // Metadata
  loginCount: number;
  registrationSource: string;
  referredBy?: string;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: "id" | "en" | "min";
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";

  // Notifications
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    browser: boolean;

    // Notification types
    systemUpdates: boolean;
    serviceUpdates: boolean;
    newsUpdates: boolean;
    eventReminders: boolean;
    documentStatus: boolean;
    announcements: boolean;
    marketing: boolean;
  };

  // Privacy
  privacy: {
    profileVisibility: "PUBLIC" | "RESIDENTS_ONLY" | "PRIVATE";
    showEmail: boolean;
    showPhone: boolean;
    allowAnalytics: boolean;
    allowMarketing: boolean;
  };

  // Accessibility
  accessibility: {
    highContrast: boolean;
    fontSize: "small" | "medium" | "large";
    reducedMotion: boolean;
    screenReader: boolean;
  };
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

/**
 * Login credentials
 */
export interface LoginCredentials {
  identifier: string; // email, phone, or username
  password: string;
  remember?: boolean;
  captcha?: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  // Basic info
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;

  // Optional profile data
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  nik?: string;

  // Address
  address?: Partial<Address>;

  // Agreement
  termsAccepted: boolean;
  privacyAccepted: boolean;
  newsletterOptIn?: boolean;

  // Registration source
  source?: string;
  referralCode?: string;

  // Verification
  captcha?: string;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
  captcha?: string;
}

/**
 * Password reset data
 */
export interface PasswordResetData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Change password data
 */
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Email verification request
 */
export interface EmailVerificationRequest {
  email: string;
}

/**
 * Phone verification request
 */
export interface PhoneVerificationRequest {
  phone: string;
  via: "sms" | "call" | "whatsapp";
}

/**
 * Verification code data
 */
export interface VerificationCodeData {
  code: string;
  token?: string;
}

// =============================================================================
// TOKEN TYPES
// =============================================================================

/**
 * JWT payload
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
  permissions: string[];
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  jti?: string; // JWT ID
  sessionId?: string;
}

/**
 * Token pair
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

/**
 * Token validation result
 */
export interface TokenValidationResult {
  isValid: boolean;
  payload?: JwtPayload;
  error?: string;
  isExpired?: boolean;
  expiresAt?: string;
}

/**
 * Refresh token data
 */
export interface RefreshTokenData {
  refreshToken: string;
}

// =============================================================================
// SESSION TYPES
// =============================================================================

/**
 * User session
 */
export interface UserSession {
  id: string;
  userId: string;
  deviceId?: string;
  deviceInfo?: DeviceInfo;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
    region: string;
  };
  isActive: boolean;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string;
}

/**
 * Device information
 */
export interface DeviceInfo {
  type: "desktop" | "mobile" | "tablet";
  os: string;
  browser: string;
  version: string;
  isTrusted: boolean;
}

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  permissions: string[];
  session: UserSession | null;
  isLoading: boolean;
  error: string | null;
  lastActivity: string | null;
}

// =============================================================================
// TWO-FACTOR AUTHENTICATION
// =============================================================================

/**
 * 2FA method types
 */
export type TwoFactorMethod = "SMS" | "EMAIL" | "TOTP" | "BACKUP_CODES";

/**
 * 2FA setup data
 */
export interface TwoFactorSetup {
  method: TwoFactorMethod;
  secret?: string; // For TOTP
  qrCode?: string; // For TOTP
  backupCodes?: string[]; // Backup codes
}

/**
 * 2FA verification data
 */
export interface TwoFactorVerification {
  method: TwoFactorMethod;
  code: string;
  token?: string;
  trustDevice?: boolean;
}

/**
 * 2FA status
 */
export interface TwoFactorStatus {
  isEnabled: boolean;
  methods: TwoFactorMethod[];
  backupCodesRemaining?: number;
  lastUsed?: string;
}

// =============================================================================
// OAUTH & SSO
// =============================================================================

/**
 * OAuth providers
 */
export type OAuthProvider = "GOOGLE" | "FACEBOOK" | "APPLE" | "MICROSOFT";

/**
 * OAuth account
 */
export interface OAuthAccount {
  id: string;
  provider: OAuthProvider;
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
  connectedAt: string;
}

/**
 * OAuth login data
 */
export interface OAuthLoginData {
  provider: OAuthProvider;
  code: string;
  state?: string;
  redirectUri: string;
}

// =============================================================================
// SECURITY TYPES
// =============================================================================

/**
 * Security log entry
 */
export interface SecurityLog {
  id: string;
  userId: string;
  event: SecurityEvent;
  description: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Security events
 */
export type SecurityEvent =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "PASSWORD_CHANGED"
  | "EMAIL_CHANGED"
  | "PROFILE_UPDATED"
  | "PERMISSION_GRANTED"
  | "PERMISSION_REVOKED"
  | "ACCOUNT_LOCKED"
  | "ACCOUNT_UNLOCKED"
  | "SUSPICIOUS_ACTIVITY"
  | "DATA_ACCESS"
  | "DATA_EXPORT";

/**
 * Account lockout policy
 */
export interface LockoutPolicy {
  maxAttempts: number;
  lockoutDuration: number; // minutes
  windowDuration: number; // minutes
  progressiveDelay: boolean;
}

/**
 * Password policy
 */
export interface PasswordPolicy {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventCommonPasswords: boolean;
  preventUserInfoInPassword: boolean;
  passwordHistory: number; // How many previous passwords to remember
  maxAge: number; // Days before password expires
}

// =============================================================================
// REQUEST/RESPONSE TYPES
// =============================================================================

/**
 * Login response
 */
export interface LoginResponse {
  user: User;
  tokens: TokenPair;
  session: UserSession;
  requiresTwoFactor?: boolean;
  twoFactorToken?: string;
  firstLogin?: boolean;
}

/**
 * Register response
 */
export interface RegisterResponse {
  user: User;
  tokens?: TokenPair; // Optional if email verification required
  session?: UserSession;
  requiresVerification?: boolean;
  verificationToken?: string;
}

/**
 * Profile update request
 */
export interface ProfileUpdateRequest {
  profile: Partial<UserProfile>;
  preferences?: Partial<UserPreferences>;
}

/**
 * User list query
 */
export interface UserListQuery {
  search?: string;
  role?: UserRole | UserRole[];
  status?: UserStatus | UserStatus[];
  verified?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  lastActiveAfter?: string;
  lastActiveBefore?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "lastActiveAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

/**
 * Auth context value
 */
export interface AuthContextValue {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateProfile: (data: ProfileUpdateRequest) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;

  // Permissions
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;

  // 2FA
  setupTwoFactor: (method: TwoFactorMethod) => Promise<TwoFactorSetup>;
  verifyTwoFactor: (data: TwoFactorVerification) => Promise<void>;
  disableTwoFactor: () => Promise<void>;

  // OAuth
  connectOAuth: (data: OAuthLoginData) => Promise<void>;
  disconnectOAuth: (provider: OAuthProvider) => Promise<void>;

  // Session management
  getSessions: () => Promise<UserSession[]>;
  revokeSession: (sessionId: string) => Promise<void>;
  revokeAllSessions: () => Promise<void>;
}
