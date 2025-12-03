/**
 * SelectInputField Serialization Tests
 * 
 * Tests the serialization and deserialization functionality of the SelectInputField component.
 * Ensures that dropdown options and selection state are properly preserved through JSON serialization cycles.
 * 
 * Test Coverage:
 * - Basic select field serialization/deserialization
 * - Complex option arrays with value/label pairs
 * - Form validation and error state handling
 * - Disabled options and accessibility features
 * - Performance benchmarks for option-heavy dropdowns
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { SelectInputField } from '../../../components/input/SelectInputField';

// Ensure the component is registered
import '../../../schemas/transformers/registry';

describe('SelectInputField Serialization', () => {
  // Performance tracking
  const performanceData: Array<{ operation: string; duration: number }> = [];
  
  afterAll(() => {
    // Log performance summary
    console.log('\n📊 SelectInputField Serialization Performance Summary:');
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

  describe('Basic Select Field', () => {
    it('serializes and deserializes basic select field correctly', () => {
      const originalProps = {
        label: 'Country',
        value: 'us',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' }
        ],
        required: true,
        placeholder: 'Select a country'
      };

      let serializedData: Record<string, unknown>;
      let deserializedElement: React.ReactElement;

      // Test serialization
      const serializationTime = measurePerformance('Basic Serialization', () => {
        const element = <SelectInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData).toBeDefined();
      expect(serializedData.tag).toBe('SelectInputField');
      expect(serializedData.data.label).toBe(originalProps.label);
      expect(serializedData.data.value).toBe(originalProps.value);
      expect(serializedData.data.required).toBe(originalProps.required);
      expect(serializedData.data.placeholder).toBe(originalProps.placeholder);
      expect(serializedData.data.options).toEqual(originalProps.options);

      // Test deserialization
      const deserializationTime = measurePerformance('Basic Deserialization', () => {
        deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(React.isValidElement(deserializedElement)).toBe(true);
      expect(deserializedElement.type).toBe(SelectInputField);

      // Test re-serialization (round-trip)
      const reserializationTime = measurePerformance('Basic Re-serialization', () => {
        const reserialized = ComponentTransformer.serialize(deserializedElement);
        reserializedData = JSON.parse(reserialized);
      });

      expect(reserializedData).toEqual(serializedData);

      // Performance assertions
      expect(serializationTime).toBeLessThan(1); // Should be under 1ms
      expect(deserializationTime).toBeLessThan(1);
      expect(reserializationTime).toBeLessThan(1);
    });

    it('renders serialized select field correctly', () => {
      const originalProps = {
        label: 'Priority Level',
        value: 'high',
        options: [
          { value: 'low', label: 'Low Priority' },
          { value: 'medium', label: 'Medium Priority' },
          { value: 'high', label: 'High Priority' }
        ]
      };

      const element = <SelectInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      JSON.parse(serialized);
      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;

      const { getByText } = render(deserializedElement);

      expect(getByText('Priority Level')).toBeInTheDocument();
    });
  });

  describe('Complex Option Arrays', () => {
    it('serializes complex options with disabled states correctly', () => {
      const originalProps = {
        label: 'Service Plan',
        value: 'pro',
        options: [
          { value: 'free', label: 'Free Plan', disabled: false },
          { value: 'starter', label: 'Starter Plan', disabled: false },
          { value: 'pro', label: 'Professional Plan', disabled: false },
          { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
        ]
      };

      const element = <SelectInputField {...originalProps} />;

      let serializedData: Record<string, unknown>;
      measurePerformance('Complex Options Serialization', () => {
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData.data.options).toHaveLength(4);
      expect(serializedData.data.options[3].disabled).toBe(true);
      expect(serializedData.data.options[0].disabled).toBe(false);

      const deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);

      expect(reserializedData.data.options).toEqual(originalProps.options);
    });

    it('handles numeric values in options correctly', () => {
      const originalProps = {
        label: 'Age Range',
        value: 25,
        options: [
          { value: 18, label: '18-24 years' },
          { value: 25, label: '25-34 years' },
          { value: 35, label: '35-44 years' },
          { value: 45, label: '45+ years' }
        ]
      };

      const element = <SelectInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      expect(serializedData.data.value).toBe(25);
      expect(serializedData.data.options[1].value).toBe(25);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);

      expect(reserializedData.data.value).toBe(25);
      expect(reserializedData.data.options[1].value).toBe(25);
    });
  });

  describe('Form Validation Properties', () => {
    it('preserves validation and error state through serialization', () => {
      const originalProps = {
        label: 'Required Selection',
        value: '',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ],
        required: true,
        error: 'Please select an option',
        helperText: 'Choose from the available options'
      };

      const element = <SelectInputField {...originalProps} />;

      let serializedData: Record<string, unknown>;
      measurePerformance('Validation Serialization', () => {
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect((serializedData.data as Record<string, unknown>).required).toBe(true);
      expect((serializedData.data as Record<string, unknown>).error).toBe(originalProps.error);
      expect((serializedData.data as Record<string, unknown>).helperText).toBe(originalProps.helperText);

      const deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      const { getByText } = render(deserializedElement);

      expect(getByText('Required Selection')).toBeInTheDocument();
      expect(getByText('Please select an option')).toBeInTheDocument();
    });

    it('handles disabled select field correctly', () => {
      const originalProps = {
        label: 'Locked Selection',
        value: 'locked',
        options: [
          { value: 'locked', label: 'Locked Option' },
          { value: 'other', label: 'Other Option' }
        ],
        disabled: true,
        helperText: 'This selection cannot be changed'
      };

      const element = <SelectInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);
      
      expect(serializedData.data.disabled).toBe(true);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);
      
      expect(reserializedData.data.disabled).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty options array correctly', () => {
      const originalProps = {
        label: 'Empty Select',
        value: '',
        options: [],
        placeholder: 'No options available'
      };

      const element = <SelectInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      expect(serializedData.data.options).toEqual([]);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const { getByText } = render(deserializedElement);
      
      expect(getByText('No options provided for select field')).toBeInTheDocument();
    });

    it('handles special characters in option labels', () => {
      const specialOptions = [
        { value: 'unicode', label: 'Unicode: åäö 中文 🚀' },
        { value: 'quotes', label: 'With "quotes" and \'apostrophes\'' },
        { value: 'html', label: 'HTML: <div>tags</div> & entities' }
      ];

      const originalProps = {
        label: 'Special Characters',
        value: 'unicode',
        options: specialOptions
      };

      const element = <SelectInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      expect(serializedData.data.options).toEqual(specialOptions);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);

      expect(reserializedData.data.options).toEqual(specialOptions);
    });

    it('handles undefined/null values gracefully', () => {
      const originalProps = {
        label: 'Nullable Field',
        value: '',
        options: [
          { value: '', label: 'None' },
          { value: 'some', label: 'Some Value' }
        ],
        placeholder: undefined,
        helperText: undefined,
        error: undefined
      };

      const element = <SelectInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      // Undefined values should not appear in serialized data
      expect(serializedData.data.placeholder).toBeUndefined();
      expect(serializedData.data.helperText).toBeUndefined();
      expect(serializedData.data.error).toBeUndefined();

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      expect(React.isValidElement(deserializedElement)).toBe(true);
    });
  });

  describe('Large Option Sets Performance', () => {
    it('handles large option arrays efficiently', () => {
      // Generate 1000 options
      const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
        value: `option_${i}`,
        label: `Option ${i + 1}`,
        disabled: i % 100 === 99 // Every 100th option is disabled
      }));

      const originalProps = {
        label: 'Large Select',
        value: 'option_500',
        options: largeOptions
      };

      let serializedData: unknown;

      // Test serialization performance with large dataset
      const serializationTime = measurePerformance('Large Options Serialization (1000 items)', () => {
        const element = <SelectInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      // Test deserialization performance
      const deserializationTime = measurePerformance('Large Options Deserialization (1000 items)', () => {
        ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(serializedData.data.options).toHaveLength(1000);
      expect(serializationTime).toBeLessThan(10); // Should handle 1000 options in under 10ms
      expect(deserializationTime).toBeLessThan(10);

      // Verify random sample correctness
      const randomIndex = Math.floor(Math.random() * 1000);
      const originalOption = largeOptions[randomIndex];
      const serializedOption = serializedData.data.options[randomIndex];

      expect(serializedOption.value).toBe(originalOption.value);
      expect(serializedOption.label).toBe(originalOption.label);
      expect(serializedOption.disabled).toBe(originalOption.disabled);
    });
  });

  describe('Performance Benchmarks', () => {
    it('meets performance targets for bulk operations', () => {
      const testConfigurations = Array.from({ length: 50 }, (_, i) => ({
        label: `Select Field ${i + 1}`,
        value: `option_${i % 5}`,
        options: Array.from({ length: 10 }, (_, j) => ({
          value: `option_${j}`,
          label: `Option ${j + 1}`,
          disabled: j === 9
        })),
        required: i % 2 === 0
      }));

      let elements: React.ReactElement[];
      let serializedData: unknown[];
      let deserializedElements: React.ReactElement[];

      // Bulk serialization
      const bulkSerializationTime = measurePerformance('Bulk Serialization (50 selects)', () => {
        elements = testConfigurations.map(props => <SelectInputField {...props} />);
        serializedData = elements.map(element => {
          const serialized = ComponentTransformer.serialize(element);
          return JSON.parse(serialized);
        });
      });

      // Bulk deserialization
      const bulkDeserializationTime = measurePerformance('Bulk Deserialization (50 selects)', () => {
        deserializedElements = serializedData.map(data => ComponentTransformer.deserialize(JSON.stringify(data)) as React.ReactElement);
      });

      expect(serializedData).toHaveLength(50);
      expect(deserializedElements).toHaveLength(50);
      expect(bulkSerializationTime).toBeLessThan(25); // Should handle 50 selects in under 25ms
      expect(bulkDeserializationTime).toBeLessThan(25);

      // Verify random sample correctness
      const randomIndex = Math.floor(Math.random() * 50);
      const originalConfig = testConfigurations[randomIndex];
      const serializedConfig = serializedData[randomIndex];

      expect(serializedConfig.data.label).toBe(originalConfig.label);
      expect(serializedConfig.data.options).toEqual(originalConfig.options);
    });
  });

  describe('Data Integrity', () => {
    it('maintains referential integrity through multiple serialization cycles', () => {
      const originalProps = {
        label: 'Cycle Test Select',
        value: 'middle',
        options: [
          { value: 'first', label: 'First Option' },
          { value: 'middle', label: 'Middle Option' },
          { value: 'last', label: 'Last Option', disabled: true }
        ],
        required: true
      };

      let currentElement = <SelectInputField {...originalProps} />;
      let lastSerializedData: unknown;

      // Perform 10 serialize-deserialize cycles
      for (let cycle = 0; cycle < 10; cycle++) {
        const serialized = ComponentTransformer.serialize(currentElement);
        const serializedData = JSON.parse(serialized);
        currentElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
        lastSerializedData = serializedData;
      }

      // Verify data integrity after 10 cycles
      expect(lastSerializedData.data.label).toBe(originalProps.label);
      expect(lastSerializedData.data.value).toBe(originalProps.value);
      expect(lastSerializedData.data.options).toEqual(originalProps.options);
      expect(lastSerializedData.data.required).toBe(originalProps.required);
    });
  });
});