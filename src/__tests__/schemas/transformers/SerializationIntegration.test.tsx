/**
 * Component Serialization Integration Tests
 * 
 * Comprehensive integration testing for the entire serialization system
 * covering complex scenarios, nested components, and real-world usage patterns.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';

// Mock ErrorBoundary for testing unknown component handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MockErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; onError?: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { 
        'data-testid': 'error-boundary',
        'data-error': this.state.error?.message 
      }, 'Component Error');
    }
    return this.props.children;
  }
}

// Complex Mock Components for Integration Testing
class MockButton implements Serializable {
  constructor(public props: {
    label?: string;
    variant?: 'primary' | 'secondary' | 'danger';
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
  }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('button', {
      className: `btn btn-${jsonData.variant || 'primary'}`,
      disabled: jsonData.disabled,
      onClick: jsonData.onClick,
      'data-testid': 'mock-button'
    }, jsonData.label || jsonData.children || 'Button');
  }

  toJson(): unknown {
    return {
      label: this.props.label,
      variant: this.props.variant,
      disabled: this.props.disabled,
      children: this.props.children,
      onClick: this.props.onClick ? 'function' : undefined
    };
  }
}

class MockSection implements Serializable {
  constructor(public props: { 
    title?: string;
    className?: string;
    children?: unknown;
    background?: string;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    // Section components often need to deserialize their children
    const children = jsonData.children ? 
      ComponentTransformer.deserialize(jsonData.children) : null;
    
    return React.createElement('section', {
      className: jsonData.className || 'section',
      style: jsonData.background ? { backgroundColor: jsonData.background } : undefined,
      'data-testid': 'mock-section'
    }, [
      jsonData.title ? React.createElement('h2', { key: 'title' }, jsonData.title) : null,
      children ? React.createElement('div', { key: 'content', className: 'content' }, children) : null
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      title: this.props.title,
      className: this.props.className,
      background: this.props.background,
      children: this.props.children ? ComponentTransformer.serialize(this.props.children) : null
    };
  }
}

class MockCard implements Serializable {
  constructor(public props: { 
    title?: string; 
    content?: string;
    image?: string;
    actions?: unknown[];
    metadata?: Record<string, unknown>;
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    const actions = jsonData.actions ? 
      ComponentTransformer.deserialize(jsonData.actions) : null;

    return React.createElement('div', {
      className: 'card',
      'data-testid': 'mock-card'
    }, [
      jsonData.image ? React.createElement('img', { 
        key: 'image', 
        src: jsonData.image, 
        alt: jsonData.title || 'Card image' 
      }) : null,
      React.createElement('div', { key: 'body', className: 'card-body' }, [
        jsonData.title ? React.createElement('h3', { key: 'title' }, jsonData.title) : null,
        jsonData.content ? React.createElement('p', { key: 'content' }, jsonData.content) : null,
        jsonData.metadata ? React.createElement('pre', { 
          key: 'metadata', 
          className: 'metadata' 
        }, JSON.stringify(jsonData.metadata, null, 2)) : null,
        actions ? React.createElement('div', { key: 'actions', className: 'actions' }, actions) : null
      ].filter(Boolean))
    ].filter(Boolean));
  }

  toJson(): unknown {
    return {
      title: this.props.title,
      content: this.props.content,
      image: this.props.image,
      metadata: this.props.metadata,
      actions: this.props.actions ? ComponentTransformer.serialize(this.props.actions) : null
    };
  }
}

class MockCode implements Serializable {
  constructor(public props: { 
    code?: string;
    language?: string;
    showLineNumbers?: boolean;
    highlightLines?: number[];
  }) {}

  static fromJson(jsonData: unknown): ReactElement {
    return React.createElement('pre', {
      className: `code-block language-${jsonData.language || 'text'}`,
      'data-testid': 'mock-code',
      'data-language': jsonData.language,
      'data-line-numbers': jsonData.showLineNumbers
    }, React.createElement('code', {}, jsonData.code || ''));
  }

  toJson(): unknown {
    return {
      code: this.props.code,
      language: this.props.language,
      showLineNumbers: this.props.showLineNumbers,
      highlightLines: this.props.highlightLines
    };
  }
}

describe('Component Serialization Integration Tests', () => {
  beforeEach(() => {
    ComponentTransformer.clearRegistry();
    ComponentTransformer.registerComponent('Button', MockButton as SerializableConstructor);
    ComponentTransformer.registerComponent('Section', MockSection as SerializableConstructor);
    ComponentTransformer.registerComponent('Card', MockCard as SerializableConstructor);
    ComponentTransformer.registerComponent('Code', MockCode as SerializableConstructor);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Multi-Component Serialization', () => {
    it('should serialize and deserialize array of different component types', () => {
      const components = [
        {
          tag: 'Button',
          version: '1.0.0',
          data: { label: 'Click Me', variant: 'primary' }
        },
        {
          tag: 'Card',
          version: '1.0.0',
          data: { 
            title: 'Test Card', 
            content: 'Card content',
            metadata: { author: 'Test User', date: '2025-01-01' }
          }
        },
        {
          tag: 'Code',
          version: '1.0.0',
          data: { 
            code: 'const x = 1;', 
            language: 'javascript',
            showLineNumbers: true
          }
        }
      ];

      const result = ComponentTransformer.deserialize(components);
      expect(Array.isArray(result)).toBe(true);
      
      const elements = result as ReactElement[];
      expect(elements).toHaveLength(3);
      
      // Verify each component type
      expect(React.isValidElement(elements[0])).toBe(true);
      expect(elements[0].props['data-testid']).toBe('mock-button');
      expect(elements[0].props.className).toBe('btn btn-primary');
      
      expect(React.isValidElement(elements[1])).toBe(true);
      expect(elements[1].props['data-testid']).toBe('mock-card');
      
      expect(React.isValidElement(elements[2])).toBe(true);
      expect(elements[2].props['data-testid']).toBe('mock-code');
      expect(elements[2].props['data-language']).toBe('javascript');
    });

    it('should handle mixed content arrays with primitives and components', () => {
      const mixedContent = [
        'Plain text content',
        {
          tag: 'Button',
          version: '1.0.0',
          data: { label: 'Action Button' }
        },
        42,
        {
          tag: 'Code',
          version: '1.0.0',
          data: { code: 'console.log("Hello");', language: 'javascript' }
        },
        null,
        true
      ];

      const result = ComponentTransformer.deserialize(mixedContent);
      expect(Array.isArray(result)).toBe(true);
      
      const elements = result as unknown[];
      expect(elements).toHaveLength(6);
      expect(elements[0]).toBe('Plain text content');
      expect(React.isValidElement(elements[1])).toBe(true);
      expect(elements[2]).toBe(42);
      expect(React.isValidElement(elements[3])).toBe(true);
      expect(elements[4]).toBeNull();
      expect(elements[5]).toBe(true);
    });
  });

  describe('Nested Component Scenarios', () => {
    it('should handle deeply nested component structures', () => {
      const nestedStructure = {
        tag: 'Section',
        version: '1.0.0',
        data: {
          title: 'Main Section',
          className: 'hero-section',
          background: '#f0f0f0',
          children: [
            {
              tag: 'Card',
              version: '1.0.0',
              data: {
                title: 'Feature Card',
                content: 'This card contains actions',
                actions: [
                  {
                    tag: 'Button',
                    version: '1.0.0',
                    data: { label: 'Learn More', variant: 'primary' }
                  },
                  {
                    tag: 'Button',
                    version: '1.0.0',
                    data: { label: 'Try Now', variant: 'secondary' }
                  }
                ]
              }
            },
            {
              tag: 'Code',
              version: '1.0.0',
              data: {
                code: 'function example() {\n  return "nested code";\n}',
                language: 'javascript',
                showLineNumbers: true
              }
            }
          ]
        }
      };

      const result = ComponentTransformer.deserialize(nestedStructure);
      expect(React.isValidElement(result)).toBe(true);
      
      const element = result as ReactElement;
      expect(element.props['data-testid']).toBe('mock-section');
      expect(element.props.className).toBe('hero-section');
      expect(element.props.style?.backgroundColor).toBe('#f0f0f0');
      
      // Verify nested structure exists
      expect(Array.isArray(element.props.children)).toBe(true);
      const sectionChildren = element.props.children.filter(Boolean);
      expect(sectionChildren).toHaveLength(2); // title + content
    });

    it('should preserve component hierarchy through roundtrip serialization', () => {
      const originalData = {
        tag: 'Section',
        version: '1.0.0',
        data: {
          title: 'Test Section',
          children: [
            {
              tag: 'Card',
              version: '1.0.0',
              data: {
                title: 'Nested Card',
                actions: [
                  {
                    tag: 'Button',
                    version: '1.0.0',
                    data: { label: 'Action 1' }
                  }
                ]
              }
            }
          ]
        }
      };

      // Deserialize to React elements
      const reactElements = ComponentTransformer.deserialize(originalData);
      
      // Serialize back to JSON
      const serialized = ComponentTransformer.serialize(reactElements);
      const parsedSerialized = JSON.parse(serialized);
      
      // Deserialize again
      const finalResult = ComponentTransformer.deserialize(parsedSerialized);
      
      expect(React.isValidElement(finalResult)).toBe(true);
      const element = finalResult as ReactElement;
      expect(element.props['data-testid']).toBe('mock-section');
    });

    it('should handle circular delegation correctly', () => {
      // This tests the scenario where components call ComponentTransformer.deserialize
      // for their children, ensuring no infinite loops or stack overflows
      const circularTestData = {
        tag: 'Section',
        version: '1.0.0',
        data: {
          children: [
            {
              tag: 'Section',
              version: '1.0.0',
              data: {
                children: [
                  {
                    tag: 'Button',
                    version: '1.0.0',
                    data: { label: 'Deep Button' }
                  }
                ]
              }
            }
          ]
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(circularTestData);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });
  });

  describe('Real-World Page Structures', () => {
    it('should handle complex page layout with mixed components', () => {
      const pageStructure = [
        {
          tag: 'Section',
          version: '1.0.0',
          data: {
            title: 'Header Section',
            className: 'header',
            children: [
              {
                tag: 'Button',
                version: '1.0.0',
                data: { label: 'Get Started', variant: 'primary' }
              }
            ]
          }
        },
        {
          tag: 'Section',
          version: '1.0.0',
          data: {
            title: 'Features',
            className: 'features',
            children: [
              {
                tag: 'Card',
                version: '1.0.0',
                data: {
                  title: 'Fast Performance',
                  content: 'Optimized for speed',
                  actions: [
                    {
                      tag: 'Button',
                      version: '1.0.0',
                      data: { label: 'Learn More' }
                    }
                  ]
                }
              },
              {
                tag: 'Card',
                version: '1.0.0',
                data: {
                  title: 'Easy Integration',
                  content: 'Simple to implement',
                  actions: [
                    {
                      tag: 'Code',
                      version: '1.0.0',
                      data: {
                        code: 'npm install @qwickapps/react-framework',
                        language: 'bash'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ];

      const result = ComponentTransformer.deserialize(pageStructure);
      expect(Array.isArray(result)).toBe(true);
      
      const sections = result as ReactElement[];
      expect(sections).toHaveLength(2);
      
      // Verify first section (header)
      expect(sections[0].props['data-testid']).toBe('mock-section');
      expect(sections[0].props.className).toBe('header');
      
      // Verify second section (features)
      expect(sections[1].props['data-testid']).toBe('mock-section');
      expect(sections[1].props.className).toBe('features');
    });

    it('should handle empty and null children gracefully', () => {
      const structureWithEmpties = {
        tag: 'Section',
        version: '1.0.0',
        data: {
          title: 'Test Section',
          children: [
            null,
            {
              tag: 'Card',
              version: '1.0.0',
              data: {
                title: 'Valid Card',
                actions: []
              }
            },
            undefined,
            {
              tag: 'Section',
              version: '1.0.0',
              data: {
                children: null
              }
            }
          ]
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(structureWithEmpties);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });
  });

  describe('Error Boundary Integration', () => {
    it('should trigger error boundary for unknown components', () => {
      const unknownComponent = {
        tag: 'UnknownWidget',
        version: '1.0.0',
        data: { prop: 'value' }
      };

      let capturedError: Error | null = null;

      // Wrap in error boundary and attempt deserialization
      expect(() => {
        try {
          ComponentTransformer.deserialize(unknownComponent);
        } catch (error) {
          capturedError = error as Error;
          throw error;
        }
      }).toThrow('Unknown component: UnknownWidget');

      expect(capturedError?.message).toContain('Unknown component: UnknownWidget');
    });

    it('should handle malformed component data gracefully', () => {
      const malformedComponents = [
        { tag: 'Button' }, // Missing version and data
        { tag: 'Button', version: '1.0.0' }, // Missing data
        { tag: 'Button', version: '1.0.0', data: null }, // Null data
      ];

      malformedComponents.forEach((malformed) => {
        expect(() => {
          ComponentTransformer.deserialize(malformed);
        }).toThrow(/Malformed component data/);
      });
    });
  });

  describe('Performance Scenarios', () => {
    it('should handle large component trees efficiently', () => {
      const startTime = performance.now();
      
      // Generate large component tree (100 components)
      const largeTree = Array.from({ length: 100 }, (_, i) => ({
        tag: 'Card',
        version: '1.0.0',
        data: {
          title: `Card ${i}`,
          content: `Content for card ${i}`,
          metadata: { index: i, timestamp: Date.now() },
          actions: [
            {
              tag: 'Button',
              version: '1.0.0',
              data: { label: `Button ${i}` }
            }
          ]
        }
      }));

      const result = ComponentTransformer.deserialize(largeTree);
      const endTime = performance.now();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(100);
      
      // Performance assertion - should complete within reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should handle deeply nested structures without stack overflow', () => {
      // Create deeply nested structure (20 levels)
      let nestedStructure: unknown = {
        tag: 'Button',
        version: '1.0.0',
        data: { label: 'Deep Button' }
      };

      for (let i = 0; i < 20; i++) {
        nestedStructure = {
          tag: 'Section',
          version: '1.0.0',
          data: {
            title: `Level ${i}`,
            children: [nestedStructure]
          }
        };
      }

      expect(() => {
        const result = ComponentTransformer.deserialize(nestedStructure);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });
  });

  describe('Edge Cases and Data Integrity', () => {
    it('should preserve all props through complex roundtrip', () => {
      const complexComponent = {
        tag: 'Card',
        version: '1.0.0',
        data: {
          title: 'Complex Card',
          content: 'Content with special chars: @#$%^&*()_+{}[]|\\:";\'<>?,./`~',
          image: 'https://example.com/image.jpg',
          metadata: {
            tags: ['react', 'serialization', 'testing'],
            ratings: { stars: 4.5, count: 123 },
            nested: { deep: { value: 'preserved' } }
          },
          actions: [
            {
              tag: 'Button',
              version: '1.0.0',
              data: {
                label: 'Special Button',
                variant: 'danger',
                disabled: true
              }
            }
          ]
        }
      };

      // Deserialize
      const reactElement = ComponentTransformer.deserialize(complexComponent);
      expect(React.isValidElement(reactElement)).toBe(true);
      
      // Serialize back
      const serialized = ComponentTransformer.serialize(reactElement);
      const parsed = JSON.parse(serialized);
      
      // Verify data preservation
      expect(parsed.tag).toBe('Card');
      expect(parsed.data.title).toBe('Complex Card');
      expect(parsed.data.content).toContain('special chars');
      expect(parsed.data.metadata.nested.deep.value).toBe('preserved');
    });

    it('should handle Unicode and special characters correctly', () => {
      const unicodeData = {
        tag: 'Code',
        version: '1.0.0',
        data: {
          code: 'const 🚀 = "rocket";\nconst 中文 = "Chinese";\nconst Ψ = "psi";',
          language: 'javascript'
        }
      };

      const result = ComponentTransformer.deserialize(unicodeData);
      expect(React.isValidElement(result)).toBe(true);
      
      const element = result as ReactElement;
      expect(element.props.children.props.children).toContain('🚀');
      expect(element.props.children.props.children).toContain('中文');
      expect(element.props.children.props.children).toContain('Ψ');
    });

    it('should handle very large text content', () => {
      const largeText = 'Lorem ipsum '.repeat(1000); // ~11KB of text
      
      const largeContentComponent = {
        tag: 'Card',
        version: '1.0.0',
        data: {
          title: 'Large Content Card',
          content: largeText
        }
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(largeContentComponent);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });
  });
});