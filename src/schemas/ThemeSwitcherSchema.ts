/**
 * Schema for ThemeSwitcher component - Theme selection control
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('ThemeSwitcher', '1.0.0')
export class ThemeSwitcherModel extends Model {
  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disable the theme switcher button'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field({ defaultValue: 'medium' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Button Size',
    description: 'Size of the theme switcher button'
  })
  @IsOptional()
  @IsString()
  @IsIn(['small', 'medium', 'large'])
  size?: 'small' | 'medium' | 'large';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Custom Tooltip',
    description: 'Custom tooltip text override',
    placeholder: 'Current theme: Light'
  })
  @IsOptional()
  @IsString()
  tooltipText?: string;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Tooltip',
    description: 'Show tooltip on hover'
  })
  @IsOptional()
  @IsBoolean()
  showTooltip?: boolean;

  @Field({ defaultValue: 'bottom' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Menu Position',
    description: 'Position of the theme selection menu'
  })
  @IsOptional()
  @IsString()
  @IsIn(['bottom', 'top', 'left', 'right'])
  menuPosition?: 'bottom' | 'top' | 'left' | 'right';

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Light Theme',
    description: 'Show light theme option in menu'
  })
  @IsOptional()
  @IsBoolean()
  showLightTheme?: boolean;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Dark Theme',
    description: 'Show dark theme option in menu'
  })
  @IsOptional()
  @IsBoolean()
  showDarkTheme?: boolean;

  @Field({ defaultValue: true })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show System Theme',
    description: 'Show system theme option in menu'
  })
  @IsOptional()
  @IsBoolean()
  showSystemTheme?: boolean;
}

export default ThemeSwitcherModel;