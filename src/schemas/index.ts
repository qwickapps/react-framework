/**
 * Schemas Module - Declarative Model schema definitions and Component Serialization System
 * 
 * Exports all Model classes and their type-safe props using the new
 * declarative pattern with @Schema, @Field, and @Editor decorators.
 * 
 * Also exports the new Component Serialization System for "WebView for React" functionality.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

// Component Serialization System
export type { Serializable, SerializableConstructor } from './types/Serializable';
export { ComponentTransformer } from './transformers/ComponentTransformer';
// Auto-register serializable components
import './transformers/registry';

// Component schema models (declarative pattern)
export * from './ActionSchema';
export * from './ArticleSchema';
export * from './CardListGridSchema';
export * from './ChoiceInputFieldSchema';
export * from './CodeSchema';
export * from './ContentSchema';
export * from './CoverImageHeaderSchema';
export * from './FeatureCardSchema';
export * from './FeatureGridSchema';
export * from './FeatureItemSchema';
export * from './FooterItemSchema';
export * from './FormBlockSchema';
export * from './FooterSchema';
export * from './FooterSectionSchema';
export * from './GridCellSchema';
export * from './GridLayoutSchema';
export * from './HeaderActionSchema';
export * from './HeroBlockSchema';
export * from './HtmlSchema';
export * from './ImageSchema';
export * from './MarkdownSchema';
export * from './MetadataItemSchema';
export * from './PageBannerHeaderSchema';
export * from './PaletteSwitcherSchema';
export * from './ProductCardSchema';
export * from './ImageGallerySchema';
export * from './OptionSelectorSchema';
export * from './SafeSpanSchema';
export * from './SectionSchema';
export * from './TextInputFieldSchema';
export * from './TextSchema';
export * from './ThemeSwitcherSchema';

// Page system schemas
export * from './ViewSchema';
export * from './PrintConfigSchema';
export * from './PageTemplateSchema';