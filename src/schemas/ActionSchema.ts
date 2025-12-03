/**
 * Action Schema - Defines data structure for action buttons (Button component)
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, FieldType, Model, Schema } from '@qwickapps/schema';

@Schema('Action', '1.0.0')
export class ActionModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Button label text',
    placeholder: 'Enter button text...'
  })
  @IsOptional()
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Variant',
    description: 'Visual style variant',
    validation: {
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Text', value: 'text' },
        { label: 'Contained', value: 'contained' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['primary', 'secondary', 'outlined', 'text', 'contained'])
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'contained';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Size',
    description: 'Button size',
    validation: {
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  buttonSize?: 'small' | 'medium' | 'large';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Icon',
    description: 'Icon to display (before text)',
    placeholder: 'Icon identifier...'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'End Icon',
    description: 'Icon to display after text',
    placeholder: 'End icon identifier...'
  })
  @IsOptional()
  @IsString()
  endIcon?: string;

  @Field()
  @Editor({
    field_type: FieldType.URL,
    label: 'URL',
    description: 'Link URL - button becomes a link',
    placeholder: 'https://...'
  })
  @IsOptional()
  @IsUrl()
  href?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Target',
    description: 'Link target (when href is provided)',
    validation: {
      options: [
        { label: 'Blank', value: '_blank' },
        { label: 'Self', value: '_self' },
        { label: 'Parent', value: '_parent' },
        { label: 'Top', value: '_top' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['_blank', '_self', '_parent', '_top'])
  target?: '_blank' | '_self' | '_parent' | '_top';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Disabled',
    description: 'Disabled state'
  })
  @IsOptional()
  disabled?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Loading',
    description: 'Loading state - shows spinner and disables interaction'
  })
  @IsOptional()
  loading?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Full Width',
    description: 'Full width button'
  })
  @IsOptional()
  fullWidth?: boolean;
}


export default ActionModel;