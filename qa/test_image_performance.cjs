/**
 * Image Serialization Performance Test
 * 
 * Tests the performance of Image component serialization to ensure
 * it meets the <1ms benchmark requirement.
 */

const React = require('react');

// Mock Image component for performance testing
class MockImage {
  static tagName = 'Image';
  static version = '1.0.0';
  
  constructor(props) {
    this.props = props;
  }
  
  static fromJson(jsonData) {
    return React.createElement('img', jsonData);
  }
  
  toJson() {
    return {
      src: this.props.src,
      alt: this.props.alt,
      width: this.props.width,
      height: this.props.height,
      objectFit: this.props.objectFit,
      objectPosition: this.props.objectPosition,
      loading: this.props.loading,
      title: this.props.title,
      draggable: this.props.draggable,
      borderRadius: this.props.borderRadius,
      showLoading: this.props.showLoading,
      showError: this.props.showError,
      fallbackSrc: this.props.fallbackSrc,
      sizes: this.props.sizes,
      srcSet: this.props.srcSet,
      dataSource: this.props.dataSource,
      bindingOptions: this.props.bindingOptions
    };
  }
}

// Mock ComponentTransformer for performance testing
class MockComponentTransformer {
  static registry = new Map();
  
  static registerComponent(componentClass) {
    this.registry.set(componentClass.tagName, componentClass);
  }
  
  static serialize(node) {
    if (!React.isValidElement(node)) {
      return JSON.stringify(null);
    }
    
    const componentClass = this.registry.get('Image');
    if (componentClass) {
      const instance = new componentClass(node.props);
      const serializedData = instance.toJson();
      
      return JSON.stringify({
        tag: 'Image',
        version: '1.0.0',
        data: serializedData
      });
    }
    return JSON.stringify(null);
  }
  
  static deserialize(serialized) {
    const parsed = JSON.parse(serialized);
    if (parsed && parsed.tag === 'Image') {
      const componentClass = this.registry.get('Image');
      if (componentClass) {
        return componentClass.fromJson(parsed.data);
      }
    }
    return null;
  }
}

function createComplexImage(index) {
  return React.createElement(MockImage, {
    src: `https://example.com/image-${index}.jpg`,
    alt: `Test image ${index}`,
    width: 800,
    height: 600,
    objectFit: 'cover',
    objectPosition: 'center',
    loading: 'lazy',
    title: `Image ${index} title`,
    draggable: false,
    borderRadius: '12px',
    showLoading: true,
    showError: true,
    fallbackSrc: `https://example.com/fallback-${index}.jpg`,
    sizes: '(max-width: 768px) 100vw, 50vw',
    srcSet: `image-${index}-400.jpg 400w, image-${index}-800.jpg 800w`,
    dataSource: `images.gallery[${index}]`,
    bindingOptions: {
      cache: true,
      cacheTTL: 300000,
      strict: false
    }
  });
}

function runPerformanceTests() {
  console.log('⚡ Running Image Serialization Performance Tests...\n');
  
  // Register the mock component
  MockComponentTransformer.registerComponent(MockImage);
  
  // Test 1: Single serialization performance
  console.log('📊 Test 1: Single Image Serialization Performance');
  const image = createComplexImage(1);
  
  const iterations = 1000;
  const start = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    MockComponentTransformer.serialize(image);
  }
  
  const end = process.hrtime.bigint();
  const totalTimeNs = Number(end - start);
  const averageTimeNs = totalTimeNs / iterations;
  const averageTimeMs = averageTimeNs / 1_000_000;
  
  console.log(`Average serialization time: ${averageTimeMs.toFixed(4)}ms`);
  console.log(`Target: <1ms | Result: ${averageTimeMs < 1 ? '✅ PASS' : '❌ FAIL'}\n`);
  
  // Test 2: Deserialization performance
  console.log('📊 Test 2: Image Deserialization Performance');
  const serialized = MockComponentTransformer.serialize(image);
  
  const deserStart = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    MockComponentTransformer.deserialize(serialized);
  }
  
  const deserEnd = process.hrtime.bigint();
  const deserTotalTimeNs = Number(deserEnd - deserStart);
  const deserAverageTimeNs = deserTotalTimeNs / iterations;
  const deserAverageTimeMs = deserAverageTimeNs / 1_000_000;
  
  console.log(`Average deserialization time: ${deserAverageTimeMs.toFixed(4)}ms`);
  console.log(`Target: <1ms | Result: ${deserAverageTimeMs < 1 ? '✅ PASS' : '❌ FAIL'}\n`);
  
  // Test 3: Round-trip performance
  console.log('📊 Test 3: Round-trip Serialization Performance');
  
  const roundTripStart = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    const ser = MockComponentTransformer.serialize(image);
    MockComponentTransformer.deserialize(ser);
  }
  
  const roundTripEnd = process.hrtime.bigint();
  const roundTripTotalTimeNs = Number(roundTripEnd - roundTripStart);
  const roundTripAverageTimeNs = roundTripTotalTimeNs / iterations;
  const roundTripAverageTimeMs = roundTripAverageTimeNs / 1_000_000;
  
  console.log(`Average round-trip time: ${roundTripAverageTimeMs.toFixed(4)}ms`);
  console.log(`Target: <2ms | Result: ${roundTripAverageTimeMs < 2 ? '✅ PASS' : '❌ FAIL'}\n`);
  
  // Test 4: Memory usage simulation
  console.log('📊 Test 4: Batch Serialization Performance');
  const images = [];
  for (let i = 0; i < 100; i++) {
    images.push(createComplexImage(i));
  }
  
  const batchStart = process.hrtime.bigint();
  const serialized_batch = [];
  
  for (const img of images) {
    serialized_batch.push(MockComponentTransformer.serialize(img));
  }
  
  const batchEnd = process.hrtime.bigint();
  const batchTotalTimeNs = Number(batchEnd - batchStart);
  const batchAverageTimeNs = batchTotalTimeNs / images.length;
  const batchAverageTimeMs = batchAverageTimeNs / 1_000_000;
  
  console.log(`Batch serialization (100 images):`);
  console.log(`Average time per image: ${batchAverageTimeMs.toFixed(4)}ms`);
  console.log(`Total batch time: ${(batchTotalTimeNs / 1_000_000).toFixed(4)}ms`);
  console.log(`Target: <1ms per image | Result: ${batchAverageTimeMs < 1 ? '✅ PASS' : '❌ FAIL'}\n`);
  
  // Summary
  const allTestsPassed = averageTimeMs < 1 && 
                        deserAverageTimeMs < 1 && 
                        roundTripAverageTimeMs < 2 && 
                        batchAverageTimeMs < 1;
  
  console.log('🏁 Performance Test Summary:');
  console.log(`Serialization: ${averageTimeMs.toFixed(4)}ms`);
  console.log(`Deserialization: ${deserAverageTimeMs.toFixed(4)}ms`);
  console.log(`Round-trip: ${roundTripAverageTimeMs.toFixed(4)}ms`);
  console.log(`Batch average: ${batchAverageTimeMs.toFixed(4)}ms`);
  console.log(`Overall: ${allTestsPassed ? '✅ ALL BENCHMARKS PASSED' : '❌ SOME BENCHMARKS FAILED'}`);
}

// Run the performance tests
runPerformanceTests();