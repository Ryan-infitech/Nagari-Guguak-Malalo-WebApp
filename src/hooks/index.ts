/**
 * Main Hooks Index
 * Export semua hooks dari API dan UI
 */

// API Hooks
export * from './api';

// UI Hooks
export * from './ui';

// Quick imports untuk development
export {
  // Users
  useUsers,

  // Content Management
  useArticles,
  useAnnouncements,
  useEvents,

  // Services
  useDocuments,
  useTourism,
  useUMKM,

  // Admin & Analytics
  useAdmin,
  useAnalytics,
} from './api';

// Re-export UI hooks untuk convenience
export { useModal, useDebounce, useLocalStorage, usePagination, useToggle } from './ui';
