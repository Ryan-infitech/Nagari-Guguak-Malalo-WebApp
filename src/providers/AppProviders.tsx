/**
 * App Providers Component
 * Komponen untuk menggabungkan semua providers dalam satu wrapper
 */

"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";

/**
 * App Providers Props
 */
interface AppProvidersProps {
  children: ReactNode;
}

/**
 * App Providers Component
 * Wrapper yang menggabungkan semua providers yang diperlukan aplikasi
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundaryProvider>
      <QueryProvider>
        <AuthProvider>
          {children}

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              style: {
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              },
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  );
}

/**
 * Portal Warga Providers
 * Providers khusus untuk portal warga dengan konfigurasi khusus
 */
export function PortalProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundaryProvider level="app">
      <QueryProvider>
        <AuthProvider>
          {children}

          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={5000}
            expand={true}
            visibleToasts={3}
            toastOptions={{
              style: {
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                padding: "1rem",
              },
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  );
}

/**
 * Admin Providers
 * Providers khusus untuk admin dashboard dengan konfigurasi khusus
 */
export function AdminProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundaryProvider level="app">
      <QueryProvider>
        <AuthProvider>
          {children}

          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={6000}
            expand={true}
            visibleToasts={5}
            toastOptions={{
              style: {
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                padding: "0.875rem",
                minWidth: "320px",
              },
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  );
}

/**
 * Public Providers
 * Providers untuk halaman publik (tanpa auth)
 */
export function PublicProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundaryProvider level="page">
      <QueryProvider>
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
          visibleToasts={3}
          toastOptions={{
            style: {
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            },
          }}
        />
      </QueryProvider>
    </ErrorBoundaryProvider>
  );
}

/**
 * Development Providers
 * Providers dengan konfigurasi khusus untuk development
 */
export function DevProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundaryProvider
      level="app"
      onError={(error, errorInfo) => {
        console.group("🚨 Development Error");
        console.error("Error:", error);
        console.error("Error Info:", errorInfo);
        console.groupEnd();
      }}
    >
      <QueryProvider>
        <AuthProvider>
          {children}

          <Toaster
            position="bottom-left"
            richColors
            closeButton
            duration={10000}
            expand={true}
            visibleToasts={10}
            toastOptions={{
              style: {
                background: "white",
                border: "2px solid #3b82f6",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                padding: "1rem",
                fontFamily: "monospace",
              },
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  );
}

/**
 * Provider configuration constants
 */
export const providerConfig = {
  query: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 3,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  },

  toast: {
    app: {
      position: "top-right" as const,
      duration: 4000,
      visibleToasts: 3,
    },
    portal: {
      position: "bottom-right" as const,
      duration: 5000,
      visibleToasts: 3,
    },
    admin: {
      position: "top-center" as const,
      duration: 6000,
      visibleToasts: 5,
    },
    dev: {
      position: "bottom-left" as const,
      duration: 10000,
      visibleToasts: 10,
    },
  },

  error: {
    reportToConsole: true,
    reportToService: process.env.NODE_ENV === "production",
    showToast: true,
    autoReload: false,
  },
};

/**
 * Provider factory function
 */
export function createProviders(
  type: "app" | "portal" | "admin" | "public" | "dev" = "app"
) {
  switch (type) {
    case "portal":
      return PortalProviders;
    case "admin":
      return AdminProviders;
    case "public":
      return PublicProviders;
    case "dev":
      return DevProviders;
    default:
      return AppProviders;
  }
}

export default AppProviders;
