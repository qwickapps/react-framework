/**
 * Schema for Button component - Enhanced button with comprehensive features
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

@Schema('Button', '1.0.0')
export class ButtonModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Button Label',
    description: 'The text displayed on the button',
    placeholder: 'Click me'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field({ defaultValue: 'primary' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Button Variant',
    description: 'Visual style variant for the button'
  })
  @IsOptional()
  @IsString()
  @IsIn(['primary', 'secondary', 'outlined', 'text', 'contained'])
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'contained';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Button Color',
    description: 'Color theme for the button (overrides variant color)'
  })
  @IsOptional()
  @IsString()
  @IsIn(['primary', 'secondary', 'error', 'warning', 'info', 'success'])
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

  @Field({ defaultValue: 'medium' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Button Size',
    description: 'Size of the button'
  })
  @IsOptional()
  @IsString()
  @IsIn(['small', 'medium', 'large'])
  buttonSize?: 'small' | 'medium' | 'large';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Link URL',
    description: 'If provided, button becomes a link to this URL',
    placeholder: 'https://example.com'
  })
  @IsOptional()
  @IsString()
  href?: string;

  @Field({ defaultValue: '_self' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Link Target',
    description: 'Target for link when href is provided'
  })
  @IsOptional()
  @IsString()
  @IsIn(['_blank', '_self', '_parent', '_top'])
  target?: '_blank' | '_self' | '_parent' | '_top';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Whether the button is disabled'
  })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Loading',
    description: 'Show loading spinner and disable interaction'
  })
  @IsOptional()
  @IsBoolean()
  loading?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Full Width',
    description: 'Whether the button should take full width of container'
  })
  @IsOptional()
  @IsBoolean()
  fullWidth?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Icon',
    description: 'Icon name to display before button text (e.g., "home", "download", "settings")',
    placeholder: 'Icon name...'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'End Icon',
    description: 'Icon name to display after button text',
    placeholder: 'Icon name...'
  })
  @IsOptional()
  @IsString()
  endIcon?: string;
}

export default ButtonModel;