/**
 * useInfiniteScroll Hook
 * Hook untuk infinite scroll functionality
 */

import { useState, useEffect, useCallback, useRef } from "react";

export interface InfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export interface InfiniteScrollState<T> {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  page: number;
}

export interface InfiniteScrollReturn<T> extends InfiniteScrollState<T> {
  loadMore: () => void;
  reset: () => void;
  setData: (data: T[]) => void;
  lastElementRef: (node: HTMLElement | null) => void;
}

export function useInfiniteScroll<T>(
  fetchFunction: (
    page: number
  ) => Promise<{ data: T[]; hasMore: boolean; total?: number }>,
  options: InfiniteScrollOptions = {}
): InfiniteScrollReturn<T> {
  const { threshold = 1.0, rootMargin = "0px", enabled = true } = options;

  const [state, setState] = useState<InfiniteScrollState<T>>({
    data: [],
    loading: false,
    hasMore: true,
    error: null,
    page: 1,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const fetchingRef = useRef(false);

  // Load more data
  const loadMore = useCallback(async () => {
    if (!enabled || state.loading || !state.hasMore || fetchingRef.current) {
      return;
    }

    fetchingRef.current = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await fetchFunction(state.page);

      setState((prev) => ({
        ...prev,
        data: [...prev.data, ...result.data],
        hasMore: result.hasMore,
        page: prev.page + 1,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat data",
      }));
    } finally {
      fetchingRef.current = false;
    }
  }, [fetchFunction, state.page, state.loading, state.hasMore, enabled]);

  // Reset to initial state
  const reset = useCallback(() => {
    setState({
      data: [],
      loading: false,
      hasMore: true,
      error: null,
      page: 1,
    });
    fetchingRef.current = false;
  }, []);

  // Set data manually (useful for initial load)
  const setData = useCallback((newData: T[]) => {
    setState((prev) => ({
      ...prev,
      data: newData,
      page: 2, // Assuming first page is already loaded
    }));
  }, []);

  // Ref callback for the last element
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (state.loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && state.hasMore && enabled) {
            loadMore();
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      if (node) observer.current.observe(node);
    },
    [state.loading, state.hasMore, loadMore, threshold, rootMargin, enabled]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    ...state,
    loadMore,
    reset,
    setData,
    lastElementRef,
  };
}

/**
 * useVirtualizedInfiniteScroll Hook
 * Hook untuk infinite scroll dengan virtualization
 */
export function useVirtualizedInfiniteScroll<T>(
  fetchFunction: (page: number) => Promise<{ data: T[]; hasMore: boolean }>,
  itemHeight: number,
  containerHeight: number,
  options: InfiniteScrollOptions = {}
) {
  const basicInfiniteScroll = useInfiniteScroll(fetchFunction, options);
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    basicInfiniteScroll.data.length
  );

  const visibleItems = basicInfiniteScroll.data.slice(startIndex, endIndex);

  // Handle scroll
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      setScrollTop(target.scrollTop);

      // Load more when near bottom
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        basicInfiniteScroll.loadMore();
      }
    },
    [basicInfiniteScroll.loadMore]
  );

  return {
    ...basicInfiniteScroll,
    visibleItems,
    startIndex,
    endIndex,
    totalHeight: basicInfiniteScroll.data.length * itemHeight,
    handleScroll,
    scrollTop,
  };
}

/**
 * useInfiniteScrollWithSearch Hook
 * Hook untuk infinite scroll dengan search capability
 */
export function useInfiniteScrollWithSearch<T>(
  fetchFunction: (
    page: number,
    searchTerm: string
  ) => Promise<{ data: T[]; hasMore: boolean }>,
  options: InfiniteScrollOptions & { debounceMs?: number } = {}
) {
  const { debounceMs = 300, ...scrollOptions } = options;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Modified fetch function that includes search
  const fetchWithSearch = useCallback(
    (page: number) => fetchFunction(page, debouncedSearchTerm),
    [fetchFunction, debouncedSearchTerm]
  );

  const infiniteScroll = useInfiniteScroll(fetchWithSearch, scrollOptions);

  // Reset when search term changes
  useEffect(() => {
    infiniteScroll.reset();
  }, [debouncedSearchTerm]);

  const updateSearchTerm = useCallback((newTerm: string) => {
    setSearchTerm(newTerm);
  }, []);

  return {
    ...infiniteScroll,
    searchTerm,
    setSearchTerm: updateSearchTerm,
    debouncedSearchTerm,
  };
}

/**
 * useScrollPosition Hook
 * Hook untuk tracking scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const updateScrollPosition = useCallback(() => {
    setScrollPosition(window.pageYOffset);
    setIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateScrollPosition]);

  return {
    scrollPosition,
    isScrolling,
  };
}

/**
 * useScrollToTop Hook
 * Hook untuk scroll to top functionality
 */
export function useScrollToTop() {
  const scrollToTop = useCallback((smooth: boolean = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const scrollToElement = useCallback(
    (elementId: string, smooth: boolean = true) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "start",
        });
      }
    },
    []
  );

  return {
    scrollToTop,
    scrollToElement,
  };
}
