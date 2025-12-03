/**
 * Schema for HtmlInputField component - Custom HTML text field with formatting controls
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

@Schema('HtmlInputField', '1.0.0')
export class HtmlInputFieldModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'The label text for the HTML input field',
    placeholder: 'Enter field label...'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Value',
    description: 'The HTML content value of the input field',
    placeholder: 'Enter HTML content...'
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

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Multiline',
    description: 'Whether the field allows multiple lines of text'
  })
  @IsOptional()
  @IsBoolean()
  multiline?: boolean;

  @Field({ defaultValue: 4 })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Rows',
    description: 'Number of rows for multiline text field',
    placeholder: '4'
  })
  @IsOptional()
  @IsNumber()
  rows?: number;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether the field is disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}

export default HtmlInputFieldModel;