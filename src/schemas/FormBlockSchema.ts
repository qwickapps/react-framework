/**
 * Schema for FormBlock component - Reusable form layout container
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsIn, IsOptional, IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType } from '@qwickapps/schema';
import { ContainerSchema } from './ContainerSchema';

@Schema('FormBlock', '1.0.0')
export class FormBlockModel extends ContainerSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Title for the default header (ignored if custom header is provided)',
    placeholder: 'Enter form title...'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Description',
    description: 'Description/subtitle for the default header (ignored if custom header is provided)',
    placeholder: 'Enter form description...'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Cover Image URL',
    description: 'Cover image URL for the default header (ignored if custom header is provided)',
    placeholder: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  coverImage?: string | React.ReactNode;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Status Type',
    description: 'Status type for message display (info, success, warning, error)',
    placeholder: 'info'
  })
  @IsOptional()
  @IsIn(['info', 'success', 'warning', 'error'])
  status?: 'info' | 'success' | 'warning' | 'error';

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Status Message',
    description: 'Status message to display',
    placeholder: 'Enter status message...'
  })
  @IsOptional()
  @IsString()
  message?: string;

  @Field({ defaultValue: 'sm' })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Maximum Width',
    description: 'Maximum width of the form container (xs, sm, md)',
    placeholder: 'sm'
  })
  @IsOptional()
  @IsIn(['xs', 'sm', 'md'])
  maxWidth?: 'xs' | 'sm' | 'md';

  @Field({ defaultValue: 'default' })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Style',
    description: 'Background style variant (default, gradient, image)',
    placeholder: 'default'
  })
  @IsOptional()
  @IsIn(['default', 'gradient', 'image'])
  background?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Image URL',
    description: 'Background image URL (when background="image")',
    placeholder: 'https://example.com/background.jpg'
  })
  @IsOptional()
  @IsString()
  backgroundImage?: string;
}

export default FormBlockModel;