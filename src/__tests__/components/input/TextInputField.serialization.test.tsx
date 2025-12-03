/**
 * TextInputField Serialization Tests
 * 
 * Tests the serialization and deserialization functionality of the TextInputField component.
 * Ensures that all component properties are properly preserved through JSON serialization cycles.
 * 
 * Test Coverage:
 * - Basic text input serialization/deserialization
 * - Multiline textarea field handling
 * - Form validation properties (required, error, helperText)
 * - Input type variations (text, email, password, etc.)
 * - Performance benchmarks for serialization operations
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { TextInputField } from '../../../components/input/TextInputField';

// Ensure the component is registered
import '../../../schemas/transformers/registry';

describe('TextInputField Serialization', () => {
  // Performance tracking
  const performanceData: Array<{ operation: string; duration: number }> = [];
  
  beforeEach(() => {
    // Clear component registry for clean tests
    ComponentTransformer.clearRegistry();
    
    // Register TextInputField component
    ComponentTransformer.registerComponent(TextInputField as unknown as React.ComponentType);
  });

  afterEach(() => {
    ComponentTransformer.clearRegistry();
  });
  
  afterAll(() => {
    // Log performance summary
    console.log('\n📊 TextInputField Serialization Performance Summary:');
    performanceData.forEach(({ operation, duration }) => {
      console.log(`  • ${operation}: ${duration.toFixed(3)}ms`);
    });
    const avgDuration = performanceData.reduce((sum, { duration }) => sum + duration, 0) / performanceData.length;
    console.log(`  • Average: ${avgDuration.toFixed(3)}ms\n`);
  });

  const measurePerformance = (operation: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const duration = performance.now() - start;
    performanceData.push({ operation, duration });
    return duration;
  };

  describe('Basic Text Input Field', () => {
    it('serializes and deserializes basic text input correctly', () => {
      const originalProps = {
        label: 'Full Name',
        value: 'John Doe',
        placeholder: 'Enter your full name',
        required: true,
        disabled: false,
        type: 'text'
      };

      let serializedData: string;
      let deserializedElement: React.ReactElement;
      let reserializedData: string;

      // Test serialization
      const serializationTime = measurePerformance('Basic Serialization', () => {
        const element = <TextInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData).toBeDefined();
      expect(serializedData.tag).toBe('TextInputField');
      expect(serializedData.data.label).toBe(originalProps.label);
      expect(serializedData.data.value).toBe(originalProps.value);
      expect(serializedData.data.placeholder).toBe(originalProps.placeholder);
      expect(serializedData.data.required).toBe(originalProps.required);
      expect(serializedData.data.disabled).toBe(originalProps.disabled);
      expect(serializedData.data.type).toBe(originalProps.type);

      // Test deserialization
      const deserializationTime = measurePerformance('Basic Deserialization', () => {
        deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(React.isValidElement(deserializedElement)).toBe(true);
      expect(deserializedElement.type).toBe(TextInputField);

      // Test re-serialization (round-trip)
      const reserializationTime = measurePerformance('Basic Re-serialization', () => {
        const reserialized = ComponentTransformer.serialize(deserializedElement);
        reserializedData = JSON.parse(reserialized);
      });

      expect(reserializedData.data).toEqual(serializedData.data);

      // Performance assertions
      expect(serializationTime).toBeLessThan(1); // Should be under 1ms
      expect(deserializationTime).toBeLessThan(1);
      expect(reserializationTime).toBeLessThan(1);
    });

    it('renders serialized component correctly', () => {
      const originalProps = {
        label: 'Email Address',
        value: 'user@example.com',
        type: 'email',
        required: true
      };

      const element = <TextInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;

      const { getByDisplayValue, getByLabelText } = render(deserializedElement);
      
      expect(getByLabelText('Email Address *')).toBeInTheDocument();
      expect(getByDisplayValue('user@example.com')).toBeInTheDocument();
    });
  });

  describe('Multiline Textarea Field', () => {
    it('serializes multiline textarea properties correctly', () => {
      const originalProps = {
        label: 'Description',
        value: 'This is a multi-line\ndescription with\nline breaks.',
        multiline: true,
        rows: 4,
        maxRows: 8,
        placeholder: 'Enter your description...'
      };

      const element = <TextInputField {...originalProps} />;

      let serializedData: Record<string, unknown>;
      measurePerformance('Multiline Serialization', () => {
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData.data.multiline).toBe(true);
      expect(serializedData.data.rows).toBe(4);
      expect(serializedData.data.maxRows).toBe(8);
      expect(serializedData.data.value).toBe(originalProps.value);

      const deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      const reserializedString = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserializedString);

      expect(reserializedData.data.multiline).toBe(true);
      expect(reserializedData.data.rows).toBe(4);
      expect(reserializedData.data.maxRows).toBe(8);
    });
  });

  describe('Form Validation Properties', () => {
    it('preserves validation and error state through serialization', () => {
      const originalProps = {
        label: 'Username',
        value: 'invalid-username!',
        required: true,
        error: 'Username can only contain letters and numbers',
        helperText: 'Choose a unique username'
      };

      const element = <TextInputField {...originalProps} />;

      let serializedData: Record<string, unknown>;
      measurePerformance('Validation Serialization', () => {
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData.data.required).toBe(true);
      expect(serializedData.data.error).toBe(originalProps.error);
      expect(serializedData.data.helperText).toBe(originalProps.helperText);

      const deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      const { getByLabelText, getByText } = render(deserializedElement);

      expect(getByLabelText('Username *')).toBeInTheDocument();
      expect(getByText('Username can only contain letters and numbers')).toBeInTheDocument();
    });

    it('handles disabled state correctly', () => {
      const originalProps = {
        label: 'Locked Field',
        value: 'Cannot be changed',
        disabled: true,
        helperText: 'This field is read-only'
      };

      const element = <TextInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);
      
      expect(serializedData.data.disabled).toBe(true);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const { getByDisplayValue } = render(deserializedElement);
      
      const inputElement = getByDisplayValue('Cannot be changed') as HTMLInputElement;
      expect(inputElement.disabled).toBe(true);
    });
  });

  describe('Input Type Variations', () => {
    const inputTypes = ['text', 'email', 'password', 'number', 'tel', 'url'];

    inputTypes.forEach(inputType => {
      it(`serializes ${inputType} input type correctly`, () => {
        const originalProps = {
          label: `${inputType.charAt(0).toUpperCase() + inputType.slice(1)} Field`,
          value: inputType === 'number' ? '42' : `sample-${inputType}`,
          type: inputType,
          placeholder: `Enter ${inputType}`
        };

        const element = <TextInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        const serializedData = JSON.parse(serialized);

        expect(serializedData.data.type).toBe(inputType);

        const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
        const reserializedString = ComponentTransformer.serialize(deserializedElement);
        const reserializedData = JSON.parse(reserializedString);

        expect(reserializedData.data.type).toBe(inputType);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty/undefined values correctly', () => {
      const originalProps = {
        label: 'Optional Field',
        value: '',
        placeholder: undefined,
        helperText: undefined,
        error: undefined
      };

      const element = <TextInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      expect(serializedData.data.value).toBe('');
      // Undefined values should not appear in serialized data
      expect(serializedData.data.placeholder).toBeUndefined();
      expect(serializedData.data.helperText).toBeUndefined();
      expect(serializedData.data.error).toBeUndefined();

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      expect(React.isValidElement(deserializedElement)).toBe(true);
    });

    it('handles special characters in text values', () => {
      const specialText = 'Special chars: åäö 中文 🚀 "quotes" <tags> & symbols!';
      const originalProps = {
        label: 'Unicode Test',
        value: specialText,
        placeholder: 'Special chars: åäö 中文 🚀'
      };

      const element = <TextInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      expect(serializedData.data.value).toBe(specialText);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const { getByDisplayValue } = render(deserializedElement);
      
      expect(getByDisplayValue(specialText)).toBeInTheDocument();
    });
  });

  describe('Performance Benchmarks', () => {
    it('meets performance targets for bulk operations', () => {
      const testConfigurations = Array.from({ length: 100 }, (_, i) => ({
        label: `Field ${i + 1}`,
        value: `Value ${i + 1}`,
        type: ['text', 'email', 'password'][i % 3],
        required: i % 2 === 0,
        multiline: i % 5 === 0,
        rows: i % 5 === 0 ? 3 : undefined
      }));

      let elements: React.ReactElement[];
      let serializedData: string[];
      let deserializedElements: React.ReactElement[];

      // Bulk serialization
      const bulkSerializationTime = measurePerformance('Bulk Serialization (100 items)', () => {
        elements = testConfigurations.map(props => <TextInputField {...props} />);
        serializedData = elements.map(element => JSON.parse(ComponentTransformer.serialize(element)));
      });

      // Bulk deserialization
      const bulkDeserializationTime = measurePerformance('Bulk Deserialization (100 items)', () => {
        deserializedElements = serializedData.map(data => ComponentTransformer.deserialize(JSON.stringify(data)) as React.ReactElement);
      });

      expect(serializedData).toHaveLength(100);
      expect(deserializedElements).toHaveLength(100);
      expect(bulkSerializationTime).toBeLessThan(50); // Should handle 100 items in under 50ms
      expect(bulkDeserializationTime).toBeLessThan(50);

      // Verify random sample correctness
      const randomIndex = Math.floor(Math.random() * 100);
      const originalConfig = testConfigurations[randomIndex];
      const serializedConfig = serializedData[randomIndex];

      expect(serializedConfig.data.label).toBe(originalConfig.label);
      expect(serializedConfig.data.value).toBe(originalConfig.value);
      expect(serializedConfig.data.type).toBe(originalConfig.type);
    });
  });

  describe('Data Integrity', () => {
    it('maintains referential integrity through multiple serialization cycles', () => {
      const originalProps = {
        label: 'Cycle Test Field',
        value: 'Original Value',
        required: true,
        multiline: true,
        rows: 5
      };

      let currentElement = <TextInputField {...originalProps} />;
      let lastSerializedData: Record<string, unknown>;

      // Perform 10 serialize-deserialize cycles
      for (let cycle = 0; cycle < 10; cycle++) {
        const serializedString = ComponentTransformer.serialize(currentElement);
        lastSerializedData = JSON.parse(serializedString);
        currentElement = ComponentTransformer.deserialize(serializedString) as React.ReactElement;
      }

      // Verify data integrity after 10 cycles
      expect(lastSerializedData.data.label).toBe(originalProps.label);
      expect(lastSerializedData.data.value).toBe(originalProps.value);
      expect(lastSerializedData.data.required).toBe(originalProps.required);
      expect(lastSerializedData.data.multiline).toBe(originalProps.multiline);
      expect(lastSerializedData.data.rows).toBe(originalProps.rows);
    });
  });
});