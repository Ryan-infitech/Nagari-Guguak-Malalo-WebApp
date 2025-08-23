/**
 * Main API Export
 * Central export untuk semua komponen API
 */

// =============================================================================
// CLIENT & CONFIGURATION
// =============================================================================

import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import {
  setupDefaultInterceptors,
  clearAllInterceptors,
  addRequestInterceptor,
  addResponseInterceptor,
  removeRequestInterceptor,
  removeResponseInterceptor,
} from './interceptors';

// =============================================================================
// SERVICES - Direct imports untuk menghindari circular dependency
// =============================================================================

import {
  authService,
  userService,
  articleService,
  announcementService,
  regulationService,
  reportService,
  initializeServices,
  cleanupServices,
} from './services';

// =============================================================================
// TYPES
// =============================================================================

export * from './types';

// =============================================================================
// CLIENT EXPORTS
// =============================================================================

export {
  // Main client
  apiClient,

  // Endpoints
  ENDPOINTS,

  // Interceptors
  setupDefaultInterceptors,
  clearAllInterceptors,
  addRequestInterceptor,
  addResponseInterceptor,
  removeRequestInterceptor,
  removeResponseInterceptor,
};

// =============================================================================
// SERVICE EXPORTS
// =============================================================================

export {
  // Individual services
  authService,
  userService,
  articleService,
  announcementService,
  regulationService,
  reportService,

  // Service management
  initializeServices,
  cleanupServices,
};

// =============================================================================
// API INITIALIZATION
// =============================================================================

/**
 * Initialize API dengan konfigurasi default
 */
export const initializeAPI = (): void => {
  // Setup default interceptors
  setupDefaultInterceptors();

  // Initialize services
  initializeServices();
};

/**
 * Cleanup API resources
 */
export const cleanupAPI = (): void => {
  clearAllInterceptors();
  cleanupServices();

  console.log('🧹 API cleaned up');
};

// =============================================================================
// CONVENIENCE API
// =============================================================================

/**
 * Main API object dengan semua functionality
 */
export const api = {
  // Client
  client: apiClient,

  // Services
  auth: authService,
  user: userService,
  article: articleService,
  announcement: announcementService,
  regulation: regulationService,
  report: reportService,

  // Endpoints
  endpoints: ENDPOINTS,

  // Management
  initialize: initializeAPI,
  cleanup: cleanupAPI,

  // Interceptors
  interceptors: {
    setup: setupDefaultInterceptors,
    clear: clearAllInterceptors,
    addRequest: addRequestInterceptor,
    addResponse: addResponseInterceptor,
    removeRequest: removeRequestInterceptor,
    removeResponse: removeResponseInterceptor,
  },
} as const;

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default api;
