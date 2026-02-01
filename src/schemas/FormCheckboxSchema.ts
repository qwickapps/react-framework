/**
 * Schema for FormCheckbox component - Themed checkbox input
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import ViewSchema from './ViewSchema';

@Schema('FormCheckbox', '1.0.0')
export class FormCheckboxModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Label text for the checkbox',
    placeholder: 'Enter label...'
  })
  @IsString()
  label!: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Checked',
    description: 'Checkbox checked state'
  })
  @IsBoolean()
  checked!: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Helper Text',
    description: 'Helper text displayed below the checkbox',
    placeholder: 'Enter helper text...'
  })
  @IsOptional()
  @IsString()
  helperText?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Required',
    description: 'Mark checkbox as required'
  })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disable the checkbox'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}

export default FormCheckboxModel;
