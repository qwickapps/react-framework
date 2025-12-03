/**
 * Component-Specific Serialization Test Patterns
 * 
 * Standardized test patterns for validating serialization behavior
 * of individual components implementing the Serializable interface.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';

/**
 * Generic test pattern for validating component serialization
 * This pattern should be used for all components implementing Serializable
 */
export function testComponentSerialization(
  componentName: string,
  ComponentClass: SerializableConstructor,
  testCases: {
    name: string;
    props: Record<string, unknown>;
    expectedData?: Record<string, unknown>;
    validate?: (element: ReactElement, originalProps: Record<string, unknown>) => void;
    shouldThrow?: boolean;
    errorMessage?: string;
  }[]
) {
  describe(`${componentName} Serialization`, () => {
    beforeEach(() => {
      ComponentTransformer.clearRegistry();
      ComponentTransformer.registerComponent(componentName, ComponentClass);
    });

    afterEach(() => {
      ComponentTransformer.clearRegistry();
    });

    testCases.forEach(({ name, props, expectedData, validate, shouldThrow, errorMessage }) => {
      it(`should ${name}`, () => {
        if (shouldThrow) {
          expect(() => {
            const componentData = {
              tag: componentName,
              version: '1.0.0',
              data: props
            };
            ComponentTransformer.deserialize(componentData);
          }).toThrow(errorMessage || '');
          return;
        }

        const componentData = {
          tag: componentName,
          version: '1.0.0',
          data: props
        };

        // Test deserialization
        const result = ComponentTransformer.deserialize(componentData);
        expect(React.isValidElement(result)).toBe(true);

        const element = result as ReactElement;

        // Test serialization roundtrip if no custom validation
        if (!validate) {
          const serialized = ComponentTransformer.serialize(element);
          const parsed = JSON.parse(serialized);
          expect(parsed.tag).toBe(componentName);
          expect(parsed.version).toBe('1.0.0');
          
          if (expectedData) {
            expect(parsed.data).toEqual(expectedData);
          }

          // Verify roundtrip produces same result
          const roundtrip = ComponentTransformer.deserialize(parsed);
          expect(React.isValidElement(roundtrip)).toBe(true);
        } else {
          validate(element, props);
        }
      });
    });

    // Standard tests that every component should pass
    it('should handle null props gracefully', () => {
      const componentData = {
        tag: componentName,
        version: '1.0.0',
        data: null
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(componentData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should handle empty props gracefully', () => {
      const componentData = {
        tag: componentName,
        version: '1.0.0',
        data: {}
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(componentData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should preserve all props through roundtrip', () => {
      // Create a comprehensive props object
      const complexProps = {
        stringProp: 'test string',
        numberProp: 42,
        booleanProp: true,
        arrayProp: ['item1', 'item2', 'item3'],
        objectProp: { nested: 'value', deep: { deeper: 'deepValue' } },
        nullProp: null,
        undefinedProp: undefined
      };

      const componentData = {
        tag: componentName,
        version: '1.0.0',
        data: complexProps
      };

      const result = ComponentTransformer.deserialize(componentData);
      const serialized = ComponentTransformer.serialize(result);
      const parsed = JSON.parse(serialized);

      expect(parsed.tag).toBe(componentName);
      expect(parsed.version).toBe('1.0.0');
      // Note: undefined values may be converted to null in JSON
    });

    it('should handle version compatibility', () => {
      const versionsToTest = ['1.0.0', '1.1.0', '2.0.0'];

      versionsToTest.forEach(version => {
        const componentData = {
          tag: componentName,
          version,
          data: { testProp: `test-${version}` }
        };

        expect(() => {
          const result = ComponentTransformer.deserialize(componentData);
          expect(React.isValidElement(result)).toBe(true);
        }).not.toThrow();
      });
    });
  });
}

// Example component implementations for testing patterns
class TestButton implements Serializable {
  constructor(public props: {
    label?: string;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    'data-testid'?: string;
  }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('button', {
      className: `btn ${jsonData.variant ? `btn-${jsonData.variant}` : 'btn-primary'} ${jsonData.className || ''}`.trim(),
      disabled: jsonData.disabled,
      onClick: jsonData.onClick,
      'data-testid': jsonData['data-testid'] || 'test-button'
    }, jsonData.label || jsonData.children || 'Button');
  }

  toJson(): unknown {
    return {
      label: this.props.label,
      variant: this.props.variant,
      disabled: this.props.disabled,
      onClick: this.props.onClick ? 'function' : undefined,
      children: this.props.children,
      className: this.props.className,
      'data-testid': this.props['data-testid']
    };
  }
}

class TestCard implements Serializable {
  constructor(public props: {
    title?: string;
    content?: string;
    image?: string;
    imageAlt?: string;
    actions?: unknown[];
    metadata?: Record<string, unknown>;
    className?: string;
    elevation?: number;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    const actions = jsonData.actions ? ComponentTransformer.deserialize(jsonData.actions) : null;

    return React.createElement('div', {
      className: `card ${jsonData.className || ''}`.trim(),
      'data-elevation': jsonData.elevation,
      'data-testid': 'test-card'
    }, [
      jsonData.image ? React.createElement('img', {
        key: 'image',
        src: jsonData.image,
        alt: jsonData.imageAlt || jsonData.title || 'Card image',
        className: 'card-image'
      }) : null,
      React.createElement('div', { key: 'body', className: 'card-body' }, [
        jsonData.title ? React.createElement('h3', { key: 'title', className: 'card-title' }, jsonData.title) : null,
        jsonData.content ? React.createElement('p', { key: 'content', className: 'card-content' }, jsonData.content) : null,
        jsonData.metadata ? React.createElement('div', { 
          key: 'metadata', 
          className: 'card-metadata',
          'data-metadata': JSON.stringify(jsonData.metadata)
        }, Object.entries(jsonData.metadata).map(([key, value]) => 
          React.createElement('span', { key }, `${key}: ${value}`)
        )) : null,
        actions ? React.createElement('div', { key: 'actions', className: 'card-actions' }, actions) : null
      ].filter(Boolean))
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      title: this.props.title,
      content: this.props.content,
      image: this.props.image,
      imageAlt: this.props.imageAlt,
      actions: this.props.actions ? ComponentTransformer.serialize(this.props.actions) : null,
      metadata: this.props.metadata,
      className: this.props.className,
      elevation: this.props.elevation
    };
  }
}

class TestSection implements Serializable {
  constructor(public props: {
    title?: string;
    subtitle?: string;
    children?: unknown;
    className?: string;
    backgroundColor?: string;
    padding?: string;
    id?: string;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    const children = jsonData.children ? ComponentTransformer.deserialize(jsonData.children) : null;

    return React.createElement('section', {
      id: jsonData.id,
      className: `section ${jsonData.className || ''}`.trim(),
      style: {
        backgroundColor: jsonData.backgroundColor,
        padding: jsonData.padding
      },
      'data-testid': 'test-section'
    }, [
      jsonData.title || jsonData.subtitle ? React.createElement('header', { key: 'header', className: 'section-header' }, [
        jsonData.title ? React.createElement('h2', { key: 'title' }, jsonData.title) : null,
        jsonData.subtitle ? React.createElement('p', { key: 'subtitle', className: 'subtitle' }, jsonData.subtitle) : null
      ].filter(Boolean)) : null,
      children ? React.createElement('div', { key: 'content', className: 'section-content' }, children) : null
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      title: this.props.title,
      subtitle: this.props.subtitle,
      children: this.props.children ? ComponentTransformer.serialize(this.props.children) : null,
      className: this.props.className,
      backgroundColor: this.props.backgroundColor,
      padding: this.props.padding,
      id: this.props.id
    };
  }
}

class TestCode implements Serializable {
  constructor(public props: {
    code?: string;
    language?: string;
    showLineNumbers?: boolean;
    highlightLines?: number[];
    theme?: 'light' | 'dark';
    maxHeight?: string;
    filename?: string;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    return React.createElement('div', {
      className: `code-container theme-${jsonData.theme || 'light'}`,
      'data-testid': 'test-code'
    }, [
      jsonData.filename ? React.createElement('div', {
        key: 'filename',
        className: 'code-filename'
      }, jsonData.filename) : null,
      React.createElement('pre', {
        key: 'pre',
        className: `code-block language-${jsonData.language || 'text'}`,
        style: { maxHeight: jsonData.maxHeight },
        'data-line-numbers': jsonData.showLineNumbers,
        'data-highlight-lines': jsonData.highlightLines ? jsonData.highlightLines.join(',') : undefined
      }, React.createElement('code', {}, jsonData.code || ''))
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      code: this.props.code,
      language: this.props.language,
      showLineNumbers: this.props.showLineNumbers,
      highlightLines: this.props.highlightLines,
      theme: this.props.theme,
      maxHeight: this.props.maxHeight,
      filename: this.props.filename
    };
  }
}

// Test implementations using the pattern
describe('Component Serialization Pattern Tests', () => {
  // Test Button component
  testComponentSerialization('TestButton', TestButton, [
    {
      name: 'serialize and deserialize basic button correctly',
      props: { label: 'Click Me', variant: 'primary' },
      expectedData: { label: 'Click Me', variant: 'primary', disabled: undefined, onClick: undefined, children: undefined, className: undefined, 'data-testid': undefined }
    },
    {
      name: 'handle button with all props',
      props: {
        label: 'Full Button',
        variant: 'danger',
        disabled: true,
        className: 'custom-btn',
        'data-testid': 'full-button'
      },
      validate: (element) => {
        expect(element.props.className).toContain('btn-danger');
        expect(element.props.className).toContain('custom-btn');
        expect(element.props.disabled).toBe(true);
        expect(element.props['data-testid']).toBe('full-button');
        expect(element.props.children).toBe('Full Button');
      }
    },
    {
      name: 'handle button with children instead of label',
      props: { children: 'Child Content', variant: 'secondary' },
      validate: (element) => {
        expect(element.props.children).toBe('Child Content');
        expect(element.props.className).toContain('btn-secondary');
      }
    }
  ]);

  // Test Card component  
  testComponentSerialization('TestCard', TestCard, [
    {
      name: 'serialize and deserialize basic card correctly',
      props: { title: 'Test Card', content: 'Test content' },
      validate: (element) => {
        expect(element.props['data-testid']).toBe('test-card');
        expect(element.props.className).toBe('card');
      }
    },
    {
      name: 'handle card with image and metadata',
      props: {
        title: 'Image Card',
        content: 'Card with image',
        image: 'https://example.com/image.jpg',
        imageAlt: 'Test image',
        metadata: { author: 'Test Author', date: '2025-01-01' },
        elevation: 2
      },
      validate: (element) => {
        expect(element.props['data-elevation']).toBe(2);
        // Check for image in children
        const imageChild = element.props.children.find((child: unknown) => child?.type === 'img');
        expect(imageChild).toBeTruthy();
        expect(imageChild.props.src).toBe('https://example.com/image.jpg');
        expect(imageChild.props.alt).toBe('Test image');
      }
    },
    {
      name: 'handle card with nested actions',
      props: {
        title: 'Card with Actions',
        actions: [
          {
            tag: 'TestButton',
            version: '1.0.0',
            data: { label: 'Action 1', variant: 'primary' }
          },
          {
            tag: 'TestButton', 
            version: '1.0.0',
            data: { label: 'Action 2', variant: 'secondary' }
          }
        ]
      }
    }
  ]);

  // Test Section component
  testComponentSerialization('TestSection', TestSection, [
    {
      name: 'serialize and deserialize basic section correctly',
      props: { title: 'Test Section', subtitle: 'Section subtitle' },
      validate: (element) => {
        expect(element.props['data-testid']).toBe('test-section');
        expect(element.props.className).toBe('section');
      }
    },
    {
      name: 'handle section with styling and children',
      props: {
        title: 'Styled Section',
        className: 'hero-section',
        backgroundColor: '#f0f0f0',
        padding: '2rem',
        id: 'hero',
        children: [
          {
            tag: 'TestCard',
            version: '1.0.0',
            data: { title: 'Nested Card', content: 'Inside section' }
          }
        ]
      },
      validate: (element) => {
        expect(element.props.id).toBe('hero');
        expect(element.props.className).toContain('hero-section');
        expect(element.props.style.backgroundColor).toBe('#f0f0f0');
        expect(element.props.style.padding).toBe('2rem');
      }
    }
  ]);

  // Test Code component
  testComponentSerialization('TestCode', TestCode, [
    {
      name: 'serialize and deserialize basic code block correctly',
      props: { code: 'const x = 1;', language: 'javascript' },
      validate: (element) => {
        expect(element.props['data-testid']).toBe('test-code');
        expect(element.props.className).toContain('theme-light');
      }
    },
    {
      name: 'handle code block with all features',
      props: {
        code: 'function example() {\n  return "hello";\n}',
        language: 'javascript',
        showLineNumbers: true,
        highlightLines: [1, 3],
        theme: 'dark',
        maxHeight: '300px',
        filename: 'example.js'
      },
      validate: (element) => {
        expect(element.props.className).toContain('theme-dark');
        // Check for filename display
        const filenameChild = element.props.children.find((child: unknown) => 
          child?.props?.className === 'code-filename'
        );
        expect(filenameChild).toBeTruthy();
        expect(filenameChild.props.children).toBe('example.js');
        
        // Check code block attributes
        const preChild = element.props.children.find((child: unknown) => child?.type === 'pre');
        expect(preChild.props['data-line-numbers']).toBe(true);
        expect(preChild.props['data-highlight-lines']).toBe('1,3');
        expect(preChild.props.style.maxHeight).toBe('300px');
      }
    },
    {
      name: 'handle empty code block',
      props: { language: 'text' },
      validate: (element) => {
        const preChild = element.props.children.find((child: unknown) => child?.type === 'pre');
        expect(preChild.props.className).toContain('language-text');
        expect(preChild.props.children.props.children).toBe('');
      }
    }
  ]);

  describe('Edge Cases and Error Handling', () => {
    beforeEach(() => {
      ComponentTransformer.clearRegistry();
      ComponentTransformer.registerComponent('TestButton', TestButton);
      ComponentTransformer.registerComponent('TestCard', TestCard);
      ComponentTransformer.registerComponent('TestSection', TestSection);
      ComponentTransformer.registerComponent('TestCode', TestCode);
    });

    it('should handle components with circular references in data', () => {
      const circularData = { name: 'circular' };
      (circularData as unknown).self = circularData;

      // This should not crash, though the circular reference may be lost
      expect(() => {
        const componentData = {
          tag: 'TestButton',
          version: '1.0.0',
          data: { label: 'Circular Test', metadata: circularData }
        };
        ComponentTransformer.deserialize(componentData);
      }).not.toThrow();
    });

    it('should handle components with function props', () => {
      const componentData = {
        tag: 'TestButton',
        version: '1.0.0',
        data: { 
          label: 'Function Test', 
          onClick: () => console.log('clicked') 
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(componentData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should handle components with very large data', () => {
      const largeText = 'Lorem ipsum '.repeat(10000); // ~110KB
      
      const componentData = {
        tag: 'TestCode',
        version: '1.0.0',
        data: { 
          code: largeText,
          language: 'text'
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(componentData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should handle components with special characters', () => {
      const specialChars = '!@#$%^&*()_+{}[]|\\:";\'<>?,./`~\n\t\r';
      
      const componentData = {
        tag: 'TestCard',
        version: '1.0.0',
        data: {
          title: `Special: ${specialChars}`,
          content: `Content with special chars: ${specialChars}`
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(componentData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should handle components with Unicode characters', () => {
      const unicodeText = '🚀 Unicode test: 中文, العربية, Русский, Ψϕθω';
      
      const componentData = {
        tag: 'TestCard',
        version: '1.0.0',
        data: {
          title: unicodeText,
          content: `More Unicode: ${unicodeText}`
        }
      };

      const result = ComponentTransformer.deserialize(componentData);
      expect(React.isValidElement(result)).toBe(true);
      
      // Verify Unicode preservation through serialization
      const serialized = ComponentTransformer.serialize(result);
      const parsed = JSON.parse(serialized);
      expect(parsed.data.title).toContain('🚀');
      expect(parsed.data.title).toContain('中文');
      expect(parsed.data.title).toContain('العربية');
    });
  });
});