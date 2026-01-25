/**
 * Schema for OptionSelector component - Universal option selection with visual modes
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString, IsNumber, IsIn, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType, DataType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

// Select option model
export class SelectOptionModel {
  @Field({ dataType: DataType.STRING })
  @IsString()
  id!: string;

  @Field({ dataType: DataType.STRING })
  @IsString()
  label!: string;

  @Field({ dataType: DataType.BOOLEAN })
  @IsBoolean()
  available!: boolean;

  @Field({ dataType: DataType.NUMBER })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Hex Color Value',
    description: 'Hex color code for color swatches (e.g., #FF0000)',
    placeholder: '#FF0000'
  })
  @IsOptional()
  @IsString()
  hexValue?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Image URL',
    description: 'Image URL for image/pattern display mode',
    placeholder: '/patterns/stripes.jpg'
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

// Display modes
export type DisplayMode = 'text' | 'color' | 'image';

// Display variants
export type OptionVariant = 'buttons' | 'dropdown' | 'grid';

// Layout options
export type OptionLayout = 'horizontal' | 'vertical' | 'wrap';

// Visual sizes
export type VisualSize = 'small' | 'medium' | 'large';

@Schema('OptionSelector', '1.0.0')
export class OptionSelectorModel extends ViewSchema {
  @Field({ dataType: DataType.ARRAY })
  @Editor({
    field_type: FieldType.ARRAY,
    label: 'Available Options',
    description: 'Array of options to display',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectOptionModel)
  options!: SelectOptionModel[];

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Selected Option',
    description: 'Currently selected option ID',
    placeholder: 'm'
  })
  @IsOptional()
  @IsString()
  selectedOption?: string;

  @Field({ defaultValue: 'text', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Display Mode',
    description: 'Visual display mode for options',
    validation: {
      options: [
        { label: 'Text (buttons with labels)', value: 'text' },
        { label: 'Color (swatches)', value: 'color' },
        { label: 'Image (patterns/textures)', value: 'image' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['text', 'color', 'image'])
  displayMode?: DisplayMode;

  @Field({ defaultValue: 'grid', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Display Variant',
    description: 'How to display the selector',
    validation: {
      options: [
        { label: 'Buttons', value: 'buttons' },
        { label: 'Dropdown', value: 'dropdown' },
        { label: 'Grid', value: 'grid' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['buttons', 'dropdown', 'grid'])
  variant?: OptionVariant;

  @Field({ defaultValue: 'wrap', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Layout Direction',
    description: 'Layout direction for buttons/grid variant',
    validation: {
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Wrap', value: 'wrap' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['horizontal', 'vertical', 'wrap'])
  layout?: OptionLayout;

  @Field({ defaultValue: 'medium', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Visual Size',
    description: 'Size for color/image display modes',
    validation: {
      options: [
        { label: 'Small (32px)', value: 'small' },
        { label: 'Medium (44px)', value: 'medium' },
        { label: 'Large (56px)', value: 'large' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['small', 'medium', 'large'])
  visualSize?: VisualSize;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Label',
    description: 'Show label below visual (for color/image modes)'
  })
  @IsOptional()
  @IsBoolean()
  showLabel?: boolean;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disable all option selections'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field({ defaultValue: 'Select Option', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Label text for the selector',
    placeholder: 'Select Option'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Data Source',
    description: 'Data source for dynamic option loading',
    placeholder: 'product-options'
  })
  @IsOptional()
  @IsString()
  dataSource?: string;

  @Field({ dataType: DataType.OBJECT })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Binding Options',
    description: 'Data binding configuration (JSON format)',
    placeholder: '{ "filter": {}, "sort": {} }'
  })
  @IsOptional()
  bindingOptions?: Record<string, unknown>;
}

export default OptionSelectorModel;
