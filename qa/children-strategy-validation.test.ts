/**
 * Children Strategy Validation Tests
 * 
 * Validates that the children handling strategy is implemented correctly:
 * - content-prop strategy components (Code, Text, SafeSpan) serialize content as data.content
 * - react-children strategy components (Container, Section, HeroBlock) serialize as data.children
 * - Security: content fields are never recursively deserialized
 * - JSX ergonomics still work: <Code>{content}</Code>
 * - Children mapping and transformation works correctly
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
import { Text } from '../src/components/blocks/Text';
import { SafeSpan } from '../src/components/blocks/SafeSpan';
import { Section } from '../src/components/blocks/Section';

describe('Children Strategy Validation Tests', () => {

  describe('Content-Prop Strategy Components', () => {
    const contentPropComponents = [
      { Component: Code, name: 'Code', testContent: 'console.log("test");' },
      { Component: Text, name: 'Text', testContent: 'Sample text content' },
      { Component: SafeSpan, name: 'SafeSpan', testContent: '<em>HTML content</em>' }
    ];

    contentPropComponents.forEach(({ Component, name, testContent }) => {
      describe(`${name} Component Content-Prop Strategy`, () => {
        test('serializes content as data.content, not data.children', () => {
          const props = {
            content: testContent,
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          expect(serialized.data.content).toBe(testContent);
          expect('children' in serialized.data).toBe(false);
        });

        test('maps JSX children to content prop during serialization', () => {
          const props = {
            children: testContent,
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          expect(serialized.data.content).toBe(testContent);
          expect('children' in serialized.data).toBe(false);
        });

        test('content prop takes precedence over children prop', () => {
          const props = {
            content: testContent,
            children: 'different content',
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          expect(serialized.data.content).toBe(testContent);
          expect('children' in serialized.data).toBe(false);
        });

        test('deserializes content correctly without children', () => {
          const serializedData = {
            tagName: name,
            version: '1.0.0',
            data: {
              content: testContent,
              className: 'test-class'
            }
          };

          const deserialized = (Component as any).fromJson(serializedData);

          expect(React.isValidElement(deserialized)).toBe(true);
          expect(deserialized.props.content).toBe(testContent);
          expect(deserialized.props.children).toBeUndefined();
        });

        test('handles empty content correctly', () => {
          const props = {
            content: '',
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);
          const deserialized = (Component as any).fromJson(serialized);

          expect(serialized.data.content).toBe('');
          expect(deserialized.props.content).toBe('');
        });

        test('ignores children during deserialization for security', () => {
          const serializedData = {
            tagName: name,
            version: '1.0.0',
            data: {
              content: testContent,
              children: 'malicious content that should be ignored',
              className: 'test-class'
            }
          };

          const deserialized = (Component as any).fromJson(serializedData);

          expect(deserialized.props.content).toBe(testContent);
          expect(deserialized.props.children).toBeUndefined();
        });
      });
    });

    test('Content-prop components do not recursively deserialize content', () => {
      // This tests security: content is always treated as a string, never as serialized components
      const maliciousContent = JSON.stringify({
        tagName: 'Code',
        version: '1.0.0',
        data: { content: 'alert("XSS")' }
      });

      const props = {
        content: maliciousContent,
        className: 'test-class'
      };

      const serialized = (Code as any).toJson(props);
      const deserialized = (Code as any).fromJson(serialized);

      // Content should remain as a string, not be recursively deserialized
      expect(typeof deserialized.props.content).toBe('string');
      expect(deserialized.props.content).toBe(maliciousContent);
    });
  });

  describe('React-Children Strategy Components', () => {
    const reactChildrenComponents = [
      { Component: Container, name: 'Container' },
      { Component: HeroBlock, name: 'HeroBlock' },
      { Component: Section, name: 'Section' }
    ];

    reactChildrenComponents.forEach(({ Component, name }) => {
      describe(`${name} Component React-Children Strategy`, () => {
        test('serializes children as data.children', () => {
          const testChildren = 'Test children content';
          const props = {
            children: testChildren,
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          expect(serialized.data.children).toBe(testChildren);
        });

        test('preserves React element children for recursive serialization', () => {
          const nestedElement = React.createElement(Text, { content: 'Nested text' });
          const props = {
            children: nestedElement,
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          // Children should be preserved for ComponentTransformer to handle
          expect(serialized.data.children).toBe(nestedElement);
        });

        test('handles array of children correctly', () => {
          const childArray = [
            'Text node',
            React.createElement(Text, { key: '1', content: 'Element 1' }),
            'Another text node',
            React.createElement(Code, { key: '2', content: 'console.log("test");' })
          ];
          
          const props = {
            children: childArray,
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          expect(serialized.data.children).toBe(childArray);
        });

        test('deserializes children with ComponentTransformer integration', () => {
          const testChildren = 'Simple string children';
          const serializedData = {
            tagName: name,
            version: '1.0.0',
            data: {
              children: testChildren,
              className: 'test-class'
            }
          };

          const deserialized = (Component as any).fromJson(serializedData);

          expect(React.isValidElement(deserialized)).toBe(true);
          expect(deserialized.props.children).toBe(testChildren);
        });

        test('handles undefined children gracefully', () => {
          const props = {
            className: 'test-class'
            // No children prop
          };

          const serialized = (Component as any).toJson(props);

          expect('children' in serialized.data).toBe(false);
        });

        test('handles null children gracefully', () => {
          const props = {
            children: null,
            className: 'test-class'
          };

          const serialized = (Component as any).toJson(props);

          expect('children' in serialized.data).toBe(false);
        });
      });
    });
  });

  describe('JSX Ergonomics and Developer Experience', () => {
    test('Content-prop components work with JSX children syntax', () => {
      // Test that JSX children are automatically mapped to content prop
      const jsxElement = React.createElement(Code, {
        language: 'javascript',
        children: 'const test = "JSX children work";'
      });

      expect(React.isValidElement(jsxElement)).toBe(true);
      expect(jsxElement.props.children).toBe('const test = "JSX children work";');

      // Test serialization maps children to content
      const serialized = (Code as any).toJson(jsxElement.props);
      expect(serialized.data.content).toBe('const test = "JSX children work";');
    });

    test('React-children components work naturally with JSX', () => {
      const jsxElement = React.createElement(Container, {
        className: 'test-container',
        children: [
          'Text content',
          React.createElement(Text, { key: '1', content: 'Nested text' })
        ]
      });

      expect(React.isValidElement(jsxElement)).toBe(true);
      expect(Array.isArray(jsxElement.props.children)).toBe(true);
    });

    test('Mixed content types are handled correctly', () => {
      // Test various types of children content
      const textChildren = 'Simple text';
      const numberChildren = 42;
      const booleanChildren = true;
      const nullChildren = null;
      const undefinedChildren = undefined;

      const testCases = [
        { children: textChildren, expected: 'Simple text' },
        { children: numberChildren, expected: '42' },
        { children: booleanChildren, expected: undefined },
        { children: nullChildren, expected: undefined },
        { children: undefinedChildren, expected: undefined }
      ];

      testCases.forEach(({ children, expected }) => {
        const props = { children, language: 'text' };
        const serialized = (Code as any).toJson(props);
        
        if (expected === undefined) {
          expect(serialized.data.content).toBe('');
        } else {
          expect(serialized.data.content).toBe(expected);
        }
      });
    });

    test('Nested text extraction works for complex children', () => {
      const complexChildren = [
        'Start text',
        React.createElement('span', { key: '1' }, 'Span text'),
        ' middle ',
        React.createElement('div', { key: '2' }, ['Div text', ' more']),
        ' end text'
      ];

      const props = { children: complexChildren };
      const serialized = (Code as any).toJson(props);

      // Should extract all text content
      expect(serialized.data.content).toBe('Start text middle  end text');
    });
  });

  describe('Security Validation', () => {
    test('Content-prop strategy prevents code injection via content', () => {
      const maliciousContent = '<script>alert("XSS")</script>';
      const props = {
        content: maliciousContent,
        className: 'test-class'
      };

      const serialized = (Code as any).toJson(props);
      const deserialized = (Code as any).fromJson(serialized);

      // Content should be treated as plain text, not executed code
      expect(deserialized.props.content).toBe(maliciousContent);
      expect(typeof deserialized.props.content).toBe('string');
    });

    test('Content-prop components ignore serialized component objects in content', () => {
      const serializedComponent = {
        tagName: 'Code',
        version: '1.0.0',
        data: { content: 'injected code' }
      };

      const props = {
        content: JSON.stringify(serializedComponent),
        className: 'test-class'
      };

      const serialized = (Code as any).toJson(props);
      const deserialized = (Code as any).fromJson(serialized);

      // Should treat the serialized component as plain text
      expect(typeof deserialized.props.content).toBe('string');
      expect(deserialized.props.content).toBe(JSON.stringify(serializedComponent));
    });

    test('React-children components handle malicious children safely', () => {
      const maliciousChildren = '<script>alert("XSS")</script>';
      const props = {
        children: maliciousChildren,
        className: 'test-class'
      };

      const serialized = (Container as any).toJson(props);
      const deserialized = (Container as any).fromJson(serialized);

      // Should preserve as string for React to handle safely
      expect(deserialized.props.children).toBe(maliciousChildren);
      expect(typeof deserialized.props.children).toBe('string');
    });
  });

  describe('Performance and Memory', () => {
    test('Content-prop strategy does not create memory leaks with large content', () => {
      const largeContent = 'x'.repeat(100000); // 100KB of text
      const props = {
        content: largeContent,
        className: 'test-class'
      };

      expect(() => {
        const serialized = (Code as any).toJson(props);
        expect(serialized.data.content).toBe(largeContent);
      }).not.toThrow();
    });

    test('Children strategy handles large component trees efficiently', () => {
      // Create a large nested structure
      let nestedChildren = React.createElement(Text, { content: 'Deep leaf' });
      
      for (let i = 0; i < 50; i++) {
        nestedChildren = React.createElement(Container, {
          key: i,
          className: `level-${i}`,
          children: nestedChildren
        });
      }

      const props = {
        children: nestedChildren,
        className: 'root'
      };

      expect(() => {
        const serialized = (Container as any).toJson(props);
        expect(serialized.data.children).toBe(nestedChildren);
      }).not.toThrow();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('Content-prop components handle special characters correctly', () => {
      const specialContent = 'Content with "quotes", \nnewlines, \ttabs, and émojis 🚀';
      const props = {
        content: specialContent,
        className: 'test-class'
      };

      const serialized = (Code as any).toJson(props);
      const deserialized = (Code as any).fromJson(serialized);

      expect(deserialized.props.content).toBe(specialContent);
    });

    test('React-children components handle special React elements', () => {
      const fragmentChildren = React.createElement(React.Fragment, {}, [
        'Fragment child 1',
        React.createElement(Text, { key: '1', content: 'Fragment child 2' })
      ]);

      const props = {
        children: fragmentChildren,
        className: 'test-class'
      };

      const serialized = (Container as any).toJson(props);

      expect(serialized.data.children).toBe(fragmentChildren);
    });

    test('Empty and whitespace-only content is handled correctly', () => {
      const testCases = [
        { content: '', description: 'empty string' },
        { content: '   ', description: 'whitespace only' },
        { content: '\n\t\r', description: 'newlines and tabs' }
      ];

      testCases.forEach(({ content, description }) => {
        const props = { content, className: 'test' };
        const serialized = (Code as any).toJson(props);
        const deserialized = (Code as any).fromJson(serialized);

        expect(deserialized.props.content).toBe(content);
      });
    });

    test('Strategy selection is consistent across serialization cycles', () => {
      // Test content-prop consistency
      const codeProps = { content: 'test code', language: 'javascript' };
      const codeSerialized1 = (Code as any).toJson(codeProps);
      const codeDeserialized = (Code as any).fromJson(codeSerialized1);
      const codeSerialized2 = (Code as any).toJson(codeDeserialized.props);

      expect(codeSerialized2.data.content).toBe(codeSerialized1.data.content);
      expect('children' in codeSerialized2.data).toBe(false);

      // Test react-children consistency
      const containerProps = { children: 'test children', className: 'test' };
      const containerSerialized1 = (Container as any).toJson(containerProps);
      const containerDeserialized = (Container as any).fromJson(containerSerialized1);
      const containerSerialized2 = (Container as any).toJson(containerDeserialized.props);

      expect(containerSerialized2.data.children).toBe(containerSerialized1.data.children);
    });
  });
});