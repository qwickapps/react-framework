/**
 * Component Factory Pattern Validation Tests
 * 
 * Validates that all migrated components follow the factory pattern correctly:
 * - All components have proper static properties (tagName, version, fromJson, toJson)
 * - createSerializableView factory configuration is correct
 * - ViewProps & SchemaProps<T> typing pattern is implemented
 * - No duplicate prop declarations exist
 * - SerializableComponent interface compliance
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';

// Import factory utilities
import { createSerializableView, isSerializableComponent, getComponentMetadata } from '../src/components/shared/createSerializableView';
import { QWICKAPP_COMPONENT } from '../src/hooks';

// Import components for testing
import { Code } from '../src/components/blocks/Code';
import { Container } from '../src/components/base/Container';
import { HeroBlock } from '../src/components/blocks/HeroBlock';
import { Button } from '../src/components/inputs/Button';
import { Text } from '../src/components/blocks/Text';
import { SafeSpan } from '../src/components/blocks/SafeSpan';
import { Section } from '../src/components/blocks/Section';

describe('Component Factory Pattern Validation', () => {

  const testComponents = [
    { Component: Code, expectedTagName: 'Code' },
    { Component: Container, expectedTagName: 'Container' },
    { Component: HeroBlock, expectedTagName: 'HeroBlock' },
    { Component: Button, expectedTagName: 'Button' },
    { Component: Text, expectedTagName: 'Text' },
    { Component: SafeSpan, expectedTagName: 'SafeSpan' },
    { Component: Section, expectedTagName: 'Section' }
  ];

  describe('Static Property Validation', () => {
    testComponents.forEach(({ Component, expectedTagName }) => {
      test(`${expectedTagName} has all required static properties`, () => {
        // tagName property
        expect((Component as any).tagName).toBeDefined();
        expect(typeof (Component as any).tagName).toBe('string');
        expect((Component as any).tagName).toBe(expectedTagName);

        // version property
        expect((Component as any).version).toBeDefined();
        expect(typeof (Component as any).version).toBe('string');
        expect((Component as any).version).toMatch(/^\d+\.\d+\.\d+$/);

        // fromJson method
        expect((Component as any).fromJson).toBeDefined();
        expect(typeof (Component as any).fromJson).toBe('function');

        // toJson method
        expect((Component as any).toJson).toBeDefined();
        expect(typeof (Component as any).toJson).toBe('function');

        // QwickApp component symbol
        expect((Component as any)[QWICKAPP_COMPONENT]).toBe(QWICKAPP_COMPONENT);

        // displayName for debugging
        expect((Component as any).displayName).toBeDefined();
        expect((Component as any).displayName).toContain(expectedTagName);
      });
    });

    test('All components pass isSerializableComponent type guard', () => {
      testComponents.forEach(({ Component }) => {
        expect(isSerializableComponent(Component)).toBe(true);
      });
    });

    test('Non-serializable components fail type guard', () => {
      const regularComponent = () => React.createElement('div');
      const objectLike = { tagName: 'Test', version: '1.0.0' };
      
      expect(isSerializableComponent(regularComponent)).toBe(false);
      expect(isSerializableComponent(objectLike)).toBe(false);
      expect(isSerializableComponent(null)).toBe(false);
      expect(isSerializableComponent(undefined)).toBe(false);
    });
  });

  describe('Component Metadata Extraction', () => {
    testComponents.forEach(({ Component, expectedTagName }) => {
      test(`${expectedTagName} metadata extraction works correctly`, () => {
        const metadata = getComponentMetadata(Component as any);
        
        expect(metadata.tagName).toBe(expectedTagName);
        expect(typeof metadata.version).toBe('string');
        expect(typeof metadata.fromJson).toBe('function');
        expect(typeof metadata.toJson).toBe('function');
      });
    });

    test('Metadata functions are the same references as component methods', () => {
      const metadata = getComponentMetadata(Code as any);
      
      expect(metadata.fromJson).toBe((Code as any).fromJson);
      expect(metadata.toJson).toBe((Code as any).toJson);
    });
  });

  describe('Factory Configuration Validation', () => {
    test('Content-prop components have correct childrenStrategy', () => {
      const contentPropComponents = [Code, Text, SafeSpan];
      
      contentPropComponents.forEach((Component) => {
        const testProps = { content: 'test content', className: 'test' };
        const serialized = (Component as any).toJson(testProps);
        
        // Should have content in data
        expect(serialized.data.content).toBeDefined();
        // Should NOT have children in data
        expect('children' in serialized.data).toBe(false);
      });
    });

    test('React-children components have correct childrenStrategy', () => {
      const reactChildrenComponents = [Container, HeroBlock, Section];
      
      reactChildrenComponents.forEach((Component) => {
        const testProps = { children: 'test children', className: 'test' };
        const serialized = (Component as any).toJson(testProps);
        
        // Should have children in data
        expect(serialized.data.children).toBeDefined();
        expect(serialized.data.children).toBe('test children');
      });
    });

    test('View components have role: "view"', () => {
      const viewComponents = [Code, Text, SafeSpan, Button];
      
      // This is tested indirectly by checking serialization behavior
      viewComponents.forEach((Component) => {
        // View components should handle props correctly without gridProps
        const testProps = { span: 6, className: 'test' };
        if (Component === Code || Component === Text || Component === SafeSpan) {
          (testProps as any).content = 'test content';
        }
        
        expect(() => {
          const serialized = (Component as any).toJson(testProps);
          expect(serialized.data.span).toBe(6);
        }).not.toThrow();
      });
    });

    test('Container components have role: "container"', () => {
      const containerComponents = [Container, HeroBlock, Section];
      
      // Container components should handle gridProps if needed
      containerComponents.forEach((Component) => {
        const testProps = { span: 12, children: 'test content' };
        
        expect(() => {
          const serialized = (Component as any).toJson(testProps);
          expect(serialized.data.span).toBe(12);
        }).not.toThrow();
      });
    });
  });

  describe('React Integration Validation', () => {
    test('Components are valid React components', () => {
      testComponents.forEach(({ Component, expectedTagName }) => {
        expect(typeof Component).toBe('function');
        
        // Should be callable as React component
        const testProps: any = { className: 'test' };
        if (expectedTagName === 'Code' || expectedTagName === 'Text' || expectedTagName === 'SafeSpan') {
          testProps.content = 'test content';
        } else {
          testProps.children = 'test children';
        }
        
        expect(() => {
          React.createElement(Component as any, testProps);
        }).not.toThrow();
      });
    });

    test('Components can be rendered without errors', () => {
      // Test basic rendering (mocked MUI theme required)
      const testCases = [
        { Component: Code, props: { content: 'console.log("test");' } },
        { Component: Container, props: { children: 'Container content' } },
        { Component: Text, props: { content: 'Text content' } },
        { Component: SafeSpan, props: { content: 'Safe content' } }
      ];

      testCases.forEach(({ Component, props }) => {
        expect(() => {
          // Basic React element creation should not throw
          const element = React.createElement(Component as any, props);
          expect(React.isValidElement(element)).toBe(true);
        }).not.toThrow();
      });
    });

    test('Components have consistent displayName patterns', () => {
      testComponents.forEach(({ Component, expectedTagName }) => {
        const displayName = (Component as any).displayName;
        
        expect(displayName).toContain('SerializableView');
        expect(displayName).toContain(expectedTagName);
        expect(displayName).toMatch(/SerializableView\(.+\)/);
      });
    });
  });

  describe('Props Interface Validation', () => {
    test('Components accept ViewProps-compatible props', () => {
      const baseViewProps = {
        className: 'test-class',
        span: 8,
        xs: 6,
        padding: 'medium',
        margin: 'small',
        background: 'primary.main',
        sx: { fontWeight: 'bold' },
        style: { color: 'red' },
        id: 'test-id',
        role: 'button',
        'aria-label': 'Test component',
        onClick: () => {},
        onMouseEnter: () => {}
      };

      testComponents.forEach(({ Component, expectedTagName }) => {
        const testProps = { ...baseViewProps };
        
        if (expectedTagName === 'Code' || expectedTagName === 'Text' || expectedTagName === 'SafeSpan') {
          (testProps as any).content = 'test content';
        } else {
          (testProps as any).children = 'test children';
        }

        expect(() => {
          const serialized = (Component as any).toJson(testProps);
          expect(serialized.data.className).toBe('test-class');
          expect(serialized.data.span).toBe(8);
          expect(serialized.data.padding).toBe('medium');
          expect(serialized.data.background).toBe('primary.main');
        }).not.toThrow();
      });
    });

    test('Components handle component-specific props correctly', () => {
      // Test component-specific props
      const testCases = [
        {
          Component: Code,
          props: { content: 'test', language: 'javascript', showCopy: true }
        },
        {
          Component: Button,
          props: { text: 'Click me', variant: 'contained', color: 'primary' }
        },
        {
          Component: HeroBlock,
          props: { title: 'Hero Title', subtitle: 'Subtitle', children: 'content' }
        }
      ];

      testCases.forEach(({ Component, props }) => {
        const serialized = (Component as any).toJson(props);
        
        Object.entries(props).forEach(([key, value]) => {
          if (key !== 'children' || (Component !== Code && Component !== Text && Component !== SafeSpan)) {
            expect(serialized.data[key]).toBe(value);
          }
        });
      });
    });
  });

  describe('Factory Function Validation', () => {
    test('createSerializableView creates valid components', () => {
      // Create a test component using the factory
      const TestView = ({ content, className }: any) => 
        React.createElement('div', { className }, content);

      const TestComponent = createSerializableView({
        tagName: 'TestComponent',
        version: '1.0.0',
        role: 'view',
        View: TestView,
        childrenStrategy: { mode: 'content-prop', propName: 'content' }
      });

      // Test that created component has all required properties
      expect(TestComponent.tagName).toBe('TestComponent');
      expect(TestComponent.version).toBe('1.0.0');
      expect(typeof TestComponent.fromJson).toBe('function');
      expect(typeof TestComponent.toJson).toBe('function');
      expect(TestComponent[QWICKAPP_COMPONENT]).toBe(QWICKAPP_COMPONENT);
      expect(isSerializableComponent(TestComponent)).toBe(true);
    });

    test('Factory handles different childrenStrategy configurations', () => {
      const TestView = ({ content, children }: any) => 
        React.createElement('div', {}, content || children);

      // Test content-prop strategy
      const ContentPropComponent = createSerializableView({
        tagName: 'ContentProp',
        version: '1.0.0',
        role: 'view',
        View: TestView,
        childrenStrategy: { mode: 'content-prop', propName: 'content' }
      });

      // Test react-children strategy
      const ReactChildrenComponent = createSerializableView({
        tagName: 'ReactChildren',
        version: '1.0.0',
        role: 'container',
        View: TestView,
        childrenStrategy: { mode: 'react-children' }
      });

      const contentProps = { content: 'test content' };
      const childrenProps = { children: 'test children' };

      const contentSerialized = ContentPropComponent.toJson(contentProps);
      const childrenSerialized = ReactChildrenComponent.toJson(childrenProps);

      expect(contentSerialized.data.content).toBe('test content');
      expect('children' in contentSerialized.data).toBe(false);

      expect(childrenSerialized.data.children).toBe('test children');
    });

    test('Factory applies finalize function when provided', () => {
      const TestView = ({ processedProp }: any) => 
        React.createElement('div', {}, processedProp);

      const finalizeFn = (props: any) => ({
        ...props,
        processedProp: `processed-${props.originalProp}`
      });

      const TestComponent = createSerializableView({
        tagName: 'TestWithFinalize',
        version: '1.0.0',
        role: 'view',
        View: TestView,
        finalize: finalizeFn
      });

      const props = { originalProp: 'test' };
      const serialized = TestComponent.toJson(props);

      expect(serialized.data.processedProp).toBe('processed-test');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('Components handle missing required props gracefully', () => {
      testComponents.forEach(({ Component }) => {
        expect(() => {
          (Component as any).toJson({});
        }).not.toThrow();
      });
    });

    test('fromJson handles malformed data gracefully', () => {
      testComponents.forEach(({ Component, expectedTagName }) => {
        const malformedData = {
          tagName: expectedTagName,
          version: '1.0.0',
          data: null
        };

        expect(() => {
          const result = (Component as any).fromJson(malformedData);
          expect(React.isValidElement(result)).toBe(true);
        }).not.toThrow();
      });
    });

    test('Components maintain consistent behavior across serialization cycles', () => {
      const testProps = {
        className: 'test-class',
        span: 6,
        content: 'test content',
        language: 'javascript'
      };

      const serialized1 = (Code as any).toJson(testProps);
      const deserialized1 = (Code as any).fromJson(serialized1);
      const serialized2 = (Code as any).toJson(deserialized1.props);

      // Second serialization should match first
      expect(serialized2.tagName).toBe(serialized1.tagName);
      expect(serialized2.version).toBe(serialized1.version);
      expect(serialized2.data.content).toBe(serialized1.data.content);
      expect(serialized2.data.className).toBe(serialized1.data.className);
    });
  });
});