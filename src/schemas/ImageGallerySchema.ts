/**
 * Schema for ImageGallery component - Image gallery with multiple view variants
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsBoolean, IsOptional, IsString, IsNumber, IsIn, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType, DataType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

// Product image interface
export class GalleryImageModel {
  @Field({ dataType: DataType.STRING })
  @IsString()
  url!: string;

  @Field({ dataType: DataType.STRING })
  @IsString()
  alt!: string;

  @Field({ dataType: DataType.STRING })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}

// Gallery variants
export type GalleryVariant = 'thumbnails' | 'carousel' | 'grid';

// Thumbnail positions
export type ThumbnailPosition = 'left' | 'bottom' | 'right';

@Schema('ImageGallery', '1.0.0')
export class ImageGalleryModel extends ViewSchema {
  @Field({ dataType: DataType.ARRAY })
  @Editor({
    field_type: FieldType.ARRAY,
    label: 'Product Images',
    description: 'Array of product images to display in the gallery',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryImageModel)
  images!: GalleryImageModel[];

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Product Name',
    description: 'Product name for accessibility',
    placeholder: 'Premium Cotton T-Shirt'
  })
  @IsString()
  productName!: string;

  @Field({ defaultValue: 'thumbnails', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Gallery Variant',
    description: 'Display variant for the gallery',
    validation: {
      options: [
        { label: 'Thumbnails', value: 'thumbnails' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['thumbnails', 'carousel', 'grid'])
  variant?: GalleryVariant;

  @Field({ defaultValue: 'left', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Thumbnail Position',
    description: 'Position of thumbnails (only for thumbnails variant)',
    validation: {
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Right', value: 'right' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['left', 'bottom', 'right'])
  thumbnailPosition?: ThumbnailPosition;

  @Field({ defaultValue: '1', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Aspect Ratio',
    description: 'Aspect ratio for main image (e.g., "1", "4/3", "16/9")',
    placeholder: '1'
  })
  @IsOptional()
  @IsString()
  aspectRatio?: string;

  @Field({ defaultValue: true, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Zoom',
    description: 'Enable zoom functionality for images'
  })
  @IsOptional()
  @IsBoolean()
  showZoom?: boolean;

  @Field({ dataType: DataType.NUMBER })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Max Images',
    description: 'Maximum number of images to display (leave empty for all)',
    placeholder: '8'
  })
  @IsOptional()
  @IsNumber()
  maxImages?: number;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Data Source',
    description: 'Data source for dynamic image loading',
    placeholder: 'product-images'
  })
  @IsOptional()
  @IsString()
  dataSource?: string;

  @Field({ dataType: DataType.OBJECT })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Binding Options',
    description: 'Data binding configuration (JSON format)',
    placeholder: '{ "filter": {}, "sort": {} }'
  })
  @IsOptional()
  bindingOptions?: Record<string, unknown>;
}

export default ImageGalleryModel;
