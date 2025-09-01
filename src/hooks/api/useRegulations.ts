/**
 * Regulation Hooks
 * Custom hooks for regulation-related operations using React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { regulationService } from '@/api/services/regulation.service';
import type {
  Regulation,
  CreateRegulationRequest,
  UpdateRegulationRequest,
  RegulationQuery,
} from '@/api/services/regulation.service';

// =============================================================================
// QUERY KEYS
// =============================================================================

export const regulationKeys = {
  all: ['regulations'] as const,
  lists: () => [...regulationKeys.all, 'list'] as const,
  list: (params?: RegulationQuery) => [...regulationKeys.lists(), params] as const,
  details: () => [...regulationKeys.all, 'detail'] as const,
  detail: (id: string) => [...regulationKeys.details(), id] as const,
  public: () => [...regulationKeys.all, 'public'] as const,
  publicList: (params?: RegulationQuery) => [...regulationKeys.public(), 'list', params] as const,
  publicDetail: (id: string) => [...regulationKeys.public(), 'detail', id] as const,
  search: (searchTerm: string) => [...regulationKeys.all, 'search', searchTerm] as const,
  stats: () => [...regulationKeys.all, 'stats'] as const,
} as const;

// =============================================================================
// PUBLIC HOOKS
// =============================================================================

/**
 * Get published regulations (public)
 */
export function usePublishedRegulations(params?: RegulationQuery) {
  return useQuery({
    queryKey: regulationKeys.publicList(params),
    queryFn: () => regulationService.getPublicRegulations(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get single published regulation (public)
 */
export function usePublishedRegulation(id: string, includeViews: boolean = false) {
  return useQuery({
    queryKey: regulationKeys.publicDetail(id),
    queryFn: () => regulationService.getPublicRegulation(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Search regulations (public) - not implemented in service yet
 */
export function useSearchRegulations(searchTerm: string, limit: number = 10) {
  return useQuery({
    queryKey: regulationKeys.search(searchTerm),
    queryFn: () => regulationService.getPublicRegulations({ search: searchTerm, limit }),
    enabled: !!searchTerm && searchTerm.trim().length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Download regulation mutation
 */
export function useDownloadRegulation() {
  return useMutation({
    mutationFn: regulationService.downloadRegulation,
    onSuccess: () => {
      toast.success('Peraturan berhasil diunduh');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal mengunduh peraturan');
    },
  });
}

// =============================================================================
// ADMIN HOOKS
// =============================================================================

/**
 * Get all regulations (admin/staff)
 */
export function useRegulations(params?: RegulationQuery) {
  return useQuery({
    queryKey: regulationKeys.list(params),
    queryFn: () => regulationService.getRegulations(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get single regulation by ID (admin/staff)
 */
export function useRegulation(id: string, includeViews: boolean = false) {
  return useQuery({
    queryKey: regulationKeys.detail(id),
    queryFn: () => regulationService.getRegulation(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get regulation statistics (admin)
 */
export function useRegulationStatistics() {
  return useQuery({
    queryKey: regulationKeys.stats(),
    queryFn: () => regulationService.getStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// =============================================================================
// MUTATION HOOKS
// =============================================================================

/**
 * Create regulation mutation
 */
export function useCreateRegulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: regulationService.createRegulation,
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: regulationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: regulationKeys.stats() });

      toast.success(response.message || 'Peraturan berhasil dibuat');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal membuat peraturan');
    },
  });
}

/**
 * Update regulation mutation
 */
export function useUpdateRegulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRegulationRequest }) =>
      regulationService.updateRegulation(id, data),
    onSuccess: (response, { id }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: regulationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: regulationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: regulationKeys.public() });

      toast.success(response.message || 'Peraturan berhasil diperbarui');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal memperbarui peraturan');
    },
  });
}

/**
 * Delete regulation mutation
 */
export function useDeleteRegulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: regulationService.deleteRegulation,
    onSuccess: (response, id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: regulationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: regulationKeys.public() });
      queryClient.invalidateQueries({ queryKey: regulationKeys.stats() });

      // Remove specific regulation from cache
      queryClient.removeQueries({ queryKey: regulationKeys.detail(id) });

      toast.success(response.message || 'Peraturan berhasil dihapus');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal menghapus peraturan');
    },
  });
}

/**
 * Publish regulation mutation
 */
export function usePublishRegulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: regulationService.publishRegulation,
    onSuccess: (response, id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: regulationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: regulationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: regulationKeys.public() });
      queryClient.invalidateQueries({ queryKey: regulationKeys.stats() });

      toast.success(response.message || 'Peraturan berhasil dipublikasi');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Gagal mempublikasi peraturan');
    },
  });
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Prefetch regulation data
 */
export function usePrefetchRegulation() {
  const queryClient = useQueryClient();

  const prefetchRegulation = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: regulationKeys.detail(id),
      queryFn: () => regulationService.getRegulation(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchPublishedRegulation = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: regulationKeys.publicDetail(id),
      queryFn: () => regulationService.getPublicRegulation(id),
      staleTime: 10 * 60 * 1000,
    });
  };

  return {
    prefetchRegulation,
    prefetchPublishedRegulation,
  };
}

/**
 * Get cached regulation data
 */
export function useCachedRegulation(id: string) {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<any>(regulationKeys.detail(id));
}

/**
 * Optimistic updates for regulation
 */
export function useOptimisticRegulation() {
  const queryClient = useQueryClient();

  const updateRegulationOptimistic = (id: string, updates: Partial<Regulation>) => {
    queryClient.setQueryData(regulationKeys.detail(id), (old: any) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: { ...old.data, ...updates },
      };
    });
  };

  const incrementDownloads = (id: string) => {
    updateRegulationOptimistic(id, {
      downloads:
        (queryClient.getQueryData<any>(regulationKeys.detail(id))?.data?.downloads || 0) + 1,
    });
  };

  return {
    updateRegulationOptimistic,
    incrementDownloads,
  };
}
