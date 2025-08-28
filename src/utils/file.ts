/**
 * File Utility Functions
 * Fungsi utility untuk manipulasi file dan upload
 */

/**
 * File size units in bytes
 */
const FILE_SIZE_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
} as const;

/**
 * Supported file types
 */
export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
  AUDIO: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
} as const;

/**
 * MIME type mappings
 */
export const MIME_TYPES: Record<string, string> = {
  // Images
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp',
  webp: 'image/webp',
  svg: 'image/svg+xml',

  // Documents
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',

  // Videos
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  mov: 'video/quicktime',
  wmv: 'video/x-ms-wmv',
  flv: 'video/x-flv',
  webm: 'video/webm',
  mkv: 'video/x-matroska',

  // Audio
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  flac: 'audio/flac',
  aac: 'audio/aac',
  ogg: 'audio/ogg',
  wma: 'audio/x-ms-wma',

  // Archives
  zip: 'application/zip',
  rar: 'application/vnd.rar',
  '7z': 'application/x-7z-compressed',
  tar: 'application/x-tar',
  gz: 'application/gzip',
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  if (!filename || typeof filename !== 'string') {
    return '';
  }

  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return '';
  }

  return filename.substring(lastDotIndex + 1).toLowerCase();
};

/**
 * Get filename without extension
 */
export const getFileNameWithoutExtension = (filename: string): string => {
  if (!filename || typeof filename !== 'string') {
    return '';
  }

  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return filename;
  }

  return filename.substring(0, lastDotIndex);
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, unitIndex);

  return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
};

/**
 * Convert file size string to bytes
 */
export const parseFileSize = (sizeString: string): number => {
  if (!sizeString || typeof sizeString !== 'string') {
    return 0;
  }

  const regex = /^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i;
  const match = sizeString.trim().match(regex);

  if (!match) {
    return 0;
  }

  const size = parseFloat(match[1]);
  const unit = match[2].toUpperCase() as keyof typeof FILE_SIZE_UNITS;

  return size * FILE_SIZE_UNITS[unit];
};

/**
 * Validate file type
 */
export const isValidFileType = (filename: string, allowedTypes: string[]): boolean => {
  const extension = getFileExtension(filename);
  return allowedTypes.map((type) => type.toLowerCase()).includes(extension);
};

/**
 * Check if file is image
 */
export const isImageFile = (filename: string): boolean => {
  return isValidFileType(filename, [...FILE_TYPES.IMAGE]);
};

/**
 * Check if file is document
 */
export const isDocumentFile = (filename: string): boolean => {
  return isValidFileType(filename, [...FILE_TYPES.DOCUMENT]);
};

/**
 * Check if file is video
 */
export const isVideoFile = (filename: string): boolean => {
  return isValidFileType(filename, [...FILE_TYPES.VIDEO]);
};

/**
 * Check if file is audio
 */
export const isAudioFile = (filename: string): boolean => {
  return isValidFileType(filename, [...FILE_TYPES.AUDIO]);
};

/**
 * Check if file is archive
 */
export const isArchiveFile = (filename: string): boolean => {
  return isValidFileType(filename, [...FILE_TYPES.ARCHIVE]);
};

/**
 * Get MIME type from filename
 */
export const getMimeType = (filename: string): string => {
  const extension = getFileExtension(filename);
  return MIME_TYPES[extension] || 'application/octet-stream';
};

/**
 * Validate file size
 */
export const isValidFileSize = (size: number, maxSize: number): boolean => {
  return size <= maxSize;
};

/**
 * Generate safe filename
 */
export const generateSafeFilename = (originalFilename: string): string => {
  if (!originalFilename) {
    return `file_${Date.now()}`;
  }

  const extension = getFileExtension(originalFilename);
  const nameWithoutExt = getFileNameWithoutExtension(originalFilename);

  // Remove special characters and normalize
  const safeName = nameWithoutExt
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();

  // Ensure filename is not empty
  const finalName = safeName || `file_${Date.now()}`;

  return extension ? `${finalName}.${extension}` : finalName;
};

/**
 * Generate unique filename
 */
export const generateUniqueFilename = (originalFilename: string): string => {
  const extension = getFileExtension(originalFilename);
  const nameWithoutExt = getFileNameWithoutExtension(originalFilename);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);

  const safeName = generateSafeFilename(nameWithoutExt);
  const uniqueName = `${safeName}_${timestamp}_${random}`;

  return extension ? `${uniqueName}.${extension}` : uniqueName;
};

/**
 * Validate file upload
 */
export const validateFileUpload = (
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    minSize?: number;
  } = {}
): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  // Check if file exists
  if (!file) {
    errors.push('File tidak ditemukan');
    return { valid: false, errors };
  }

  // Check file size
  if (options.maxSize && file.size > options.maxSize) {
    errors.push(`Ukuran file maksimal ${formatFileSize(options.maxSize)}`);
  }

  if (options.minSize && file.size < options.minSize) {
    errors.push(`Ukuran file minimal ${formatFileSize(options.minSize)}`);
  }

  // Check file type
  if (options.allowedTypes && !isValidFileType(file.name, options.allowedTypes)) {
    errors.push(
      `Tipe file tidak didukung. Tipe yang diizinkan: ${options.allowedTypes.join(', ')}`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Read file as text
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

/**
 * Read file as data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Read file as array buffer
 */
export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as ArrayBuffer);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Compress image file
 */
export const compressImage = (
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    outputType?: string;
  } = {}
): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file.name)) {
      reject(new Error('File bukan gambar'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 0.8,
        outputType = 'image/jpeg',
      } = options;

      // Calculate new dimensions
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: outputType,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Create file from blob
 */
export const createFileFromBlob = (
  blob: Blob,
  filename: string,
  options?: FilePropertyBag
): File => {
  return new File([blob], filename, options);
};

/**
 * Download file from URL
 */
export const downloadFile = (url: string, filename?: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'download';
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Download file from blob
 */
export const downloadFileFromBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
  URL.revokeObjectURL(url);
};

/**
 * Get file type category
 */
export const getFileTypeCategory = (filename: string): string => {
  if (isImageFile(filename)) return 'image';
  if (isDocumentFile(filename)) return 'document';
  if (isVideoFile(filename)) return 'video';
  if (isAudioFile(filename)) return 'audio';
  if (isArchiveFile(filename)) return 'archive';
  return 'other';
};

/**
 * Get file icon name based on type
 */
export const getFileIcon = (filename: string): string => {
  const category = getFileTypeCategory(filename);
  const extension = getFileExtension(filename);

  const iconMap: Record<string, string> = {
    // Categories
    image: 'image',
    video: 'video',
    audio: 'audio',
    archive: 'archive',

    // Specific types
    pdf: 'file-pdf',
    doc: 'file-word',
    docx: 'file-word',
    xls: 'file-excel',
    xlsx: 'file-excel',
    ppt: 'file-powerpoint',
    pptx: 'file-powerpoint',
    txt: 'file-text',
  };

  return iconMap[extension] || iconMap[category] || 'file';
};

/**
 * Check if file can be previewed
 */
export const canPreviewFile = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  const previewableTypes = [
    ...FILE_TYPES.IMAGE,
    'pdf',
    'txt',
    ...FILE_TYPES.VIDEO,
    ...FILE_TYPES.AUDIO,
  ];

  return previewableTypes.includes(extension);
};
