/**
 * useToggle Hook
 * Hook untuk toggle state management
 */

import { useState, useCallback } from "react";

export type ToggleActions = {
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
};

export function useToggle(
  initialValue: boolean = false
): [boolean, ToggleActions] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const setValueCallback = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  const actions: ToggleActions = {
    toggle,
    setTrue,
    setFalse,
    setValue: setValueCallback,
  };

  return [value, actions];
}

/**
 * useMultiToggle Hook
 * Hook untuk multiple toggle states
 */
export function useMultiToggle(initialValues: Record<string, boolean> = {}) {
  const [values, setValues] = useState<Record<string, boolean>>(initialValues);

  const toggle = useCallback((key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const setTrue = useCallback((key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: true,
    }));
  }, []);

  const setFalse = useCallback((key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  const setValue = useCallback((key: string, value: boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const toggleAll = useCallback((value?: boolean) => {
    setValues((prev) => {
      const newValues = { ...prev };
      const targetValue =
        value !== undefined ? value : !Object.values(prev).every(Boolean);

      Object.keys(newValues).forEach((key) => {
        newValues[key] = targetValue;
      });

      return newValues;
    });
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const isAllTrue = Object.values(values).every(Boolean);
  const isAllFalse = Object.values(values).every((value) => !value);
  const someTrue = Object.values(values).some(Boolean);

  return {
    values,
    toggle,
    setTrue,
    setFalse,
    setValue,
    toggleAll,
    reset,
    isAllTrue,
    isAllFalse,
    someTrue,
    getToggleActions: (key: string): ToggleActions => ({
      toggle: () => toggle(key),
      setTrue: () => setTrue(key),
      setFalse: () => setFalse(key),
      setValue: (value: boolean) => setValue(key, value),
    }),
  };
}

/**
 * useToggleGroup Hook
 * Hook untuk toggle group dengan exclusive mode
 */
export function useToggleGroup(
  initialValues: Record<string, boolean> = {},
  exclusive: boolean = false
) {
  const [values, setValues] = useState<Record<string, boolean>>(initialValues);

  const toggle = useCallback(
    (key: string) => {
      setValues((prev) => {
        if (exclusive) {
          // In exclusive mode, only one can be true
          const newValues: Record<string, boolean> = {};
          Object.keys(prev).forEach((k) => {
            newValues[k] = k === key ? !prev[key] : false;
          });
          return newValues;
        } else {
          return {
            ...prev,
            [key]: !prev[key],
          };
        }
      });
    },
    [exclusive]
  );

  const setActive = useCallback(
    (key: string) => {
      setValues((prev) => {
        if (exclusive) {
          // In exclusive mode, deactivate all others
          const newValues: Record<string, boolean> = {};
          Object.keys(prev).forEach((k) => {
            newValues[k] = k === key;
          });
          return newValues;
        } else {
          return {
            ...prev,
            [key]: true,
          };
        }
      });
    },
    [exclusive]
  );

  const setInactive = useCallback((key: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const activeKeys = Object.keys(values).filter((key) => values[key]);
  const activeKey = exclusive ? activeKeys[0] || null : null;

  return {
    values,
    toggle,
    setActive,
    setInactive,
    reset,
    activeKeys,
    activeKey,
    isActive: (key: string) => values[key] || false,
  };
}
