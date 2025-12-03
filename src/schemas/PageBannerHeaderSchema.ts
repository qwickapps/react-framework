/**
 * PageBannerHeader Schema - Defines data structure and validation for PageBannerHeader component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsArray, IsNumber, IsIn, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';
import { MetadataItemModel } from './MetadataItemSchema';
import { HeaderActionModel } from './HeaderActionSchema';

@Schema('PageBannerHeader', '1.0.0')
export class PageBannerHeaderModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Cover Image',
    description: 'Large banner/cover image URL',
    placeholder: 'Upload cover image'
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Cover Image Alt Text',
    description: 'Alternative text for cover image',
    placeholder: 'Descriptive alt text...'
  })
  @IsOptional()
  @IsString()
  coverImageAlt?: string;

  @Field()
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Profile Image',
    description: 'Profile/avatar image URL',
    placeholder: 'Upload profile image'
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Profile Image Alt Text',
    description: 'Alternative text for profile image',
    placeholder: 'Profile alt text...'
  })
  @IsOptional()
  @IsString()
  profileImageAlt?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Profile Image Size',
    description: 'Size of the profile image',
    validation: {
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  profileImageSize?: 'small' | 'medium' | 'large';

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Overline',
    description: 'Small text above the main title',
    placeholder: 'Overline text'
  })
  @IsOptional()
  @IsString()
  overline?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Main heading/title text',
    placeholder: 'Enter title...'
  })
  @IsString()
  title?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Subtitle',
    description: 'Secondary text below the title',
    placeholder: 'Enter subtitle...'
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Metadata',
    description: 'Array of metadata items (followers, posts, etc.)'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetadataItemModel)
  metadata?: MetadataItemModel[];

  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Tags',
    description: 'Array of tag strings'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Field()
  @Editor({
    field_type: FieldType.REPEATER,
    label: 'Actions',
    description: 'Array of action buttons'
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderActionModel)
  actions?: HeaderActionModel[];

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Max Visible Actions',
    description: 'Maximum visible actions before overflow',
    validation: {
      min: 1,
      max: 10
    }
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  maxVisibleActions?: number;

  @Field()
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Banner Height',
    description: 'Height of the banner area in pixels',
    validation: {
      min: 100,
      max: 500
    }
  })
  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(500)
  height?: number;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'CSS Class',
    description: 'Additional CSS class name',
    placeholder: 'custom-class'
  })
  @IsOptional()
  @IsString()
  className?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Profile Position',
    description: 'Position of profile image relative to banner',
    validation: {
      options: [
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Overlay Center', value: 'overlay-center' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['bottom-left', 'bottom-center', 'overlay-center'])
  profilePosition?: 'bottom-left' | 'bottom-center' | 'overlay-center';
}


export default PageBannerHeaderModel;