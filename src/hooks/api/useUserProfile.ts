/**
 * User Profile Hook
 * Custom hook untuk mengelola profil pengguna portal warga
 */

import { useState, useEffect, useCallback } from 'react';
import { userService } from '@/api/services';
import { useAuth } from '@/contexts/AuthContext';
import type { UserProfile } from '@/api/types/auth';

interface UseUserProfileOptions {
  autoFetch?: boolean;
}

interface UseUserProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  bio?: string;
}

export function useUserProfile(options: UseUserProfileOptions = {}): UseUserProfileReturn {
  const { autoFetch = false } = options;
  const { dispatch } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch user profile
   */
  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const profileData = await userService.getProfile();
      setProfile(profileData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengambil profil pengguna';
      setError(errorMessage);
      console.error('Error fetching user profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(
    async (data: UpdateProfileData) => {
      try {
        setIsLoading(true);
        setError(null);

        const updatedProfile = await userService.updateProfile(data);
        setProfile(updatedProfile);

        // Update auth context with new profile data
        dispatch({ type: 'UPDATE_USER', payload: updatedProfile });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui profil';
        setError(errorMessage);
        console.error('Error updating profile:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  /**
   * Upload user avatar
   */
  const uploadAvatar = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        setError(null);

        const avatarUrl = await userService.uploadAvatar(file);

        // Fetch updated profile to get complete data
        await fetchProfile();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui avatar';
        setError(errorMessage);
        console.error('Error updating avatar:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProfile]
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Auto fetch profile on mount
   */
  useEffect(() => {
    if (autoFetch) {
      fetchProfile();
    }
  }, [autoFetch, fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadAvatar,
    fetchProfile,
    clearError,
  };
}
