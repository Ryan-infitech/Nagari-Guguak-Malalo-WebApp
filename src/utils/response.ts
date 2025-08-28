/**
 * Response Utility Functions
 * Fungsi utility untuk standardisasi response API
 */

/**
 * Standard API Response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  timestamp?: string;
  requestId?: string;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  success: false;
  message: string;
  errors: string[];
  code?: string;
  statusCode?: number;
  timestamp: string;
  requestId?: string;
}

/**
 * Success response interface
 */
export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  timestamp: string;
  requestId?: string;
}

/**
 * Create success response
 */
export const createSuccessResponse = <T>(
  data: T,
  message: string = 'Success',
  meta?: ApiResponse<T>['meta']
): SuccessResponse<T> => {
  return {
    success: true,
    message,
    data,
    meta,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Create error response
 */
export const createErrorResponse = (
  message: string,
  errors: string[] = [],
  code?: string,
  statusCode?: number
): ErrorResponse => {
  return {
    success: false,
    message,
    errors: errors.length > 0 ? errors : [message],
    code,
    statusCode,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Create paginated response
 */
export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Data retrieved successfully'
): SuccessResponse<T[]> => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    success: true,
    message,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Check if response is successful
 */
export const isSuccessResponse = <T>(response: any): response is SuccessResponse<T> => {
  return response && response.success === true;
};

/**
 * Check if response is error
 */
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return response && response.success === false;
};

/**
 * Extract data from response safely
 */
export const extractResponseData = <T>(response: ApiResponse<T>): T | null => {
  if (isSuccessResponse(response)) {
    return response.data ?? null;
  }
  return null;
};

/**
 * Extract error message from response
 */
export const extractErrorMessage = (response: any): string => {
  if (isErrorResponse(response)) {
    return response.message;
  }

  if (response?.message) {
    return response.message;
  }

  return 'Terjadi kesalahan yang tidak diketahui';
};

/**
 * Extract error messages array from response
 */
export const extractErrorMessages = (response: any): string[] => {
  if (isErrorResponse(response)) {
    return response.errors || [response.message];
  }

  if (response?.errors && Array.isArray(response.errors)) {
    return response.errors;
  }

  if (response?.message) {
    return [response.message];
  }

  return ['Terjadi kesalahan yang tidak diketahui'];
};

/**
 * Handle API response and return standardized format
 */
export const handleApiResponse = async <T>(
  responsePromise: Promise<Response>
): Promise<ApiResponse<T>> => {
  try {
    const response = await responsePromise;
    const data = await response.json();

    if (!response.ok) {
      return createErrorResponse(
        data.message || 'Request failed',
        data.errors || [],
        data.code,
        response.status
      );
    }

    // If the response already has the correct format, return it
    if (data.success !== undefined) {
      return data;
    }

    // Otherwise, wrap the data in success response
    return createSuccessResponse(data);
  } catch (error) {
    return createErrorResponse('Network error or invalid JSON response', [
      error instanceof Error ? error.message : 'Unknown error',
    ]);
  }
};

/**
 * Transform response data
 */
export const transformResponseData = <T, U>(
  response: ApiResponse<T>,
  transformer: (data: T) => U
): ApiResponse<U> => {
  if (isSuccessResponse(response)) {
    return {
      ...response,
      data: transformer(response.data!),
    };
  }

  return response as ErrorResponse;
};

/**
 * Merge multiple responses
 */
export const mergeResponses = <T>(responses: ApiResponse<T>[]): ApiResponse<T[]> => {
  const successResponses = responses.filter(isSuccessResponse);
  const errorResponses = responses.filter(isErrorResponse);

  if (errorResponses.length > 0) {
    const allErrors = errorResponses.flatMap((r) => r.errors);
    return createErrorResponse('One or more requests failed', allErrors);
  }

  const allData = successResponses.map((r) => r.data!);
  return createSuccessResponse(allData, 'All requests completed successfully');
};

/**
 * Validate response structure
 */
export const validateResponseStructure = (
  response: any
): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (typeof response !== 'object' || response === null) {
    errors.push('Response must be an object');
    return { valid: false, errors };
  }

  if (typeof response.success !== 'boolean') {
    errors.push('Response must have a boolean success field');
  }

  if (typeof response.message !== 'string') {
    errors.push('Response must have a string message field');
  }

  if (response.success && response.data === undefined) {
    errors.push('Success response must have data field');
  }

  if (!response.success && !Array.isArray(response.errors)) {
    errors.push('Error response must have errors array field');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Cache response with TTL
 */
export class ResponseCache {
  private cache = new Map<string, { data: any; expiry: number }>();

  set<T>(key: string, response: ApiResponse<T>, ttlMs: number = 300000): void {
    this.cache.set(key, {
      data: response,
      expiry: Date.now() + ttlMs,
    });
  }

  get<T>(key: string): ApiResponse<T> | null {
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Create a global response cache instance
 */
export const responseCache = new ResponseCache();

/**
 * Response interceptor for logging
 */
export const logResponse = <T>(response: ApiResponse<T>, context?: string): ApiResponse<T> => {
  const prefix = context ? `[${context}]` : '[API]';

  if (isSuccessResponse(response)) {
    console.log(`${prefix} Success:`, {
      message: response.message,
      dataType: typeof response.data,
      timestamp: response.timestamp,
    });
  } else {
    const errorResponse = response as ErrorResponse;
    console.error(`${prefix} Error:`, {
      message: response.message,
      errors: errorResponse.errors,
      code: errorResponse.code,
      statusCode: errorResponse.statusCode,
      timestamp: errorResponse.timestamp,
    });
  }

  return response;
};

/**
 * Response metrics collector
 */
export class ResponseMetrics {
  private metrics = {
    total: 0,
    success: 0,
    error: 0,
    responseTime: [] as number[],
  };

  record(response: ApiResponse, responseTime?: number): void {
    this.metrics.total++;

    if (isSuccessResponse(response)) {
      this.metrics.success++;
    } else {
      this.metrics.error++;
    }

    if (responseTime) {
      this.metrics.responseTime.push(responseTime);
    }
  }

  getStats() {
    const avgResponseTime =
      this.metrics.responseTime.length > 0
        ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length
        : 0;

    return {
      total: this.metrics.total,
      success: this.metrics.success,
      error: this.metrics.error,
      successRate: this.metrics.total > 0 ? (this.metrics.success / this.metrics.total) * 100 : 0,
      avgResponseTime: Math.round(avgResponseTime),
    };
  }

  reset(): void {
    this.metrics = {
      total: 0,
      success: 0,
      error: 0,
      responseTime: [],
    };
  }
}

/**
 * Create a global metrics instance
 */
export const responseMetrics = new ResponseMetrics();

/**
 * Response status code helpers
 */
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Get status code message in Indonesian
 */
export const getStatusCodeMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    [STATUS_CODES.OK]: 'Berhasil',
    [STATUS_CODES.CREATED]: 'Data berhasil dibuat',
    [STATUS_CODES.NO_CONTENT]: 'Tidak ada konten',
    [STATUS_CODES.BAD_REQUEST]: 'Permintaan tidak valid',
    [STATUS_CODES.UNAUTHORIZED]: 'Tidak memiliki akses',
    [STATUS_CODES.FORBIDDEN]: 'Akses ditolak',
    [STATUS_CODES.NOT_FOUND]: 'Data tidak ditemukan',
    [STATUS_CODES.METHOD_NOT_ALLOWED]: 'Metode tidak diizinkan',
    [STATUS_CODES.CONFLICT]: 'Terjadi konflik data',
    [STATUS_CODES.UNPROCESSABLE_ENTITY]: 'Data tidak dapat diproses',
    [STATUS_CODES.TOO_MANY_REQUESTS]: 'Terlalu banyak permintaan',
    [STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Terjadi kesalahan server',
    [STATUS_CODES.BAD_GATEWAY]: 'Gateway bermasalah',
    [STATUS_CODES.SERVICE_UNAVAILABLE]: 'Layanan tidak tersedia',
    [STATUS_CODES.GATEWAY_TIMEOUT]: 'Gateway timeout',
  };

  return messages[statusCode] || 'Status tidak dikenal';
};
