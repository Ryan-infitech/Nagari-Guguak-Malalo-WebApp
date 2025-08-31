/**
 * useResidents Hook
 */
import { useState, useCallback } from "react";

export interface Resident {
  id: string;
  nik: string;
  name: string;
  birthDate: string;
  address: string;
  phone?: string;
  email?: string;
  status: "active" | "inactive";
  registeredAt: string;
}

export function useResidents() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getResidents = useCallback(async (): Promise<Resident[]> => {
    setLoading(true);
    try {
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createResident = useCallback(
    async (data: Omit<Resident, "id" | "registeredAt">): Promise<Resident> => {
      setLoading(true);
      try {
        return {
          id: Date.now().toString(),
          ...data,
          registeredAt: new Date().toISOString(),
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, getResidents, createResident };
}
