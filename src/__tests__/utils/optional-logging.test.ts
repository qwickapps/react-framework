/**
 * Test for optional logging dependency fallback
 */

import { getLogger, loggers } from '../logger';

// Mock the require function to simulate missing @qwickapps/logging package
const originalRequire = require;

describe('Optional logging dependency', () => {
  beforeEach(() => {
    // Reset console spy before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original require
    (global as unknown as { require: typeof require }).require = originalRequire;
  });

  it('should use console fallback when @qwickapps/logging is not available', () => {
    // Mock require to throw an error (simulating missing package)
    (global as unknown as { require: jest.Mock }).require = jest.fn().mockImplementation((module: string) => {
      if (module === '@qwickapps/logging') {
        throw new Error('Cannot find module');
      }
      return originalRequire(module);
    });

    // Spy on console methods
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

    // Create a new logger (should use fallback)
    const logger = getLogger('TestLogger');
    logger.info('Test message');

    expect(consoleSpy).toHaveBeenCalledWith('[TestLogger] Test message');
    consoleSpy.mockRestore();
  });

  it('should have all framework loggers available', () => {
    expect(loggers).toHaveProperty('scaffold');
    expect(loggers).toHaveProperty('navigation');
    expect(loggers).toHaveProperty('auth');
    expect(loggers).toHaveProperty('theme');
    expect(loggers).toHaveProperty('palette');
    expect(loggers).toHaveProperty('form');
    expect(loggers).toHaveProperty('layout');
    expect(loggers).toHaveProperty('menu');
    expect(loggers).toHaveProperty('router');

    // Each logger should have the required methods
    Object.values(loggers).forEach(logger => {
      expect(typeof logger.debug).toBe('function');
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
    });
  });

  it('should suppress debug logs in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    // Mock require to throw an error (use fallback)
    (global as unknown as { require: jest.Mock }).require = jest.fn().mockImplementation((module: string) => {
      if (module === '@qwickapps/logging') {
        throw new Error('Cannot find module');
      }
      return originalRequire(module);
    });

    const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
    
    const logger = getLogger('TestLogger');
    logger.debug('Debug message');

    expect(debugSpy).not.toHaveBeenCalled();
    
    debugSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });
});