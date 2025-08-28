/**
 * Cryptography Utility Functions
 * Fungsi utility untuk enkripsi, dekripsi, dan keamanan data
 */

/**
 * Generate random string with specified length
 */
export const generateRandomString = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

/**
 * Generate cryptographically secure random string
 */
export const generateSecureRandomString = (length: number): string => {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }

    return result;
  }

  // Fallback for server-side or unsupported browsers
  return generateRandomString(length);
};

/**
 * Generate UUID v4
 */
export const generateUUID = (): string => {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.randomUUID
  ) {
    return window.crypto.randomUUID();
  }

  // Fallback implementation
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Simple hash function (not cryptographically secure)
 */
export const simpleHash = (str: string): string => {
  let hash = 0;

  if (str.length === 0) return hash.toString();

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
};

/**
 * Base64 encode
 */
export const base64Encode = (str: string): string => {
  if (typeof window !== "undefined") {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  // Server-side fallback
  return Buffer.from(str, "utf-8").toString("base64");
};

/**
 * Base64 decode
 */
export const base64Decode = (str: string): string => {
  try {
    if (typeof window !== "undefined") {
      return decodeURIComponent(escape(window.atob(str)));
    }

    // Server-side fallback
    return Buffer.from(str, "base64").toString("utf-8");
  } catch (error) {
    throw new Error("Invalid base64 string");
  }
};

/**
 * URL-safe Base64 encode
 */
export const base64UrlEncode = (str: string): string => {
  return base64Encode(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

/**
 * URL-safe Base64 decode
 */
export const base64UrlDecode = (str: string): string => {
  // Add padding if needed
  let padded = str;
  while (padded.length % 4) {
    padded += "=";
  }

  // Replace URL-safe characters
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");

  return base64Decode(base64);
};

/**
 * Simple XOR encryption/decryption
 */
export const xorCipher = (text: string, key: string): string => {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    result += String.fromCharCode(textChar ^ keyChar);
  }

  return result;
};

/**
 * Caesar cipher encryption
 */
export const caesarEncrypt = (text: string, shift: number): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= "Z" ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - start + shift) % 26) + start
    );
  });
};

/**
 * Caesar cipher decryption
 */
export const caesarDecrypt = (text: string, shift: number): string => {
  return caesarEncrypt(text, 26 - shift);
};

/**
 * Generate salt for password hashing
 */
export const generateSalt = (length: number = 16): string => {
  return generateSecureRandomString(length);
};

/**
 * Simple checksum calculation
 */
export const calculateChecksum = (data: string): string => {
  let checksum = 0;

  for (let i = 0; i < data.length; i++) {
    checksum += data.charCodeAt(i);
  }

  return checksum.toString(16);
};

/**
 * Validate checksum
 */
export const validateChecksum = (
  data: string,
  expectedChecksum: string
): boolean => {
  const calculatedChecksum = calculateChecksum(data);
  return calculatedChecksum === expectedChecksum;
};

/**
 * ROT13 encoding/decoding
 */
export const rot13 = (text: string): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= "Z" ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - start + 13) % 26) + start
    );
  });
};

/**
 * Hex encode
 */
export const hexEncode = (str: string): string => {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const hex = str.charCodeAt(i).toString(16);
    result += hex.padStart(2, "0");
  }

  return result;
};

/**
 * Hex decode
 */
export const hexDecode = (hex: string): string => {
  let result = "";

  for (let i = 0; i < hex.length; i += 2) {
    const hexPair = hex.substr(i, 2);
    result += String.fromCharCode(parseInt(hexPair, 16));
  }

  return result;
};

/**
 * Generate CSRF token
 */
export const generateCSRFToken = (): string => {
  return generateSecureRandomString(32);
};

/**
 * Validate CSRF token format
 */
export const validateCSRFToken = (token: string): boolean => {
  return /^[A-Za-z0-9]{32}$/.test(token);
};

/**
 * Generate API key
 */
export const generateAPIKey = (prefix: string = "api"): string => {
  const randomPart = generateSecureRandomString(32);
  return `${prefix}_${randomPart}`;
};

/**
 * Validate API key format
 */
export const validateAPIKey = (
  apiKey: string,
  prefix: string = "api"
): boolean => {
  const pattern = new RegExp(`^${prefix}_[A-Za-z0-9]{32}$`);
  return pattern.test(apiKey);
};

/**
 * Simple data obfuscation
 */
export const obfuscateData = (data: string, key: string): string => {
  const encrypted = xorCipher(data, key);
  return base64Encode(encrypted);
};

/**
 * Simple data deobfuscation
 */
export const deobfuscateData = (
  obfuscatedData: string,
  key: string
): string => {
  try {
    const encrypted = base64Decode(obfuscatedData);
    return xorCipher(encrypted, key);
  } catch (error) {
    throw new Error("Failed to deobfuscate data");
  }
};

/**
 * Generate nonce for security
 */
export const generateNonce = (length: number = 16): string => {
  return generateSecureRandomString(length);
};

/**
 * Create hash from multiple values
 */
export const createHash = (...values: string[]): string => {
  const combined = values.join("|");
  return simpleHash(combined);
};

/**
 * Time-based token generation
 */
export const generateTimeBasedToken = (
  data: string,
  timestamp?: number
): string => {
  const time = timestamp || Date.now();
  const timeStr = Math.floor(time / 1000).toString();
  const combined = `${data}:${timeStr}`;
  return base64Encode(combined);
};

/**
 * Validate time-based token
 */
export const validateTimeBasedToken = (
  token: string,
  data: string,
  maxAge: number = 3600
): boolean => {
  try {
    const decoded = base64Decode(token);
    const [tokenData, timeStr] = decoded.split(":");

    if (tokenData !== data) return false;

    const tokenTime = parseInt(timeStr, 10);
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime - tokenTime <= maxAge;
  } catch (error) {
    return false;
  }
};

/**
 * Mask sensitive data
 */
export const maskSensitiveData = (
  data: string,
  visibleStart: number = 2,
  visibleEnd: number = 2,
  maskChar: string = "*"
): string => {
  if (data.length <= visibleStart + visibleEnd) {
    return maskChar.repeat(data.length);
  }

  const start = data.substring(0, visibleStart);
  const end = data.substring(data.length - visibleEnd);
  const masked = maskChar.repeat(data.length - visibleStart - visibleEnd);

  return start + masked + end;
};
