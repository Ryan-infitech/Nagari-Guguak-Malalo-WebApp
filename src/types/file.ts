/**
 * File Types
 * Types untuk sistem manajemen file dan media
 */

import { BaseEntity } from "./common";
import { User } from "./auth";

// =============================================================================
// FILE CORE TYPES
// =============================================================================

export type FileType =
  | "IMAGE"
  | "VIDEO"
  | "AUDIO"
  | "DOCUMENT"
  | "ARCHIVE"
  | "OTHER";

export type FileStatus =
  | "UPLOADING"
  | "PROCESSING"
  | "READY"
  | "FAILED"
  | "DELETED";

export type FileVisibility = "PUBLIC" | "PRIVATE" | "RESTRICTED";

export type FileCategory =
  | "PROFILE_PICTURES"
  | "COVER_IMAGES"
  | "GALLERY"
  | "DOCUMENTS"
  | "ATTACHMENTS"
  | "TEMPLATES"
  | "EXPORTS"
  | "BACKUPS"
  | "TEMPORARY"
  | "OTHER";

export interface File extends BaseEntity {
  // Basic information
  originalName: string;
  filename: string;
  path: string;
  url: string;
  mimeType: string;
  size: number; // bytes
  hash: string; // MD5 or SHA256

  // Classification
  type: FileType;
  category: FileCategory;
  status: FileStatus;
  visibility: FileVisibility;

  // Metadata
  metadata: FileMetadata;
  exifData?: Record<string, any>;

  // Upload information
  uploadedBy: string;
  uploader?: User;
  uploadedAt: string;
  uploadSession?: string;

  // Processing information
  isProcessed: boolean;
  processingStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  processingError?: string;
  processedAt?: string;

  // Thumbnails and variants
  thumbnails?: FileThumbnail[];
  variants?: FileVariant[];

  // Usage tracking
  downloadCount: number;
  viewCount: number;
  lastAccessedAt?: string;

  // Relationships
  parentFileId?: string;
  relatedFiles?: string[];

  // Storage information
  storageProvider: "LOCAL" | "S3" | "GCS" | "AZURE" | "SUPABASE";
  storageKey: string;
  storageBucket?: string;

  // Security
  isPublic: boolean;
  accessToken?: string;
  expiresAt?: string;

  // Backup and sync
  isBackedUp: boolean;
  backupLocation?: string;
  lastBackupAt?: string;

  // Tagging and organization
  tags?: string[];
  description?: string;
  alt?: string; // For images

  // Version control
  version: number;
  originalFileId?: string;

  // Compliance and retention
  retentionPolicy?: string;
  deleteAt?: string;
  isArchived: boolean;
}

export interface FileMetadata {
  // Basic metadata
  width?: number;
  height?: number;
  duration?: number; // for videos/audio in seconds
  fps?: number; // for videos
  bitrate?: number; // for videos/audio
  codec?: string;

  // Image specific
  colorSpace?: string;
  hasAlpha?: boolean;
  orientation?: number;

  // Document specific
  pageCount?: number;
  author?: string;
  title?: string;
  subject?: string;
  keywords?: string[];

  // Location data
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };

  // Device information
  device?: {
    make?: string;
    model?: string;
    software?: string;
  };

  // Timestamps
  capturedAt?: string;
  modifiedAt?: string;

  // Additional metadata
  custom?: Record<string, any>;
}

export interface FileThumbnail {
  size: "small" | "medium" | "large" | "xlarge";
  width: number;
  height: number;
  url: string;
  fileSize: number;
  format: "webp" | "jpeg" | "png";
}

export interface FileVariant {
  name: string;
  format: string;
  quality?: number;
  width?: number;
  height?: number;
  url: string;
  fileSize: number;
  purpose: "thumbnail" | "preview" | "download" | "stream" | "backup";
}

// =============================================================================
// FILE OPERATIONS
// =============================================================================

