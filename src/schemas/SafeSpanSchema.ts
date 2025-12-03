/**
 * Schema for SafeSpan component - Safely renders HTML content with sanitization
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('SafeSpan', '1.0.0')
export class SafeSpanModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'HTML Content',
    description: 'HTML content to be safely rendered after sanitization',
    placeholder: '<p>Enter HTML content...</p>'
  })
  @IsOptional()
  @IsString()
  html?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder Text',
    description: 'Text to display when no HTML content is available',
    placeholder: 'Loading...'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;
}

export default SafeSpanModel;