/**
 * Component Serialization Performance Tests
 * 
 * Performance benchmarking and validation for the serialization system
 * covering memory usage, speed, and scalability under various loads.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { ReactElement } from 'react';
import { ComponentTransformer } from '../ComponentTransformer';
import { Serializable, SerializableConstructor } from '../../types/Serializable';

// Performance-focused mock components
class PerfMockButton implements Serializable {
  static readonly tagName = 'Button';
  static readonly version = '1.0.0';

  constructor(public props: { id?: string; label?: string; metadata?: Record<string, unknown> }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    return React.createElement('button', {
      id: jsonData.id,
      'data-label': jsonData.label,
      'data-metadata': JSON.stringify(jsonData.metadata || {})
    }, jsonData.label || 'Button');
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.props.id,
      label: this.props.label,
      metadata: this.props.metadata
    };
  }
}

class PerfMockSection implements Serializable {
  static readonly tagName = 'Section';
  static readonly version = '1.0.0';

  constructor(public props: { id?: string; children?: React.ReactNode }) {}

  static fromJson(jsonData: Record<string, unknown>): ReactElement {
    const children = jsonData.children ? ComponentTransformer.deserialize(jsonData.children) : null;
    return React.createElement('section', {
      id: jsonData.id,
      'data-testid': 'perf-section'
    }, children);
  }

  toJson(): unknown {
    return {
      id: this.props.id,
      children: this.props.children ? ComponentTransformer.serialize(this.props.children) : null
    };
  }
}

// Performance measurement utilities
interface PerformanceMetrics {
  duration: number;
  memoryUsed?: number;
  operations: number;
  opsPerSecond: number;
}

function measurePerformance<T>(
  operation: () => T,
  operationCount: number = 1
): { result: T; metrics: PerformanceMetrics } {
  // Force garbage collection if available (for more accurate memory measurements)
  if ((global as unknown).gc) {
    (global as unknown).gc();
  }

  const startMemory = process.memoryUsage().heapUsed;
  const startTime = performance.now();

  let result: T;
  for (let i = 0; i < operationCount; i++) {
    result = operation();
  }

  const endTime = performance.now();
  const endMemory = process.memoryUsage().heapUsed;

  const duration = endTime - startTime;
  const memoryUsed = endMemory - startMemory;
  const opsPerSecond = operationCount > 1 ? (operationCount / duration) * 1000 : 1000 / duration;

  return {
    result: result!,
    metrics: {
      duration,
      memoryUsed,
      operations: operationCount,
      opsPerSecond
    }
  };
}

describe('Component Serialization Performance Tests', () => {
  beforeEach(() => {
    ComponentTransformer.clearRegistry();
    ComponentTransformer.registerComponent(PerfMockButton as SerializableConstructor);
    ComponentTransformer.registerComponent(PerfMockSection as SerializableConstructor);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Serialization Speed Benchmarks', () => {
    it('should serialize 1000 simple components within performance budget', () => {
      const components = Array.from({ length: 1000 }, (_, i) => ({
        tagName: 'Button',
        version: '1.0.0',
        data: {
          id: `btn-${i}`,
          label: `Button ${i}`,
          metadata: { index: i, category: i % 10 }
        }
      }));

      const { metrics } = measurePerformance(() => {
        return ComponentTransformer.deserialize(components);
      });

      // Performance budget: should complete within 50ms for 1000 components
      expect(metrics.duration).toBeLessThan(50);
      expect(metrics.opsPerSecond).toBeGreaterThan(20000); // At least 20k ops/sec
      
      console.log(`Serialized 1000 components in ${metrics.duration.toFixed(2)}ms (${metrics.opsPerSecond.toFixed(0)} ops/sec)`);
    });

    it('should deserialize complex nested structures efficiently', () => {
      // Create nested structure with 10 sections, each containing 50 buttons
      const nestedStructure = Array.from({ length: 10 }, (_, sectionIndex) => ({
        tagName: 'Section',
        version: '1.0.0',
        data: {
          id: `section-${sectionIndex}`,
          children: Array.from({ length: 50 }, (_, buttonIndex) => ({
            tagName: 'Button',
            version: '1.0.0',
            data: {
              id: `btn-${sectionIndex}-${buttonIndex}`,
              label: `Button ${buttonIndex}`,
              metadata: { section: sectionIndex, button: buttonIndex }
            }
          }))
        }
      }));

      const { result, metrics } = measurePerformance(() => {
        return ComponentTransformer.deserialize(nestedStructure);
      });

      // Performance budget: 500 nested components should complete within 100ms
      expect(metrics.duration).toBeLessThan(100);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(10);

      console.log(`Deserialized 500 nested components in ${metrics.duration.toFixed(2)}ms`);
    });

    it('should handle roundtrip serialization efficiently', () => {
      const testData = Array.from({ length: 100 }, (_, i) => ({
        tagName: 'Section',
        version: '1.0.0',
        data: {
          id: `section-${i}`,
          children: [{
            tagName: 'Button',
            version: '1.0.0',
            data: { id: `btn-${i}`, label: `Button ${i}` }
          }]
        }
      }));

      const { metrics: deserializeMetrics } = measurePerformance(() => {
        return ComponentTransformer.deserialize(testData);
      });

      const reactElements = ComponentTransformer.deserialize(testData);
      
      const { metrics: serializeMetrics } = measurePerformance(() => {
        return ComponentTransformer.serialize(reactElements);
      });

      // Both operations should be fast
      expect(deserializeMetrics.duration).toBeLessThan(20);
      expect(serializeMetrics.duration).toBeLessThan(20);

      console.log(`Roundtrip: Deserialize ${deserializeMetrics.duration.toFixed(2)}ms, Serialize ${serializeMetrics.duration.toFixed(2)}ms`);
    });
  });

  describe('Memory Usage Validation', () => {
    it('should not create excessive memory overhead for large component trees', () => {
      const largeComponentTree = Array.from({ length: 5000 }, (_, i) => ({
        tagName: 'Button',
        version: '1.0.0',
        data: {
          id: `large-btn-${i}`,
          label: `Large Button ${i}`,
          metadata: {
            index: i,
            timestamp: Date.now(),
            category: `category-${i % 20}`,
            tags: [`tag-${i % 10}`, `tag-${(i + 1) % 10}`]
          }
        }
      }));

      const { result, metrics } = measurePerformance(() => {
        return ComponentTransformer.deserialize(largeComponentTree);
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(5000);

      // Memory budget: Should not use more than 50MB for 5000 components
      if (metrics.memoryUsed) {
        const memoryMB = metrics.memoryUsed / (1024 * 1024);
        expect(memoryMB).toBeLessThan(50);
        console.log(`Memory used for 5000 components: ${memoryMB.toFixed(2)}MB`);
      }
    });

    it('should release memory properly after deserialization', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Create and process large data
      for (let batch = 0; batch < 10; batch++) {
        const batchData = Array.from({ length: 1000 }, (_, i) => ({
          tagName: 'Button',
          version: '1.0.0',
          data: { id: `batch-${batch}-btn-${i}`, label: `Button ${i}` }
        }));
        
        const result = ComponentTransformer.deserialize(batchData);
        expect(Array.isArray(result)).toBe(true);
      }

      // Force garbage collection
      if ((global as unknown).gc) {
        (global as unknown).gc();
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryGrowth = (finalMemory - initialMemory) / (1024 * 1024);

      // Memory should not grow by more than 20MB after processing 10k components
      expect(memoryGrowth).toBeLessThan(20);
      console.log(`Memory growth after 10 batches: ${memoryGrowth.toFixed(2)}MB`);
    });
  });

  describe('Scalability Testing', () => {
    it('should scale linearly with component count', () => {
      const componentCounts = [100, 500, 1000, 2000];
      const results: { count: number; duration: number; opsPerSec: number }[] = [];

      for (const count of componentCounts) {
        const components = Array.from({ length: count }, (_, i) => ({
          tagName: 'Button',
          version: '1.0.0',
          data: { id: `scale-btn-${i}`, label: `Button ${i}` }
        }));

        const { metrics } = measurePerformance(() => {
          return ComponentTransformer.deserialize(components);
        });

        results.push({
          count,
          duration: metrics.duration,
          opsPerSec: metrics.opsPerSecond
        });
      }

      // Verify scaling characteristics
      for (let i = 1; i < results.length; i++) {
        const prev = results[i - 1];
        const curr = results[i];
        
        // Duration should scale roughly linearly (with some tolerance)
        const expectedDuration = (prev.duration * curr.count) / prev.count;
        const tolerance = expectedDuration * 0.5; // 50% tolerance
        
        expect(curr.duration).toBeLessThan(expectedDuration + tolerance);
        
        console.log(`${curr.count} components: ${curr.duration.toFixed(2)}ms (${curr.opsPerSec.toFixed(0)} ops/sec)`);
      }
    });

    it('should handle deeply nested structures without performance degradation', () => {
      const depths = [5, 10, 20, 30];
      const results: { depth: number; duration: number }[] = [];

      for (const depth of depths) {
        // Create nested structure
        let nestedData: unknown = {
          tagName: 'Button',
          version: '1.0.0',
          data: { id: 'deep-button', label: `Button at depth ${depth}` }
        };

        for (let level = 0; level < depth; level++) {
          nestedData = {
            tagName: 'Section',
            version: '1.0.0',
            data: {
              id: `section-level-${level}`,
              children: [nestedData]
            }
          };
        }

        const { metrics } = measurePerformance(() => {
          return ComponentTransformer.deserialize(nestedData);
        });

        results.push({
          depth,
          duration: metrics.duration
        });
      }

      // Verify that performance doesn't degrade exponentially with depth
      for (let i = 1; i < results.length; i++) {
        const prev = results[i - 1];
        const curr = results[i];
        
        // Each doubling of depth should not more than double the time
        const depthRatio = curr.depth / prev.depth;
        const timeRatio = curr.duration / prev.duration;
        
        expect(timeRatio).toBeLessThan(depthRatio * 2);
        
        console.log(`Depth ${curr.depth}: ${curr.duration.toFixed(2)}ms`);
      }
    });
  });

  describe('Stress Testing', () => {
    it('should handle extreme component counts without crashing', () => {
      // Test with 10,000 components
      const extremeCount = 10000;
      const components = Array.from({ length: extremeCount }, (_, i) => ({
        tagName: 'Button',
        version: '1.0.0',
        data: {
          id: `extreme-btn-${i}`,
          label: `Button ${i}`,
          metadata: { batch: Math.floor(i / 1000) }
        }
      }));

      expect(() => {
        const startTime = performance.now();
        const result = ComponentTransformer.deserialize(components);
        const endTime = performance.now();
        
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(extremeCount);
        
        const duration = endTime - startTime;
        console.log(`Processed ${extremeCount} components in ${duration.toFixed(2)}ms`);
        
        // Should complete within 1 second even for extreme loads
        expect(duration).toBeLessThan(1000);
      }).not.toThrow();
    });

    it('should handle concurrent serialization operations', async () => {
      const concurrentOperations = 10;
      const componentsPerOperation = 500;

      const operations = Array.from({ length: concurrentOperations }, (_, opIndex) => {
        const components = Array.from({ length: componentsPerOperation }, (_, compIndex) => ({
          tagName: 'Button',
          version: '1.0.0',
          data: {
            id: `concurrent-op${opIndex}-btn${compIndex}`,
            label: `Op ${opIndex} Button ${compIndex}`
          }
        }));

        return () => ComponentTransformer.deserialize(components);
      });

      const startTime = performance.now();
      
      // Run all operations concurrently
      const results = await Promise.all(
        operations.map(async (operation) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve(operation()), 0);
          });
        })
      );

      const endTime = performance.now();
      const totalDuration = endTime - startTime;

      // Verify all operations completed successfully
      results.forEach((result) => {
        expect(Array.isArray(result)).toBe(true);
        expect((result as unknown[]).length).toBe(componentsPerOperation);
      });

      console.log(`${concurrentOperations} concurrent operations completed in ${totalDuration.toFixed(2)}ms`);
    });
  });

  describe('Performance Regression Detection', () => {
    it('should maintain consistent performance characteristics', () => {
      const benchmarkData = Array.from({ length: 1000 }, (_, i) => ({
        tagName: 'Section',
        version: '1.0.0',
        data: {
          id: `benchmark-section-${i}`,
          children: [
            {
              tagName: 'Button',
              version: '1.0.0',
              data: { id: `benchmark-btn-${i}`, label: `Button ${i}` }
            }
          ]
        }
      }));

      // Run benchmark multiple times to get consistent results
      const runs = 5;
      const durations: number[] = [];

      for (let run = 0; run < runs; run++) {
        const { metrics } = measurePerformance(() => {
          return ComponentTransformer.deserialize(benchmarkData);
        });
        durations.push(metrics.duration);
      }

      const averageDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const maxDuration = Math.max(...durations);
      const minDuration = Math.min(...durations);
      const variance = maxDuration - minDuration;

      // Performance should be consistent (low variance)
      expect(variance).toBeLessThan(averageDuration * 0.5); // Variance should be < 50% of average
      expect(averageDuration).toBeLessThan(50); // Average should be under 50ms for 1000 components

      console.log(`Performance consistency: avg=${averageDuration.toFixed(2)}ms, min=${minDuration.toFixed(2)}ms, max=${maxDuration.toFixed(2)}ms, variance=${variance.toFixed(2)}ms`);
    });
  });
});