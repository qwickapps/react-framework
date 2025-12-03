/**
 * PrintConfig Schema Tests
 * 
 * Tests for PrintConfigSchema functionality and validation
 */

import { PrintConfigSchema } from '../../schemas/PrintConfigSchema';

describe('PrintConfigSchema', () => {
  it('should create a valid PrintConfigSchema instance', () => {
    const printConfig = new PrintConfigSchema();
    expect(printConfig).toBeInstanceOf(PrintConfigSchema);
  });

  it('should have correct schema metadata', () => {
    const schema = PrintConfigSchema.getSchema();
    expect(schema.name).toBe('PrintConfig');
    expect(schema.version).toBe('1.0.0');
  });

  it('should have proper default values', () => {
    const printConfig = PrintConfigSchema.createWithDefaults();
    expect(printConfig.theme).toBe('light');
    expect(printConfig.palette).toBe('default');
    expect(printConfig.hideScaffolding).toBe(true);
    expect(printConfig.hideInteractiveElements).toBe(false);
    expect(printConfig.optimizeForMonochrome).toBe(false);
    expect(printConfig.showPrintDate).toBe(true);
  });

  it('should validate theme values correctly', async () => {
    const lightData = { theme: 'light' as const };
    const darkData = { theme: 'dark' as const };
    
    const lightResult = await PrintConfigSchema.validate(lightData);
    const darkResult = await PrintConfigSchema.validate(darkData);
    
    expect(lightResult.isValid).toBe(true);
    expect(darkResult.isValid).toBe(true);
  });

  it('should validate boolean properties correctly', async () => {
    const data = {
      hideScaffolding: false,
      hideInteractiveElements: true,
      optimizeForMonochrome: true,
      showPrintDate: false
    };
    
    const result = await PrintConfigSchema.validate(data);
    expect(result.isValid).toBe(true);
    
    const printConfig = PrintConfigSchema.createWithDefaults(data);
    expect(printConfig.hideScaffolding).toBe(false);
    expect(printConfig.hideInteractiveElements).toBe(true);
    expect(printConfig.optimizeForMonochrome).toBe(true);
    expect(printConfig.showPrintDate).toBe(false);
  });

  it('should handle optional string properties', async () => {
    const data = {
      printTitle: 'Custom Print Title',
      printHeader: 'Custom Header',
      printFooter: 'Custom Footer',
      palette: 'ocean'
    };
    
    const result = await PrintConfigSchema.validate(data);
    expect(result.isValid).toBe(true);
    
    const printConfig = PrintConfigSchema.createWithDefaults(data);
    expect(printConfig.printTitle).toBe('Custom Print Title');
    expect(printConfig.printHeader).toBe('Custom Header');
    expect(printConfig.printFooter).toBe('Custom Footer');
    expect(printConfig.palette).toBe('ocean');
  });

  it('should create instance with data correctly', () => {
    const data = {
      theme: 'dark' as const,
      palette: 'cosmic',
      printTitle: 'Test Document',
      hideScaffolding: false
    };
    
    const printConfig = PrintConfigSchema.createWithDefaults(data);
    expect(printConfig.theme).toBe('dark');
    expect(printConfig.palette).toBe('cosmic');
    expect(printConfig.printTitle).toBe('Test Document');
    expect(printConfig.hideScaffolding).toBe(false);
  });

  it('should restore from JSON correctly', () => {
    const jsonData = {
      theme: 'dark' as const,
      palette: 'winter',
      hideScaffolding: false,
      optimizeForMonochrome: true,
      printTitle: 'Restored Document',
      printHeader: 'Restored Header'
    };
    
    const printConfig = PrintConfigSchema.createWithDefaults(jsonData);
    expect(printConfig.theme).toBe('dark');
    expect(printConfig.palette).toBe('winter');
    expect(printConfig.hideScaffolding).toBe(false);
    expect(printConfig.optimizeForMonochrome).toBe(true);
    expect(printConfig.printTitle).toBe('Restored Document');
    expect(printConfig.printHeader).toBe('Restored Header');
  });

  it('should merge configurations correctly', () => {
    const baseConfig = new PrintConfigSchema();
    baseConfig.theme = 'light';
    baseConfig.palette = 'default';
    
    const overrideData = {
      theme: 'dark',
      printTitle: 'Override Title'
    };
    
    const merged = { ...baseConfig, ...overrideData };
    expect(merged.theme).toBe('dark');
    expect(merged.palette).toBe('default'); // Should retain base value
    expect(merged.printTitle).toBe('Override Title');
  });
});