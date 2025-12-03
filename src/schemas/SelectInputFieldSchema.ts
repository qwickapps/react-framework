/**
 * Schema for SelectInputField component - Select dropdown with options
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

/**
 * Select option definition for dropdown items
 */
export class SelectOption {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Option Value',
    description: 'The value for this option'
  })
  @IsString()
  // Note: Can also be number, but class-validator will handle type coercion
  value?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Option Label',
    description: 'The display text for this option'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether this option is disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}

@Schema('SelectInputField', '1.0.0')
export class SelectInputFieldModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Field Label',
    description: 'The label text displayed for this select field',
    placeholder: 'Enter field label...'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Selected Value',
    description: 'The currently selected value'
  })
  @IsOptional()
  @IsString()
  // Note: Can also be number, but class-validator will handle type coercion
  value?: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Select Options',
    description: 'Array of options available in the dropdown (JSON format)'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectOption)
  options?: SelectOption[];

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Required',
    description: 'Whether this field is required'
  })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether this field is disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Error Message',
    description: 'Error message to display when field validation fails',
    placeholder: 'Error message...'
  })
  @IsOptional()
  @IsString()
  error?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Helper Text',
    description: 'Additional helpful text displayed below the field',
    placeholder: 'Helper text...'
  })
  @IsOptional()
  @IsString()
  helperText?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder Text',
    description: 'Placeholder text shown when no value is selected',
    placeholder: 'Select an option...'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;
}

export default SelectInputFieldModel;