/**
 * Report Hooks
 * Custom hooks for report-related operations using React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService } from '@/api/services/report.service';
import { ReportToasts } from '@/components/admin/shared/CustomToast';
import type {
  Report,
  ReportSummary,
  CreateReportRequest,
  UpdateReportRequest,
  ReportQuery,
} from '@/api/services/report.service';

// =============================================================================
// QUERY KEYS
// =============================================================================

export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (params?: ReportQuery) => [...reportKeys.lists(), params] as const,
  details: () => [...reportKeys.all, 'detail'] as const,
  detail: (id: string) => [...reportKeys.details(), id] as const,
  public: () => [...reportKeys.all, 'public'] as const,
  publicList: (params?: ReportQuery) => [...reportKeys.public(), 'list', params] as const,
  publicDetail: (id: string) => [...reportKeys.public(), 'detail', id] as const,
  featured: () => [...reportKeys.all, 'featured'] as const,
  search: (searchTerm: string) => [...reportKeys.all, 'search', searchTerm] as const,
  stats: () => [...reportKeys.all, 'stats'] as const,
} as const;

// =============================================================================
// PUBLIC HOOKS
// =============================================================================

/**
 * Get published reports (public)
 */
export function usePublishedReports(params?: ReportQuery) {
  return useQuery({
    queryKey: reportKeys.publicList(params),
    queryFn: () => reportService.getPublishedReports(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get featured reports (public)
 */
export function useFeaturedReports(limit: number = 5) {
  return useQuery({
    queryKey: reportKeys.featured(),
    queryFn: () => reportService.getFeaturedReports(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get single published report (public)
 */
export function usePublishedReport(id: string, includeViews: boolean = false) {
  return useQuery({
    queryKey: reportKeys.publicDetail(id),
    queryFn: () => reportService.getPublishedReportById(id, includeViews),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Search reports (public)
 */
export function useSearchReports(searchTerm: string, limit: number = 10) {
  return useQuery({
    queryKey: reportKeys.search(searchTerm),
    queryFn: () => reportService.searchReports(searchTerm, limit),
    enabled: !!searchTerm && searchTerm.trim().length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Download report mutation
 */
export function useDownloadReport() {
  return useMutation({
    mutationFn: reportService.downloadReport,
    onSuccess: () => {
      ReportToasts.success('Download count berhasil diperbarui');
    },
    onError: (error: any) => {
      ReportToasts.parseValidationError(error);
    },
  });
}

/**
 * Download report file mutation
 */
export function useDownloadReportFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, fileName }: { id: string; fileName?: string }) =>
      reportService.downloadReportFile(id, fileName),
    onSuccess: () => {
      ReportToasts.success('File berhasil diunduh');
      // Invalidate reports and statistics queries to update download counts
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.stats() });
    },
    onError: (error: any) => {
      console.error('Download file error:', error);
      ReportToasts.error(
        'Gagal mengunduh file',
        error.message || 'Terjadi kesalahan saat mengunduh file'
      );
    },
  });
}

// =============================================================================
// ADMIN HOOKS
// =============================================================================

/**
 * Get all reports (admin/staff)
 */
export function useReports(params?: ReportQuery) {
  return useQuery({
    queryKey: reportKeys.list(params),
    queryFn: () => reportService.getReports(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Get single report by ID (admin/staff)
 */
export function useReport(id: string, includeViews: boolean = false) {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => reportService.getReportById(id, includeViews),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Get report statistics (admin)
 */
export function useReportStatistics() {
  return useQuery({
    queryKey: reportKeys.stats(),
    queryFn: () => reportService.getReportStatistics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// =============================================================================
// MUTATION HOOKS
// =============================================================================

/**
 * Create report mutation
 */
export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.createReport,
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.stats() });

      // Use proper custom toast based on response data
      if (response?.data?.status && response?.data?.title) {
        ReportToasts.createdWithStatus(response.data.title, response.data.status);
      } else if (response?.data?.title) {
        ReportToasts.created(response.data.title);
      } else {
        ReportToasts.success('Laporan berhasil dibuat');
      }
    },
    onError: (error: any) => {
      ReportToasts.parseValidationError(error);
    },
  });
}

/**
 * Update report mutation
 */
export function useUpdateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReportRequest }) =>
      reportService.updateReport(id, data),
    onSuccess: (response, { id }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reportKeys.public() });

      // Use custom toast with proper title
      if (response?.data?.title) {
        ReportToasts.updated(response.data.title);
      } else {
        ReportToasts.success('Laporan berhasil diperbarui');
      }
    },
    onError: (error: any) => {
      ReportToasts.parseValidationError(error);
    },
  });
}

/**
 * Delete report mutation
 */
export function useDeleteReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.deleteReport,
    onSuccess: (response, id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.public() });
      queryClient.invalidateQueries({ queryKey: reportKeys.stats() });

      // Remove specific report from cache
      queryClient.removeQueries({ queryKey: reportKeys.detail(id) });

      // Use custom toast for delete success
      ReportToasts.success('Laporan berhasil dihapus');
    },
    onError: (error: any) => {
      ReportToasts.parseValidationError(error);
    },
  });
}

/**
 * Publish report mutation
 */
export function usePublishReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportService.publishReport,
    onSuccess: (response, id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reportKeys.public() });
      queryClient.invalidateQueries({ queryKey: reportKeys.featured() });
      queryClient.invalidateQueries({ queryKey: reportKeys.stats() });

      // Use custom toast for publish success
      if (response?.data?.title) {
        ReportToasts.published(response.data.title);
      } else {
        ReportToasts.success('Laporan berhasil dipublikasi');
      }
    },
    onError: (error: any) => {
      ReportToasts.parseValidationError(error);
    },
  });
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Prefetch report data
 */
export function usePrefetchReport() {
  const queryClient = useQueryClient();

  const prefetchReport = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: reportKeys.detail(id),
      queryFn: () => reportService.getReportById(id),
      staleTime: 2 * 60 * 1000,
    });
  };

  const prefetchPublishedReport = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: reportKeys.publicDetail(id),
      queryFn: () => reportService.getPublishedReportById(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    prefetchReport,
    prefetchPublishedReport,
  };
}

/**
 * Get cached report data
 */
export function useCachedReport(id: string) {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<any>(reportKeys.detail(id));
}

/**
 * Optimistic updates for report
 */
export function useOptimisticReport() {
  const queryClient = useQueryClient();

  const updateReportOptimistic = (id: string, updates: Partial<Report>) => {
    queryClient.setQueryData(reportKeys.detail(id), (old: any) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: { ...old.data, ...updates },
      };
    });
  };

  const incrementDownloads = (id: string) => {
    updateReportOptimistic(id, {
      downloads: (queryClient.getQueryData<any>(reportKeys.detail(id))?.data?.downloads || 0) + 1,
    });
  };

  return {
    updateReportOptimistic,
    incrementDownloads,
  };
}
