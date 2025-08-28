/**
 * Validation Utility Functions
 * Fungsi utility untuk validasi data
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Field validation options
 */
export interface FieldValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

/**
 * Validate required field
 */
export const validateRequired = (
  value: any,
  fieldName: string = "Field"
): ValidationResult => {
  const valid = value !== null && value !== undefined && value !== "";

  return {
    valid,
    errors: valid ? [] : [`${fieldName} wajib diisi`],
  };
};

/**
 * Validate string length
 */
export const validateLength = (
  value: string,
  min?: number,
  max?: number,
  fieldName: string = "Field"
): ValidationResult => {
  const errors: string[] = [];

  if (typeof value !== "string") {
    return {
      valid: false,
      errors: [`${fieldName} harus berupa teks`],
    };
  }

  if (min !== undefined && value.length < min) {
    errors.push(`${fieldName} minimal ${min} karakter`);
  }

  if (max !== undefined && value.length > max) {
    errors.push(`${fieldName} maksimal ${max} karakter`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate number range
 */
export const validateRange = (
  value: number,
  min?: number,
  max?: number,
  fieldName: string = "Field"
): ValidationResult => {
  const errors: string[] = [];

  if (typeof value !== "number" || isNaN(value)) {
    return {
      valid: false,
      errors: [`${fieldName} harus berupa angka`],
    };
  }

  if (min !== undefined && value < min) {
    errors.push(`${fieldName} minimal ${min}`);
  }

  if (max !== undefined && value > max) {
    errors.push(`${fieldName} maksimal ${max}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || typeof email !== "string") {
    return {
      valid: false,
      errors: ["Email wajib diisi"],
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailRegex.test(email);

  return {
    valid,
    errors: valid ? [] : ["Format email tidak valid"],
  };
};

/**
 * Validate Indonesian phone number
 */
export const validateIndonesianPhone = (phone: string): ValidationResult => {
  if (!phone || typeof phone !== "string") {
    return {
      valid: false,
      errors: ["Nomor telepon wajib diisi"],
    };
  }

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // Check Indonesian phone patterns
  const patterns = [
    /^628[1-9]\d{6,9}$/, // +62 8xxx format
    /^08[1-9]\d{6,9}$/, // 08xxx format
    /^8[1-9]\d{6,9}$/, // 8xxx format
  ];

  const valid = patterns.some((pattern) => pattern.test(cleaned));

  return {
    valid,
    errors: valid ? [] : ["Format nomor telepon tidak valid"],
  };
};

/**
 * Validate Indonesian NIK (National ID)
 */
export const validateNIK = (nik: string): ValidationResult => {
  if (!nik || typeof nik !== "string") {
    return {
      valid: false,
      errors: ["NIK wajib diisi"],
    };
  }

  // Remove all non-numeric characters
  const cleaned = nik.replace(/\D/g, "");

  // NIK must be exactly 16 digits
  if (cleaned.length !== 16) {
    return {
      valid: false,
      errors: ["NIK harus 16 digit"],
    };
  }

  // Basic validation for date part (positions 6-11)
  const dayPart = cleaned.substring(6, 8);
  const monthPart = cleaned.substring(8, 10);
  const yearPart = cleaned.substring(10, 12);

  const day = parseInt(dayPart, 10);
  const month = parseInt(monthPart, 10);
  const year = parseInt(yearPart, 10);

  // Adjust day for female (subtract 40)
  const actualDay = day > 40 ? day - 40 : day;

  if (actualDay < 1 || actualDay > 31) {
    return {
      valid: false,
      errors: ["NIK tidak valid: tanggal lahir tidak sesuai"],
    };
  }

  if (month < 1 || month > 12) {
    return {
      valid: false,
      errors: ["NIK tidak valid: bulan lahir tidak sesuai"],
    };
  }

  return {
    valid: true,
    errors: [],
  };
};

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): ValidationResult => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  const errors: string[] = [];

  if (!password || typeof password !== "string") {
    return {
      valid: false,
      errors: ["Password wajib diisi"],
    };
  }

  if (password.length < minLength) {
    errors.push(`Password minimal ${minLength} karakter`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password harus mengandung huruf besar");
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password harus mengandung huruf kecil");
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push("Password harus mengandung angka");
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password harus mengandung karakter khusus");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate URL format
 */
export const validateUrl = (
  url: string,
  allowEmpty: boolean = false
): ValidationResult => {
  if (!url || typeof url !== "string") {
    return {
      valid: allowEmpty,
      errors: allowEmpty ? [] : ["URL wajib diisi"],
    };
  }

  try {
    new URL(url);
    return {
      valid: true,
      errors: [],
    };
  } catch {
    return {
      valid: false,
      errors: ["Format URL tidak valid"],
    };
  }
};

/**
 * Validate date format
 */
export const validateDate = (
  date: string | Date,
  format: "DD/MM/YYYY" | "YYYY-MM-DD" | "ISO" = "DD/MM/YYYY"
): ValidationResult => {
  if (!date) {
    return {
      valid: false,
      errors: ["Tanggal wajib diisi"],
    };
  }

  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else {
    if (format === "DD/MM/YYYY") {
      const parts = date.split("/");
      if (parts.length !== 3) {
        return {
          valid: false,
          errors: ["Format tanggal harus DD/MM/YYYY"],
        };
      }

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const year = parseInt(parts[2], 10);

      dateObj = new Date(year, month, day);
    } else {
      dateObj = new Date(date);
    }
  }

  if (isNaN(dateObj.getTime())) {
    return {
      valid: false,
      errors: ["Tanggal tidak valid"],
    };
  }

  return {
    valid: true,
    errors: [],
  };
};

/**
 * Validate age range
 */
export const validateAge = (
  birthDate: string | Date,
  minAge?: number,
  maxAge?: number
): ValidationResult => {
  const dateValidation = validateDate(birthDate);
  if (!dateValidation.valid) {
    return dateValidation;
  }

  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  const errors: string[] = [];

  if (minAge !== undefined && age < minAge) {
    errors.push(`Usia minimal ${minAge} tahun`);
  }

  if (maxAge !== undefined && age > maxAge) {
    errors.push(`Usia maksimal ${maxAge} tahun`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate file upload
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    required?: boolean;
  } = {}
): ValidationResult => {
  const { maxSize, allowedTypes, required = true } = options;
  const errors: string[] = [];

  if (!file) {
    return {
      valid: !required,
      errors: required ? ["File wajib dipilih"] : [],
    };
  }

  if (maxSize && file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    errors.push(`Ukuran file maksimal ${maxSizeMB} MB`);
  }

  if (allowedTypes && allowedTypes.length > 0) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      errors.push(`Tipe file harus: ${allowedTypes.join(", ")}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate field with custom options
 */
export const validateField = (
  value: any,
  fieldName: string,
  options: FieldValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];

  // Check required
  if (options.required) {
    const requiredResult = validateRequired(value, fieldName);
    if (!requiredResult.valid) {
      return requiredResult;
    }
  }

  // Skip other validations if value is empty and not required
  if (
    !options.required &&
    (value === null || value === undefined || value === "")
  ) {
    return { valid: true, errors: [] };
  }

  // Check string length
  if (
    typeof value === "string" &&
    (options.minLength !== undefined || options.maxLength !== undefined)
  ) {
    const lengthResult = validateLength(
      value,
      options.minLength,
      options.maxLength,
      fieldName
    );
    if (!lengthResult.valid) {
      errors.push(...lengthResult.errors);
    }
  }

  // Check number range
  if (
    typeof value === "number" &&
    (options.min !== undefined || options.max !== undefined)
  ) {
    const rangeResult = validateRange(
      value,
      options.min,
      options.max,
      fieldName
    );
    if (!rangeResult.valid) {
      errors.push(...rangeResult.errors);
    }
  }

  // Check pattern
  if (options.pattern && typeof value === "string") {
    if (!options.pattern.test(value)) {
      errors.push(`${fieldName} format tidak sesuai`);
    }
  }

  // Check custom validation
  if (options.custom) {
    const customResult = options.custom(value);
    if (typeof customResult === "string") {
      errors.push(customResult);
    } else if (!customResult) {
      errors.push(`${fieldName} tidak valid`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate multiple fields
 */
export const validateFields = (
  data: Record<string, any>,
  rules: Record<string, FieldValidationOptions>
): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {};

  Object.entries(rules).forEach(([fieldName, options]) => {
    const value = data[fieldName];
    results[fieldName] = validateField(value, fieldName, options);
  });

  return results;
};

/**
 * Check if all validations passed
 */
export const isValidationPassed = (
  results: Record<string, ValidationResult>
): boolean => {
  return Object.values(results).every((result) => result.valid);
};

/**
 * Get all validation errors
 */
export const getAllValidationErrors = (
  results: Record<string, ValidationResult>
): string[] => {
  const allErrors: string[] = [];

  Object.values(results).forEach((result) => {
    allErrors.push(...result.errors);
  });

  return allErrors;
};

/**
 * Validate Indonesian postal code
 */
export const validatePostalCode = (postalCode: string): ValidationResult => {
  if (!postalCode || typeof postalCode !== "string") {
    return {
      valid: false,
      errors: ["Kode pos wajib diisi"],
    };
  }

  const cleaned = postalCode.replace(/\D/g, "");

  if (cleaned.length !== 5) {
    return {
      valid: false,
      errors: ["Kode pos harus 5 digit"],
    };
  }

  return {
    valid: true,
    errors: [],
  };
};

/**
 * Validate credit card number (basic Luhn algorithm)
 */
export const validateCreditCard = (cardNumber: string): ValidationResult => {
  if (!cardNumber || typeof cardNumber !== "string") {
    return {
      valid: false,
      errors: ["Nomor kartu wajib diisi"],
    };
  }

  const cleaned = cardNumber.replace(/\D/g, "");

  if (cleaned.length < 13 || cleaned.length > 19) {
    return {
      valid: false,
      errors: ["Nomor kartu tidak valid"],
    };
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  const valid = sum % 10 === 0;

  return {
    valid,
    errors: valid ? [] : ["Nomor kartu tidak valid"],
  };
};
