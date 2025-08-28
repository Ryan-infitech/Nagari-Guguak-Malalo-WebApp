/**
 * Auth Provider Component
 * Provider untuk authentication dan authorization
 */

'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

/**
 * User type definition
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  profileImage?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Register data type
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

/**
 * Login data type
 */
export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Auth context type
 */
export interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;

  // Utilities
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
}

/**
 * Auth context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Initialize auth state
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Initialize authentication
   */
  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verify token and get user data
      // This would normally call an API endpoint
      // For now, just set loading to false
      setIsLoading(false);
    } catch (error) {
      console.error('Auth initialization error:', error);
      setIsLoading(false);
    }
  };

  /**
   * Login function
   */
  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);

      // This would normally make an API call
      // const response = await authAPI.login(data);

      // Simulate successful login
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: 'Test User',
        role: 'RESIDENT',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('auth_token', 'mock_token');

      toast.success('Login berhasil!');
      router.push('/portal-warga/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function
   */
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);

      // This would normally make an API call
      // const response = await authAPI.register(data);

      toast.success('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Registrasi gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');

      toast.success('Logout berhasil!');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Refresh token
   */
  const refreshToken = async () => {
    try {
      // This would normally refresh the token
      console.log('Refreshing token...');
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
    }
  };

  /**
   * Update profile
   */
  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) return;

      setUser({ ...user, ...data });
      toast.success('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Gagal memperbarui profil.');
    }
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  /**
   * Check if user has permission
   */
  const hasPermission = (permission: string): boolean => {
    // This would normally check against user permissions
    return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  };

  /**
   * Check if user is admin
   */
  const isAdmin = (): boolean => {
    return ['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(user?.role || '');
  };

  /**
   * Context value
   */
  const contextValue: AuthContextType = {
    // State
    user,
    isLoading,
    isAuthenticated: !!user,

    // Actions
    login,
    register,
    logout,
    refreshToken,
    updateProfile,

    // Utilities
    hasRole,
    hasPermission,
    isAdmin,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

/**
 * Higher-order component for authentication
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requireAuth?: boolean;
    requiredRole?: string;
    redirectTo?: string;
  } = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      if (options.requireAuth && !isAuthenticated) {
        router.push(options.redirectTo || '/login');
        return;
      }

      if (options.requiredRole && user?.role !== options.requiredRole) {
        router.push('/unauthorized');
        return;
      }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (options.requireAuth && !isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * Auth guard hook
 */
export function useAuthGuard(
  options: {
    requireAuth?: boolean;
    requiredRole?: string;
    redirectTo?: string;
  } = {}
) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (options.requireAuth && !isAuthenticated) {
      router.push(options.redirectTo || '/login');
      return;
    }

    if (options.requiredRole && user?.role !== options.requiredRole) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, isLoading, router]);

  return {
    isAuthenticated,
    user,
    isLoading,
    canAccess: isAuthenticated && (!options.requiredRole || user?.role === options.requiredRole),
  };
}

export default AuthProvider;
