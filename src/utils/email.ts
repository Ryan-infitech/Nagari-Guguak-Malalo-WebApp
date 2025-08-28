/**
 * Email Utility Functions
 * Fungsi utility untuk validasi dan manipulasi email
 */

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") {
    return false;
  }

  // Check length
  if (email.length > 254) {
    return false;
  }

  // Check format
  if (!EMAIL_REGEX.test(email)) {
    return false;
  }

  // Check local part length (before @)
  const [localPart] = email.split("@");
  if (localPart.length > 64) {
    return false;
  }

  return true;
};

/**
 * Normalize email (lowercase and trim)
 */
export const normalizeEmail = (email: string): string => {
  if (!email || typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
};

/**
 * Extract domain from email
 */
export const getEmailDomain = (email: string): string => {
  if (!isValidEmail(email)) {
    return "";
  }

  const parts = email.split("@");
  return parts[1] || "";
};

/**
 * Extract local part from email
 */
export const getEmailLocalPart = (email: string): string => {
  if (!isValidEmail(email)) {
    return "";
  }

  const parts = email.split("@");
  return parts[0] || "";
};

/**
 * Mask email for privacy
 */
export const maskEmail = (email: string): string => {
  if (!isValidEmail(email)) {
    return email;
  }

  const [localPart, domain] = email.split("@");

  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedMiddle = "*".repeat(Math.max(1, localPart.length - 2));

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
};

/**
 * Check if email domain is from common providers
 */
export const isCommonEmailProvider = (email: string): boolean => {
  const commonProviders = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "yandex.com",
    "mail.com",
  ];

  const domain = getEmailDomain(email);
  return commonProviders.includes(domain.toLowerCase());
};

/**
 * Check if email domain is Indonesian
 */
export const isIndonesianEmailDomain = (email: string): boolean => {
  const indonesianDomains = [
    "gmail.com",
    "yahoo.co.id",
    "yahoo.com",
    "hotmail.co.id",
    "live.co.id",
    "telkom.net",
    "plasa.com",
    "centrin.net.id",
    "indosat.net.id",
    "cbn.net.id",
  ];

  const domain = getEmailDomain(email);
  return indonesianDomains.includes(domain.toLowerCase());
};

/**
 * Generate email suggestions for typos
 */
export const suggestEmailCorrections = (email: string): string[] => {
  const suggestions: string[] = [];

  if (!email.includes("@")) {
    return suggestions;
  }

  const [localPart, domain] = email.split("@");
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.co.id",
  ];

  // Common typos mapping
  const typoCorrections: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "hotmai.com": "hotmail.com",
    "hotmial.com": "hotmail.com",
    "outlok.com": "outlook.com",
    "outook.com": "outlook.com",
  };

  // Check for exact typo matches
  if (typoCorrections[domain.toLowerCase()]) {
    suggestions.push(`${localPart}@${typoCorrections[domain.toLowerCase()]}`);
  }

  // Check for similar domains
  commonDomains.forEach((commonDomain) => {
    if (
      domain.toLowerCase() !== commonDomain &&
      calculateStringSimilarity(domain.toLowerCase(), commonDomain) > 0.7
    ) {
      suggestions.push(`${localPart}@${commonDomain}`);
    }
  });

  return suggestions;
};

/**
 * Calculate string similarity (simple implementation)
 */
const calculateStringSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return 1.0;
  }

  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

/**
 * Calculate edit distance between two strings
 */
const getEditDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

/**
 * Validate email list (comma separated)
 */
export const validateEmailList = (
  emailList: string
): {
  valid: string[];
  invalid: string[];
} => {
  const emails = emailList.split(",").map((email) => email.trim());
  const valid: string[] = [];
  const invalid: string[] = [];

  emails.forEach((email) => {
    if (email && isValidEmail(email)) {
      valid.push(normalizeEmail(email));
    } else if (email) {
      invalid.push(email);
    }
  });

  return { valid, invalid };
};

/**
 * Generate email verification token
 */
export const generateEmailVerificationToken = (email: string): string => {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  const data = `${email}:${timestamp}:${randomString}`;

  // Simple base64 encoding
  return btoa(data);
};

/**
 * Verify email verification token
 */
export const verifyEmailVerificationToken = (
  token: string,
  email: string,
  maxAge: number = 24 * 60 * 60 * 1000 // 24 hours
): boolean => {
  try {
    const decoded = atob(token);
    const parts = decoded.split(":");

    if (parts.length !== 3) {
      return false;
    }

    const [tokenEmail, timestampStr] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check if email matches
    if (tokenEmail !== email) {
      return false;
    }

    // Check if token is not expired
    const now = Date.now();
    if (now - timestamp > maxAge) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Format email for display
 */
export const formatEmailForDisplay = (
  email: string,
  maxLength: number = 30
): string => {
  if (!email || email.length <= maxLength) {
    return email;
  }

  const [localPart, domain] = email.split("@");
  const availableLength = maxLength - domain.length - 4; // 4 for "@" and "..."

  if (availableLength <= 0) {
    return `...@${domain}`;
  }

  const truncatedLocal = localPart.substring(0, availableLength);
  return `${truncatedLocal}...@${domain}`;
};

/**
 * Extract emails from text
 */
export const extractEmailsFromText = (text: string): string[] => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const matches = text.match(emailRegex);

  if (!matches) {
    return [];
  }

  // Filter valid emails and remove duplicates
  const uniqueEmails = new Set<string>();
  matches.forEach((email) => {
    if (isValidEmail(email)) {
      uniqueEmails.add(normalizeEmail(email));
    }
  });

  return Array.from(uniqueEmails);
};

/**
 * Check if email is disposable/temporary
 */
export const isDisposableEmail = (email: string): boolean => {
  const disposableDomains = [
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "temp-mail.org",
    "throwaway.email",
    "yopmail.com",
    "tempmail.plus",
    "maildrop.cc",
    "mohmal.com",
    "sharklasers.com",
  ];

  const domain = getEmailDomain(email);
  return disposableDomains.includes(domain.toLowerCase());
};

/**
 * Generate email-safe filename
 */
export const generateEmailSafeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_|_$/g, "");
};

/**
 * Parse email header
 */
export const parseEmailHeader = (header: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const lines = header.split("\n");

  lines.forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim().toLowerCase();
      const value = line.substring(colonIndex + 1).trim();
      result[key] = value;
    }
  });

  return result;
};

/**
 * Validate email quota (for bulk operations)
 */
export const validateEmailQuota = (
  emailCount: number,
  maxPerHour: number = 100,
  maxPerDay: number = 1000
): {
  valid: boolean;
  message: string;
} => {
  if (emailCount > maxPerDay) {
    return {
      valid: false,
      message: `Maksimal ${maxPerDay} email per hari`,
    };
  }

  if (emailCount > maxPerHour) {
    return {
      valid: false,
      message: `Maksimal ${maxPerHour} email per jam`,
    };
  }

  return {
    valid: true,
    message: "Kuota email tersedia",
  };
};
