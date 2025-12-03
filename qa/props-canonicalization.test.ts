/**
 * Props Canonicalization Tests
 * 
 * Validates that the props canonicalization system works correctly:
 * - backgroundColor → background mapping in normalizeViewProps()
 * - Backward compatibility (backgroundColor still works)
 * - background prop takes precedence over backgroundColor
 * - Prop deduplication logic works properly
 * - Event handler string conversion functions correctly
 * - Grid value coercion works as expected
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { describe, test, expect } from '@jest/globals';
import { normalizeViewProps, ViewProps } from '../src/components/shared/viewProps';

describe('Props Canonicalization Tests', () => {

  describe('Background Props Canonicalization', () => {
    test('backgroundColor maps to background when background is not provided', () => {
      const props: ViewProps = {
        backgroundColor: '#ff0000',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.background).toBe('#ff0000');
      expect(normalized.backgroundColor).toBeUndefined();
    });

    test('background prop takes precedence over backgroundColor', () => {
      const props: ViewProps = {
        background: 'linear-gradient(45deg, red, blue)',
        backgroundColor: '#ff0000',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.background).toBe('linear-gradient(45deg, red, blue)');
      expect(normalized.backgroundColor).toBeUndefined();
    });

    test('background prop is preserved when backgroundColor is not provided', () => {
      const props: ViewProps = {
        background: 'primary.main',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.background).toBe('primary.main');
      expect(normalized.backgroundColor).toBeUndefined();
    });

    test('neither prop results in no background', () => {
      const props: ViewProps = {
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.background).toBeUndefined();
      expect(normalized.backgroundColor).toBeUndefined();
    });

    test('background prop deduplication removes backgroundColor entirely', () => {
      const props: ViewProps = {
        background: '#ffffff',
        backgroundColor: '#000000',
        padding: 'medium'
      };

      const normalized = normalizeViewProps(props);
      const keys = Object.keys(normalized);

      expect(keys.includes('background')).toBe(true);
      expect(keys.includes('backgroundColor')).toBe(false);
      expect(normalized.background).toBe('#ffffff');
    });
  });

  describe('Event Handler String Conversion', () => {
    test('string event handlers are converted to functions', () => {
      const props: ViewProps = {
        onClick: 'console.log("clicked")',
        onMouseEnter: 'alert("hover")',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(typeof normalized.onClick).toBe('function');
      expect(typeof normalized.onMouseEnter).toBe('function');
    });

    test('function event handlers are preserved', () => {
      const clickHandler = () => console.log('clicked');
      const hoverHandler = () => console.log('hovered');
      
      const props: ViewProps = {
        onClick: clickHandler,
        onMouseEnter: hoverHandler,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.onClick).toBe(clickHandler);
      expect(normalized.onMouseEnter).toBe(hoverHandler);
    });

    test('invalid event handler strings are handled gracefully', () => {
      const props: ViewProps = {
        onClick: 'invalid javascript syntax {{{',
        onFocus: '',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      // Invalid handlers should be undefined
      expect(normalized.onClick).toBeUndefined();
      expect(normalized.onFocus).toBeUndefined();
    });

    test('event handlers execute correctly when converted from strings', () => {
      let testValue = '';
      
      // Mock console.log to capture output
      const originalLog = console.log;
      console.log = (message: string) => {
        testValue = message;
      };

      const props: ViewProps = {
        onClick: 'console.log("test execution")',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);
      
      // Execute the converted function
      if (normalized.onClick) {
        (normalized.onClick as any)({});
      }

      expect(testValue).toBe('test execution');
      
      // Restore console.log
      console.log = originalLog;
    });
  });

  describe('Grid Value Coercion', () => {
    test('string numbers are converted to numbers', () => {
      const props: ViewProps = {
        span: '12' as any,
        xs: '6' as any,
        sm: '4' as any,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.span).toBe(12);
      expect(normalized.xs).toBe(6);
      expect(normalized.sm).toBe(4);
    });

    test('keyword values are preserved', () => {
      const props: ViewProps = {
        span: 'auto' as any,
        md: 'grow' as any,
        lg: 'auto' as any,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.span).toBe('auto');
      expect(normalized.md).toBe('grow');
      expect(normalized.lg).toBe('auto');
    });

    test('number values are preserved', () => {
      const props: ViewProps = {
        span: 8,
        xs: 12,
        sm: 6,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.span).toBe(8);
      expect(normalized.xs).toBe(12);
      expect(normalized.sm).toBe(6);
    });

    test('invalid grid values are filtered out', () => {
      const props: ViewProps = {
        span: 'invalid' as any,
        xs: '-5' as any,
        sm: '0' as any,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.span).toBeUndefined();
      expect(normalized.xs).toBeUndefined();
      expect(normalized.sm).toBeUndefined();
    });

    test('undefined and null grid values are preserved as undefined', () => {
      const props: ViewProps = {
        span: undefined,
        xs: null as any,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.span).toBeUndefined();
      expect(normalized.xs).toBeUndefined();
    });
  });

  describe('SX and Style Props Parsing', () => {
    test('sx JSON strings are parsed to objects', () => {
      const props: ViewProps = {
        sx: '{"color": "primary.main", "fontSize": 14}',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.sx).toEqual({
        color: 'primary.main',
        fontSize: 14
      });
    });

    test('sx objects are preserved', () => {
      const sxObject = { color: 'secondary.main', padding: 2 };
      const props: ViewProps = {
        sx: sxObject,
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.sx).toBe(sxObject);
    });

    test('style JSON strings are parsed to objects', () => {
      const props: ViewProps = {
        style: '{"backgroundColor": "#ffffff", "margin": "10px"}',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.style).toEqual({
        backgroundColor: '#ffffff',
        margin: '10px'
      });
    });

    test('invalid sx/style JSON strings are handled gracefully', () => {
      // Mock console.warn to avoid test output pollution
      const originalWarn = console.warn;
      console.warn = jest.fn();

      const props: ViewProps = {
        sx: 'invalid json {{{',
        style: 'also invalid }}}',
        className: 'test-class'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.sx).toBeUndefined();
      expect(normalized.style).toBeUndefined();
      expect(console.warn).toHaveBeenCalledTimes(2);
      
      // Restore console.warn
      console.warn = originalWarn;
    });
  });

  describe('Prop Preservation and Clean-up', () => {
    test('all other props are preserved unchanged', () => {
      const props: ViewProps = {
        className: 'test-class',
        id: 'test-id',
        role: 'button',
        'aria-label': 'Test button',
        'data-testid': 'test-component',
        width: '300px',
        height: 'medium',
        padding: 'large',
        margin: 'small',
        textAlign: 'center'
      };

      const normalized = normalizeViewProps(props);

      expect(normalized.className).toBe('test-class');
      expect(normalized.id).toBe('test-id');
      expect(normalized.role).toBe('button');
      expect(normalized['aria-label']).toBe('Test button');
      expect(normalized['data-testid']).toBe('test-component');
      expect(normalized.width).toBe('300px');
      expect(normalized.height).toBe('medium');
      expect(normalized.padding).toBe('large');
      expect(normalized.margin).toBe('small');
      expect(normalized.textAlign).toBe('center');
    });

    test('normalization preserves BaseComponentProps compatibility', () => {
      const props: ViewProps = {
        className: 'test-class',
        span: 8,
        padding: 'medium',
        background: 'primary.main',
        onClick: () => {},
        sx: { fontWeight: 'bold' }
      };

      const normalized = normalizeViewProps(props);

      // Should have properties that BaseComponentProps expects
      expect(normalized.className).toBeDefined();
      expect(typeof normalized.span).toBe('number');
      expect(normalized.padding).toBeDefined();
      expect(normalized.background).toBeDefined();
      expect(typeof normalized.onClick).toBe('function');
      expect(normalized.sx).toBeDefined();
    });

    test('empty props object is handled correctly', () => {
      const props: ViewProps = {};

      const normalized = normalizeViewProps(props);

      expect(typeof normalized).toBe('object');
      expect(normalized).not.toBeNull();
      expect(Object.keys(normalized).length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Complex Canonicalization Scenarios', () => {
    test('comprehensive prop normalization works correctly', () => {
      const props: ViewProps = {
        // Background canonicalization
        backgroundColor: '#ff0000',
        background: '#00ff00', // This should win
        
        // Grid coercion
        span: '12' as any,
        xs: 'auto' as any,
        
        // Event handlers
        onClick: 'console.log("clicked")',
        onMouseEnter: () => {},
        
        // Style parsing
        sx: '{"color": "blue"}',
        style: { margin: 10 },
        
        // Regular props
        className: 'test-class',
        padding: 'large'
      };

      const normalized = normalizeViewProps(props);

      // Test background canonicalization
      expect(normalized.background).toBe('#00ff00');
      expect(normalized.backgroundColor).toBeUndefined();
      
      // Test grid coercion
      expect(normalized.span).toBe(12);
      expect(normalized.xs).toBe('auto');
      
      // Test event handlers
      expect(typeof normalized.onClick).toBe('function');
      expect(typeof normalized.onMouseEnter).toBe('function');
      
      // Test style parsing
      expect(normalized.sx).toEqual({ color: 'blue' });
      expect(normalized.style).toEqual({ margin: 10 });
      
      // Test regular props
      expect(normalized.className).toBe('test-class');
      expect(normalized.padding).toBe('large');
    });

    test('normalization is idempotent', () => {
      const props: ViewProps = {
        backgroundColor: '#ffffff',
        span: '6' as any,
        onClick: 'console.log("test")',
        sx: '{"fontSize": 14}',
        className: 'test-class'
      };

      const normalized1 = normalizeViewProps(props);
      const normalized2 = normalizeViewProps(normalized1);

      // Second normalization should not change the result
      expect(normalized2.background).toBe(normalized1.background);
      expect(normalized2.span).toBe(normalized1.span);
      expect(normalized2.onClick).toBe(normalized1.onClick);
      expect(normalized2.sx).toEqual(normalized1.sx);
      expect(normalized2.className).toBe(normalized1.className);
    });
  });
});