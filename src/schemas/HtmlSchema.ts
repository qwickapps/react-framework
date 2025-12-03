/**
 * Schema for Html component - Transforms HTML strings into Framework components
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('Html', '1.0.0')
export class HtmlModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'HTML Content',
    description: 'HTML content to be transformed into React components',
    placeholder: '<p>Enter HTML content...</p>'
  })
  @IsOptional()
  @IsString()
  children?: string;

  @Field()
  @Editor({
    field_type: FieldType.CHECKBOX,
    label: 'Strip Headers',
    description: 'Whether to remove header elements (h1-h6) from the HTML'
  })
  @IsOptional()
  @IsBoolean()
  stripHeaders?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder',
    description: 'Fallback content to display when HTML is empty',
    placeholder: 'No content available'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;

}

export default HtmlModel;