/**
 * Enhanced Throttle and Debounce utilities for Notification System
 * Prevents API spam and race conditions
 */

interface ThrottleState {
  lastCallTime: number;
  timeoutId: NodeJS.Timeout | null;
  isRunning: boolean;
}

interface DebounceState {
  timeoutId: NodeJS.Timeout | null;
  lastArgs: any[] | null;
}

class NotificationThrottleManager {
  private throttleStates = new Map<string, ThrottleState>();
  private debounceStates = new Map<string, DebounceState>();

  /**
   * Enhanced throttle that prevents function calls within a specified time window
   * @param func Function to throttle
   * @param delay Minimum time between calls in milliseconds
   * @param key Unique key for this throttled function
   * @returns Throttled function
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    key: string
  ): (...args: Parameters<T>) => Promise<ReturnType<T> | void> {
    return async (...args: Parameters<T>) => {
      const now = Date.now();
      const state = this.throttleStates.get(key) || {
        lastCallTime: 0,
        timeoutId: null,
        isRunning: false,
      };

      const timeSinceLastCall = now - state.lastCallTime;

      // If enough time has passed and not currently running, execute immediately
      if (timeSinceLastCall >= delay && !state.isRunning) {
        state.lastCallTime = now;
        state.isRunning = true;
        this.throttleStates.set(key, state);

        try {
          const result = await func(...args);
          state.isRunning = false;
          return result;
        } catch (error) {
          state.isRunning = false;
          throw error;
        }
      }

      // Otherwise, ignore the call
      console.log(
        `⏸️ Throttled call ignored for ${key}. Time since last: ${timeSinceLastCall}ms, Required: ${delay}ms`
      );
      return;
    };
  }

  /**
   * Enhanced debounce that delays function execution
   * @param func Function to debounce
   * @param delay Delay in milliseconds
   * @param key Unique key for this debounced function
   * @returns Debounced function
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    key: string
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const state = this.debounceStates.get(key) || {
        timeoutId: null,
        lastArgs: null,
      };

      // Clear existing timeout
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      // Set new timeout
      state.timeoutId = setTimeout(() => {
        func(...args);
        state.timeoutId = null;
        state.lastArgs = null;
      }, delay);

      state.lastArgs = args;
      this.debounceStates.set(key, state);
    };
  }

  /**
   * Check if a throttled function can be called
   * @param key Throttle key
   * @param delay Required delay
   * @returns boolean
   */
  canCall(key: string, delay: number): boolean {
    const state = this.throttleStates.get(key);
    if (!state) return true;

    const timeSinceLastCall = Date.now() - state.lastCallTime;
    return timeSinceLastCall >= delay && !state.isRunning;
  }

  /**
   * Force reset a throttle state
   * @param key Throttle key
   */
  resetThrottle(key: string): void {
    const state = this.throttleStates.get(key);
    if (state) {
      state.lastCallTime = 0;
      state.isRunning = false;
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }
    }
  }

  /**
   * Cancel a debounced function
   * @param key Debounce key
   */
  cancelDebounce(key: string): void {
    const state = this.debounceStates.get(key);
    if (state && state.timeoutId) {
      clearTimeout(state.timeoutId);
      state.timeoutId = null;
      state.lastArgs = null;
    }
  }

  /**
   * Get statistics about throttle usage
   */
  getStats(): Record<string, any> {
    return {
      activeThrottles: this.throttleStates.size,
      activeDebounces: this.debounceStates.size,
      throttleStates: Array.from(this.throttleStates.entries()).map(([key, state]) => ({
        key,
        lastCallTime: state.lastCallTime,
        isRunning: state.isRunning,
        timeSinceLastCall: Date.now() - state.lastCallTime,
      })),
    };
  }

  /**
   * Clear all throttle and debounce states
   */
  clearAll(): void {
    // Clear all timeouts
    this.throttleStates.forEach((state) => {
      if (state.timeoutId) clearTimeout(state.timeoutId);
    });

    this.debounceStates.forEach((state) => {
      if (state.timeoutId) clearTimeout(state.timeoutId);
    });

    this.throttleStates.clear();
    this.debounceStates.clear();
  }
}

// Singleton instance
export const throttleManager = new NotificationThrottleManager();

// Pre-configured throttle functions for common notification operations
export const throttledFunctions = {
  fetchNotificationDetail: throttleManager.throttle(
    async (id: string, fetchFn: (id: string) => Promise<any>) => fetchFn(id),
    10000, // 10 seconds
    'fetchNotificationDetail'
  ),

  markAsRead: throttleManager.throttle(
    async (id: string, markFn: (id: string) => Promise<any>) => markFn(id),
    5000, // 5 seconds
    'markAsRead'
  ),

  fetchNotifications: throttleManager.throttle(
    async (fetchFn: () => Promise<any>) => fetchFn(),
    15000, // 15 seconds
    'fetchNotifications'
  ),

  fetchUnreadCount: throttleManager.throttle(
    async (fetchFn: () => Promise<any>) => fetchFn(),
    10000, // 10 seconds
    'fetchUnreadCount'
  ),
};

export default throttleManager;
