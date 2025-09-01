/**
 * useTourism Hook
 * React Query hook untuk tourism operations
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tourismService } from '@/api/services';
import { showErrorToast, showSuccessToast } from '@/components/admin/shared/CustomToast';
import type {
  TourismDestination as TourismDestinationType,
  TourismPackage,
  TourismReview,
  TourismSearchRequest,
  CreateTourismReviewRequest,
} from '@/api/types/tourism';
import type { SearchParams } from '@/api/types/common';

// Tourism Query Keys
export const tourismKeys = {
  all: ['tourism'] as const,
  destinations: () => [...tourismKeys.all, 'destinations'] as const,
  destination: (id: string) => [...tourismKeys.destinations(), id] as const,
  destinationBySlug: (slug: string) => [...tourismKeys.destinations(), 'slug', slug] as const,
  adminDestinations: () => [...tourismKeys.destinations(), 'admin'] as const,
  featured: () => [...tourismKeys.destinations(), 'featured'] as const,
  popular: () => [...tourismKeys.destinations(), 'popular'] as const,
  packages: () => [...tourismKeys.all, 'packages'] as const,
  package: (id: string) => [...tourismKeys.packages(), id] as const,
  packageBySlug: (slug: string) => [...tourismKeys.packages(), 'slug', slug] as const,
  adminPackages: () => [...tourismKeys.packages(), 'admin'] as const,
  packageBookings: (packageId: string) => [...tourismKeys.package(packageId), 'bookings'] as const,
  bookings: () => [...tourismKeys.all, 'bookings'] as const,
  booking: (id: string) => [...tourismKeys.bookings(), id] as const,
  userBookings: (userId: string) => [...tourismKeys.bookings(), 'user', userId] as const,
  packageStats: () => [...tourismKeys.packages(), 'stats'] as const,
  reviews: () => [...tourismKeys.all, 'reviews'] as const,
  destinationReviews: (destinationId: string) =>
    [...tourismKeys.reviews(), 'destination', destinationId] as const,
  adminReviews: () => [...tourismKeys.reviews(), 'admin'] as const,
  gallery: () => [...tourismKeys.all, 'gallery'] as const,
  galleryPhotoLike: (photoId: string, deviceFingerprint: string) =>
    [...tourismKeys.gallery(), 'like', photoId, deviceFingerprint] as const,
  statistics: () => [...tourismKeys.all, 'statistics'] as const,
  analytics: () => [...tourismKeys.all, 'analytics'] as const,
  categories: () => [...tourismKeys.all, 'categories'] as const,
};

// =============================================================================
// TOURISM DESTINATION HOOKS
// =============================================================================

/**
 * Get all tourism destinations (public)
 */
