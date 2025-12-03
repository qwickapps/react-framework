/**
 * Schema for Code component - Syntax-highlighted code display
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import ViewSchema from './ViewSchema';

@Schema('Code', '1.0.0')
export class CodeModel extends ViewSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Content',
    description: 'Raw code text. If provided, React children are ignored in serialization.',
    placeholder: 'Enter code content...'
  })
  @IsOptional()
  @IsString()
  content?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Language',
    description: 'Programming language for syntax highlighting (e.g., typescript, javascript, python)',
    placeholder: 'javascript'
  })
  @IsOptional()
  @IsString()
  language?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Copy Button',
    description: 'Display a copy-to-clipboard button'
  })
  @IsOptional()
  @IsBoolean()
  showCopy?: boolean;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Line Numbers',
    description: 'Display line numbers alongside the code'
  })
  @IsOptional()
  @IsBoolean()
  showLineNumbers?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Optional title or filename to display above the code',
    placeholder: 'File name or title'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Wrap Long Lines',
    description: 'Allow long lines to wrap instead of scrolling horizontally'
  })
  @IsOptional()
  @IsBoolean()
  wrapLines?: boolean;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Color',
    description: 'Custom background color override',
    placeholder: '#f5f5f5'
  })
  @IsOptional()
  @IsString()
  codeBackground?: string;
}

export default CodeModel;