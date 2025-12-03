/**
 * FooterSection Schema - Defines data structure for footer sections
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';
import { FooterItemModel } from './FooterItemSchema';

@Schema('FooterSection', '1.0.0')
export class FooterSectionModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ID',
    description: 'Unique identifier for the footer section',
    placeholder: 'footer-section-id'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Section title/heading',
    placeholder: 'Section title'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Items',
    description: 'Array of items in this section'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterItemModel)
  items?: FooterItemModel[];
}


export default FooterSectionModel;