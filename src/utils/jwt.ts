/**
 * JWT Utility Functions
 * Fungsi utility untuk JWT token handling
 */

/**
 * JWT Token structure interface
 */
interface JWTPayload {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp?: number; // Expiration time
  nbf?: number; // Not before
  iat?: number; // Issued at
  jti?: string; // JWT ID
  [key: string]: any; // Custom claims
}

/**
 * JWT Header structure interface
 */
interface JWTHeader {
  alg: string; // Algorithm
  typ: string; // Type
  kid?: string; // Key ID
}

/**
 * Decode JWT token (client-side only, no verification)
 */
export const decodeJWT = (
  token: string
): {
  header: JWTHeader | null;
  payload: JWTPayload | null;
  signature: string | null;
} => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return { header: null, payload: null, signature: null };
    }

    const [headerPart, payloadPart, signaturePart] = parts;

    // Decode header
    const header = JSON.parse(
      atob(headerPart.replace(/-/g, "+").replace(/_/g, "/"))
    );

    // Decode payload
    const payload = JSON.parse(
      atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return {
      header,
      payload,
      signature: signaturePart,
    };
  } catch (error) {
    return { header: null, payload: null, signature: null };
  }
};

/**
 * Get JWT payload without verification
 */
export const getJWTPayload = (token: string): JWTPayload | null => {
  const decoded = decodeJWT(token);
  return decoded.payload;
};

/**
 * Get JWT header
 */
export const getJWTHeader = (token: string): JWTHeader | null => {
  const decoded = decodeJWT(token);
  return decoded.header;
};

/**
 * Check if JWT token is expired
 */
