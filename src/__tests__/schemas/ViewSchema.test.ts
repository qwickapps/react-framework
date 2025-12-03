/**
 * ViewSchema Tests - Comprehensive v2.0.0 Test Suite
 * 
 * Tests for ViewSchema functionality and validation covering all 40+ fields
 * including grid props, dimensions, spacing, backgrounds, styles, HTML attributes,
 * accessibility properties, and event handlers.
 */

import { ViewSchema } from '../../schemas/ViewSchema';

describe('ViewSchema v2.0.0', () => {
  
  // ========================================
  // BASIC SCHEMA TESTS
  // ========================================
  
  describe('Schema Metadata', () => {
    it('should create a valid ViewSchema instance', () => {
      const viewModel = new ViewSchema();
      expect(viewModel).toBeInstanceOf(ViewSchema);
    });

    it('should have correct schema metadata for v1.0.0', () => {
      const schema = ViewSchema.getSchema();
      expect(schema.name).toBe('ViewSchema');
      expect(schema.version).toBe('1.0.0');
    });

    it('should handle empty instance without errors', async () => {
      const data = {};
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ========================================
  // GRID LAYOUT PROPS TESTS
  // ========================================
  
  describe('Grid Layout Props', () => {
    const validSpanValues = ['auto', 'grow', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const validBreakpointValues = ['auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    describe('span property', () => {
      it('should accept all valid span values', async () => {
        for (const value of validSpanValues) {
          const data = { span: value };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(true);
          expect(result.errors).toHaveLength(0);
        }
      });

      it('should reject invalid span values', async () => {
        const invalidValues = ['13', '0', 'invalid', 'full', ''];
        for (const value of invalidValues) {
          const data = { span: value };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);
        }
      });
    });

    describe('breakpoint properties (xs, sm, md, lg, xl)', () => {
      const breakpointProps = ['xs', 'sm', 'md', 'lg', 'xl'];

      it('should accept all valid breakpoint values for all breakpoints', async () => {
        for (const prop of breakpointProps) {
          for (const value of validBreakpointValues) {
            const data = { [prop]: value };
            const result = await ViewSchema.validate(data);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
          }
        }
      });

      it('should reject invalid breakpoint values', async () => {
        const invalidValues = ['13', '0', 'grow', 'invalid', ''];
        for (const prop of breakpointProps) {
          for (const value of invalidValues) {
            const data = { [prop]: value };
            const result = await ViewSchema.validate(data);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
          }
        }
      });

      it('should allow all breakpoints to be set together', async () => {
        const data = {
          span: 'auto',
          xs: '12',
          sm: '6',
          md: '4',
          lg: '3',
          xl: '2'
        };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });
  });

  // ========================================
  // STYLING PROPS TESTS
  // ========================================
  
  describe('Styling Props', () => {
    it('should accept valid className', async () => {
      const data = { className: 'custom-class-name another-class' };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept valid sx prop as JSON string', async () => {
      const data = { sx: '{"color": "primary.main", "fontWeight": "bold"}' };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept valid style prop as JSON string', async () => {
      const data = { style: '{"color": "red", "margin": "10px", "fontSize": "14px"}' };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject non-string styling values', async () => {
      const invalidData = [
        { className: 123 },
        { sx: { color: 'red' } },
        { style: { margin: '10px' } }
      ];

      for (const data of invalidData) {
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should accept empty strings for styling props', async () => {
      const data = {
        className: '',
        sx: '',
        style: ''
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ========================================
  // DIMENSION PROPS TESTS
  // ========================================
  
  describe('Dimension Props', () => {
    const dimensionProps = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'];
    
    it('should accept valid dimension values', async () => {
      const validValues = [
        'auto',
        'grow', 
        'small',
        'medium',
        'large',
        '300px',
        '50%',
        '50vh',
        '100vw',
        'fit-content',
        'max-content',
        'min-content'
      ];

      for (const prop of dimensionProps) {
        for (const value of validValues) {
          const data = { [prop]: value };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(true);
          expect(result.errors).toHaveLength(0);
        }
      }
    });

    it('should reject non-string dimension values', async () => {
      for (const prop of dimensionProps) {
        const data = { [prop]: 300 }; // number instead of string
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should allow all dimension props to be set together', async () => {
      const data = {
        width: 'large',
        height: 'medium',
        minWidth: 'small',
        minHeight: '100px',
        maxWidth: '1200px',
        maxHeight: '80vh'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ========================================
  // SPACING PROPS TESTS
  // ========================================
  
  describe('Spacing Props', () => {
    const spacingSizes = ['none', 'tiny', 'small', 'medium', 'large', 'huge'];
    const paddingProps = ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY'];
    const marginProps = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY'];
    const allSpacingProps = [...paddingProps, ...marginProps];

    it('should accept all valid spacing sizes for padding props', async () => {
      for (const prop of paddingProps) {
        for (const size of spacingSizes) {
          const data = { [prop]: size };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(true);
          expect(result.errors).toHaveLength(0);
        }
      }
    });

    it('should accept all valid spacing sizes for margin props', async () => {
      for (const prop of marginProps) {
        for (const size of spacingSizes) {
          const data = { [prop]: size };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(true);
          expect(result.errors).toHaveLength(0);
        }
      }
    });

    it('should reject invalid spacing sizes', async () => {
      const invalidSizes = ['extra-small', 'xl', 'jumbo', 'micro', '', '0', '10px'];
      
      for (const prop of allSpacingProps) {
        for (const size of invalidSizes) {
          const data = { [prop]: size };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);
        }
      }
    });

    it('should allow all padding props to be set together', async () => {
      const data = {
        padding: 'medium',
        paddingTop: 'large',
        paddingRight: 'small',
        paddingBottom: 'tiny',
        paddingLeft: 'none',
        paddingX: 'huge',
        paddingY: 'medium'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should allow all margin props to be set together', async () => {
      const data = {
        margin: 'small',
        marginTop: 'medium',
        marginRight: 'large',
        marginBottom: 'huge',
        marginLeft: 'tiny',
        marginX: 'none',
        marginY: 'small'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject non-string spacing values', async () => {
      for (const prop of allSpacingProps) {
        const data = { [prop]: 10 }; // number instead of string
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });

  // ========================================
  // BACKGROUND PROPS TESTS
  // ========================================
  
  describe('Background Props', () => {
    it('should accept valid background color values', async () => {
      const validBackgrounds = [
        '#ffffff',
        '#ff0000',
        'primary.main',
        'secondary.light',
        'transparent',
        'red',
        'rgba(255, 0, 0, 0.5)',
        'hsl(120, 100%, 50%)'
      ];

      for (const bg of validBackgrounds) {
        const data = { background: bg };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should accept valid background image URLs', async () => {
      const validImages = [
        'https://example.com/image.jpg',
        'https://picsum.photos/800/600',
        '/local/image.png',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
      ];

      for (const img of validImages) {
        const data = { backgroundImage: img };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should accept valid gradient values', async () => {
      const validGradients = [
        'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
        'conic-gradient(from 180deg at 50% 50%, violet, blue, green, yellow, orange, red, violet)'
      ];

      for (const gradient of validGradients) {
        const data = { backgroundGradient: gradient };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should reject non-string background values', async () => {
      const invalidData = [
        { background: 123 },
        { backgroundImage: { url: 'test.jpg' } },
        { backgroundGradient: ['red', 'blue'] }
      ];

      for (const data of invalidData) {
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should allow all background props to be set together', async () => {
      const data = {
        background: 'primary.main',
        backgroundImage: 'https://example.com/bg.jpg',
        backgroundGradient: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ========================================
  // TEXT ALIGNMENT TESTS
  // ========================================
  
  describe('Text Alignment', () => {
    const validAlignments = ['left', 'center', 'right', 'justify'];

    it('should accept all valid text alignment values', async () => {
      for (const alignment of validAlignments) {
        const data = { textAlign: alignment };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should reject invalid text alignment values', async () => {
      const invalidAlignments = ['start', 'end', 'middle', 'top', 'bottom', '', 'invalid'];
      
      for (const alignment of invalidAlignments) {
        const data = { textAlign: alignment };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should reject non-string text alignment values', async () => {
      const data = { textAlign: 1 };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // ========================================
  // HTML ATTRIBUTES & ACCESSIBILITY TESTS
  // ========================================
  
  describe('HTML Attributes & Accessibility', () => {
    it('should accept valid HTML id attribute', async () => {
      const validIds = ['unique-id', 'component_1', 'test-123', 'CamelCaseId'];
      
      for (const id of validIds) {
        const data = { id };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should accept valid ARIA role attribute', async () => {
      const validRoles = ['button', 'navigation', 'main', 'banner', 'contentinfo', 'dialog'];
      
      for (const role of validRoles) {
        const data = { role };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should accept valid ARIA attributes', async () => {
      const data = {
        'aria-label': 'Click me to submit form',
        'aria-labelledby': 'label-1 label-2',
        'aria-describedby': 'description-1 description-2'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept valid data-testid attribute', async () => {
      const validTestIds = ['submit-button', 'user_profile', 'navigation-menu', 'test-component-123'];
      
      for (const testId of validTestIds) {
        const data = { 'data-testid': testId };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should reject non-string HTML attributes', async () => {
      const invalidData = [
        { id: 123 },
        { role: ['button'] },
        { 'aria-label': { text: 'label' } },
        { 'data-testid': true }
      ];

      for (const data of invalidData) {
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should allow all accessibility attributes to be set together', async () => {
      const data = {
        id: 'main-component',
        role: 'main',
        'aria-label': 'Main content area',
        'aria-labelledby': 'header-title',
        'aria-describedby': 'content-description help-text',
        'data-testid': 'main-content-area'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ========================================
  // EVENT HANDLERS TESTS
  // ========================================
  
  describe('Event Handlers', () => {
    const eventHandlers = ['onClick', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

    it('should accept valid JavaScript function strings', async () => {
      const validHandlers = [
        'function(event) { console.log("clicked"); }',
        '(e) => console.log(e.target)',
        'handleClick',
        'this.handleSubmit.bind(this)',
        'function() { alert("Hello"); return false; }'
      ];

      for (const handler of eventHandlers) {
        for (const func of validHandlers) {
          const data = { [handler]: func };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(true);
          expect(result.errors).toHaveLength(0);
        }
      }
    });

    it('should accept empty string handlers', async () => {
      for (const handler of eventHandlers) {
        const data = { [handler]: '' };
        const result = await ViewSchema.validate(data);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it('should reject non-string event handlers', async () => {
      const invalidHandlers = [
        123,
        true,
        ['function'],
        { handler: 'onClick' }
        // Note: null and undefined are valid due to @IsOptional decorator
      ];

      for (const handler of eventHandlers) {
        for (const invalidValue of invalidHandlers) {
          const data = { [handler]: invalidValue };
          const result = await ViewSchema.validate(data);
          expect(result.isValid).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);
        }
      }
    });

    it('should accept null and undefined event handlers due to @IsOptional', async () => {
      for (const handler of eventHandlers) {
        // Test null
        const dataWithNull = { [handler]: null };
        const result1 = await ViewSchema.validate(dataWithNull);
        expect(result1.isValid).toBe(true);
        expect(result1.errors).toHaveLength(0);
        
        // Test undefined
        const dataWithUndefined = { [handler]: undefined };
        const result2 = await ViewSchema.validate(dataWithUndefined);
        expect(result2.isValid).toBe(true);
        expect(result2.errors).toHaveLength(0);
      }
    });

    it('should allow all event handlers to be set together', async () => {
      const data = {
        onClick: 'function(e) { handleClick(e); }',
        onMouseEnter: '(e) => setHover(true)',
        onMouseLeave: '(e) => setHover(false)',
        onFocus: 'handleFocus',
        onBlur: 'handleBlur'
      };
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ========================================
  // INTEGRATION TESTS
  // ========================================
  
  describe('Integration Tests', () => {
    it('should create instance with default values from comprehensive data', () => {
      const comprehensiveData = {
        // Grid props
        span: '6',
        xs: '12',
        sm: '8',
        md: '6',
        lg: '4',
        xl: '3',
        
        // Styling
        className: 'my-component custom-style',
        sx: '{"color": "primary.main", "fontWeight": "bold"}',
        style: '{"borderRadius": "8px", "boxShadow": "0 2px 4px rgba(0,0,0,0.1)"}',
        
        // Dimensions
        width: 'large',
        height: 'medium',
        minWidth: 'small',
        maxHeight: '500px',
        
        // Spacing
        padding: 'medium',
        paddingX: 'large',
        margin: 'small',
        marginY: 'tiny',
        
        // Background
        background: 'primary.light',
        backgroundImage: 'https://example.com/bg.jpg',
        backgroundGradient: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        
        // Text alignment
        textAlign: 'center',
        
        // HTML attributes
        id: 'comprehensive-component',
        role: 'main',
        'aria-label': 'Comprehensive test component',
        'data-testid': 'integration-test',
        
        // Events
        onClick: 'function(e) { console.log("Comprehensive click"); }',
        onFocus: 'handleFocus'
      };
      
      const viewModel = ViewSchema.createWithDefaults(comprehensiveData);
      
      // Test grid props
      expect(viewModel.span).toBe('6');
      expect(viewModel.xs).toBe('12');
      expect(viewModel.lg).toBe('4');
      
      // Test styling
      expect(viewModel.className).toBe('my-component custom-style');
      expect(viewModel.sx).toContain('primary.main');
      
      // Test dimensions
      expect(viewModel.width).toBe('large');
      expect(viewModel.height).toBe('medium');
      
      // Test spacing
      expect(viewModel.padding).toBe('medium');
      expect(viewModel.marginY).toBe('tiny');
      
      // Test background
      expect(viewModel.background).toBe('primary.light');
      expect(viewModel.backgroundImage).toBe('https://example.com/bg.jpg');
      
      // Test text alignment
      expect(viewModel.textAlign).toBe('center');
      
      // Test HTML attributes
      expect(viewModel.id).toBe('comprehensive-component');
      expect(viewModel.role).toBe('main');
      expect(viewModel['aria-label']).toBe('Comprehensive test component');
      
      // Test events
      expect(viewModel.onClick).toBe('function(e) { console.log("Comprehensive click"); }');
    });

    it('should validate comprehensive data successfully', async () => {
      const comprehensiveData = {
        span: 'auto',
        xs: '12',
        sm: '6',
        md: '4',
        lg: '3',
        xl: '2',
        className: 'test-class',
        sx: '{"theme": "dark"}',
        style: '{"color": "red"}',
        width: 'medium',
        height: '300px',
        minWidth: 'small',
        maxWidth: 'large',
        padding: 'medium',
        paddingTop: 'large',
        margin: 'small',
        marginX: 'tiny',
        background: '#ffffff',
        backgroundImage: 'https://test.jpg',
        backgroundGradient: 'linear-gradient(red, blue)',
        textAlign: 'center',
        id: 'test-component',
        role: 'button',
        'aria-label': 'Test button',
        'data-testid': 'test-btn',
        onClick: 'handleClick',
        onFocus: 'handleFocus'
      };
      
      const result = await ViewSchema.validate(comprehensiveData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle mixed valid and invalid data correctly', async () => {
      const mixedData = {
        span: 'auto', // valid
        xs: '13', // invalid - out of range
        className: 'valid-class', // valid
        padding: 'invalid-size', // invalid - not in allowed values
        textAlign: 'center', // valid
        id: 'valid-id', // valid
        onClick: 123 // invalid - not a string
      };
      
      const result = await ViewSchema.validate(mixedData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // Should have errors for xs, padding, and onClick
      const errorFields = result.validationErrors?.map(error => error.property) || [];
      expect(errorFields).toContain('xs');
      expect(errorFields).toContain('padding');
      expect(errorFields).toContain('onClick');
    });
  });

  // ========================================
  // EDGE CASES AND ERROR SCENARIOS
  // ========================================
  
  describe('Edge Cases and Error Scenarios', () => {
    it('should handle null and undefined values appropriately', async () => {
      // Test with null values - @IsOptional allows null values
      const dataWithNull = {
        className: null,
        padding: null
      };
      
      const result = await ViewSchema.validate(dataWithNull);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      
      // Test undefined values should also be valid due to @IsOptional
      const dataWithUndefined = {
        className: undefined,
        span: undefined,
        padding: undefined
      };
      
      const result2 = await ViewSchema.validate(dataWithUndefined);
      expect(result2.isValid).toBe(true);
      expect(result2.errors).toHaveLength(0);
    });

    it('should reject objects where strings are expected', async () => {
      const invalidData = {
        className: { name: 'class' },
        span: { value: '6' },
        onClick: { handler: 'click' }
      };
      
      const result = await ViewSchema.validate(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject arrays where strings are expected', async () => {
      const invalidData = {
        className: ['class1', 'class2'],
        padding: ['small', 'medium'],
        textAlign: ['left', 'center']
      };
      
      const result = await ViewSchema.validate(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle very long strings', async () => {
      const longString = 'a'.repeat(10000);
      const data = {
        className: longString,
        'aria-label': longString,
        onClick: `function() { console.log("${longString}"); }`
      };
      
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle special characters in string fields', async () => {
      const data = {
        className: 'class-with-special_chars@123',
        id: 'id_with$pecial&chars',
        'aria-label': 'Label with émojis 🚀 and unicode ñ',
        onClick: 'function() { alert("Special chars: !@#$%^&*()"); }'
      };
      
      const result = await ViewSchema.validate(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});