/**
 * HeaderAction Schema - Defines data structure for header action buttons
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsBoolean, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('HeaderAction', '1.0.0')
export class HeaderActionModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ID',
    description: 'Unique identifier for the action',
    placeholder: 'action-id'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Display label for the action button',
    placeholder: 'Action label'
  })
  @IsString()
  label!: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Icon',
    description: 'Icon component or JSX element',
    placeholder: 'icon-name'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether this action is disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Destructive',
    description: 'Whether this action is destructive (shows with warning styling)'
  })
  @IsOptional()
  @IsBoolean()
  destructive?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Priority',
    description: 'Priority for ordering (lower numbers = higher priority)',
    validation: {
      min: 1,
      max: 100
    }
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  priority?: number;
}


export default HeaderActionModel;