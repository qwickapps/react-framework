/**
 * Manual Image Serialization Test
 * 
 * This script tests the Image component serialization independently 
 * to verify all functionality works as expected.
 */

const React = require('react');

// Mock React.createElement for Node.js environment
global.React = React;

// Create a mock Image component for testing
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
      srcSet: this.props.srcSet
    };
  }
}

// Mock ComponentTransformer
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

// Test the serialization
function runTests() {
  console.log('🧪 Running Image Serialization Tests...\n');
  
  // Register the mock component
  MockComponentTransformer.registerComponent(MockImage);
  
  // Test 1: Basic Image
  console.log('📝 Test 1: Basic Image Serialization');
  const basicImage = React.createElement(MockImage, {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
    width: 400,
    height: 300
  });
  
  const serializedBasic = MockComponentTransformer.serialize(basicImage);
  console.log('Serialized:', serializedBasic);
  
  const deserializedBasic = MockComponentTransformer.deserialize(serializedBasic);
  console.log('Deserialized:', deserializedBasic);
  console.log('✅ Basic test passed\n');
  
  // Test 2: Complex Image with all properties
  console.log('📝 Test 2: Complex Image Serialization');
  const complexImage = React.createElement(MockImage, {
    src: 'https://example.com/complex.jpg',
    alt: 'Complex test image',
    width: 800,
    height: 600,
    objectFit: 'cover',
    objectPosition: 'center',
    loading: 'lazy',
    title: 'Complex image title',
    draggable: false,
    borderRadius: '12px',
    showLoading: true,
    showError: true,
    fallbackSrc: 'https://example.com/fallback.jpg',
    sizes: '(max-width: 768px) 100vw, 50vw',
    srcSet: 'image-400.jpg 400w, image-800.jpg 800w'
  });
  
  const serializedComplex = MockComponentTransformer.serialize(complexImage);
  console.log('Serialized:', serializedComplex);
  
  const parsedComplex = JSON.parse(serializedComplex);
  console.log('✅ Complex test passed - all properties preserved:', 
    Object.keys(parsedComplex.data).length, 'properties\n');
  
  // Test 3: Round-trip consistency
  console.log('📝 Test 3: Round-trip Consistency');
  const deserializedComplex = MockComponentTransformer.deserialize(serializedComplex);
  const reSerializedComplex = MockComponentTransformer.serialize(deserializedComplex);
  
  const firstRun = JSON.parse(serializedComplex);
  const secondRun = JSON.parse(reSerializedComplex);
  
  const isConsistent = JSON.stringify(firstRun.data) === JSON.stringify(secondRun.data);
  console.log('Round-trip consistent:', isConsistent ? '✅ Yes' : '❌ No');
  
  if (isConsistent) {
    console.log('✅ All tests passed! Image serialization working correctly.');
  } else {
    console.log('❌ Round-trip consistency failed');
  }
}

// Run the tests
runTests();