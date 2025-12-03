/**
 * ComponentTransformer HTML Pattern Tests
 * 
 * Tests the HTML pattern registration and transformation functionality
 * of the ComponentTransformer system.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { ComponentTransformer, PatternHandler } from '../ComponentTransformer';
import { Code } from '../../../../schemas/transformers/components/blocks/Code';

// Mock DOM environment for Node.js testing
Object.defineProperty(global, 'DOMParser', {
  writable: true,
  value: class DOMParser {
    parseFromString(htmlString: string) {
      // Simple mock that creates elements for our tests
      const mockDoc = {
        body: {
          children: []
        }
      };

      // Simple parsing for basic elements
      if (htmlString.includes('<code>')) {
        const codeElement = {
          tagName: 'CODE',
          textContent: 'console.log("test");',
          className: '',
          classList: [],
          matches: (selector: string) => selector === 'code',
          querySelector: () => null,
          children: []
        };
        mockDoc.body.children = [codeElement];
      }

      return mockDoc;
    }
  }
});

// Mock document.createElement
Object.defineProperty(global, 'document', {
  writable: true,
  value: {
    createElement: (tagName: string) => ({
      tagName: tagName.toUpperCase(),
      className: '',
      classList: [],
      textContent: '',
      innerHTML: '',
      id: '',
      appendChild: jest.fn(),
      querySelector: jest.fn(),
      matches: jest.fn(),
      children: []
    })
  }
});

describe('ComponentTransformer HTML Patterns', () => {
  beforeEach(() => {
    // Clear registries before each test
    ComponentTransformer.clearRegistry();
  });

  describe('Pattern Registration', () => {
    test('should register HTML patterns', () => {
      const mockHandler: PatternHandler = (element: Element) => ({
        tagName: 'TestComponent',
        props: { content: element.textContent }
      });

      ComponentTransformer.registerPattern('div.test', mockHandler);
      
      expect(ComponentTransformer.hasPattern('div.test')).toBe(true);
      expect(ComponentTransformer.getRegisteredPatterns()).toContain('div.test');
    });

    test('should warn when overriding existing patterns', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const handler1: PatternHandler = () => ({ tagName: 'Component1' });
      const handler2: PatternHandler = () => ({ tagName: 'Component2' });

      ComponentTransformer.registerPattern('div.test', handler1);
      ComponentTransformer.registerPattern('div.test', handler2);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Pattern 'div.test' is already registered. Overwriting existing handler."
      );

      consoleSpy.mockRestore();
    });

    test('should register patterns when component is registered', () => {
      // Mock the Code component's registerPatternHandlers method
      const originalRegisterPatterns = Code.registerPatternHandlers;
      const mockRegisterPatterns = jest.fn();
      Code.registerPatternHandlers = mockRegisterPatterns;

      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);

      expect(mockRegisterPatterns).toHaveBeenCalledWith(ComponentTransformer);

      // Restore original method
      Code.registerPatternHandlers = originalRegisterPatterns;
    });
  });

  describe('HTML Element Transformation', () => {
    test('should transform matching HTML elements', () => {
      // Register a test pattern
      const testHandler: PatternHandler = (element: Element) => ({
        tagName: 'TestComponent',
        props: {
          content: element.textContent,
          className: element.className
        }
      });

      ComponentTransformer.registerPattern('div.highlight', testHandler);

      // Create test element
      const div = document.createElement('div');
      div.className = 'highlight';
      div.textContent = 'Test content';

      // Mock ComponentTransformer.deserialize to return a simple result
      const originalDeserialize = ComponentTransformer.deserialize;
      ComponentTransformer.deserialize = jest.fn().mockReturnValue(
        React.createElement('div', { 'data-testid': 'transformed' }, 'Test content')
      );

      const result = ComponentTransformer.transformHTMLElement(div);

      expect(ComponentTransformer.deserialize).toHaveBeenCalledWith({
        tagName: 'TestComponent',
        props: {
          content: 'Test content',
          className: 'highlight'
        }
      });

      expect(result).toBeTruthy();

      // Restore original method
      ComponentTransformer.deserialize = originalDeserialize;
    });

    test('should return null for non-matching elements', () => {
      ComponentTransformer.registerPattern('div.highlight', () => ({ tagName: 'Test' }));

      const div = document.createElement('div');
      div.className = 'normal';

      const result = ComponentTransformer.transformHTMLElement(div);
      expect(result).toBeNull();
    });

    test('should handle transformation errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const errorHandler: PatternHandler = () => {
        throw new Error('Transformation error');
      };

      ComponentTransformer.registerPattern('div.error', errorHandler);

      const div = document.createElement('div');
      div.className = 'error';

      const result = ComponentTransformer.transformHTMLElement(div);
      
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error transforming element with pattern 'div.error':",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('HTML String Transformation', () => {
    test('should transform HTML string to React nodes', () => {
      // Register test pattern
      ComponentTransformer.registerPattern('code', (element: Element) => ({
        tagName: 'Code',
        props: {
          children: element.textContent,
          language: 'javascript'
        }
      }));

      // Mock deserialize to return test elements
      const originalDeserialize = ComponentTransformer.deserialize;
      ComponentTransformer.deserialize = jest.fn().mockReturnValue(
        React.createElement('pre', { 'data-testid': 'code-block' })
      );

      const html = '<code>console.log("hello");</code>';
      const results = ComponentTransformer.transformHTML(html);

      expect(results).toHaveLength(1);
      expect(ComponentTransformer.deserialize).toHaveBeenCalled();

      ComponentTransformer.deserialize = originalDeserialize;
    });

    test('should return empty array for empty HTML', () => {
      const results = ComponentTransformer.transformHTML('');
      expect(results).toEqual([]);
    });

    test('should return empty array for whitespace-only HTML', () => {
      const results = ComponentTransformer.transformHTML('   \n  \t  ');
      expect(results).toEqual([]);
    });
  });

  describe('Code Component Integration', () => {
    test('should register Code component patterns', () => {
      // Register Code component
      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);

      // Check that patterns were registered
      expect(ComponentTransformer.hasPattern('pre code')).toBe(true);
      expect(ComponentTransformer.hasPattern('code.highlight')).toBe(true);
    });

    test('should transform pre+code elements', () => {
      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);

      // Create pre+code element
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.className = 'language-javascript';
      code.textContent = 'console.log("test");';
      pre.appendChild(code);

      // Mock deserialize
      const originalDeserialize = ComponentTransformer.deserialize;
      ComponentTransformer.deserialize = jest.fn().mockReturnValue(
        React.createElement('div', { 'data-testid': 'code-component' })
      );

      const result = ComponentTransformer.transformHTMLElement(pre);

      expect(ComponentTransformer.deserialize).toHaveBeenCalledWith({
        tagName: 'Code',
        props: {
          language: 'javascript',
          showCopy: true,
          showLineNumbers: false,
          children: 'console.log("test");'
        }
      });

      expect(result).toBeTruthy();

      ComponentTransformer.deserialize = originalDeserialize;
    });

    test('should handle missing code child in pre element', () => {
      ComponentTransformer.registerComponent(Code as unknown);

      const pre = document.createElement('pre');
      pre.textContent = 'Just text, no code element';

      // Since the transformPreCode handler returns null for elements without code child,
      // the element should not match and return null
      const result = ComponentTransformer.transformHTMLElement(pre);
      expect(result).toBeNull();
    });
  });

  describe('Registry Management', () => {
    test('should clear pattern registry', () => {
      ComponentTransformer.registerPattern('div.test', () => ({ tagName: 'Test' }));
      expect(ComponentTransformer.hasPattern('div.test')).toBe(true);

      ComponentTransformer.clearRegistry();
      expect(ComponentTransformer.hasPattern('div.test')).toBe(false);
      expect(ComponentTransformer.getRegisteredPatterns()).toHaveLength(0);
    });

    test('should get list of registered patterns', () => {
      ComponentTransformer.registerPattern('div.test1', () => ({ tagName: 'Test1' }));
      ComponentTransformer.registerPattern('span.test2', () => ({ tagName: 'Test2' }));

      const patterns = ComponentTransformer.getRegisteredPatterns();
      expect(patterns).toContain('div.test1');
      expect(patterns).toContain('span.test2');
      expect(patterns).toHaveLength(2);
    });
  });
});