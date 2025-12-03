/**
 * Schema for PaletteSwitcher component - Color palette switching control
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('PaletteSwitcher', '1.0.0')
export class PaletteSwitcherModel extends Model {
  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disable the palette switcher button'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Button Size',
    description: 'Size of the palette switcher button',
    placeholder: 'medium'
  })
  @IsOptional()
  @IsString()
  buttonSize?: 'small' | 'medium' | 'large';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Tooltip Text',
    description: 'Custom tooltip text for the palette switcher',
    placeholder: 'Switch color palette'
  })
  @IsOptional()
  @IsString()
  tooltipText?: string;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Active Badge',
    description: 'Show "Active" badge on currently selected palette'
  })
  @IsOptional()
  @IsBoolean()
  showActiveBadge?: boolean;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Descriptions',
    description: 'Show palette descriptions in menu items'
  })
  @IsOptional()
  @IsBoolean()
  showDescriptions?: boolean;
}

export default PaletteSwitcherModel;