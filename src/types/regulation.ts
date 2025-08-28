/**
 * Regulation Types
 * Types for regulation management system
 */

// =============================================================================
// CORE REGULATION TYPES
// =============================================================================

export type RegulationType =
  | 'PERATURAN_DAERAH'
  | 'PERATURAN_BUPATI'
  | 'KEPUTUSAN_BUPATI'
  | 'SURAT_EDARAN'
  | 'INSTRUKSI'
  | 'PEDOMAN'
  | 'PETUNJUK_TEKNIS'
  | 'STANDAR_OPERASIONAL'
  | 'PERATURAN_NAGARI'
  | 'PERDA'
  | 'PERBUP'
  | 'KEPBUP'
  | 'SE'
  | 'OTHER';

export type RegulationStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

// =============================================================================
// REGULATION INTERFACES
// =============================================================================

export interface RegulationSummary {
  id: string;
  title: string;
  number: string;
  category: RegulationType;
  type?: string;
  status: RegulationStatus;
  priority?: Priority;
  description?: string;
  summary?: string;
  documentUrl?: string;
  downloads: number;
  views: number;
  publishedAt?: string;
  effectiveDate?: string;
  expiryDate?: string;
  tags?: string[];
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegulationDetail extends RegulationSummary {
  content: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  relatedRegulations?: string[];
  supersededBy?: string;
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
  createdBy: string;
}

// =============================================================================
// REQUEST/RESPONSE TYPES
// =============================================================================

export interface CreateRegulationRequest {
  title: string;
  number: string;
  category: RegulationType;
  type?: string;
  description?: string;
  content?: string;
  summary?: string;
  priority?: Priority;
  effectiveDate?: string;
  expiryDate?: string;
  tags?: string[];
  keywords?: string[];
  notes?: string;
  // File upload will be handled separately
}

export interface UpdateRegulationRequest extends Partial<CreateRegulationRequest> {
  id: string;
  status?: RegulationStatus;
}

export interface RegulationQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: RegulationType;
  type?: string;
  status?: RegulationStatus;
  priority?: Priority;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  publishedAfter?: string;
  publishedBefore?: string;
  tags?: string[];
  keywords?: string[];
}

export interface RegulationResponse {
  success: boolean;
  data: RegulationSummary[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

export interface SingleRegulationResponse {
  success: boolean;
  data: RegulationDetail;
  message?: string;
}

export interface CreateRegulationResponse {
  success: boolean;
  data: RegulationDetail;
  message: string;
}

export interface UpdateRegulationResponse {
  success: boolean;
  data: RegulationDetail;
  message: string;
}

export interface DeleteRegulationResponse {
  success: boolean;
  deleted: boolean;
  message: string;
}

export interface DownloadRegulationResponse {
  success: boolean;
  downloads: number;
  message?: string;
}

// =============================================================================
// REGULATION STATISTICS
// =============================================================================

export interface RegulationStatistics {
  total: number;
  published: number;
  draft: number;
  archived: number;
  byCategory: Record<RegulationType, number>;
  byType: Record<string, number>;
  byPriority: Record<Priority, number>;
  totalDownloads: number;
  totalViews: number;
  recentActivity: Array<{
    type: 'created' | 'updated' | 'published' | 'downloaded';
    regulation: {
      id: string;
      title: string;
      number: string;
    };
    user?: {
      id: string;
      name: string;
    };
    timestamp: string;
  }>;
}

// =============================================================================
// FORM VALIDATION TYPES
// =============================================================================

export interface RegulationFormErrors {
  title?: string;
  number?: string;
  category?: string;
  type?: string;
  description?: string;
  content?: string;
  summary?: string;
  priority?: string;
  effectiveDate?: string;
  expiryDate?: string;
  tags?: string;
  keywords?: string;
  notes?: string;
  general?: string;
}

export interface RegulationFormData {
  title: string;
  number: string;
  category: RegulationType;
  type: string;
  description: string;
  content: string;
  summary: string;
  priority: Priority;
  effectiveDate: string;
  expiryDate: string;
  tags: string[];
  keywords: string[];
  notes: string;
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

export interface RegulationListState {
  regulations: RegulationSummary[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  total: number;
  filters: {
    search: string;
    category: string;
    type: string;
    status: string;
    priority: string;
  };
}

export interface RegulationFormState {
  data: RegulationFormData;
  errors: RegulationFormErrors;
  loading: boolean;
  success: boolean;
  isDirty: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const REGULATION_TYPE_LABELS: Record<RegulationType, string> = {
  PERDA: 'Peraturan Daerah',
  PERATURAN_DAERAH: 'Peraturan Daerah',
  PERATURAN_BUPATI: 'Peraturan Bupati',
  KEPUTUSAN_BUPATI: 'Keputusan Bupati',
  SURAT_EDARAN: 'Surat Edaran',
  INSTRUKSI: 'Instruksi',
  PEDOMAN: 'Pedoman',
  PETUNJUK_TEKNIS: 'Petunjuk Teknis',
  STANDAR_OPERASIONAL: 'Standar Operasional Prosedur',
  PERATURAN_NAGARI: 'Peraturan Nagari',
  PERBUP: 'Peraturan Bupati',
  KEPBUP: 'Keputusan Bupati',
  SE: 'Surat Edaran',
  OTHER: 'Lainnya',
};

export const REGULATION_STATUS_LABELS: Record<RegulationStatus, string> = {
  DRAFT: 'Draft',
  ACTIVE: 'Aktif',
  ARCHIVED: 'Diarsipkan',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: 'Rendah',
  NORMAL: 'Normal',
  HIGH: 'Tinggi',
  URGENT: 'Mendesak',
};

export const REGULATION_TYPE_OPTIONS = Object.entries(REGULATION_TYPE_LABELS).map(
  ([value, label]) => ({ value: value as RegulationType, label })
);

export const PRIORITY_OPTIONS = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({
  value: value as Priority,
  label,
}));
