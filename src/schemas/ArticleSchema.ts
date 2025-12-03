/**
 * Schema for Article component - HTML content transformer
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('Article', '1.0.0')
export class ArticleModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'HTML Content',
    description: 'Raw HTML content to transform and render',
    placeholder: 'Enter HTML content...'
  })
  @IsString()
  @IsOptional()
  html?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Skip Header',
    description: 'Skip/remove header elements before rendering'
  })
  @IsOptional()
  skipHeader?: boolean;
}


export default ArticleModel;