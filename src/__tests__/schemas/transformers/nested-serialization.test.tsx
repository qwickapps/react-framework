/**
 * Nested Component Serialization Tests
 * 
 * Tests to verify that deeply nested component structures can be
 * properly serialized and deserialized without circular references.
 */

import React from 'react';
import { Container } from '../../../components/base/Container';
import { Text } from '../../../components/blocks/Text';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import '../schemas/transformers/registry'; // Ensure components are registered

describe('Nested Component Serialization', () => {
  describe('Deep Nesting with Mixed Content', () => {
    it('should serialize and deserialize deeply nested Container and Text components', () => {
      // Create a complex nested structure
      const nestedStructure = (
        <Container
          span={12}
          padding="large"
          background="primary.main"
          onClick={() => { console.log("Parent clicked"); }}
        >
          <Container 
            span={6}
            padding="medium"
            background="secondary.main"
          >
            <Text variant="h6" color="textSecondary">
              Deep nested text content
            </Text>
          </Container>
          
          <Container
            span={6}
            padding="medium"
            background="success.main"
          >
            Simple string content
          </Container>
        </Container>
      );

      // Test serialization
      expect(() => {
        const serializedData = ComponentTransformer.serialize(nestedStructure);
        const parsedData = JSON.parse(serializedData);
        
        // Verify outer Container structure
        expect(parsedData.tagName).toBe('Container');
        expect(parsedData.version).toBe('1.0.0');
        expect(parsedData.data.span).toBe(12);
        expect(parsedData.data.padding).toBe('large');
        expect(typeof parsedData.data.onClick).toBe('string');
        
        // Verify children are serialized as array
        expect(Array.isArray(parsedData.data.children)).toBe(true);
        expect(parsedData.data.children).toHaveLength(2);
        
        // Verify first nested Container
        const firstChild = parsedData.data.children[0];
        expect(firstChild.tagName).toBe('Container');
        expect(firstChild.data.span).toBe(6);
        expect(firstChild.data.background).toBe('secondary.main');
        
        // Verify deeply nested Text component (single child is not wrapped in array)
        expect(typeof firstChild.data.children).toBe('object');
        expect(firstChild.data.children).not.toBeNull();
        const textComponent = firstChild.data.children;
        expect(textComponent.tagName).toBe('Text');
        expect(textComponent.data.variant).toBe('h6');
        expect(textComponent.data.color).toBe('white');
        expect(textComponent.data.children).toBe('Deep nested text content');
        
        // Verify second nested Container with string content
        const secondChild = parsedData.data.children[1];
        expect(secondChild.tagName).toBe('Container');
        expect(secondChild.data.children).toBe('Simple string content');
        
        console.log('✅ Nested serialization structure validated');
        
      }).not.toThrow();
    });

    it('should perform round-trip serialization/deserialization', () => {
      // Create nested structure
      const originalStructure = (
        <Container span={8} padding="medium" background="info.main">
          <Container span={12} padding="small">
            <Text variant="body1">Level 2 content</Text>
          </Container>
        </Container>
      );

      // Serialize
      const serializedData = ComponentTransformer.serialize(originalStructure);
      
      // Deserialize  
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      
      // Verify it's a valid React element
      expect(React.isValidElement(deserializedComponent)).toBe(true);
      
      // Serialize again to verify integrity
      const reserializedData = ComponentTransformer.serialize(deserializedComponent);
      const originalParsed = JSON.parse(serializedData);
      const reserializedParsed = JSON.parse(reserializedData);
      
      // Compare key structural elements (skip function references which will differ)
      expect(reserializedParsed.tagName).toBe(originalParsed.tagName);
      expect(reserializedParsed.data.span).toBe(originalParsed.data.span);
      expect(reserializedParsed.data.padding).toBe(originalParsed.data.padding);
      
      console.log('✅ Round-trip serialization successful');
    });

    it('should handle mixed primitive and component children', () => {
      const mixedContent = (
        <Container span={12} padding="large">
          String content first
          <Container span={6} padding="small">
            <Text variant="h5">Component content</Text>
          </Container>
          More string content
          <Text variant="body2">Another component</Text>
          Final string
        </Container>
      );

      expect(() => {
        const serializedData = ComponentTransformer.serialize(mixedContent);
        const parsedData = JSON.parse(serializedData);
        
        // Verify mixed children array
        expect(Array.isArray(parsedData.data.children)).toBe(true);
        expect(parsedData.data.children.length).toBeGreaterThan(1);
        
        // Should contain both strings and component objects
        const hasStrings = parsedData.data.children.some(child => typeof child === 'string');
        const hasComponents = parsedData.data.children.some(child => 
          typeof child === 'object' && child.tagName
        );
        
        expect(hasStrings).toBe(true);
        expect(hasComponents).toBe(true);
        
        console.log('✅ Mixed content serialization validated');
        
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle empty children gracefully', () => {
      const emptyContainer = <Container span={6} padding="medium" />;
      
      expect(() => {
        const serializedData = ComponentTransformer.serialize(emptyContainer);
        const parsedData = JSON.parse(serializedData);
        
        // Should not have children property or should be undefined
        expect(parsedData.data.children === undefined || parsedData.data.children === null).toBe(true);
        
      }).not.toThrow();
    });

    it('should handle null children gracefully', () => {
      const nullChildrenContainer = <Container span={6} padding="medium">{null}</Container>;
      
      expect(() => {
        const serializedData = ComponentTransformer.serialize(nullChildrenContainer);
        const parsedData = JSON.parse(serializedData);
        
        // Null should be preserved
        expect(parsedData.data.children).toBe(null);
        
      }).not.toThrow();
    });
  });
});