/**
 * useModal Hook
 * Hook untuk modal state management
 */

import { useState, useCallback } from "react";

export interface ModalState {
  isOpen: boolean;
  modalId?: string;
  data?: any;
}

export function useModal(initialModalId?: string) {
  const [modals, setModals] = useState<Record<string, ModalState>>({});

  // Open modal
  const openModal = useCallback((modalId: string, data?: any) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: {
        isOpen: true,
        modalId,
        data,
      },
    }));
  }, []);

  // Close modal
  const closeModal = useCallback((modalId: string) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: {
        ...prev[modalId],
        isOpen: false,
      },
    }));
  }, []);

  // Toggle modal
  const toggleModal = useCallback((modalId: string, data?: any) => {
    setModals((prev) => {
      const currentModal = prev[modalId];
      const isCurrentlyOpen = currentModal?.isOpen || false;

      return {
        ...prev,
        [modalId]: {
          isOpen: !isCurrentlyOpen,
          modalId,
          data: !isCurrentlyOpen ? data : currentModal?.data,
        },
      };
    });
  }, []);

  // Close all modals
  const closeAllModals = useCallback(() => {
    setModals((prev) => {
      const updatedModals = { ...prev };
      Object.keys(updatedModals).forEach((modalId) => {
        updatedModals[modalId] = {
          ...updatedModals[modalId],
          isOpen: false,
        };
      });
      return updatedModals;
    });
  }, []);

  // Get modal state
  const getModal = useCallback(
    (modalId: string): ModalState => {
      return modals[modalId] || { isOpen: false };
    },
    [modals]
  );

  // Check if modal is open
  const isModalOpen = useCallback(
    (modalId: string): boolean => {
      return modals[modalId]?.isOpen || false;
    },
    [modals]
  );

  // Get modal data
  const getModalData = useCallback(
    (modalId: string): any => {
      return modals[modalId]?.data;
    },
    [modals]
  );

  // For default modal (when initialModalId is provided)
  const isOpen = initialModalId ? isModalOpen(initialModalId) : false;
  const data = initialModalId ? getModalData(initialModalId) : null;
  const open = initialModalId
    ? (data?: any) => openModal(initialModalId, data)
    : () => {};
  const close = initialModalId ? () => closeModal(initialModalId) : () => {};
  const toggle = initialModalId
    ? (data?: any) => toggleModal(initialModalId, data)
    : () => {};

  return {
    // State
    modals,
    isOpen,
    data,

    // Actions for specific modal (when initialModalId provided)
    open,
    close,
    toggle,

    // Actions for any modal
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,

    // Getters
    getModal,
    isModalOpen,
    getModalData,
  };
}
