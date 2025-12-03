/**
 * Text Component Serialization Tests
 * 
 * Tests for the Text component's ModelView implementation and 
 * serialization capabilities using ComponentTransformer.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { Text } from '../../../components/blocks/Text';

describe('Text Serialization', () => {
  beforeEach(() => {
    // Clear component registry for clean tests
    ComponentTransformer.clearRegistry();
    
    // Register Text component
    ComponentTransformer.registerComponent(Text as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Basic Serialization', () => {
    it('should serialize and deserialize basic text component', () => {
      // Create original component
      const originalComponent = (
        <Text 
          content="Hello, World!"
          variant="body1"
        />
      );

      // Serialize
      const serialized = ComponentTransformer.serialize(originalComponent);
      expect(serialized).toBeTruthy();
      expect(typeof serialized).toBe('string');

      // Parse to check structure
      const parsed = JSON.parse(serialized);
      expect(parsed.tag).toBe('Text');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.content).toBe('Hello, World!');
      expect(parsed.data.variant).toBe('body1');

      // Deserialize
      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should preserve all typography properties through serialization', () => {
      const originalComponent = (
        <Text 
          content="Comprehensive Typography Test"
          variant="h2"
          color="primary"
          align="center"
          component="h1"
          fontWeight="bold"
          textDecoration="underline"
          textTransform="uppercase"
          noWrap={true}
          paragraph={false}
          gutterBottom={true}
          fontSize="2.5rem"
          lineHeight="1.2"
          letterSpacing="0.1em"
          fontFamily="Arial, sans-serif"
          customColor="#1976d2"
          maxWidth="600px"
        />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      const data = parsed.data;

      expect(data.content).toBe('Comprehensive Typography Test');
      expect(data.variant).toBe('h2');
      expect(data.color).toBe('primary');
      expect(data.align).toBe('center');
      expect(data.component).toBe('h1');
      expect(data.fontWeight).toBe('bold');
      expect(data.textDecoration).toBe('underline');
      expect(data.textTransform).toBe('uppercase');
      expect(data.noWrap).toBe(true);
      expect(data.paragraph).toBe(false);
      expect(data.gutterBottom).toBe(true);
      expect(data.fontSize).toBe('2.5rem');
      expect(data.lineHeight).toBe('1.2');
      expect(data.letterSpacing).toBe('0.1em');
      expect(data.fontFamily).toBe('Arial, sans-serif');
      expect(data.customColor).toBe('#1976d2');
      expect(data.maxWidth).toBe('600px');

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle all typography variants', () => {
      const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'];
      
      variants.forEach(variant => {
        const originalComponent = (
          <Text
            content={`This is ${variant} variant`}
            variant={variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'subtitle'}
          />
        );

        const serialized = ComponentTransformer.serialize(originalComponent);
        const parsed = JSON.parse(serialized);

        expect(parsed.data.variant).toBe(variant);
        expect(parsed.data.content).toBe(`This is ${variant} variant`);

        const deserialized = ComponentTransformer.deserialize(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      });
    });

    it('should handle all color variants', () => {
      const colors = ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error', 'warning', 'info', 'success', 'inherit'];
      
      colors.forEach(color => {
        const originalComponent = (
          <Text
            content={`This is ${color} colored text`}
            color={color as string}
          />
        );

        const serialized = ComponentTransformer.serialize(originalComponent);
        const parsed = JSON.parse(serialized);

        expect(parsed.data.color).toBe(color);

        const deserialized = ComponentTransformer.deserialize(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      });
    });

    it('should handle all alignment options', () => {
      const alignments = ['left', 'center', 'right', 'justify', 'inherit'];
      
      alignments.forEach(align => {
        const originalComponent = (
          <Text
            content={`This text is ${align} aligned`}
            align={align as 'left' | 'center' | 'right' | 'justify'}
          />
        );

        const serialized = ComponentTransformer.serialize(originalComponent);
        const parsed = JSON.parse(serialized);

        expect(parsed.data.align).toBe(align);

        const deserialized = ComponentTransformer.deserialize(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      });
    });

    it('should handle semantic HTML elements', () => {
      const elements = ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'legend'];
      
      elements.forEach(element => {
        const originalComponent = (
          <Text
            content={`This is rendered as ${element} element`}
            component={element as 'div' | 'span' | 'p'}
          />
        );

        const serialized = ComponentTransformer.serialize(originalComponent);
        const parsed = JSON.parse(serialized);

        expect(parsed.data.component).toBe(element);

        const deserialized = ComponentTransformer.deserialize(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      });
    });
  });

  describe('Performance Tests', () => {
    it('should serialize text component in under 1ms', () => {
      const component = (
        <Text 
          content="Performance test content"
          variant="h1"
          color="primary"
        />
      );

      const startTime = performance.now();
      const serialized = ComponentTransformer.serialize(component);
      const endTime = performance.now();

      expect(serialized).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(1); // Less than 1ms
    });

    it('should deserialize text component in under 1ms', () => {
      const component = (
        <Text 
          content="Performance test content"
          variant="h1"
          color="primary"
        />
      );

      const serialized = ComponentTransformer.serialize(component);

      const startTime = performance.now();
      const deserialized = ComponentTransformer.deserialize(serialized);
      const endTime = performance.now();

      expect(React.isValidElement(deserialized)).toBe(true);
      expect(endTime - startTime).toBeLessThan(1); // Less than 1ms
    });

    it('should handle large text content efficiently', () => {
      const largeContent = 'Lorem ipsum '.repeat(1000); // ~11KB of text
      
      const component = (
        <Text 
          content={largeContent}
          variant="body1"
          paragraph={true}
        />
      );

      const startTime = performance.now();
      const serialized = ComponentTransformer.serialize(component);
      const deserialized = ComponentTransformer.deserialize(serialized);
      const endTime = performance.now();

      expect(React.isValidElement(deserialized)).toBe(true);
      expect(endTime - startTime).toBeLessThan(5); // Less than 5ms for large content
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      const component = (
        <Text content="" variant="body1" />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.content).toBe('');

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle undefined content', () => {
      const component = (
        <Text variant="body1" />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.content).toBeUndefined();

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle special characters in content', () => {
      const specialContent = 'Special chars: !@#$%^&*()[]{}|;:,.<>?~`"\'\n\t\r';
      
      const component = (
        <Text content={specialContent} variant="body1" />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.content).toBe(specialContent);

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle unicode characters', () => {
      const unicodeContent = 'Unicode: 🚀 🌟 📱 💡 🎯 🔥 ⭐ 🎉 🎨 🌈 中文 العربية 한국어 日本語 русский';
      
      const component = (
        <Text content={unicodeContent} variant="body1" />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.content).toBe(unicodeContent);

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle numeric content (zero)', () => {
      const component = (
        <Text content="0" variant="body1" />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.content).toBe('0');

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle default property values', () => {
      const component = (
        <Text content="Default properties test" />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);
      const data = parsed.data;

      // Should include explicit undefined for default values that weren't set
      expect(data.content).toBe('Default properties test');
      expect(data.variant).toBeUndefined(); // Will default to 'body1' in component
      expect(data.color).toBeUndefined();   // Will default to 'inherit' in component
      expect(data.align).toBeUndefined();   // Will default to 'inherit' in component
      
      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });
  });

  describe('Render Consistency', () => {
    it('should render serialized and original components identically', () => {
      const originalComponent = (
        <Text 
          content="Render consistency test"
          variant="h3"
          color="secondary"
          align="center"
          fontWeight="bold"
        />
      );

      // Render original
      const { container: originalContainer } = render(originalComponent);
      const originalHTML = originalContainer.innerHTML;

      // Serialize and deserialize
      const serialized = ComponentTransformer.serialize(originalComponent);
      const deserialized = ComponentTransformer.deserialize(serialized);

      // Render deserialized
      const { container: deserializedContainer } = render(deserialized as React.ReactElement);
      const deserializedHTML = deserializedContainer.innerHTML;

      // Should produce identical HTML output
      expect(deserializedHTML).toBe(originalHTML);
    });

    it('should maintain text content after serialization round-trip', () => {
      const testContent = 'This content should remain exactly the same after serialization';
      
      const originalComponent = (
        <Text content={testContent} variant="body1" />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const deserialized = ComponentTransformer.deserialize(serialized);

      render(deserialized as React.ReactElement);
      
      // Check if the text content is preserved
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });
  });

  describe('Data Structure Validation', () => {
    it('should create valid JSON structure', () => {
      const component = (
        <Text 
          content="JSON validation test"
          variant="h4"
          color="primary"
          gutterBottom={true}
        />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);

      // Validate top-level structure
      expect(parsed).toHaveProperty('tag');
      expect(parsed).toHaveProperty('version');
      expect(parsed).toHaveProperty('data');

      // Validate component identification
      expect(parsed.tag).toBe('Text');
      expect(parsed.version).toBe('1.0.0');

      // Validate data structure
      expect(typeof parsed.data).toBe('object');
      expect(parsed.data.content).toBe('JSON validation test');
      expect(parsed.data.variant).toBe('h4');
      expect(parsed.data.color).toBe('primary');
      expect(parsed.data.gutterBottom).toBe(true);
    });

    it('should maintain type integrity for all properties', () => {
      const component = (
        <Text 
          content="Type integrity test"
          variant="h2"
          color="error"
          align="right"
          component="h3"
          fontWeight="600"
          textDecoration="underline"
          textTransform="capitalize"
          noWrap={false}
          paragraph={true}
          gutterBottom={false}
          fontSize="1.8rem"
          lineHeight="1.4"
          letterSpacing="0.05em"
          fontFamily="Helvetica, sans-serif"
          customColor="#ff5722"
          maxWidth="500px"
        />
      );

      const serialized = ComponentTransformer.serialize(component);
      const parsed = JSON.parse(serialized);
      const data = parsed.data;

      // Validate string properties
      expect(typeof data.content).toBe('string');
      expect(typeof data.variant).toBe('string');
      expect(typeof data.color).toBe('string');
      expect(typeof data.align).toBe('string');
      expect(typeof data.component).toBe('string');
      expect(typeof data.fontWeight).toBe('string');
      expect(typeof data.textDecoration).toBe('string');
      expect(typeof data.textTransform).toBe('string');
      expect(typeof data.fontSize).toBe('string');
      expect(typeof data.lineHeight).toBe('string');
      expect(typeof data.letterSpacing).toBe('string');
      expect(typeof data.fontFamily).toBe('string');
      expect(typeof data.customColor).toBe('string');
      expect(typeof data.maxWidth).toBe('string');

      // Validate boolean properties
      expect(typeof data.noWrap).toBe('boolean');
      expect(typeof data.paragraph).toBe('boolean');
      expect(typeof data.gutterBottom).toBe('boolean');
    });
  });

  describe('Component Identity', () => {
    it('should preserve static component properties', () => {
      expect(Text.tagName).toBe('Text');
      expect(Text.version).toBe('1.0.0');
      expect(typeof Text.fromJson).toBe('function');
    });

    it('should support fromJson static method', () => {
      const jsonData = {
        content: 'Static method test',
        variant: 'h5',
        color: 'success'
      };

      const component = Text.fromJson(jsonData);
      expect(React.isValidElement(component)).toBe(true);

      render(component);
      expect(screen.getByText('Static method test')).toBeInTheDocument();
    });
  });
});