/**
 * MetadataItem Schema - Defines data structure for metadata items (followers, posts, etc.)
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { IsString } from 'class-validator';
import 'reflect-metadata';
import { Editor, Field, Schema, Model, FieldType } from '@qwickapps/schema';

@Schema('MetadataItem', '1.0.0')
export class MetadataItemModel extends Model {
  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Label',
    description: 'Metadata label (e.g., "followers", "posts")',
    placeholder: 'followers'
  })
  @IsString()
  label?: string;

  @Field()
  @Editor({
    field_type: FieldType.TEXT,
    label: 'Value',
    description: 'Metadata value (e.g., "1.2k", "42")',
    placeholder: '1.2k'
  })
  @IsString()
  value?: string;
}


export default MetadataItemModel;