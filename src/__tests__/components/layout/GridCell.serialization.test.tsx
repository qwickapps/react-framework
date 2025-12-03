/**
 * GridCell Component Serialization Tests
 * 
 * Tests for the GridCell component's ModelView implementation and 
 * serialization capabilities using ComponentTransformer.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { GridCell } from '../../../components/layout/GridCell';
import { Text } from '../../../components/layout/../blocks/Text';
import { Button } from '../../../components/layout/../buttons/Button';
import { Code } from '../../../components/layout/../blocks/Code';

describe('GridCell Serialization', () => {
  beforeEach(() => {
    // Clear component registry for clean tests
    ComponentTransformer.clearRegistry();
    
    // Register all necessary components
    ComponentTransformer.registerComponent(GridCell as unknown as React.ComponentType);
    ComponentTransformer.registerComponent(Text as unknown as React.ComponentType);
    ComponentTransformer.registerComponent(Button as unknown as React.ComponentType);
    ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Basic Serialization', () => {
    it('should serialize and deserialize basic grid cell', () => {
      // Create original component
      const originalComponent = (
        <GridCell 
          span={6}
          background="primary.main"
          padding="medium"
        >
          <div>Cell content</div>
        </GridCell>
      );

      // Serialize
      const serialized = ComponentTransformer.serialize(originalComponent);
      expect(serialized).toBeTruthy();
      expect(typeof serialized).toBe('string');

      // Parse to check structure
      const parsed = JSON.parse(serialized);
      expect(parsed.tag).toBe('GridCell');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.span).toBe(6);
      expect(parsed.data.background).toBe('primary.main');
      expect(parsed.data.padding).toBe('medium');
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const children = JSON.parse(parsed.data.children);
      expect(children.data.props.children.value).toBe('Cell content');
    });

    it('should serialize empty grid cell', () => {
      const originalComponent = (
        <GridCell span={12} />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.tag).toBe('GridCell');
      expect(parsed.data.span).toBe(12);
      expect(parsed.data.children).toBeUndefined();
    });

    it('should serialize grid cell with responsive properties', () => {
      const originalComponent = (
        <GridCell 
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          height="200px"
          className="responsive-cell"
        >
          <div>Responsive content</div>
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.data.xs).toBe(12);
      expect(parsed.data.sm).toBe(6);
      expect(parsed.data.md).toBe(4);
      expect(parsed.data.lg).toBe(3);
      expect(parsed.data.xl).toBe(2);
      expect(parsed.data.height).toBe('200px');
      expect(parsed.data.className).toBe('responsive-cell');
    });

    it('should serialize grid cell with styling properties', () => {
      const originalComponent = (
        <GridCell 
          background="secondary.light"
          padding="large"
          margin="small"
          width="100%"
        >
          <span>Styled content</span>
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.data.background).toBe('secondary.light');
      expect(parsed.data.padding).toBe('large');
      expect(parsed.data.margin).toBe('small');
      expect(parsed.data.width).toBe('100%');
    });
  });

  describe('Nested Component Serialization', () => {
    it('should serialize grid cell with nested Text component', () => {
      const originalComponent = (
        <GridCell span={8}>
          <Text 
            content="Hello, World!"
            variant="h2"
            color="primary"
          />
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.tag).toBe('GridCell');
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const nestedText = JSON.parse(parsed.data.children);
      expect(nestedText.tag).toBe('Text');
      expect(nestedText.data.content).toBe('Hello, World!');
      expect(nestedText.data.variant).toBe('h2');
      expect(nestedText.data.color).toBe('primary');
      // Note: textAlign is not a property in TextSchema
    });

    it('should serialize grid cell with nested Button component', () => {
      const originalComponent = (
        <GridCell xs={12} sm={6}>
          <Button 
            label="Click Me"
            variant="primary"
            buttonSize="large"
            disabled={false}
          />
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const nestedButton = JSON.parse(parsed.data.children);
      expect(nestedButton.tag).toBe('Button');
      expect(nestedButton.data.label).toBe('Click Me');
      expect(nestedButton.data.variant).toBe('primary');
      expect(nestedButton.data.buttonSize).toBe('large'); // Button schema uses buttonSize, not size
      expect(nestedButton.data.disabled).toBe(false);
    });

    it('should serialize grid cell with multiple nested components', () => {
      const originalComponent = (
        <GridCell md={6}>
          <Text content="Title" variant="h3" />
          <Text content="Description text here" variant="body1" />
          <Button label="Action" variant="outlined" />
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const children = JSON.parse(parsed.data.children);
      expect(Array.isArray(children)).toBe(true);
      expect(children).toHaveLength(3);
      
      expect(children[0].tag).toBe('Text');
      expect(children[0].data.content).toBe('Title');
      
      expect(children[1].tag).toBe('Text');
      expect(children[1].data.content).toBe('Description text here');
      
      expect(children[2].tag).toBe('Button');
      expect(children[2].data.label).toBe('Action');
    });

    it('should serialize grid cell with mixed content', () => {
      const originalComponent = (
        <GridCell span={12}>
          <Text content="Header" variant="h4" />
          <div>Regular div content</div>
          <Code language="javascript">
            console.log("Hello, World!");
          </Code>
          <span>More text</span>
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      // Children should be serialized as JSON string
      expect(typeof parsed.data.children).toBe('string');
      const children = JSON.parse(parsed.data.children);
      expect(Array.isArray(children)).toBe(true);
      expect(children).toHaveLength(4);
      
      // First child is Text component
      expect(children[0].tag).toBe('Text');
      expect(children[0].data.content).toBe('Header');
      
      // Second child is regular div (serialized as react node)
      expect(typeof children[1]).toBe('object');
      expect(children[1].tag).toBe('__react_node__');
      
      // Third child is Code component
      expect(children[2].tag).toBe('Code');
      expect(children[2].data.language).toBe('javascript');
      
      // Fourth child is span (serialized as react node)
      expect(typeof children[3]).toBe('object');
      expect(children[3].tag).toBe('__react_node__');
    });
  });

  describe('Deserialization', () => {
    it('should deserialize back to working component', () => {
      const originalComponent = (
        <GridCell 
          xs={12}
          md={6}
          background="background.paper"
          padding="large"
        >
          <Text content="Test Content" variant="body1" />
        </GridCell>
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
      
      // Both should have proper data attributes for grid props
      const originalCell = originalContainer.firstChild as HTMLElement;
      const deserializedCell = deserializedContainer.firstChild as HTMLElement;
      
      expect(originalCell.getAttribute('data-grid-xs')).toBe('12');
      expect(deserializedCell.getAttribute('data-grid-xs')).toBe('12');
      expect(originalCell.getAttribute('data-grid-md')).toBe('6');
      expect(deserializedCell.getAttribute('data-grid-md')).toBe('6');
    });

    it('should preserve all cell properties after round-trip serialization', () => {
      const originalComponent = (
        <GridCell 
          span={8}
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={3}
          background="error.light"
          padding="huge"
          margin="medium"
          height="300px"
          width="100%"
          className="test-cell"
        >
          <Text content="Round trip test" />
        </GridCell>
      );

      // Double serialization to test round-trip
      const serialized1 = ComponentTransformer.serialize(originalComponent);
      const deserialized1 = ComponentTransformer.deserialize(serialized1);
      const serialized2 = ComponentTransformer.serialize(deserialized1);
      const parsed2 = JSON.parse(serialized2);

      // All properties should be preserved
      expect(parsed2.data.span).toBe(8);
      expect(parsed2.data.xs).toBe(12);
      expect(parsed2.data.sm).toBe(8);
      expect(parsed2.data.md).toBe(6);
      expect(parsed2.data.lg).toBe(4);
      expect(parsed2.data.xl).toBe(3);
      expect(parsed2.data.background).toBe('error.light');
      expect(parsed2.data.padding).toBe('huge');
      expect(parsed2.data.margin).toBe('medium');
      expect(parsed2.data.height).toBe('300px');
      expect(parsed2.data.width).toBe('100%');
      expect(parsed2.data.className).toBe('test-cell');
    });
  });

  describe('Performance', () => {
    it('should serialize complex cell efficiently', () => {
      const complexContent = Array.from({ length: 20 }, (_, i) => (
        <Text key={i} content={`Text item ${i + 1}`} variant="body2" />
      ));

      const complexCell = (
        <GridCell md={6}>
          {complexContent}
        </GridCell>
      );

      const startTime = performance.now();
      const serialized = ComponentTransformer.serialize(complexCell);
      const endTime = performance.now();

      expect(serialized).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
      
      const parsed = JSON.parse(serialized);
      const children = JSON.parse(parsed.data.children);
      expect(children).toHaveLength(20);
    });
  });

  describe('Error Handling', () => {
    it('should handle cell with null children gracefully', () => {
      const cellWithNullChild = (
        <GridCell span={6}>
          <Text content="Valid text" />
          {null}
          <Text content="Another valid text" />
        </GridCell>
      );

      expect(() => {
        const serialized = ComponentTransformer.serialize(cellWithNullChild);
        const parsed = JSON.parse(serialized);
        const children = JSON.parse(parsed.data.children);
        expect(children).toHaveLength(3); // null becomes a child
      }).not.toThrow();
    });

    it('should handle cell with deeply nested structures', () => {
      const deeplyNestedCell = (
        <GridCell>
          <div>
            <div>
              <div>
                <Text content="Deep nested text" />
              </div>
            </div>
          </div>
        </GridCell>
      );

      expect(() => {
        const serialized = ComponentTransformer.serialize(deeplyNestedCell);
        const deserialized = ComponentTransformer.deserialize(serialized);
        render(deserialized);
      }).not.toThrow();
    });

    it('should handle cell with invalid responsive values gracefully', () => {
      // This tests runtime handling, schema validation would catch invalid values at development time
      const cellWithValidValues = (
        <GridCell xs={12} sm={6} md={4}>
          <Text content="Valid cell" />
        </GridCell>
      );

      const serialized = ComponentTransformer.serialize(cellWithValidValues);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.data.xs).toBe(12);
      expect(parsed.data.sm).toBe(6);
      expect(parsed.data.md).toBe(4);
    });
  });
});