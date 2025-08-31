/**
 * useDebounce Hook
 * Hook untuk debouncing values
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebounceCallback Hook
 * Hook untuk debouncing callbacks
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const [debouncedCallback, setDebouncedCallback] = useState<T | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return (debouncedCallback || (() => {})) as T;
}

/**
 * useAsyncDebounce Hook
 * Hook untuk async debouncing
 */
export function useAsyncDebounce<T extends (...args: any[]) => Promise<any>>(
  asyncFunction: T,
  delay: number
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const debouncedFunction = useDebounceCallback(
    async (...args: Parameters<T>) => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    delay
  ) as T;

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    debouncedFunction,
    loading,
    data,
    error,
    reset,
  };
}
