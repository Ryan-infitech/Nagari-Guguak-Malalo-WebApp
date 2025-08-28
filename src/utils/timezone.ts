/**
 * Timezone Utilities for Nagari Guguak Malalo Portal
 * Handles all timezone conversions between UTC and Jakarta (WIB)
 */

/**
 * Constants
 */
export const JAKARTA_TIMEZONE = 'Asia/Jakarta';
export const WIB_OFFSET_HOURS = 7; // UTC+7

/**
 * Get current time in Jakarta timezone
 */
export const getJakartaTime = (): Date => {
  const now = new Date();
  return new Date(now.toLocaleString('en-US', { timeZone: JAKARTA_TIMEZONE }));
};

/**
 * Get today's date in Jakarta timezone (start of day)
 */
export const getJakartaToday = (): Date => {
  const jakartaTime = getJakartaTime();
  return new Date(jakartaTime.getFullYear(), jakartaTime.getMonth(), jakartaTime.getDate());
};

/**
 * Get minimum date for input fields (today in Jakarta timezone)
 * Returns YYYY-MM-DD format
 */
export const getMinimumDateInput = (): string => {
  const today = getJakartaToday();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Convert UTC date to Jakarta time
 */
export const utcToJakarta = (utcDate: Date | string): Date => {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate;
  return new Date(date.toLocaleString('en-US', { timeZone: JAKARTA_TIMEZONE }));
};

/**
 * Convert Jakarta time to UTC
 */
export const jakartaToUtc = (jakartaDate: Date | string): Date => {
  let date: Date;

  if (typeof jakartaDate === 'string') {
    // If it's a string like "2025-08-03T10:00", treat it as Jakarta time
    date = new Date(jakartaDate + '+07:00');
  } else {
    // If it's already a Date object, assume it's in Jakarta time
    // and convert to UTC by subtracting 7 hours
    date = new Date(jakartaDate.getTime() - WIB_OFFSET_HOURS * 60 * 60 * 1000);
  }

  return date;
};

/**
 * Format date for datetime-local input in Jakarta timezone
 * Converts any date to Jakarta time and formats for HTML input
 */
export const formatDateTimeLocalJakarta = (date: Date | string | null): string => {
  if (!date) return '';

  let targetDate: Date;
  if (typeof date === 'string') {
    targetDate = new Date(date);
  } else {
    targetDate = date;
  }

  // Convert to Jakarta timezone for display
  const jakartaDateString = targetDate.toLocaleString('en-CA', {
    timeZone: JAKARTA_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Format: "YYYY-MM-DD, HH:MM" -> "YYYY-MM-DDTHH:MM"
  const [datePart, timePart] = jakartaDateString.split(', ');
  return `${datePart}T${timePart}`;
};

/**
 * Convert datetime-local input value (treated as Jakarta time) to UTC Date
 */
export const datetimeLocalToUtc = (datetimeLocalValue: string): Date => {
  // The datetime-local input gives us a string like "2025-08-03T10:00"
  // We treat this as Jakarta time and convert to UTC
  return new Date(datetimeLocalValue + '+07:00');
};

/**
 * Format date to Indonesian locale string in Jakarta timezone
 */
export const formatDateJakarta = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: JAKARTA_TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };

  return targetDate.toLocaleDateString('id-ID', defaultOptions);
};

/**
 * Format time to Indonesian locale string in Jakarta timezone
 */
export const formatTimeJakarta = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: JAKARTA_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  return targetDate.toLocaleTimeString('id-ID', defaultOptions);
};

/**
 * Format date and time to Indonesian locale string in Jakarta timezone
 */
export const formatDateTimeJakarta = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: JAKARTA_TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  return targetDate.toLocaleDateString('id-ID', defaultOptions);
};

/**
 * Check if a date is in the past (based on Jakarta time)
 */
export const isPastJakarta = (date: Date | string): boolean => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const jakartaTime = getJakartaTime();
  return targetDate < jakartaTime;
};

/**
 * Check if a date is in the future (based on Jakarta time)
 */
export const isFutureJakarta = (date: Date | string): boolean => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const jakartaTime = getJakartaTime();
  return targetDate > jakartaTime;
};

/**
 * Get relative time string in Indonesian based on Jakarta time
 */
export const getRelativeTimeJakarta = (date: Date | string): string => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const jakartaTime = getJakartaTime();
  const diffMs = jakartaTime.getTime() - targetDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMs < 0) {
    // Future date
    const absDiffSeconds = Math.abs(diffSeconds);
    const absDiffMinutes = Math.abs(diffMinutes);
    const absDiffHours = Math.abs(diffHours);
    const absDiffDays = Math.abs(diffDays);

    if (absDiffSeconds < 60) return 'Beberapa detik lagi';
    if (absDiffMinutes < 60) return `${absDiffMinutes} menit lagi`;
    if (absDiffHours < 24) return `${absDiffHours} jam lagi`;
    return `${absDiffDays} hari lagi`;
  }

  // Past date
  if (diffSeconds < 60) return 'Baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;
  return `${Math.floor(diffDays / 365)} tahun yang lalu`;
};

/**
 * Create a new Date with Jakarta timezone consideration
 * for schedule operations
 */
export const createJakartaDate = (
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0
): Date => {
  // Create date in Jakarta timezone
  const jakartaDate = new Date();
  jakartaDate.setFullYear(year);
  jakartaDate.setMonth(month - 1); // Month is 0-indexed
  jakartaDate.setDate(day);
  jakartaDate.setHours(hour, minute, 0, 0);

  // Convert to UTC for storage
  return jakartaToUtc(jakartaDate);
};

/**
 * Parse date string and convert to appropriate timezone
 */
export const parseScheduleDate = (dateString: string, timeString: string): Date => {
  const combined = `${dateString}T${timeString}`;
  return datetimeLocalToUtc(combined);
};
