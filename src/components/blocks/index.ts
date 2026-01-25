/**
 * Provides a set of standardized blocks for consistent layout and styling.
 * 
 * Includes:
 * - Hero blocks
 * - Content
 * - Page headers
 * - Feature grids
 * - Sections with responsive design
 * - Footer blocks
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */
export { default as HeroBlock } from './HeroBlock';
export { default as Code } from './Code';
export { default as Article } from './Article';
export { default as Content } from './Content';
export { default as PageBannerHeader } from './PageBannerHeader';
export { default as CoverImageHeader } from './CoverImageHeader';
export { default as FeatureGrid } from './FeatureGrid';
export { default as Footer } from './Footer';
export { default as Section } from './Section';
export { default as Image } from './Image';
export { default as Text } from './Text';
export { default as ProductCard } from './ProductCard';
export { default as ImageGallery } from './ImageGallery';
export { default as OptionSelector } from './OptionSelector';
export { default as FeatureCard } from './FeatureCard';
export { default as CardListGrid } from './CardListGrid';

export type { HeroBlockProps } from './HeroBlock';
export type { CodeProps } from './Code';
export type { ArticleProps } from './Article';
export type { ContentProps } from './Content';
export type { PageBannerHeaderProps } from './PageBannerHeader';
export type { CoverImageHeaderProps, HeaderAction } from './CoverImageHeader';
export type { FeatureGridProps, FeatureItem as FeatureGridItem } from './FeatureGrid';
export type { FooterProps } from './Footer';
export type { SectionProps } from './Section';
export type { ImageProps } from './Image';
export type { TextProps } from './Text';
export type { ProductCardProps, Product, ProductCardAction } from './ProductCard';
export type { ImageGalleryProps, GalleryImage } from './ImageGallery';
export type { OptionSelectorProps, SelectOption } from './OptionSelector';
export type { FeatureCardProps, FeatureItem, FeatureCardAction } from './FeatureCard';
export type { CardListGridProps } from './CardListGrid';