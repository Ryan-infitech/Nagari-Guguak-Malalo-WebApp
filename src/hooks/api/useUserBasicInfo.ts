/**
 * User Basic Info Hook
 * Custom hook untuk mengelola informasi dasar user (tabel users)
 */

import { useState, useCallback } from 'react';
import { userService } from '@/api/services';
import { useAuth } from '@/contexts/AuthContext';

interface UpdateUserBasicInfoData {
  name?: string;
  phone?: string;
  email?: string;
}

interface UseUserBasicInfoReturn {
  isLoading: boolean;
  error: string | null;
  updateUserBasicInfo: (data: UpdateUserBasicInfoData) => Promise<void>;
  clearError: () => void;
}

export function useUserBasicInfo(): UseUserBasicInfoReturn {
  const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Update user basic information (goes to users table)
   */
  const updateUserBasicInfo = useCallback(
    async (data: UpdateUserBasicInfoData) => {
      try {
        setIsLoading(true);
        setError(null);

        const updatedProfile = await userService.updateUserBasicInfo(data);

        // Update auth context with new profile data
        dispatch({ type: 'UPDATE_USER', payload: updatedProfile });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Gagal memperbarui informasi dasar';
        setError(errorMessage);
        console.error('Error updating user basic info:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    updateUserBasicInfo,
    clearError,
  };
}
