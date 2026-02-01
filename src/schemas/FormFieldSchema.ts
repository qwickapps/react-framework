/**
 * Schema for FormField component - Themed text/number input field
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import ViewSchema from './ViewSchema';

@Schema('FormField', '1.0.0')
export class FormFieldModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Label text for the input field',
    placeholder: 'Enter label...'
  })
  @IsString()
  label!: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Value',
    description: 'Current input value',
    placeholder: ''
  })
  @IsString()
  value!: string | number;

  @Field({ defaultValue: 'text' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Input Type',
    description: 'Type of input field'
  })
  @IsOptional()
  @IsIn(['text', 'number', 'password', 'email', 'tel'])
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Helper Text',
    description: 'Helper text displayed below the input',
    placeholder: 'Enter helper text...'
  })
  @IsOptional()
  @IsString()
  helperText?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Required',
    description: 'Mark field as required'
  })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Read Only',
    description: 'Make field read-only'
  })
  @IsOptional()
  @IsBoolean()
  readOnly?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disable the input field'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Disabled Color',
    description: 'Custom color for disabled state (CSS color value)',
    placeholder: 'var(--theme-text-disabled)'
  })
  @IsOptional()
  @IsString()
  disabledColor?: string;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Full Width',
    description: 'Make input take full width of container'
  })
  @IsOptional()
  @IsBoolean()
  fullWidth?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Multiline',
    description: 'Enable multiline textarea mode'
  })
  @IsOptional()
  @IsBoolean()
  multiline?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Rows',
    description: 'Number of rows for multiline textarea',
    placeholder: '4'
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  rows?: number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder',
    description: 'Placeholder text',
    placeholder: 'Enter text...'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;
}

export default FormFieldModel;
