/**
 * String Utility Functions
 * Fungsi utility untuk manipulasi string
 */

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 */
export const titleCase = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Convert string to camelCase
 */
export const camelCase = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

/**
 * Convert string to PascalCase
 */
export const pascalCase = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

/**
 * Convert string to snake_case
 */
export const snakeCase = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
};

/**
 * Convert string to kebab-case
 */
export const kebabCase = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
};

/**
 * Truncate string with ellipsis
 */
export const truncate = (
  str: string,
  length: number,
  suffix: string = "..."
): string => {
  if (!str || typeof str !== "string") return "";
  if (str.length <= length) return str;

  return str.substring(0, length - suffix.length) + suffix;
};

/**
 * Truncate string by words
 */
export const truncateWords = (
  str: string,
  wordCount: number,
  suffix: string = "..."
): string => {
  if (!str || typeof str !== "string") return "";

  const words = str.split(" ");
  if (words.length <= wordCount) return str;

  return words.slice(0, wordCount).join(" ") + suffix;
};

/**
 * Remove extra whitespace and normalize spaces
 */
export const normalizeWhitespace = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/^\s+|\s+$/g, ""); // Trim start and end
};

/**
 * Remove all whitespace
 */
export const removeWhitespace = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\s/g, "");
};

/**
 * Reverse string
 */
export const reverse = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str.split("").reverse().join("");
};

/**
 * Check if string is palindrome
 */
export const isPalindrome = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;

  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === reverse(cleaned);
};

/**
 * Count words in string
 */
export const wordCount = (str: string): number => {
  if (!str || typeof str !== "string") return 0;

  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};

/**
 * Count characters (excluding spaces)
 */
export const characterCount = (
  str: string,
  includeSpaces: boolean = true
): number => {
  if (!str || typeof str !== "string") return 0;

  return includeSpaces ? str.length : str.replace(/\s/g, "").length;
};

/**
 * Extract initials from name
 */
export const getInitials = (str: string, maxLength: number = 2): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .split(" ")
    .filter((word) => word.length > 0)
    .slice(0, maxLength)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

/**
 * Generate random string
 */
export const randomString = (
  length: number,
  charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

/**
 * Generate random alphanumeric string
 */
export const randomAlphanumeric = (length: number): string => {
  return randomString(
    length,
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  );
};

/**
 * Generate random numeric string
 */
export const randomNumeric = (length: number): string => {
  return randomString(length, "0123456789");
};

/**
 * Check if string contains only numbers
 */
export const isNumeric = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;
  return /^\d+$/.test(str);
};

/**
 * Check if string contains only letters
 */
export const isAlpha = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;
  return /^[a-zA-Z]+$/.test(str);
};

/**
 * Check if string contains only letters and numbers
 */
export const isAlphanumeric = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;
  return /^[a-zA-Z0-9]+$/.test(str);
};

/**
 * Check if string is valid email format
 */
export const isEmail = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

/**
 * Check if string is valid URL
 */
export const isUrl = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;

  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string is valid Indonesian phone number
 */
export const isIndonesianPhone = (str: string): boolean => {
  if (!str || typeof str !== "string") return false;

  // Remove all non-numeric characters
  const cleaned = str.replace(/\D/g, "");

  // Check for Indonesian phone patterns
  const patterns = [
    /^628[1-9]\d{6,9}$/, // +62 8xxx format
    /^08[1-9]\d{6,9}$/, // 08xxx format
    /^8[1-9]\d{6,9}$/, // 8xxx format
  ];

  return patterns.some((pattern) => pattern.test(cleaned));
};

/**
 * Mask string (for sensitive data)
 */
export const mask = (
  str: string,
  visibleStart: number = 2,
  visibleEnd: number = 2,
  maskChar: string = "*"
): string => {
  if (!str || typeof str !== "string") return "";

  if (str.length <= visibleStart + visibleEnd) {
    return maskChar.repeat(str.length);
  }

  const start = str.substring(0, visibleStart);
  const end = str.substring(str.length - visibleEnd);
  const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);

  return start + masked + end;
};

/**
 * Escape HTML special characters
 */
export const escapeHtml = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return str.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
};

/**
 * Unescape HTML special characters
 */
export const unescapeHtml = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  const htmlUnescapes: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#x27;": "'",
    "&#x2F;": "/",
  };

  return str.replace(
    /&(amp|lt|gt|quot|#x27|#x2F);/g,
    (match) => htmlUnescapes[match]
  );
};

/**
 * Remove HTML tags from string
 */
export const stripHtml = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "");
};

/**
 * Clean and sanitize string
 */
export const sanitize = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  return str
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .replace(/\0/g, ""); // Remove null bytes
};

/**
 * Compare strings ignoring case and diacritics
 */
export const compareIgnoreCase = (str1: string, str2: string): boolean => {
  if (!str1 || !str2) return str1 === str2;

  return (
    str1
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") ===
    str2
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );
};

/**
 * Calculate Levenshtein distance between two strings
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
  if (!str1) return str2.length;
  if (!str2) return str1.length;

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
 * Calculate string similarity percentage
 */
export const similarity = (str1: string, str2: string): number => {
  if (!str1 && !str2) return 100;
  if (!str1 || !str2) return 0;

  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 100;

  const distance = levenshteinDistance(longer, shorter);
  return Math.round(((longer.length - distance) / longer.length) * 100);
};

/**
 * Split string into chunks of specified size
 */
export const chunk = (str: string, size: number): string[] => {
  if (!str || typeof str !== "string" || size <= 0) return [];

  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.substring(i, i + size));
  }
  return chunks;
};

/**
 * Repeat string n times
 */
export const repeat = (str: string, count: number): string => {
  if (!str || typeof str !== "string" || count <= 0) return "";
  return str.repeat(count);
};

/**
 * Pad string to specified length
 */
export const pad = (
  str: string,
  length: number,
  padChar: string = " ",
  direction: "left" | "right" | "both" = "right"
): string => {
  if (!str || typeof str !== "string") return "";
  if (str.length >= length) return str;

  const padLength = length - str.length;

  switch (direction) {
    case "left":
      return padChar.repeat(padLength) + str;
    case "right":
      return str + padChar.repeat(padLength);
    case "both":
      const leftPad = Math.floor(padLength / 2);
      const rightPad = padLength - leftPad;
      return padChar.repeat(leftPad) + str + padChar.repeat(rightPad);
    default:
      return str;
  }
};

/**
 * Convert string to Indonesian currency format
 */
export const toIndonesianCurrency = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  // Remove non-numeric characters
  const numeric = str.replace(/\D/g, "");
  if (!numeric) return "";

  // Add thousand separators
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Format Indonesian phone number
 */
export const formatIndonesianPhone = (str: string): string => {
  if (!str || typeof str !== "string") return "";

  // Remove all non-numeric characters
  const cleaned = str.replace(/\D/g, "");

  // Format based on length and pattern
  if (cleaned.startsWith("62")) {
    // +62 format
    const number = cleaned.substring(2);
    if (number.length >= 9) {
      return `+62 ${number.substring(0, 3)}-${number.substring(
        3,
        7
      )}-${number.substring(7)}`;
    }
  } else if (cleaned.startsWith("0")) {
    // 0xxx format
    if (cleaned.length >= 10) {
      return `${cleaned.substring(0, 4)}-${cleaned.substring(
        4,
        8
      )}-${cleaned.substring(8)}`;
    }
  }

  return str; // Return original if can't format
};
