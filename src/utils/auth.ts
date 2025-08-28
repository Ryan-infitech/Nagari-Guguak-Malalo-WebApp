/**
 * Authentication Utility Functions
 * Fungsi utility untuk authentication dan authorization
 */

import { UserRole } from "@/types/auth";

/**
 * Role hierarchy untuk permission checking
 */
const ROLE_HIERARCHY: Record<UserRole, number> = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  MODERATOR: 3,
  STAFF: 4,
  RESIDENT: 5,
  BUSINESS_OWNER: 6,
  VISITOR: 7,
};

/**
 * Check if user has required role or higher
 */
export const hasRoleOrHigher = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  return ROLE_HIERARCHY[userRole] <= ROLE_HIERARCHY[requiredRole];
};

/**
 * Check if user has specific role
 */
export const hasRole = (userRole: UserRole, targetRole: UserRole): boolean => {
  return userRole === targetRole;
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (
  userRole: UserRole,
  targetRoles: UserRole[]
): boolean => {
  return targetRoles.includes(userRole);
};

/**
 * Check if user is admin (SUPER_ADMIN or ADMIN)
 */
export const isAdmin = (userRole: UserRole): boolean => {
  return hasAnyRole(userRole, ["SUPER_ADMIN", "ADMIN"]);
};

/**
 * Check if user is moderator or higher
 */
export const isModerator = (userRole: UserRole): boolean => {
  return hasRoleOrHigher(userRole, "MODERATOR");
};

/**
 * Check if user is staff or higher
 */
export const isStaff = (userRole: UserRole): boolean => {
  return hasRoleOrHigher(userRole, "STAFF");
};

/**
 * Check if user is resident
 */
export const isResident = (userRole: UserRole): boolean => {
  return hasRole(userRole, "RESIDENT");
};

/**
 * Check if user is business owner
 */
export const isBusinessOwner = (userRole: UserRole): boolean => {
  return hasRole(userRole, "BUSINESS_OWNER");
};

/**
 * Get role display name in Indonesian
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    SUPER_ADMIN: "Super Administrator",
    ADMIN: "Administrator",
    MODERATOR: "Moderator",
    STAFF: "Staff",
    RESIDENT: "Warga",
    BUSINESS_OWNER: "Pemilik Usaha",
    VISITOR: "Pengunjung",
  };

  return roleNames[role] || role;
};

/**
 * Get role color for UI display
 */
export const getRoleColor = (role: UserRole): string => {
  const roleColors: Record<UserRole, string> = {
    SUPER_ADMIN: "red",
    ADMIN: "orange",
    MODERATOR: "blue",
    STAFF: "green",
    RESIDENT: "purple",
    BUSINESS_OWNER: "yellow",
    VISITOR: "gray",
  };

  return roleColors[role] || "gray";
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (
  password: string
): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Password minimal 8 karakter");
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Harus mengandung huruf besar");
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Harus mengandung huruf kecil");
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Harus mengandung angka");
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Harus mengandung karakter khusus");
  }

  // Length bonus
  if (password.length >= 12) {
    score += 1;
  }

  return {
    isValid: score >= 4,
    score: Math.min(score, 5),
    feedback,
  };
};

/**
 * Generate random password
 */
export const generateRandomPassword = (length: number = 12): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const allChars = uppercase + lowercase + numbers + symbols;

  let password = "";

  // Ensure at least one character from each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

/**
 * Mask email for security display
 */
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");

  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }

  const maskedLocal =
    localPart[0] +
    "*".repeat(localPart.length - 2) +
    localPart[localPart.length - 1];
  return `${maskedLocal}@${domain}`;
};

/**
 * Generate secure session ID
 */
export const generateSessionId = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let sessionId = "";

  for (let i = 0; i < 32; i++) {
    sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return sessionId;
};

/**
 * Check if session is expired
 */
export const isSessionExpired = (expiryTime: string | Date): boolean => {
  const expiry = new Date(expiryTime);
  const now = new Date();

  return now > expiry;
};

/**
 * Calculate session remaining time in minutes
 */
export const getSessionRemainingTime = (expiryTime: string | Date): number => {
  const expiry = new Date(expiryTime);
  const now = new Date();

  const diffMs = expiry.getTime() - now.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60)));
};

/**
 * Format session remaining time
 */
export const formatSessionRemainingTime = (
  expiryTime: string | Date
): string => {
  const minutes = getSessionRemainingTime(expiryTime);

  if (minutes <= 0) return "Sesi berakhir";
  if (minutes < 60) return `${minutes} menit`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) return `${hours} jam`;
  return `${hours} jam ${remainingMinutes} menit`;
};

/**
 * Check if user can access admin routes
 */
export const canAccessAdmin = (userRole: UserRole): boolean => {
  return hasRoleOrHigher(userRole, "STAFF");
};

/**
 * Check if user can access portal routes
 */
export const canAccessPortal = (userRole: UserRole): boolean => {
  return hasRoleOrHigher(userRole, "RESIDENT");
};

/**
 * Get allowed routes for user role
 */
export const getAllowedRoutes = (userRole: UserRole): string[] => {
  const baseRoutes = ["/"];

  if (canAccessPortal(userRole)) {
    baseRoutes.push("/portal-warga");
  }

  if (canAccessAdmin(userRole)) {
    baseRoutes.push("/admin");
  }

  return baseRoutes;
};

/**
 * Sanitize user data for client storage
 */
export const sanitizeUserData = (user: any): any => {
  const { password, refreshToken, ...sanitized } = user;
  return sanitized;
};

/**
 * Create auth headers for API requests
 */
export const createAuthHeaders = (token: string): Record<string, string> => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader: string): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7);
};
