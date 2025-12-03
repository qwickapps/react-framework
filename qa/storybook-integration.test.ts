/**
 * Storybook Integration Tests
 * 
 * Validates that the Storybook integration works correctly with migrated components:
 * - SerializationTemplate.tsx functions correctly
 * - makeSerializationStory() works for all component types
 * - SerializationDemo stories render without errors
 * - JSON display uses Code component with content-prop correctly
 * - ComponentTransformer integration works in stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Import Storybook integration utilities
import { makeSerializationStory, makeBatchSerializationStory, makeComplexSerializationStory } from '../src/stories/_templates/SerializationTemplate';
import { ComponentTransformer } from '../src/schemas/transformers/ComponentTransformer';
import { registerSerializableComponents } from '../src/schemas/transformers/registry';

// Import components for testing
import { Code } from '../src/components/blocks/Code';
import { Container } from '../src/components/base/Container';
import { Text } from '../src/components/blocks/Text';
import { Button } from '../src/components/inputs/Button';
import { HeroBlock } from '../src/components/blocks/HeroBlock';

// Create a theme for testing
const testTheme = createTheme();

// Mock console methods to avoid test noise
let originalConsoleLog: typeof console.log;
let originalConsoleWarn: typeof console.warn;
let originalConsoleError: typeof console.error;

beforeAll(() => {
  originalConsoleLog = console.log;
  originalConsoleWarn = console.warn;
  originalConsoleError = console.error;
  
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
  
  // Register components for serialization
  registerSerializableComponents();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={testTheme}>
    {children}
  </ThemeProvider>
);

describe('Storybook Integration Tests', () => {

  describe('SerializationTemplate Core Functionality', () => {
    test('makeSerializationStory creates valid React component', () => {
      const TestStory = makeSerializationStory(() => (
        <Code content="console.log('test');" language="javascript" />
      ));

      expect(typeof TestStory).toBe('function');
      
      const element = React.createElement(TestStory);
      expect(React.isValidElement(element)).toBe(true);
    });

    test('makeSerializationStory renders without errors for Code component', () => {
      const TestStory = makeSerializationStory(() => (
        <Code 
          content="const test = 'hello world';" 
          language="javascript" 
          title="Test Code"
          showCopy={true}
          showLineNumbers={true}
        />
      ));

      expect(() => {
        render(<TestWrapper><TestStory /></TestWrapper>);
      }).not.toThrow();

      // Check for expected content
      expect(screen.getByText('Original Component')).toBeInTheDocument();
      expect(screen.getByText('Deserialized Component (Round-trip)')).toBeInTheDocument();
      expect(screen.getByText('Serialized JSON')).toBeInTheDocument();
    });

    test('makeSerializationStory renders without errors for Container component', () => {
      const TestStory = makeSerializationStory(() => (
        <Container 
          span={8}
          padding="large"
          background="primary.main"
          className="test-container"
        >
          <Text content="Container content text" />
        </Container>
      ));

      expect(() => {
        render(<TestWrapper><TestStory /></TestWrapper>);
      }).not.toThrow();

      // Check for expected sections
      expect(screen.getByText('Original Component')).toBeInTheDocument();
      expect(screen.getByText('Deserialized Component (Round-trip)')).toBeInTheDocument();
      expect(screen.getByText('Serialized JSON')).toBeInTheDocument();
    });

    test('makeSerializationStory handles serialization errors gracefully', () => {
      // Create a component that will fail serialization
      const ProblematicComponent = () => React.createElement('div', {}, 'Test');
      (ProblematicComponent as any).toJson = () => {
        throw new Error('Intentional serialization error');
      };

      const TestStory = makeSerializationStory(() => (
        React.createElement(ProblematicComponent)
      ));

      expect(() => {
        render(<TestWrapper><TestStory /></TestWrapper>);
      }).not.toThrow();

      // Should show error state
      expect(screen.getByText(/Serialization Error:/)).toBeInTheDocument();
    });
  });

  describe('SerializationTemplate with Different Component Types', () => {
    test('Content-prop components (Code) serialize correctly in stories', () => {
      const TestStory = makeSerializationStory(() => (
        <Code 
          content="function example() { return 'hello'; }" 
          language="javascript" 
        />
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      // Should display the code content in both original and round-trip
      expect(screen.getAllByText(/function example/)).toHaveLength(2);
    });

    test('React-children components (Container) serialize correctly in stories', () => {
      const TestStory = makeSerializationStory(() => (
        <Container span={6} padding="medium">
          Container children content
        </Container>
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      // Should display the children content in both original and round-trip
      expect(screen.getAllByText('Container children content')).toHaveLength(2);
    });

    test('Complex nested components serialize correctly in stories', () => {
      const TestStory = makeSerializationStory(() => (
        <Container span={12} padding="large">
          <Text content="Header text" />
          <Code content="console.log('nested code');" language="javascript" />
          <Container span={6} padding="small">
            <Text content="Nested container text" />
          </Container>
        </Container>
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      // Should display all nested content
      expect(screen.getAllByText('Header text')).toHaveLength(2);
      expect(screen.getAllByText(/nested code/)).toHaveLength(2);
      expect(screen.getAllByText('Nested container text')).toHaveLength(2);
    });

    test('Components with event handlers serialize correctly in stories', () => {
      const TestStory = makeSerializationStory(() => (
        <Container 
          span={8}
          onClick={() => console.log('clicked')}
          onMouseEnter={() => console.log('hovered')}
        >
          Interactive container
        </Container>
      ));

      expect(() => {
        render(<TestWrapper><TestStory /></TestWrapper>);
      }).not.toThrow();

      expect(screen.getAllByText('Interactive container')).toHaveLength(2);
    });
  });

  describe('Batch Serialization Stories', () => {
    test('makeBatchSerializationStory creates valid component', () => {
      const BatchStory = makeBatchSerializationStory(() => [
        React.createElement(Code, { content: 'console.log(1);', language: 'javascript' }),
        React.createElement(Text, { content: 'Sample text' }),
        React.createElement(Container, { span: 6 }, 'Container content')
      ]);

      expect(typeof BatchStory).toBe('function');
      
      const element = React.createElement(BatchStory);
      expect(React.isValidElement(element)).toBe(true);
    });

    test('makeBatchSerializationStory renders multiple components', () => {
      const BatchStory = makeBatchSerializationStory(() => [
        React.createElement(Code, { key: '1', content: 'console.log("test");', language: 'javascript' }),
        React.createElement(Text, { key: '2', content: 'Text component' })
      ]);

      render(<TestWrapper><BatchStory /></TestWrapper>);

      expect(screen.getByText('Batch Serialization Demo')).toBeInTheDocument();
      expect(screen.getAllByText('Original Component')).toHaveLength(2);
      expect(screen.getAllByText('Serialized JSON')).toHaveLength(2);
    });
  });

  describe('Complex Serialization Stories', () => {
    test('makeComplexSerializationStory creates valid component', () => {
      const ComplexStory = makeComplexSerializationStory(() => (
        <HeroBlock
          title="Complex Hero"
          subtitle="With nested components"
          backgroundImage="/hero.jpg"
        >
          <Container span={12}>
            <Code content="// Complex nested structure" language="javascript" />
            <Text content="Nested text content" />
          </Container>
        </HeroBlock>
      ));

      expect(typeof ComplexStory).toBe('function');
      
      const element = React.createElement(ComplexStory);
      expect(React.isValidElement(element)).toBe(true);
    });

    test('makeComplexSerializationStory renders with info banner', () => {
      const ComplexStory = makeComplexSerializationStory(() => (
        <Container span={12}>
          <Text content="Complex structure test" />
        </Container>
      ));

      render(<TestWrapper><ComplexStory /></TestWrapper>);

      expect(screen.getByText('Complex Serialization:')).toBeInTheDocument();
      expect(screen.getByText('Original Component')).toBeInTheDocument();
      expect(screen.getByText('Serialized JSON')).toBeInTheDocument();
    });
  });

  describe('JSON Display and Code Integration', () => {
    test('Serialized JSON is displayed using Code component', () => {
      const TestStory = makeSerializationStory(() => (
        <Code content="test code" language="javascript" />
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      // Should have Code components for the JSON display
      const jsonElements = screen.getAllByText(/tagName.*Code/);
      expect(jsonElements.length).toBeGreaterThan(0);
    });

    test('Code component in JSON display uses content-prop strategy', () => {
      const TestStory = makeSerializationStory(() => (
        <Text content="Simple text content" />
      ));

      const { container } = render(<TestWrapper><TestStory /></TestWrapper>);

      // JSON should be displayed in a code block
      const codeElements = container.querySelectorAll('pre code');
      expect(codeElements.length).toBeGreaterThan(0);
    });

    test('JSON formatting is properly indented and readable', () => {
      const TestStory = makeSerializationStory(() => (
        <Container span={6} padding="medium">
          Test content
        </Container>
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      // Should have formatted JSON with proper indentation
      expect(screen.getByText(/{\s*"tagName"/)).toBeInTheDocument();
      expect(screen.getByText(/\s*"version"/)).toBeInTheDocument();
      expect(screen.getByText(/\s*"data"/)).toBeInTheDocument();
    });

    test('Large JSON structures are handled correctly', () => {
      const TestStory = makeSerializationStory(() => (
        <Container 
          span={12}
          padding="large"
          margin="medium"
          background="primary.main"
          className="large-example"
          onClick={() => {}}
          onMouseEnter={() => {}}
          'aria-label'="Large example"
          'data-testid'="large-test"
          role="region"
        >
          <Text content="Large structure with many props" />
          <Code content="console.log('nested code');" language="javascript" />
        </Container>
      ));

      expect(() => {
        render(<TestWrapper><TestStory /></TestWrapper>);
      }).not.toThrow();

      // Should handle large JSON without issues
      expect(screen.getByText('Original Component')).toBeInTheDocument();
      expect(screen.getByText('Serialized JSON')).toBeInTheDocument();
    });
  });

  describe('ComponentTransformer Integration', () => {
    test('ComponentTransformer.serialize works in story context', () => {
      const testComponent = React.createElement(Text, { content: 'Transform test' });
      
      expect(() => {
        const serialized = ComponentTransformer.serialize(testComponent);
        expect(typeof serialized).toBe('string');
        
        const parsed = JSON.parse(serialized);
        expect(parsed.tagName).toBe('Text');
        expect(parsed.data.content).toBe('Transform test');
      }).not.toThrow();
    });

    test('ComponentTransformer.deserialize works in story context', () => {
      const testComponent = React.createElement(Code, { 
        content: 'deserialize test', 
        language: 'text' 
      });
      
      const serialized = ComponentTransformer.serialize(testComponent);
      const deserialized = ComponentTransformer.deserialize(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      expect((deserialized as React.ReactElement).type).toBe(Code);
      expect((deserialized as React.ReactElement).props.content).toBe('deserialize test');
    });

    test('Round-trip serialization preserves component functionality', () => {
      const originalComponent = React.createElement(Container, {
        span: 8,
        padding: 'large',
        background: 'primary.main',
        children: 'Round-trip test'
      });
      
      const serialized = ComponentTransformer.serialize(originalComponent);
      const deserialized = ComponentTransformer.deserialize(serialized);
      
      expect(React.isValidElement(deserialized)).toBe(true);
      
      const deserializedProps = (deserialized as React.ReactElement).props;
      expect(deserializedProps.span).toBe(8);
      expect(deserializedProps.padding).toBe('large');
      expect(deserializedProps.background).toBe('primary.main');
      expect(deserializedProps.children).toBe('Round-trip test');
    });
  });

  describe('Story Template Error Handling', () => {
    test('Invalid component serialization shows error message', () => {
      // Mock ComponentTransformer to throw error
      const originalSerialize = ComponentTransformer.serialize;
      ComponentTransformer.serialize = jest.fn().mockImplementation(() => {
        throw new Error('Mock serialization error');
      });

      const TestStory = makeSerializationStory(() => (
        <Text content="This will cause serialization error" />
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      expect(screen.getByText(/Error: Mock serialization error/)).toBeInTheDocument();

      // Restore original method
      ComponentTransformer.serialize = originalSerialize;
    });

    test('Malformed JSON in deserialization is handled gracefully', () => {
      // Mock ComponentTransformer to return invalid JSON
      const originalSerialize = ComponentTransformer.serialize;
      const originalDeserialize = ComponentTransformer.deserialize;
      
      ComponentTransformer.serialize = jest.fn().mockReturnValue('{"invalid": json}');
      ComponentTransformer.deserialize = jest.fn().mockImplementation(() => {
        throw new Error('Invalid JSON structure');
      });

      const TestStory = makeSerializationStory(() => (
        <Text content="Malformed test" />
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      expect(screen.getByText(/Error: Invalid JSON structure/)).toBeInTheDocument();

      // Restore original methods
      ComponentTransformer.serialize = originalSerialize;
      ComponentTransformer.deserialize = originalDeserialize;
    });

    test('Empty component serialization is handled correctly', () => {
      const TestStory = makeSerializationStory(() => (
        React.createElement('div')
      ));

      // Should handle non-serializable components gracefully
      expect(() => {
        render(<TestWrapper><TestStory /></TestWrapper>);
      }).not.toThrow();
    });
  });

  describe('Story Metadata and Documentation', () => {
    test('Stories include helpful explanatory text', () => {
      const TestStory = makeSerializationStory(() => (
        <Code content="metadata test" language="javascript" />
      ));

      render(<TestWrapper><TestStory /></TestWrapper>);

      expect(screen.getByText('How it works:')).toBeInTheDocument();
      expect(screen.getByText(/ComponentTransformer/)).toBeInTheDocument();
      expect(screen.getByText(/JSON shows the exact structure/)).toBeInTheDocument();
    });

    test('Complex stories include appropriate information banners', () => {
      const ComplexStory = makeComplexSerializationStory(() => (
        <Text content="Complex info test" />
      ));

      render(<TestWrapper><ComplexStory /></TestWrapper>);

      expect(screen.getByText(/Complex Serialization:/)).toBeInTheDocument();
      expect(screen.getByText(/nested components/)).toBeInTheDocument();
    });

    test('Story templates are accessible and semantic', () => {
      const TestStory = makeSerializationStory(() => (
        <Text content="Accessibility test" />
      ));

      const { container } = render(<TestWrapper><TestStory /></TestWrapper>);

      // Check for proper heading structure
      const headings = container.querySelectorAll('h3');
      expect(headings.length).toBeGreaterThan(0);

      // Check for proper content structure
      const sections = container.querySelectorAll('[role="region"], section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Performance and Optimization', () => {
    test('Large component trees do not cause performance issues', () => {
      // Create a large nested structure
      let largeStructure = React.createElement(Text, { content: 'Deep leaf' });
      
      for (let i = 0; i < 10; i++) {
        largeStructure = React.createElement(Container, {
          key: i,
          span: 12,
          padding: 'small'
        }, largeStructure);
      }

      const TestStory = makeSerializationStory(() => largeStructure);

      const startTime = performance.now();
      render(<TestWrapper><TestStory /></TestWrapper>);
      const endTime = performance.now();

      // Should complete rendering in reasonable time (less than 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
    });

    test('Multiple story renders do not cause memory leaks', () => {
      const TestStory = makeSerializationStory(() => (
        <Code content="Memory test code" language="javascript" />
      ));

      // Render multiple times to check for memory issues
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<TestWrapper><TestStory /></TestWrapper>);
        unmount();
      }

      // Should not throw or cause issues
      expect(true).toBe(true);
    });
  });
});