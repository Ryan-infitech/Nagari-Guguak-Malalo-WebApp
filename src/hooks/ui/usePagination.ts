/**
 * usePagination Hook
 * Hook untuk pagination management
 */

import { useState, useMemo, useCallback } from "react";

export interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalItems?: number;
  siblingCount?: number;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  startIndex: number;
  endIndex: number;
}

export interface PaginationActions {
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  reset: () => void;
}

export interface PaginationReturn extends PaginationState, PaginationActions {
  pageNumbers: number[];
  getPageItems: <T>(items: T[]) => T[];
}

export function usePagination(
  options: PaginationOptions = {}
): PaginationReturn {
  const {
    initialPage = 1,
    pageSize: initialPageSize = 10,
    totalItems: initialTotalItems = 0,
    siblingCount = 1,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  // Computed values
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  const hasNextPage = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

  const hasPreviousPage = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  const isFirstPage = useMemo(() => {
    return currentPage === 1;
  }, [currentPage]);

  const isLastPage = useMemo(() => {
    return currentPage === totalPages;
  }, [currentPage, totalPages]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + pageSize - 1, totalItems - 1);
  }, [startIndex, pageSize, totalItems]);

  // Generate page numbers for pagination UI
  const pageNumbers = useMemo(() => {
    const delta = siblingCount;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index) => {
      return rangeWithDots.indexOf(item) === index;
    }) as number[];
  }, [currentPage, totalPages, siblingCount]);

  // Actions
  const goToPage = useCallback(
    (page: number) => {
      const normalizedPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(normalizedPage);
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const updatePageSize = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  const updateTotalItems = useCallback(
    (total: number) => {
      setTotalItems(total);
      // Adjust current page if it's now out of range
      const newTotalPages = Math.ceil(total / pageSize);
      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(1, newTotalPages));
      }
    },
    [pageSize, currentPage]
  );

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
    setTotalItems(initialTotalItems);
  }, [initialPage, initialPageSize, initialTotalItems]);

  // Helper function to get paginated items
  const getPageItems = useCallback(
    <T>(items: T[]): T[] => {
      const start = startIndex;
      const end = start + pageSize;
      return items.slice(start, end);
    },
    [startIndex, pageSize]
  );

  return {
    // State
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isFirstPage,
    isLastPage,
    startIndex,
    endIndex,
    pageNumbers,

    // Actions
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setPageSize: updatePageSize,
    setTotalItems: updateTotalItems,
    reset,

    // Helper
    getPageItems,
  };
}
