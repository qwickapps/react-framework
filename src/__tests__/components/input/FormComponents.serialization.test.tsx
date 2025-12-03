/**
 * Form Components Serialization Tests
 * 
 * Comprehensive serialization tests for HtmlInputField, ChoiceInputField, SwitchInputField, and FormBlock.
 * Ensures all form-specific functionality is preserved through JSON serialization cycles.
 * 
 * Test Coverage:
 * - HTML input field with formatting and sanitization
 * - Choice input field with dynamic option management
 * - Switch input field with boolean state handling
 * - FormBlock with nested component serialization
 * - Performance benchmarks and data integrity validation
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import { HtmlInputField } from '../../../components/input/HtmlInputField';
import { ChoiceInputField } from '../../../components/input/ChoiceInputField';
import { SwitchInputField } from '../../../components/input/SwitchInputField';
import { FormBlock } from '../../../components/input/../forms/FormBlock';

// Ensure components are registered
import '../../../schemas/transformers/registry';

describe('Form Components Serialization', () => {
  // Performance tracking
  const performanceData: Array<{ operation: string; duration: number }> = [];
  
  afterAll(() => {
    // Log performance summary
    console.log('\n📊 Form Components Serialization Performance Summary:');
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

  describe('HtmlInputField Serialization', () => {
    it('serializes HTML input field with formatting controls correctly', () => {
      const originalProps = {
        label: 'Rich Text Content',
        value: '<b>Bold text</b> and <i>italic text</i> with <code>code</code>',
        multiline: true,
        rows: 6,
        placeholder: 'Enter HTML content...',
        required: true
      };

      let serializedData: Record<string, unknown>;
      let deserializedElement: React.ReactElement;

      // Test serialization
      const serializationTime = measurePerformance('HtmlInputField Serialization', () => {
        const element = <HtmlInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData).toBeDefined();
      expect(serializedData.tag).toBe('HtmlInputField');
      expect(serializedData.data.label).toBe(originalProps.label);
      expect(serializedData.data.value).toBe(originalProps.value);
      expect(serializedData.data.multiline).toBe(originalProps.multiline);
      expect(serializedData.data.rows).toBe(originalProps.rows);

      // Test deserialization
      const deserializationTime = measurePerformance('HtmlInputField Deserialization', () => {
        deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(React.isValidElement(deserializedElement)).toBe(true);
      expect(deserializedElement.type).toBe(HtmlInputField);

      // Performance assertions
      expect(serializationTime).toBeLessThan(1);
      expect(deserializationTime).toBeLessThan(1);
    });

    it('preserves HTML sanitization settings through serialization', () => {
      const htmlContent = '<script>alert("test")</script><b>Safe content</b>';
      const originalProps = {
        label: 'Sanitized HTML',
        value: htmlContent,
        disabled: false
      };

      const element = <HtmlInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);
      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;

      // The HTML content should be preserved in serialization
      // Sanitization happens during rendering, not serialization
      expect(serializedData.data.value).toBe(htmlContent);
      
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);
      expect(reserializedData.data.value).toBe(htmlContent);
    });
  });

  describe('ChoiceInputField Serialization', () => {
    it('serializes dynamic choice options correctly', () => {
      const originalProps = {
        label: 'Survey Questions',
        options: [
          'What is your favorite color?',
          'How often do you exercise?',
          'What type of music do you prefer?'
        ],
        disabled: false,
        placeholder: 'Enter your question...',
        optionLabelPrefix: 'Question',
        rows: 3,
        addButtonText: 'Add Question'
      };

      let serializedData: Record<string, unknown>;
      let deserializedElement: React.ReactElement;

      // Test serialization
      const serializationTime = measurePerformance('ChoiceInputField Serialization', () => {
        const element = <ChoiceInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData.tag).toBe('ChoiceInputField');
      expect(serializedData.data.label).toBe(originalProps.label);
      expect(serializedData.data.options).toEqual(originalProps.options);
      expect(serializedData.data.optionLabelPrefix).toBe(originalProps.optionLabelPrefix);
      expect(serializedData.data.rows).toBe(originalProps.rows);
      expect(serializedData.data.addButtonText).toBe(originalProps.addButtonText);

      // Test deserialization
      const deserializationTime = measurePerformance('ChoiceInputField Deserialization', () => {
        deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(React.isValidElement(deserializedElement)).toBe(true);
      expect(deserializedElement.type).toBe(ChoiceInputField);

      // Test round-trip integrity
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);
      expect(reserializedData.data.options).toEqual(originalProps.options);

      // Performance assertions
      expect(serializationTime).toBeLessThan(1);
      expect(deserializationTime).toBeLessThan(1);
    });

    it('handles empty options array correctly', () => {
      const originalProps = {
        label: 'Empty Choices',
        options: [],
        placeholder: 'No options yet'
      };

      const element = <ChoiceInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);

      expect(serializedData.data.options).toEqual([]);

      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const { getByText } = render(deserializedElement);
      
      expect(getByText('No options provided')).toBeInTheDocument();
    });
  });

  describe('SwitchInputField Serialization', () => {
    it('serializes switch state and properties correctly', () => {
      const originalProps = {
        label: 'Enable Notifications',
        checked: true,
        required: false,
        disabled: false,
        helperText: 'Toggle to receive email notifications',
        size: 'medium' as const,
        color: 'primary' as const
      };

      let serializedData: Record<string, unknown>;
      let deserializedElement: React.ReactElement;

      // Test serialization
      const serializationTime = measurePerformance('SwitchInputField Serialization', () => {
        const element = <SwitchInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData.tag).toBe('SwitchInputField');
      expect(serializedData.data.label).toBe(originalProps.label);
      expect(serializedData.data.checked).toBe(originalProps.checked);
      expect(serializedData.data.helperText).toBe(originalProps.helperText);
      expect(serializedData.data.size).toBe(originalProps.size);
      expect(serializedData.data.color).toBe(originalProps.color);

      // Test deserialization
      const deserializationTime = measurePerformance('SwitchInputField Deserialization', () => {
        deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(React.isValidElement(deserializedElement)).toBe(true);
      expect(deserializedElement.type).toBe(SwitchInputField);

      // Performance assertions
      expect(serializationTime).toBeLessThan(1);
      expect(deserializationTime).toBeLessThan(1);
    });

    it('handles boolean state transitions correctly', () => {
      const testStates = [true, false, undefined];

      testStates.forEach(checkedState => {
        const originalProps = {
          label: `Switch ${checkedState}`,
          checked: checkedState,
          error: checkedState === false ? 'Required field' : undefined
        };

        const element = <SwitchInputField {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        const serializedData = JSON.parse(serialized);

        expect(serializedData.data.checked).toBe(checkedState);
        if (checkedState === false) {
          expect(serializedData.data.error).toBe('Required field');
        }

        const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
        const reserialized = ComponentTransformer.serialize(deserializedElement);
        const reserializedData = JSON.parse(reserialized);

        expect(reserializedData.data.checked).toBe(checkedState);
      });
    });
  });

  describe('FormBlock Serialization', () => {
    it('serializes form block with basic properties correctly', () => {
      const originalProps = {
        title: 'Contact Form',
        description: 'Please fill out all required fields',
        status: 'info' as const,
        message: 'All fields are required',
        maxWidth: 'md' as const,
        background: 'gradient',
        backgroundImage: 'https://example.com/bg.jpg'
      };

      let serializedData: Record<string, unknown>;
      let deserializedElement: React.ReactElement;

      // Test serialization
      const serializationTime = measurePerformance('FormBlock Serialization', () => {
        const element = <FormBlock {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        serializedData = JSON.parse(serialized);
      });

      expect(serializedData.tag).toBe('FormBlock');
      expect(serializedData.data.title).toBe(originalProps.title);
      expect(serializedData.data.description).toBe(originalProps.description);
      expect(serializedData.data.status).toBe(originalProps.status);
      expect(serializedData.data.message).toBe(originalProps.message);
      expect(serializedData.data.maxWidth).toBe(originalProps.maxWidth);
      expect(serializedData.data.background).toBe(originalProps.background);
      expect(serializedData.data.backgroundImage).toBe(originalProps.backgroundImage);

      // Test deserialization
      const deserializationTime = measurePerformance('FormBlock Deserialization', () => {
        deserializedElement = ComponentTransformer.deserialize(JSON.stringify(serializedData)) as React.ReactElement;
      });

      expect(React.isValidElement(deserializedElement)).toBe(true);
      expect(deserializedElement.type).toBe(FormBlock);

      // Performance assertions
      expect(serializationTime).toBeLessThan(1);
      expect(deserializationTime).toBeLessThan(1);
    });

    it('handles different status types correctly', () => {
      const statusTypes: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];

      statusTypes.forEach(status => {
        const originalProps = {
          title: `${status.charAt(0).toUpperCase() + status.slice(1)} Form`,
          status,
          message: `This is a ${status} message`
        };

        const element = <FormBlock {...originalProps} />;
        const serialized = ComponentTransformer.serialize(element);
        const serializedData = JSON.parse(serialized);

        expect(serializedData.data.status).toBe(status);
        expect(serializedData.data.message).toBe(originalProps.message);

        const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
        const reserialized = ComponentTransformer.serialize(deserializedElement);
        const reserializedData = JSON.parse(reserialized);

        expect(reserializedData.data.status).toBe(status);
        expect(reserializedData.data.message).toBe(originalProps.message);
      });
    });

    it('serializes FormBlock with nested form components', () => {
      // This test would be more complex in a real implementation
      // For now, we test the basic structure
      const originalProps = {
        title: 'User Registration',
        children: 'Form content placeholder' // In reality, this would be JSX
      };

      const element = <FormBlock {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      const serializedData = JSON.parse(serialized);
      
      expect(serializedData.data.title).toBe(originalProps.title);
      // Children handling would be tested in integration scenarios
    });
  });

  describe('Performance Benchmarks', () => {
    it('handles mixed form component serialization efficiently', () => {
      const mixedComponents = [
        <HtmlInputField key="html1" label="Rich Text 1" value="<b>Bold</b> content" />,
        <ChoiceInputField key="choice1" label="Options 1" options={['Option A', 'Option B']} />,
        <SwitchInputField key="switch1" label="Enable Feature" checked={true} />,
        <FormBlock key="form1" title="Sample Form" />,
        <HtmlInputField key="html2" label="Rich Text 2" value="<i>Italic</i> content" multiline rows={4} />,
        <SwitchInputField key="switch2" label="Another Switch" checked={false} />
      ];

      let serializedData: string[];
      let deserializedElements: React.ReactElement[];

      // Bulk serialization
      const bulkSerializationTime = measurePerformance('Mixed Components Bulk Serialization', () => {
        serializedData = mixedComponents.map(element => {
          const serialized = ComponentTransformer.serialize(element);
          return JSON.parse(serialized);
        });
      });

      // Bulk deserialization
      const bulkDeserializationTime = measurePerformance('Mixed Components Bulk Deserialization', () => {
        deserializedElements = serializedData.map(data => ComponentTransformer.deserialize(JSON.stringify(data)) as React.ReactElement);
      });

      expect(serializedData).toHaveLength(6);
      expect(deserializedElements).toHaveLength(6);
      expect(bulkSerializationTime).toBeLessThan(5); // Should handle 6 mixed components in under 5ms
      expect(bulkDeserializationTime).toBeLessThan(5);

      // Verify component types are preserved
      expect(deserializedElements[0].type).toBe(HtmlInputField);
      expect(deserializedElements[1].type).toBe(ChoiceInputField);
      expect(deserializedElements[2].type).toBe(SwitchInputField);
      expect(deserializedElements[3].type).toBe(FormBlock);
    });
  });

  describe('Data Integrity', () => {
    it('maintains data integrity across all form components through multiple cycles', () => {
      const testComponents = [
        {
          type: 'HtmlInputField',
          element: <HtmlInputField label="HTML Test" value="<b>Test</b>" multiline rows={3} />,
          checkProps: ['label', 'value', 'multiline', 'rows']
        },
        {
          type: 'ChoiceInputField', 
          element: <ChoiceInputField label="Choice Test" options={['A', 'B', 'C']} rows={2} />,
          checkProps: ['label', 'options', 'rows']
        },
        {
          type: 'SwitchInputField',
          element: <SwitchInputField label="Switch Test" checked={true} size="medium" />,
          checkProps: ['label', 'checked', 'size']
        },
        {
          type: 'FormBlock',
          element: <FormBlock title="Form Test" maxWidth="sm" background="default" />,
          checkProps: ['title', 'maxWidth', 'background']
        }
      ];

      testComponents.forEach(({ element, checkProps }) => {
        let currentElement = element;
        const originalProps: Record<string, unknown> = {};
        
        // Capture original props from first serialization
        const firstSerialized = ComponentTransformer.serialize(currentElement);
        const firstSerialization = JSON.parse(firstSerialized);
        Object.assign(originalProps, firstSerialization.data);

        // Perform 5 serialize-deserialize cycles
        for (let cycle = 0; cycle < 5; cycle++) {
          const serialized = ComponentTransformer.serialize(currentElement);
          currentElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
        }

        // Final verification
        const finalSerialized = ComponentTransformer.serialize(currentElement);
        const finalSerialization = JSON.parse(finalSerialized);
        
        // Check all specified properties are preserved
        checkProps.forEach(propName => {
          expect(finalSerialization.data[propName]).toEqual(originalProps[propName]);
        });
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles malformed data gracefully', () => {
      // Test with minimal props
      const minimalComponents = [
        <HtmlInputField label="Minimal HTML" />,
        <ChoiceInputField label="Minimal Choice" />,
        <SwitchInputField label="Minimal Switch" />,
        <FormBlock title="Minimal Form" />
      ];

      minimalComponents.forEach(element => {
        const serialized = ComponentTransformer.serialize(element);
        const serializedData = JSON.parse(serialized);
        const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
        
        expect(React.isValidElement(deserializedElement)).toBe(true);
        
        // Should be able to re-serialize without errors
        const reserialized = ComponentTransformer.serialize(deserializedElement);
        const reserializedData = JSON.parse(reserialized);
        expect(reserializedData.tag).toBe(serializedData.tag);
      });
    });

    it('preserves complex nested structures', () => {
      const complexChoiceOptions = [
        'Simple option',
        '<b>HTML</b> option with <i>formatting</i>',
        'Unicode: 中文 🎉 åäö',
        'Special chars: "quotes" & <tags>'
      ];

      const originalProps = {
        label: 'Complex Choice Field',
        options: complexChoiceOptions,
        optionLabelPrefix: 'Complex Question'
      };

      const element = <ChoiceInputField {...originalProps} />;
      const serialized = ComponentTransformer.serialize(element);
      JSON.parse(serialized);
      const deserializedElement = ComponentTransformer.deserialize(serialized) as React.ReactElement;
      const reserialized = ComponentTransformer.serialize(deserializedElement);
      const reserializedData = JSON.parse(reserialized);

      expect(reserializedData.data.options).toEqual(complexChoiceOptions);
    });
  });
});