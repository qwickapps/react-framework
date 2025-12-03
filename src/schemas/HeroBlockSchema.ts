/**
 * HeroBlock Schema - Defines data structure and validation for HeroBlock component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsOptional, IsString, IsUrl, IsIn, IsNumber, Min, Max, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType, DataType } from '@qwickapps/schema';
import { ActionModel } from './ActionSchema';
import { ContainerSchema } from './ContainerSchema';

@Schema('HeroBlock', '1.0.0')
export class HeroBlockModel extends ContainerSchema {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Main headline text',
    placeholder: 'Enter hero title...'
  })
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Subtitle',
    description: 'Subtitle or description text',
    placeholder: 'Enter subtitle...'
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field()
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Background Image',
    description: 'Background image URL',
    placeholder: 'https://...'
  })
  @IsOptional()
  @IsUrl()
  backgroundImage?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background Gradient',
    description: 'Background gradient CSS value',
    placeholder: 'linear-gradient(...)'
  })
  @IsOptional()
  @IsString()
  backgroundGradient?: string;

  @Field({ defaultValue: 'default' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Background Color',
    description: 'Background color theme variant',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Surface', value: 'surface' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['default', 'primary', 'secondary', 'surface'])
  backgroundColor?: 'default' | 'primary' | 'secondary' | 'surface';

  @Field({ type: DataType.ARRAY })
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Actions',
    description: 'Action buttons for the hero section'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionModel)
  actions?: ActionModel[];

  @Field({ defaultValue: 'center' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Text Alignment',
    description: 'Text alignment',
    validation: {
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['left', 'center', 'right'])
  textAlign?: 'left' | 'center' | 'right';

  @Field({ defaultValue: 'medium' })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Block Height',
    description: 'Block height preset',
    validation: {
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Viewport', value: 'viewport' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['small', 'medium', 'large', 'viewport'])
  blockHeight?: 'small' | 'medium' | 'large' | 'viewport';

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Overlay Opacity',
    description: 'Custom overlay opacity (0-1) when using background images',
    validation: { min: 0, max: 1 }
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  overlayOpacity?: number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class',
    description: 'Additional CSS class name',
    placeholder: 'custom-hero-class'
  })
  @IsOptional()
  @IsString()
  className?: string;
}


export default HeroBlockModel;