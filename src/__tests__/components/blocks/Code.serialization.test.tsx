/**
 * Code Component Serialization Tests
 * 
 * Tests the Serializable interface implementation for the Code component,
 * serving as the template pattern for all other component serialization implementations.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Code } from '../../../components/blocks/Code';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { ThemeProvider, PaletteProvider } from '../../../contexts';

// Test wrapper for components that need theme context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <PaletteProvider>
      {children}
    </PaletteProvider>
  </ThemeProvider>
);

// Sample code content for testing
const sampleJavaScript = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;

const sampleTypeScript = `interface User {
  id: number;
  name: string;
}

const getUser = (id: number): User => {
  return { id, name: 'Test User' };
};`;

describe('Code Component Serialization', () => {
  beforeEach(() => {
    // Clear the component registry before each test
    ComponentTransformer.clearRegistry();
  });

  afterEach(() => {
    // Clean up the registry after each test
    ComponentTransformer.clearRegistry();
  });

  describe('Component Registration', () => {
    it('should register with correct tagName and version', () => {
      expect(Code.tagName).toBe('Code');
      expect(Code.version).toBe('1.0.0');

      // Register the component
      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);

      // Verify it's registered
      const registeredComponents = ComponentTransformer.getRegisteredComponents();
      expect(registeredComponents).toContain('Code');
    });

    it('should implement Serializable interface correctly', () => {
      const codeInstance = new Code({ children: sampleJavaScript });
      
      // Should have toJson method
      expect(typeof codeInstance.toJson).toBe('function');
      
      // Should have static fromJson method
      expect(typeof Code.fromJson).toBe('function');
      
      // Should have static tagName and version
      expect(Code.tagName).toBeDefined();
      expect(Code.version).toBeDefined();
    });
  });

  describe('Serialization (toJson)', () => {
    it('should serialize string children correctly', () => {
      const codeInstance = new Code({ children: sampleJavaScript });
      const serializedData = codeInstance.toJson();

      expect(serializedData).toEqual({
        children: sampleJavaScript,
        language: undefined,
        showCopy: undefined,
        showLineNumbers: undefined,
        title: undefined,
        wrapLines: undefined,
        codeBackground: undefined,
        dataSource: undefined,
        bindingOptions: undefined
      });
    });

    it('should serialize all props correctly', () => {
      const props = {
        children: sampleTypeScript,
        language: 'typescript',
        showCopy: true,
        showLineNumbers: true,
        title: 'example.ts',
        wrapLines: false,
        codeBackground: '#f5f5f5'
      };

      const codeInstance = new Code(props);
      const serializedData = codeInstance.toJson();

      expect(serializedData).toEqual({
        children: sampleTypeScript,
        language: 'typescript',
        showCopy: true,
        showLineNumbers: true,
        title: 'example.ts',
        wrapLines: false,
        codeBackground: '#f5f5f5',
        dataSource: undefined,
        bindingOptions: undefined
      });
    });

    it('should serialize ReactNode children as string', () => {
      const reactNodeChildren = <span>Hello World</span>;
      const codeInstance = new Code({ children: reactNodeChildren });
      const serializedData = codeInstance.toJson();

      // ReactNode children should be converted to string using extractTextFromReactNode
      expect(typeof serializedData.children).toBe('string');
      expect(serializedData.children).toBe('Hello World');
    });

    it('should serialize data binding props', () => {
      const props = {
        children: sampleJavaScript,
        dataSource: 'codes.example',
        bindingOptions: { cache: true, strict: false }
      };

      const codeInstance = new Code(props);
      const serializedData = codeInstance.toJson();

      expect(serializedData.dataSource).toBe('codes.example');
      expect(serializedData.bindingOptions).toEqual({ cache: true, strict: false });
    });

    it('should handle empty children', () => {
      const codeInstance = new Code({ children: '' });
      const serializedData = codeInstance.toJson();

      expect(serializedData.children).toBe('');
    });

    it('should handle complex ReactNode children', () => {
      const complexChildren = (
        <div>
          <span>Line 1</span>
          <br />
          <span>Line 2</span>
        </div>
      );

      const codeInstance = new Code({ children: complexChildren });
      const serializedData = codeInstance.toJson();

      // Should extract text from complex ReactNode structure
      expect(typeof serializedData.children).toBe('string');
      expect(serializedData.children).toContain('Line 1');
      expect(serializedData.children).toContain('Line 2');
    });
  });

  describe('Deserialization (fromJson)', () => {
    it('should deserialize basic data to React element', () => {
      const jsonData = {
        children: sampleJavaScript,
        language: 'javascript',
        showCopy: true,
        title: 'example.js'
      };

      const reactElement = Code.fromJson(jsonData);

      // Should return a React element
      expect(React.isValidElement(reactElement)).toBe(true);
      expect(reactElement.type).toBe(Code);
      expect(reactElement.props).toEqual(jsonData);
    });

    it('should deserialize minimal data', () => {
      const jsonData = {
        children: 'console.log("hello");'
      };

      const reactElement = Code.fromJson(jsonData);

      expect(React.isValidElement(reactElement)).toBe(true);
      expect(reactElement.props.children).toBe('console.log("hello");');
    });

    it('should deserialize all code properties', () => {
      const jsonData = {
        children: sampleTypeScript,
        language: 'typescript',
        showCopy: false,
        showLineNumbers: true,
        title: 'UserService.ts',
        wrapLines: true,
        codeBackground: '#2d2d2d'
      };

      const reactElement = Code.fromJson(jsonData);

      expect(reactElement.props).toEqual(jsonData);
    });

    it('should handle data binding configuration in deserialization', () => {
      const jsonData = {
        children: sampleJavaScript,
        dataSource: 'api.codes.example',
        bindingOptions: { cache: false, cacheTTL: 60000 }
      };

      const reactElement = Code.fromJson(jsonData);

      expect(reactElement.props.dataSource).toBe('api.codes.example');
      expect(reactElement.props.bindingOptions).toEqual({ cache: false, cacheTTL: 60000 });
    });
  });

  describe('Round-trip Serialization', () => {
    it('should preserve all props through serialize → deserialize cycle', () => {
      const originalProps = {
        children: sampleTypeScript,
        language: 'typescript',
        showCopy: true,
        showLineNumbers: false,
        title: 'Component.tsx',
        wrapLines: true,
        codeBackground: '#ffffff'
      };

      // Create instance → serialize → deserialize
      const codeInstance = new Code(originalProps);
      const serializedData = codeInstance.toJson();
      const deserializedElement = Code.fromJson(serializedData);

      // Compare props (excluding undefined values from serialization)
      expect(deserializedElement.props.children).toBe(originalProps.children);
      expect(deserializedElement.props.language).toBe(originalProps.language);
      expect(deserializedElement.props.showCopy).toBe(originalProps.showCopy);
      expect(deserializedElement.props.showLineNumbers).toBe(originalProps.showLineNumbers);
      expect(deserializedElement.props.title).toBe(originalProps.title);
      expect(deserializedElement.props.wrapLines).toBe(originalProps.wrapLines);
      expect(deserializedElement.props.codeBackground).toBe(originalProps.codeBackground);
    });

    it('should handle ReactNode children in round-trip', () => {
      const reactNodeChildren = (
        <div>
          <code>const x = 1;</code>
          <br />
          <code>console.log(x);</code>
        </div>
      );

      const codeInstance = new Code({ children: reactNodeChildren });
      const serializedData = codeInstance.toJson();
      const deserializedElement = Code.fromJson(serializedData);

      // ReactNode children should be converted to string and back
      expect(typeof deserializedElement.props.children).toBe('string');
      expect(deserializedElement.props.children).toContain('const x = 1;');
      expect(deserializedElement.props.children).toContain('console.log(x);');
    });

    it('should maintain functionality after round-trip', () => {
      const originalProps = {
        children: sampleJavaScript,
        language: 'javascript',
        showCopy: true,
        showLineNumbers: true,
        title: 'test.js'
      };

      // Round-trip
      const codeInstance = new Code(originalProps);
      const serializedData = codeInstance.toJson();
      const deserializedElement = Code.fromJson(serializedData);

      // Render the deserialized element
      render(
        <TestWrapper>
          {deserializedElement}
        </TestWrapper>
      );

      // Should render correctly with all original functionality
      expect(screen.getByText(/function greet/)).toBeInTheDocument();
      expect(screen.getByText('test.js')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Line numbers
      expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
    });

    it('should handle empty and edge cases in round-trip', () => {
      const edgeCaseProps = {
        children: '',
        language: '',
        showCopy: false,
        showLineNumbers: false,
        title: '',
        wrapLines: false
      };

      const codeInstance = new Code(edgeCaseProps);
      const serializedData = codeInstance.toJson();
      const deserializedElement = Code.fromJson(serializedData);

      // Should handle empty values gracefully
      expect(deserializedElement.props.children).toBe('');
      expect(deserializedElement.props.language).toBe('');
      expect(deserializedElement.props.title).toBe('');
      
      // Render should work
      render(
        <TestWrapper>
          {deserializedElement}
        </TestWrapper>
      );

      // Should show empty state
      expect(screen.getByText('No code content provided')).toBeInTheDocument();
    });
  });

  describe('ComponentTransformer Integration', () => {
    beforeEach(() => {
      // Register the Code component for these tests
      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);
    });

    it('should work with ComponentTransformer serialize/deserialize', () => {
      const codeElement = (
        <Code 
          language="javascript"
          showCopy={true}
          title="example.js"
        >
          {sampleJavaScript}
        </Code>
      );

      // Serialize using ComponentTransformer
      const serializedString = ComponentTransformer.serialize(codeElement);
      expect(typeof serializedString).toBe('string');
      
      const serializedData = JSON.parse(serializedString);
      expect(serializedData.tag).toBe('Code');
      expect(serializedData.version).toBe('1.0.0');
      expect(serializedData.data.children).toBe(sampleJavaScript);
      expect(serializedData.data.language).toBe('javascript');
      expect(serializedData.data.title).toBe('example.js');
    });

    it('should deserialize via ComponentTransformer correctly', () => {
      const originalElement = (
        <Code 
          language="typescript"
          showLineNumbers={true}
          title="Component.tsx"
        >
          {sampleTypeScript}
        </Code>
      );

      // Round-trip via ComponentTransformer
      const serializedString = ComponentTransformer.serialize(originalElement);
      const deserializedElement = ComponentTransformer.deserialize(serializedString);

      // Render both to verify they work the same
      render(
        <TestWrapper>
          {originalElement}
        </TestWrapper>
      );

      render(
        <TestWrapper>
          {deserializedElement as React.ReactElement}
        </TestWrapper>
      );

      // Should have similar structure (exact comparison may vary due to React internals)
      expect(screen.getAllByText(/interface User/).length).toBe(2); // Both should render
      expect(screen.getAllByText('Component.tsx').length).toBe(2); // Both should show title
      expect(screen.getAllByText('1').length).toBe(2); // Both should show line numbers
    });

    it('should handle nested Code components', () => {
      const nestedStructure = (
        <div>
          <Code language="javascript" title="Script 1">{sampleJavaScript}</Code>
          <Code language="typescript" title="Script 2">{sampleTypeScript}</Code>
        </div>
      );

      // Should serialize nested components
      const serializedString = ComponentTransformer.serialize(nestedStructure);
      const deserializedStructure = ComponentTransformer.deserialize(serializedString);

      // Render the deserialized structure
      render(
        <TestWrapper>
          {deserializedStructure as React.ReactElement}
        </TestWrapper>
      );

      // Both Code components should be rendered with their content
      // Note: titles might not appear if components are deserialized as unregistered
      // but the code content should be present
      expect(screen.getByText(/function greet/)).toBeInTheDocument();
      expect(screen.getByText(/interface User/)).toBeInTheDocument();
      
      // The serialized structure should contain the component data
      const parsedData = JSON.parse(serializedString);
      expect(parsedData).toBeDefined();
      // Since this is a complex nested structure, we just verify it serializes without error
    });

    it('should maintain data binding capabilities after deserialization', () => {
      const dataBindingProps = {
        children: sampleJavaScript,
        dataSource: 'codes.example',
        bindingOptions: { cache: true, strict: false }
      };

      const codeElement = <Code {...dataBindingProps} />;
      
      // Serialize and deserialize
      const serialized = ComponentTransformer.serialize(codeElement);
      const deserialized = ComponentTransformer.deserialize(serialized) as React.ReactElement;

      // Should preserve data binding props
      expect(deserialized.props.dataSource).toBe('codes.example');
      expect(deserialized.props.bindingOptions).toEqual({ cache: true, strict: false });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid JSON data gracefully', () => {
      // Test with malformed data
      expect(() => {
        Code.fromJson(null);
      }).not.toThrow();

      expect(() => {
        Code.fromJson({});
      }).not.toThrow();

      expect(() => {
        Code.fromJson({ invalidProp: 'value' });
      }).not.toThrow();
    });

    it('should handle serialization of invalid props', () => {
      const invalidProps = {
        children: undefined as unknown as string,
        language: null as unknown as string,
        showCopy: 'invalid' as unknown as boolean
      };

      const codeInstance = new Code(invalidProps);
      
      // Should not throw during serialization
      expect(() => {
        const serialized = codeInstance.toJson();
        expect(serialized).toBeDefined();
      }).not.toThrow();
    });

    it('should handle complex React children gracefully', () => {
      const complexChildren = (
        <div>
          <span>Text</span>
          {null}
          {undefined}
          {false}
          {0}
          <div>
            <p>Nested content</p>
            {['array', 'of', 'strings']}
          </div>
        </div>
      );

      const codeInstance = new Code({ children: complexChildren });
      
      expect(() => {
        const serialized = codeInstance.toJson();
        expect(typeof serialized.children).toBe('string');
      }).not.toThrow();
    });
  });
});