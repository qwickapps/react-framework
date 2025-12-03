/**
 * Schema for Image component - Comprehensive image display component
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { ReactNode } from 'react';
import { IsBoolean, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, FieldType, DataType } from '@qwickapps/schema';
import { ViewSchema } from './ViewSchema';

// Image fit modes - how the image should be resized to fit the container
export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

// Image loading states
export type ImageLoading = 'lazy' | 'eager';

// Image position for background-position style
export type ImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

@Schema('Image', '1.0.0')
export class ImageModel extends ViewSchema {
  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.IMAGE,
    label: 'Image Source',
    description: 'Image source URL or path',
    placeholder: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  src?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Alt Text',
    description: 'Alternative text for accessibility (required for images with src)',
    placeholder: 'Describe the image for screen readers'
  })
  @IsOptional()
  @IsString()
  alt?: string;

  @Field({ dataType: DataType.NUMBER })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Width',
    description: 'Image width in pixels (optional)',
    placeholder: '300'
  })
  @IsOptional()
  @IsNumber()
  width?: number;

  @Field({ dataType: DataType.NUMBER })
  @Editor({
    field_type: FieldType.NUMBER,
    label: 'Height',
    description: 'Image height in pixels (optional)',
    placeholder: '200'
  })
  @IsOptional()
  @IsNumber()
  height?: number;

  @Field({ defaultValue: 'cover', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Object Fit',
    description: 'How the image should be resized to fit its container',
    validation: {
      options: [
        { label: 'Fill', value: 'fill' },
        { label: 'Contain', value: 'contain' },
        { label: 'Cover', value: 'cover' },
        { label: 'None', value: 'none' },
        { label: 'Scale Down', value: 'scale-down' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['fill', 'contain', 'cover', 'none', 'scale-down'])
  objectFit?: ImageFit;

  @Field({ defaultValue: 'center', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Object Position',
    description: 'Position of the image within its container',
    validation: {
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Right', value: 'bottom-right' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'])
  objectPosition?: ImagePosition;

  @Field({ defaultValue: 'lazy', dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.SELECT,
    label: 'Loading',
    description: 'Image loading behavior',
    validation: {
      options: [
        { label: 'Lazy (load when visible)', value: 'lazy' },
        { label: 'Eager (load immediately)', value: 'eager' }
      ]
    }
  })
  @IsOptional()
  @IsString()
  @IsIn(['lazy', 'eager'])
  loading?: ImageLoading;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Title',
    description: 'Image title (tooltip text)',
    placeholder: 'Tooltip text on hover'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Draggable',
    description: 'Allow the image to be dragged'
  })
  @IsOptional()
  @IsBoolean()
  draggable?: boolean;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Border Radius',
    description: 'CSS border radius (e.g., "8px", "50%", "1rem")',
    placeholder: '8px'
  })
  @IsOptional()
  @IsString()
  borderRadius?: string;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Loading State',
    description: 'Display a loading placeholder while the image loads'
  })
  @IsOptional()
  @IsBoolean()
  showLoading?: boolean;

  @Field({ defaultValue: false, dataType: DataType.BOOLEAN })
  @Editor({
    field_type: FieldType.BOOLEAN,
    label: 'Show Error State',
    description: 'Display an error message if the image fails to load'
  })
  @IsOptional()
  @IsBoolean()
  showError?: boolean;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Fallback Image',
    description: 'Fallback image URL to use if the main image fails to load',
    placeholder: 'https://example.com/fallback.jpg'
  })
  @IsOptional()
  @IsString()
  fallbackSrc?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Responsive Sizes',
    description: 'Responsive image sizes attribute for optimized loading',
    placeholder: '(max-width: 768px) 100vw, 50vw'
  })
  @IsOptional()
  @IsString()
  sizes?: string;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Source Set',
    description: 'Source set for responsive images (comma-separated)',
    placeholder: 'image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w'
  })
  @IsOptional()
  @IsString()
  srcSet?: string;

  // Support for placeholder content (React node)
  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Loading Placeholder',
    description: 'Custom loading placeholder content (for advanced use)',
    placeholder: 'Custom loading content...'
  })
  @IsOptional()
  loadingPlaceholder?: ReactNode;

  @Field({ dataType: DataType.STRING })
  @Editor({
    field_type: FieldType.TEXTAREA,
    label: 'Error Placeholder',
    description: 'Custom error placeholder content (for advanced use)',
    placeholder: 'Custom error content...'
  })
  @IsOptional()
  errorPlaceholder?: ReactNode;
}

export default ImageModel;