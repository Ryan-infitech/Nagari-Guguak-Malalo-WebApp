/**
 * Logger Utility
 * Simple logging utility for frontend application
 */

/**
 * Log levels
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Logger interface
 */
interface Logger {
  error: (message: string, data?: any) => void;
  warn: (message: string, data?: any) => void;
  info: (message: string, data?: any) => void;
  debug: (message: string, data?: any) => void;
}

/**
 * Simple logger implementation
 */
class SimpleLogger implements Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log error message
   */
  error(message: string, data?: any): void {
    console.error(`[ERROR] ${message}`, data || '');

    // In production, send to external logging service
    if (!this.isDevelopment) {
      this.sendToExternalService('error', message, data);
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    console.warn(`[WARN] ${message}`, data || '');

    if (!this.isDevelopment) {
      this.sendToExternalService('warn', message, data);
    }
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data || '');
    }
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }

  /**
   * Send logs to external service (placeholder)
   */
  private sendToExternalService(level: string, message: string, data?: any): void {
    // This would send logs to external service like Sentry, LogRocket, etc.
    // For now, just a placeholder
    try {
      // Example: Send to API endpoint
      // fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ level, message, data, timestamp: new Date().toISOString() })
      // });
    } catch (error) {
      // Silently fail if logging service is unavailable
    }
  }
}

/**
 * Logger instance
 */
export const logger: Logger = new SimpleLogger();

/**
 * Create contextual logger
 */
export function createLogger(context: string): Logger {
  return {
    error: (message: string, data?: any) => logger.error(`[${context}] ${message}`, data),
    warn: (message: string, data?: any) => logger.warn(`[${context}] ${message}`, data),
    info: (message: string, data?: any) => logger.info(`[${context}] ${message}`, data),
    debug: (message: string, data?: any) => logger.debug(`[${context}] ${message}`, data),
  };
}

export default logger;