export function useTourismDestinations(params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.destinations(), params],
    queryFn: () => tourismService.getDestinations(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get featured tourism destinations
 */
export function useFeaturedDestinations() {
  return useQuery({
    queryKey: tourismKeys.featured(),
    queryFn: () => tourismService.getFeaturedDestinations(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get popular tourism destinations
 */
export function usePopularDestinations() {
  return useQuery({
    queryKey: tourismKeys.popular(),
    queryFn: () => tourismService.getPopularDestinations(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get tourism destination by ID
 */
export function useTourismDestination(id: string) {
  return useQuery({
    queryKey: tourismKeys.destination(id),
    queryFn: () => tourismService.getDestination(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get tourism destination by slug
 */
export function useTourismDestinationBySlug(slug: string) {
  return useQuery({
    queryKey: tourismKeys.destinationBySlug(slug),
    queryFn: () => tourismService.getDestinationBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Search tourism destinations
 */
export function useSearchTourismDestinations(searchParams: TourismSearchRequest) {
  return useQuery({
    queryKey: [...tourismKeys.destinations(), 'search', searchParams],
    queryFn: () => tourismService.searchDestinations(searchParams),
    enabled: !!searchParams,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
}

// =============================================================================
// ADMIN DESTINATION HOOKS
// =============================================================================

/**
 * Get all destinations for admin
 */
export function useAdminTourismDestinations(params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.adminDestinations(), params],
    queryFn: () => tourismService.getAdminDestinations(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Create tourism destination mutation
 */
export function useCreateTourismDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourismService.createDestination,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.destinations() });
      queryClient.invalidateQueries({ queryKey: tourismKeys.adminDestinations() });
      showSuccessToast('Destinasi wisata berhasil dibuat');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal membuat destinasi wisata',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Update tourism destination mutation
 */
export function useUpdateTourismDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      tourismService.updateDestination(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.destinations() });
      queryClient.invalidateQueries({ queryKey: tourismKeys.adminDestinations() });
      queryClient.invalidateQueries({ queryKey: tourismKeys.destination(variables.id) });
      showSuccessToast('Destinasi wisata berhasil diperbarui');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal memperbarui destinasi wisata',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Delete tourism destination mutation
 */
export function useDeleteTourismDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourismService.deleteDestination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.destinations() });
      queryClient.invalidateQueries({ queryKey: tourismKeys.adminDestinations() });
      showSuccessToast('Destinasi wisata berhasil dihapus');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal menghapus destinasi wisata',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Upload destination photos mutation
 */
export function useUploadDestinationPhotos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, photos }: { id: string; photos: File[] }) =>
      tourismService.uploadDestinationPhotos(id, photos),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.destination(variables.id) });
      queryClient.invalidateQueries({ queryKey: tourismKeys.gallery() });
      showSuccessToast('Foto berhasil diunggah');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal mengunggah foto',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

// =============================================================================
// TOURISM PACKAGE HOOKS
// =============================================================================

/**
 * Get all tourism packages
 */
export function useTourismPackages(params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.packages(), params],
    queryFn: () => tourismService.getPackages(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get tourism package by ID
 */
export function useTourismPackage(id: string) {
  return useQuery({
    queryKey: tourismKeys.package(id),
    queryFn: () => tourismService.getPackage(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// =============================================================================
// TOURISM REVIEW HOOKS
// =============================================================================

/**
 * Get reviews for a destination
 */
export function useDestinationReviews(destinationId: string, params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.destinationReviews(destinationId), params],
    queryFn: () => tourismService.getDestinationReviews(destinationId, params),
    enabled: !!destinationId,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Get all reviews for admin
 */
export function useAdminTourismReviews(params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.adminReviews(), params],
    queryFn: () => tourismService.getAdminReviews(params),
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Add review mutation
 */
export function useAddTourismReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      destinationId,
      reviewData,
    }: {
      destinationId: string;
      reviewData: CreateTourismReviewRequest;
    }) => tourismService.addReview(destinationId, reviewData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: tourismKeys.destinationReviews(variables.destinationId),
      });
      queryClient.invalidateQueries({ queryKey: tourismKeys.adminReviews() });
      queryClient.invalidateQueries({ queryKey: tourismKeys.destination(variables.destinationId) });
      showSuccessToast('Ulasan berhasil ditambahkan');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal menambahkan ulasan',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Upload review media mutation
 */
export function useUploadReviewMedia() {
  return useMutation({
    mutationFn: (files: File[]) => tourismService.uploadReviewMedia(files),
    onError: (error: any) => {
      showErrorToast(
        'Gagal mengupload media',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Approve review mutation
 */
export function useApproveTourismReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourismService.approveReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.reviews() });
      showSuccessToast('Ulasan berhasil disetujui');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal menyetujui ulasan',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Reject review mutation
 */
export function useRejectTourismReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reason }: { reviewId: string; reason?: string }) =>
      tourismService.rejectReview(reviewId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.reviews() });
      showSuccessToast('Ulasan berhasil ditolak');
    },
    onError: (error: any) => {
      showErrorToast('Gagal menolak ulasan', error?.response?.data?.message || 'Terjadi kesalahan');
    },
  });
}

/**
 * Delete review mutation
 */
export function useDeleteTourismReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourismService.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.reviews() });
      showSuccessToast('Ulasan berhasil dihapus');
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal menghapus ulasan',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

// =============================================================================
// TOURISM ENGAGEMENT HOOKS
// =============================================================================

/**
 * Toggle destination like mutation
 */
export function useToggleDestinationLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourismService.toggleDestinationLike,
    onSuccess: (data, destinationId) => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.destination(destinationId) });
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal mengubah status like',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

/**
 * Toggle destination bookmark mutation
 */
export function useToggleDestinationBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourismService.toggleDestinationBookmark,
    onSuccess: (data, destinationId) => {
      queryClient.invalidateQueries({ queryKey: tourismKeys.destination(destinationId) });
    },
    onError: (error: any) => {
      showErrorToast(
        'Gagal mengubah status bookmark',
        error?.response?.data?.message || 'Terjadi kesalahan'
      );
    },
  });
}

// =============================================================================
// TOURISM DATA HOOKS
// =============================================================================

/**
 * Get tourism gallery
 */
export function useTourismGallery(params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.gallery(), params],
    queryFn: () => tourismService.getGallery(params),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Get tourism statistics
 */
export function useTourismStatistics() {
  return useQuery({
    queryKey: tourismKeys.statistics(),
    queryFn: () => tourismService.getStatistics(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Get tourism analytics (admin)
 */
export function useTourismAnalytics(params?: SearchParams) {
  return useQuery({
    queryKey: [...tourismKeys.analytics(), params],
    queryFn: () => tourismService.getAnalytics(params),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get tourism categories
 */
export function useTourismCategories() {
  return useQuery({
    queryKey: tourismKeys.categories(),
    queryFn: () => tourismService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// =============================================================================
// GALLERY HOOKS
// =============================================================================

/**
 * Get destination gallery photos
 */
export function useDestinationGallery(
  destinationId: string,
  params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
  }
) {
  return useQuery({
    queryKey: [...tourismKeys.gallery(), 'destination', destinationId, params],
    queryFn: () => tourismService.getDestinationGallery(destinationId, params),
    enabled: !!destinationId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Upload photos to destination gallery
 */
export function useUploadGalleryPhotos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      destinationId,
      files,
      metadata,
    }: {
      destinationId: string;
      files: File[];
      metadata?: {
        title?: string;
        description?: string;
        photographer?: string;
      };
    }) => tourismService.uploadGalleryPhotos(destinationId, files, metadata),
    onSuccess: (data, variables) => {
      // Invalidate gallery queries for this destination
      queryClient.invalidateQueries({
        queryKey: [...tourismKeys.gallery(), 'destination', variables.destinationId],
      });
      // Also invalidate the destination data to refresh gallery count
      queryClient.invalidateQueries({
        queryKey: tourismKeys.destination(variables.destinationId),
      });
      showSuccessToast(`${variables.files.length} foto berhasil diupload ke galeri!`);
    },
    onError: (error: any) => {
      console.error('Error uploading gallery photos:', error);
      showErrorToast(error?.message || 'Gagal mengupload foto ke galeri');
    },
  });
}

/**
 * Delete gallery photo
 */
export function useDeleteGalleryPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: string) => tourismService.deleteGalleryPhoto(photoId),
    onSuccess: (data, photoId) => {
      // Invalidate all gallery queries to refresh data
      queryClient.invalidateQueries({
        queryKey: tourismKeys.gallery(),
      });
      // Also invalidate destination queries to refresh gallery count
      queryClient.invalidateQueries({
        queryKey: tourismKeys.destinations(),
      });
      showSuccessToast('Foto berhasil dihapus dari galeri!');
    },
    onError: (error: any) => {
      console.error('Error deleting gallery photo:', error);
      showErrorToast(error?.message || 'Gagal menghapus foto dari galeri');
    },
  });
}

// =============================================================================
// LEGACY HOOKS (Untuk kompatibilitas)
// =============================================================================

export interface TourismDestination {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  images: string[];
  facilities: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useTourism() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDestinations = useCallback(async (): Promise<TourismDestination[]> => {
    setLoading(true);
    try {
      const response = await tourismService.getDestinations();
      return (response?.data as TourismDestination[]) || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createDestination = useCallback(
    async (data: Partial<TourismDestination>): Promise<TourismDestination> => {
      setLoading(true);
      try {
        const response = await tourismService.createDestination(data as any);
        return response?.data as TourismDestination;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, getDestinations, createDestination };
}

// =============================================================================
// GALLERY PHOTO LIKE HOOKS
// =============================================================================

/**
 * Check if device has liked a gallery photo
 */
export function useGalleryPhotoLike(photoId: string, deviceFingerprint: string) {
  return useQuery({
    queryKey: tourismKeys.galleryPhotoLike(photoId, deviceFingerprint),
    queryFn: () => tourismService.checkGalleryPhotoLike(photoId, deviceFingerprint),
    enabled: Boolean(photoId && deviceFingerprint),
    staleTime: 0, // Always check fresh data for likes
    refetchOnWindowFocus: false,
  });
}

/**
 * Like gallery photo mutation
 */
export function useLikeGalleryPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      photoId,
      deviceFingerprint,
    }: {
      photoId: string;
      deviceFingerprint: string;
    }) => {
      return tourismService.likeGalleryPhoto(photoId, deviceFingerprint);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch the like status
      queryClient.invalidateQueries({
        queryKey: tourismKeys.galleryPhotoLike(variables.photoId, variables.deviceFingerprint),
      });

      // Update gallery data if available
      queryClient.invalidateQueries({
        queryKey: tourismKeys.gallery(),
      });

      // Remove toast notification from here to avoid double notifications
      // showSuccessToast('Foto berhasil disukai!');
    },
    onError: (error: any) => {
      // Keep error notification in hook
      const message = error?.response?.data?.message || 'Gagal menyukai foto';
      showErrorToast(message);
    },
  });
}

/**
 * Unlike gallery photo mutation
 */
export function useUnlikeGalleryPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      photoId,
      deviceFingerprint,
    }: {
      photoId: string;
      deviceFingerprint: string;
    }) => {
      return tourismService.unlikeGalleryPhoto(photoId, deviceFingerprint);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch the like status
      queryClient.invalidateQueries({
        queryKey: tourismKeys.galleryPhotoLike(variables.photoId, variables.deviceFingerprint),
      });

      // Update gallery data if available
      queryClient.invalidateQueries({
        queryKey: tourismKeys.gallery(),
      });

      // Remove toast notification from here to avoid double notifications
      // showSuccessToast('Like berhasil dihapus!');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Gagal menghapus like';
      showErrorToast(message);
    },
  });
}

/**
 * Increment gallery photo views mutation
 */
export function useIncrementGalleryPhotoViews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      photoId,
      deviceFingerprint,
    }: {
      photoId: string;
      deviceFingerprint?: string;
    }) => {
      return tourismService.incrementGalleryPhotoViews(photoId, deviceFingerprint);
    },
    onSuccess: (data, variables) => {
      // Invalidate gallery data to refresh views count
      queryClient.invalidateQueries({
        queryKey: tourismKeys.gallery(),
      });

      // Also invalidate destination gallery data
      queryClient.invalidateQueries({
        queryKey: [...tourismKeys.gallery(), 'destination'],
      });

      // No toast notification for views tracking (silent operation)
    },
    onError: (error: any) => {
      // Log error but don't show toast to user (silent operation)
      console.error('Error incrementing gallery photo views:', error);
    },
  });
}