export interface FileUploadRequest {
  file: File;
  category?: FileCategory;
  visibility?: FileVisibility;
  description?: string;
  alt?: string;
  tags?: string[];
  generateThumbnails?: boolean;
  generateVariants?: boolean;
  customMetadata?: Record<string, any>;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  status: FileStatus;
  thumbnails?: FileThumbnail[];
}

export interface FileBulkOperation {
  operation:
    | "delete"
    | "move"
    | "copy"
    | "archive"
    | "tag"
    | "change_visibility";
  fileIds: string[];
  targetCategory?: FileCategory;
  targetVisibility?: FileVisibility;
  tags?: string[];
  reason?: string;
}

export interface FileQuery {
  search?: string;
  type?: FileType | FileType[];
  category?: FileCategory | FileCategory[];
  status?: FileStatus | FileStatus[];
  visibility?: FileVisibility | FileVisibility[];
  uploadedBy?: string;
  tags?: string[];
  mimeType?: string;
  minSize?: number;
  maxSize?: number;
  uploadedAfter?: string;
  uploadedBefore?: string;
  isArchived?: boolean;
  hasLocation?: boolean;
  sortBy?: "uploadedAt" | "size" | "name" | "downloadCount" | "viewCount";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// =============================================================================
// FILE ANALYTICS
// =============================================================================

export interface FileAnalytics {
  overview: {
    totalFiles: number;
    totalSize: number; // bytes
    totalDownloads: number;
    storageUsed: number; // bytes
    storageLimit: number; // bytes
  };

  breakdown: {
    byType: Array<{ type: FileType; count: number; size: number }>;
    byCategory: Array<{ category: FileCategory; count: number; size: number }>;
    byUser: Array<{
      userId: string;
      userName: string;
      fileCount: number;
      totalSize: number;
    }>;
  };

  trends: Array<{
    date: string;
    uploads: number;
    downloads: number;
    storageUsed: number;
  }>;

  topFiles: Array<{
    fileId: string;
    filename: string;
    downloadCount: number;
    viewCount: number;
    size: number;
  }>;

  storageHealth: {
    duplicateFiles: number;
    orphanedFiles: number;
    oversizedFiles: number;
    corruptedFiles: number;
    compressionRatio: number;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 500 * 1024 * 1024, // 500MB
  MAX_DOCUMENT_SIZE: 25 * 1024 * 1024, // 25MB

  ALLOWED_IMAGE_TYPES: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ],
  ALLOWED_VIDEO_TYPES: [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
  ],
  ALLOWED_AUDIO_TYPES: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],

  THUMBNAIL_SIZES: {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 600, height: 600 },
    xlarge: { width: 1200, height: 1200 },
  },

  IMAGE_QUALITY: {
    thumbnail: 60,
    preview: 80,
    original: 95,
  },

  CLEANUP_TEMP_FILES_AFTER: 24, // hours
  CLEANUP_DELETED_FILES_AFTER: 30, // days
  MAX_TAGS_PER_FILE: 10,
  MAX_FILENAME_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 1000,
} as const;

export const FILE_TYPE_LABELS: Record<FileType, string> = {
  IMAGE: "Gambar",
  VIDEO: "Video",
  AUDIO: "Audio",
  DOCUMENT: "Dokumen",
  ARCHIVE: "Arsip",
  OTHER: "Lainnya",
} as const;

export const FILE_CATEGORY_LABELS: Record<FileCategory, string> = {
  PROFILE_PICTURES: "Foto Profil",
  COVER_IMAGES: "Gambar Sampul",
  GALLERY: "Galeri",
  DOCUMENTS: "Dokumen",
  ATTACHMENTS: "Lampiran",
  TEMPLATES: "Template",
  EXPORTS: "Ekspor",
  BACKUPS: "Cadangan",
  TEMPORARY: "Sementara",
  OTHER: "Lainnya",
} as const;
