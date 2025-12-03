/**
 * Round-trip Component Serialization Tests
 * 
 * Comprehensive tests for Container, Text, and Code components 
 * to verify complete serialization/deserialization integrity.
 * These are the components migrated to the new schema-driven architecture.
 */

import React from 'react';
import { Container } from '../../../components/base/Container';
import { Text } from '../../../components/blocks/Text';
import { Code } from '../../../components/blocks/Code';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import '../../../schemas/transformers/registry'; // Ensure components are registered

describe('Round-trip Component Serialization', () => {
  
  describe('Container Component', () => {
    it('should perform perfect round-trip with basic props', () => {
      const original = (
        <Container 
          span={6} 
          padding="medium" 
          background="primary.main"
          className="test-container"
        >
          Simple container content
        </Container>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify structure integrity
      const parsed = JSON.parse(firstSerialization);
      expect(parsed.tagName).toBe('Container');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.span).toBe(6);
      expect(parsed.data.padding).toBe('medium');
      expect(parsed.data.background).toBe('primary.main');
      expect(parsed.data.className).toBe('test-container');
      expect(parsed.data.children).toBe('Simple container content');
    });

    it('should perform perfect round-trip with event handlers', () => {
      const original = (
        <Container
          span={8}
          padding="large"
          onClick={() => { console.log("Container clicked"); }}
          onMouseEnter={() => { console.log("Mouse entered"); }}
        >
          Interactive container
        </Container>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify event handlers are preserved as strings
      const parsed = JSON.parse(firstSerialization);
      expect(typeof parsed.data.onClick).toBe('string');
      expect(parsed.data.onClick).toContain('console.log("Container clicked")');
      expect(typeof parsed.data.onMouseEnter).toBe('string');
      expect(parsed.data.onMouseEnter).toContain('console.log("Mouse entered")');
    });

    it('should perform perfect round-trip with nested components', () => {
      const original = (
        <Container span={12} padding="large" background="secondary.main">
          <Container span={6} padding="small">
            <Text variant="h6">Nested text</Text>
          </Container>
          <Text variant="body1">Sibling text</Text>
        </Container>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify nested structure
      const parsed = JSON.parse(firstSerialization);
      expect(Array.isArray(parsed.data.children)).toBe(true);
      expect(parsed.data.children).toHaveLength(2);
      
      // First child is nested Container
      const firstChild = parsed.data.children[0];
      expect(firstChild.tagName).toBe('Container');
      expect(firstChild.data.span).toBe(6);
      expect(firstChild.data.children.tagName).toBe('Text');
      expect(firstChild.data.children.data.variant).toBe('h6');
      expect(firstChild.data.children.data.content).toBe('Nested text');
      
      // Second child is Text
      const secondChild = parsed.data.children[1];
      expect(secondChild.tagName).toBe('Text');
      expect(secondChild.data.variant).toBe('body1');
      expect(secondChild.data.content).toBe('Sibling text');
    });
  });

  describe('Text Component', () => {
    it('should perform perfect round-trip with basic props', () => {
      const original = (
        <Text 
          variant="h4" 
          color="primary"
          textAlign="center"
          className="test-text"
        >
          Sample text content
        </Text>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify structure integrity
      const parsed = JSON.parse(firstSerialization);
      expect(parsed.tagName).toBe('Text');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.variant).toBe('h4');
      expect(parsed.data.color).toBe('primary');
      expect(parsed.data.textAlign).toBe('center');
      expect(parsed.data.className).toBe('test-text');
      expect(parsed.data.content).toBe('Sample text content');
    });

    it('should perform perfect round-trip with MUI sx props', () => {
      const original = (
        <Text 
          variant="body1"
          sx={{ fontWeight: 'bold', marginTop: 2 }}
        >
          Styled text
        </Text>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify sx prop is preserved
      const parsed = JSON.parse(firstSerialization);
      expect(parsed.data.sx).toEqual({ fontWeight: 'bold', marginTop: 2 });
    });

    it('should perform perfect round-trip with event handlers', () => {
      const original = (
        <Text
          variant="button"
          onClick={() => { alert("Text clicked"); }}
          style={{ cursor: 'pointer' }}
        >
          Clickable text
        </Text>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify event handler and style preservation
      const parsed = JSON.parse(firstSerialization);
      expect(typeof parsed.data.onClick).toBe('string');
      expect(parsed.data.onClick).toContain('alert("Text clicked")');
      expect(parsed.data.style).toEqual({ cursor: 'pointer' });
    });
  });

  describe('Code Component', () => {
    it('should perform perfect round-trip with basic props', () => {
      const original = (
        <Code 
          language="javascript"
          title="Sample Code"
          showLineNumbers={true}
          showCopy={true}
        >
          const message = "Hello World";
          console.log(message);
        </Code>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify structure integrity
      const parsed = JSON.parse(firstSerialization);
      expect(parsed.tagName).toBe('Code');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.language).toBe('javascript');
      expect(parsed.data.title).toBe('Sample Code');
      expect(parsed.data.showLineNumbers).toBe(true);
      expect(parsed.data.showCopy).toBe(true);
      expect(parsed.data.content).toContain('const message = "Hello World"');
    });

    it('should perform perfect round-trip with theme and styling', () => {
      const original = (
        <Code 
          language="typescript"
          wrapLines={true}
          codeBackground="dark"
          className="custom-code"
          style={{ borderRadius: '8px' }}
        >
          {`interface User {
  name: string;
  email: string;
}`}
        </Code>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify all props are preserved
      const parsed = JSON.parse(firstSerialization);
      expect(parsed.data.language).toBe('typescript');
      expect(parsed.data.wrapLines).toBe(true);
      expect(parsed.data.codeBackground).toBe('dark');
      expect(parsed.data.className).toBe('custom-code');
      expect(parsed.data.style).toEqual({ borderRadius: '8px' });
      expect(parsed.data.content).toContain('interface User');
    });
  });

  describe('Complex Mixed Component Trees', () => {
    it('should perform perfect round-trip with deeply nested mixed components', () => {
      const original = (
        <Container span={12} padding="large" background="background.paper">
          <Text variant="h3" textAlign="center" marginBottom="large">
            Documentation Section
          </Text>
          
          <Container span={8} padding="medium">
            <Text variant="h5" color="primary">
              Code Example:
            </Text>
            
            <Code 
              language="jsx" 
              title="React Component Example"
              showLineNumbers={true}
            >
  {`function MyComponent() {
  return (
    <Container span={6}>
      <Text variant="body1">Hello World</Text>
    </Container>
  );
}`}
            </Code>
            
            <Text variant="body2" color="textSecondary" marginTop="medium">
              This example shows a basic React component structure.
            </Text>
          </Container>
          
          <Container span={4} padding="small" background="grey.100">
            <Text variant="h6">Sidebar Content</Text>
            <Text variant="body2">Additional information here.</Text>
          </Container>
        </Container>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify complex structure integrity
      const parsed = JSON.parse(firstSerialization);
      expect(parsed.tagName).toBe('Container');
      expect(Array.isArray(parsed.data.children)).toBe(true);
      expect(parsed.data.children).toHaveLength(3);
      
      // Verify first child (Text heading)
      const heading = parsed.data.children[0];
      expect(heading.tagName).toBe('Text');
      expect(heading.data.variant).toBe('h3');
      expect(heading.data.content).toBe('Documentation Section');
      
      // Verify second child (Container with nested components)
      const mainContent = parsed.data.children[1];
      expect(mainContent.tagName).toBe('Container');
      expect(mainContent.data.span).toBe(8);
      expect(Array.isArray(mainContent.data.children)).toBe(true);
      expect(mainContent.data.children).toHaveLength(3);
      
      // Verify nested Code component
      const codeComponent = mainContent.data.children[1];
      expect(codeComponent.tagName).toBe('Code');
      expect(codeComponent.data.language).toBe('jsx');
      expect(codeComponent.data.title).toBe('React Component Example');
      expect(codeComponent.data.showLineNumbers).toBe(true);
      expect(codeComponent.data.content).toContain('function MyComponent()');
      
      // Verify third child (Sidebar Container)
      const sidebar = parsed.data.children[2];
      expect(sidebar.tagName).toBe('Container');
      expect(sidebar.data.span).toBe(4);
      expect(sidebar.data.background).toBe('grey.100');
    });
  });

  describe('Data Integrity Verification', () => {
    it('should preserve all ViewSchema properties across serialization', () => {
      const original = (
        <Container
          // Grid props
          span={10}
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={3}
          
          // Dimension props
          width="large"
          height="medium"
          minWidth="small"
          maxHeight="huge"
          
          // Spacing props
          padding="large"
          margin="medium"
          paddingTop="small"
          marginBottom="tiny"
          
          // Background props
          background="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          backgroundGradient="radial-gradient(circle, #667eea 0%, #764ba2 100%)"
          
          // Style props
          className="comprehensive-test"
          textAlign="center"
          sx={{ borderRadius: 2, boxShadow: 3 }}
          style={{ border: '1px solid #ccc' }}
          
          // HTML attributes
          id="test-container"
          role="main"
          aria-label="Comprehensive test container"
          data-testid="round-trip-test"

          // Event handlers
          onClick={() => console.log('clicked')}
          onMouseEnter={() => console.log('mouse enter')}
          onFocus={() => console.log('focused')}
        >
          Comprehensive test content
        </Container>
      );

      // Round-trip test
      const firstSerialization = ComponentTransformer.serialize(original);
      const deserialized = ComponentTransformer.deserialize(firstSerialization);
      const secondSerialization = ComponentTransformer.serialize(deserialized);

      // Verify identical serializations
      expect(firstSerialization).toBe(secondSerialization);
      
      // Verify all properties are preserved
      const parsed = JSON.parse(firstSerialization);
      const data = parsed.data;
      
      // Grid props
      expect(data.span).toBe(10);
      expect(data.xs).toBe(12);
      expect(data.sm).toBe(8);
      expect(data.md).toBe(6);
      expect(data.lg).toBe(4);
      expect(data.xl).toBe(3);
      
      // Dimension props
      expect(data.width).toBe('large');
      expect(data.height).toBe('medium');
      expect(data.minWidth).toBe('small');
      expect(data.maxHeight).toBe('huge');
      
      // Spacing props
      expect(data.padding).toBe('large');
      expect(data.margin).toBe('medium');
      expect(data.paddingTop).toBe('small');
      expect(data.marginBottom).toBe('tiny');
      
      // Background props
      expect(data.background).toContain('linear-gradient');
      expect(data.backgroundGradient).toContain('radial-gradient');
      
      // Style props
      expect(data.className).toBe('comprehensive-test');
      expect(data.textAlign).toBe('center');
      expect(data.sx).toEqual({ borderRadius: 2, boxShadow: 3 });
      expect(data.style).toEqual({ border: '1px solid #ccc' });
      
      // HTML attributes
      expect(data.id).toBe('test-container');
      expect(data.role).toBe('main');
      expect(data['aria-label']).toBe('Comprehensive test container');
      expect(data['data-testid']).toBe('round-trip-test');
      
      // Event handlers (as strings)
      expect(typeof data.onClick).toBe('string');
      expect(data.onClick).toContain('console.log(\'clicked\')');
      expect(typeof data.onMouseEnter).toBe('string');
      expect(data.onMouseEnter).toContain('console.log(\'mouse enter\')');
      expect(typeof data.onFocus).toBe('string');
      expect(data.onFocus).toContain('console.log(\'focused\')');
      
      // Content
      expect(data.children).toBe('Comprehensive test content');
    });
  });
});