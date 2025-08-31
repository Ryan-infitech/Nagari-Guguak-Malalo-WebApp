/**
 * UI Hooks Exports
 * Centralized export untuk semua UI hooks
 */

// Modal management
export { useModal } from "./useModal";
export type { ModalState } from "./useModal";

// Debouncing
export {
  useDebounce,
  useDebounceCallback,
  useAsyncDebounce,
} from "./useDebounce";

// Storage hooks
export {
  useLocalStorage,
  useSessionStorage as useSessionStorageFromLocal,
  useStorageState,
} from "./useLocalStorage";

// Standalone session storage
export { useSessionStorage } from "./useSessionStorage";

// Pagination
export { usePagination } from "./usePagination";
export type {
  PaginationOptions,
  PaginationState,
  PaginationActions,
  PaginationReturn,
} from "./usePagination";

// Toggle states
export { useToggle, useMultiToggle, useToggleGroup } from "./useToggle";
export type { ToggleActions } from "./useToggle";

// Infinite scroll
export {
  useInfiniteScroll,
  useVirtualizedInfiniteScroll,
  useInfiniteScrollWithSearch,
  useScrollPosition,
  useScrollToTop,
} from "./useInfiniteScroll";

// Permissions & RBAC
export { usePermissions } from "./usePermissions";
export { PERMISSIONS, ROLES, ROLE_HIERARCHY } from "./usePermissions";
export type { Permission, Role, UserPermissions } from "./usePermissions";

// Form validation
export { useFormValidation } from "./useFormValidation";
export {
  VALIDATION_PATTERNS,
  VALIDATION_MESSAGES,
  COMMON_SCHEMAS,
} from "./useFormValidation";
export type {
  ValidationRule,
  ValidationSchema,
  FormState,
} from "./useFormValidation";

// Quick access untuk sering digunakan
export {
  useModal as modal,
  useDebounce as debounce,
  useLocalStorage as localStorage,
  usePagination as pagination,
  useToggle as toggle,
  usePermissions as permissions,
  useFormValidation as formValidation,
} from "./index";
