'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useLogout() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const { toast } = useToast();

  const showLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const hideLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();

      toast({
        title: 'Logout Berhasil',
        description: 'Anda telah berhasil keluar dari akun',
        variant: 'default',
      });
    } catch (error) {
      console.error('Logout error:', error);

      // Even if logout fails, show success message since we clear local state anyway
      toast({
        title: 'Logout Berhasil',
        description: 'Anda telah berhasil keluar dari akun',
        variant: 'default',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    isLogoutDialogOpen,
    isLoggingOut,
    showLogoutDialog,
    hideLogoutDialog,
    confirmLogout,
  };
}
