/**
 * Application Constants
 * Konstanta-konstanta yang digunakan di seluruh aplikasi
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Authentication Constants
export const AUTH_CONFIG = {
  TOKEN_KEY: "auth_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  USER_KEY: "user_data",
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
  REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: "nagari_auth_token",
  REFRESH_TOKEN: "nagari_refresh_token",
  USER_DATA: "nagari_user_data",

  // UI State
  THEME: "nagari_theme",
  LANGUAGE: "nagari_language",
  SIDEBAR_STATE: "nagari_sidebar_state",

  // Shopping Cart
  CART_ITEMS: "nagari_cart_items",

  // Preferences
  NOTIFICATION_SETTINGS: "nagari_notification_settings",
  DASHBOARD_LAYOUT: "nagari_dashboard_layout",

  // Form Data
  DRAFT_DOCUMENT_REQUEST: "nagari_draft_document_request",
  DRAFT_UMKM_REGISTRATION: "nagari_draft_umkm_registration",
} as const;

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  STAFF: "STAFF",
  RESIDENT: "RESIDENT",
  BUSINESS_OWNER: "BUSINESS_OWNER",
  VISITOR: "VISITOR",
} as const;

// Status Constants
export const STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

// Document Types
export const DOCUMENT_TYPES = {
  SKTM: "SKTM",
  SURAT_DOMISILI: "SURAT_DOMISILI",
  SURAT_USAHA: "SURAT_USAHA",
  SURAT_KEMATIAN: "SURAT_KEMATIAN",
  SURAT_KELAHIRAN: "SURAT_KELAHIRAN",
  SURAT_PINDAH: "SURAT_PINDAH",
  SURAT_NIKAH: "SURAT_NIKAH",
  LEGALISIR: "LEGALISIR",
} as const;

// File Upload Constants
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/ogg"],

  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  DOCUMENT_MAX_SIZE: 10 * 1024 * 1024, // 10MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 50, 100],
} as const;

// Date Formats
export const DATE_FORMATS = {
  DEFAULT: "DD/MM/YYYY",
  WITH_TIME: "DD/MM/YYYY HH:mm",
  FULL: "DD MMMM YYYY",
  FULL_WITH_TIME: "DD MMMM YYYY HH:mm",
  TIME_ONLY: "HH:mm",
  ISO: "YYYY-MM-DD",
  ISO_WITH_TIME: "YYYY-MM-DDTHH:mm:ss",
} as const;

// Currency Format
export const CURRENCY = {
  CODE: "IDR",
  SYMBOL: "Rp",
  LOCALE: "id-ID",
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MAX_PHONE_LENGTH: 15,
  MIN_PHONE_LENGTH: 10,
  MAX_ADDRESS_LENGTH: 500,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_CONTENT_LENGTH: 10000,
} as const;

// Indonesian Phone Number Patterns
export const PHONE_PATTERNS = {
  MOBILE: /^(\+62|62|0)[8][1-9][0-9]{6,9}$/,
  LANDLINE: /^(\+62|62|0)[2-7][0-9]{6,8}$/,
  ALL: /^(\+62|62|0)[0-9]{8,12}$/,
} as const;

// Indonesian ID Number Patterns
export const ID_PATTERNS = {
  NIK: /^[0-9]{16}$/,
  KK: /^[0-9]{16}$/,
  NPWP: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\.[0-9]{1}-[0-9]{3}\.[0-9]{3}$/,
} as const;

// Social Media Platforms
export const SOCIAL_MEDIA = {
  FACEBOOK: "FACEBOOK",
  TWITTER: "TWITTER",
  INSTAGRAM: "INSTAGRAM",
  LINKEDIN: "LINKEDIN",
  YOUTUBE: "YOUTUBE",
  TIKTOK: "TIKTOK",
  WHATSAPP: "WHATSAPP",
} as const;

// Event Categories
export const EVENT_CATEGORIES = {
  GOVERNMENT: "GOVERNMENT",
  TOURISM: "TOURISM",
  CULTURE: "CULTURE",
  EDUCATION: "EDUCATION",
  HEALTH: "HEALTH",
  SPORTS: "SPORTS",
  BUSINESS: "BUSINESS",
  COMMUNITY: "COMMUNITY",
} as const;

// Tourism Categories
export const TOURISM_CATEGORIES = {
  NATURE: "NATURE",
  CULTURE: "CULTURE",
  ADVENTURE: "ADVENTURE",
  CULINARY: "CULINARY",
  HISTORICAL: "HISTORICAL",
  RELIGIOUS: "RELIGIOUS",
} as const;

// UMKM Categories
export const UMKM_CATEGORIES = {
  FOOD_BEVERAGE: "FOOD_BEVERAGE",
  FASHION: "FASHION",
  HANDICRAFT: "HANDICRAFT",
  AGRICULTURE: "AGRICULTURE",
  SERVICES: "SERVICES",
  TECHNOLOGY: "TECHNOLOGY",
  RETAIL: "RETAIL",
  MANUFACTURING: "MANUFACTURING",
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
  SYSTEM: "SYSTEM",
  DOCUMENT: "DOCUMENT",
  EVENT: "EVENT",
  ANNOUNCEMENT: "ANNOUNCEMENT",
} as const;

// Theme Constants
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

// Language Constants
export const LANGUAGES = {
  ID: "id",
  EN: "en",
} as const;

// Gender Constants
export const GENDERS = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

// Religion Constants
export const RELIGIONS = {
  ISLAM: "ISLAM",
  KRISTEN: "KRISTEN",
  KATOLIK: "KATOLIK",
  HINDU: "HINDU",
  BUDDHA: "BUDDHA",
  KONGHUCU: "KONGHUCU",
} as const;

// Marital Status Constants
export const MARITAL_STATUS = {
  SINGLE: "SINGLE",
  MARRIED: "MARRIED",
  DIVORCED: "DIVORCED",
  WIDOWED: "WIDOWED",
} as const;

// Education Levels
export const EDUCATION_LEVELS = {
  NO_EDUCATION: "NO_EDUCATION",
  ELEMENTARY: "ELEMENTARY",
  JUNIOR_HIGH: "JUNIOR_HIGH",
  SENIOR_HIGH: "SENIOR_HIGH",
  DIPLOMA: "DIPLOMA",
  BACHELOR: "BACHELOR",
  MASTER: "MASTER",
  DOCTORATE: "DOCTORATE",
} as const;

// Job Categories
export const JOB_CATEGORIES = {
  GOVERNMENT: "GOVERNMENT",
  PRIVATE: "PRIVATE",
  ENTREPRENEUR: "ENTREPRENEUR",
  STUDENT: "STUDENT",
  UNEMPLOYED: "UNEMPLOYED",
  RETIRED: "RETIRED",
  HOUSEWIFE: "HOUSEWIFE",
  FREELANCER: "FREELANCER",
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

// Processing Times (in days)
export const PROCESSING_TIMES = {
  SKTM: 3,
  SURAT_DOMISILI: 2,
  SURAT_USAHA: 5,
  SURAT_KEMATIAN: 1,
  SURAT_KELAHIRAN: 1,
  SURAT_PINDAH: 7,
  SURAT_NIKAH: 14,
  LEGALISIR: 1,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
  UNAUTHORIZED: "Anda tidak memiliki akses untuk melakukan tindakan ini.",
  FORBIDDEN: "Akses ditolak. Hubungi administrator.",
  NOT_FOUND: "Data yang dicari tidak ditemukan.",
  SERVER_ERROR: "Terjadi kesalahan server. Silakan coba lagi nanti.",
  VALIDATION_ERROR: "Data yang dimasukkan tidak valid.",
  FILE_TOO_LARGE: "Ukuran file terlalu besar.",
  INVALID_FILE_TYPE: "Tipe file tidak didukung.",
  SESSION_EXPIRED: "Sesi Anda telah berakhir. Silakan login kembali.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: "Data berhasil disimpan.",
  UPDATED: "Data berhasil diperbarui.",
  DELETED: "Data berhasil dihapus.",
  SENT: "Data berhasil dikirim.",
  UPLOADED: "File berhasil diunggah.",
  LOGIN: "Login berhasil.",
  LOGOUT: "Logout berhasil.",
  REGISTERED: "Registrasi berhasil.",
  PASSWORD_CHANGED: "Password berhasil diubah.",
  EMAIL_VERIFIED: "Email berhasil diverifikasi.",
} as const;

// Time Constants (in milliseconds)
export const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// Indonesian Provinces
export const PROVINCES = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Bengkulu",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Lampung",
  "Banten",
  "Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
] as const;

// Application Metadata
export const APP_METADATA = {
  NAME: "Nagari Guguak Malalo",
  VERSION: "1.0.0",
  DESCRIPTION: "Portal Digital Nagari Guguak Malalo",
  KEYWORDS: ["nagari", "guguak malalo", "portal", "pemerintahan", "digital"],
  AUTHOR: "Pemerintah Nagari Guguak Malalo",
  COPYRIGHT: "© 2024 Nagari Guguak Malalo. All rights reserved.",
} as const;
