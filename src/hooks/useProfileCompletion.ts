import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/api/useUserProfile';

interface ProfileCompletion {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
}

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile({ autoFetch: true });
  const [completion, setCompletion] = useState<ProfileCompletion>({
    percentage: 0,
    isComplete: false,
    missingFields: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCompletion({
        percentage: 0,
        isComplete: false,
        missingFields: ['Login diperlukan'],
      });
      setIsLoading(false);
      return;
    }

    // Use profile data if available
    const userData = profile || user;
    const resident = (userData as any)?.resident;

    // If we have resident data with data_completeness_score, use that
    if (resident?.dataCompletenessScore !== undefined && resident?.dataCompletenessScore !== null) {
      const percentage = Math.round(resident.dataCompletenessScore);
      const isComplete = percentage >= 100;

      // Get missing fields based on actual data
      const missingFields: string[] = [];

      // Check the same 6 required fields as backend
      if (!resident?.user?.name) missingFields.push('Nama Lengkap');
      if (!resident?.user?.email) missingFields.push('Email');
      if (!resident?.user?.phone) missingFields.push('Nomor Telepon');
      if (!resident?.streetAddress && !resident?.rt && !resident?.rw)
        missingFields.push('Alamat Lengkap');
      if (!resident?.birthDate) missingFields.push('Tanggal Lahir');
      if (!resident?.nik) missingFields.push('NIK');

      setCompletion({
        percentage,
        isComplete,
        missingFields,
      });
      setIsLoading(false);
      return;
    }

    // Fallback to manual calculation if resident data is not available
    const requiredFields = [
      { key: 'name', label: 'Nama Lengkap', value: resident?.user?.name || userData?.name },
      { key: 'email', label: 'Email', value: resident?.user?.email || userData?.email },
      { key: 'phone', label: 'Nomor Telepon', value: resident?.user?.phone || userData?.phone },
      {
        key: 'address',
        label: 'Alamat Lengkap',
        value: resident?.streetAddress || userData?.address,
      },
      { key: 'dateOfBirth', label: 'Tanggal Lahir', value: resident?.birthDate },
      { key: 'nik', label: 'NIK', value: resident?.nik },
    ];

    const missingFields: string[] = [];
    let completedFields = 0;

    requiredFields.forEach((field) => {
      if (!field.value || field.value.trim() === '') {
        missingFields.push(field.label);
      } else {
        completedFields++;
      }
    });

    const percentage = Math.round((completedFields / requiredFields.length) * 100);
    const isComplete = percentage >= 100;

    setCompletion({
      percentage,
      isComplete,
      missingFields,
    });
    setIsLoading(false);
  }, [user, profile]);

  return { completion, isLoading };
};
