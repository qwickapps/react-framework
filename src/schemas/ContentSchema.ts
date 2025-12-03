/**
 * Content Schema - Defines data structure and validation for Content component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsIn, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';
import { ActionModel } from './ActionSchema';
import { ReactNode } from 'react';

@Schema('Content', '1.0.0')
export class ContentModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Main heading for the content block',
    placeholder: 'Enter content title...'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Subtitle',
    description: 'Secondary heading or description',
    placeholder: 'Enter subtitle...'
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Content',
    description: 'Main content body (HTML supported)',
    placeholder: 'Enter content body...'
  })
  @IsOptional()
  @IsString()
  children?: ReactNode | string;

  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Actions',
    description: 'Array of action buttons'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionModel)
  actions?: ActionModel[];

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Variant',
    description: 'Background/elevation style',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['default', 'elevated', 'outlined', 'filled'])
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Block Spacing',
    description: 'Content padding size',
    validation: {
      options: [
        { label: 'None', value: 'none' },
        { label: 'Compact', value: 'compact' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Spacious', value: 'spacious' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['none', 'compact', 'comfortable', 'spacious'])
  blockSpacing?: 'none' | 'compact' | 'comfortable' | 'spacious';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Content Max Width',
    description: 'Maximum content width constraint',
    validation: {
      options: [
        { label: 'XS', value: 'xs' },
        { label: 'SM', value: 'sm' },
        { label: 'MD', value: 'md' },
        { label: 'LG', value: 'lg' },
        { label: 'XL', value: 'xl' },
        { label: 'Full Width', value: 'false' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['xs', 'sm', 'md', 'lg', 'xl', 'false'])
  contentMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'false';

  @Field({ defaultValue: false })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Centered',
    description: 'Center align content'
  })
  @IsOptional()
  @IsBoolean()
  centered?: boolean;
}


export default ContentModel;