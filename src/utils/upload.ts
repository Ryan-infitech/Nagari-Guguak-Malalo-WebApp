import { toast } from 'sonner';
import apiClient from '@/api/client';

/**
 * Upload utilities with retry mechanism and error handling
 * Consolidated upload utility file for the application
 */

export interface UploadOptions {
  file: File;
  type: 'image' | 'document' | 'video';
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  onProgress?: (progress: number) => void;
  onComplete?: (url: string) => void;
  onError?: (error: string) => void;
  onRetry?: (attempt: number, error: Error) => void;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
  errorCode?: string;
}

export interface UploadError extends Error {
  code?: string;
  status?: number;
  isTimeout?: boolean;
  isNetworkError?: boolean;
  isFileSizeError?: boolean;
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Create upload error with additional context
 */
export function createUploadError(
  message: string,
  options: Partial<UploadError> = {}
): UploadError {
  const error = new Error(message) as UploadError;
  Object.assign(error, options);
  return error;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: any): boolean {
  // Network errors are retryable
  if (error.isNetworkError || error.code === 'NETWORK_ERROR') {
    return true;
  }

  // Timeout errors are retryable
  if (error.isTimeout || error.code === 'TIMEOUT') {
    return true;
  }

  // 5xx server errors are retryable
  if (error.status >= 500 && error.status < 600) {
    return true;
  }

  // 429 Too Many Requests is retryable
  if (error.status === 429) {
    return true;
  }

  // File size errors are not retryable
  if (error.isFileSizeError || error.status === 413) {
    return false;
  }

  // 4xx client errors (except 429) are generally not retryable
  if (error.status >= 400 && error.status < 500) {
    return false;
  }

  return false;
}

// File validation utilities
export const validateFile = (
  file: File,
  type: 'image' | 'document' | 'video'
): { valid: boolean; error?: string } => {
  const maxSizes = {
    image: 10 * 1024 * 1024, // 10MB for images
    document: 20 * 1024 * 1024, // 20MB for documents
    video: 100 * 1024 * 1024, // 100MB for videos
  };

  const allowedTypes = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    document: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    video: ['video/mp4', 'video/webm', 'video/quicktime', 'video/avi'],
  };

  // Check file size
  if (file.size > maxSizes[type]) {
    const maxSizeMB = Math.round(maxSizes[type] / (1024 * 1024));
    return {
      valid: false,
      error: `Ukuran file terlalu besar. Maksimal ${maxSizeMB}MB untuk ${type}.`,
    };
  }

  // Check file type
  if (!allowedTypes[type].includes(file.type)) {
    return {
      valid: false,
      error: `Format file tidak didukung. Format yang diizinkan: ${allowedTypes[type].join(', ')}.`,
    };
  }

  return { valid: true };
};

// Optimize image before upload
export const optimizeImage = async (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (max 1920px width)
      const maxWidth = 1920;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);

      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      // Draw optimized image
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          } else {
            resolve(file); // Fallback to original
          }
        },
        'image/webp',
        0.8
      );
    };

    img.onerror = () => resolve(file); // Fallback to original
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Advanced image compression with multiple options
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress image
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Check file size and compress if necessary
 */
export async function optimizeFileForUpload(
  file: File,
  maxSize: number = 10 * 1024 * 1024 // 10MB default
): Promise<File> {
  // If file is already small enough, return as is
  if (file.size <= maxSize) {
    return file;
  }

  // Only compress images
  if (!file.type.startsWith('image/')) {
    throw createUploadError(`File terlalu besar. Maksimal ${Math.round(maxSize / 1024 / 1024)}MB`, {
      isFileSizeError: true,
      status: 413,
    });
  }

  // Try to compress the image
  try {
    const compressed = await compressImage(file, 1920, 1080, 0.8);

    // If still too large, try higher compression
    if (compressed.size > maxSize) {
      const moreCompressed = await compressImage(file, 1280, 720, 0.6);

      if (moreCompressed.size > maxSize) {
        throw createUploadError('File gambar terlalu besar setelah kompresi', {
          isFileSizeError: true,
          status: 413,
        });
      }

      return moreCompressed;
    }

    return compressed;
  } catch (error) {
    throw createUploadError('Gagal mengoptimalkan file untuk upload', {
      isFileSizeError: true,
      status: 413,
    });
  }
}

