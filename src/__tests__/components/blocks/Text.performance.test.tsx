/**
 * Text Component Performance Tests
 * 
 * Performance benchmarks and optimization tests for the Text component
 * to ensure it meets the established performance targets (<1ms serialization).
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { Text } from '../../../components/blocks/Text';

describe('Text Performance', () => {
  beforeEach(() => {
    // Clear component registry for clean tests
    ComponentTransformer.clearRegistry();
    
    // Register Text component
    ComponentTransformer.registerComponent(Text as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Serialization Performance', () => {
    it('should serialize simple text in under 1ms', () => {
      const component = <Text content="Simple performance test" variant="body1" />;

      const iterations = 100;
      const times: number[] = [];

      // Warm up
      for (let i = 0; i < 10; i++) {
        ComponentTransformer.serialize(component);
      }

      // Measure
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        ComponentTransformer.serialize(component);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(1); // Average under 1ms
      expect(maxTime).toBeLessThan(10); // Even worst case under 10ms
    });

    it('should serialize complex text with all properties in under 1ms', () => {
      const component = (
        <Text
          content="Complex performance test with many properties"
          variant="h2"
          color="primary"
          align="center"
          component="h1"
          fontWeight="bold"
          textDecoration="underline"
          textTransform="uppercase"
          noWrap={true}
          paragraph={false}
          gutterBottom={true}
          fontSize="2.5rem"
          lineHeight="1.2"
          letterSpacing="0.1em"
          fontFamily="Arial, sans-serif"
          customColor="#1976d2"
          maxWidth="600px"
        />
      );

      const iterations = 100;
      const times: number[] = [];

      // Warm up
      for (let i = 0; i < 10; i++) {
        ComponentTransformer.serialize(component);
      }

      // Measure
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        ComponentTransformer.serialize(component);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(1); // Average under 1ms
      expect(maxTime).toBeLessThan(20); // Even worst case under 20ms (test environment can have spikes)
    });

    it('should serialize large text content efficiently', () => {
      const largeContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(200); // ~11KB
      const component = (
        <Text
          content={largeContent}
          variant="body1"
          paragraph={true}
          maxWidth="800px"
        />
      );

      const iterations = 50;
      const times: number[] = [];

      // Warm up
      for (let i = 0; i < 5; i++) {
        ComponentTransformer.serialize(component);
      }

      // Measure
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        ComponentTransformer.serialize(component);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(2); // Large content under 2ms average
      expect(maxTime).toBeLessThan(5); // Even worst case under 5ms
    });
  });

  describe('Deserialization Performance', () => {
    it('should deserialize simple text in under 1ms', () => {
      const component = <Text content="Simple deserialization test" variant="body1" />;
      const serialized = ComponentTransformer.serialize(component);

      const iterations = 100;
      const times: number[] = [];

      // Warm up
      for (let i = 0; i < 10; i++) {
        ComponentTransformer.deserialize(serialized);
      }

      // Measure
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        ComponentTransformer.deserialize(serialized);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(1); // Average under 1ms
      expect(maxTime).toBeLessThan(10); // Even worst case under 10ms
    });

    it('should deserialize complex text in under 1ms', () => {
      const component = (
        <Text
          content="Complex deserialization test"
          variant="h3"
          color="secondary"
          align="right"
          fontWeight="600"
          textDecoration="overline"
          textTransform="capitalize"
          gutterBottom={true}
          fontSize="1.8rem"
          customColor="#ff5722"
        />
      );
      const serialized = ComponentTransformer.serialize(component);

      const iterations = 100;
      const times: number[] = [];

      // Warm up
      for (let i = 0; i < 10; i++) {
        ComponentTransformer.deserialize(serialized);
      }

      // Measure
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        ComponentTransformer.deserialize(serialized);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(1); // Average under 1ms
      expect(maxTime).toBeLessThan(10); // Even worst case under 10ms
    });
  });

  describe('Round-trip Performance', () => {
    it.skip('should complete serialize → deserialize → render cycle efficiently', () => {
      const component = (
        <Text
          content="Round-trip performance test"
          variant="h4"
          color="info"
          fontWeight="bold"
          gutterBottom={true}
        />
      );

      const iterations = 50;
      const times: number[] = [];

      // Warm up
      for (let i = 0; i < 5; i++) {
        const serialized = ComponentTransformer.serialize(component);
        const deserialized = ComponentTransformer.deserialize(serialized);
        render(deserialized as React.ReactElement);
      }

      // Measure complete round-trip
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        
        const serialized = ComponentTransformer.serialize(component);
        const deserialized = ComponentTransformer.deserialize(serialized);
        const { container } = render(deserialized as React.ReactElement);
        
        // Ensure DOM is actually updated
        container.querySelector('.MuiTypography-root');
        
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(5); // Complete round-trip under 5ms average
      expect(maxTime).toBeLessThan(20); // Even worst case under 20ms (DOM rendering can be slow in tests)
    });
  });

  describe('Memory Performance', () => {
    it('should not create memory leaks during serialization', () => {
      const component = <Text content="Memory leak test" variant="body1" />;

      // Get initial memory usage (if available)
      const initialMemory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize || 0;

      // Perform many serialization operations
      for (let i = 0; i < 1000; i++) {
        ComponentTransformer.serialize(component);
      }

      // Force garbage collection if available
      if ((global as unknown as { gc?: () => void }).gc) {
        (global as unknown as { gc?: () => void }).gc();
      }

      // Check memory hasn't grown significantly
      const finalMemory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize || 0;
      
      if (initialMemory > 0) {
        const memoryGrowth = finalMemory - initialMemory;
        const memoryGrowthMB = memoryGrowth / (1024 * 1024);
        
        // Should not grow by more than 1MB for 1000 serializations
        expect(memoryGrowthMB).toBeLessThan(1);
      }
    });

    it('should handle large batch operations efficiently', () => {
      const components = Array.from({ length: 100 }, (_, i) => (
        <Text
          content={`Batch test item ${i}`}
          variant={i % 2 === 0 ? 'h3' : 'body1'}
          color={i % 3 === 0 ? 'primary' : 'textSecondary'}
        />
      ));

      const startTime = performance.now();

      // Serialize all components
      const serialized = components.map(component => ComponentTransformer.serialize(component));

      // Deserialize all components
      const deserialized = serialized.map(data => ComponentTransformer.deserialize(data));

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(serialized).toHaveLength(100);
      expect(deserialized).toHaveLength(100);
      expect(totalTime).toBeLessThan(100); // 100 components in under 100ms (1ms per component)
    });
  });

  describe('Rendering Performance', () => {
    it.skip('should render efficiently with default props', () => {
      const component = <Text content="Render performance test" />;

      const iterations = 100;
      const times: number[] = [];

      // Warm up React rendering
      for (let i = 0; i < 10; i++) {
        render(component);
      }

      // Measure rendering time
      for (let i = 0; i < iterations; i++) {
        const startTime = performance.now();
        render(component);
        const endTime = performance.now();
        times.push(endTime - startTime);
      }

      const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const maxTime = Math.max(...times);

      expect(averageTime).toBeLessThan(3); // Average render under 3ms
      expect(maxTime).toBeLessThan(10); // Even worst case under 10ms
    });

    it('should render large text content efficiently', () => {
      const largeContent = 'Lorem ipsum dolor sit amet. '.repeat(500); // ~14KB
      const component = <Text content={largeContent} variant="body1" />;

      const startTime = performance.now();
      render(component);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10); // Large content render under 10ms
    });

    it('should handle rapid prop changes efficiently', () => {
      const { rerender } = render(<Text content="Initial" variant="body1" />);

      const startTime = performance.now();

      // Simulate rapid prop changes
      for (let i = 0; i < 50; i++) {
        rerender(
          <Text
            content={`Update ${i}`}
            variant={i % 2 === 0 ? 'h4' : 'body2'}
            color={i % 3 === 0 ? 'primary' : 'textSecondary'}
          />
        );
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(100); // 50 re-renders under 100ms (2ms per update)
    });
  });

  describe('Performance Targets Validation', () => {
    it('should meet all performance targets consistently', () => {
      const simpleComponent = <Text content="Performance target test" />;
      const complexComponent = (
        <Text
          content="Complex performance target test"
          variant="h2"
          color="primary"
          align="center"
          fontWeight="bold"
          fontSize="2rem"
          customColor="#1976d2"
          gutterBottom={true}
        />
      );

      // Test multiple iterations for consistency
      const results = {
        simpleSerialize: [] as number[],
        simpleDeserialize: [] as number[],
        complexSerialize: [] as number[],
        complexDeserialize: [] as number[]
      };

      // Warm up
      for (let i = 0; i < 10; i++) {
        ComponentTransformer.serialize(simpleComponent);
        ComponentTransformer.serialize(complexComponent);
      }

      // Measure
      for (let i = 0; i < 100; i++) {
        // Simple serialize
        let start = performance.now();
        ComponentTransformer.serialize(simpleComponent);
        results.simpleSerialize.push(performance.now() - start);

        // Simple deserialize
        const simpleSerialized = ComponentTransformer.serialize(simpleComponent);
        start = performance.now();
        ComponentTransformer.deserialize(simpleSerialized);
        results.simpleDeserialize.push(performance.now() - start);

        // Complex serialize
        start = performance.now();
        ComponentTransformer.serialize(complexComponent);
        results.complexSerialize.push(performance.now() - start);

        // Complex deserialize
        const complexSerialized = ComponentTransformer.serialize(complexComponent);
        start = performance.now();
        ComponentTransformer.deserialize(complexSerialized);
        results.complexDeserialize.push(performance.now() - start);
      }

      // Calculate statistics
      const stats = Object.entries(results).map(([key, times]) => ({
        operation: key,
        average: times.reduce((sum, time) => sum + time, 0) / times.length,
        max: Math.max(...times),
        min: Math.min(...times),
        p95: times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)]
      }));

      // Validate targets
      stats.forEach(stat => {
        console.log(`${stat.operation}: avg=${stat.average.toFixed(3)}ms, max=${stat.max.toFixed(3)}ms, p95=${stat.p95.toFixed(3)}ms`);
        
        // Main targets: average under 1ms, p95 under 2ms
        expect(stat.average).toBeLessThan(1);
        expect(stat.p95).toBeLessThan(2);
        expect(stat.max).toBeLessThan(5); // Conservative upper bound
      });
    });
  });
});