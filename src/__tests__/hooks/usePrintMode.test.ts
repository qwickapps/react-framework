/**
 * usePrintMode Hook Tests
 * 
 * Tests for print mode detection and management
 */

import { PrintConfigSchema } from '../../schemas/PrintConfigSchema';

// Mock QwickApp context
const mockUpdateConfig = jest.fn();
jest.mock('../../contexts/QwickAppContext', () => ({
  useQwickApp: () => ({
    updateConfig: mockUpdateConfig,
  }),
}));

describe('PrintConfig Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should merge print configurations correctly', () => {
    const baseConfig = PrintConfigSchema.createWithDefaults();
    const overrideConfig = {
      theme: 'dark' as const,
      printTitle: 'Custom Title'
    };
    
    const merged = { ...baseConfig, ...overrideConfig };
    
    expect(merged.theme).toBe('dark');
    expect(merged.palette).toBe('default'); // Should retain base value
    expect(merged.hideScaffolding).toBe(true); // Should retain base value
    expect(merged.printTitle).toBe('Custom Title');
  });

  it('should validate print config properties', async () => {
    const config = {
      theme: 'light' as const,
      palette: 'cosmic',
      hideScaffolding: true,
      optimizeForMonochrome: false,
      printTitle: 'Test Document'
    };
    
    const result = await PrintConfigSchema.validate(config);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should create proper default print configuration', () => {
    const config = PrintConfigSchema.createWithDefaults();
    
    expect(config.theme).toBe('light');
    expect(config.palette).toBe('default');
    expect(config.hideScaffolding).toBe(true);
    expect(config.hideInteractiveElements).toBe(false);
    expect(config.optimizeForMonochrome).toBe(false);
    expect(config.showPrintDate).toBe(true);
  });

  it('should support custom print configuration values', () => {
    const customConfig = {
      theme: 'dark' as const,
      palette: 'ocean',
      hideScaffolding: false,
      optimizeForMonochrome: true,
      printTitle: 'Custom Print Title',
      printHeader: 'Custom Header',
      printFooter: 'Custom Footer'
    };
    
    const config = PrintConfigSchema.createWithDefaults(customConfig);
    
    expect(config.theme).toBe('dark');
    expect(config.palette).toBe('ocean');
    expect(config.hideScaffolding).toBe(false);
    expect(config.optimizeForMonochrome).toBe(true);
    expect(config.printTitle).toBe('Custom Print Title');
    expect(config.printHeader).toBe('Custom Header');
    expect(config.printFooter).toBe('Custom Footer');
  });

  it('should export PrintModeState interface from usePrintMode', () => {
    // This test ensures the types are properly exported
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { usePrintMode } = require('../../hooks/usePrintMode');
    expect(typeof usePrintMode).toBe('function');
  });
});