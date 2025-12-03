/**
 * Footer Schema - Defines data structure and validation for Footer component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsArray, IsIn, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';
import { FooterSectionModel } from './FooterSectionSchema';

@Schema('Footer', '1.0.0')
export class FooterModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Sections',
    description: 'Footer sections with navigation items'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterSectionModel)
  sections?: FooterSectionModel[];

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Logo',
    description: 'Optional logo or branding element (HTML or text)',
    placeholder: 'Company Logo or HTML'
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Copyright',
    description: 'Copyright text',
    placeholder: '© 2025 Company Name'
  })
  @IsOptional()
  @IsString()
  copyright?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Legal Text',
    description: 'Additional legal or info text',
    placeholder: 'All rights reserved.'
  })
  @IsOptional()
  @IsString()
  legalText?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Orientation',
    description: 'Layout orientation',
    validation: {
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['vertical', 'horizontal'])
  orientation?: 'vertical' | 'horizontal';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Variant',
    description: 'Background variant',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Contained', value: 'contained' },
        { label: 'Outlined', value: 'outlined' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['default', 'contained', 'outlined'])
  variant?: 'default' | 'contained' | 'outlined';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Divider',
    description: 'Whether to show divider above footer'
  })
  @IsOptional()
  @IsBoolean()
  showDivider?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class',
    description: 'Additional CSS class name',
    placeholder: 'custom-footer-class'
  })
  @IsOptional()
  @IsString()
  className?: string;
}


export default FooterModel;