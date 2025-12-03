/**
 * Image Component Serialization Tests
 * 
 * Tests for the Image component's ModelView implementation and 
 * serialization capabilities using ComponentTransformer.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { Image } from '../../../components/blocks/Image';

describe('Image Serialization', () => {
  beforeEach(() => {
    // Clear component registry for clean tests
    ComponentTransformer.clearRegistry();

    // Register Image component
    ComponentTransformer.registerComponent(Image as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });

  describe('Basic Serialization', () => {
    it('should serialize and deserialize basic image component', () => {
      // Create original component
      const originalComponent = (
        <Image 
          src="https://example.com/image.jpg"
          alt="Test image"
          width={400}
          height={300}
        />
      );

      // Serialize
      const serialized = ComponentTransformer.serialize(originalComponent);
      expect(serialized).toBeTruthy();
      expect(typeof serialized).toBe('string');

      // Parse to check structure
      const parsed = JSON.parse(serialized);
      expect(parsed.tag).toBe('Image');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.data.src).toBe('https://example.com/image.jpg');
      expect(parsed.data.alt).toBe('Test image');
      expect(parsed.data.width).toBe(400);
      expect(parsed.data.height).toBe(300);

      // Deserialize
      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should preserve all image properties through serialization', () => {
      const originalComponent = (
        <Image 
          src="https://example.com/image.jpg"
          alt="Comprehensive test image"
          width={600}
          height={400}
          objectFit="cover"
          objectPosition="center"
          loading="lazy"
          title="Test image title"
          draggable={false}
          borderRadius="12px"
          showLoading={true}
          showError={true}
          fallbackSrc="https://example.com/fallback.jpg"
        />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      const data = parsed.data;

      expect(data.src).toBe('https://example.com/image.jpg');
      expect(data.alt).toBe('Comprehensive test image');
      expect(data.width).toBe(600);
      expect(data.height).toBe(400);
      expect(data.objectFit).toBe('cover');
      expect(data.objectPosition).toBe('center');
      expect(data.loading).toBe('lazy');
      expect(data.title).toBe('Test image title');
      expect(data.draggable).toBe(false);
      expect(data.borderRadius).toBe('12px');
      expect(data.showLoading).toBe(true);
      expect(data.showError).toBe(true);
      expect(data.fallbackSrc).toBe('https://example.com/fallback.jpg');

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle responsive image properties', () => {
      const originalComponent = (
        <Image 
          src="https://example.com/image.jpg"
          alt="Responsive image"
          sizes="(max-width: 768px) 100vw, 50vw"
          srcSet="https://example.com/image-400.jpg 400w, https://example.com/image-800.jpg 800w"
        />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);
      
      expect(parsed.data.sizes).toBe('(max-width: 768px) 100vw, 50vw');
      expect(parsed.data.srcSet).toBe('https://example.com/image-400.jpg 400w, https://example.com/image-800.jpg 800w');

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });
  });

  describe('ModelView Integration', () => {
    it('should have correct static properties', () => {
      const ImageStatic = Image as unknown as { tagName: string; version: string; fromJson: (data: unknown) => React.ReactElement };
      expect(ImageStatic.tagName).toBe('Image');
      expect(ImageStatic.version).toBe('1.0.0');
      expect(typeof ImageStatic.fromJson).toBe('function');
    });

    it('should create instance with toJson method', () => {
      const imageInstance = new Image({
        src: 'https://example.com/test.jpg',
        alt: 'Test image'
      });

      expect(typeof imageInstance.toJson).toBe('function');
      
      const serialized = imageInstance.toJson();
      expect(serialized.src).toBe('https://example.com/test.jpg');
      expect(serialized.alt).toBe('Test image');
    });

    it('should handle fromJson static method', () => {
      const jsonData = {
        src: 'https://example.com/test.jpg',
        alt: 'From JSON test',
        width: 300,
        height: 200
      };

      const ImageStatic = Image as unknown as { fromJson: (data: Record<string, unknown>) => React.ReactElement };
      const component = ImageStatic.fromJson(jsonData);
      expect(React.isValidElement(component)).toBe(true);
    });
  });

  describe('Data Binding Serialization', () => {
    it('should preserve dataSource and bindingOptions', () => {
      const originalComponent = (
        <Image 
          src="https://example.com/image.jpg"
          alt="Data bound image"
          dataSource="images.hero"
          bindingOptions={{
            cache: true,
            cacheTTL: 300000,
            strict: false
          }}
        />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.dataSource).toBe('images.hero');
      expect(parsed.data.bindingOptions).toEqual({
        cache: true,
        cacheTTL: 300000,
        strict: false
      });

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle serialization of image without required props', () => {
      // Image without src should still serialize (though it may not render)
      const originalComponent = <Image alt="Image without src" />;
      
      const serialized = ComponentTransformer.serialize(originalComponent);
      expect(serialized).toBeTruthy();
      
      const parsed = JSON.parse(serialized);
      expect(parsed.tag).toBe('Image');
      expect(parsed.data.alt).toBe('Image without src');
      expect(parsed.data.src).toBeUndefined();

      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });

    it('should handle empty/null values gracefully', () => {
      const originalComponent = (
        <Image 
          src=""
          alt=""
          width={undefined}
          height={undefined}
        />
      );

      const serialized = ComponentTransformer.serialize(originalComponent);
      const parsed = JSON.parse(serialized);

      expect(parsed.data.src).toBe('');
      expect(parsed.data.alt).toBe('');
      
      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(React.isValidElement(deserialized)).toBe(true);
    });
  });

  describe('Component Registry', () => {
    it('should be registered in ComponentTransformer', () => {
      const registeredComponents = ComponentTransformer.getRegisteredComponents();
      expect(registeredComponents).toContain('Image');
    });

    it('should support round-trip serialization consistency', () => {
      const originalComponent = (
        <Image 
          src="https://example.com/consistency-test.jpg"
          alt="Consistency test image"
          width={500}
          height={300}
          objectFit="contain"
          borderRadius="8px"
          showLoading={true}
        />
      );

      // First round-trip
      const serialized1 = ComponentTransformer.serialize(originalComponent);
      const deserialized1 = ComponentTransformer.deserialize(serialized1);
      
      // Second round-trip
      const serialized2 = ComponentTransformer.serialize(deserialized1);
      const parsed1 = JSON.parse(serialized1);
      const parsed2 = JSON.parse(serialized2);

      // Should be identical
      expect(parsed1.tag).toBe(parsed2.tag);
      expect(parsed1.version).toBe(parsed2.version);
      expect(parsed1.data).toEqual(parsed2.data);
    });
  });
});