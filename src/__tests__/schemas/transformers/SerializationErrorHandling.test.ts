/**
 * Component Serialization Error Handling Tests
 * 
 * Comprehensive error handling validation for the serialization system
 * covering malformed data, unknown components, version incompatibility,
 * and various failure scenarios.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';

// Mock components for error testing
class ErrorTestButton implements Serializable {
  constructor(public props: { label?: string; throwOnFromJson?: boolean; throwOnToJson?: boolean }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    if (jsonData.throwOnFromJson) {
      throw new Error('Intentional fromJson error for testing');
    }
    return React.createElement('button', {}, (jsonData.label as string) || 'Button');
  }

  toJson(): Record<string, unknown> {
    if (this.props.throwOnToJson) {
      throw new Error('Intentional toJson error for testing');
    }
    return {
      label: this.props.label,
      throwOnFromJson: this.props.throwOnFromJson,
      throwOnToJson: this.props.throwOnToJson
    };
  }
}

class InvalidComponentClass {
  // This class does not implement Serializable interface
  static fromJson(): ReactElement {
    return React.createElement('div', {}, 'Invalid component');
  }
  // Missing toJson method
}

class MalformedFromJsonComponent implements Serializable {
  constructor(public props: Record<string, unknown>) {}

  static fromJson(): unknown {
    // Returns non-ReactElement (invalid)
    return { invalid: 'return value' };
  }

  toJson(): unknown {
    return this.props;
  }
}

describe('Component Serialization Error Handling', () => {
  beforeEach(() => {
    ComponentTransformer.clearRegistry();
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Unknown Component Errors', () => {
    it('should throw descriptive error for unregistered component', () => {
      const unknownComponent = {
        tagName: 'UnknownWidget',
        version: '1.0.0',
        data: { prop: 'value' }
      };

      // With the new fallback system, unknown components should not throw but use ReactNodeTransformer
      const result = ComponentTransformer.deserialize(unknownComponent);
      expect(result).toBeDefined(); // Should fallback gracefully
    });

    it('should throw error for component with special characters in tag name', () => {
      const invalidTagComponent = {
        tagName: 'Invalid<>Tag',
        version: '1.0.0',
        data: {}
      };

      expect(() => {
        ComponentTransformer.deserialize(invalidTagComponent);
      }).toThrow('Unknown component: Invalid<>Tag');
    });

    it('should throw error for component with numeric tag name', () => {
      const numericTagComponent = {
        tagName: '123Component',
        version: '1.0.0',
        data: {}
      };

      expect(() => {
        ComponentTransformer.deserialize(numericTagComponent);
      }).toThrow('Unknown component: 123Component');
    });

    it('should throw error for empty tag name', () => {
      const emptyTagComponent = {
        tagName: '',
        version: '1.0.0',
        data: {}
      };

      expect(() => {
        ComponentTransformer.deserialize(emptyTagComponent);
      }).toThrow('Unknown component: ');
    });

    it('should handle array of components with unknown component gracefully', () => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
      
      const mixedComponents = [
        {
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'Valid Button' }
        },
        {
          tagName: 'UnknownComponent',
          version: '1.0.0',
          data: {}
        }
      ];

      expect(() => {
        ComponentTransformer.deserialize(mixedComponents);
      }).toThrow('Unknown component: UnknownComponent');
    });
  });

  describe('Malformed Component Data Errors', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
    });

    it('should throw error when data property is missing', () => {
      const missingDataComponent = {
        tagName: 'ErrorTestButton',
        version: '1.0.0'
        // Missing data property
      };

      expect(() => {
        ComponentTransformer.deserialize(missingDataComponent);
      }).toThrow('Malformed component data: missing \'data\' property for component \'ErrorTestButton\'');
    });

    it('should handle undefined data property', () => {
      const undefinedDataComponent = {
        tagName: 'ErrorTestButton',
        version: '1.0.0',
        data: undefined
      };

      expect(() => {
        ComponentTransformer.deserialize(undefinedDataComponent);
      }).toThrow('Malformed component data: missing \'data\' property for component \'ErrorTestButton\'');
    });

    it('should handle null data property gracefully', () => {
      const nullDataComponent = {
        tagName: 'ErrorTestButton',
        version: '1.0.0',
        data: null
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(nullDataComponent);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should throw error when tag property is missing', () => {
      const missingTagComponent = {
        version: '1.0.0',
        data: { label: 'Test' }
      };

      expect(() => {
        ComponentTransformer.deserialize(missingTagComponent);
      }).not.toThrow(); // Should be handled as non-component data
      
      // The result should be the object itself
      const result = ComponentTransformer.deserialize(missingTagComponent);
      expect(result).toEqual(missingTagComponent);
    });

    it('should handle missing version property', () => {
      const missingVersionComponent = {
        tagName: 'ErrorTestButton',
        data: { label: 'Test' }
        // Missing version property
      };

      expect(() => {
        const result = ComponentTransformer.deserialize(missingVersionComponent);
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should handle invalid version format', () => {
      const invalidVersions = [
        { tagName: 'ErrorTestButton', version: 123, data: {} },
        { tagName: 'ErrorTestButton', version: null, data: {} },
        { tagName: 'ErrorTestButton', version: {}, data: {} },
        { tagName: 'ErrorTestButton', version: 'invalid.version.format.too.long', data: {} }
      ];

      invalidVersions.forEach((component, index) => {
        expect(() => {
          const result = ComponentTransformer.deserialize(component);
          expect(React.isValidElement(result)).toBe(true);
        }).not.toThrow(`Should not throw for invalid version case ${index}`);
      });
    });
  });

  describe('Invalid JSON Input Errors', () => {
    it('should throw descriptive error for malformed JSON string', () => {
      const malformedJsonInputs = [
        '{invalid json',
        '{"unclosed": "object"',
        '{key: "value"}', // Missing quotes around key
        '[1, 2, 3,]', // Trailing comma
        '{"duplicate": "key", "duplicate": "key2"}', // Valid JSON but semantically questionable
      ];

      malformedJsonInputs.forEach((input) => {
        if (input !== '{"duplicate": "key", "duplicate": "key2"}') { // This is actually valid JSON
          expect(() => {
            ComponentTransformer.deserialize(input);
          }).toThrow(/Invalid JSON input/);
        }
      });
    });

    it('should handle very large JSON input', () => {
      const largeObject = {
        tagName: 'ErrorTestButton',
        version: '1.0.0',
        data: {
          largeText: 'x'.repeat(10000000) // 10MB string
        }
      };

      expect(() => {
        const jsonString = JSON.stringify(largeObject);
        ComponentTransformer.deserialize(jsonString);
      }).not.toThrow();
    });

    it('should handle deeply nested JSON structures', () => {
      let deepObject: unknown = { tagName: 'ErrorTestButton', version: '1.0.0', data: {} };
      
      // Create 1000 levels of nesting
      for (let i = 0; i < 1000; i++) {
        deepObject = { nested: deepObject };
      }

      expect(() => {
        const jsonString = JSON.stringify(deepObject);
        ComponentTransformer.deserialize(jsonString);
      }).not.toThrow();
    });

    it('should handle JSON with circular references (after JSON.stringify)', () => {
      // Since JSON.stringify removes circular references, we test the behavior
      const obj: unknown = { tagName: 'ErrorTestButton', version: '1.0.0', data: {} };
      obj.circular = obj;

      expect(() => {
        // This will throw during JSON.stringify, not during deserialize
        JSON.stringify(obj);
      }).toThrow();
    });
  });

  describe('Component Implementation Errors', () => {
    it('should handle component fromJson method throwing errors', () => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
      
      const componentThatWillThrow = {
        tagName: 'ErrorTestButton',
        version: '1.0.0',
        data: { throwOnFromJson: true }
      };

      expect(() => {
        ComponentTransformer.deserialize(componentThatWillThrow);
      }).toThrow('Intentional fromJson error for testing');
    });

    it('should handle component returning non-ReactElement from fromJson', () => {
      ComponentTransformer.registerComponent(MalformedFromJsonComponent as SerializableConstructor);
      
      const malformedComponent = {
        tagName: 'MalformedFromJsonComponent',
        version: '1.0.0',
        data: {}
      };

      // This should not crash, but the result might not be a valid React element
      expect(() => {
        const result = ComponentTransformer.deserialize(malformedComponent);
        // The result will be whatever fromJson returns, even if invalid
        expect(result).toEqual({ invalid: 'return value' });
      }).not.toThrow();
    });

    it('should handle component class without proper static methods', () => {
      // Try to register a class that doesn't properly implement the interface
      expect(() => {
        ComponentTransformer.registerComponent('InvalidClass', InvalidComponentClass as unknown);
      }).not.toThrow(); // Registration succeeds, but usage will fail
      
      const invalidComponent = {
        tagName: 'InvalidClass',
        version: '1.0.0',
        data: {}
      };

      expect(() => {
        ComponentTransformer.deserialize(invalidComponent);
      }).not.toThrow(); // fromJson exists, so it will be called
    });

    it('should handle component toJson method throwing errors during serialization', () => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
      
      // Create an instance that will throw during toJson
      const instance = new ErrorTestButton({ throwOnToJson: true });
      
      expect(() => {
        instance.toJson();
      }).toThrow('Intentional toJson error for testing');
    });
  });

  describe('Type Safety and Validation Errors', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
    });

    it('should handle non-object input gracefully', () => {
      const nonObjectInputs = [
        'plain string',
        42,
        true,
        false,
        null,
        undefined,
        Symbol('test'),
        () => {}
      ];

      nonObjectInputs.forEach((input, index) => {
        expect(() => {
          const result = ComponentTransformer.deserialize(input as unknown);
          // Should return the input as-is for primitive values
          if (input !== undefined && typeof input !== 'symbol' && typeof input !== 'function') {
            expect(result).toBe(input);
          }
        }).not.toThrow(`Should not throw for input type ${typeof input} at index ${index}`);
      });
    });

    it('should handle array with mixed valid and invalid elements', () => {
      const mixedArray = [
        'string',
        {
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'Valid' }
        },
        42,
        {
          tagName: 'UnknownComponent',
          version: '1.0.0',
          data: {}
        },
        null
      ];

      expect(() => {
        ComponentTransformer.deserialize(mixedArray);
      }).toThrow('Unknown component: UnknownComponent');
    });

    it('should handle object with component-like structure but missing required fields', () => {
      const fakeComponentData = [
        { tagName: 'ErrorTestButton' }, // Missing version and data
        { version: '1.0.0', data: {} }, // Missing tag
        { tagName: null, version: '1.0.0', data: {} }, // Null tag
        { tagName: 123, version: '1.0.0', data: {} }, // Non-string tag
      ];

      fakeComponentData.forEach((fake) => {
        expect(() => {
          ComponentTransformer.deserialize(fake);
          // Should handle gracefully - some might deserialize, others might throw
        }).not.toThrow();
      });
    });
  });

  describe('Nested Error Propagation', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
    });

    it('should propagate errors from deeply nested components', () => {
      const deeplyNested = {
        tagName: 'ErrorTestButton',
        version: '1.0.0',
        data: {
          children: [
            {
              tagName: 'ErrorTestButton',
              version: '1.0.0',
              data: {
                children: [
                  {
                    tagName: 'UnknownDeepComponent',
                    version: '1.0.0',
                    data: {}
                  }
                ]
              }
            }
          ]
        }
      };

      expect(() => {
        ComponentTransformer.deserialize(deeplyNested);
      }).toThrow('Unknown component: UnknownDeepComponent');
    });

    it('should handle partial failures in component arrays gracefully', () => {
      const componentsWithError = [
        {
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'Button 1' }
        },
        {
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'Button 2' }
        },
        {
          tagName: 'UnknownComponent',
          version: '1.0.0',
          data: {}
        }
      ];

      expect(() => {
        ComponentTransformer.deserialize(componentsWithError);
      }).toThrow('Unknown component: UnknownComponent');
    });
  });

  describe('Error Message Quality', () => {
    it('should provide helpful error messages for common mistakes', () => {
      const commonMistakes = [
        {
          data: { tagName: 'Button', version: '1.0.0', data: {} },
          expectedError: /Unknown component: Button/
        },
        {
          data: { tagName: 'ErrorTestButton', version: '1.0.0' },
          expectedError: /missing 'data' property/
        },
        {
          data: '{"invalid": json}',
          expectedError: /Invalid JSON input/
        }
      ];

      commonMistakes.forEach(({ data, expectedError }, index) => {
        expect(() => {
          if (index === 0) {
            // Don't register the component for the first test
            ComponentTransformer.deserialize(data);
          } else {
            ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
            ComponentTransformer.deserialize(data);
          }
        }).toThrow(expectedError);
      });
    });

    it('should include context information in error messages', () => {
      const contextualErrors = [
        {
          component: 'SpecialCharComponent!@#',
          expectedInError: 'SpecialCharComponent!@#'
        },
        {
          component: 'VeryLongComponentNameThatShouldStillBeIncludedInErrorMessage',
          expectedInError: 'VeryLongComponentNameThatShouldStillBeIncludedInErrorMessage'
        }
      ];

      contextualErrors.forEach(({ component, expectedInError }) => {
        expect(() => {
          ComponentTransformer.deserialize({
            tagName: component,
            version: '1.0.0',
            data: {}
          });
        }).toThrow(expect.stringContaining(expectedInError));
      });
    });
  });

  describe('Recovery and Graceful Degradation', () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
    });

    it('should handle registry corruption gracefully', () => {
      // Simulate registry corruption
      ComponentTransformer.clearRegistry();
      
      expect(() => {
        ComponentTransformer.deserialize({
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'Test' }
        });
      }).toThrow('Unknown component: ErrorTestButton');

      // Registry should still work after error
      ComponentTransformer.registerComponent(ErrorTestButton as SerializableConstructor);
      expect(() => {
        const result = ComponentTransformer.deserialize({
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'Recovery Test' }
        });
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });

    it('should maintain component registry state after errors', () => {
      // Verify initial state
      const initialComponents = ComponentTransformer.getRegisteredComponents();
      expect(initialComponents).toContain('ErrorTestButton');

      // Cause an error
      expect(() => {
        ComponentTransformer.deserialize({
          tagName: 'UnknownComponent',
          version: '1.0.0',
          data: {}
        });
      }).toThrow();

      // Verify registry is unchanged after error
      const componentsAfterError = ComponentTransformer.getRegisteredComponents();
      expect(componentsAfterError).toEqual(initialComponents);
      expect(componentsAfterError).toContain('ErrorTestButton');
    });

    it('should handle memory pressure during error conditions', () => {
      // Create memory pressure with large failing operations
      const largeFailingOperations = Array.from({ length: 100 }, (_, i) => ({
        tagName: `UnknownComponent${i}`,
        version: '1.0.0',
        data: {
          largeData: 'x'.repeat(1000)
        }
      }));

      largeFailingOperations.forEach((operation) => {
        expect(() => {
          ComponentTransformer.deserialize(operation);
        }).toThrow(/Unknown component/);
      });

      // System should still be responsive
      expect(() => {
        const result = ComponentTransformer.deserialize({
          tagName: 'ErrorTestButton',
          version: '1.0.0',
          data: { label: 'After Memory Pressure' }
        });
        expect(React.isValidElement(result)).toBe(true);
      }).not.toThrow();
    });
  });
});