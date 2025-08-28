/**
 * Format Utility Functions
 * Fungsi utility untuk formatting data
 */

import { formatDateJakarta } from './timezone';

/**
 * Format currency in Indonesian Rupiah
 */
export const formatCurrency = (
  amount: number,
  options: {
    showSymbol?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  const { showSymbol = true, minimumFractionDigits = 0, maximumFractionDigits = 0 } = options;

  try {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);

    if (!showSymbol) {
      return formatted.replace(/Rp\s?/, '').trim();
    }

    return formatted;
  } catch (error) {
    // Fallback formatting
    const formattedNumber = amount.toLocaleString('id-ID');
    return showSymbol ? `Rp ${formattedNumber}` : formattedNumber;
  }
};

/**
 * Format number with Indonesian locale
 */
export const formatNumber = (
  number: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useGrouping?: boolean;
  } = {}
): string => {
  const { minimumFractionDigits = 0, maximumFractionDigits = 2, useGrouping = true } = options;

  try {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(number);
  } catch (error) {
    return number.toString();
  }
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  } = {}
): string => {
  const { minimumFractionDigits = 0, maximumFractionDigits = 1, showSymbol = true } = options;

  try {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'percent',
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value / 100);

    if (!showSymbol) {
      return formatted.replace('%', '').trim();
    }

    return formatted;
  } catch (error) {
    const formattedNumber = value.toFixed(maximumFractionDigits);
    return showSymbol ? `${formattedNumber}%` : formattedNumber;
  }
};

/**
 * Format phone number to Indonesian format
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Handle different formats
  if (cleaned.startsWith('62')) {
    // +62 format
    const number = cleaned.substring(2);
    if (number.length >= 9) {
      return `+62 ${number.substring(0, 3)} ${number.substring(3, 7)} ${number.substring(7)}`;
    }
  } else if (cleaned.startsWith('0')) {
    // 0xxx format
    const number = cleaned.substring(1);
    if (number.length >= 9) {
      return `0${number.substring(0, 3)}-${number.substring(3, 7)}-${number.substring(7)}`;
    }
  }

  return phone; // Return original if can't format
};

/**
 * Format Indonesian ID number (NIK)
 */
export const formatNIK = (nik: string): string => {
  if (!nik) return '';

  const cleaned = nik.replace(/\D/g, '');

  if (cleaned.length === 16) {
    return `${cleaned.substring(0, 6)}.${cleaned.substring(6, 10)}.${cleaned.substring(10, 16)}`;
  }

  return nik;
};

/**
 * Format postal code
 */
export const formatPostalCode = (code: string): string => {
  if (!code) return '';

  const cleaned = code.replace(/\D/g, '');

  if (cleaned.length === 5) {
    return cleaned;
  }

  return code;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Format distance
 */
export const formatDistance = (
  meters: number,
  options: {
    unit?: 'auto' | 'km' | 'm';
    precision?: number;
  } = {}
): string => {
  const { unit = 'auto', precision = 1 } = options;

  if (unit === 'km' || (unit === 'auto' && meters >= 1000)) {
    const km = meters / 1000;
    return `${km.toFixed(precision)} km`;
  }

  return `${Math.round(meters)} m`;
};

/**
 * Format text to title case
 */
export const formatTitleCase = (text: string): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format text to sentence case
 */
export const formatSentenceCase = (text: string): string => {
  if (!text) return '';

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format name (proper case)
 */
export const formatName = (name: string): string => {
  if (!name) return '';

  return name
    .trim()
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format address
 */
export const formatAddress = (address: {
  street?: string;
  village?: string;
  district?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}): string => {
  const parts = [
    address.street,
    address.village,
    address.district,
    address.city,
    address.province,
    address.postalCode,
  ].filter(Boolean);

  return parts.join(', ');
};

/**
 * Format initials from name
 */
export const formatInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return '';

  const words = name
    .trim()
    .split(' ')
    .filter((word) => word.length > 0);
  const initials = words
    .slice(0, maxLength)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return initials;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  if (!text || text.length <= maxLength) return text;

  return text.substring(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Format slug from text
 */
export const formatSlug = (text: string): string => {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Format social media handle
 */
export const formatSocialHandle = (handle: string, platform: string): string => {
  if (!handle) return '';

  const cleaned = handle.replace(/^@/, '');

  switch (platform.toLowerCase()) {
    case 'twitter':
    case 'instagram':
    case 'telegram':
      return `@${cleaned}`;
    case 'facebook':
    case 'linkedin':
      return cleaned;
    default:
      return handle;
  }
};

/**
 * Format URL
 */
export const formatUrl = (url: string): string => {
  if (!url) return '';

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
};

/**
 * Format email domain
 */
export const formatEmailDomain = (email: string): string => {
  if (!email || !email.includes('@')) return '';

  const domain = email.split('@')[1];
  return domain.toLowerCase();
};

/**
 * Format table data for display
 */
export const formatTableCell = (
  value: any,
  type: 'text' | 'number' | 'currency' | 'date' | 'boolean' | 'status'
): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  switch (type) {
    case 'text':
      return String(value);

    case 'number':
      return formatNumber(Number(value));

    case 'currency':
      return formatCurrency(Number(value));

    case 'date':
      try {
        const date = new Date(value);
        return formatDateJakarta(date);
      } catch {
        return String(value);
      }

    case 'boolean':
      return value ? 'Ya' : 'Tidak';

    case 'status':
      return formatTitleCase(String(value));

    default:
      return String(value);
  }
};

/**
 * Format search query
 */
export const formatSearchQuery = (query: string): string => {
  if (!query) return '';

  return query
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .toLowerCase();
};

/**
 * Format tags array to string
 */
export const formatTags = (tags: string[], separator: string = ', '): string => {
  if (!Array.isArray(tags) || tags.length === 0) return '';

  return tags.filter(Boolean).join(separator);
};

/**
 * Format validation errors
 */
export const formatValidationErrors = (errors: Record<string, string[]>): string[] => {
  const formattedErrors: string[] = [];

  Object.entries(errors).forEach(([field, fieldErrors]) => {
    fieldErrors.forEach((error) => {
      formattedErrors.push(`${formatTitleCase(field)}: ${error}`);
    });
  });

  return formattedErrors;
};

/**
 * Format JSON for display
 */
export const formatJSON = (obj: any, indent: number = 2): string => {
  try {
    return JSON.stringify(obj, null, indent);
  } catch (error) {
    return String(obj);
  }
};

/**
 * Format markdown to plain text
 */
export const formatMarkdownToText = (markdown: string): string => {
  if (!markdown) return '';

  return markdown
    .replace(/#{1,6}\s?/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Remove images
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
};

/**
 * Format template string with variables
 */
export const formatTemplate = (template: string, variables: Record<string, any>): string => {
  if (!template) return '';

  let formatted = template;

  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    formatted = formatted.replace(regex, String(value));
  });

  return formatted;
};
