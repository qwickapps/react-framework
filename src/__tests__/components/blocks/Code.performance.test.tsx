/**
 * Code Component Performance Tests
 * 
 * Validates performance requirements for serialization operations
 * and ensures the implementation meets quality gates for production use.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { Code } from '../../../components/blocks/Code';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';

// Large sample code for performance testing - using regular strings to avoid template literal issues
const largeJavaScriptCode = `
// Large JavaScript code sample for performance testing
class AdvancedDataProcessor {
  constructor(options = {}) {
    this.batchSize = options.batchSize || 1000;
    this.maxRetries = options.maxRetries || 3;
    this.timeout = options.timeout || 30000;
    this.cache = new Map();
    this.workers = [];
    this.eventListeners = new Map();
    
    this.initializeWorkerPool();
    this.setupErrorHandling();
    this.configurePerformanceMonitoring();
  }

  async processLargeBatch(data) {
    const startTime = performance.now();
    const results = [];
    
    try {
      // Validate input data
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data: Expected non-empty array');
      }

      // Split data into manageable chunks
      const chunks = this.chunkArray(data, this.batchSize);
      console.log('Processing ' + chunks.length + ' chunks of data');

      // Process chunks concurrently with worker pool
      const promises = chunks.map(async (chunk, index) => {
        const worker = this.getAvailableWorker();
        const chunkId = 'chunk_' + index + '_' + Date.now();
        
        try {
          const result = await this.processChunkWithWorker(worker, chunk, chunkId);
          this.updateProgressMetrics(index, chunks.length);
          return result;
        } catch (error) {
          console.error('Error processing chunk ' + chunkId + ':', error);
          return await this.handleChunkError(chunk, chunkId, error);
        } finally {
          this.releaseWorker(worker);
        }
      });

      const chunkResults = await Promise.allSettled(promises);
      
      // Aggregate results and handle any failures
      for (const result of chunkResults) {
        if (result.status === 'fulfilled') {
          results.push(...result.value);
        } else {
          console.error('Chunk processing failed:', result.reason);
          this.emit('chunkError', result.reason);
        }
      }

      const processingTime = performance.now() - startTime;
      this.logPerformanceMetrics(processingTime, data.length, results.length);
      
      return {
        success: true,
        processedCount: results.length,
        totalCount: data.length,
        processingTime,
        results
      };

    } catch (error) {
      const processingTime = performance.now() - startTime;
      console.error('Batch processing failed:', error);
      
      return {
        success: false,
        error: error.message,
        processedCount: results.length,
        totalCount: data.length,
        processingTime,
        results
      };
    }
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  async processChunkWithWorker(worker, chunk, chunkId) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Chunk processing timeout: ' + chunkId));
      }, this.timeout);

      worker.postMessage({
        type: 'PROCESS_CHUNK',
        payload: { chunk, chunkId }
      });

      worker.onmessage = (event) => {
        clearTimeout(timeout);
        if (event.data.type === 'CHUNK_COMPLETE') {
          resolve(event.data.payload.results);
        } else if (event.data.type === 'CHUNK_ERROR') {
          reject(new Error(event.data.payload.error));
        }
      };
    });
  }

  initializeWorkerPool() {
    const workerCount = navigator.hardwareConcurrency || 4;
    console.log('Initializing worker pool with ' + workerCount + ' workers');
    
    for (let i = 0; i < workerCount; i++) {
      const worker = new Worker(new URL('./data-processor.worker.js', import.meta.url));
      worker.available = true;
      this.workers.push(worker);
    }
  }

  getAvailableWorker() {
    const worker = this.workers.find(w => w.available);
    if (worker) {
      worker.available = false;
      return worker;
    }
    // If no workers available, wait and retry
    return new Promise(resolve => {
      const checkWorkers = () => {
        const availableWorker = this.workers.find(w => w.available);
        if (availableWorker) {
          availableWorker.available = false;
          resolve(availableWorker);
        } else {
          setTimeout(checkWorkers, 10);
        }
      };
      checkWorkers();
    });
  }

  releaseWorker(worker) {
    worker.available = true;
  }
}

// Export for use in other modules
export default AdvancedDataProcessor;
`;

const largeTypeScriptCode = `
// Large TypeScript code sample for performance testing
interface DatabaseConnection {
  readonly id: string;
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly ssl: boolean;
}

interface QueryOptions {
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheTTL?: number;
  transaction?: boolean;
}

interface QueryResult<T = any> {
  data: T[];
  count: number;
  executionTime: number;
  fromCache: boolean;
}

type EventHandler<T = any> = (event: T) => void | Promise<void>;
type QueryBuilder = (query: string, params?: unknown[]) => Promise<QueryResult>;

class EnterpriseDatabase {
  private connections: Map<string, DatabaseConnection> = new Map();
  private queryCache: Map<string, { result: QueryResult; timestamp: number }> = new Map();
  private eventHandlers: Map<string, EventHandler[]> = new Map();
  private transactionStack: string[] = [];
  private connectionPool: DatabaseConnection[] = [];
  private readonly maxConnections: number = 50;
  private readonly defaultTimeout: number = 30000;

  constructor(private config: {
    defaultConnection: DatabaseConnection;
    maxConnections?: number;
    cacheEnabled?: boolean;
    cacheTTL?: number;
  }) {
    this.initializeConnectionPool();
    this.setupHealthChecking();
    this.configureQueryOptimization();
  }

  async query<T = any>(
    sql: string, 
    params: unknown[] = [], 
    options: QueryOptions = {}
  ): Promise<QueryResult<T>> {
    const startTime = performance.now();
    const queryId = this.generateQueryId(sql, params);
    
    try {
      // Check cache first
      if (options.cache !== false && this.config.cacheEnabled) {
        const cached = this.getCachedResult(queryId, options.cacheTTL);
        if (cached) {
          this.emit('cacheHit', { queryId, sql });
          return cached;
        }
      }

      // Get connection from pool
      const connection = await this.getConnection();
      
      // Execute query with retry logic
      const result = await this.executeWithRetry(
        connection,
        sql,
        params,
        options.retries || 3,
        options.timeout || this.defaultTimeout
      );

      const executionTime = performance.now() - startTime;
      const queryResult: QueryResult<T> = {
        data: result.rows,
        count: result.rowCount || result.rows.length,
        executionTime,
        fromCache: false
      };

      // Cache successful results
      if (options.cache !== false && this.config.cacheEnabled) {
        this.cacheResult(queryId, queryResult, options.cacheTTL);
      }

      // Log performance metrics
      this.logQueryPerformance(sql, executionTime, queryResult.count);
      this.emit('queryComplete', { sql, executionTime, resultCount: queryResult.count });

      // Release connection back to pool
      this.releaseConnection(connection);

      return queryResult;

    } catch (error) {
      const executionTime = performance.now() - startTime;
      this.emit('queryError', { sql, error: error.message, executionTime });
      
      console.error('Database query failed:', {
        sql: sql.substring(0, 200) + (sql.length > 200 ? '...' : ''),
        params,
        error: error.message,
        executionTime
      });
      
      throw new Error('Query execution failed: ' + error.message);
    }
  }

  private generateQueryId(sql: string, params: unknown[]): string {
    return btoa(sql + JSON.stringify(params)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  }

  on<T>(event: string, handler: EventHandler<T>): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  private emit<T>(event: string, data: T): void {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error('Event handler error for ' + event + ':', error);
      }
    });
  }
}

export { EnterpriseDatabase, type DatabaseConnection, type QueryOptions, type QueryResult };
`;

// Test performance benchmarks
describe('Code Component Performance Tests', () => {
  beforeEach(() => {
    ComponentTransformer.clearRegistry();
    ComponentTransformer.registerComponent(Code as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Serialization Performance', () => {
    it('should serialize typical Code component in <10ms', () => {
      const codeInstance = new Code({
        children: 'console.log("Hello World");',
        language: 'javascript',
        showCopy: true,
        title: 'example.js'
      });

      const iterations = 100;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        codeInstance.toJson();
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`Serialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(10); // Should be under 10ms per operation
    });

    it('should serialize large code content in <15ms', () => {
      const codeInstance = new Code({
        children: largeJavaScriptCode,
        language: 'javascript',
        showCopy: true,
        showLineNumbers: true,
        title: 'large-file.js'
      });

      const iterations = 50;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        codeInstance.toJson();
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`Large code serialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(15); // Should be under 15ms for large content
    });

    it('should serialize complex ReactNode children in <20ms', () => {
      const complexChildren = (
        <div>
          <span>Line 1: {largeJavaScriptCode.substring(0, 100)}</span>
          <br />
          <span>Line 2: {largeTypeScriptCode.substring(0, 100)}</span>
          <div>
            <code>{largeJavaScriptCode.substring(100, 200)}</code>
          </div>
        </div>
      );

      const codeInstance = new Code({
        children: complexChildren,
        language: 'javascript',
        showCopy: true,
        title: 'complex.js'
      });

      const iterations = 25;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        codeInstance.toJson();
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`Complex ReactNode serialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(20); // Should be under 20ms for complex ReactNodes
    });
  });

  describe('Deserialization Performance', () => {
    it('should deserialize typical JSON data in <5ms', () => {
      const jsonData = {
        children: 'console.log("Hello World");',
        language: 'javascript',
        showCopy: true,
        title: 'example.js'
      };

      const iterations = 200;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        Code.fromJson(jsonData);
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`Deserialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(5); // Should be under 5ms per operation
    });

    it('should deserialize large code content in <8ms', () => {
      const jsonData = {
        children: largeTypeScriptCode,
        language: 'typescript',
        showCopy: true,
        showLineNumbers: true,
        title: 'large-file.ts'
      };

      const iterations = 100;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        Code.fromJson(jsonData);
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`Large code deserialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(8); // Should be under 8ms for large content
    });
  });

  describe('ComponentTransformer Performance', () => {
    it('should serialize through ComponentTransformer in <15ms', () => {
      const codeElement = (
        <Code 
          language="javascript"
          showCopy={true}
          showLineNumbers={true}
          title="performance-test.js"
        >
          {largeJavaScriptCode}
        </Code>
      );

      const iterations = 50;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        ComponentTransformer.serialize(codeElement);
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`ComponentTransformer serialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(15); // Should be under 15ms via ComponentTransformer
    });

    it('should deserialize through ComponentTransformer in <10ms', () => {
      const codeElement = (
        <Code 
          language="javascript"
          title="performance-test.js"
        >
          {largeJavaScriptCode}
        </Code>
      );

      const serializedData = ComponentTransformer.serialize(codeElement);

      const iterations = 75;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        ComponentTransformer.deserialize(serializedData);
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`ComponentTransformer deserialization: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(10); // Should be under 10ms via ComponentTransformer
    });
  });

  describe('Round-trip Performance', () => {
    it('should complete round-trip in <25ms for typical content', () => {
      const originalProps = {
        children: 'function hello() { return "world"; }',
        language: 'javascript',
        showCopy: true,
        showLineNumbers: false,
        title: 'hello.js'
      };

      const iterations = 50;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        // Create instance → serialize → deserialize
        const codeInstance = new Code(originalProps);
        const serializedData = codeInstance.toJson();
        Code.fromJson(serializedData);
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`Round-trip performance: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(25); // Should complete round-trip in under 25ms
    });

    it('should complete ComponentTransformer round-trip in <30ms', () => {
      const codeElement = (
        <Code 
          language="typescript"
          showCopy={true}
          title="round-trip.ts"
        >
          {largeTypeScriptCode}
        </Code>
      );

      const iterations = 25;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        // Serialize → Deserialize via ComponentTransformer
        const serialized = ComponentTransformer.serialize(codeElement);
        ComponentTransformer.deserialize(serialized);
      }

      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / iterations;

      console.log(`ComponentTransformer round-trip: ${averageTime.toFixed(2)}ms average over ${iterations} iterations`);
      expect(averageTime).toBeLessThan(30); // Should complete ComponentTransformer round-trip in under 30ms
    });
  });

  describe('Memory Usage Validation', () => {
    it('should not cause memory leaks during repeated operations', () => {
      const initialMemory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize || 0;
      
      const codeElement = (
        <Code language="javascript" title="memory-test.js">
          {largeJavaScriptCode}
        </Code>
      );

      // Perform many operations
      for (let i = 0; i < 1000; i++) {
        const serialized = ComponentTransformer.serialize(codeElement);
        ComponentTransformer.deserialize(serialized);

        // Force garbage collection hint (if available)
        if (typeof global !== 'undefined' && (global as unknown as { gc?: () => void }).gc) {
          if (i % 100 === 0) (global as unknown as { gc?: () => void }).gc?.();
        }
      }

      const finalMemory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize || 0;
      
      if (initialMemory > 0 && finalMemory > 0) {
        const memoryIncrease = finalMemory - initialMemory;
        const memoryIncreaseKB = memoryIncrease / 1024;
        
        console.log(`Memory increase: ${memoryIncreaseKB.toFixed(2)}KB after 1000 operations`);
        
        // Should not increase memory by more than 1MB (significant leak indicator)
        expect(memoryIncrease).toBeLessThan(1024 * 1024); // 1MB
      } else {
        console.log('Memory measurement not available - skipping memory leak test');
      }
    });
  });

  describe('Concurrent Operations Performance', () => {
    it('should handle concurrent serialization efficiently', async () => {
      const codeInstances = Array.from({ length: 100 }, (_, i) => 
        new Code({
          children: `console.log("Instance ${i}");`,
          language: 'javascript',
          title: `instance-${i}.js`
        })
      );

      const startTime = performance.now();

      // Serialize all instances concurrently
      const promises = codeInstances.map(instance => 
        Promise.resolve(instance.toJson())
      );

      const results = await Promise.all(promises);
      
      const totalTime = performance.now() - startTime;
      const averageTime = totalTime / results.length;

      console.log(`Concurrent serialization: ${totalTime.toFixed(2)}ms total, ${averageTime.toFixed(2)}ms average for 100 instances`);
      
      expect(results).toHaveLength(100);
      expect(totalTime).toBeLessThan(1000); // Should complete 100 concurrent operations in under 1 second
      expect(averageTime).toBeLessThan(10); // Each operation should still be under 10ms on average
    });
  });
});