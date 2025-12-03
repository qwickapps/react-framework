/**
 * QwickApps React Framework - Logger Utility
 * 
 * Optional logging with fallback to console when @qwickapps/logging is not available
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * Console-based logger fallback
 */
class ConsoleLogger implements Logger {
  constructor(private name: string) {}

  debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${this.name}] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    console.info(`[${this.name}] ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[${this.name}] ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[${this.name}] ${message}`, ...args);
  }
}

/**
 * No-op logger for when logging should be disabled
 * Not currently used but available for future configuration options
 */
// class NoOpLogger implements Logger {
//   // intentionally empty - no-op logger
//   debug(): void {}
//   // intentionally empty - no-op logger
//   info(): void {}
//   // intentionally empty - no-op logger
//   warn(): void {}
//   // intentionally empty - no-op logger
//   error(): void {}
// }

/**
 * Create logger with optional @qwickapps/logging dependency
 */
function getLogger(name: string): Logger {
  try {
    // Try to use @qwickapps/logging if available
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const logging = require('@qwickapps/logging');
    return logging.getLogger(name);
  } catch {
    // Fallback to console-based logger
    return new ConsoleLogger(name);
  }
}

/**
 * Re-export Logger type and getLogger function for compatibility
 */
export { getLogger };

/**
 * Framework-specific loggers
 */
export const loggers: Record<string, Logger> = {
  scaffold: getLogger('Scaffold'),
  navigation: getLogger('Navigation'),
  auth: getLogger('Auth'),
  theme: getLogger('Theme'),
  palette: getLogger('Palette'),
  form: getLogger('Form'),
  layout: getLogger('Layout'),
  menu: getLogger('Menu'),
  router: getLogger('Router'),
};