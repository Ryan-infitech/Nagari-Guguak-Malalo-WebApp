/**
 * useNotifications Hook
 */
import { useState, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  createdAt: string;
}

export function useNotifications() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNotifications = useCallback(async (): Promise<Notification[]> => {
    setLoading(true);
    try {
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    try {
      console.log("Marking notification as read:", id);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getNotifications, markAsRead };
}
