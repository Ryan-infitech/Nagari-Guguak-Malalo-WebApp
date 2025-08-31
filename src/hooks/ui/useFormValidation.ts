/**
 * useFormValidation Hook
 * Hook untuk form validation utilities
 */

import { useState, useCallback, useMemo } from "react";

// Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  numeric?: boolean;
  integer?: boolean;
  min?: number;
  max?: number;
  mustMatch?: string; // field name to match
}

export interface FieldValidation {
  value: any;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

export interface FormState {
  fields: Record<string, FieldValidation>;
  isValid: boolean;
  isSubmitting: boolean;
  submitCount: number;
  errors: Record<string, string>;
}

export interface ValidationSchema {
  [fieldName: string]: ValidationRule;
}

// Predefined validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+62|62|0)[0-9]{9,13}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  numeric: /^[0-9]+(\.[0-9]+)?$/,
  integer: /^[0-9]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z]+$/,
  nik: /^[0-9]{16}$/,
  ktp: /^[0-9]{16}$/,
  noKK: /^[0-9]{16}$/,
  zipCode: /^[0-9]{5}$/,
} as const;

// Common validation messages
export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} wajib diisi`,
  minLength: (field: string, min: number) => `${field} minimal ${min} karakter`,
  maxLength: (field: string, max: number) =>
    `${field} maksimal ${max} karakter`,
  email: "Format email tidak valid",
  phone: "Format nomor telepon tidak valid",
  url: "Format URL tidak valid",
  numeric: "Harus berupa angka",
  integer: "Harus berupa bilangan bulat",
  min: (field: string, min: number) => `${field} minimal ${min}`,
  max: (field: string, max: number) => `${field} maksimal ${max}`,
  mustMatch: (field: string, matchField: string) =>
    `${field} harus sama dengan ${matchField}`,
  nik: "NIK harus 16 digit",
  ktp: "Nomor KTP harus 16 digit",
  noKK: "Nomor KK harus 16 digit",
} as const;

export function useFormValidation(
  schema: ValidationSchema,
  initialValues: Record<string, any> = {}
) {
  const [formState, setFormState] = useState<FormState>(() => {
    const fields: Record<string, FieldValidation> = {};

    Object.keys(schema).forEach((fieldName) => {
      fields[fieldName] = {
        value: initialValues[fieldName] || "",
        error: null,
        touched: false,
        dirty: false,
      };
    });

    return {
      fields,
      isValid: false,
      isSubmitting: false,
      submitCount: 0,
      errors: {},
    };
  });

  // Validate single field
  const validateField = useCallback(
    (fieldName: string, value: any): string | null => {
      const rule = schema[fieldName];
      if (!rule) return null;

      // Required validation
      if (
        rule.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
      ) {
        return VALIDATION_MESSAGES.required(fieldName);
      }

      // Skip other validations if value is empty and not required
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return null;
      }

      const stringValue = String(value);

      // MinLength validation
      if (rule.minLength && stringValue.length < rule.minLength) {
        return VALIDATION_MESSAGES.minLength(fieldName, rule.minLength);
      }

      // MaxLength validation
      if (rule.maxLength && stringValue.length > rule.maxLength) {
        return VALIDATION_MESSAGES.maxLength(fieldName, rule.maxLength);
      }

      // Email validation
      if (rule.email && !VALIDATION_PATTERNS.email.test(stringValue)) {
        return VALIDATION_MESSAGES.email;
      }

      // Phone validation
      if (rule.phone && !VALIDATION_PATTERNS.phone.test(stringValue)) {
        return VALIDATION_MESSAGES.phone;
      }

      // URL validation
      if (rule.url && !VALIDATION_PATTERNS.url.test(stringValue)) {
        return VALIDATION_MESSAGES.url;
      }

      // Numeric validation
      if (rule.numeric && !VALIDATION_PATTERNS.numeric.test(stringValue)) {
        return VALIDATION_MESSAGES.numeric;
      }

      // Integer validation
      if (rule.integer && !VALIDATION_PATTERNS.integer.test(stringValue)) {
        return VALIDATION_MESSAGES.integer;
      }

      // Min value validation
      if (rule.min !== undefined) {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < rule.min) {
          return VALIDATION_MESSAGES.min(fieldName, rule.min);
        }
      }

      // Max value validation
      if (rule.max !== undefined) {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue > rule.max) {
          return VALIDATION_MESSAGES.max(fieldName, rule.max);
        }
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(stringValue)) {
        return `Format ${fieldName} tidak valid`;
      }

      // Must match validation
      if (rule.mustMatch) {
        const matchValue = formState.fields[rule.mustMatch]?.value;
        if (value !== matchValue) {
          return VALIDATION_MESSAGES.mustMatch(fieldName, rule.mustMatch);
        }
      }

      // Custom validation
      if (rule.custom) {
        return rule.custom(value);
      }

      return null;
    },
    [schema, formState.fields]
  );

  // Validate all fields
  const validateAllFields = useCallback((): boolean => {
    const newFields = { ...formState.fields };
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(schema).forEach((fieldName) => {
      const error = validateField(fieldName, newFields[fieldName].value);
      newFields[fieldName] = {
        ...newFields[fieldName],
        error,
        touched: true,
      };

      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setFormState((prev) => ({
      ...prev,
      fields: newFields,
      errors: newErrors,
      isValid,
    }));

    return isValid;
  }, [formState.fields, schema, validateField]);

  // Set field value
  const setFieldValue = useCallback(
    (fieldName: string, value: any) => {
      setFormState((prev) => {
        const newFields = { ...prev.fields };
        const error = validateField(fieldName, value);

        newFields[fieldName] = {
          value,
          error,
          touched: prev.fields[fieldName]?.touched || false,
          dirty: true,
        };

        // Re-validate mustMatch fields
        Object.keys(schema).forEach((otherFieldName) => {
          const otherRule = schema[otherFieldName];
          if (
            otherRule.mustMatch === fieldName &&
            prev.fields[otherFieldName]
          ) {
            const otherError = validateField(
              otherFieldName,
              prev.fields[otherFieldName].value
            );
            newFields[otherFieldName] = {
              ...newFields[otherFieldName],
              error: otherError,
            };
          }
        });

        const newErrors: Record<string, string> = {};
        let isValid = true;

        Object.values(newFields).forEach((field, index) => {
          const fieldName = Object.keys(newFields)[index];
          if (field.error) {
            newErrors[fieldName] = field.error;
            isValid = false;
          }
        });

        return {
          ...prev,
          fields: newFields,
          errors: newErrors,
          isValid,
        };
      });
    },
    [validateField, schema]
  );

  // Set field touched
  const setFieldTouched = useCallback(
    (fieldName: string, touched: boolean = true) => {
      setFormState((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [fieldName]: {
            ...prev.fields[fieldName],
            touched,
          },
        },
      }));
    },
    []
  );

  // Handle field blur
  const handleBlur = useCallback(
    (fieldName: string) => {
      setFieldTouched(fieldName, true);
    },
    [setFieldTouched]
  );

  // Handle field change
  const handleChange = useCallback(
    (fieldName: string, value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  // Reset form
  const resetForm = useCallback(
    (newInitialValues?: Record<string, any>) => {
      const fields: Record<string, FieldValidation> = {};
      const valuesToUse = newInitialValues || initialValues;

      Object.keys(schema).forEach((fieldName) => {
        fields[fieldName] = {
          value: valuesToUse[fieldName] || "",
          error: null,
          touched: false,
          dirty: false,
        };
      });

      setFormState({
        fields,
        isValid: false,
        isSubmitting: false,
        submitCount: 0,
        errors: {},
      });
    },
    [schema, initialValues]
  );

  // Set form submitting state
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isSubmitting,
    }));
  }, []);

  // Handle form submit
  const handleSubmit = useCallback(
    (onSubmit: (values: Record<string, any>) => void | Promise<void>) => {
      return async (e?: React.FormEvent) => {
        if (e) {
          e.preventDefault();
        }

        setFormState((prev) => ({
          ...prev,
          submitCount: prev.submitCount + 1,
        }));

        const isValid = validateAllFields();

        if (isValid) {
          setSubmitting(true);

          try {
            const values: Record<string, any> = {};
            Object.keys(formState.fields).forEach((fieldName) => {
              values[fieldName] = formState.fields[fieldName].value;
            });

            await onSubmit(values);
          } finally {
            setSubmitting(false);
          }
        }
      };
    },
    [formState.fields, validateAllFields, setSubmitting]
  );

  // Get field props (for easy integration with form components)
  const getFieldProps = useCallback(
    (fieldName: string) => {
      const field = formState.fields[fieldName];

      return {
        value: field?.value || "",
        onChange: (value: any) => handleChange(fieldName, value),
        onBlur: () => handleBlur(fieldName),
        error: field?.error,
        touched: field?.touched,
        dirty: field?.dirty,
      };
    },
    [formState.fields, handleChange, handleBlur]
  );

  // Get form values
  const values = useMemo(() => {
    const result: Record<string, any> = {};
    Object.keys(formState.fields).forEach((fieldName) => {
      result[fieldName] = formState.fields[fieldName].value;
    });
    return result;
  }, [formState.fields]);

  // Check if form has errors
  const hasErrors = useMemo(() => {
    return Object.keys(formState.errors).length > 0;
  }, [formState.errors]);

  // Check if form is dirty
  const isDirty = useMemo(() => {
    return Object.values(formState.fields).some((field) => field.dirty);
  }, [formState.fields]);

  return {
    // State
    values,
    errors: formState.errors,
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
    submitCount: formState.submitCount,
    hasErrors,
    isDirty,

    // Field operations
    setFieldValue,
    setFieldTouched,
    getFieldProps,
    validateField,

    // Form operations
    handleChange,
    handleBlur,
    handleSubmit,
    validateAllFields,
    resetForm,
    setSubmitting,

    // Individual field access
    fields: formState.fields,
  };
}

// Predefined validation schemas for common forms
export const COMMON_SCHEMAS = {
  login: {
    email: { required: true, email: true },
    password: { required: true, minLength: 6 },
  },

  register: {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, email: true },
    password: { required: true, minLength: 8 },
    confirmPassword: { required: true, mustMatch: "password" },
    termsAccepted: { required: true },
  },

  profile: {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, email: true },
    phone: { phone: true },
    bio: { maxLength: 500 },
  },

  document: {
    documentType: { required: true },
    purpose: { required: true, minLength: 10, maxLength: 500 },
    notes: { maxLength: 1000 },
  },

  contact: {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, email: true },
    subject: { required: true, minLength: 5, maxLength: 200 },
    message: { required: true, minLength: 10, maxLength: 1000 },
  },
} as const;
