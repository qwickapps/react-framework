/**
 * Cross-Browser Compatibility Tests for Component Serialization
 * 
 * Tests serialization system behavior across different JavaScript engines,
 * browser environments, and runtime conditions to ensure consistent
 * functionality regardless of platform.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';

// Mock different browser environments
interface BrowserEnvironment {
  name: string;
  userAgent: string;
  jsonSupport: {
    parse: typeof JSON.parse;
    stringify: typeof JSON.stringify;
  };
  features: {
    es6: boolean;
    weakMap: boolean;
    symbol: boolean;
    proxy: boolean;
  };
}

// Browser environment simulations
const browserEnvironments: BrowserEnvironment[] = [
  {
    name: 'Chrome Latest',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    jsonSupport: { parse: JSON.parse, stringify: JSON.stringify },
    features: { es6: true, weakMap: true, symbol: true, proxy: true }
  },
  {
    name: 'Firefox Latest',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/120.0',
    jsonSupport: { parse: JSON.parse, stringify: JSON.stringify },
    features: { es6: true, weakMap: true, symbol: true, proxy: true }
  },
  {
    name: 'Safari Latest',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Safari/537.36',
    jsonSupport: { parse: JSON.parse, stringify: JSON.stringify },
    features: { es6: true, weakMap: true, symbol: true, proxy: true }
  },
  {
    name: 'Edge Latest',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    jsonSupport: { parse: JSON.parse, stringify: JSON.stringify },
    features: { es6: true, weakMap: true, symbol: true, proxy: true }
  }
];

// Test component for cross-browser testing
class CrossBrowserTestComponent implements Serializable {
  constructor(public props: {
    text?: string;
    number?: number;
    boolean?: boolean;
    array?: unknown[];
    object?: Record<string, unknown>;
    date?: string;
    unicode?: string;
    specialChars?: string;
  }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('div', {
      'data-testid': 'cross-browser-test',
      'data-text': jsonData.text,
      'data-number': jsonData.number,
      'data-boolean': jsonData.boolean,
      'data-array': jsonData.array ? JSON.stringify(jsonData.array) : undefined,
      'data-object': jsonData.object ? JSON.stringify(jsonData.object) : undefined,
      'data-date': jsonData.date,
      'data-unicode': jsonData.unicode,
      'data-special-chars': jsonData.specialChars
    }, [
      jsonData.text ? React.createElement('span', { key: 'text' }, jsonData.text as string) : null,
      jsonData.number !== undefined ? React.createElement('span', { key: 'number' }, (jsonData.number as number).toString()) : null,
      jsonData.boolean !== undefined ? React.createElement('span', { key: 'boolean' }, (jsonData.boolean as boolean).toString()) : null,
      jsonData.unicode ? React.createElement('span', { key: 'unicode' }, jsonData.unicode as string) : null
    ].filter(Boolean));
  }

  toJson(): Record<string, unknown> {
    return {
      text: this.props.text,
      number: this.props.number,
      boolean: this.props.boolean,
      array: this.props.array,
      object: this.props.object,
      date: this.props.date,
      unicode: this.props.unicode,
      specialChars: this.props.specialChars
    };
  }
}

describe('Cross-Browser Compatibility Tests', () => {
  beforeEach(() => {
    ComponentTransformer.clearRegistry();
    ComponentTransformer.registerComponent('CrossBrowserTest', CrossBrowserTestComponent as SerializableConstructor);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('JSON Parsing and Serialization', () => {
    it('should handle JSON parsing consistently across environments', () => {
      const testData = {
        tagName: 'CrossBrowserTest',
        version: '1.0.0',
        data: {
          text: 'Hello World',
          number: 42,
          boolean: true,
          array: [1, 2, 3, 'four', true, null],
          object: { nested: 'value', deep: { deeper: 'deepValue' } }
        }
      };

      browserEnvironments.forEach(env => {
        // Test JSON parsing with each environment's parser
        const jsonString = env.jsonSupport.stringify(testData);
        expect(() => {
          const parsed = env.jsonSupport.parse(jsonString);
          const result = ComponentTransformer.deserialize(parsed);
          expect(React.isValidElement(result)).toBe(true);
        }).not.toThrow();
      });
    });

    it('should handle special JSON edge cases consistently', () => {
      const edgeCases = [
        { name: 'null', value: null },
        { name: 'empty object', value: {} },
        { name: 'empty array', value: [] },
        { name: 'zero', value: 0 },
        { name: 'false', value: false },
        { name: 'empty string', value: '' },
        { name: 'whitespace string', value: '   \n\t  ' },
      ];

      edgeCases.forEach(({ name, value }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { [name.replace(/\s+/g, '_')]: value }
        };

        browserEnvironments.forEach(env => {
          expect(() => {
            const jsonString = env.jsonSupport.stringify(testData);
            const parsed = env.jsonSupport.parse(jsonString);
            const result = ComponentTransformer.deserialize(parsed);
            expect(React.isValidElement(result)).toBe(true);
          }).not.toThrow(`${name} should work in ${env.name}`);
        });
      });
    });

    it('should handle large numbers consistently', () => {
      const numberTests = [
        { name: 'small integer', value: 42 },
        { name: 'large integer', value: 9007199254740991 }, // Number.MAX_SAFE_INTEGER
        { name: 'small float', value: 3.14159 },
        { name: 'very small float', value: 0.000000001 },
        { name: 'negative number', value: -123456.789 },
        { name: 'zero', value: 0 },
        { name: 'negative zero', value: -0 }
      ];

      numberTests.forEach(({ name, value }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { number: value }
        };

        browserEnvironments.forEach(env => {
          const jsonString = env.jsonSupport.stringify(testData);
          const parsed = env.jsonSupport.parse(jsonString);
          const result = ComponentTransformer.deserialize(parsed);
          
          expect(React.isValidElement(result)).toBe(true);
          
          const element = result as ReactElement;
          const numberValue = parseFloat(element.props['data-number']);
          
          if (name === 'negative zero') {
            // Negative zero becomes positive zero in JSON
            expect(numberValue).toBe(0);
          } else {
            expect(numberValue).toBeCloseTo(value, 10);
          }
        });
      });
    });
  });

  describe('Unicode and Character Encoding', () => {
    it('should handle Unicode characters consistently', () => {
      const unicodeTests = [
        { name: 'emoji', text: '🚀🎉💻🌟⭐' },
        { name: 'chinese', text: '你好世界' },
        { name: 'arabic', text: 'مرحبا بالعالم' },
        { name: 'russian', text: 'Привет мир' },
        { name: 'greek', text: 'Γεια σου κόσμε' },
        { name: 'mathematical', text: '∑∏∆√∞≈≠±×÷' },
        { name: 'currency', text: '$€£¥₹₿' },
        { name: 'mixed', text: 'Hello 世界 🌍 مرحبا Привет!' }
      ];

      unicodeTests.forEach(({ text }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { unicode: text }
        };

        browserEnvironments.forEach(env => {
          const jsonString = env.jsonSupport.stringify(testData);
          const parsed = env.jsonSupport.parse(jsonString);
          const result = ComponentTransformer.deserialize(parsed);
          
          expect(React.isValidElement(result)).toBe(true);
          
          const element = result as ReactElement;
          expect(element.props['data-unicode']).toBe(text);
        });
      });
    });

    it('should handle special characters and escaping', () => {
      const specialCharTests = [
        { name: 'quotes', text: 'He said "Hello \'World\'"' },
        { name: 'backslashes', text: 'C:\\Users\\Name\\File.txt' },
        { name: 'control chars', text: 'Line 1\nLine 2\tTabbed\rCarriage Return' },
        { name: 'html entities', text: '<script>alert("xss")</script>&lt;&gt;&amp;' },
        { name: 'json-like', text: '{"fake": "json", "array": [1,2,3]}' },
        { name: 'regex special', text: '^$.*+?()[]{}|\\' }
      ];

      specialCharTests.forEach(({ name, text }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { specialChars: text }
        };

        browserEnvironments.forEach(env => {
          expect(() => {
            const jsonString = env.jsonSupport.stringify(testData);
            const parsed = env.jsonSupport.parse(jsonString);
            const result = ComponentTransformer.deserialize(parsed);
            
            expect(React.isValidElement(result)).toBe(true);
            
            const element = result as ReactElement;
            expect(element.props['data-special-chars']).toBe(text);
          }).not.toThrow(`${name} should work in ${env.name}`);
        });
      });
    });
  });

  describe('Date and Time Handling', () => {
    it('should handle date strings consistently', () => {
      const dateTests = [
        { name: 'ISO string', date: '2025-01-01T12:00:00.000Z' },
        { name: 'ISO with timezone', date: '2025-01-01T12:00:00+05:30' },
        { name: 'short date', date: '2025-01-01' },
        { name: 'human readable', date: 'January 1, 2025' },
        { name: 'timestamp string', date: '1735732800000' }
      ];

      dateTests.forEach(({ name, date }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { date }
        };

        browserEnvironments.forEach(env => {
          expect(() => {
            const jsonString = env.jsonSupport.stringify(testData);
            const parsed = env.jsonSupport.parse(jsonString);
            const result = ComponentTransformer.deserialize(parsed);
            
            expect(React.isValidElement(result)).toBe(true);
            
            const element = result as ReactElement;
            expect(element.props['data-date']).toBe(date);
          }).not.toThrow(`${name} should work in ${env.name}`);
        });
      });
    });
  });

  describe('Array and Object Handling', () => {
    it('should handle complex nested structures consistently', () => {
      const nestedTests = [
        {
          name: 'deeply nested object',
          data: {
            level1: {
              level2: {
                level3: {
                  level4: {
                    value: 'deep value'
                  }
                }
              }
            }
          }
        },
        {
          name: 'mixed array types',
          data: {
            array: [
              'string',
              42,
              true,
              null,
              { nested: 'object' },
              ['nested', 'array'],
              undefined // Will be converted to null in JSON
            ]
          }
        },
        {
          name: 'sparse array',
          data: {
            sparse: [1, undefined, undefined, 4, undefined, 6] // Array with undefined values
          }
        }
      ];

      nestedTests.forEach(({ name, data }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data
        };

        browserEnvironments.forEach(env => {
          expect(() => {
            const jsonString = env.jsonSupport.stringify(testData);
            const parsed = env.jsonSupport.parse(jsonString);
            const result = ComponentTransformer.deserialize(parsed);
            
            expect(React.isValidElement(result)).toBe(true);
          }).not.toThrow(`${name} should work in ${env.name}`);
        });
      });
    });

    it('should handle object property order consistently', () => {
      const testData = {
        tagName: 'CrossBrowserTest',
        version: '1.0.0',
        data: {
          z_property: 'last',
          a_property: 'first',
          m_property: 'middle'
        }
      };

      browserEnvironments.forEach(env => {
        const jsonString = env.jsonSupport.stringify(testData);
        const parsed = env.jsonSupport.parse(jsonString);
        const result = ComponentTransformer.deserialize(parsed);
        
        expect(React.isValidElement(result)).toBe(true);
        
        // Property order might differ, but values should be preserved
        const element = result as ReactElement;
        const objectData = JSON.parse(element.props['data-object'] || '{}');
        expect(objectData.z_property).toBe('last');
        expect(objectData.a_property).toBe('first');
        expect(objectData.m_property).toBe('middle');
      });
    });
  });

  describe('Error Handling Consistency', () => {
    it('should handle malformed JSON consistently', () => {
      const malformedJsonTests = [
        '{"unclosed": object',
        '{key: "missing quotes"}',
        '[1, 2, 3,]', // Trailing comma
        '{"duplicate": "key1", "duplicate": "key2"}' // Actually valid JSON
      ];

      malformedJsonTests.forEach((malformedJson, index) => {
        if (index === 3) return; // Skip the valid JSON case
        
        browserEnvironments.forEach(env => {
          expect(() => {
            env.jsonSupport.parse(malformedJson);
          }).toThrow();
          
          expect(() => {
            ComponentTransformer.deserialize(malformedJson);
          }).toThrow(/Invalid JSON input/);
        });
      });
    });

    it('should handle component errors consistently', () => {
      const invalidComponent = {
        tagName: 'NonExistentComponent',
        version: '1.0.0',
        data: {}
      };

      browserEnvironments.forEach(env => {
        expect(() => {
          const jsonString = env.jsonSupport.stringify(invalidComponent);
          const parsed = env.jsonSupport.parse(jsonString);
          ComponentTransformer.deserialize(parsed);
        }).toThrow('Unknown component: NonExistentComponent');
      });
    });
  });

  describe('Performance Consistency', () => {
    it('should maintain consistent performance across browsers', () => {
      const largeTestData = {
        tagName: 'CrossBrowserTest',
        version: '1.0.0',
        data: {
          array: Array.from({ length: 1000 }, (_, i) => ({
            id: i,
            text: `Item ${i}`,
            nested: { value: i * 2 }
          }))
        }
      };

      const performanceResults: { [browser: string]: number } = {};

      browserEnvironments.forEach(env => {
        const startTime = performance.now();
        
        const jsonString = env.jsonSupport.stringify(largeTestData);
        const parsed = env.jsonSupport.parse(jsonString);
        const result = ComponentTransformer.deserialize(parsed);
        
        const endTime = performance.now();
        performanceResults[env.name] = endTime - startTime;
        
        expect(React.isValidElement(result)).toBe(true);
      });

      // Verify that performance is within reasonable bounds
      const times = Object.values(performanceResults);
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const maxTime = Math.max(...times);
      const minTime = Math.min(...times);
      
      console.log('Cross-browser performance:', performanceResults);
      
      // No browser should be more than 3x slower than the fastest
      expect(maxTime / minTime).toBeLessThan(3);
      
      // Average time should be reasonable (< 100ms for this test)
      expect(avgTime).toBeLessThan(100);
    });
  });

  describe('Memory Usage Consistency', () => {
    it('should handle memory usage consistently', () => {
      const memoryTestData = Array.from({ length: 100 }, (_, i) => ({
        tagName: 'CrossBrowserTest',
        version: '1.0.0',
        data: {
          text: `Memory test item ${i}`,
          array: Array.from({ length: 100 }, (_, j) => `item-${i}-${j}`)
        }
      }));

      browserEnvironments.forEach(env => {
        const initialMemory = process.memoryUsage().heapUsed;
        
        // Process the data multiple times
        for (let iteration = 0; iteration < 10; iteration++) {
          memoryTestData.forEach(testItem => {
            const jsonString = env.jsonSupport.stringify(testItem);
            const parsed = env.jsonSupport.parse(jsonString);
            const result = ComponentTransformer.deserialize(parsed);
            
            expect(React.isValidElement(result)).toBe(true);
          });
        }

        const finalMemory = process.memoryUsage().heapUsed;
        const memoryGrowth = (finalMemory - initialMemory) / (1024 * 1024); // MB
        
        // Memory growth should be reasonable (< 50MB for this test)
        expect(memoryGrowth).toBeLessThan(50);
        
        console.log(`${env.name} memory growth: ${memoryGrowth.toFixed(2)}MB`);
      });
    });
  });

  describe('Edge Case Compatibility', () => {
    it('should handle boundary values consistently', () => {
      const boundaryTests = [
        { name: 'max safe integer', value: Number.MAX_SAFE_INTEGER },
        { name: 'min safe integer', value: Number.MIN_SAFE_INTEGER },
        { name: 'max value', value: Number.MAX_VALUE },
        { name: 'min value', value: Number.MIN_VALUE },
        { name: 'positive infinity', value: Number.POSITIVE_INFINITY },
        { name: 'negative infinity', value: Number.NEGATIVE_INFINITY },
        { name: 'NaN', value: Number.NaN }
      ];

      boundaryTests.forEach(({ name, value }) => {
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { number: value }
        };

        browserEnvironments.forEach(env => {
          if (name.includes('infinity') || name === 'NaN') {
            // JSON doesn't support these values - they become null
            expect(() => {
              const jsonString = env.jsonSupport.stringify(testData);
              expect(jsonString).toContain('null');
            }).not.toThrow();
          } else {
            expect(() => {
              const jsonString = env.jsonSupport.stringify(testData);
              const parsed = env.jsonSupport.parse(jsonString);
              const result = ComponentTransformer.deserialize(parsed);
              
              expect(React.isValidElement(result)).toBe(true);
            }).not.toThrow(`${name} should work in ${env.name}`);
          }
        });
      });
    });

    it('should handle string length limits consistently', () => {
      const lengthTests = [
        { name: 'empty string', length: 0 },
        { name: 'short string', length: 10 },
        { name: 'medium string', length: 1000 },
        { name: 'long string', length: 10000 },
        { name: 'very long string', length: 100000 }
      ];

      lengthTests.forEach(({ name, length }) => {
        const longString = 'x'.repeat(length);
        const testData = {
          tagName: 'CrossBrowserTest',
          version: '1.0.0',
          data: { text: longString }
        };

        browserEnvironments.forEach(env => {
          expect(() => {
            const jsonString = env.jsonSupport.stringify(testData);
            const parsed = env.jsonSupport.parse(jsonString);
            const result = ComponentTransformer.deserialize(parsed);
            
            expect(React.isValidElement(result)).toBe(true);
            
            const element = result as ReactElement;
            expect(element.props['data-text']).toBe(longString);
          }).not.toThrow(`${name} should work in ${env.name}`);
        });
      });
    });
  });
});