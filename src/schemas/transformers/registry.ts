/**
 * Component Registration - Central registry for serializable components
 * 
 * This file registers all components that implement the Serializable interface
 * with the ComponentTransformer system. Components must be registered here
 * to support JSON serialization/deserialization functionality.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Container } from '../../components/base/Container';
import { Code } from '../../components/blocks/Code';
import { HeroBlock } from '../../components/blocks/HeroBlock';
import { Image } from '../../components/blocks/Image';
import { Section } from '../../components/blocks/Section';
import { Text } from '../../components/blocks/Text';
import { Button } from '../../components/buttons/Button';
import { FormBlock } from '../../components/forms/FormBlock';
import { ChoiceInputField } from '../../components/input/ChoiceInputField';
import { HtmlInputField } from '../../components/input/HtmlInputField';
import { SelectInputField } from '../../components/input/SelectInputField';
import { SwitchInputField } from '../../components/input/SwitchInputField';
import { TextInputField } from '../../components/input/TextInputField';
import { GridCell } from '../../components/layout/GridCell';
import { GridLayout } from '../../components/layout/GridLayout';

/**
 * Register all serializable components with the ComponentTransformer
 * This function should be called once during application initialization
 * 
 * Phase 0: Foundation in place - ready for component migration
 * Phase 1+: Components will be migrated to createSerializableView factory
 */
import { ComponentTransformer } from './ComponentTransformer';

export function registerSerializableComponents(): void {
  // Type for serializable components
  type SerializableComponent = { tagName: string; version: string; fromJson: (data: unknown) => React.ReactElement };

  // Register Container component - Base layout component with child serialization support
  ComponentTransformer.registerComponent(Container as unknown as SerializableComponent);

  // Register Code component - First production component with serialization support
  ComponentTransformer.registerComponent(Code as unknown as SerializableComponent);

  // Register Section component - Layout container component with child serialization support
  ComponentTransformer.registerComponent(Section as unknown as SerializableComponent);

  // Register Button component - Interactive component with action serialization support
  ComponentTransformer.registerComponent(Button as unknown as SerializableComponent);

  // Register Image component - Display component with comprehensive image handling and serialization support
  ComponentTransformer.registerComponent(Image as unknown as SerializableComponent);

  // Register Text component - Typography component with comprehensive text styling and serialization support
  ComponentTransformer.registerComponent(Text as unknown as SerializableComponent);

  // Register HeroBlock component - Full-width hero section with nested component serialization support
  ComponentTransformer.registerComponent(HeroBlock as unknown as SerializableComponent);

  // Register GridLayout component - Flexible grid layout with nested component serialization support
  ComponentTransformer.registerComponent(GridLayout as unknown as SerializableComponent);

  // Register GridCell component - Grid cell wrapper with nested component serialization support
  ComponentTransformer.registerComponent(GridCell as unknown as SerializableComponent);

  // Register Form Components - Complete form field components with serialization support
  ComponentTransformer.registerComponent(TextInputField as unknown as SerializableComponent);
  ComponentTransformer.registerComponent(SelectInputField as unknown as SerializableComponent);
  ComponentTransformer.registerComponent(HtmlInputField as unknown as SerializableComponent);
  ComponentTransformer.registerComponent(ChoiceInputField as unknown as SerializableComponent);
  ComponentTransformer.registerComponent(SwitchInputField as unknown as SerializableComponent);
  ComponentTransformer.registerComponent(FormBlock as unknown as SerializableComponent);
  
  // Future components will be registered here as they implement Serializable
  // etc.
}

/**
 * Auto-registration: Register components immediately when this module is imported
 * This ensures components are available for serialization as soon as the module loads
 */
registerSerializableComponents();