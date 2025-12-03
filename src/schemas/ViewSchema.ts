/**
 * ViewSchema - Comprehensive base class for all view components
 * 
 * Provides ALL props from BaseComponentProps as schema fields including:
 * - Grid layout props (span, breakpoints)
 * - Dimension props (width, height with t-shirt sizing)
 * - Spacing props (padding, margin with t-shirt sizing) 
 * - Background and styling props
 * - Accessibility and HTML attributes
 * - Event handlers
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Editor, Field, FieldType, Model, Schema } from '@qwickapps/schema';
import { IsIn, IsInt, IsOptional, IsString, Min, ValidateIf } from 'class-validator';
import type { SxProps, Theme } from '@mui/material/styles';
import 'reflect-metadata';
import type { FocusEventHandler, MouseEventHandler } from 'react';

@Schema('ViewSchema', '1.0.0')
export class ViewSchema extends Model {
  
  // ========================================
  // GRID LAYOUT PROPS
  // ========================================
  
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Grid Span',
    description: 'Column span for grid layouts (number, auto, or grow)'
  })
  @IsOptional()
  @ValidateIf((_, v) => typeof v === 'string')
  @IsIn(['auto', 'grow'])
  @ValidateIf((_, v) => typeof v === 'number')
  @IsInt()
  @Min(1)
  span?: number | 'auto' | 'grow';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Extra Small Breakpoint (xs)',
    description: 'Column span for extra small screens'
  })
  @IsOptional()
  @ValidateIf((_, v) => typeof v === 'string')
  @IsIn(['auto'])
  @ValidateIf((_, v) => typeof v === 'number')
  @IsInt()
  @Min(1)
  xs?: number | 'auto';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Small Breakpoint (sm)', 
    description: 'Column span for small screens'
  })
  @IsOptional()
  @ValidateIf((_, v) => typeof v === 'string')
  @IsIn(['auto'])
  @ValidateIf((_, v) => typeof v === 'number')
  @IsInt()
  @Min(1)
  sm?: number | 'auto';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Medium Breakpoint (md)',
    description: 'Column span for medium screens'
  })
  @IsOptional()
  @ValidateIf((_, v) => typeof v === 'string')
  @IsIn(['auto'])
  @ValidateIf((_, v) => typeof v === 'number')
  @IsInt()
  @Min(1)
  md?: number | 'auto';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Large Breakpoint (lg)',
    description: 'Column span for large screens'
  })
  @IsOptional()
  @ValidateIf((_, v) => typeof v === 'string')
  @IsIn(['auto'])
  @ValidateIf((_, v) => typeof v === 'number')
  @IsInt()
  @Min(1)
  lg?: number | 'auto';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Extra Large Breakpoint (xl)',
    description: 'Column span for extra large screens'
  })
  @IsOptional()
  @ValidateIf((_, v) => typeof v === 'string')
  @IsIn(['auto'])
  @ValidateIf((_, v) => typeof v === 'number')
  @IsInt()
  @Min(1)
  xl?: number | 'auto';

  // ========================================
  // STYLING PROPS
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class Name',
    description: 'Additional CSS class name for custom styling',
    placeholder: 'custom-class-name'
  })
  @IsOptional()
  @IsString()
  className?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'MUI SX Props',
    description: 'MUI sx prop as JSON string for advanced styling',
    placeholder: '{"color": "primary.main", "fontWeight": "bold"}'
  })
  @IsOptional()
  @IsString()
  sx?: SxProps<Theme>;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Inline Styles',
    description: 'Inline CSS styles as JSON string',
    placeholder: '{"color": "red", "margin": "10px"}'
  })
  @IsOptional()
  @IsString()
  style?: React.CSSProperties;

  // ========================================
  // DIMENSION PROPS 
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Width',
    description: 'Component width (t-shirt sizes, breakpoints, CSS values, or numbers)',
    placeholder: 'medium, 300px, 50%, auto, grow'
  })
  @IsOptional()
  @IsString()
  width?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Height',
    description: 'Component height (t-shirt sizes, CSS values, or numbers)',
    placeholder: 'medium, 200px, 50vh, auto'
  })
  @IsOptional()
  @IsString()
  height?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Minimum Width',
    description: 'Minimum width constraint',
    placeholder: 'small, 100px, auto'
  })
  @IsOptional()
  @IsString()
  minWidth?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Minimum Height',
    description: 'Minimum height constraint',
    placeholder: 'small, 100px, auto'
  })
  @IsOptional()
  @IsString()
  minHeight?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Maximum Width',
    description: 'Maximum width constraint',
    placeholder: 'large, lg, 1200px'
  })
  @IsOptional()
  @IsString()
  maxWidth?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Maximum Height',
    description: 'Maximum height constraint',
    placeholder: 'large, 500px, 80vh'
  })
  @IsOptional()
  @IsString()
  maxHeight?: string | number;

  // ========================================
  // SPACING PROPS
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding',
    description: 'Internal spacing for all sides'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  padding?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding Top',
    description: 'Internal spacing for top side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  paddingTop?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding Right',
    description: 'Internal spacing for right side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  paddingRight?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding Bottom',
    description: 'Internal spacing for bottom side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  paddingBottom?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding Left',
    description: 'Internal spacing for left side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  paddingLeft?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding Horizontal (X)',
    description: 'Internal spacing for left and right sides'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  paddingX?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Padding Vertical (Y)',
    description: 'Internal spacing for top and bottom sides'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  paddingY?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin',
    description: 'External spacing for all sides'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  margin?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin Top',
    description: 'External spacing for top side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  marginTop?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin Right',
    description: 'External spacing for right side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  marginRight?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin Bottom',
    description: 'External spacing for bottom side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  marginBottom?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin Left',
    description: 'External spacing for left side'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  marginLeft?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin Horizontal (X)',
    description: 'External spacing for left and right sides'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  marginX?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Margin Vertical (Y)',
    description: 'External spacing for top and bottom sides'
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'tiny', 'small', 'medium', 'large', 'huge'])
  marginY?: string | number;

  // ========================================
  // BACKGROUND PROPS
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background',
    description: 'Background fill (color, gradient, image CSS). Canonical name.',
    placeholder: '#ffffff, primary.main, linear-gradient(...)'
  })
  @IsOptional()
  @IsString()
  background?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Color (Deprecated)',
    description: 'Use background instead. Kept for backward compatibility.',
    placeholder: '#ffffff, primary.main'
  })
  @IsOptional()
  @IsString()
  backgroundColor?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Image',
    description: 'Background image URL',
    placeholder: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  backgroundImage?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Gradient',
    description: 'CSS gradient for background',
    placeholder: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
  })
  @IsOptional()
  @IsString()
  backgroundGradient?: string;

  // ========================================
  // TEXT ALIGNMENT
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Text Alignment',
    description: 'Text alignment within the component'
  })
  @IsOptional()
  @IsString()
  @IsIn(['left', 'center', 'right', 'justify'])
  textAlign?: 'left' | 'center' | 'right' | 'justify';

  // ========================================
  // HTML ATTRIBUTES & ACCESSIBILITY
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Element ID',
    description: 'Unique HTML element ID',
    placeholder: 'unique-element-id'
  })
  @IsOptional()
  @IsString()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Role',
    description: 'ARIA role for accessibility',
    placeholder: 'button, navigation, main, etc.'
  })
  @IsOptional()
  @IsString()
  role?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ARIA Label',
    description: 'Accessibility label for screen readers',
    placeholder: 'Describe this element...'
  })
  @IsOptional()
  @IsString()
  'aria-label'?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ARIA Labelled By',
    description: 'IDs of elements that label this component',
    placeholder: 'label-element-id'
  })
  @IsOptional()
  @IsString()
  'aria-labelledby'?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ARIA Described By',
    description: 'IDs of elements that describe this component',
    placeholder: 'element-id-1 element-id-2'
  })
  @IsOptional()
  @IsString()
  'aria-describedby'?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Data Test ID',
    description: 'Test automation identifier',
    placeholder: 'test-element-name'
  })
  @IsOptional()
  @IsString()
  'data-testid'?: string;

  // ========================================
  // EVENT HANDLERS (as strings for schema)
  // ========================================

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Click Handler',
    description: 'JavaScript function for click events',
    placeholder: 'function(event) { console.debug("clicked"); }'
  })
  @IsOptional()
  @IsString()
  onClick?: MouseEventHandler<unknown>;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Mouse Enter Handler',
    description: 'JavaScript function for mouse enter events',
    placeholder: 'function(event) { /* hover start */ }'
  })
  @IsOptional()
  @IsString()
  onMouseEnter?: MouseEventHandler<unknown>;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Mouse Leave Handler',
    description: 'JavaScript function for mouse leave events',
    placeholder: 'function(event) { /* hover end */ }'
  })
  @IsOptional()
  @IsString()
  onMouseLeave?: MouseEventHandler<unknown>;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Focus Handler',
    description: 'JavaScript function for focus events',
    placeholder: 'function(event) { /* element focused */ }'
  })
  @IsOptional()
  @IsString()
  onFocus?: FocusEventHandler<unknown>;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Blur Handler',
    description: 'JavaScript function for blur events',
    placeholder: 'function(event) { /* element blurred */ }'
  })
  @IsOptional()
  @IsString()
  onBlur?: FocusEventHandler<unknown>;
}

export default ViewSchema;