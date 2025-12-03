/**
 * Advanced Data Binding Examples - Storybook Stories
 * 
 * Advanced examples showing complex data binding scenarios,
 * error handling, performance optimization, and AI integration patterns.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Card, Typography } from '@mui/material';
import { CachedDataProvider, JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Code, GridLayout, SafeSpan, Section } from '../components';
import { DataProvider } from '../contexts';
import { useDataBinding } from '../hooks';
import ThemeSwitcher from '../components/buttons/ThemeSwitcher';
import PaletteSwitcher from '../components/buttons/PaletteSwitcher';

// Advanced CMS data with complex scenarios - using dotted notation for testing JsonDataProvider conversion
const advancedCmsData = {
 // Multi-language content
 'content.en.welcome': {
 html: '<h2>Welcome to QwickApps</h2><p>The future of app development is here.</p>',
 placeholder: 'Loading welcome message...'
 },
 'content.es.welcome': {
 html: '<h2>Bienvenidos a QwickApps</h2><p>El futuro del desarrollo de aplicaciones está aquí.</p>',
 placeholder: 'Cargando mensaje de bienvenida...'
 },

 // Dynamic content with variables
 'user.greeting': {
 html: '<p>Hello <strong>{{userName}}</strong>, welcome back!</p>',
 placeholder: 'Loading personalized greeting...'
 },

 // Time-sensitive content
 'announcements.current': {
 html: '<div class="announcement"><p><strong> New Feature Alert:</strong> Dynamic data binding with schema validation is now available!</p></div>',
 placeholder: 'Loading current announcements...'
 },

 // A/B testing variants
 'cta.variant-a': {
 html: '<p class="cta-primary"><strong>Start Building Today!</strong> - Try our free plan.</p>',
 placeholder: 'Loading call-to-action...'
 },
 'cta.variant-b': {
 html: '<p class="cta-secondary"><strong>Join 10,000+ Developers</strong> - Get started now.</p>',
 placeholder: 'Loading call-to-action...'
 },

 // Rich media content
 'blog.featured-post': {
 html: `
 <article>
 <h3>Building Scalable Apps with QwickApps React Framework</h3>
 <p class="meta">Published on January 15, 2025 • 8 min read</p>
 <p>Learn how our <strong>data-binding system</strong> enables dynamic, scalable applications with type-safe CMS integration and validation...</p>
 <a href="/blog/scalable-apps" class="read-more">Continue reading →</a>
 </article>
 `,
 placeholder: 'Loading featured blog post...'
 },

 // Malicious content for sanitization testing
 'security.malicious': {
 html: '<script>alert("XSS attempt")</script><p>This content includes <strong>malicious scripts</strong> that should be automatically sanitized.</p><img src="x" onerror="alert(\'XSS\')" />',
 placeholder: 'Loading content...'
 },

 // Performance testing - Large content
 'performance.large-content': {
 html: '<div>' + 'Very long content paragraph. '.repeat(100) + '</div>',
 placeholder: 'Loading large content...'
 }
};

// Create cached data provider for performance
const jsonProvider = new JsonDataProvider({ data: advancedCmsData });
const cachedDataProvider = new CachedDataProvider(jsonProvider, { maxSize: 100, defaultTTL: 60000 });

const meta: Meta<typeof SafeSpan> = {
 title: 'Framework/Advanced Data Binding',
 component: SafeSpan,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `
# Advanced Data Binding Examples

This section demonstrates advanced use cases for the data binding system including:

- Multi-language content management
- Dynamic content with template variables
- A/B testing support
- Security and sanitization
- Performance optimization with caching
- Error handling and fallbacks
- Custom validation and schema enforcement

## Performance Features

The system includes built-in caching to minimize CMS API calls:
- Memory cache with configurable TTL
- Cache hit ratio monitoring
- Automatic cache invalidation
- Fallback support when cache fails

## Security Features

All HTML content is automatically sanitized:
- Script tags are removed
- Dangerous attributes are filtered
- Only safe HTML elements are allowed
- XSS protection is built-in
 `
 }
 }
 },
 decorators: [
 (Story) => (
 <DataProvider dataSource={{ dataProvider: cachedDataProvider }}>
 <Story />
 </DataProvider>
 )
 ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Multi-language Support Component
const MultiLanguageComponent = () => {
 const [language, setLanguage] = useState<'en' | 'es'>('en');

 return (
 <Section>
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
 <Typography variant='h4'>Multilanguage Support</Typography>
 <div style={{ display: 'flex', gap: '8px' }}>
 <ThemeSwitcher />
 <PaletteSwitcher />
 </div>
 </div>
 <Typography variant='body1' gutterBottom>
 Switch between English and Spanish content dynamically using the data binding system.
 </Typography>
 <br/>
 <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem' }}>
 <GridLayout>
 <Button variant={language === 'en' ? 'contained' : 'outlined'} onClick={() => setLanguage('en')}>English</Button>
 <Button variant={language === 'es' ? 'contained' : 'outlined'} onClick={() => setLanguage('es')}>Español</Button>
 <SafeSpan span={12} dataSource={`content.${language}.welcome`} />
 </GridLayout>
 </Card>
 <Code title='Source Code'>{`<GridLayout>
 <Button variant={language === 'en' ? 'contained' : 'outlined'} onClick={() => setLanguage('en')}>English</Button>
 <Button variant={language === 'es' ? 'contained' : 'outlined'} onClick={() => setLanguage('es')}>Español</Button>
 <SafeSpan span={12} dataSource={\`content.\${language}.welcome\`} />
</GridLayout>`}
 </Code>
 <Code title='Multi-language Content'>{`'content.en.welcome': [
 {
 html: '<h2>Welcome to QwickApps</h2><p>The future of app development is here.</p>'
 }
],
'content.es.welcome': [
 {
 html: '<h2>Bienvenidos a QwickApps</h2><p>El futuro del desarrollo de aplicaciones está aquí.</p>'
 }
]`}</Code>
 </Section>
 );
};
MultiLanguageComponent.displayName = 'MultiLanguageComponent';

export const MultiLanguageContent: Story = {
 render: () => <MultiLanguageComponent />,
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates multi-language content switching using dynamic dataSource paths.'
 }
 }
 }
};

// A/B Testing Component
const ABTestingComponent = () => {
 const [variant, setVariant] = useState<'a' | 'b'>('a');

 return (
 <Section>
 <Typography variant="h4">A/B Testing Variants</Typography>
 <Typography variant="body1" gutterBottom>
 A/B testing implementation using dynamic dataSource selection for conversion optimization.
 </Typography>

 <GridLayout>
 <Typography variant="h6">Select A/B Test Variant:</Typography>
 <GridLayout columns={2} spacing="medium">
 <Button variant={variant === 'a' ? 'contained' : 'outlined'} onClick={() => setVariant('a')}>
 Variant A (Start Building)
 </Button>
 <Button variant={variant === 'b' ? 'contained' : 'outlined'} onClick={() => setVariant('b')}>
 Variant B (Join Community)
 </Button>
 </GridLayout>

 <Card variant="outlined" style={{ padding: '1.5rem', backgroundColor: '#e3f2fd' }}>
 <SafeSpan dataSource={`cta.variant-${variant}`} />
 </Card>
 </GridLayout>

 <Code title="A/B Testing Implementation">{`const [variant, setVariant] = useState<'a' | 'b'>('a');

return (
 <SafeSpan dataSource={\`cta.variant-\${variant}\`} />
);`}</Code>

 <Code title="A/B Test Data Structure">{`'cta.variant-a': [
 {
 html: '<p class="cta-primary"><strong>Start Building Today!</strong> - Try our free plan.</p>'
 }
],
'cta.variant-b': [
 {
 html: '<p class="cta-secondary"><strong>Join 10,000+ Developers</strong> - Get started now.</p>'
 }
]`}</Code>
 </Section>
 );
};
ABTestingComponent.displayName = 'ABTestingComponent';

export const ABTestingVariants: Story = {
 render: () => <ABTestingComponent />,
 parameters: {
 docs: {
 description: {
 story: 'A/B testing implementation using dynamic dataSource selection for conversion optimization.'
 }
 }
 }
};

// Rich Media Content
export const RichMediaContent: Story = {
 render: () => (
 <Section>
 <Typography variant="h4">Rich Media Content</Typography>
 <Typography variant="body1" gutterBottom>
 Complex HTML content with multiple elements, perfect for blog posts and articles.
 </Typography>

 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
 <SafeSpan dataSource="blog.featured-post" />
 </Card>

 <Code title="Usage">{`<SafeSpan dataSource="blog.featured-post" />`}</Code>
 
 <Code title="Rich Media Data Structure">{`'blog.featured-post': [
 {
 html: \`
 <article>
 <h3>Building Scalable Apps with QwickApps React Framework</h3>
 <p class="meta">Published on January 15, 2025 • 8 min read</p>
 <p>Learn how our <strong>data-binding system</strong> enables dynamic applications...</p>
 <a href="/blog/scalable-apps" class="read-more">Continue reading →</a>
 </article>
 \`,
 placeholder: 'Loading featured blog post...'
 }
]`}</Code>
 </Section>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Complex HTML content with multiple elements, perfect for blog posts and articles.'
 }
 }
 }
};

// Security Testing
export const SecurityAndSanitization: Story = {
 render: () => (
 <Section>
 <Typography variant="h4">Security and Sanitization</Typography>
 <Typography variant="body1" gutterBottom>
 Demonstrates automatic HTML sanitization to prevent XSS attacks and malicious content.
 </Typography>

 <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fff3cd' }}>
 <Typography variant="body2">
 <strong> Security Test:</strong> The content below contains malicious scripts that are automatically sanitized.
 </Typography>
 </Card>

 <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#f8f9fa' }}>
 <SafeSpan dataSource="security.malicious" />
 </Card>

 <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#d4edda' }}>
 <Typography variant="h6" gutterBottom>What was filtered:</Typography>
 <ul>
 <li>&lt;script&gt; tags removed</li>
 <li>onerror attributes removed</li>
 <li>Only safe HTML elements preserved</li>
 </ul>
 </Card>

 <Code title="Malicious Content (Auto-Sanitized)">{`<SafeSpan dataSource="security.malicious" />`}</Code>
 
 <Code title="Malicious Data Source">{`'security.malicious': [
 {
 html: '<script>alert("XSS attempt")</script><p>Safe content with <strong>formatting</strong></p><img src="x" onerror="alert(\\'XSS\\')" />',
 placeholder: 'Loading content...'
 }
]`}</Code>
 </Section>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates automatic HTML sanitization to prevent XSS attacks and malicious content.'
 }
 }
 }
};

// Performance Testing
export const PerformanceOptimization: Story = {
 render: () => (
 <Section>
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
 <Typography variant="h4">Performance Optimization</Typography>
 <div style={{ display: 'flex', gap: '8px' }}>
 <ThemeSwitcher />
 <PaletteSwitcher />
 </div>
 </div>
 <Typography variant="body1" gutterBottom>
 Performance optimization with caching for large content blocks.
 </Typography>

 <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem' }}>
 <Typography variant="body2" color="text.primary">
 <strong> Performance Test:</strong> Large content with caching enabled for optimal performance.
 </Typography>
 </Card>

 <Card variant="outlined" style={{ maxHeight: '200px', overflow: 'auto', padding: '1rem', marginBottom: '1rem' }}>
 <SafeSpan dataSource="performance.large-content" />
 </Card>

 <Card variant="outlined" style={{ padding: '1rem', marginBottom: '1rem' }}>
 <Typography variant="h6" gutterBottom>Performance Features:</Typography>
 <ul>
 <li>Memory caching with 5-minute TTL</li>
 <li>Automatic content chunking for large data</li>
 <li>Efficient re-rendering on data changes</li>
 </ul>
 </Card>

 <Code title="Cached Performance">{`<DataProvider dataSource={{ dataProvider: cachedDataProvider }}>
 <SafeSpan dataSource="performance.large-content" />
</DataProvider>`}</Code>

 <Code title="Cache Configuration">{`const jsonProvider = new JsonDataProvider({ data: advancedCmsData });
const cacheProvider = new MemoryCacheProvider<any[]>({ 
 maxSize: 100, 
 defaultTtl: 60000 
});
const cachedDataProvider = new CachedDataProvider(jsonProvider, cacheProvider);`}</Code>
 </Section>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Performance optimization with caching for large content blocks.'
 }
 }
 }
};

// Custom Hook Usage
export const CustomHookExample: Story = {
 render: () => {
 const CustomComponent: React.FC<{ dataSource: string }> = ({ dataSource }) => {
 const { loading, error } = useDataBinding(
 dataSource,
 {
 html: '<p>Fallback HTML content</p>',
 placeholder: 'Fallback placeholder'
 },
 undefined,
 { strict: true, cache: true }
 );

 if (loading) {
 return (
 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
 <Typography variant="body2">Loading content...</Typography>
 </Card>
 );
 }

 if (error) {
 return (
 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8d7da' }}>
 <Typography variant="body2" color="error">
 <strong>Error:</strong> {error.message}
 </Typography>
 </Card>
 );
 }

 return (
 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#d4edda' }}>
 <SafeSpan dataSource={dataSource} />
 <Typography variant="caption" color="textSecondary" style={{ marginTop: '0.5rem', display: 'block' }}>
 Loaded via custom useDataBinding hook
 </Typography>
 </Card>
 );
 };

 return (
 <Section>
 <Typography variant="h4">Custom Hook Implementation</Typography>
 <Typography variant="body1" gutterBottom>
 Custom implementation using the useDataBinding hook directly with advanced options like validation and caching.
 </Typography>

 <CustomComponent dataSource="announcements.current" />

 <Code title="Custom Hook Usage">{`const CustomComponent: React.FC<{ dataSource: string }> = ({ dataSource }) => {
 const { loading, error } = useDataBinding(
 dataSource,
 {
 html: '<p>Fallback HTML content</p>',
 placeholder: 'Fallback placeholder'
 },
 undefined,
 { strict: true, cache: true }
 );

 if (loading) return <LoadingComponent />;
 if (error) return <ErrorComponent error={error} />;

 return <SafeSpan dataSource={dataSource} />;
};`}</Code>

 <Code title="Hook Options">{`const options = {
 strict: true, // Enable strict schema validation
 cache: true, // Enable caching for performance
 fallback: { // Custom fallback data
 html: '<p>Custom fallback content</p>',
 placeholder: 'Custom placeholder'
 }
};`}</Code>
 </Section>
 );
 },
 parameters: {
 docs: {
 description: {
 story: 'Custom implementation using the useDataBinding hook directly with advanced options like validation and caching.'
 }
 }
 }
};

// Error Handling
export const ErrorHandlingScenarios: Story = {
 render: () => (
 <Section>
 <Typography variant="h4">Error Handling Scenarios</Typography>
 <Typography variant="body1" gutterBottom>
 Various error handling scenarios showing how the system gracefully degrades when data is missing or invalid.
 </Typography>

 <GridLayout spacing="large">
 <div>
 <Typography variant="h6">Non-existent Data Source</Typography>
 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#fff3cd' }}>
 <SafeSpan
 dataSource="does.not.exist"
 placeholder="Fallback when data source doesn't exist"
 />
 </Card>
 </div>

 <div>
 <Typography variant="h6">Empty Data Source</Typography>
 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#f8d7da' }}>
 <SafeSpan
 dataSource="empty.data"
 html="<p>Fallback HTML when data is empty</p>"
 />
 </Card>
 </div>

 <div>
 <Typography variant="h6">Graceful Degradation</Typography>
 <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#d4edda' }}>
 <SafeSpan
 dataSource="malformed.data"
 bindingOptions={{
 fallback: {
 html: '<p>Graceful fallback for <strong>malformed data</strong></p>',
 placeholder: 'Fallback placeholder'
 }
 }}
 />
 </Card>
 </div>
 </GridLayout>

 <Code title="Non-existent Data Source">{`<SafeSpan
 dataSource="does.not.exist"
 placeholder="Fallback when data source doesn't exist"
/>`}</Code>

 <Code title="Custom Fallback Options">{`<SafeSpan
 dataSource="malformed.data"
 bindingOptions={{
 fallback: {
 html: '<p>Graceful fallback for <strong>malformed data</strong></p>',
 placeholder: 'Fallback placeholder'
 }
 }}
/>`}</Code>

 <Code title="Error Handling Strategy">{`// System handles errors gracefully:
// 1. Uses fallback props when data source fails
// 2. Shows placeholder text when content is empty
// 3. Applies custom fallback options when specified
// 4. Never breaks the UI - always renders something useful`}</Code>
 </Section>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Various error handling scenarios showing how the system gracefully degrades when data is missing or invalid.'
 }
 }
 }
};