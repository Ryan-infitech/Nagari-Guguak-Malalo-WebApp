/**
 * usePermissions Hook
 * Hook untuk RBAC (Role-Based Access Control) permissions check
 */

import { useState, useEffect, useCallback, useMemo } from "react";

// Types
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  level: number;
}

export interface UserPermissions {
  userId: string;
  role: Role;
  additionalPermissions: Permission[];
  deniedPermissions: Permission[];
}

// Permission constants
export const PERMISSIONS = {
  // User Management
  USER_READ: "user:read",
  USER_CREATE: "user:create",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  // Article Management
  ARTICLE_READ: "article:read",
  ARTICLE_CREATE: "article:create",
  ARTICLE_UPDATE: "article:update",
  ARTICLE_DELETE: "article:delete",
  ARTICLE_PUBLISH: "article:publish",

  // Document Services
  DOCUMENT_READ: "document:read",
  DOCUMENT_CREATE: "document:create",
  DOCUMENT_UPDATE: "document:update",
  DOCUMENT_DELETE: "document:delete",
  DOCUMENT_APPROVE: "document:approve",
  DOCUMENT_REJECT: "document:reject",

  // Tourism Management
  TOURISM_READ: "tourism:read",
  TOURISM_CREATE: "tourism:create",
  TOURISM_UPDATE: "tourism:update",
  TOURISM_DELETE: "tourism:delete",

  // UMKM Management
  UMKM_READ: "umkm:read",
  UMKM_CREATE: "umkm:create",
  UMKM_UPDATE: "umkm:update",
  UMKM_DELETE: "umkm:delete",
  UMKM_APPROVE: "umkm:approve",

  // Admin Functions
  ADMIN_DASHBOARD: "admin:dashboard",
  ADMIN_SETTINGS: "admin:settings",
  ADMIN_ANALYTICS: "admin:analytics",
  ADMIN_REPORTS: "admin:reports",

  // System Functions
  SYSTEM_BACKUP: "system:backup",
  SYSTEM_MAINTENANCE: "system:maintenance",
  SYSTEM_LOGS: "system:logs",
} as const;

// Role constants
export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  STAFF: "STAFF",
  RESIDENT: "RESIDENT",
  BUSINESS_OWNER: "BUSINESS_OWNER",
  VISITOR: "VISITOR",
} as const;

// Role hierarchy (higher number = more privileges)
export const ROLE_HIERARCHY = {
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.ADMIN]: 80,
  [ROLES.MODERATOR]: 60,
  [ROLES.STAFF]: 40,
  [ROLES.BUSINESS_OWNER]: 30,
  [ROLES.RESIDENT]: 20,
  [ROLES.VISITOR]: 10,
} as const;

