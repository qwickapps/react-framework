/**
 * FeatureItem Schema - Defines data structure for individual feature items
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('FeatureItem', '1.0.0')
export class FeatureItemModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'ID',
    description: 'Unique identifier for the feature item',
    placeholder: 'feature-id'
  })
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Icon',
    description: 'Feature icon (emoji or icon name)',
    placeholder: '🚀 or icon-name'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Feature title',
    placeholder: 'Feature title...'
  })
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Description',
    description: 'Feature description',
    placeholder: 'Feature description...'
  })
  @IsString()
  description?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Action',
    description: 'Optional action/link text or content',
    placeholder: 'Learn more'
  })
  @IsOptional()
  @IsString()
  action?: string;
}


export default FeatureItemModel;