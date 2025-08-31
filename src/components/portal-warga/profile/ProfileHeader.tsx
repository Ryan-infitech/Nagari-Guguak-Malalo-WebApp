'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { UserProfile } from '@/api/types/auth';
import { toast } from 'sonner';

interface ProfileHeaderProps {
  user: UserProfile | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { uploadAvatar } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);
    try {
      await uploadAvatar(file);
      toast.success('Avatar berhasil diupdate');
    } catch (error) {
      toast.error('Gagal mengupload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-r from-[#7ca186]/10 to-transparent shadow-sm">
      <CardContent className="p-6">
        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          {/* Avatar Section */}
          <div className="group relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage
                src={user?.avatarUrl || '/avatar-placeholder.png'}
                alt={user?.name || 'User'}
              />
              <AvatarFallback className="bg-gradient-to-br from-[#7ca186] to-green-600 text-2xl text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>

            <div
              onClick={handleAvatarUpload}
              className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1.5 shadow-sm transition-colors hover:bg-gray-100"
            >
              {isUploading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#7ca186] border-t-transparent"></div>
              ) : (
                <Camera className="h-5 w-5 text-gray-600" />
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="flex-1 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold">{user?.name || 'Nama Warga'}</h3>
              <Badge className="bg-[#7ca186] hover:bg-[#6a8b72]">
                {user?.role === 'RESIDENT'
                  ? 'Warga Terdaftar'
                  : user?.role === 'BUSINESS_OWNER'
                    ? 'Pemilik Usaha'
                    : user?.role || 'Pengguna'}
              </Badge>
              {user?.isVerified && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Terverifikasi</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{user?.phone || 'Belum diisi'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user?.email || 'Email tidak tersedia'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{user?.address || 'Nagari Guguak Malalo'}</span>
              </div>
              {user?.createdAt && (
                <div className="mt-2 text-xs text-gray-500">
                  Bergabung pada{' '}
                  {new Date(user.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 w-full md:mt-0 md:w-auto">
            <Button className="w-full bg-[#7ca186] text-white hover:bg-[#6a8b72] md:w-auto">
              Edit Profil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
