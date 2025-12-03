/**
 * Schema for Text component - Comprehensive typography component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { ReactNode } from 'react';
import { IsBoolean, IsOptional, IsString, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType, DataType } from '@qwickapps/schema';

// Typography variants based on Material-UI Typography variants
export type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

// Text alignment options
export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'inherit';

// Text color variants
export type TextColor = 
  | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary'
  | 'error' | 'warning' | 'info' | 'success'
  | 'inherit';

// HTML element types for semantic markup
export type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'legend';

// Text decoration options
export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';

// Font weight options
export type FontWeight = 'inherit' | 'lighter' | 'normal' | 'bold' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Text transform options
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'inherit';

@Schema('Text', '1.0.0')
export class TextModel extends Model {
  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Text Content',
    description: 'The text content to display',
    placeholder: 'Enter your text content here...'
  })
  @IsOptional()
  @IsString()
  content?: string;

  @Field({ defaultValue: 'body1', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Typography Variant',
    description: 'Typography variant that determines font size, weight, and line height',
    validation: {
      options: [
        { label: 'Heading 1', value: 'h1' },
        { label: 'Heading 2', value: 'h2' },
        { label: 'Heading 3', value: 'h3' },
        { label: 'Heading 4', value: 'h4' },
        { label: 'Heading 5', value: 'h5' },
        { label: 'Heading 6', value: 'h6' },
        { label: 'Subtitle 1', value: 'subtitle1' },
        { label: 'Subtitle 2', value: 'subtitle2' },
        { label: 'Body 1', value: 'body1' },
        { label: 'Body 2', value: 'body2' },
        { label: 'Button', value: 'button' },
        { label: 'Caption', value: 'caption' },
        { label: 'Overline', value: 'overline' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'])
  variant?: TextVariant;

  @Field({ defaultValue: 'inherit', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Text Color',
    description: 'Color variant for the text',
    validation: {
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Text Primary', value: 'textPrimary' },
        { label: 'Text Secondary', value: 'textSecondary' },
        { label: 'Error', value: 'error' },
        { label: 'Warning', value: 'warning' },
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Inherit', value: 'inherit' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['primary', 'secondary', 'textPrimary', 'textSecondary', 'error', 'warning', 'info', 'success', 'inherit'])
  color?: TextColor;

  @Field({ defaultValue: 'inherit', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Text Alignment',
    description: 'How to align the text horizontally',
    validation: {
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' },
        { label: 'Inherit', value: 'inherit' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['left', 'center', 'right', 'justify', 'inherit'])
  align?: TextAlign;

  @Field({ defaultValue: 'p', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'HTML Element',
    description: 'The HTML element to render (affects semantics and accessibility)',
    validation: {
      options: [
        { label: 'Paragraph (p)', value: 'p' },
        { label: 'Span', value: 'span' },
        { label: 'Div', value: 'div' },
        { label: 'Heading 1 (h1)', value: 'h1' },
        { label: 'Heading 2 (h2)', value: 'h2' },
        { label: 'Heading 3 (h3)', value: 'h3' },
        { label: 'Heading 4 (h4)', value: 'h4' },
        { label: 'Heading 5 (h5)', value: 'h5' },
        { label: 'Heading 6 (h6)', value: 'h6' },
        { label: 'Label', value: 'label' },
        { label: 'Legend', value: 'legend' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'legend'])
  component?: TextElement;

  @Field({ defaultValue: 'inherit', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Font Weight',
    description: 'The weight (thickness) of the font',
    validation: {
      options: [
        { label: 'Inherit', value: 'inherit' },
        { label: 'Lighter', value: 'lighter' },
        { label: 'Normal', value: 'normal' },
        { label: 'Bold', value: 'bold' },
        { label: 'Bolder', value: 'bolder' },
        { label: '100', value: '100' },
        { label: '200', value: '200' },
        { label: '300', value: '300' },
        { label: '400', value: '400' },
        { label: '500', value: '500' },
        { label: '600', value: '600' },
        { label: '700', value: '700' },
        { label: '800', value: '800' },
        { label: '900', value: '900' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['inherit', 'lighter', 'normal', 'bold', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900'])
  fontWeight?: FontWeight;

  @Field({ defaultValue: 'none', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Text Decoration',
    description: 'Text decoration style',
    validation: {
      options: [
        { label: 'None', value: 'none' },
        { label: 'Underline', value: 'underline' },
        { label: 'Overline', value: 'overline' },
        { label: 'Line Through', value: 'line-through' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'underline', 'overline', 'line-through'])
  textDecoration?: TextDecoration;

  @Field({ defaultValue: 'none', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Text Transform',
    description: 'How to transform the text case',
    validation: {
      options: [
        { label: 'None', value: 'none' },
        { label: 'Capitalize', value: 'capitalize' },
        { label: 'Uppercase', value: 'uppercase' },
        { label: 'Lowercase', value: 'lowercase' },
        { label: 'Inherit', value: 'inherit' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['none', 'capitalize', 'uppercase', 'lowercase', 'inherit'])
  textTransform?: TextTransform;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'No Wrap',
    description: 'Prevent text from wrapping to multiple lines'
  })
  @IsOptional()
  @IsBoolean()
  noWrap?: boolean;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Paragraph Mode',
    description: 'Apply paragraph spacing and formatting'
  })
  @IsOptional()
  @IsBoolean()
  paragraph?: boolean;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Gutter Bottom',
    description: 'Add margin bottom for spacing (useful for headings)'
  })
  @IsOptional()
  @IsBoolean()
  gutterBottom?: boolean;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Font Size',
    description: 'Custom font size (overrides variant sizing, e.g., "16px", "1.2rem")',
    placeholder: '16px'
  })
  @IsOptional()
  @IsString()
  fontSize?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Line Height',
    description: 'Custom line height (e.g., "1.5", "24px", "150%")',
    placeholder: '1.5'
  })
  @IsOptional()
  @IsString()
  lineHeight?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Letter Spacing',
    description: 'Custom letter spacing (e.g., "0.1em", "1px")',
    placeholder: '0.1em'
  })
  @IsOptional()
  @IsString()
  letterSpacing?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Font Family',
    description: 'Custom font family (e.g., "Arial, sans-serif")',
    placeholder: 'Arial, sans-serif'
  })
  @IsOptional()
  @IsString()
  fontFamily?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Custom Color',
    description: 'Custom text color (CSS color value, overrides color variant)',
    placeholder: '#333333 or rgb(51, 51, 51)'
  })
  @IsOptional()
  @IsString()
  customColor?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Max Width',
    description: 'Maximum width for the text (e.g., "300px", "50%")',
    placeholder: '300px'
  })
  @IsOptional()
  @IsString()
  maxWidth?: string;

  // Support for rich content (React node)
  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Rich Content',
    description: 'Rich text content with React elements (for advanced use)',
    placeholder: 'Rich content...'
  })
  @IsOptional()
  children?: ReactNode;
}

export default TextModel;