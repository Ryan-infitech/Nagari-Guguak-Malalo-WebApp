/**
 * Utilities Index - Central Export for All Utility Functions
 * Mengekspor semua utility functions untuk digunakan di aplikasi
 */

// API utilities
export * from './api';
export type { ApiResponse, ErrorResponse, SuccessResponse } from './response';
export {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  isErrorResponse,
  extractResponseData,
  extractErrorMessage,
  extractErrorMessages,
  handleApiResponse,
  transformResponseData,
  mergeResponses,
  validateResponseStructure,
  ResponseCache,
  responseCache,
  logResponse,
  ResponseMetrics,
  responseMetrics,
  STATUS_CODES,
  getStatusCodeMessage,
} from './response';
export * from './queryKeys';

// Authentication & Security
export * from './auth';
export * from './jwt';
export * from './crypto';

// Logging
export * from './logger';

// Data formatting & manipulation
export * from './format';
export * from './date';
export * from './string';
export * from './slug';

// File handling
export {
  FILE_TYPES,
  MIME_TYPES,
  getFileExtension,
  getFileNameWithoutExtension,
  parseFileSize,
  isValidFileType,
  isImageFile,
  isDocumentFile,
  isVideoFile,
  isAudioFile,
  isArchiveFile,
  getMimeType,
  isValidFileSize,
  generateSafeFilename,
  generateUniqueFilename,
  formatFileSize as formatFileSizeFile,
} from './file';
export * from './pdf';

// Validation
export * from './validation';
export {
  isValidEmail,
  normalizeEmail,
  getEmailDomain,
  getEmailLocalPart,
  isCommonEmailProvider,
  isIndonesianEmailDomain,
  suggestEmailCorrections,
  validateEmailList,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  formatEmailForDisplay,
  extractEmailsFromText,
  isDisposableEmail,
  generateEmailSafeFilename,
  parseEmailHeader,
  validateEmailQuota,
  maskEmail as maskEmailUtil,
} from './email';

// Application constants
export * from './constants';

// Re-export from lib/utils untuk backward compatibility
export {
  cn,
  formatDate as formatDateLib,
  formatCurrency as formatCurrencyLib,
  slugify,
  truncate as truncateLib,
} from '../lib/utils';
