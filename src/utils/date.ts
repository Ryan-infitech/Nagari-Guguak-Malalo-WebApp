/**
 * Date Utility Functions
 * Fungsi utility untuk manipulasi tanggal dan waktu
 */

/**
 * Indonesian month names
 */
const INDONESIAN_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/**
 * Indonesian day names
 */
const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

/**
 * Short Indonesian day names
 */
const INDONESIAN_DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/**
 * Format date to Indonesian format
 */
export const formatDateIndonesian = (
  date: Date | string,
  options: {
    includeDay?: boolean;
    includeTime?: boolean;
    shortDay?: boolean;
    shortMonth?: boolean;
  } = {}
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Tanggal tidak valid";
  }

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const dayOfWeek = dateObj.getDay();

  let result = "";

  // Add day name if requested
  if (options.includeDay) {
    const dayName = options.shortDay
      ? INDONESIAN_DAYS_SHORT[dayOfWeek]
      : INDONESIAN_DAYS[dayOfWeek];
    result += `${dayName}, `;
  }

  // Add date
  result += `${day} `;

  // Add month
  if (options.shortMonth) {
    result += `${INDONESIAN_MONTHS[month].substring(0, 3)} `;
  } else {
    result += `${INDONESIAN_MONTHS[month]} `;
  }

  // Add year
  result += year;

  // Add time if requested
  if (options.includeTime) {
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    result += ` ${hours}:${minutes}`;
  }

  return result;
};

/**
 * Format date to DD/MM/YYYY
 */
export const formatDateDDMMYYYY = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format date to YYYY-MM-DD
 */
export const formatDateYYYYMMDD = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${year}-${month}-${day}`;
};

/**
 * Format time to HH:MM
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * Format time to HH:MM:SS
 */
export const formatTimeWithSeconds = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Get relative time in Indonesian
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return "Baru saja";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  } else if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  } else if (diffDays < 7) {
    return `${diffDays} hari yang lalu`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} minggu yang lalu`;
  } else if (diffMonths < 12) {
    return `${diffMonths} bulan yang lalu`;
  } else {
    return `${diffYears} tahun yang lalu`;
  }
};

/**
 * Check if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  return dateObj.toDateString() === today.toDateString();
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return dateObj.toDateString() === yesterday.toDateString();
};

/**
 * Check if date is tomorrow
 */
export const isTomorrow = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return dateObj.toDateString() === tomorrow.toDateString();
};

/**
 * Get start of day
 */
export const getStartOfDay = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
};

/**
 * Get end of day
 */
export const getEndOfDay = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    23,
    59,
    59,
    999
  );
};

/**
 * Get start of week (Monday)
 */
export const getStartOfWeek = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  const day = dateObj.getDay();
  const diff = dateObj.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
  const startOfWeek = new Date(dateObj.setDate(diff));
  return getStartOfDay(startOfWeek);
};

/**
 * Get end of week (Sunday)
 */
export const getEndOfWeek = (date: Date | string): Date => {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  return getEndOfDay(endOfWeek);
};

/**
 * Get start of month
 */
export const getStartOfMonth = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
};

/**
 * Get end of month
 */
export const getEndOfMonth = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
};

/**
 * Get start of year
 */
export const getStartOfYear = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Date(dateObj.getFullYear(), 0, 1);
};

/**
 * Get end of year
 */
export const getEndOfYear = (date: Date | string): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Date(dateObj.getFullYear(), 11, 31, 23, 59, 59, 999);
};

/**
 * Add days to date
 */
export const addDays = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to date
 */
export const addMonths = (date: Date | string, months: number): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  const result = new Date(dateObj);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to date
 */
export const addYears = (date: Date | string, years: number): Date => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  const result = new Date(dateObj);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Get difference in days between two dates
 */
export const getDaysDifference = (
  date1: Date | string,
  date2: Date | string
): number => {
  const dateObj1 = typeof date1 === "string" ? new Date(date1) : date1;
  const dateObj2 = typeof date2 === "string" ? new Date(date2) : date2;

  const diffTime = Math.abs(dateObj2.getTime() - dateObj1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get age from birth date
 */
export const getAge = (birthDate: Date | string): number => {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Check if year is leap year
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Get days in month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Parse Indonesian date format (DD/MM/YYYY)
 */
export const parseIndonesianDate = (dateString: string): Date | null => {
  const parts = dateString.split("/");

  if (parts.length !== 3) {
    return null;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  // Check if the date is valid
  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
};

/**
 * Format duration in Indonesian
 */
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} hari`;
  } else if (hours > 0) {
    return `${hours} jam`;
  } else if (minutes > 0) {
    return `${minutes} menit`;
  } else {
    return `${seconds} detik`;
  }
};

/**
 * Get time zone offset in hours
 */
export const getTimezoneOffset = (): number => {
  return -new Date().getTimezoneOffset() / 60;
};

/**
 * Convert UTC to local time
 */
export const utcToLocal = (utcDate: Date | string): Date => {
  const date = typeof utcDate === "string" ? new Date(utcDate) : utcDate;
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};

/**
 * Convert local time to UTC
 */
export const localToUtc = (localDate: Date | string): Date => {
  const date = typeof localDate === "string" ? new Date(localDate) : localDate;
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

/**
 * Check if date is in range
 */
export const isDateInRange = (
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const startObj =
    typeof startDate === "string" ? new Date(startDate) : startDate;
  const endObj = typeof endDate === "string" ? new Date(endDate) : endDate;

  return dateObj >= startObj && dateObj <= endObj;
};

/**
 * Get business days between two dates (excluding weekends)
 */
export const getBusinessDays = (
  startDate: Date | string,
  endDate: Date | string
): number => {
  const start =
    typeof startDate === "string" ? new Date(startDate) : new Date(startDate);
  const end =
    typeof endDate === "string" ? new Date(endDate) : new Date(endDate);

  let businessDays = 0;
  const current = new Date(start);

  while (current <= end) {
    const dayOfWeek = current.getDay();

    // Check if it's not Saturday (6) or Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++;
    }

    current.setDate(current.getDate() + 1);
  }

  return businessDays;
};