export function usePermissions(userId?: string) {
  const [userPermissions, setUserPermissions] =
    useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user permissions
  const loadUserPermissions = useCallback(async (id?: string) => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock data - replace with actual API call
      const mockPermissions: UserPermissions = {
        userId: id,
        role: {
          id: "1",
          name: ROLES.ADMIN,
          description: "Administrator dengan akses penuh",
          level: ROLE_HIERARCHY[ROLES.ADMIN],
          permissions: [
            {
              id: "1",
              name: "Read Users",
              resource: "user",
              action: "read",
              description: "Dapat melihat daftar pengguna",
            },
            {
              id: "2",
              name: "Create Users",
              resource: "user",
              action: "create",
              description: "Dapat membuat pengguna baru",
            },
            {
              id: "3",
              name: "Manage Articles",
              resource: "article",
              action: "*",
              description: "Dapat mengelola artikel",
            },
          ],
        },
        additionalPermissions: [],
        deniedPermissions: [],
      };

      setUserPermissions(mockPermissions);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal memuat permissions";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load permissions on mount or userId change
  useEffect(() => {
    loadUserPermissions(userId);
  }, [userId, loadUserPermissions]);

  // Get all user permissions (role + additional - denied)
  const allPermissions = useMemo(() => {
    if (!userPermissions) return [];

    const rolePermissions = userPermissions.role.permissions;
    const additional = userPermissions.additionalPermissions;
    const denied = userPermissions.deniedPermissions.map((p) => p.name);

    const combined = [...rolePermissions, ...additional].filter(
      (permission) => !denied.includes(permission.name)
    );

    // Remove duplicates
    const unique = combined.filter(
      (permission, index, self) =>
        index === self.findIndex((p) => p.name === permission.name)
    );

    return unique;
  }, [userPermissions]);

  // Check if user has specific permission
  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!userPermissions) return false;

      // Super admin has all permissions
      if (userPermissions.role.name === ROLES.SUPER_ADMIN) {
        return true;
      }

      // Check if permission is denied
      const isDenied = userPermissions.deniedPermissions.some(
        (p) => p.name === permission
      );
      if (isDenied) return false;

      // Check role permissions and additional permissions
      const hasRolePermission = userPermissions.role.permissions.some(
        (p) => p.name === permission || p.action === "*"
      );
      const hasAdditionalPermission =
        userPermissions.additionalPermissions.some(
          (p) => p.name === permission
        );

      return hasRolePermission || hasAdditionalPermission;
    },
    [userPermissions]
  );

  // Check if user has any of the given permissions
  const hasAnyPermission = useCallback(
    (permissions: string[]): boolean => {
      return permissions.some((permission) => hasPermission(permission));
    },
    [hasPermission]
  );

  // Check if user has all of the given permissions
  const hasAllPermissions = useCallback(
    (permissions: string[]): boolean => {
      return permissions.every((permission) => hasPermission(permission));
    },
    [hasPermission]
  );

  // Check if user has specific role
  const hasRole = useCallback(
    (role: string): boolean => {
      return userPermissions?.role.name === role;
    },
    [userPermissions]
  );

  // Check if user has any of the given roles
  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      return userPermissions
        ? roles.includes(userPermissions.role.name)
        : false;
    },
    [userPermissions]
  );

  // Check if user's role level is at least the given level
  const hasMinimumRoleLevel = useCallback(
    (level: number): boolean => {
      return userPermissions ? userPermissions.role.level >= level : false;
    },
    [userPermissions]
  );

  // Check if user can access admin panel
  const canAccessAdmin = useCallback((): boolean => {
    return hasAnyRole([
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.MODERATOR,
      ROLES.STAFF,
    ]);
  }, [hasAnyRole]);

  // Check if user can manage content
  const canManageContent = useCallback((): boolean => {
    return hasAnyPermission([
      PERMISSIONS.ARTICLE_CREATE,
      PERMISSIONS.ARTICLE_UPDATE,
      PERMISSIONS.ARTICLE_DELETE,
    ]);
  }, [hasAnyPermission]);

  // Check if user can manage users
  const canManageUsers = useCallback((): boolean => {
    return hasAnyPermission([
      PERMISSIONS.USER_CREATE,
      PERMISSIONS.USER_UPDATE,
      PERMISSIONS.USER_DELETE,
    ]);
  }, [hasAnyPermission]);

  // Check if user can approve documents
  const canApproveDocuments = useCallback((): boolean => {
    return hasAnyPermission([
      PERMISSIONS.DOCUMENT_APPROVE,
      PERMISSIONS.DOCUMENT_REJECT,
    ]);
  }, [hasAnyPermission]);

  // Get permission display name
  const getPermissionDisplayName = useCallback((permission: string): string => {
    const permissionMap: Record<string, string> = {
      [PERMISSIONS.USER_READ]: "Lihat Pengguna",
      [PERMISSIONS.USER_CREATE]: "Buat Pengguna",
      [PERMISSIONS.USER_UPDATE]: "Edit Pengguna",
      [PERMISSIONS.USER_DELETE]: "Hapus Pengguna",
      [PERMISSIONS.ARTICLE_READ]: "Lihat Artikel",
      [PERMISSIONS.ARTICLE_CREATE]: "Buat Artikel",
      [PERMISSIONS.ARTICLE_UPDATE]: "Edit Artikel",
      [PERMISSIONS.ARTICLE_DELETE]: "Hapus Artikel",
      [PERMISSIONS.ARTICLE_PUBLISH]: "Publikasi Artikel",
      [PERMISSIONS.DOCUMENT_READ]: "Lihat Dokumen",
      [PERMISSIONS.DOCUMENT_CREATE]: "Buat Dokumen",
      [PERMISSIONS.DOCUMENT_UPDATE]: "Edit Dokumen",
      [PERMISSIONS.DOCUMENT_DELETE]: "Hapus Dokumen",
      [PERMISSIONS.DOCUMENT_APPROVE]: "Setujui Dokumen",
      [PERMISSIONS.DOCUMENT_REJECT]: "Tolak Dokumen",
      [PERMISSIONS.ADMIN_DASHBOARD]: "Dashboard Admin",
      [PERMISSIONS.ADMIN_SETTINGS]: "Pengaturan Sistem",
      [PERMISSIONS.ADMIN_ANALYTICS]: "Analytics",
      [PERMISSIONS.ADMIN_REPORTS]: "Laporan",
    };

    return permissionMap[permission] || permission;
  }, []);

  // Get role display name
  const getRoleDisplayName = useCallback((role: string): string => {
    const roleMap: Record<string, string> = {
      [ROLES.SUPER_ADMIN]: "Super Administrator",
      [ROLES.ADMIN]: "Administrator",
      [ROLES.MODERATOR]: "Moderator",
      [ROLES.STAFF]: "Staff",
      [ROLES.RESIDENT]: "Warga",
      [ROLES.BUSINESS_OWNER]: "Pemilik Usaha",
      [ROLES.VISITOR]: "Pengunjung",
    };

    return roleMap[role] || role;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    userPermissions,
    allPermissions,
    loading,
    error,

    // Permission Checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,

    // Role Checks
    hasRole,
    hasAnyRole,
    hasMinimumRoleLevel,

    // Convenience Checks
    canAccessAdmin,
    canManageContent,
    canManageUsers,
    canApproveDocuments,

    // Utilities
    getPermissionDisplayName,
    getRoleDisplayName,
    loadUserPermissions,
    clearError,

    // Constants
    PERMISSIONS,
    ROLES,
    ROLE_HIERARCHY,
  };
}
