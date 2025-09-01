/**
 * useFeedback Hook
 */
import { useState, useCallback } from "react";

export interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "resolved";
  createdAt: string;
}

export function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeedback = useCallback(async (): Promise<Feedback[]> => {
    setLoading(true);
    try {
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const submitFeedback = useCallback(
    async (
      data: Omit<Feedback, "id" | "status" | "createdAt">
    ): Promise<void> => {
      setLoading(true);
      try {
        console.log("Submitting feedback:", data);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, getFeedback, submitFeedback };
}
