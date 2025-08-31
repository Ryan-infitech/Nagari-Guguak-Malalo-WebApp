/**
 * useUsers Hook
 * Hook untuk user management operations
 */

import { useState, useCallback, useEffect } from 'react';
import { userService } from '@/api/services';
import type { User } from '@/api/types/auth';

// Local types for the hook
export interface UpdateUserData {
  name?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  gender?: 'male' | 'female';
  occupation?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Main useUsers hook
 */
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current user profile
  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await userService.getCurrentUser();
      setCurrentUser(user);
      return user;
    } catch (err: any) {
      setError(err.message || 'Failed to get current user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (data: UpdateUserData) => {
    try {
      setIsUpdating(true);
      setError(null);
      const updatedUser = await userService.updateProfile(data);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (data: ChangePasswordData) => {
    try {
      setIsChangingPassword(true);
      setError(null);
      await userService.changePassword(data);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
      throw err;
    } finally {
      setIsChangingPassword(false);
    }
  }, []);

  // Upload avatar
  const uploadAvatar = useCallback(
    async (file: File) => {
      try {
        setIsUploadingAvatar(true);
        setError(null);
        const result = await userService.uploadAvatar(file);

        // Update current user with new avatar
        if (currentUser) {
          setCurrentUser({
            ...currentUser,
            avatarUrl: result,
          });
        }

        return result;
      } catch (err: any) {
        setError(err.message || 'Failed to upload avatar');
        throw err;
      } finally {
        setIsUploadingAvatar(false);
      }
    },
    [currentUser]
  );

  // Update user preferences
  const updatePreferences = useCallback(
    async (preferences: {
      notifications?: boolean;
      emailUpdates?: boolean;
      language?: string;
      theme?: 'light' | 'dark' | 'auto';
    }) => {
      try {
        setIsUpdating(true);
        setError(null);
        const updatedUser = await userService.updatePreferences(preferences);
        setCurrentUser(updatedUser);
        return updatedUser;
      } catch (err: any) {
        setError(err.message || 'Failed to update preferences');
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  // Verify email
  const verifyEmail = useCallback(
    async (token: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await userService.verifyEmail(token);
        await getCurrentUser(); // Refresh user data
      } catch (err: any) {
        setError(err.message || 'Failed to verify email');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [getCurrentUser]
  );

  // Request email verification
  const requestEmailVerification = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await userService.requestEmailVerification();
    } catch (err: any) {
      setError(err.message || 'Failed to request email verification');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify phone
  const verifyPhone = useCallback(
    async (code: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await userService.verifyPhone(code);
        await getCurrentUser(); // Refresh user data
      } catch (err: any) {
        setError(err.message || 'Failed to verify phone');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [getCurrentUser]
  );

  // Request phone verification
  const requestPhoneVerification = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await userService.requestPhoneVerification();
    } catch (err: any) {
      setError(err.message || 'Failed to request phone verification');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete account
  const deleteAccount = useCallback(async (password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await userService.deleteAccount(password);
      setCurrentUser(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load user on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getCurrentUser();
    }
  }, [getCurrentUser]);

  return {
    // State
    users,
    currentUser,
    isLoading,
    isUpdating,
    isChangingPassword,
    isUploadingAvatar,
    error,

    // Actions
    getCurrentUser,
    updateProfile,
    changePassword,
    uploadAvatar,
    updatePreferences,
    verifyEmail,
    requestEmailVerification,
    verifyPhone,
    requestPhoneVerification,
    deleteAccount,

    // Utilities
    clearError: () => setError(null),
  };
}

/**
 * Hook for user validation utilities
 */
export function useUserValidation() {
  const validateProfile = useCallback((data: UpdateUserData) => {
    return userService.validateProfile(data);
  }, []);

  const validatePassword = useCallback((password: string) => {
    return userService.validatePassword(password);
  }, []);

  const getRoleLabel = useCallback((role: string) => {
    return userService.getRoleLabel(role);
  }, []);

  const getStatusLabel = useCallback((status: string) => {
    return userService.getStatusLabel(status);
  }, []);

  const getStatusColor = useCallback((status: string) => {
    return userService.getStatusColor(status);
  }, []);

  const getDisplayName = useCallback((user: User) => {
    return userService.getDisplayName(user);
  }, []);

  const getInitials = useCallback((name: string) => {
    return userService.getInitials(name);
  }, []);

  const hasCompleteProfile = useCallback((user: User) => {
    return userService.hasCompleteProfile(user);
  }, []);

  const getProfileCompletion = useCallback((user: User) => {
    return userService.getProfileCompletion(user);
  }, []);

  const formatLastLogin = useCallback((lastLoginAt?: string) => {
    return userService.formatLastLogin(lastLoginAt);
  }, []);

  const getAvatarUrl = useCallback((user: User, size?: number) => {
    return userService.getAvatarUrl(user, size);
  }, []);

  return {
    validateProfile,
    validatePassword,
    getRoleLabel,
    getStatusLabel,
    getStatusColor,
    getDisplayName,
    getInitials,
    hasCompleteProfile,
    getProfileCompletion,
    formatLastLogin,
    getAvatarUrl,
  };
}