export const isJWTExpired = (token: string): boolean => {
  const payload = getJWTPayload(token);

  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Check if JWT token is valid (not expired and not before time)
 */
export const isJWTValid = (token: string): boolean => {
  const payload = getJWTPayload(token);

  if (!payload) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  // Check expiration
  if (payload.exp && payload.exp < currentTime) {
    return false;
  }

  // Check not before
  if (payload.nbf && payload.nbf > currentTime) {
    return false;
  }

  return true;
};

/**
 * Get JWT expiration time as Date
 */
export const getJWTExpirationDate = (token: string): Date | null => {
  const payload = getJWTPayload(token);

  if (!payload || !payload.exp) {
    return null;
  }

  return new Date(payload.exp * 1000);
};

/**
 * Get JWT issued at time as Date
 */
export const getJWTIssuedDate = (token: string): Date | null => {
  const payload = getJWTPayload(token);

  if (!payload || !payload.iat) {
    return null;
  }

  return new Date(payload.iat * 1000);
};

/**
 * Get time until JWT expires (in seconds)
 */
export const getJWTTimeToExpiry = (token: string): number => {
  const payload = getJWTPayload(token);

  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return Math.max(0, payload.exp - currentTime);
};

/**
 * Get JWT remaining time in human readable format
 */
export const getJWTRemainingTime = (token: string): string => {
  const seconds = getJWTTimeToExpiry(token);

  if (seconds <= 0) {
    return "Token berakhir";
  }

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} hari`;
  } else if (hours > 0) {
    return `${hours} jam`;
  } else if (minutes > 0) {
    return `${minutes} menit`;
  } else {
    return `${seconds} detik`;
  }
};

/**
 * Extract user ID from JWT token
 */
export const getUserIdFromJWT = (token: string): string | null => {
  const payload = getJWTPayload(token);

  if (!payload) {
    return null;
  }

  // Try different common field names for user ID
  return payload.sub || payload.userId || payload.user_id || payload.id || null;
};

/**
 * Extract user role from JWT token
 */
export const getUserRoleFromJWT = (token: string): string | null => {
  const payload = getJWTPayload(token);

  if (!payload) {
    return null;
  }

  // Try different common field names for user role
  return (
    payload.role ||
    payload.userRole ||
    payload.user_role ||
    payload.roles?.[0] ||
    null
  );
};

/**
 * Extract user permissions from JWT token
 */
export const getUserPermissionsFromJWT = (token: string): string[] => {
  const payload = getJWTPayload(token);

  if (!payload) {
    return [];
  }

  // Try different common field names for permissions
  const permissions =
    payload.permissions || payload.perms || payload.scopes || [];

  return Array.isArray(permissions) ? permissions : [];
};

/**
 * Check if JWT token has specific claim
 */
export const hasJWTClaim = (token: string, claimName: string): boolean => {
  const payload = getJWTPayload(token);

  if (!payload) {
    return false;
  }

  return claimName in payload;
};

/**
 * Get specific claim from JWT token
 */
export const getJWTClaim = (token: string, claimName: string): any => {
  const payload = getJWTPayload(token);

  if (!payload) {
    return null;
  }

  return payload[claimName] || null;
};

/**
 * Check if JWT token has specific permission
 */
export const hasJWTPermission = (
  token: string,
  permission: string
): boolean => {
  const permissions = getUserPermissionsFromJWT(token);
  return permissions.includes(permission);
};

/**
 * Check if JWT token has any of the specified permissions
 */
export const hasAnyJWTPermission = (
  token: string,
  permissions: string[]
): boolean => {
  const userPermissions = getUserPermissionsFromJWT(token);
  return permissions.some((permission) => userPermissions.includes(permission));
};

/**
 * Check if JWT token has all specified permissions
 */
export const hasAllJWTPermissions = (
  token: string,
  permissions: string[]
): boolean => {
  const userPermissions = getUserPermissionsFromJWT(token);
  return permissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

/**
 * Validate JWT token format
 */
export const isValidJWTFormat = (token: string): boolean => {
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  return parts.length === 3;
};

/**
 * Extract JWT token from Authorization header
 */
export const extractJWTFromAuthHeader = (authHeader: string): string | null => {
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }

  const bearerPrefix = "Bearer ";

  if (!authHeader.startsWith(bearerPrefix)) {
    return null;
  }

  const token = authHeader.substring(bearerPrefix.length);

  return isValidJWTFormat(token) ? token : null;
};

/**
 * Create Authorization header with JWT token
 */
export const createJWTAuthHeader = (token: string): string => {
  return `Bearer ${token}`;
};

/**
 * Check if JWT token should be refreshed soon
 */
export const shouldRefreshJWT = (
  token: string,
  refreshThresholdMinutes: number = 15
): boolean => {
  const timeToExpiry = getJWTTimeToExpiry(token);
  const thresholdSeconds = refreshThresholdMinutes * 60;

  return timeToExpiry > 0 && timeToExpiry <= thresholdSeconds;
};

/**
 * Get JWT token information summary
 */
export const getJWTInfo = (
  token: string
): {
  valid: boolean;
  expired: boolean;
  expiresAt: Date | null;
  issuedAt: Date | null;
  timeToExpiry: number;
  userId: string | null;
  role: string | null;
  permissions: string[];
} => {
  const valid = isJWTValid(token);
  const expired = isJWTExpired(token);
  const expiresAt = getJWTExpirationDate(token);
  const issuedAt = getJWTIssuedDate(token);
  const timeToExpiry = getJWTTimeToExpiry(token);
  const userId = getUserIdFromJWT(token);
  const role = getUserRoleFromJWT(token);
  const permissions = getUserPermissionsFromJWT(token);

  return {
    valid,
    expired,
    expiresAt,
    issuedAt,
    timeToExpiry,
    userId,
    role,
    permissions,
  };
};

/**
 * Sanitize JWT payload for logging (remove sensitive data)
 */
export const sanitizeJWTPayload = (
  payload: JWTPayload
): Partial<JWTPayload> => {
  const sensitiveFields = ["password", "secret", "key", "token"];
  const sanitized = { ...payload };

  // Remove sensitive fields
  Object.keys(sanitized).forEach((key) => {
    if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
      delete sanitized[key];
    }
  });

  return sanitized;
};

/**
 * Compare two JWT tokens for equality
 */
export const areJWTsEqual = (token1: string, token2: string): boolean => {
  if (!token1 || !token2) {
    return false;
  }

  return token1 === token2;
};

/**
 * Get JWT algorithm from header
 */
export const getJWTAlgorithm = (token: string): string | null => {
  const header = getJWTHeader(token);
  return header?.alg || null;
};
