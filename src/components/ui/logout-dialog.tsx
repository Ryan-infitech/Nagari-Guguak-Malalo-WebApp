'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LogOut, Loader2 } from 'lucide-react';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  userName?: string;
}

export function LogoutDialog({ open, onOpenChange, onConfirm, userName }: LogoutDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-red-500" />
            Konfirmasi Logout
          </AlertDialogTitle>
          <AlertDialogDescription>
            {userName ? (
              <>
                Halo <span className="font-medium">{userName}</span>, apakah Anda yakin ingin keluar
                dari akun Anda? Anda perlu login kembali untuk mengakses portal.
              </>
            ) : (
              'Apakah Anda yakin ingin keluar dari akun Anda? Anda perlu login kembali untuk mengakses portal.'
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Ya, Logout
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
