/**
 * GridLayout Component Serialization Tests
 * 
 * Tests for the GridLayout component's ModelView implementation and 
 * serialization capabilities using ComponentTransformer.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { GridLayout } from '../../../components/layout/GridLayout';
import { GridCell } from '../../../components/layout/GridCell';
import { Text } from '../../../components/layout/../blocks/Text';
import { Button } from '../../../components/layout/../buttons/Button';

describe('GridLayout Serialization', () => {
  beforeEach(() => {
    // Clear component registry for clean tests
    ComponentTransformer.clearRegistry();
    
    // Register all necessary components
    ComponentTransformer.registerComponent(GridLayout as unknown as React.ComponentType);
    ComponentTransformer.registerComponent(GridCell as unknown as React.ComponentType);
    ComponentTransformer.registerComponent(Text as unknown as React.ComponentType);
    ComponentTransformer.registerComponent(Button as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Basic Serialization', () => {
    it('should serialize and deserialize basic grid layout', () => {
      // Create original component
      const originalComponent = (
        <GridLayout 
          columns={3}
          spacing="medium"
          equalHeight={true}
        >
          <div>Column 1</div>
          <div>Column 2</div>
          <div>Column 3</div>
        </GridLayout>
      );

      // Serialize
      const serialized = ComponentTransformer.serialize(originalComponent);
      expect(serialized).toBeTruthy();
      expect(typeof serialized).toBe('string');

      // Parse to check structure
      const parsed = JSON.parse(serialized);
      expect(parsed.tag).toBe('GridLayout');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.columns).toBe(3);
      expect(parsed.data.spacing).toBe('medium');
      expect(parsed.data.equalHeight).toBe(true);
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const children = JSON.parse(parsed.data.children);
      expect(Array.isArray(children)).toBe(true);
      expect(children).toHaveLength(3);
    });

    it('should serialize empty grid layout', () => {
      const originalComponent = (
        <GridLayout columns={2} />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.tag).toBe('GridLayout');
      expect(parsed.data.columns).toBe(2);
      expect(parsed.data.children).toBeUndefined();
    });

    it('should serialize grid layout with dimension props', () => {
      const originalComponent = (
        <GridLayout 
          columns={2}
          height="400px"
          width="100%"
          maxWidth="800px"
          className="custom-grid"
        >
          <div>Content</div>
        </GridLayout>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.data.height).toBe('400px');
      expect(parsed.data.width).toBe('100%');
      expect(parsed.data.maxWidth).toBe('800px');
      expect(parsed.data.className).toBe('custom-grid');
    });
  });

  describe('Nested Component Serialization', () => {
    it('should serialize grid with nested GridCell components', () => {
      const originalComponent = (
        <GridLayout columns={2} spacing="large">
          <GridCell span={6}>
            <Text content="First Cell" variant="h3" />
          </GridCell>
          <GridCell span={6}>
            <Text content="Second Cell" variant="body1" />
          </GridCell>
        </GridLayout>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.tag).toBe('GridLayout');
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const children = JSON.parse(parsed.data.children);
      expect(Array.isArray(children)).toBe(true);
      expect(children).toHaveLength(2);
      
      // Check that nested GridCell components are serialized
      const firstChild = children[0];
      expect(typeof firstChild).toBe('object');
      expect(firstChild.tag).toBe('GridCell');
      expect(firstChild.data.span).toBe(6);
      
      // Check that Text components inside GridCell are serialized
      expect(typeof firstChild.data.children).toBe('string');
      const nestedText = JSON.parse(firstChild.data.children);
      expect(nestedText.tag).toBe('Text');
      expect(nestedText.data.content).toBe('First Cell');
    });

    it('should serialize grid with mixed nested components', () => {
      const originalComponent = (
        <GridLayout columns={3} spacing="medium">
          <GridCell xs={12} sm={4}>
            <Text content="Column 1" variant="h4" />
          </GridCell>
          <div>Regular div content</div>
          <GridCell xs={12} sm={8}>
            <Button label="Action Button" variant="primary" />
          </GridCell>
        </GridLayout>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const children = JSON.parse(parsed.data.children);
      expect(Array.isArray(children)).toBe(true);
      expect(children).toHaveLength(3);
      
      // First child is GridCell with Text
      expect(children[0].tag).toBe('GridCell');
      expect(children[0].data.xs).toBe(12);
      expect(children[0].data.sm).toBe(4);
      
      // Second child is regular div (serialized as react node)
      expect(typeof children[1]).toBe('object');
      expect(children[1].tag).toBe('__react_node__');
      
      // Third child is GridCell with Button
      expect(children[2].tag).toBe('GridCell');
      const buttonChild = JSON.parse(children[2].data.children);
      expect(buttonChild.tag).toBe('Button');
      expect(buttonChild.data.label).toBe('Action Button');
    });
  });

  describe('Deserialization', () => {
    it('should deserialize back to working component', () => {
      const originalComponent = (
        <GridLayout columns={2} spacing="small" equalHeight={true}>
          <GridCell span={8}>
            <Text content="Main Content" />
          </GridCell>
          <GridCell span={4}>
            <Text content="Sidebar" />
          </GridCell>
        </GridLayout>
      );

      // Serialize and deserialize
      const serialized = ComponentTransformer.serialize(originalComponent);
      const deserialized = ComponentTransformer.deserialize(serialized);

      // Render both to compare
      const { container: originalContainer } = render(originalComponent);
      const { container: deserializedContainer } = render(deserialized);

      // Check that both render successfully
      expect(originalContainer.firstChild).toBeTruthy();
      expect(deserializedContainer.firstChild).toBeTruthy();
      
      // Both should have grid container classes
      const originalGrid = originalContainer.querySelector('.MuiGrid-container');
      const deserializedGrid = deserializedContainer.querySelector('.MuiGrid-container');
      expect(originalGrid).toBeTruthy();
      expect(deserializedGrid).toBeTruthy();
    });

    it('should preserve all layout properties after round-trip serialization', () => {
      const originalComponent = (
        <GridLayout 
          columns={4}
          spacing="huge"
          equalHeight={false}
          height="300px"
          minHeight="200px"
          maxWidth="1200px"
          className="test-grid"
        >
          <div>Test content</div>
        </GridLayout>
      );

      // Double serialization to test round-trip
      const serialized1 = ComponentTransformer.serialize(originalComponent);
      const deserialized1 = ComponentTransformer.deserialize(serialized1);
      const serialized2 = ComponentTransformer.serialize(deserialized1);
      const parsed2 = JSON.parse(serialized2);

      // Properties should be preserved
      expect(parsed2.data.columns).toBe(4);
      expect(parsed2.data.spacing).toBe('huge');
      expect(parsed2.data.equalHeight).toBe(false);
      expect(parsed2.data.height).toBe('300px');
      expect(parsed2.data.minHeight).toBe('200px');
      expect(parsed2.data.maxWidth).toBe('1200px');
      expect(parsed2.data.className).toBe('test-grid');
    });
  });

  describe('Performance', () => {
    it('should serialize large grid efficiently', () => {
      const gridItems = Array.from({ length: 50 }, (_, i) => (
        <GridCell key={i} xs={12} sm={6} md={4} lg={3}>
          <Text content={`Item ${i + 1}`} />
        </GridCell>
      ));

      const largeGrid = (
        <GridLayout columns={4} spacing="medium">
          {gridItems}
        </GridLayout>
      );

      const startTime = performance.now();
      const serialized = ComponentTransformer.serialize(largeGrid);
      const endTime = performance.now();

      expect(serialized).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
      
      const parsed = JSON.parse(serialized);
      const children = JSON.parse(parsed.data.children);
      expect(children).toHaveLength(50);
    });
  });

  describe('Error Handling', () => {
    it('should handle grid with invalid children gracefully', () => {
      const gridWithNullChild = (
        <GridLayout columns={2}>
          <div>Valid content</div>
          {null}
          <div>More valid content</div>
        </GridLayout>
      );

      expect(() => {
        const serialized = ComponentTransformer.serialize(gridWithNullChild);
        const parsed = JSON.parse(serialized);
        const children = JSON.parse(parsed.data.children);
        expect(children).toHaveLength(3); // null becomes a child
      }).not.toThrow();
    });

    it('should handle grid with complex nested structures', () => {
      const complexGrid = (
        <GridLayout columns={1}>
          <GridCell>
            <div>
              <span>Complex</span>
              <strong>Nested</strong>
              <em>Structure</em>
            </div>
          </GridCell>
        </GridLayout>
      );

      expect(() => {
        const serialized = ComponentTransformer.serialize(complexGrid);
        const deserialized = ComponentTransformer.deserialize(serialized);
        render(deserialized);
      }).not.toThrow();
    });
  });
});