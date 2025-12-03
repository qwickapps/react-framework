/**
 * Schema for Markdown component - Transforms Markdown strings into Framework components
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('Markdown', '1.0.0')
export class MarkdownModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Markdown Content',
    description: 'Markdown content to be transformed into React components',
    placeholder: '# Enter Markdown content...\n\n**Bold text** and *italic text*.'
  })
  @IsOptional()
  @IsString()
  children?: string;

  @Field()
  @Editor({
    field_type: FieldType.CHECKBOX,
    label: 'Sanitize HTML',
    description: 'Whether to sanitize HTML output for security'
  })
  @IsOptional()
  @IsBoolean()
  sanitize?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Placeholder',
    description: 'Fallback content to display when Markdown is empty',
    placeholder: 'No content available'
  })
  @IsOptional()
  @IsString()
  placeholder?: string;

}

export default MarkdownModel;