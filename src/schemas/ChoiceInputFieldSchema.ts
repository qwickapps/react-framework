/**
 * Schema for ChoiceInputField component - Dynamic option inputs management
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

@Schema('ChoiceInputField', '1.0.0')
export class ChoiceInputFieldModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Field Label',
    description: 'Label/title for the choice input field',
    placeholder: 'Options'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Options',
    description: 'Array of option values (HTML content supported) - JSON array format'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether the input fields are disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder Text',
    description: 'Placeholder text for option inputs',
    placeholder: 'Enter option text. HTML formatting supported.'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Option Label Prefix',
    description: 'Prefix for each option label (e.g., "Option", "Choice")',
    placeholder: 'Option'
  })
  @IsOptional()
  @IsString()
  optionLabelPrefix?: string;

  @Field({ defaultValue: 2 })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Input Rows',
    description: 'Number of rows for each option input field'
  })
  @IsOptional()
  @IsNumber()
  rows?: number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Add Button Text',
    description: 'Text for the add option button',
    placeholder: 'Add Option'
  })
  @IsOptional()
  @IsString()
  addButtonText?: string;
}

export default ChoiceInputFieldModel;