// Parse upload errors from backend
export const parseUploadError = (error: any): { message: string; code?: string } => {
  if (typeof error === 'string') {
    return { message: error };
  }

  if (error.response?.data?.message) {
    return {
      message: error.response.data.message,
      code: error.response.data.errorCode,
    };
  }

  if (error.message) {
    // Handle common error patterns
    if (error.message.includes('Authentication') || error.message.includes('401')) {
      return {
        message: 'Autentikasi diperlukan. Silakan login kembali.',
        code: 'AUTH_REQUIRED',
      };
    }

    if (error.message.includes('permission') || error.message.includes('403')) {
      return {
        message: 'Anda tidak memiliki izin untuk mengupload file.',
        code: 'PERMISSION_DENIED',
      };
    }

    if (error.message.includes('timeout') || error.message.includes('TIMEOUT')) {
      return {
        message: 'Upload timeout - Periksa koneksi internet atau ukuran file Anda.',
        code: 'UPLOAD_TIMEOUT',
      };
    }

    if (error.message.includes('413') || error.message.includes('large')) {
      return {
        message: 'File terlalu besar. Maksimal 100MB.',
        code: 'FILE_TOO_LARGE',
      };
    }

    if (error.message.includes('network') || error.message.includes('fetch failed')) {
      return {
        message: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
        code: 'NETWORK_ERROR',
      };
    }

    return { message: error.message };
  }

  return {
    message: 'Terjadi kesalahan saat mengupload file. Silakan coba lagi.',
    code: 'UNKNOWN_ERROR',
  };
};

/**
 * Enhanced error parsing from API response with UploadError type
 */
export function parseUploadErrorAdvanced(error: any): UploadError {
  let message = 'Gagal mengupload file';
  let uploadError: UploadError;

  // Network/connection errors
  if (!error.response) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      uploadError = createUploadError(
        'Koneksi timeout. Periksa koneksi internet Anda dan coba lagi.',
        {
          code: 'TIMEOUT',
          isTimeout: true,
        }
      );
    } else {
      uploadError = createUploadError(
        'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
        {
          code: 'NETWORK_ERROR',
          isNetworkError: true,
        }
      );
    }
    return uploadError;
  }

  const status = error.response?.status;
  const responseData = error.response?.data;

  switch (status) {
    case 413:
      message = responseData?.message || 'File terlalu besar. Maksimal 50MB.';
      uploadError = createUploadError(message, {
        status,
        isFileSizeError: true,
      });
      break;

    case 415:
      message = responseData?.message || 'Format file tidak didukung.';
      uploadError = createUploadError(message, { status });
      break;

    case 429:
      message = 'Terlalu banyak permintaan. Tunggu sebentar dan coba lagi.';
      uploadError = createUploadError(message, { status });
      break;

    case 500:
    case 502:
    case 503:
    case 504:
      message = 'Server sedang mengalami masalah. Coba lagi nanti.';
      uploadError = createUploadError(message, { status });
      break;

    default:
      message = responseData?.message || 'Terjadi kesalahan saat mengupload file.';
      uploadError = createUploadError(message, { status });
  }

  return uploadError;
}

