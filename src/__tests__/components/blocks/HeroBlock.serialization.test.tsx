/**
 * HeroBlock Serialization Performance Tests
 * 
 * Comprehensive test suite for HeroBlock component serialization functionality,
 * including performance benchmarks and nested component serialization.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import '@testing-library/jest-dom';
import HeroBlock from '../../../components/blocks/HeroBlock';
import { ComponentTransformer } from '../../../schemas/transformers/ComponentTransformer';
import '../../../schemas/transformers/registry';

describe('HeroBlock Serialization', () => {
  describe('Performance Benchmarks', () => {
    it('serializes basic HeroBlock in under 1ms', () => {
      const heroComponent = (
        <HeroBlock 
          title="Performance Test Hero"
          subtitle="Testing serialization speed"
          backgroundColor="primary"
          textAlign="center"
          blockHeight="medium"
        />
      );

      const startTime = performance.now();
      const serializedData = ComponentTransformer.serialize(heroComponent);
      const endTime = performance.now();
      
      const serializationTime = endTime - startTime;
      
      expect(serializedData).toBeDefined();
      expect(serializationTime).toBeLessThan(1); // Less than 1ms target
      
      const parsedData = JSON.parse(serializedData);
      expect(parsedData.tag).toBe('HeroBlock');
      expect(parsedData.data.title).toBe('Performance Test Hero');
    });

    it('serializes complex HeroBlock with multiple actions in under 2ms', () => {
      const complexHero = (
        <HeroBlock 
          title="Complex Performance Test"
          subtitle="Hero with multiple actions and configurations"
          backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          backgroundImage="https://example.com/hero-bg.jpg"
          overlayOpacity={0.7}
          textAlign="center"
          blockHeight="large"
          actions={[
            { label: 'Primary Action', variant: 'primary', buttonSize: 'large', href: '/test' },
            { label: 'Secondary Action', variant: 'secondary', buttonSize: 'medium', target: '_blank' },
            { label: 'Outlined Action', variant: 'outlined', buttonSize: 'small' },
            { label: 'Text Action', variant: 'text', disabled: true },
            { label: 'Loading Action', variant: 'contained', loading: true }
          ]}
        />
      );

      const startTime = performance.now();
      const serializedData = ComponentTransformer.serialize(complexHero);
      const endTime = performance.now();
      
      const serializationTime = endTime - startTime;
      
      expect(serializedData).toBeDefined();
      expect(serializationTime).toBeLessThan(2); // Less than 2ms target for complex components
      
      const parsedData = JSON.parse(serializedData);
      expect(parsedData.tag).toBe('HeroBlock');
      expect(parsedData.data.actions).toHaveLength(5);
    });

    it('deserializes HeroBlock in under 1ms', () => {
      const heroComponent = (
        <HeroBlock 
          title="Deserialization Test"
          subtitle="Testing deserialization speed"
          backgroundColor="secondary"
          actions={[
            { label: 'Test Action', variant: 'primary', buttonSize: 'large' }
          ]}
        />
      );

      const serializedData = ComponentTransformer.serialize(heroComponent);
      
      const startTime = performance.now();
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      const endTime = performance.now();
      
      const deserializationTime = endTime - startTime;
      
      expect(deserializedComponent).toBeDefined();
      expect(React.isValidElement(deserializedComponent)).toBe(true);
      expect(deserializationTime).toBeLessThan(1); // Less than 1ms target
    });

    it('performs round-trip serialization 100 times in under 100ms', () => {
      const heroComponent = (
        <HeroBlock 
          title="Batch Test Hero"
          subtitle="Testing batch serialization performance"
          backgroundColor="primary"
          actions={[
            { label: 'Batch Action', variant: 'primary', buttonSize: 'medium' }
          ]}
        />
      );

      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        const serialized = ComponentTransformer.serialize(heroComponent);
        const deserialized = ComponentTransformer.deserialize(serialized);
        expect(React.isValidElement(deserialized)).toBe(true);
      }
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      
      expect(totalTime).toBeLessThan(100); // 100 round-trips in under 100ms (1ms per operation)
      
      // Average time per operation should be under 1ms
      const averageTime = totalTime / 100;
      expect(averageTime).toBeLessThan(1);
    });
  });

  describe('Nested Component Serialization', () => {
    it('properly serializes HeroBlock with Button actions', () => {
      const heroWithActions = (
        <HeroBlock 
          title="Hero with Nested Actions"
          subtitle="Testing nested Button component serialization"
          backgroundGradient="linear-gradient(45deg, #2196F3, #21CBF3)"
          textAlign="center"
          blockHeight="medium"
          actions={[
            { 
              label: 'Primary Button', 
              variant: 'primary', 
              buttonSize: 'large',
              href: '/primary-action'
            },
            { 
              label: 'Secondary Button', 
              variant: 'secondary', 
              buttonSize: 'medium',
              disabled: false,
              loading: false
            }
          ]}
        />
      );

      const serializedData = ComponentTransformer.serialize(heroWithActions);
      const parsedData = JSON.parse(serializedData);
      
      // Verify HeroBlock serialization
      expect(parsedData.tag).toBe('HeroBlock');
      expect(parsedData.version).toBe('1.0.0');
      expect(parsedData.data.title).toBe('Hero with Nested Actions');
      
      // Verify nested actions serialization
      expect(parsedData.data.actions).toHaveLength(2);
      expect(parsedData.data.actions[0].label).toBe('Primary Button');
      expect(parsedData.data.actions[0].variant).toBe('primary');
      expect(parsedData.data.actions[0].buttonSize).toBe('large');
      expect(parsedData.data.actions[0].href).toBe('/primary-action');
      
      expect(parsedData.data.actions[1].label).toBe('Secondary Button');
      expect(parsedData.data.actions[1].variant).toBe('secondary');
      expect(parsedData.data.actions[1].buttonSize).toBe('medium');

      // Verify deserialization works
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('handles complex action configurations with custom properties', () => {
      const complexActionsHero = (
        <HeroBlock 
          title="Complex Actions Test"
          actions={[
            {
              label: 'Navigate Action',
              variant: 'primary',
              buttonSize: 'large',
              action: { type: 'navigate', url: '/dashboard', target: '_self' }
            },
            {
              label: 'External Action',
              variant: 'outlined',
              buttonSize: 'medium',
              action: { type: 'external', url: 'https://example.com', target: '_blank' }
            },
            {
              label: 'Custom Handler',
              variant: 'text',
              buttonSize: 'small',
              action: { type: 'custom', customHandler: 'handleCustomClick' }
            }
          ]}
        />
      );

      const serializedData = ComponentTransformer.serialize(complexActionsHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data.actions).toHaveLength(3);
      
      // Verify complex action structures are preserved
      expect(parsedData.data.actions[0].action.type).toBe('navigate');
      expect(parsedData.data.actions[0].action.url).toBe('/dashboard');
      expect(parsedData.data.actions[0].action.target).toBe('_self');
      
      expect(parsedData.data.actions[1].action.type).toBe('external');
      expect(parsedData.data.actions[1].action.url).toBe('https://example.com');
      
      expect(parsedData.data.actions[2].action.type).toBe('custom');
      expect(parsedData.data.actions[2].action.customHandler).toBe('handleCustomClick');

      // Verify deserialization maintains complex structures
      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('preserves all background configuration options', () => {
      const backgroundConfigHero = (
        <HeroBlock 
          title="Background Config Test"
          subtitle="Testing all background options"
          backgroundImage="https://example.com/hero-bg.jpg"
          backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          backgroundColor="primary"
          overlayOpacity={0.8}
          textAlign="right"
          blockHeight="viewport"
        />
      );

      const serializedData = ComponentTransformer.serialize(backgroundConfigHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data.backgroundImage).toBe('https://example.com/hero-bg.jpg');
      expect(parsedData.data.backgroundGradient).toBe('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
      expect(parsedData.data.backgroundColor).toBe('primary');
      expect(parsedData.data.overlayOpacity).toBe(0.8);
      expect(parsedData.data.textAlign).toBe('right');
      expect(parsedData.data.blockHeight).toBe('viewport');

      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('handles data binding configuration preservation', () => {
      const dataBindingHero = (
        <HeroBlock 
          dataSource="heroes.main"
          bindingOptions={{ cache: true, cacheTTL: 300000, strict: false }}
          title="Fallback Title"
          subtitle="Fallback Subtitle"
        />
      );

      const serializedData = ComponentTransformer.serialize(dataBindingHero);
      const parsedData = JSON.parse(serializedData);
      
      // Verify data binding properties are preserved
      expect(parsedData.data.dataSource).toBe('heroes.main');
      expect(parsedData.data.bindingOptions.cache).toBe(true);
      expect(parsedData.data.bindingOptions.cacheTTL).toBe(300000);
      expect(parsedData.data.bindingOptions.strict).toBe(false);
      
      // Verify fallback props are preserved
      expect(parsedData.data.title).toBe('Fallback Title');
      expect(parsedData.data.subtitle).toBe('Fallback Subtitle');

      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });

    it('handles edge cases with empty and undefined values', () => {
      const edgeCaseHero = (
        <HeroBlock 
          title=""
          subtitle={undefined}
          actions={[]}
          backgroundImage={undefined}
          overlayOpacity={0}
          className=""
        />
      );

      const serializedData = ComponentTransformer.serialize(edgeCaseHero);
      const parsedData = JSON.parse(serializedData);
      
      expect(parsedData.data.title).toBe('');
      expect(parsedData.data.actions).toEqual([]);
      expect(parsedData.data.overlayOpacity).toBe(0);

      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });
  });

  describe('Data Integrity', () => {
    it('maintains complete data integrity through multiple serialization cycles', () => {
      const originalHero = (
        <HeroBlock 
          title="Data Integrity Test"
          subtitle="Testing multiple serialization cycles"
          backgroundGradient="linear-gradient(45deg, #FF6B6B, #4ECDC4)"
          backgroundColor="secondary"
          textAlign="center"
          blockHeight="large"
          overlayOpacity={0.6}
          actions={[
            { 
              label: 'Complex Action', 
              variant: 'primary', 
              buttonSize: 'large',
              href: '/test-url',
              target: '_blank',
              disabled: false,
              loading: false,
              fullWidth: false,
              action: { 
                type: 'navigate', 
                url: '/complex-url', 
                target: '_self' 
              }
            }
          ]}
        />
      );

      // First serialization cycle
      const serialized1 = ComponentTransformer.serialize(originalHero);
      const deserialized1 = ComponentTransformer.deserialize(serialized1);
      
      // Second serialization cycle
      const serialized2 = ComponentTransformer.serialize(deserialized1 as React.ReactElement);
      const deserialized2 = ComponentTransformer.deserialize(serialized2);
      
      // Third serialization cycle
      const serialized3 = ComponentTransformer.serialize(deserialized2 as React.ReactElement);
      const parsedData3 = JSON.parse(serialized3);
      
      // Verify data integrity is maintained across multiple cycles
      expect(parsedData3.tag).toBe('HeroBlock');
      expect(parsedData3.version).toBe('1.0.0');
      expect(parsedData3.data.title).toBe('Data Integrity Test');
      expect(parsedData3.data.subtitle).toBe('Testing multiple serialization cycles');
      expect(parsedData3.data.backgroundGradient).toBe('linear-gradient(45deg, #FF6B6B, #4ECDC4)');
      expect(parsedData3.data.backgroundColor).toBe('secondary');
      expect(parsedData3.data.textAlign).toBe('center');
      expect(parsedData3.data.blockHeight).toBe('large');
      expect(parsedData3.data.overlayOpacity).toBe(0.6);
      
      expect(parsedData3.data.actions).toHaveLength(1);
      expect(parsedData3.data.actions[0].label).toBe('Complex Action');
      expect(parsedData3.data.actions[0].variant).toBe('primary');
      expect(parsedData3.data.actions[0].href).toBe('/test-url');
      expect(parsedData3.data.actions[0].target).toBe('_blank');
      expect(parsedData3.data.actions[0].action.type).toBe('navigate');
      expect(parsedData3.data.actions[0].action.url).toBe('/complex-url');
      
      const finalDeserialized = ComponentTransformer.deserialize(serialized3);
      expect(React.isValidElement(finalDeserialized)).toBe(true);
    });

    it('preserves component hierarchy and structure', () => {
      const structuralHero = (
        <HeroBlock 
          title="Structural Test"
          subtitle="Testing component structure preservation"
          backgroundColor="primary"
          actions={[
            { label: 'Action 1', variant: 'primary' },
            { label: 'Action 2', variant: 'secondary' },
            { label: 'Action 3', variant: 'outlined' }
          ]}
        />
      );

      const serializedData = ComponentTransformer.serialize(structuralHero);
      const parsedData = JSON.parse(serializedData);
      
      // Verify component structure
      expect(parsedData).toHaveProperty('tag');
      expect(parsedData).toHaveProperty('version');
      expect(parsedData).toHaveProperty('data');
      
      // Verify nested structure (actions array)
      expect(parsedData.data.actions).toBeInstanceOf(Array);
      expect(parsedData.data.actions).toHaveLength(3);

      parsedData.data.actions.forEach((action: Record<string, unknown>, index: number) => {
        expect(action).toHaveProperty('label');
        expect(action).toHaveProperty('variant');
        expect(action.label).toBe(`Action ${index + 1}`);
      });

      const deserializedComponent = ComponentTransformer.deserialize(serializedData);
      expect(React.isValidElement(deserializedComponent)).toBe(true);
    });
  });
});