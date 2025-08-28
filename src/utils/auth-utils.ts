/**
 * Authentication utilities
 * Utility functions untuk authentication dan authorization
 */

import { UserRole } from '@/api/types/auth';

/**
 * Admin roles yang dapat mengakses dashboard admin
 */
export const ADMIN_ROLES: UserRole[] = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'STAFF'];

/**
 * Check if user role is admin
 */
export function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}

/**
 * Get default dashboard route based on user role
 */
export function getDashboardRoute(role: UserRole): string {
  if (isAdminRole(role)) {
    return '/admin';
  }

  return '/portal-warga/dashboard'; // Direct to dashboard to avoid redirect loop
}

/**
 * Get default redirect route after login based on user role
 */
export function getLoginRedirectRoute(role: UserRole, searchParams?: URLSearchParams): string {
  // Check if there's explicit tab parameter for admin
  if (searchParams?.get('tab') === 'admin') {
    return '/admin';
  }

  // Check if there's a redirect parameter
  const redirect = searchParams?.get('redirect');
  if (redirect) {
    // Ensure user has permission to access the redirect route
    if (redirect.startsWith('/admin') && !isAdminRole(role)) {
      // If trying to access admin but not admin role, redirect to portal dashboard
      return '/portal-warga/dashboard';
    }

    // If redirect is valid, use it
    return redirect;
  }

  // Default routing based on role - always go to dashboard directly
  return getDashboardRoute(role);
}

/**
 * Check if user has required role from a list of roles
 */
export function hasRequiredRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user can access admin routes
 */
export function canAccessAdmin(role: UserRole): boolean {
  return isAdminRole(role);
}

/**
 * Check if user can access portal warga
 */
export function canAccessPortalWarga(role: UserRole): boolean {
  // All roles except VISITOR can access portal warga
  return role !== 'VISITOR';
}

/**
 * Get user dashboard route helper for components
 */
export function getUserDashboardRoute(role?: UserRole): string {
  if (!role) {
    return '/portal-warga'; // Default fallback
  }

  return getDashboardRoute(role);
}

/**
 * Get role display name in Indonesian
 */
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Administrator',
    MODERATOR: 'Moderator',
    STAFF: 'Staff',
    RESIDENT: 'Warga',
    BUSINESS_OWNER: 'Pemilik Usaha',
    VISITOR: 'Pengunjung',
  };

  return roleNames[role] || role;
}
