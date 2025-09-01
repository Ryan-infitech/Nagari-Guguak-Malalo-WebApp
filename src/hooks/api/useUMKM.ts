/**
 * useUMKM Hook
 * Mengelola data UMKM menggunakan API services
 */
import { useState, useCallback } from 'react';
import { UMKMService, type UMKM as UMKMType, type UMKMCategory } from '@/api/services/umkm.service';
import { UMKM_ENDPOINTS } from '@/api/endpoints';
import { API_CONFIG } from '@/utils/constants';
import type { PaginatedResponse, ApiResponse } from '@/api/types';

// Re-export types
export type UMKM = UMKMType;
export type { UMKMCategory };

export interface UMKMFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  verified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UMKMStatistics {
  totalUmkm: number;
  verifiedUmkm: number;
  unverifiedUmkm: number;
  activeUmkm: number;
  inactiveUmkm: number;
  totalReviews: number;
  byCategory: Array<{
    categoryId: string;
    categoryName: string;
    count: number;
    percentage: number;
  }>;
  popularUmkm: any[];
  recentUmkm: any[];
}

export interface CreateUMKMData {
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  email?: string;
  website?: string;
  // Owner Information
  ownerName: string;
  ownerNik?: string;
  ownerBio?: string;
  ownerExperience?: string;
  ownerEducation?: string;
  // Business Information
  establishedDate?: string;
  registrationNumber?: string;
  licenseNumber?: string;
  taxNumber?: string;
  monthlyRevenue?: string;
  employeeCount?: number;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  operatingHours?: Record<string, { open: string; close: string }>;
}

