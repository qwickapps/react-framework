/**
 * CoverImageHeader Schema - Defines data structure and validation for CoverImageHeader component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString, IsOptional, IsArray, IsIn, IsNumber, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';
import { HeaderActionModel } from './HeaderActionSchema';

@Schema('CoverImageHeader', '1.0.0')
export class CoverImageHeaderModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Image',
    description: 'Image URL or component',
    placeholder: 'Upload image'
  })
  @IsOptional()
  @IsString()
  image?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Image Alt Text',
    description: 'Alternative text for image',
    placeholder: 'Descriptive alt text...'
  })
  @IsOptional()
  @IsString()
  imageAlt?: string;

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Image Size',
    description: 'Size of the image',
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
  imageSize?: 'small' | 'medium' | 'large';

  @Field()
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Image Shape',
    description: 'Shape of the image',
    validation: {
      options: [
        { label: 'Square', value: 'square' },
        { label: 'Circle', value: 'circle' },
        { label: 'Rounded', value: 'rounded' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['square', 'circle', 'rounded'])
  imageShape?: 'square' | 'circle' | 'rounded';


  imageBackground?: string;

  @Field({defaultValue: 'transparent'})
  @Editor({
    field_type: FieldType.COLOR,
    label: 'Image Background',
    description: 'Image background color',
    placeholder: 'Pick a color for the image background'
  })
  @IsOptional()
  @IsString()
  imageBackgroundColor?: string;

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
    description: 'Array of header action buttons'
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
    label: 'Header Variant',
    description: 'Style variant for the header',
    validation: {
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Compact', value: 'compact' },
        { label: 'Prominent', value: 'prominent' }
      ]
    }
  })
  @IsOptional()
  @IsIn(['default', 'compact', 'prominent'])
  variant?: 'default' | 'compact' | 'prominent';

  @Field({defaultValue: '--var(--theme-primary)'})
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Background',
    description: 'Background color or image URL',
    placeholder: 'Pick a color for the background or enter a image URL'
  })
  @IsOptional()
  @IsString()
  background?: string;

  @Field({defaultValue: '--var(--theme-on-primary)'})
  @Editor({
    field_type: FieldType.COLOR,
    label: 'Color',
    description: 'Foreground color',
    placeholder: '#000000'
  })
  @IsOptional()
  @IsString()
  color?: string;
}


export default CoverImageHeaderModel;