// Upload with retry mechanism
export const uploadFileWithRetry = async (options: UploadOptions): Promise<UploadResponse> => {
  const {
    file,
    type,
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 120000, // 2 minutes default
    onProgress,
    onComplete,
    onError,
    onRetry,
  } = options;

  // Validate file first
  const validation = validateFile(file, type);
  if (!validation.valid) {
    const error = validation.error!;
    onError?.(error);
    toast.error(error);
    return { success: false, error };
  }

  // Optimize image if needed
  let fileToUpload = file;
  if (type === 'image' && file.size > 2 * 1024 * 1024) {
    // Optimize images > 2MB
    try {
      onProgress?.(5); // Show initial progress
      fileToUpload = await optimizeFileForUpload(file);
      onProgress?.(10);
    } catch (err) {
      console.warn('Image optimization failed, using original:', err);
      // Continue with original file if optimization fails
    }
  }

  let lastError: UploadError | null = null;

  // Upload with retry using exponential backoff
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      onProgress?.(10 + (attempt - 1) * 20);

      const formData = new FormData();
      formData.append('file', fileToUpload);

      const queryParams = {
        folder: type === 'image' ? 'images' : type,
        category: type,
        isPublic: 'true',
      };

      console.log('Upload attempt:', {
        endpoint: '/files/upload',
        params: queryParams,
        fileSize: fileToUpload.size,
        fileName: fileToUpload.name,
        attempt,
      });

      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            createUploadError('Upload timeout', {
              code: 'TIMEOUT',
              isTimeout: true,
            })
          );
        }, timeout);
      });

      // Create upload promise using apiClient
      const uploadPromise = apiClient.post<{ url: string }>('/files/upload', formData, {
        params: queryParams,
      });

      // Race between upload and timeout
      const response = (await Promise.race([uploadPromise, timeoutPromise])) as any;

      onProgress?.(100);

      // Extract URL from backend response structure
      const uploadedUrl = response.data?.url || response.data?.data?.url;
      if (!uploadedUrl) {
        throw createUploadError('No URL returned from upload', {
          code: 'INVALID_RESPONSE',
        });
      }

      const successMessage = `File berhasil diupload${attempt > 1 ? ` (percobaan ke-${attempt})` : ''}`;
      toast.success(successMessage);
      onComplete?.(uploadedUrl);

      return { success: true, url: uploadedUrl };
    } catch (error: any) {
      lastError = error as UploadError;

      if (attempt === maxRetries) {
        // Final attempt failed
        const { message, code } = parseUploadError(lastError);
        const finalError = `Upload gagal setelah ${maxRetries} percobaan: ${message}`;
        onError?.(finalError);
        toast.error(finalError);
        return { success: false, error: finalError, errorCode: code };
      } else {
        // Check if error is retryable
        if (isRetryableError(lastError)) {
          const { message } = parseUploadError(lastError);
          toast.warning(`Percobaan ${attempt} gagal: ${message}. Mencoba lagi...`);
          onProgress?.(20 * attempt);

          // Notify about retry
          if (onRetry) {
            onRetry(attempt + 1, lastError);
          }

          // Wait before retry with exponential backoff
          const delay = retryDelay * Math.pow(2, attempt - 1);
          await sleep(delay);
          continue;
        } else {
          // Don't retry on validation errors
          const { message, code } = parseUploadError(lastError);
          onError?.(message);
          toast.error(message);
          return { success: false, error: message, errorCode: code };
        }
      }
    }
  }

  // This should never be reached, but just in case
  const { message, code } = parseUploadError(lastError);
  return { success: false, error: message, errorCode: code };
};

// Utility for drag and drop file handling
export const handleFileDrop = (e: React.DragEvent, callback: (files: File[]) => void) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  callback(files);
};

// Utility for file input change
export const handleFileInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (files: File[]) => void
) => {
  const files = Array.from(e.target.files || []);
  callback(files);
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generic upload function with full retry mechanism
 * Alternative to uploadFileWithRetry for more control
 */
export async function uploadWithRetry(
  uploadFn: () => Promise<any>,
  options: {
    maxRetries?: number;
    retryDelay?: number;
    timeout?: number;
    onProgress?: (progress: number) => void;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<any> {
  const { maxRetries = 3, retryDelay = 1000, timeout = 60000, onProgress, onRetry } = options;

  let lastError: UploadError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            createUploadError('Upload timeout', {
              code: 'TIMEOUT',
              isTimeout: true,
            })
          );
        }, timeout);
      });

      // Race between upload and timeout
      const result = await Promise.race([uploadFn(), timeoutPromise]);

      return result;
    } catch (error: any) {
      lastError = error as UploadError;

      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Check if error is retryable
      if (!isRetryableError(lastError)) {
        throw lastError;
      }

      // Notify about retry
      if (onRetry) {
        onRetry(attempt + 1, lastError);
      }

      // Wait before retrying with exponential backoff
      const delay = retryDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  // This should never be reached, but just in case
  throw lastError || createUploadError('Upload failed after all retries');
}
