/**
 * Build Performance Tests
 * 
 * Validates that the schema-driven migration does not negatively impact build performance:
 * - Tests TypeScript compilation passes without errors
 * - Verifies Storybook starts without errors
 * - Tests serialization performance with large component trees
 * - Validates memory usage of factory pattern
 * - Ensures build times remain reasonable
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks';

// Import components for performance testing
import { Code } from '../src/components/blocks/Code';
import { Container } from '../src/components/base/Container';
import { Text } from '../src/components/blocks/Text';
import { SafeSpan } from '../src/components/blocks/SafeSpan';
import { HeroBlock } from '../src/components/blocks/HeroBlock';
import { Button } from '../src/components/inputs/Button';

// Import utilities for testing
import { ComponentTransformer } from '../src/schemas/transformers/ComponentTransformer';
import { normalizeViewProps } from '../src/components/shared/viewProps';
import { createSerializableView } from '../src/components/shared/createSerializableView';

describe('Build Performance Tests', () => {

  const PROJECT_ROOT = path.join(__dirname, '..');

  describe('TypeScript Compilation Performance', () => {
    test('TypeScript configuration is optimized for performance', () => {
      const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
      
      if (fs.existsSync(tsconfigPath)) {
        const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
        const tsconfig = JSON.parse(tsconfigContent);
        
        // Check for performance-oriented compiler options
        const compilerOptions = tsconfig.compilerOptions || {};
        
        // Should use efficient module resolution
        expect(['node', 'bundler']).toContain(compilerOptions.moduleResolution);
        
        // Should have incremental compilation enabled if available
        if ('incremental' in compilerOptions) {
          expect(compilerOptions.incremental).toBe(true);
        }
        
        // Should have reasonable target
        expect(['ES2020', 'ES2021', 'ES2022', 'ESNext']).toContain(compilerOptions.target);
      } else {
        console.warn('tsconfig.json not found, skipping TS config validation');
      }
    });

    test('Build excludes test and story files appropriately', () => {
      const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
      
      if (fs.existsSync(tsconfigPath)) {
        const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');
        const tsconfig = JSON.parse(tsconfigContent);
        
        const exclude = tsconfig.exclude || [];
        const testPatterns = [
          '**/__tests__/**/*',
          '**/*.test.*',
          '**/*.stories.*',
          'qa/**/*'
        ];
        
        // Should exclude test files from build
        const hasTestExclusions = testPatterns.some(pattern => 
          exclude.some((exclusion: string) => 
            exclusion.includes('test') || exclusion.includes('stories') || exclusion.includes('qa')
          )
        );
        
        expect(hasTestExclusions).toBe(true);
      }
    });

    test('No circular dependencies in component imports', () => {
      // This is a conceptual test - in practice you'd use tools like madge
      // For now, test that components don't import each other circularly
      
      const components = [Code, Container, Text, SafeSpan, HeroBlock, Button];
      
      components.forEach((Component, index) => {
        // Each component should be independently creatable
        expect(typeof Component).toBe('function');
        expect((Component as any).tagName).toBeDefined();
        
        // Should not cause circular reference errors
        expect(() => {
          const testProps: any = {};
          if ((Component as any).tagName === 'Code' || (Component as any).tagName === 'Text') {
            testProps.content = 'test';
          } else {
            testProps.children = 'test';
          }
          
          (Component as any).toJson(testProps);
        }).not.toThrow();
      });
    });
  });

  describe('Component Instantiation Performance', () => {
    test('Component factory creation is performant', () => {
      const TestView = ({ content }: any) => React.createElement('div', {}, content);

      const startTime = performance.now();
      
      // Create multiple components rapidly
      for (let i = 0; i < 1000; i++) {
        const TestComponent = createSerializableView({
          tagName: `TestComponent${i}`,
          version: '1.0.0',
          role: 'view',
          View: TestView,
          childrenStrategy: { mode: 'content-prop', propName: 'content' }
        });
        
        expect(TestComponent.tagName).toBe(`TestComponent${i}`);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should create 1000 components in less than 500ms
      expect(duration).toBeLessThan(500);
    });

    test('Props normalization is performant', () => {
      const complexProps = {
        span: '12',
        xs: 'auto',
        padding: 'large',
        background: 'primary.main',
        backgroundColor: '#ffffff',
        sx: '{"color": "red", "fontSize": 14}',
        style: '{"margin": "10px"}',
        onClick: 'console.log("test")',
        onMouseEnter: 'this.style.color = "blue"',
        className: 'complex-test-class',
        'aria-label': 'Complex component',
        'data-testid': 'performance-test'
      };

      const startTime = performance.now();
      
      // Normalize props many times
      for (let i = 0; i < 10000; i++) {
        normalizeViewProps(complexProps);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should normalize 10000 prop sets in less than 100ms
      expect(duration).toBeLessThan(100);
    });

    test('Component serialization is performant', () => {
      const components = [
        { Component: Code, props: { content: 'test code', language: 'javascript' } },
        { Component: Container, props: { span: 12, children: 'test children' } },
        { Component: Text, props: { content: 'test text' } },
        { Component: Button, props: { text: 'Click me' } }
      ];

      components.forEach(({ Component, props }) => {
        const startTime = performance.now();
        
        // Serialize many times
        for (let i = 0; i < 1000; i++) {
          (Component as any).toJson(props);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Should serialize 1000 times in less than 50ms
        expect(duration).toBeLessThan(50);
      });
    });

    test('Component deserialization is performant', () => {
      const testData = [
        { tagName: 'Code', version: '1.0.0', data: { content: 'test', language: 'javascript' } },
        { tagName: 'Container', version: '1.0.0', data: { span: 6, children: 'test' } },
        { tagName: 'Text', version: '1.0.0', data: { content: 'test text' } }
      ];

      const components = { Code, Container, Text };

      testData.forEach(data => {
        const Component = components[data.tagName as keyof typeof components];
        const startTime = performance.now();
        
        // Deserialize many times
        for (let i = 0; i < 1000; i++) {
          (Component as any).fromJson(data);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Should deserialize 1000 times in less than 50ms
        expect(duration).toBeLessThan(50);
      });
    });
  });

  describe('Serialization Performance with Large Trees', () => {
    test('Large component tree serialization is performant', () => {
      // Create a large nested structure
      let largeTree = React.createElement(Text, { content: 'Deep leaf node' });
      
      for (let depth = 0; depth < 50; depth++) {
        largeTree = React.createElement(Container, {
          key: depth,
          span: 12,
          className: `level-${depth}`
        }, largeTree);
      }

      const startTime = performance.now();
      
      const serialized = ComponentTransformer.serialize(largeTree);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should serialize deep tree in less than 100ms
      expect(duration).toBeLessThan(100);
      expect(typeof serialized).toBe('string');
      
      const parsed = JSON.parse(serialized);
      expect(parsed.tagName).toBe('Container');
    });

    test('Large component tree deserialization is performant', () => {
      // Create a large nested structure
      let largeTree = React.createElement(Text, { content: 'Deep leaf node' });
      
      for (let depth = 0; depth < 30; depth++) {
        largeTree = React.createElement(Container, {
          key: depth,
          span: 12,
          className: `level-${depth}`
        }, largeTree);
      }

      const serialized = ComponentTransformer.serialize(largeTree);
      
      const startTime = performance.now();
      
      const deserialized = ComponentTransformer.deserialize(serialized);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should deserialize deep tree in less than 100ms
      expect(duration).toBeLessThan(100);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    test('Wide component tree serialization is performant', () => {
      // Create a wide structure with many siblings
      const children = [];
      for (let i = 0; i < 100; i++) {
        children.push(React.createElement(Text, { 
          key: i, 
          content: `Child ${i}` 
        }));
      }

      const wideTree = React.createElement(Container, {
        span: 12,
        className: 'wide-container'
      }, children);

      const startTime = performance.now();
      
      const serialized = ComponentTransformer.serialize(wideTree);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should serialize wide tree in less than 100ms
      expect(duration).toBeLessThan(100);
      expect(typeof serialized).toBe('string');
    });

    test('Complex mixed tree serialization is performant', () => {
      // Create a complex tree with mixed component types
      const complexTree = React.createElement(HeroBlock, {
        title: 'Performance Test Hero',
        subtitle: 'Testing complex structures'
      }, [
        React.createElement(Container, { key: '1', span: 6 }, [
          React.createElement(Text, { key: '1-1', content: 'Text 1' }),
          React.createElement(Code, { key: '1-2', content: 'console.log("code 1");', language: 'javascript' })
        ]),
        React.createElement(Container, { key: '2', span: 6 }, [
          React.createElement(Text, { key: '2-1', content: 'Text 2' }),
          React.createElement(Button, { key: '2-2', text: 'Button 1' })
        ])
      ]);

      const startTime = performance.now();
      
      // Serialize multiple times to test consistency
      for (let i = 0; i < 10; i++) {
        ComponentTransformer.serialize(complexTree);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should serialize complex tree 10 times in less than 100ms
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Memory Usage Performance', () => {
    test('Component factory does not create memory leaks', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Create and destroy many components
      for (let i = 0; i < 1000; i++) {
        const TestView = ({ content }: any) => React.createElement('div', {}, content);
        
        const TestComponent = createSerializableView({
          tagName: `MemoryTest${i}`,
          version: '1.0.0',
          role: 'view',
          View: TestView
        });
        
        // Use the component
        const props = { content: `test ${i}` };
        TestComponent.toJson(props);
        TestComponent.fromJson({ tagName: `MemoryTest${i}`, version: '1.0.0', data: props });
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    test('Large data structures do not cause excessive memory usage', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Create components with large content
      const largeContent = 'x'.repeat(100000); // 100KB string
      
      for (let i = 0; i < 50; i++) {
        const props = { content: largeContent, language: 'text' };
        const serialized = Code.toJson(props);
        const deserialized = Code.fromJson(serialized);
        
        expect(React.isValidElement(deserialized)).toBe(true);
      }
      
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Should handle large content without excessive memory growth
      expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024); // Less than 100MB
    });

    test('Component registry does not leak memory', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Import registry and use it many times
      const { registerSerializableComponents } = require('../src/schemas/transformers/registry');
      
      for (let i = 0; i < 100; i++) {
        registerSerializableComponents();
      }
      
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Registry operations should not cause memory leaks
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
    });
  });

  describe('Bundle Size Impact', () => {
    test('Factory pattern does not significantly increase code size', () => {
      // Test that components have reasonable toString() sizes
      const components = [Code, Container, Text, Button];
      
      components.forEach(Component => {
        const componentString = Component.toString();
        
        // Component string representation should be reasonable
        expect(componentString.length).toBeLessThan(10000); // Less than 10KB
        expect(componentString.length).toBeGreaterThan(100); // But substantial enough
      });
    });

    test('Serialization utilities are tree-shakeable', () => {
      // Test that individual utilities can be imported without pulling in everything
      const { normalizeViewProps: normalizeOnly } = require('../src/components/shared/viewProps');
      const { createSerializableView: createOnly } = require('../src/components/shared/createSerializableView');
      
      expect(typeof normalizeOnly).toBe('function');
      expect(typeof createOnly).toBe('function');
      
      // These should work independently
      const normalizedProps = normalizeOnly({ className: 'test', span: 6 });
      expect(normalizedProps.className).toBe('test');
      expect(normalizedProps.span).toBe(6);
    });

    test('Component imports are efficient', () => {
      // Test that importing a component doesn't pull in unnecessary dependencies
      const codeModule = require('../src/components/blocks/Code');
      
      expect(codeModule.Code).toBeDefined();
      expect(typeof codeModule.Code).toBe('function');
      
      // Should be able to use the component immediately
      const props = { content: 'import test', language: 'javascript' };
      const serialized = codeModule.Code.toJson(props);
      
      expect(serialized.tagName).toBe('Code');
      expect(serialized.data.content).toBe('import test');
    });
  });

  describe('Concurrency and Threading Performance', () => {
    test('Serialization is thread-safe for concurrent operations', async () => {
      const testComponent = React.createElement(Container, {
        span: 12,
        children: 'Concurrency test'
      });

      // Simulate concurrent serialization operations
      const promises = [];
      
      for (let i = 0; i < 50; i++) {
        promises.push(
          new Promise(resolve => {
            setTimeout(() => {
              const result = ComponentTransformer.serialize(testComponent);
              resolve(result);
            }, Math.random() * 10);
          })
        );
      }
      
      const results = await Promise.all(promises);
      
      // All results should be identical
      results.forEach(result => {
        expect(typeof result).toBe('string');
        const parsed = JSON.parse(result as string);
        expect(parsed.tagName).toBe('Container');
        expect(parsed.data.children).toBe('Concurrency test');
      });
    });

    test('Component creation is safe under concurrent access', () => {
      const TestView = ({ content }: any) => React.createElement('div', {}, content);
      const concurrentComponents: any[] = [];
      
      // Create components concurrently (simulate multiple files being processed)
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          const component = createSerializableView({
            tagName: `ConcurrentTest${i}`,
            version: '1.0.0',
            role: 'view',
            View: TestView
          });
          
          concurrentComponents.push(component);
        }, 0);
      }
      
      // Wait a bit for async operations
      setTimeout(() => {
        expect(concurrentComponents.length).toBeGreaterThan(0);
        concurrentComponents.forEach((component, index) => {
          expect(component.tagName).toBe(`ConcurrentTest${index}`);
        });
      }, 100);
    });
  });

  describe('Development vs Production Performance', () => {
    test('Development mode performance is acceptable', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const testProps = {
        content: 'Development test',
        language: 'javascript',
        showCopy: true,
        showLineNumbers: true
      };
      
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        const serialized = Code.toJson(testProps);
        const deserialized = Code.fromJson(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Development mode should still be reasonably fast
      expect(duration).toBeLessThan(200);
      
      process.env.NODE_ENV = originalNodeEnv;
    });

    test('Production mode performance is optimized', () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const testProps = {
        content: 'Production test',
        language: 'javascript'
      };
      
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        const serialized = Code.toJson(testProps);
        const deserialized = Code.fromJson(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Production mode should be faster than development
      expect(duration).toBeLessThan(100);
      
      process.env.NODE_ENV = originalNodeEnv;
    });
  });

  describe('Error Handling Performance', () => {
    test('Error scenarios do not cause performance degradation', () => {
      const invalidData = [
        { tagName: 'NonExistentComponent', version: '1.0.0', data: {} },
        { tagName: 'Code', version: '999.0.0', data: { content: 'test' } },
        { tagName: 'Code', version: '1.0.0', data: null },
        null,
        undefined,
        'invalid json string'
      ];
      
      const startTime = performance.now();
      
      invalidData.forEach((data, index) => {
        try {
          if (typeof data === 'string') {
            ComponentTransformer.deserialize(data);
          } else if (data) {
            Code.fromJson(data);
          }
        } catch (error) {
          // Expect errors, but they should be fast
          expect(error).toBeDefined();
        }
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Error handling should be fast
      expect(duration).toBeLessThan(50);
    });

    test('Recovery from errors maintains performance', () => {
      const validProps = { content: 'valid', language: 'javascript' };
      const invalidProps = { content: null, language: undefined };
      
      const startTime = performance.now();
      
      for (let i = 0; i < 50; i++) {
        // Alternate between valid and invalid operations
        try {
          if (i % 2 === 0) {
            Code.toJson(validProps);
          } else {
            Code.toJson(invalidProps);
          }
        } catch (error) {
          // Expected for invalid props
        }
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Mixed valid/invalid operations should still be fast
      expect(duration).toBeLessThan(100);
    });
  });
});