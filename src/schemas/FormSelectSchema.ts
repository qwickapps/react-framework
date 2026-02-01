/**
 * Schema for FormSelect component - Themed dropdown select input
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import ViewSchema from './ViewSchema';

@Schema('FormSelect', '1.0.0')
export class FormSelectModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Label text for the select field',
    placeholder: 'Enter label...'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Value',
    description: 'Current selected value',
    placeholder: ''
  })
  @IsString()
  value!: string | number;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Options',
    description: 'Select options as JSON array: [{"value": "1", "label": "Option 1"}]',
    placeholder: '[{"value": "1", "label": "Option 1"}]'
  })
  @IsString()
  options!: string; // JSON string of FormSelectOption[]

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Helper Text',
    description: 'Helper text displayed below the select',
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
    label: 'Disabled',
    description: 'Disable the select field'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Full Width',
    description: 'Make select take full width of container'
  })
  @IsOptional()
  @IsBoolean()
  fullWidth?: boolean;

  @Field({ defaultValue: 'small' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Size',
    description: 'Size variant of the select field'
  })
  @IsOptional()
  @IsIn(['small', 'medium'])
  size?: 'small' | 'medium';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder',
    description: 'Placeholder text when no value is selected',
    placeholder: 'Select an option...'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;
}

export default FormSelectModel;
