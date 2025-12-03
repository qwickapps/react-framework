/**
 * FooterItem Schema - Defines data structure for footer navigation items
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('FooterItem', '1.0.0')
export class FooterItemModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ID',
    description: 'Unique identifier for the footer item',
    placeholder: 'footer-item-id'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Display text for the footer item',
    placeholder: 'Navigation label'
  })
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.URL,
    label: 'URL',
    description: 'Optional URL for links',
    placeholder: 'https://example.com'
  })
  @IsOptional()
  @IsString()
  href?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'External Link',
    description: 'Whether to open links in new tab'
  })
  @IsOptional()
  @IsBoolean()
  external?: boolean;
}


export default FooterItemModel;