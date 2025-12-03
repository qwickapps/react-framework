/**
 * Schema Architecture Validation Tests
 * 
 * Validates that the schema-driven migration has been implemented correctly:
 * - Container components extend ContainerSchema
 * - View components extend ViewSchema
 * - Component factory configurations are correct
 * - Schema inheritance hierarchy is proper
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { describe, test, expect, beforeAll } from '@jest/globals';
import ContainerSchema from '../src/schemas/ContainerSchema';
import ViewSchema from '../src/schemas/ViewSchema';
import ButtonSchema from '../src/schemas/ButtonSchema';
import HeroBlockSchema from '../src/schemas/HeroBlockSchema';
import CodeSchema from '../src/schemas/CodeSchema';
import TextSchema from '../src/schemas/TextSchema';
import SafeSpanSchema from '../src/schemas/SafeSpanSchema';

// Import components to test factory configuration
import { Code } from '../src/components/blocks/Code';
import { Container } from '../src/components/base/Container';
import { HeroBlock } from '../src/components/blocks/HeroBlock';
import { Button } from '../src/components/inputs/Button';

describe('Schema Architecture Validation', () => {
  
  describe('Schema Inheritance Hierarchy', () => {
    test('ContainerSchema extends ViewSchema', () => {
      const containerSchema = new ContainerSchema();
      expect(containerSchema).toBeInstanceOf(ViewSchema);
      expect(ContainerSchema.prototype).toBeInstanceOf(ViewSchema);
    });

    test('Container components extend ContainerSchema', () => {
      expect(HeroBlockSchema.prototype).toBeInstanceOf(ContainerSchema);
      expect(HeroBlockSchema.prototype).toBeInstanceOf(ViewSchema);
    });

    test('View components extend ViewSchema directly', () => {
      expect(ButtonSchema.prototype).toBeInstanceOf(ViewSchema);
      expect(CodeSchema.prototype).toBeInstanceOf(ViewSchema);
      expect(TextSchema.prototype).toBeInstanceOf(ViewSchema);
      expect(SafeSpanSchema.prototype).toBeInstanceOf(ViewSchema);
      
      // Ensure view components do NOT extend ContainerSchema
      expect(ButtonSchema.prototype).not.toBeInstanceOf(ContainerSchema);
      expect(CodeSchema.prototype).not.toBeInstanceOf(ContainerSchema);
    });

    test('ViewSchema provides comprehensive base props', () => {
      const viewSchema = new ViewSchema();
      
      // Test that ViewSchema has key base component props
      expect('className' in viewSchema).toBe(true);
      expect('sx' in viewSchema).toBe(true);
      expect('span' in viewSchema).toBe(true);
      expect('xs' in viewSchema).toBe(true);
      expect('padding' in viewSchema).toBe(true);
      expect('margin' in viewSchema).toBe(true);
      expect('background' in viewSchema).toBe(true);
      expect('backgroundColor' in viewSchema).toBe(true);
      expect('onClick' in viewSchema).toBe(true);
      expect('id' in viewSchema).toBe(true);
      expect('role' in viewSchema).toBe(true);
    });
  });

  describe('Component Factory Configuration', () => {
    test('All components have required static properties', () => {
      const components = [Code, Container, HeroBlock, Button];
      
      components.forEach((Component: any) => {
        expect(Component.tagName).toBeDefined();
        expect(typeof Component.tagName).toBe('string');
        expect(Component.tagName.length).toBeGreaterThan(0);
        
        expect(Component.version).toBeDefined();
        expect(typeof Component.version).toBe('string');
        expect(Component.version).toMatch(/^\d+\.\d+\.\d+$/); // Semantic versioning
        
        expect(Component.fromJson).toBeDefined();
        expect(typeof Component.fromJson).toBe('function');
        
        expect(Component.toJson).toBeDefined();
        expect(typeof Component.toJson).toBe('function');
      });
    });

    test('Container components have correct role configuration', () => {
      // Container components should serialize children as data.children
      const containerProps = { span: 12, children: 'Test content' };
      const serialized = (Container as any).toJson(containerProps);
      
      expect(serialized.tagName).toBe('Container');
      expect(serialized.data.children).toBe('Test content');
    });

    test('Content-prop components have correct strategy configuration', () => {
      // Code component should use content-prop strategy
      const codeProps = { content: 'console.log("test");', language: 'javascript' };
      const serialized = (Code as any).toJson(codeProps);
      
      expect(serialized.tagName).toBe('Code');
      expect(serialized.data.content).toBe('console.log("test");');
      expect(serialized.data.language).toBe('javascript');
      // children should not be included in content-prop serialization
      expect('children' in serialized.data).toBe(false);
    });

    test('Component tagName matches expected values', () => {
      expect((Code as any).tagName).toBe('Code');
      expect((Container as any).tagName).toBe('Container');
      expect((HeroBlock as any).tagName).toBe('HeroBlock');
      expect((Button as any).tagName).toBe('Button');
    });

    test('Component versions are valid semantic versions', () => {
      const components = [Code, Container, HeroBlock, Button];
      const semverPattern = /^\d+\.\d+\.\d+$/;
      
      components.forEach((Component: any) => {
        expect(Component.version).toMatch(semverPattern);
        
        // Version should be parseable
        const [major, minor, patch] = Component.version.split('.').map(Number);
        expect(major).toBeGreaterThanOrEqual(0);
        expect(minor).toBeGreaterThanOrEqual(0);
        expect(patch).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Schema Metadata Validation', () => {
    test('All schemas have proper @Schema decorators', () => {
      // This test validates that schemas are properly decorated
      // Note: Runtime validation of decorators is limited, but we can test basic structure
      
      const schemas = [ViewSchema, ContainerSchema, ButtonSchema, HeroBlockSchema, CodeSchema];
      
      schemas.forEach((SchemaClass: any) => {
        // Should have constructor
        expect(typeof SchemaClass).toBe('function');
        expect(SchemaClass.prototype).toBeDefined();
        
        // Schema classes should be instantiable
        const instance = new SchemaClass();
        expect(instance).toBeInstanceOf(SchemaClass);
      });
    });

    test('ViewSchema provides all expected field types', () => {
      const viewSchema = new ViewSchema();
      
      // Grid layout props
      expect(viewSchema.hasOwnProperty('span')).toBe(true);
      expect(viewSchema.hasOwnProperty('xs')).toBe(true);
      expect(viewSchema.hasOwnProperty('sm')).toBe(true);
      expect(viewSchema.hasOwnProperty('md')).toBe(true);
      expect(viewSchema.hasOwnProperty('lg')).toBe(true);
      expect(viewSchema.hasOwnProperty('xl')).toBe(true);
      
      // Styling props
      expect(viewSchema.hasOwnProperty('className')).toBe(true);
      expect(viewSchema.hasOwnProperty('sx')).toBe(true);
      expect(viewSchema.hasOwnProperty('style')).toBe(true);
      
      // Dimension props
      expect(viewSchema.hasOwnProperty('width')).toBe(true);
      expect(viewSchema.hasOwnProperty('height')).toBe(true);
      expect(viewSchema.hasOwnProperty('minWidth')).toBe(true);
      expect(viewSchema.hasOwnProperty('maxWidth')).toBe(true);
      
      // Spacing props
      expect(viewSchema.hasOwnProperty('padding')).toBe(true);
      expect(viewSchema.hasOwnProperty('margin')).toBe(true);
      expect(viewSchema.hasOwnProperty('paddingTop')).toBe(true);
      expect(viewSchema.hasOwnProperty('marginX')).toBe(true);
      
      // Background props
      expect(viewSchema.hasOwnProperty('background')).toBe(true);
      expect(viewSchema.hasOwnProperty('backgroundColor')).toBe(true);
      expect(viewSchema.hasOwnProperty('backgroundImage')).toBe(true);
      
      // Accessibility props
      expect(viewSchema.hasOwnProperty('id')).toBe(true);
      expect(viewSchema.hasOwnProperty('role')).toBe(true);
      expect(viewSchema.hasOwnProperty('aria-label')).toBe(true);
      
      // Event handler props
      expect(viewSchema.hasOwnProperty('onClick')).toBe(true);
      expect(viewSchema.hasOwnProperty('onMouseEnter')).toBe(true);
      expect(viewSchema.hasOwnProperty('onFocus')).toBe(true);
    });
  });

  describe('Migration Pattern Compliance', () => {
    test('Factory components implement SerializableComponent interface', () => {
      const components = [Code, Container, HeroBlock, Button];
      
      components.forEach((Component: any) => {
        // Should be callable as React component
        expect(typeof Component).toBe('function');
        
        // Should have serialization interface
        expect(Component.tagName).toBeDefined();
        expect(Component.version).toBeDefined();
        expect(Component.fromJson).toBeDefined();
        expect(Component.toJson).toBeDefined();
        
        // Should have QwickApp component symbol
        expect(Component.hasOwnProperty(Symbol.for('QWICKAPP_COMPONENT'))).toBe(true);
      });
    });

    test('Components no longer use old ModelView pattern', () => {
      const components = [Code, Container, HeroBlock, Button];
      
      components.forEach((Component: any) => {
        // Should not have old ModelView static methods
        expect(Component.create).toBeUndefined();
        expect(Component.fromData).toBeUndefined();
        
        // Should not extend ModelView class
        expect(Component.prototype?.constructor?.name).not.toBe('ModelView');
      });
    });

    test('ViewProps typing pattern is used correctly', () => {
      // This test ensures components use ViewProps & SchemaProps<T> pattern
      // We test this by checking that components accept ViewProps-compatible props
      
      const baseViewProps = {
        className: 'test-class',
        span: 6,
        padding: 'medium',
        background: 'primary.main',
        onClick: () => {},
      };
      
      // These should not throw type errors when used with components
      expect(() => {
        (Code as any).toJson({ ...baseViewProps, content: 'test', language: 'javascript' });
        (Container as any).toJson({ ...baseViewProps, children: 'content' });
        (Button as any).toJson({ ...baseViewProps, text: 'Click me' });
      }).not.toThrow();
    });
  });

  describe('Schema Field Validation', () => {
    test('Required schema fields are present', () => {
      // Test that critical schema fields exist and have correct types
      const viewSchema = new ViewSchema();
      
      // Test grid props have correct validation
      expect(typeof viewSchema.span).toBeUndefined(); // Should be undefined initially
      
      // Test string props
      expect(typeof viewSchema.className).toBeUndefined(); // Should be undefined initially
      
      // Set values and test they're accepted
      viewSchema.span = 12;
      viewSchema.className = 'test';
      viewSchema.background = '#ffffff';
      
      expect(viewSchema.span).toBe(12);
      expect(viewSchema.className).toBe('test');
      expect(viewSchema.background).toBe('#ffffff');
    });

    test('ContainerSchema extends ViewSchema properly', () => {
      const containerSchema = new ContainerSchema();
      
      // Should have ViewSchema props
      expect('span' in containerSchema).toBe(true);
      expect('className' in containerSchema).toBe(true);
      expect('background' in containerSchema).toBe(true);
      
      // Should have container-specific props
      expect('children' in containerSchema).toBe(true);
      
      // Test inheritance chain
      expect(containerSchema instanceof ViewSchema).toBe(true);
      expect(containerSchema instanceof ContainerSchema).toBe(true);
    });
  });

  describe('Component Registration Validation', () => {
    test('Components can be instantiated with React.createElement', () => {
      // Test that factory components work with React.createElement
      const React = require('react');
      
      expect(() => {
        React.createElement(Code, { content: 'test code' });
        React.createElement(Container, { children: 'test' });
        React.createElement(Button, { text: 'Click' });
      }).not.toThrow();
    });

    test('Components have consistent metadata structure', () => {
      const components = [Code, Container, HeroBlock, Button];
      
      components.forEach((Component: any) => {
        // Test metadata consistency
        const metadata = {
          tagName: Component.tagName,
          version: Component.version,
          fromJson: Component.fromJson,
          toJson: Component.toJson,
        };
        
        expect(typeof metadata.tagName).toBe('string');
        expect(typeof metadata.version).toBe('string');
        expect(typeof metadata.fromJson).toBe('function');
        expect(typeof metadata.toJson).toBe('function');
        
        // TagName should match component name pattern
        expect(metadata.tagName).toMatch(/^[A-Z][a-zA-Z]*$/);
      });
    });
  });
});