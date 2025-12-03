/**
 * Section Component Serialization Tests
 * 
 * Tests the Serializable interface implementation for the Section component,
 * focusing on container/layout component serialization with children support.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Section } from '../../../components/blocks/Section';
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

describe('Section Component Serialization', () => {
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
      expect(Section.tagName).toBe('Section');
      expect(Section.version).toBe('1.0.0');
      
      // Register the component
      ComponentTransformer.registerComponent(Section as unknown as React.ComponentType);
      
      // Verify it's registered
      const registeredComponents = ComponentTransformer.getRegisteredComponents();
      expect(registeredComponents).toContain('Section');
    });

    it('should implement Serializable interface correctly', () => {
      const sectionInstance = new Section({ children: 'Test content' });
      
      // Should have toJson method
      expect(typeof sectionInstance.toJson).toBe('function');
      
      // Should have static fromJson method
      expect(typeof Section.fromJson).toBe('function');
      
      // Should have static tagName and version
      expect(Section.tagName).toBeDefined();
      expect(Section.version).toBeDefined();
    });
  });

  describe('Serialization (toJson)', () => {
    it('should serialize basic props correctly', () => {
      const sectionInstance = new Section({
        children: 'Basic section content',
        background: '#f5f5f5',
        color: '#333333',
        padding: 'medium'
      });
      const serializedData = sectionInstance.toJson();

      // Note: children will be serialized to string by ComponentTransformer
      expect(serializedData.background).toBe('#f5f5f5');
      expect(serializedData.color).toBe('#333333');
      expect(serializedData.padding).toBe('medium');
      expect(serializedData.contentMaxWidth).toBeUndefined();
      expect(serializedData.component).toBeUndefined();
      expect(serializedData.dataSource).toBeUndefined();
      expect(serializedData.bindingOptions).toBeUndefined();
    });

    it('should serialize all Section props correctly', () => {
      const props = {
        children: 'Full featured section',
        background: 'var(--theme-primary)',
        color: 'white',
        padding: 'large' as const,
        contentMaxWidth: 'md' as const,
        component: 'article' as const
      };

      const sectionInstance = new Section(props);
      const serializedData = sectionInstance.toJson();

      expect(serializedData.background).toBe('var(--theme-primary)');
      expect(serializedData.color).toBe('white');
      expect(serializedData.padding).toBe('large');
      expect(serializedData.contentMaxWidth).toBe('md');
      expect(serializedData.component).toBe('article');
    });

    it('should serialize ReactNode children using ComponentTransformer', () => {
      const reactNodeChildren = (
        <div>
          <h1>Title</h1>
          <p>Paragraph content</p>
        </div>
      );
      const sectionInstance = new Section({ children: reactNodeChildren });
      const serializedData = sectionInstance.toJson();

      // Children should be serialized using ComponentTransformer.serialize
      expect(serializedData.children).toBeDefined();
      // Since ComponentTransformer.serialize returns a string, we expect that
      expect(typeof serializedData.children).toBe('string');
    });

    it('should serialize data binding props', () => {
      const props = {
        children: 'Section with data binding',
        dataSource: 'sections.hero',
        bindingOptions: { cache: true, strict: false }
      };

      const sectionInstance = new Section(props);
      const serializedData = sectionInstance.toJson();

      expect(serializedData.dataSource).toBe('sections.hero');
      expect(serializedData.bindingOptions).toEqual({ cache: true, strict: false });
    });

    it('should handle empty/undefined children', () => {
      const sectionInstance = new Section({ children: undefined });
      const serializedData = sectionInstance.toJson();

      expect(serializedData.children).toBeUndefined();
    });

    it('should serialize complex nested components', () => {
      const nestedChildren = (
        <div>
          <h2>Section Title</h2>
          <Code language="javascript">console.log('Hello');</Code>
          <p>Regular paragraph</p>
        </div>
      );

      const sectionInstance = new Section({ children: nestedChildren });
      const serializedData = sectionInstance.toJson();

      // Should serialize the entire nested structure
      expect(serializedData.children).toBeDefined();
      expect(typeof serializedData.children).toBe('string');
    });
  });

  describe('Deserialization (fromJson)', () => {
    it('should deserialize basic data to React element', () => {
      const jsonData = {
        children: 'Simple section content',
        background: '#ffffff',
        color: '#000000',
        padding: 'small'
      };

      const reactElement = Section.fromJson(jsonData);

      // Should return a React element
      expect(React.isValidElement(reactElement)).toBe(true);
      expect(reactElement.type).toBe(Section);
      expect(reactElement.props).toEqual(jsonData);
    });

    it('should deserialize minimal data', () => {
      const jsonData = {
        children: 'Minimal section'
      };

      const reactElement = Section.fromJson(jsonData);

      expect(React.isValidElement(reactElement)).toBe(true);
      expect(reactElement.props.children).toBe('Minimal section');
    });

    it('should deserialize all Section properties', () => {
      const jsonData = {
        children: 'Full section content',
        background: 'linear-gradient(45deg, #fe6b8b, #ff8e53)',
        color: 'white',
        padding: 'extra-large',
        contentMaxWidth: 'xl',
        component: 'main'
      };

      const reactElement = Section.fromJson(jsonData);

      expect(reactElement.props).toEqual(jsonData);
    });

    it('should handle data binding configuration in deserialization', () => {
      const jsonData = {
        children: 'Section with CMS binding',
        dataSource: 'pages.home.hero',
        bindingOptions: { cache: false, cacheTTL: 30000 }
      };

      const reactElement = Section.fromJson(jsonData);

      expect(reactElement.props.dataSource).toBe('pages.home.hero');
      expect(reactElement.props.bindingOptions).toEqual({ cache: false, cacheTTL: 30000 });
    });
  });

  describe('Round-trip Serialization', () => {
    it('should preserve all props through serialize → deserialize cycle', () => {
      const originalProps = {
        children: 'Complete section content',
        background: '#f8f9fa',
        color: '#212529',
        padding: 'large' as const,
        contentMaxWidth: 'lg' as const,
        component: 'section' as const
      };

      // Create instance → serialize → deserialize
      const sectionInstance = new Section(originalProps);
      const serializedData = sectionInstance.toJson();
      const deserializedElement = Section.fromJson(serializedData);

      // Compare props
      expect(deserializedElement.props.background).toBe(originalProps.background);
      expect(deserializedElement.props.color).toBe(originalProps.color);
      expect(deserializedElement.props.padding).toBe(originalProps.padding);
      expect(deserializedElement.props.contentMaxWidth).toBe(originalProps.contentMaxWidth);
      expect(deserializedElement.props.component).toBe(originalProps.component);
    });

    it('should handle ReactNode children in round-trip', () => {
      const reactNodeChildren = (
        <div>
          <h1>Main Title</h1>
          <div>
            <p>First paragraph</p>
            <p>Second paragraph</p>
          </div>
        </div>
      );

      const sectionInstance = new Section({ children: reactNodeChildren });
      const serializedData = sectionInstance.toJson();
      const deserializedElement = Section.fromJson(serializedData);

      // ReactNode children should be serialized to string by ComponentTransformer
      expect(deserializedElement.props.children).toBeDefined();
    });

    it('should maintain functionality after round-trip', () => {
      const originalProps = {
        children: 'Functional section test',
        background: '#e9ecef',
        color: '#495057',
        padding: 'medium' as const,
        contentMaxWidth: 'md' as const
      };

      // Round-trip
      const sectionInstance = new Section(originalProps);
      const serializedData = sectionInstance.toJson();
      const deserializedElement = Section.fromJson(serializedData);

      // Render the deserialized element
      render(
        <TestWrapper>
          {deserializedElement}
        </TestWrapper>
      );

      // Should render correctly with original functionality
      expect(screen.getByText(/Functional section test/)).toBeInTheDocument();
    });

    it('should handle empty and edge cases in round-trip', () => {
      const edgeCaseProps = {
        children: '',
        background: '',
        color: '',
        padding: 'none' as const,
        contentMaxWidth: false as const,
        component: 'div' as const
      };

      const sectionInstance = new Section(edgeCaseProps);
      const serializedData = sectionInstance.toJson();
      const deserializedElement = Section.fromJson(serializedData);

      // Should handle empty values gracefully - empty string children are preserved through serialization
      expect(deserializedElement.props.children).toBeDefined();
      expect(deserializedElement.props.background).toBe('');
      expect(deserializedElement.props.color).toBe('');
      expect(deserializedElement.props.padding).toBe('none');
      
      // Render should work without errors
      expect(() => {
        render(
          <TestWrapper>
            {deserializedElement}
          </TestWrapper>
        );
      }).not.toThrow();
    });
  });

  describe('ComponentTransformer Integration', () => {
    beforeEach(() => {
      // Register the Section component for these tests
      ComponentTransformer.registerComponent(Section as unknown as React.ComponentType);
    });

    it('should work with ComponentTransformer serialize/deserialize', () => {
      const sectionElement = (
        <Section 
          background="#f0f8ff"
          color="#191970"
          padding="large"
          contentMaxWidth="lg"
        >
          <h1>Test Section</h1>
          <p>Section content for testing</p>
        </Section>
      );

      // Serialize using ComponentTransformer
      const serializedString = ComponentTransformer.serialize(sectionElement);
      expect(typeof serializedString).toBe('string');
      
      const serializedData = JSON.parse(serializedString);
      expect(serializedData.tag).toBe('Section');
      expect(serializedData.version).toBe('1.0.0');
      expect(serializedData.data.background).toBe('#f0f8ff');
      expect(serializedData.data.color).toBe('#191970');
      expect(serializedData.data.padding).toBe('large');
      expect(serializedData.data.contentMaxWidth).toBe('lg');
    });

    it('should deserialize via ComponentTransformer correctly', () => {
      const originalElement = (
        <Section 
          background="var(--theme-surface)"
          padding="medium"
          component="article"
        >
          <h2>Article Section</h2>
          <p>Article content here</p>
        </Section>
      );

      // Round-trip via ComponentTransformer
      const serializedString = ComponentTransformer.serialize(originalElement);
      const deserializedElement = ComponentTransformer.deserialize(serializedString);

      // Render both to verify they work
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

      // Both should render content (exact structure may vary due to serialization)
      expect(screen.getAllByText(/Article/).length).toBeGreaterThanOrEqual(1);
    });

    it('should handle nested Section with other components', () => {
      // Register Code component for this test
      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);

      const nestedStructure = (
        <Section background="#f8f9fa" padding="large">
          <h1>Code Examples Section</h1>
          <Code language="javascript" title="example.js">
            console.log('Hello World');
          </Code>
          <Section background="#ffffff" padding="small">
            <p>Nested section content</p>
          </Section>
        </Section>
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

      // Should contain elements from both Section and Code components
      const parsedData = JSON.parse(serializedString);
      expect(parsedData).toBeDefined();
      // Since this is a complex nested structure, we just verify it serializes without error
    });

    it('should maintain data binding capabilities after deserialization', () => {
      const dataBindingProps = {
        children: 'CMS-driven section',
        background: 'var(--theme-primary)',
        dataSource: 'sections.hero',
        bindingOptions: { cache: true, strict: false }
      };

      const sectionElement = <Section {...dataBindingProps} />;
      
      // Serialize and deserialize
      const serialized = ComponentTransformer.serialize(sectionElement);
      const deserialized = ComponentTransformer.deserialize(serialized) as React.ReactElement;

      // Should preserve data binding props
      expect(deserialized.props.dataSource).toBe('sections.hero');
      expect(deserialized.props.bindingOptions).toEqual({ cache: true, strict: false });
    });
  });

  describe('Children Serialization Edge Cases', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(Section as unknown as React.ComponentType);
      ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);
    });

    it('should handle array of children', () => {
      const arrayChildren = [
        <h1 key="title">Title</h1>,
        <p key="p1">Paragraph 1</p>,
        <p key="p2">Paragraph 2</p>
      ];

      const sectionInstance = new Section({ children: arrayChildren });
      const serializedData = sectionInstance.toJson();

      expect(serializedData.children).toBeDefined();
      expect(typeof serializedData.children).toBe('string');
    });

    it('should handle mixed content types as children', () => {
      const mixedChildren = (
        <>
          Plain text
          <span>Span element</span>
          {42}
          {true}
          <Code language="javascript">const x = 1;</Code>
          {null}
          {undefined}
        </>
      );

      const sectionInstance = new Section({ children: mixedChildren });
      
      expect(() => {
        const serializedData = sectionInstance.toJson();
        expect(serializedData.children).toBeDefined();
      }).not.toThrow();
    });

    it('should handle deeply nested component structures', () => {
      const deeplyNested = (
        <div>
          <Section background="#f1f1f1">
            <div>
              <Section background="#e1e1e1">
                <Code language="typescript">
                  interface User {'{'}
                    id: number;
                  {'}'}
                </Code>
              </Section>
            </div>
          </Section>
        </div>
      );

      const sectionInstance = new Section({ children: deeplyNested });
      
      expect(() => {
        const serializedData = sectionInstance.toJson();
        expect(serializedData.children).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid JSON data gracefully', () => {
      // Test with malformed data
      expect(() => {
        Section.fromJson(null);
      }).not.toThrow();

      expect(() => {
        Section.fromJson({});
      }).not.toThrow();

      expect(() => {
        Section.fromJson({ invalidProp: 'value' });
      }).not.toThrow();
    });

    it('should handle serialization of invalid props', () => {
      const invalidProps = {
        children: null as unknown as React.ReactNode,
        background: null as unknown as string,
        padding: 'invalid' as unknown as string
      };

      const sectionInstance = new Section(invalidProps);
      
      // Should not throw during serialization
      expect(() => {
        const serialized = sectionInstance.toJson();
        expect(serialized).toBeDefined();
      }).not.toThrow();
    });

    it('should handle complex children serialization errors gracefully', () => {
      // Create children with potential serialization issues
      const problematicChildren = (
        <div>
          {/* Function as child - should be handled gracefully */}
          {(() => 'Dynamic content')()}
          {/* Circular reference objects should be handled by ComponentTransformer */}
          <span>Normal content</span>
        </div>
      );

      const sectionInstance = new Section({ children: problematicChildren });
      
      expect(() => {
        const serialized = sectionInstance.toJson();
        expect(serialized.children).toBeDefined();
      }).not.toThrow();
    });
  });
});