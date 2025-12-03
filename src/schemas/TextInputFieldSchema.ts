/**
 * Schema for TextInputField component - Reusable text input with consistent styling
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

@Schema('TextInputField', '1.0.0')
export class TextInputFieldModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Field Label',
    description: 'The label displayed for the text input field',
    placeholder: 'Enter field label...'
  })
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Value',
    description: 'Current field value',
    placeholder: 'Enter value...'
  })
  @IsOptional()
  @IsString()
  value?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Required',
    description: 'Whether the field is required'
  })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether the field is disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Error Message',
    description: 'Error message to display if validation fails',
    placeholder: 'Enter error message...'
  })
  @IsOptional()
  @IsString()
  error?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Helper Text',
    description: 'Helper text to guide the user',
    placeholder: 'Enter helper text...'
  })
  @IsOptional()
  @IsString()
  helperText?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder',
    description: 'Placeholder text shown when field is empty',
    placeholder: 'Enter placeholder text...'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Input Type',
    description: 'HTML input type (text, email, number, password, etc.)',
    placeholder: 'text'
  })
  @IsOptional()
  @IsString()
  type?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Multiline',
    description: 'Whether the field supports multiple lines (textarea)'
  })
  @IsOptional()
  @IsBoolean()
  multiline?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Rows',
    description: 'Number of rows for multiline fields'
  })
  @IsOptional()
  @IsNumber()
  rows?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Max Rows',
    description: 'Maximum number of rows for multiline fields'
  })
  @IsOptional()
  @IsNumber()
  maxRows?: number;
}

export default TextInputFieldModel;