/**
 * useFiles Hook
 */
import { useState, useCallback } from "react";

export interface FileUpload {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export function useFiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<FileUpload> => {
    setLoading(true);
    try {
      return {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFile = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    try {
      console.log("Deleting file:", id);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, uploadFile, deleteFile };
}
