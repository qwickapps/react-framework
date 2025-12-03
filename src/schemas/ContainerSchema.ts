/**
 * ContainerSchema - Comprehensive base class for all container components
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Editor, Field, FieldType, Schema } from '@qwickapps/schema';
import { IsOptional, IsString } from 'class-validator';
import type { ReactNode } from 'react';
import 'reflect-metadata';
import ViewSchema from './ViewSchema';

@Schema('ContainerSchema', '1.0.0')
export class ContainerSchema extends ViewSchema {
    @Field()
    @Editor({
        field_type: FieldType.TEXTAREA,
        label: 'Content',
        description: 'Main content shown when expanded (HTML supported)',
        placeholder: 'Enter main content...'
    })
    @IsOptional()
    @IsString()
    children?: ReactNode;
}