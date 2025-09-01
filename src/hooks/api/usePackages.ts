/**
 * Tourism Package Hooks
 * React Query hooks untuk tourism packages dan bookings
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tourismPackageService } from '@/api/services/tourismPackage.service';
import type {
  TourismPackage,
  TourismPackageFilters,
  TourismPackageStats,
  TourismPackageBooking,
  CreateTourismPackageRequest,
  UpdateTourismPackageRequest,
  PaginationParams,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

// Query keys for tourism packages
export const packageKeys = {
  all: ['tourism', 'packages'] as const,
  lists: () => [...packageKeys.all, 'list'] as const,
  list: (filters: TourismPackageFilters & PaginationParams) =>
    [...packageKeys.lists(), filters] as const,
  details: () => [...packageKeys.all, 'detail'] as const,
  detail: (id: string) => [...packageKeys.details(), id] as const,
  detailBySlug: (slug: string) => [...packageKeys.details(), 'slug', slug] as const,
  bookings: () => [...packageKeys.all, 'bookings'] as const,
  packageBookings: (packageId: string) => [...packageKeys.bookings(), packageId] as const,
  booking: (id: string) => [...packageKeys.bookings(), id] as const,
  stats: () => [...packageKeys.all, 'stats'] as const,
};

// =============================================================================
// TOURISM PACKAGES HOOKS
// =============================================================================

export function usePackages(params?: TourismPackageFilters & PaginationParams) {
  return useQuery({
    queryKey: packageKeys.list(params || {}),
    queryFn: () => tourismPackageService.getTourismPackages(params),
  });
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: packageKeys.detail(id),
    queryFn: () => tourismPackageService.getTourismPackage(id),
    enabled: !!id,
  });
}

export function usePackageBySlug(slug: string) {
  return useQuery({
    queryKey: packageKeys.detailBySlug(slug),
    queryFn: () => tourismPackageService.getTourismPackageBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTourismPackageRequest) => {
      const result = tourismPackageService.createTourismPackage(data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
      queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
    },
    onError: (error) => {
      console.error('❌ useCreatePackage onError triggered:', error);
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTourismPackageRequest) =>
      tourismPackageService.updateTourismPackage(data.id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: packageKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
      queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
    },
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tourismPackageService.deleteTourismPackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
      queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
    },
  });
}

// =============================================================================
// PACKAGE BOOKINGS HOOKS
// =============================================================================

export function usePackageBookings(packageId?: string, params?: PaginationParams) {
  return useQuery({
    queryKey: packageId ? packageKeys.packageBookings(packageId) : packageKeys.bookings(),
    queryFn: () =>
      packageId
        ? tourismPackageService.getPackageBookings(packageId, params)
        : tourismPackageService.getAllBookings(params),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: packageKeys.booking(id),
    queryFn: () => tourismPackageService.getBooking(id),
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: any // Will be properly typed when backend is ready
    ) => tourismPackageService.createBooking(data),
    onSuccess: (_, variables) => {
      if (variables.packageId) {
        queryClient.invalidateQueries({
          queryKey: packageKeys.packageBookings(variables.packageId),
        });
      }
      queryClient.invalidateQueries({ queryKey: packageKeys.bookings() });
      queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { id, ...data }: any // Will be properly typed when backend is ready
    ) => tourismPackageService.updateBooking(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: packageKeys.booking(variables.id) });
      queryClient.invalidateQueries({ queryKey: packageKeys.bookings() });
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tourismPackageService.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.bookings() });
      queryClient.invalidateQueries({ queryKey: packageKeys.stats() });
    },
  });
}

export function useAllPackageBookings() {
  return useQuery({
    queryKey: packageKeys.bookings(),
    queryFn: () => tourismPackageService.getAllBookings(),
  });
}

export function usePackageStats() {
  return useQuery({
    queryKey: packageKeys.stats(),
    queryFn: () => tourismPackageService.getPackageStats(),
  });
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

export function useFeaturedPackages() {
  return useQuery({
    queryKey: [...packageKeys.lists(), { isFeatured: true }],
    queryFn: () => tourismPackageService.getTourismPackages({ isFeatured: true }),
  });
}

export function useActivePackages() {
  return useQuery({
    queryKey: [...packageKeys.lists(), { isActive: true, status: 'published' }],
    queryFn: () =>
      tourismPackageService.getTourismPackages({
        isActive: true,
        status: 'published',
      }),
  });
}
