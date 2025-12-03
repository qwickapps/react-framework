/**
 * CollapsibleLayout Schema - Data model for collapsible layout component
 * 
 * Advanced expandable/collapsible container with header controls, animations,
 * content management, and state persistence capabilities.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { 
  Schema, 
  Field, 
  Editor, 
  Model, 
  FieldType 
} from '@qwickapps/schema';
import { IsOptional, IsString, IsBoolean, IsIn } from 'class-validator';
import { ReactNode } from 'react';

@Schema('CollapsibleLayout', '1.0.0')
export class CollapsibleLayoutModel extends Model {
  
  // ========================================
  // Core Collapse Control
  // ========================================
  
  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Collapsed',
    description: 'Whether the layout is currently collapsed'
  })
  @IsOptional()
  @IsBoolean()
  collapsed?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Default Collapsed',
    description: 'Initial collapsed state for uncontrolled usage'
  })
  @IsOptional()
  @IsBoolean()
  defaultCollapsed?: boolean;
  
  // ========================================
  // Enhanced Header Configuration
  // ========================================
  
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Main title displayed in the header',
    placeholder: 'Enter title...'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Subtitle',
    description: 'Secondary text displayed below the title',
    placeholder: 'Enter subtitle...'
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Lead Icon',
    description: 'Icon displayed before the title (icon identifier or HTML)',
    placeholder: 'Icon identifier...'
  })
  @IsOptional()
  @IsString()
  leadIcon?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Header Actions',
    description: 'Additional controls displayed in header (HTML/React content)',
    placeholder: 'Enter header actions HTML...'
  })
  @IsOptional()
  @IsString()
  headerActions?: string;
  
  // ========================================
  // Content Management
  // ========================================
  
  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Collapsed View',
    description: 'Summary content shown when collapsed (HTML supported)',
    placeholder: 'Enter collapsed view content...'
  })
  @IsOptional()
  @IsString()
  collapsedView?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Content',
    description: 'Main content shown when expanded (HTML supported)',
    placeholder: 'Enter main content...'
  })
  @IsOptional()
  @IsString()
  children?: ReactNode | string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Footer View',
    description: 'Always visible footer content (HTML supported)',
    placeholder: 'Enter footer content...'
  })
  @IsOptional()
  @IsString()
  footerView?: string;
  
  // ========================================
  // Advanced Features
  // ========================================
  
  @Field({ defaultValue: 'header' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Trigger Area',
    description: 'Area that responds to clicks for toggle functionality',
    validation: {
      options: [
        { label: 'Button Only', value: 'button' },
        { label: 'Header Area', value: 'header' },
        { label: 'Button and Header', value: 'both' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['button', 'header', 'both'])
  triggerArea?: 'button' | 'header' | 'both';

  @Field({ defaultValue: 'slide' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Animation Style',
    description: 'Animation variant for expand/collapse transitions',
    validation: {
      options: [
        { label: 'Fade', value: 'fade' },
        { label: 'Slide', value: 'slide' },
        { label: 'Scale', value: 'scale' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['fade', 'slide', 'scale'])
  animationStyle?: 'fade' | 'slide' | 'scale';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Persist State',
    description: 'Save collapse state in local storage'
  })
  @IsOptional()
  @IsBoolean()
  persistState?: boolean;
  
  // ========================================
  // Icons Configuration
  // ========================================
  
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Collapsed Icon',
    description: 'Icon shown when content is collapsed (default: VisibilityIcon)',
    placeholder: 'Icon identifier...'
  })
  @IsOptional()
  @IsString()
  collapsedIcon?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Expanded Icon',
    description: 'Icon shown when content is expanded (default: VisibilityOffIcon)',
    placeholder: 'Icon identifier...'
  })
  @IsOptional()
  @IsString()
  expandedIcon?: string;
  
  // ========================================
  // Layout Configuration
  // ========================================
  
  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Divider',
    description: 'Show divider lines between header, content, and footer sections'
  })
  @IsOptional()
  @IsBoolean()
  showDivider?: boolean;
  
  // ========================================
  // Framework Integration
  // ========================================
  
  @Field({ defaultValue: 'default' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Variant',
    description: 'Visual style variant for the layout container',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Filled', value: 'filled' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['default', 'outlined', 'elevated', 'filled'])
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';

  @Field({ defaultValue: 'comfortable' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Header Spacing',
    description: 'Padding/spacing within the header area',
    validation: {
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Spacious', value: 'spacious' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['compact', 'comfortable', 'spacious'])
  headerSpacing?: 'compact' | 'comfortable' | 'spacious';

  @Field({ defaultValue: 'comfortable' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Content Spacing',
    description: 'Padding/spacing within the content area',
    validation: {
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Spacious', value: 'spacious' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['compact', 'comfortable', 'spacious'])
  contentSpacing?: 'compact' | 'comfortable' | 'spacious';
}

export default CollapsibleLayoutModel;