export function useUMKM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const umkmService = new UMKMService();

  // Get paginated UMKM list
  const getUMKMs = useCallback(async (filters?: UMKMFilters): Promise<PaginatedResponse<UMKM>> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.getUMKMs(filters);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil data UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single UMKM by ID
  const getUMKM = useCallback(async (id: string): Promise<UMKM> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.getUMKM(id);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil data UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get published UMKM (Public - no auth required)
  const getPublishedUMKMs = useCallback(
    async (filters?: UMKMFilters): Promise<PaginatedResponse<UMKM>> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.getPublishedUMKMs(filters);
        return response;
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data UMKM');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get my UMKM submissions (authenticated user)
  const getMyUMKMs = useCallback(
    async (filters?: UMKMFilters): Promise<PaginatedResponse<UMKM>> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.getMyUMKMs(filters);
        return response;
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data UMKM Anda');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create new UMKM (Admin only)
  const createUMKM = useCallback(async (data: CreateUMKMData): Promise<UMKM> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.createUMKM(data);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal membuat UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit UMKM application (Citizens)
  const submitUMKM = useCallback(async (formData: FormData): Promise<UMKM> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.submitUMKM(formData);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal mengajukan UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update UMKM
  const updateUMKM = useCallback(async (id: string, data: Partial<UMKM>): Promise<UMKM> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.updateUMKM(id, data);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal mengupdate UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete UMKM
  const deleteUMKM = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await umkmService.deleteUMKM(id);
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get UMKM categories
  const getCategories = useCallback(async (): Promise<UMKMCategory[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/umkm/categories');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch categories');
      }
      const data = await response.json();
      return data.data || data;
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil kategori UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create UMKM category
  const createCategory = useCallback(
    async (data: {
      name: string;
      description?: string;
      icon?: string;
      color?: string;
      parentId?: string;
      displayOrder?: number;
    }): Promise<UMKMCategory> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.createCategory(data);
        return response;
      } catch (err: any) {
        setError(err.message || 'Gagal membuat kategori UMKM');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update UMKM category
  const updateCategory = useCallback(
    async (
      id: string,
      data: {
        name?: string;
        description?: string;
        icon?: string;
        color?: string;
        parentId?: string;
        displayOrder?: number;
      }
    ): Promise<UMKMCategory> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.updateCategory(id, data);
        return response;
      } catch (err: any) {
        setError(err.message || 'Gagal mengupdate kategori UMKM');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete UMKM category
  const deleteCategory = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await umkmService.deleteCategory(id);
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus kategori UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload category icon
  const uploadCategoryIcon = useCallback(
    async (id: string, file: File): Promise<{ iconUrl: string }> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.uploadCategoryIcon(id, file);
        return response;
      } catch (err: any) {
        setError(err.message || 'Gagal mengupload icon kategori');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get UMKM statistics
  const getStatistics = useCallback(async (): Promise<UMKMStatistics> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.getStatistics();
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil statistik UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify UMKM
  const verifyUMKM = useCallback(async (id: string): Promise<UMKM> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.verifyUMKM(id);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal memverifikasi UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reject UMKM
  const rejectUMKM = useCallback(async (id: string, reason: string): Promise<UMKM> => {
    setLoading(true);
    setError(null);
    try {
      const response = await umkmService.rejectUMKM(id, reason);
      return response;
    } catch (err: any) {
      setError(err.message || 'Gagal menolak UMKM');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload UMKM images
  const uploadImages = useCallback(
    async (id: string, files: File[]): Promise<{ images: string[] }> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.uploadImages(id, files);
        return response;
      } catch (err: any) {
        setError(err.message || 'Gagal mengupload gambar');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Upload documents for UMKM
  const uploadDocuments = useCallback(
    async (
      id: string,
      files: File[]
    ): Promise<{ documents: Array<{ name: string; url: string; type: string }> }> => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login kembali.');
        }

        const formData = new FormData();
        files.forEach((file) => {
          formData.append('documents', file);
        });

        const response = await fetch(
          `${API_CONFIG.BASE_URL}${UMKM_ENDPOINTS.UPLOAD_DOCUMENTS(id)}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              // Don't set Content-Type header - let browser set it with boundary for multipart/form-data
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal mengupload dokumen');
        }

        const result = await response.json();
        return result.data;
      } catch (err: any) {
        setError(err.message || 'Gagal mengupload dokumen');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete document from UMKM
  const deleteDocument = useCallback(async (id: string, documentName: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${UMKM_ENDPOINTS.DELETE_DOCUMENT(id, documentName)}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus dokumen');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus dokumen');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get documents for UMKM
  const getDocuments = useCallback(
    async (id: string): Promise<{ documents: any[]; totalDocuments: number }> => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login kembali.');
        }

        const response = await fetch(`${API_CONFIG.BASE_URL}${UMKM_ENDPOINTS.GET_DOCUMENTS(id)}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal mengambil dokumen');
        }

        const result = await response.json();
        return result.data;
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil dokumen');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Upload gallery images
  const uploadGalleryImages = useCallback(
    async (id: string, files: File[]): Promise<{ images: string[]; totalImages: number }> => {
      setLoading(true);
      setError(null);
      try {
        const response = await umkmService.uploadImages(id, files);
        return {
          images: response.images,
          totalImages: response.images.length,
        };
      } catch (err: any) {
        setError(err.message || 'Gagal mengupload gambar galeri');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete gallery image
  const deleteGalleryImage = useCallback(async (id: string, imageIndex: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await umkmService.deleteGalleryImage(id, imageIndex);
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus gambar galeri');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    // CRUD operations
    getUMKMs,
    getPublishedUMKMs,
    getMyUMKMs, // New method for user's own UMKM
    getUMKM,
    createUMKM,
    submitUMKM, // New method for citizen submission
    updateUMKM,
    deleteUMKM,
    // Category operations
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadCategoryIcon,
    // Additional operations
    getStatistics,
    verifyUMKM,
    rejectUMKM,
    uploadImages,
    uploadDocuments,
    getDocuments,
    deleteDocument,
    // Gallery operations
    uploadGalleryImages,
    deleteGalleryImage,
  };
}
