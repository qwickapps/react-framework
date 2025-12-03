/**
 * SwitchInputField Schema - Data model for switch input field component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { 
  Schema, 
  Field, 
  Editor, 
  FieldType 
} from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

@Schema('SwitchInputField', '1.0.0')
export class SwitchInputFieldModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'The label text for the switch'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Checked',
    description: 'Whether the switch is checked'
  })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;

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
    label: 'Error',
    description: 'Error message to display'
  })
  @IsOptional()
  @IsString()
  error?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Helper Text',
    description: 'Helper text to display below the switch'
  })
  @IsOptional()
  @IsString()
  helperText?: string;

  @Field({ defaultValue: 'medium' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Size',
    description: 'Size of the switch'
  })
  @IsOptional()
  @IsString()
  size?: 'small' | 'medium';

  @Field({ defaultValue: 'primary' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Color',
    description: 'Color theme of the switch'
  })
  @IsOptional()
  @IsString()
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export default SwitchInputFieldModel;