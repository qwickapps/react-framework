/**
 * Container Component Tests
 * 
 * Comprehensive unit tests for the new Container component
 * covering all functionality including props conversion, rendering,
 * serialization, and error handling.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, PaletteProvider } from '../../../contexts';
import { Container, type ContainerProps } from '../../../components/base/Container';
import { useBaseProps } from '../../../hooks/useBaseProps';
import { resolveDimensions } from '../../../utils/dimensions';
import { resolveSpacingProps } from '../../../utils/spacing';

// Mock the utility functions
jest.mock('../../../utils/dimensions', () => ({
  resolveDimensions: jest.fn()
}));

jest.mock('../../../utils/spacing', () => ({
  resolveSpacingProps: jest.fn()
}));

jest.mock('../../../hooks/useBaseProps', () => ({
  useBaseProps: jest.fn(),
  QWICKAPP_COMPONENT: Symbol('QwickAppComponent')
}));

const mockResolveDimensions = resolveDimensions as jest.MockedFunction<typeof resolveDimensions>;
const mockResolveSpacingProps = resolveSpacingProps as jest.MockedFunction<typeof resolveSpacingProps>;
const mockUseBaseProps = useBaseProps as jest.MockedFunction<typeof useBaseProps>;

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <PaletteProvider>
      {children}
    </PaletteProvider>
  </ThemeProvider>
);

describe('Container', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Default mock implementations
    mockResolveDimensions.mockReturnValue({
      width: undefined,
      height: undefined,
      minWidth: undefined,
      minHeight: undefined,
      maxWidth: undefined,
      maxHeight: undefined
    });
    
    mockResolveSpacingProps.mockReturnValue({});
    
    mockUseBaseProps.mockReturnValue({
      gridProps: null,
      styleProps: {
        className: undefined,
        sx: {},
        style: undefined
      },
      htmlProps: {},
      restProps: {}
    });
  });

  describe('Basic Rendering', () => {
    it('renders without props', () => {
      render(
        <TestWrapper>
          <Container />
        </TestWrapper>
      );

      expect(document.querySelector('div')).toBeInTheDocument();
      expect(mockUseBaseProps).toHaveBeenCalledWith({});
    });

    it('renders children correctly', () => {
      render(
        <TestWrapper>
          <Container>
            <span>Test Content</span>
          </Container>
        </TestWrapper>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
      render(
        <TestWrapper>
          <Container>
            <h1>Title</h1>
            <p>Paragraph</p>
            <span>Span</span>
          </Container>
        </TestWrapper>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Span')).toBeInTheDocument();
    });
  });

  describe('Grid Props Conversion', () => {
    it('converts span prop from string to proper type', () => {
      render(
        <TestWrapper>
          <Container span="6" />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        span: 6
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles span "auto" value', () => {
      render(
        <TestWrapper>
          <Container span="auto" />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        span: 'auto'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles span "grow" value', () => {
      render(
        <TestWrapper>
          <Container span="grow" />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        span: 'grow'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('converts all breakpoint props correctly', () => {
      render(
        <TestWrapper>
          <Container
            xs="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
        xl: 2
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles invalid grid values by returning undefined', () => {
      render(
        <TestWrapper>
          <Container
            span="invalid"
            xs="not-a-number"
          />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        span: undefined,
        xs: undefined
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });
  });

  describe('Dimension Props', () => {
    it('passes dimension props through correctly', () => {
      render(
        <TestWrapper>
          <Container
            width="medium"
            height="200px"
            minWidth="100px"
            minHeight="50px"
            maxWidth="large"
            maxHeight="80vh"
          />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        width: 'medium',
        height: '200px',
        minWidth: '100px',
        minHeight: '50px',
        maxWidth: 'large',
        maxHeight: '80vh'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles undefined dimension props', () => {
      render(
        <TestWrapper>
          <Container />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.width).toBeUndefined();
      expect(call.height).toBeUndefined();
    });
  });

  describe('Spacing Props', () => {
    it('passes all spacing props correctly', () => {
      render(
        <TestWrapper>
          <Container
            padding="medium"
            paddingTop="small"
            paddingRight="large"
            paddingBottom="tiny"
            paddingLeft="huge"
            paddingX="medium"
            paddingY="small"
            margin="large"
            marginTop="medium"
            marginRight="small"
            marginBottom="large"
            marginLeft="tiny"
            marginX="medium"
            marginY="large"
          />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        padding: 'medium',
        paddingTop: 'small',
        paddingRight: 'large',
        paddingBottom: 'tiny',
        paddingLeft: 'huge',
        paddingX: 'medium',
        paddingY: 'small',
        margin: 'large',
        marginTop: 'medium',
        marginRight: 'small',
        marginBottom: 'large',
        marginLeft: 'tiny',
        marginX: 'medium',
        marginY: 'large'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });
  });

  describe('Background Props', () => {
    it('passes background props correctly', () => {
      render(
        <TestWrapper>
          <Container
            background="#ffffff"
            backgroundImage="/test-image.jpg"
            backgroundGradient="linear-gradient(45deg, red, blue)"
          />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        background: '#ffffff',
        backgroundImage: '/test-image.jpg',
        backgroundGradient: 'linear-gradient(45deg, red, blue)'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });
  });

  describe('Style Props', () => {
    it('passes className through directly', () => {
      render(
        <TestWrapper>
          <Container className="test-class" />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        className: 'test-class'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('parses valid JSON sx prop', () => {
      render(
        <TestWrapper>
          <Container sx='{"color": "primary.main", "fontWeight": "bold"}' />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        sx: { color: 'primary.main', fontWeight: 'bold' }
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles invalid JSON sx prop gracefully', () => {
      render(
        <TestWrapper>
          <Container sx='invalid-json' />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        sx: undefined
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('parses valid JSON style prop', () => {
      render(
        <TestWrapper>
          <Container style='{"margin": "10px", "color": "red"}' />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        style: { margin: '10px', color: 'red' }
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles non-string style props', () => {
      const styleObj = { margin: '5px' };
      render(
        <TestWrapper>
          <Container style={styleObj as React.CSSProperties} />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        style: styleObj
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });
  });

  describe('HTML Attributes', () => {
    it('passes HTML attributes correctly', () => {
      render(
        <TestWrapper>
          <Container
            id="test-id"
            role="button"
            aria-label="Test Label"
            aria-labelledby="label-id"
            aria-describedby="desc-id"
            data-testid="test-element"
          />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        id: 'test-id',
        role: 'button',
        'aria-label': 'Test Label',
        'aria-labelledby': 'label-id',
        'aria-describedby': 'desc-id',
        'data-testid': 'test-element'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });
  });

  describe('Event Handler Conversion', () => {
    beforeEach(() => {
      // Mock console methods to avoid noise in test output
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('converts valid function string to executable function', () => {
      const mockFunc = jest.fn();
      global.testHandler = mockFunc;

      render(
        <TestWrapper>
          <Container onClick="testHandler(event)" />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(typeof call.onClick).toBe('function');
      
      // Test the converted function
      if (call.onClick) {
        call.onClick({ type: 'click' });
      }
    });

    it('converts function declaration string', () => {
      render(
        <TestWrapper>
          <Container onClick="function handleClick(event) { console.log(event); }" />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(typeof call.onClick).toBe('function');
    });

    it('handles invalid event handler string gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <TestWrapper>
          <Container onClick="invalid syntax {" />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.onClick).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid event handler string for onClick:'),
        'invalid syntax {',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it('converts all event handler types', () => {
      render(
        <TestWrapper>
          <Container
            onClick="console.log('click')"
            onMouseEnter="console.log('enter')"
            onMouseLeave="console.log('leave')"
            onFocus="console.log('focus')"
            onBlur="console.log('blur')"
          />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(typeof call.onClick).toBe('function');
      expect(typeof call.onMouseEnter).toBe('function');
      expect(typeof call.onMouseLeave).toBe('function');
      expect(typeof call.onFocus).toBe('function');
      expect(typeof call.onBlur).toBe('function');
    });

    it('handles undefined event handlers', () => {
      render(
        <TestWrapper>
          <Container />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.onClick).toBeUndefined();
      expect(call.onMouseEnter).toBeUndefined();
    });

    it('handles non-string event handlers', () => {
      const clickHandler = jest.fn();
      render(
        <TestWrapper>
          <Container onClick={clickHandler as React.MouseEventHandler} />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.onClick).toBe(clickHandler);
    });
  });

  describe('useBaseProps Integration', () => {
    it('applies processed props to rendered Box component', () => {
      const mockGridProps = { span: 6, xs: 12 };
      const mockStyleProps = { 
        className: 'processed-class',
        sx: { color: 'blue' },
        style: { margin: '10px' }
      };
      const mockHtmlProps = { id: 'processed-id' };
      const mockRestProps = { customProp: 'value' };

      mockUseBaseProps.mockReturnValue({
        gridProps: mockGridProps,
        styleProps: mockStyleProps,
        htmlProps: mockHtmlProps,
        restProps: mockRestProps
      });

      const { container } = render(
        <TestWrapper>
          <Container id="test-id" />
        </TestWrapper>
      );

      const boxElement = container.querySelector('div');
      expect(boxElement).toHaveAttribute('id', 'processed-id');
      expect(boxElement).toHaveAttribute('data-grid', JSON.stringify(mockGridProps));
    });

    it('handles null gridProps correctly', () => {
      mockUseBaseProps.mockReturnValue({
        gridProps: null,
        styleProps: { className: undefined, sx: {}, style: undefined },
        htmlProps: {},
        restProps: {}
      });

      const { container } = render(
        <TestWrapper>
          <Container />
        </TestWrapper>
      );

      const boxElement = container.querySelector('div');
      expect(boxElement).not.toHaveAttribute('data-grid');
    });
  });

  describe('Data Binding', () => {
    it('renders normally when dataSource is provided', () => {
      render(
        <TestWrapper>
          <Container dataSource="test.data">
            <span>Content</span>
          </Container>
        </TestWrapper>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles bindingOptions prop', () => {
      render(
        <TestWrapper>
          <Container 
            dataSource="test.data"
            bindingOptions={{ cache: true }}
          >
            <span>Content</span>
          </Container>
        </TestWrapper>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Serialization', () => {
    describe('toJson method', () => {
      it('serializes basic props correctly', () => {
        const props: ContainerProps = {
          span: '6',
          className: 'test-class',
          id: 'test-id',
          children: 'Test content'
        };

        const result = Container.toJson(props);

        expect(result).toEqual({
          tagName: 'Container',
          version: '1.0.0',
          data: {
            span: '6',
            className: 'test-class',
            id: 'test-id',
            children: 'Test content'
          }
        });
      });

      it('handles all prop types in serialization', () => {
        const props: ContainerProps = {
          span: '12',
          xs: '6',
          width: 'medium',
          padding: 'large',
          background: '#ffffff',
          className: 'complex-component',
          sx: '{"color": "red"}',
          id: 'complex-id',
          role: 'button',
          'aria-label': 'Complex button',
          onClick: 'handleClick(event)',
          dataSource: 'api.data',
          bindingOptions: { cache: true },
          children: 'Complex content'
        };

        const result = Container.toJson(props);

        expect(result.data).toMatchObject({
          span: '12',
          xs: '6',
          width: 'medium',
          padding: 'large',
          background: '#ffffff',
          className: 'complex-component',
          sx: '{"color": "red"}',
          id: 'complex-id',
          role: 'button',
          'aria-label': 'Complex button',
          onClick: 'handleClick(event)',
          dataSource: 'api.data',
          bindingOptions: { cache: true },
          children: 'Complex content'
        });
      });

      it('includes React element children in serialization', () => {
        const props: ContainerProps = {
          children: <div>React element</div>
        };

        const result = Container.toJson(props);

        expect(result.data.children).toBeDefined();
      });

      it('handles undefined children', () => {
        const props: ContainerProps = {};

        const result = Container.toJson(props);

        expect(result.data.children).toBeUndefined();
      });
    });

    describe('fromJson method', () => {
      it('creates component from JSON data', () => {
        const jsonData = {
          tagName: 'Container',
          version: '1.0.0',
          data: {
            span: '6',
            className: 'test-class',
            id: 'test-id',
            children: 'Test content'
          }
        };

        const element = Container.fromJson(jsonData);

        expect(React.isValidElement(element)).toBe(true);
        expect(element.type).toBe(Container);
        expect(element.props).toEqual(jsonData.data);
      });

      it('handles empty JSON data', () => {
        const jsonData = {
          tagName: 'Container',
          version: '1.0.0',
          data: {}
        };
        const element = Container.fromJson(jsonData);

        expect(React.isValidElement(element)).toBe(true);
        expect(element.type).toBe(Container);
      });
    });

    describe('static properties', () => {
      it('has correct static properties', () => {
        expect(Container.tagName).toBe('Container');
        expect(Container.version).toBe('1.0.0');
        expect(typeof Container.fromJson).toBe('function');
        expect(typeof Container.toJson).toBe('function');
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles extremely long prop values', () => {
      const longValue = 'a'.repeat(10000);
      
      render(
        <TestWrapper>
          <Container className={longValue} />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        className: longValue
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles special characters in props', () => {
      render(
        <TestWrapper>
          <Container
            className="class-with-special-chars-@#$%"
            id="id-with-spaces and symbols !@#"
            aria-label={'Label with quotes \'single\' and "double"'}
          />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.className).toBe('class-with-special-chars-@#$%');
      expect(call.id).toBe('id-with-spaces and symbols !@#');
      expect(call['aria-label']).toBe('Label with quotes \'single\' and "double"');
    });

    it('handles deeply nested JSON in props', () => {
      const complexJson = JSON.stringify({
        nested: {
          deep: {
            object: {
              array: [1, 2, { inner: 'value' }]
            }
          }
        }
      });

      render(
        <TestWrapper>
          <Container sx={complexJson} />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.sx).toEqual({
        nested: {
          deep: {
            object: {
              array: [1, 2, { inner: 'value' }]
            }
          }
        }
      });
    });

    it('handles malformed JSON gracefully', () => {
      render(
        <TestWrapper>
          <Container
            sx='{malformed: json, missing quotes}'
            style='{"incomplete": }'
          />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.sx).toBeUndefined();
      expect(call.style).toBeUndefined();
    });

    it('handles null and undefined prop values', () => {
      render(
        <TestWrapper>
          <Container
            className={undefined}
            id={null as unknown as string}
            span=""
          />
        </TestWrapper>
      );

      const call = mockUseBaseProps.mock.calls[0][0];
      expect(call.className).toBeUndefined();
      expect(call.id).toBeNull();
      expect(call.span).toBeUndefined(); // Empty string converts to undefined
    });
  });

  describe('Component Performance', () => {
    it('memoizes converted props correctly', () => {
      const { rerender } = render(
        <TestWrapper>
          <Container span="6" />
        </TestWrapper>
      );

      expect(mockUseBaseProps).toHaveBeenCalledTimes(1);

      // Rerender with same props
      rerender(
        <TestWrapper>
          <Container span="6" />
        </TestWrapper>
      );

      // Should be called again (React component re-render)
      expect(mockUseBaseProps).toHaveBeenCalledTimes(2);
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(
        <TestWrapper>
          <Container span="6" />
        </TestWrapper>
      );

      for (let i = 1; i <= 10; i++) {
        rerender(
          <TestWrapper>
            <Container span={i.toString()} />
          </TestWrapper>
        );
      }

      expect(mockUseBaseProps).toHaveBeenCalledTimes(11); // Initial + 10 updates
    });
  });

  describe('Text Alignment', () => {
    it('passes textAlign prop correctly', () => {
      render(
        <TestWrapper>
          <Container textAlign="center" />
        </TestWrapper>
      );

      const expectedProps = expect.objectContaining({
        textAlign: 'center'
      });
      expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
    });

    it('handles all textAlign values', () => {
      const alignments = ['left', 'center', 'right', 'justify'] as const;

      alignments.forEach(alignment => {
        mockUseBaseProps.mockClear();
        
        render(
          <TestWrapper>
            <Container textAlign={alignment} />
          </TestWrapper>
        );

        const expectedProps = expect.objectContaining({
          textAlign: alignment
        });
        expect(mockUseBaseProps).toHaveBeenCalledWith(expectedProps);
      });
    });
  });

  describe('Serialization with Event Handlers', () => {
    it('should serialize Container with onClick handler without circular reference error', async () => {
      // Import ComponentTransformer and registry for testing
      const { ComponentTransformer } = await import('../../../schemas/transformers/ComponentTransformer');
      // Ensure components are registered
      await import('../../../schemas/transformers/registry');

      // Create a Container with onClick handler
      const containerWithHandler = (
        <Container
          span={12}
          padding="large"
          background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          onClick={() => { console.log("Container clicked!"); }}
          role="button"
          aria-label="Clickable container"
        >
          Test content
        </Container>
      );

      // This should NOT throw "Converting circular structure to JSON"
      expect(() => {
        const serializedData = ComponentTransformer.serialize(containerWithHandler);
        const parsedData = JSON.parse(serializedData);
        
        // Verify the onClick handler was converted to a string
        expect(typeof parsedData.data.onClick).toBe('string');
        expect(parsedData.data.onClick).toContain('console.log');
        
        // Verify other props are preserved
        expect(parsedData.tagName).toBe('Container');
        expect(parsedData.data.span).toBe(12);
        expect(parsedData.data.padding).toBe('large');
        expect(parsedData.data.background).toContain('linear-gradient');
        
      }).not.toThrow();
    });

    it('should handle multiple event handlers in serialization', async () => {
      // Import ComponentTransformer and registry for testing
      const { ComponentTransformer } = await import('../../../schemas/transformers/ComponentTransformer');
      // Ensure components are registered
      await import('../../../schemas/transformers/registry');
      
      const containerWithMultipleHandlers = (
        <Container
          onClick={() => { console.log("clicked"); }}
          onMouseEnter={() => { console.log("mouse enter"); }}
          onMouseLeave={() => { console.log("mouse leave"); }}
          onFocus={() => { console.log("focused"); }}
          onBlur={() => { console.log("blurred"); }}
        >
          Multi-handler container
        </Container>
      );

      expect(() => {
        const serializedData = ComponentTransformer.serialize(containerWithMultipleHandlers);
        const parsedData = JSON.parse(serializedData);
        
        // All handlers should be converted to strings
        expect(typeof parsedData.data.onClick).toBe('string');
        expect(typeof parsedData.data.onMouseEnter).toBe('string');
        expect(typeof parsedData.data.onMouseLeave).toBe('string');
        expect(typeof parsedData.data.onFocus).toBe('string');
        expect(typeof parsedData.data.onBlur).toBe('string');
        
      }).not.toThrow();
    });

    it('should round-trip serialize and deserialize Container with event handlers', async () => {
      const { ComponentTransformer } = await import('../../../schemas/transformers/ComponentTransformer');
      // Ensure components are registered
      await import('../../../schemas/transformers/registry');
      
      const originalContainer = (
        <Container
          span={6}
          padding="medium"
          onClick={() => { console.log("original handler"); }}
        >
          Round-trip test
        </Container>
      );

      // Serialize and deserialize
      const serializedData = ComponentTransformer.serialize(originalContainer);
      const deserializedContainer = ComponentTransformer.deserialize(serializedData);
      
      // Should not throw and should return a valid React element
      expect(deserializedContainer).toBeDefined();
      expect(React.isValidElement(deserializedContainer)).toBe(true);
    });
  });
});