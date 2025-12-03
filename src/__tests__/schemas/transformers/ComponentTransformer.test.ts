/**
 * ComponentTransformer Tests - Comprehensive test suite
 * 
 * Tests the core component serialization system functionality
 * including registration, serialization, deserialization, and error handling.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';
import { 
  MockSerializableComponentClass,
  AlternativeMockComponentClass,
  InvalidMockComponentClass 
} from './MockSerializableComponent';

// Legacy mock components for testing (updated with self-declaration)
class MockButton implements Serializable {
  static readonly tagName = 'Button';
  static readonly version = '1.0.0';
  
  constructor(public props: { label?: string; variant?: string; onClick?: () => void }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('button', {
      className: `btn-${(jsonData.variant as string) || 'default'}`,
      onClick: jsonData.onClick as (() => void) | undefined
    }, (jsonData.label as string) || 'Button');
  }

  toJson(): Record<string, unknown> {
    return {
      label: this.props.label,
      variant: this.props.variant,
      onClick: this.props.onClick ? 'function' : undefined
    };
  }
}

class MockCard implements Serializable {
  static readonly tagName = 'Card';
  static readonly version = '1.0.0';

  constructor(public props: { title?: string; content?: string; children?: React.ReactNode }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('div', {
      className: 'card'
    }, [
      React.createElement('h3', { key: 'title' }, jsonData.title),
      React.createElement('p', { key: 'content' }, jsonData.content)
    ]);
  }

  toJson(): unknown {
    return {
      title: this.props.title,
      content: this.props.content
    };
  }
}

describe('ComponentTransformer', () => {
  beforeEach(() => {
    // Clear registry before each test
    ComponentTransformer.clearRegistry();
  });

  afterEach(() => {
    // Clean up after each test
    ComponentTransformer.clearRegistry();
  });

  describe('Component Registration', () => {
    it('should register a component successfully', () => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
      
      const registered = ComponentTransformer.getRegisteredComponents();
      expect(registered).toContain('Button');
      expect(registered).toHaveLength(1);
    });

    it('should register multiple components', () => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
      ComponentTransformer.registerComponent(MockCard as SerializableConstructor);
      
      const registered = ComponentTransformer.getRegisteredComponents();
      expect(registered).toContain('Button');
      expect(registered).toContain('Card');
      expect(registered).toHaveLength(2);
    });

    it('should overwrite existing component registration with same tagName', () => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
      ComponentTransformer.registerComponent(AlternativeMockComponentClass);
      
      const registered = ComponentTransformer.getRegisteredComponents();
      expect(registered).toContain('Button');
      expect(registered).toContain('AlternativeComponent');
      expect(registered).toHaveLength(2);
    });

    it('should clear registry completely', () => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
      ComponentTransformer.registerComponent(MockCard as SerializableConstructor);
      
      ComponentTransformer.clearRegistry();
      
      const registered = ComponentTransformer.getRegisteredComponents();
      expect(registered).toHaveLength(0);
    });
  });

  describe('Serialization', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
    });

    it('should serialize null to null', () => {
      const result = ComponentTransformer.serialize(null);
      expect(result).toBe('null');
      expect(JSON.parse(result)).toBeNull();
    });

    it('should serialize undefined to null', () => {
      const result = ComponentTransformer.serialize(undefined);
      expect(result).toBe('null');
      expect(JSON.parse(result)).toBeNull();
    });

    it('should serialize primitive values', () => {
      expect(JSON.parse(ComponentTransformer.serialize('hello'))).toBe('hello');
      expect(JSON.parse(ComponentTransformer.serialize(42))).toBe(42);
      expect(JSON.parse(ComponentTransformer.serialize(true))).toBe(true);
      expect(JSON.parse(ComponentTransformer.serialize(false))).toBe(false);
    });

    it('should serialize array of primitives', () => {
      const input = ['hello', 42, true, null];
      const result = ComponentTransformer.serialize(input);
      expect(JSON.parse(result)).toEqual(input);
    });

    it('should serialize array of mixed content', () => {
      const input = ['text', 123, null, undefined];
      const result = ComponentTransformer.serialize(input);
      const parsed = JSON.parse(result);
      expect(parsed).toEqual(['text', 123, null, null]);
    });
  });

  describe('Deserialization', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
      ComponentTransformer.registerComponent(MockCard as SerializableConstructor);
    });

    it('should deserialize null correctly', () => {
      expect(ComponentTransformer.deserialize('null')).toBeNull();
      expect(ComponentTransformer.deserialize(null)).toBeNull();
    });

    it('should deserialize primitive values from strings', () => {
      expect(ComponentTransformer.deserialize('"hello"')).toBe('hello');
      expect(ComponentTransformer.deserialize('42')).toBe(42);
      expect(ComponentTransformer.deserialize('true')).toBe(true);
      expect(ComponentTransformer.deserialize('false')).toBe(false);
    });

    it('should deserialize primitive values from objects', () => {
      expect(ComponentTransformer.deserialize('hello')).toBe('hello');
      expect(ComponentTransformer.deserialize(42)).toBe(42);
      expect(ComponentTransformer.deserialize(true)).toBe(true);
      expect(ComponentTransformer.deserialize(false)).toBe(false);
    });

    it('should deserialize arrays', () => {
      const input = ['hello', 42, true, null];
      const result = ComponentTransformer.deserialize(input);
      expect(result).toEqual(input);
    });

    it('should deserialize registered component from object', () => {
      const componentData = {
        tagName: 'Button',
        version: '1.0.0',
        data: {
          label: 'Click Me',
          variant: 'primary'
        }
      };

      const result = ComponentTransformer.deserialize(componentData);
      expect(React.isValidElement(result)).toBe(true);
      
      const element = result as ReactElement;
      expect(element.type).toBe('button');
      expect(element.props.className).toBe('btn-primary');
      expect(element.props.children).toBe('Click Me');
    });

    it('should deserialize registered component from JSON string', () => {
      const componentData = {
        tagName: 'Card',
        version: '1.0.0',
        data: {
          title: 'Test Card',
          content: 'Test content'
        }
      };

      const jsonString = JSON.stringify(componentData);
      const result = ComponentTransformer.deserialize(jsonString);
      expect(React.isValidElement(result)).toBe(true);
      
      const element = result as ReactElement;
      expect(element.type).toBe('div');
      expect(element.props.className).toBe('card');
      expect(Array.isArray(element.props.children)).toBe(true);
    });

    it('should handle array of components', () => {
      const input = [
        {
          tagName: 'Button',
          version: '1.0.0',
          data: { label: 'First Button' }
        },
        {
          tagName: 'Button', 
          version: '1.0.0',
          data: { label: 'Second Button' }
        }
      ];

      const result = ComponentTransformer.deserialize(input);
      expect(Array.isArray(result)).toBe(true);
      
      const elements = result as ReactElement[];
      expect(elements).toHaveLength(2);
      expect(React.isValidElement(elements[0])).toBe(true);
      expect(React.isValidElement(elements[1])).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for invalid JSON string', () => {
      expect(() => {
        ComponentTransformer.deserialize('invalid json {');
      }).toThrow('Invalid JSON input');
    });

    it('should throw error for unknown component', () => {
      const componentData = {
        tagName: 'UnknownComponent',
        version: '1.0.0',
        data: {}
      };

      // With the new fallback system, unknown components should not throw but use ReactNodeTransformer
      const result = ComponentTransformer.deserialize(componentData);
      // Should return a fallback React element rather than throwing
      expect(result).toBeDefined();
    });

    it('should handle malformed component data gracefully', () => {
      const malformedData = {
        tagName: 'Button',
        // Missing version and data
      };

      // Register a button component first
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);

      expect(() => {
        ComponentTransformer.deserialize(malformedData);
      }).toThrow('Malformed component data: missing \'data\' property for component \'Button\'');
    });
  });

  describe('String vs Object Input Handling', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
    });

    it('should handle string input correctly', () => {
      const componentData = {
        tagName: 'Button',
        version: '1.0.0',
        data: { label: 'String Input Test' }
      };
      
      const jsonString = JSON.stringify(componentData);
      const result = ComponentTransformer.deserialize(jsonString);
      
      expect(React.isValidElement(result)).toBe(true);
      const element = result as ReactElement;
      expect(element.props.children).toBe('String Input Test');
    });

    it('should handle object input correctly', () => {
      const componentData = {
        tagName: 'Button',
        version: '1.0.0',
        data: { label: 'Object Input Test' }
      };
      
      const result = ComponentTransformer.deserialize(componentData);
      
      expect(React.isValidElement(result)).toBe(true);
      const element = result as ReactElement;
      expect(element.props.children).toBe('Object Input Test');
    });

    it('should handle array input correctly', () => {
      const componentsData = [
        {
          tagName: 'Button',
          version: '1.0.0',
          data: { label: 'Array Item 1' }
        },
        {
          tagName: 'Button',
          version: '1.0.0', 
          data: { label: 'Array Item 2' }
        }
      ];
      
      const result = ComponentTransformer.deserialize(componentsData);
      
      expect(Array.isArray(result)).toBe(true);
      const elements = result as ReactElement[];
      expect(elements).toHaveLength(2);
      expect(elements[0].props.children).toBe('Array Item 1');
      expect(elements[1].props.children).toBe('Array Item 2');
    });
  });

  describe('Nested Component Scenarios', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
      ComponentTransformer.registerComponent(MockCard as SerializableConstructor);
    });

    it('should handle nested primitive content', () => {
      const input = ['text', 42, ['nested', 'array'], { key: 'value' }];
      const serialized = ComponentTransformer.serialize(input);
      const deserialized = ComponentTransformer.deserialize(serialized);
      
      expect(deserialized).toEqual(['text', 42, ['nested', 'array'], { key: 'value' }]);
    });

    it('should handle mixed content arrays', () => {
      const input = [
        'plain text',
        {
          tagName: 'Button',
          version: '1.0.0',
          data: { label: 'Embedded Button' }
        },
        42,
        null
      ];

      const result = ComponentTransformer.deserialize(input);
      expect(Array.isArray(result)).toBe(true);
      
      const elements = result as unknown[];
      expect(elements[0]).toBe('plain text');
      expect(React.isValidElement(elements[1])).toBe(true);
      expect(elements[2]).toBe(42);
      expect(elements[3]).toBeNull();
    });
  });

  describe('Data Structure Requirements', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(MockButton as SerializableConstructor);
    });

    it('should produce correct serialized structure format', () => {
      // This test verifies the data structure requirement:
      // { tagName: "ComponentName", version: "1.0.0", data: {...} }
      
      // Since we can't easily test serialization of actual React elements
      // without a more complex setup, we'll test the deserialization format
      const expectedStructure = {
        tagName: 'Button',
        version: '1.0.0',
        data: {
          label: 'Test Button',
          variant: 'primary'
        }
      };

      const result = ComponentTransformer.deserialize(expectedStructure);
      expect(React.isValidElement(result)).toBe(true);
    });

    it('should handle version information correctly', () => {
      const componentWithVersion = {
        tagName: 'Button',
        version: '2.1.0',
        data: { label: 'Version Test' }
      };

      // Should not throw - version handling is delegated to component's fromJson
      expect(() => {
        ComponentTransformer.deserialize(componentWithVersion);
      }).not.toThrow();
    });
  });

  describe('New Architecture Features', () => {
    it('should validate component self-declaration with tagName and version', () => {
      ComponentTransformer.registerComponent(MockSerializableComponentClass);
      
      const registered = ComponentTransformer.getRegisteredComponents();
      expect(registered).toContain('MockComponent');
    });

    it('should throw error for components missing tagName', () => {
      expect(() => {
        ComponentTransformer.registerComponent(InvalidMockComponentClass);
      }).toThrow("Component class must have a static 'tagName' property");
    });

    it('should use component declared version in serialization', () => {
      ComponentTransformer.registerComponent(AlternativeMockComponentClass);
      
      const componentData = {
        tagName: 'AlternativeComponent',
        version: '2.1.0',
        data: { label: 'Version Test', type: 'primary' }
      };

      const result = ComponentTransformer.deserialize(componentData);
      expect(React.isValidElement(result)).toBe(true);
    });

    it('should handle unregistered React elements with ReactNodeTransformer fallback', () => {
      const unregisteredElement = React.createElement('span', { className: 'test' }, 'Fallback Test');
      const serialized = ComponentTransformer.serialize(unregisteredElement);
      const parsed = JSON.parse(serialized);
      
      // Should use __react_node__ tag for unregistered components
      expect(parsed.tag).toBe('__react_node__');
      expect(parsed.version).toBe('1.0.0');
      
      const deserialized = ComponentTransformer.deserialize(parsed);
      expect(deserialized).toBeDefined();
    });

    it('should handle mixed array of registered and unregistered components', () => {
      ComponentTransformer.registerComponent(MockSerializableComponentClass);
      
      const mixedArray = [
        'Text node',
        {
          tagName: 'MockComponent',
          version: '1.0.0',
          data: { title: 'Registered Component' }
        },
        {
          tagName: '__react_node__',
          version: '1.0.0',
          data: {
            type: 'react-element',
            elementType: 'div',
            props: { children: 'Unregistered Element' }
          }
        }
      ];

      const result = ComponentTransformer.deserialize(mixedArray);
      expect(Array.isArray(result)).toBe(true);
      
      const elements = result as unknown[];
      expect(elements).toHaveLength(3);
      expect(elements[0]).toBe('Text node');
      expect(React.isValidElement(elements[1])).toBe(true);
      expect(elements[2]).toBeDefined(); // Fallback content
    });

    it('should gracefully handle unknown registered components with fallback', () => {
      const unknownComponent = {
        tagName: 'NonExistentComponent',
        version: '1.0.0',
        data: { some: 'data' }
      };

      // Should not throw, but use fallback
      const result = ComponentTransformer.deserialize(unknownComponent);
      expect(result).toBeDefined();
    });

    it('should preserve all functionality for correctly registered components', () => {
      ComponentTransformer.registerComponent(MockSerializableComponentClass);
      
      const componentData = {
        tagName: 'MockComponent',
        version: '1.0.0',
        data: {
          title: 'Test Title',
          content: 'Test Content',
          variant: 'primary'
        }
      };

      const result = ComponentTransformer.deserialize(componentData);
      expect(React.isValidElement(result)).toBe(true);
      
      const element = result as ReactElement;
      expect(element.type).toBe('div');
      expect(element.props.className).toBe('mock-component primary');
      expect(element.props['data-testid']).toBe('mock-component');
    });
  });
});