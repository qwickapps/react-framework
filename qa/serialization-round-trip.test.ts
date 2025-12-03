/**
 * Serialization Round-Trip Tests
 * 
 * Validates that all migrated components serialize and deserialize correctly:
 * - All components can serialize their props to JSON and deserialize back
 * - Container components use data.children for child content
 * - Leaf components use data.content (Code, Text, SafeSpan)
 * - Complex nested component trees work correctly
 * - SerializationDemo stories work as expected
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';

// Import components for testing
import { Code } from '../src/components/blocks/Code';
import { Container } from '../src/components/base/Container';
import { HeroBlock } from '../src/components/blocks/HeroBlock';
import { Button } from '../src/components/inputs/Button';
import { Text } from '../src/components/blocks/Text';
import { SafeSpan } from '../src/components/blocks/SafeSpan';
import { Section } from '../src/components/blocks/Section';

describe('Serialization Round-Trip Tests', () => {

  describe('Content-Prop Component Serialization', () => {
    test('Code component serializes and deserializes correctly', () => {
      const originalProps = {
        content: 'console.log("Hello, World!");',
        language: 'javascript',
        showCopy: true,
        showLineNumbers: false,
        title: 'Example Code',
        className: 'custom-code'
      };

      // Serialize
      const serialized = (Code as any).toJson(originalProps);
      
      expect(serialized.tagName).toBe('Code');
      expect(serialized.version).toBeDefined();
      expect(serialized.data.content).toBe('console.log("Hello, World!");');
      expect(serialized.data.language).toBe('javascript');
      expect(serialized.data.showCopy).toBe(true);
      expect(serialized.data.title).toBe('Example Code');
      expect(serialized.data.className).toBe('custom-code');
      
      // Should not include children in content-prop serialization
      expect('children' in serialized.data).toBe(false);

      // Deserialize
      const deserialized = (Code as any).fromJson(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect(deserialized.type).toBe(Code);
      expect(deserialized.props.content).toBe('console.log("Hello, World!");');
      expect(deserialized.props.language).toBe('javascript');
    });

    test('Text component serializes and deserializes correctly', () => {
      const originalProps = {
        content: 'This is sample text content',
        variant: 'body1',
        color: 'primary',
        className: 'custom-text'
      };

      // Serialize
      const serialized = (Text as any).toJson(originalProps);
      
      expect(serialized.tagName).toBe('Text');
      expect(serialized.data.content).toBe('This is sample text content');
      expect(serialized.data.variant).toBe('body1');
      expect(serialized.data.color).toBe('primary');
      
      // Should not include children
      expect('children' in serialized.data).toBe(false);

      // Deserialize
      const deserialized = (Text as any).fromJson(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect(deserialized.props.content).toBe('This is sample text content');
    });

    test('SafeSpan component serializes and deserializes correctly', () => {
      const originalProps = {
        content: '<em>Safe HTML content</em>',
        sanitizeOptions: { allowedTags: ['em', 'strong'] },
        className: 'safe-content'
      };

      // Serialize
      const serialized = (SafeSpan as any).toJson(originalProps);
      
      expect(serialized.tagName).toBe('SafeSpan');
      expect(serialized.data.content).toBe('<em>Safe HTML content</em>');
      expect(serialized.data.sanitizeOptions).toEqual({ allowedTags: ['em', 'strong'] });
      
      // Should not include children
      expect('children' in serialized.data).toBe(false);

      // Deserialize
      const deserialized = (SafeSpan as any).fromJson(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect(deserialized.props.content).toBe('<em>Safe HTML content</em>');
    });

    test('Content-prop components handle JSX children correctly', () => {
      // Test that JSX children are converted to content prop
      const codeProps = {
        language: 'typescript',
        children: 'const test = "hello";'
      };

      const serialized = (Code as any).toJson(codeProps);
      
      expect(serialized.data.content).toBe('const test = "hello";');
      expect('children' in serialized.data).toBe(false);
    });
  });

  describe('React-Children Component Serialization', () => {
    test('Container component serializes and deserializes correctly', () => {
      const originalProps = {
        className: 'custom-container',
        span: 12,
        padding: 'large',
        background: 'primary.main',
        children: 'Container content'
      };

      // Serialize
      const serialized = (Container as any).toJson(originalProps);
      
      expect(serialized.tagName).toBe('Container');
      expect(serialized.data.className).toBe('custom-container');
      expect(serialized.data.span).toBe(12);
      expect(serialized.data.padding).toBe('large');
      expect(serialized.data.background).toBe('primary.main');
      expect(serialized.data.children).toBe('Container content');

      // Deserialize
      const deserialized = (Container as any).fromJson(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect(deserialized.type).toBe(Container);
      expect(deserialized.props.className).toBe('custom-container');
      expect(deserialized.props.children).toBe('Container content');
    });

    test('HeroBlock component serializes and deserializes correctly', () => {
      const originalProps = {
        title: 'Hero Title',
        subtitle: 'Hero Subtitle',
        backgroundImage: '/hero-bg.jpg',
        children: 'Hero content',
        className: 'custom-hero'
      };

      // Serialize
      const serialized = (HeroBlock as any).toJson(originalProps);
      
      expect(serialized.tagName).toBe('HeroBlock');
      expect(serialized.data.title).toBe('Hero Title');
      expect(serialized.data.subtitle).toBe('Hero Subtitle');
      expect(serialized.data.backgroundImage).toBe('/hero-bg.jpg');
      expect(serialized.data.children).toBe('Hero content');

      // Deserialize
      const deserialized = (HeroBlock as any).fromJson(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect(deserialized.props.title).toBe('Hero Title');
      expect(deserialized.props.children).toBe('Hero content');
    });

    test('Section component serializes and deserializes correctly', () => {
      const originalProps = {
        title: 'Section Title',
        variant: 'primary',
        children: 'Section content here',
        className: 'custom-section'
      };

      // Serialize
      const serialized = (Section as any).toJson(originalProps);
      
      expect(serialized.tagName).toBe('Section');
      expect(serialized.data.title).toBe('Section Title');
      expect(serialized.data.variant).toBe('primary');
      expect(serialized.data.children).toBe('Section content here');

      // Deserialize
      const deserialized = (Section as any).fromJson(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect(deserialized.props.children).toBe('Section content here');
    });
  });

  describe('Event Handler Serialization', () => {
    test('Function event handlers are serialized as strings', () => {
      const clickHandler = () => console.log('clicked');
      const originalProps = {
        text: 'Click me',
        onClick: clickHandler,
        onMouseEnter: () => alert('hover'),
        className: 'test-button'
      };

      const serialized = (Button as any).toJson(originalProps);
      
      expect(typeof serialized.data.onClick).toBe('string');
      expect(serialized.data.onClick).toContain('console.log');
      expect(typeof serialized.data.onMouseEnter).toBe('string');
      expect(serialized.data.onMouseEnter).toContain('alert');
    });

    test('String event handlers are preserved', () => {
      const originalProps = {
        text: 'Click me',
        onClick: 'console.log("button clicked")',
        onFocus: 'this.style.outline = "2px solid blue"',
        className: 'test-button'
      };

      const serialized = (Button as any).toJson(originalProps);
      
      expect(serialized.data.onClick).toBe('console.log("button clicked")');
      expect(serialized.data.onFocus).toBe('this.style.outline = "2px solid blue"');
    });

    test('Undefined event handlers are excluded from serialization', () => {
      const originalProps = {
        text: 'Click me',
        onClick: undefined,
        onMouseEnter: null,
        className: 'test-button'
      };

      const serialized = (Button as any).toJson(originalProps);
      
      expect('onClick' in serialized.data).toBe(false);
      expect('onMouseEnter' in serialized.data).toBe(false);
    });
  });

  describe('Complex Nested Serialization', () => {
    test('Nested components serialize correctly without infinite recursion', () => {
      const nestedProps = {
        className: 'outer-container',
        children: [
          React.createElement(Text, { key: '1', content: 'Nested text' }),
          React.createElement(Code, { key: '2', content: 'console.log("nested code");' }),
        ]
      };

      // This should not throw an error or cause infinite recursion
      expect(() => {
        const serialized = (Container as any).toJson(nestedProps);
        expect(serialized.tagName).toBe('Container');
        expect(serialized.data.children).toBeDefined();
      }).not.toThrow();
    });

    test('Deep component nesting serializes without stack overflow', () => {
      // Create a deeply nested component structure
      let deepChild = React.createElement(Text, { content: 'Deep nested text' });
      
      for (let i = 0; i < 10; i++) {
        deepChild = React.createElement(Container, { 
          className: `level-${i}`,
          children: deepChild 
        });
      }

      const rootProps = {
        className: 'root-container',
        children: deepChild
      };

      // This should not cause stack overflow
      expect(() => {
        const serialized = (Container as any).toJson(rootProps);
        expect(serialized.tagName).toBe('Container');
      }).not.toThrow();
    });
  });

  describe('Version and Tag Name Validation', () => {
    test('Deserialization validates tag name matches', () => {
      const serializedData = {
        tagName: 'WrongComponent',
        version: '1.0.0',
        data: { content: 'test' }
      };

      expect(() => {
        (Code as any).fromJson(serializedData);
      }).toThrow('Tag name mismatch');
    });

    test('Deserialization warns on version mismatch but continues', () => {
      const originalWarn = console.warn;
      const warnSpy = jest.fn();
      console.warn = warnSpy;

      const serializedData = {
        tagName: 'Code',
        version: '0.0.1',
        data: { content: 'test code' }
      };

      const result = (Code as any).fromJson(serializedData);
      
      expect(React.isValidElement(result)).toBe(true);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Version mismatch')
      );

      console.warn = originalWarn;
    });

    test('All components have consistent serialization metadata', () => {
      const components = [Code, Container, HeroBlock, Button, Text, SafeSpan, Section];
      
      components.forEach((Component: any) => {
        const testProps = { className: 'test' };
        if (Component === Code || Component === Text || Component === SafeSpan) {
          (testProps as any).content = 'test content';
        } else {
          (testProps as any).children = 'test children';
        }

        const serialized = Component.toJson(testProps);
        
        expect(serialized).toHaveProperty('tagName');
        expect(serialized).toHaveProperty('version');
        expect(serialized).toHaveProperty('data');
        expect(typeof serialized.tagName).toBe('string');
        expect(typeof serialized.version).toBe('string');
        expect(typeof serialized.data).toBe('object');
      });
    });
  });

  describe('Props Filtering and Cleanup', () => {
    test('Function props (non-event handlers) are excluded from serialization', () => {
      const originalProps = {
        text: 'Button text',
        onClick: () => {},
        customFunction: () => console.log('custom'),
        regularProp: 'value',
        className: 'test-button'
      };

      const serialized = (Button as any).toJson(originalProps);
      
      expect('onClick' in serialized.data).toBe(true); // Event handlers are included
      expect('customFunction' in serialized.data).toBe(false); // Non-event functions are excluded
      expect('regularProp' in serialized.data).toBe(true);
      expect('className' in serialized.data).toBe(true);
    });

    test('Undefined and null props are excluded from serialization', () => {
      const originalProps = {
        content: 'test content',
        definedProp: 'value',
        undefinedProp: undefined,
        nullProp: null,
        emptyStringProp: '',
        zeroProp: 0,
        falseProp: false
      };

      const serialized = (Code as any).toJson(originalProps);
      
      expect('definedProp' in serialized.data).toBe(true);
      expect('undefinedProp' in serialized.data).toBe(false);
      expect('nullProp' in serialized.data).toBe(false);
      expect('emptyStringProp' in serialized.data).toBe(true); // Empty string is valid
      expect('zeroProp' in serialized.data).toBe(true); // Zero is valid
      expect('falseProp' in serialized.data).toBe(true); // False is valid
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('Empty props serialize correctly', () => {
      const emptyProps = {};

      expect(() => {
        const serialized = (Container as any).toJson(emptyProps);
        expect(serialized.tagName).toBe('Container');
        expect(serialized.data).toEqual({});
      }).not.toThrow();
    });

    test('Props with special characters serialize correctly', () => {
      const specialProps = {
        content: 'Content with "quotes" and \n newlines and \t tabs',
        title: 'Title with émojis 🚀 and unicode ñ',
        className: 'class-with-special-chars_123'
      };

      const serialized = (Code as any).toJson(specialProps);
      
      expect(serialized.data.content).toBe('Content with "quotes" and \n newlines and \t tabs');
      expect(serialized.data.title).toBe('Title with émojis 🚀 and unicode ñ');
      expect(serialized.data.className).toBe('class-with-special-chars_123');
    });

    test('Malformed serialization data is handled gracefully', () => {
      const malformedData = {
        tagName: 'Code',
        version: '1.0.0',
        // Missing data property
      };

      expect(() => {
        const result = (Code as any).fromJson(malformedData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    test('Serialization round-trip preserves prop types', () => {
      const originalProps = {
        content: 'test content',
        showCopy: true,
        showLineNumbers: false,
        maxHeight: 400,
        className: 'test-class'
      };

      const serialized = (Code as any).toJson(originalProps);
      const deserialized = (Code as any).fromJson(serialized);
      
      expect(typeof deserialized.props.content).toBe('string');
      expect(typeof deserialized.props.showCopy).toBe('boolean');
      expect(typeof deserialized.props.showLineNumbers).toBe('boolean');
      expect(typeof deserialized.props.maxHeight).toBe('number');
      expect(typeof deserialized.props.className).toBe('string');
    });
  });
});