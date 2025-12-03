import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Content, Section } from '../components/blocks';
import { GridCell, GridLayout } from '../components/layout';
import SafeSpan from '../components/SafeSpan';

const meta: Meta<typeof SafeSpan> = {
 title: 'Components/SafeSpan',
 component: SafeSpan,
 parameters: {
 docs: {
 description: {
 component: `SafeSpan safely renders HTML content with automatic sanitization, protecting against XSS attacks while preserving formatting.

**Key Features:**
- **XSS Protection**: Automatically sanitizes dangerous HTML elements and attributes
- **Configurable Sanitization**: Customizable allow/disallow lists for fine-tuned security
- **Rich Text Support**: Preserves safe formatting like bold, italic, links, and lists
- **Performance Optimized**: Efficient sanitization without unnecessary re-processing
- **TypeScript Support**: Full type safety for sanitization options and HTML content
- **Framework Agnostic**: Uses industry-standard sanitize-html library
- **Accessibility Maintained**: Preserves ARIA attributes and semantic HTML structure

**Perfect for:**
- User-generated content display (comments, posts, reviews)
- Rich text editor output rendering
- Email content display in web applications
- Markdown-to-HTML conversion output
- Third-party content integration
- CMS and blog content display
- Any scenario requiring safe HTML rendering`,
 },
 },
 },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample HTML content for demonstrations
const safeHtml = `
 <p>This is <strong>safe HTML</strong> content with <em>emphasis</em> and a <a href="#safe-link">safe link</a>.</p>
 <ul>
 <li>List item with <code>code formatting</code></li>
 <li>Another item with <mark>highlighted text</mark></li>
 </ul>
`;

const unsafeHtml = `
 <p>This content contains <strong>potentially dangerous</strong> elements:</p>
 <script>alert('XSS Attack!');</script>
 <img src="x" onerror="alert('Image XSS')">
 <p onclick="alert('Click XSS')">This paragraph has an onclick handler</p>
 <iframe src="javascript:alert('Iframe XSS')"></iframe>
 <style>body { display: none; }</style>
`;

const richContentHtml = `
 <div>
 <h3>Rich Content Example</h3>
 <p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
 <blockquote>This is a blockquote with important information.</blockquote>
 <ul>
 <li>First item</li>
 <li>Second item with <code>inline code</code></li>
 <li>Third item</li>
 </ul>
 <p>Links: <a href="https://example.com" target="_blank">External Link</a> | <a href="#internal">Internal Link</a></p>
 </div>
`;

export const BasicUsage: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Basic SafeSpan Usage" centered maxWidth="large">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>Safe HTML Content</h3>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan html={safeHtml} />
 </div>
 <p><strong>Note:</strong> All HTML is safely rendered with proper sanitization.</p>
 </Content>
 </GridCell>

 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>With Placeholder</h3>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan html="" placeholder="No content available" />
 </div>
 <p><strong>Note:</strong> When no HTML is provided, the placeholder text is shown.</p>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 ),
};

export const SecurityDemonstration: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Security Features" centered maxWidth="large">
 <div style={{
 background: 'var(--theme-error, #dc2626)',
 color: 'white',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '2rem',
 textAlign: 'center'
 }}>
 <strong> Security Demo:</strong> The content below contains malicious scripts that are automatically sanitized.
 </div>

 <GridLayout columns={1} spacing="large">
 <GridCell>
 <Content variant="elevated" spacing='comfortable'>
 <h3>Dangerous HTML Input (Sanitized Output)</h3>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem',
 border: '2px solid var(--theme-primary)'
 }}>
 <SafeSpan html={unsafeHtml} />
 </div>
 <p><strong>✅ SafeSpan automatically removed:</strong></p>
 <ul>
 <li><code>&lt;script&gt;</code> tags</li>
 <li><code>onerror</code> and <code>onclick</code> event handlers</li>
 <li><code>&lt;iframe&gt;</code> with javascript: protocol</li>
 <li><code>&lt;style&gt;</code> tags that could hide content</li>
 </ul>
 <p>Only safe HTML elements and attributes are preserved.</p>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 ),
};

export const RichContentExample: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Rich Content Support" centered maxWidth="large">
 <GridLayout columns={1} spacing="large">
 <GridCell>
 <Content variant="filled" spacing='comfortable'>
 <div style={{
 background: 'var(--theme-surface)',
 padding: '2rem',
 borderRadius: '12px',
 boxShadow: 'var(--theme-elevation-1, 0 2px 4px rgba(0, 0, 0, 0.1))'
 }}>
 <SafeSpan html={richContentHtml} />
 </div>
 </Content>
 </GridCell>
 </GridLayout>

 <Content spacing='comfortable' centered>
 <p><strong>Supported HTML Elements:</strong></p>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
 <div>
 <strong>Text Formatting:</strong>
 <ul>
 <li>p, div, span</li>
 <li>strong, b, em, i</li>
 <li>u, mark, code</li>
 </ul>
 </div>
 <div>
 <strong>Structure:</strong>
 <ul>
 <li>h1, h2, h3, h4, h5, h6</li>
 <li>ul, ol, li</li>
 <li>blockquote</li>
 </ul>
 </div>
 <div>
 <strong>Links & Media:</strong>
 <ul>
 <li>a (with safe href)</li>
 <li>img (with safe src)</li>
 <li>br, hr</li>
 </ul>
 </div>
 </div>
 </Content>
 </Content>
 </Section>
 ),
};

export const CustomStyling: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Custom Styling" centered maxWidth="large">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>Custom CSS Class</h3>
 <div style={{ marginBottom: '1rem' }}>
 <SafeSpan
 html="<p>This content has <strong>custom styling</strong> applied.</p>"
 className="custom-safe-span"
 style={{
 background: 'linear-gradient(45deg, #667eea, #764ba2)',
 padding: '1rem',
 borderRadius: '8px',
 color: 'white'
 }}
 />
 </div>
 <p>You can apply custom CSS classes and inline styles to SafeSpan.</p>
 </Content>
 </GridCell>

 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>Themed Content</h3>
 <div style={{
 background: 'var(--theme-primary)',
 color: 'var(--theme-on-primary)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan
 html="<p>This content uses <em>theme variables</em> for consistent styling.</p>"
 style={{ color: 'inherit' }}
 />
 </div>
 <p>SafeSpan works seamlessly with the QwickApps theme system.</p>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 ),
};

export const EmptyStates: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Empty States and Fallbacks" centered maxWidth="large">
 <GridLayout columns={3} spacing="large">
 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h4>No Content, No Placeholder</h4>
 <div style={{
 minHeight: '60px',
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem',
 border: '1px dashed var(--theme-outline)'
 }}>
 <SafeSpan html="" />
 <em style={{ opacity: 0.6 }}>(Component returns null)</em>
 </div>
 </Content>
 </GridCell>

 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h4>Empty with Placeholder</h4>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan html="" placeholder="No content to display" />
 </div>
 </Content>
 </GridCell>

 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h4>Undefined with Placeholder</h4>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan placeholder="Loading content..." />
 </div>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 ),
};

export const DataBindingExample: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Data Binding with SafeSpan" centered maxWidth="large">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>Traditional Props Usage</h3>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan 
 html="<p>This content is passed as <strong>traditional props</strong>.</p>" 
 placeholder="Loading traditional content..."
 />
 </div>
 <p><strong>Usage:</strong> Direct props without dataSource</p>
 </Content>
 </GridCell>

 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>Data Binding Usage</h3>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 marginBottom: '1rem'
 }}>
 <SafeSpan 
 dataSource="company.description"
 bindingOptions={{ 
 fallback: { 
 html: "<p>Fallback content when data binding fails</p>", 
 placeholder: "Loading from data source..." 
 } 
 }}
 />
 </div>
 <p><strong>Usage:</strong> Data-driven with dataSource prop</p>
 </Content>
 </GridCell>
 </GridLayout>

 <Content spacing='comfortable'>
 <div style={{
 background: 'var(--theme-info, #0ea5e9)',
 color: 'white',
 padding: '1rem',
 borderRadius: '8px',
 textAlign: 'center'
 }}>
 <strong>💡 Data Structure Expected:</strong>
 <pre style={{ 
 background: 'rgba(0,0,0,0.2)', 
 padding: '1rem', 
 borderRadius: '6px',
 marginTop: '1rem',
 textAlign: 'left',
 overflow: 'auto'
 }}>
{`{
 "safeSpans": {
 "richText": {
 "html": "<p>Rich HTML <strong>content</strong> here</p>",
 "placeholder": "Loading rich content..."
 },
 "basicText": {
 "html": "<span>Basic HTML content</span>",
 "placeholder": "Loading..."
 }
 }
}`}
 </pre>
 </div>
 </Content>
 </Content>
 </Section>
 ),
};

export const SecurityTestingExample: Story = {
 render: () => (
 <Section padding="large">
 <Content title="Advanced Security Testing" centered maxWidth="large">
 <GridLayout columns={1} spacing="large">
 <GridCell>
 <Content variant="elevated" spacing='comfortable'>
 <h3>XSS Attack Vector Testing</h3>
 
 {/* Test various XSS attack patterns */}
 <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
 
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 border: '2px solid var(--theme-warning, #f59e0b)'
 }}>
 <h4>Script Injection Test</h4>
 <SafeSpan 
 html={`<p>Normal content followed by: <script>alert('XSS')</script></p>`}
 placeholder="Testing script injection..."
 />
 <p><small>✅ Script tags should be completely removed</small></p>
 </div>

 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 border: '2px solid var(--theme-warning, #f59e0b)'
 }}>
 <h4>Event Handler Test</h4>
 <SafeSpan 
 html={`<p onclick="alert('Click XSS')" onmouseover="alert('Hover XSS')">Hover or click this text</p>`}
 placeholder="Testing event handlers..."
 />
 <p><small>✅ Event handlers should be stripped</small></p>
 </div>

 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 border: '2px solid var(--theme-warning, #f59e0b)'
 }}>
 <h4>JavaScript URL Test</h4>
 <SafeSpan 
 html={`<a href="javascript:alert('Link XSS')">Malicious Link</a>`}
 placeholder="Testing javascript URLs..."
 />
 <p><small>✅ javascript: URLs should be blocked</small></p>
 </div>

 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 border: '2px solid var(--theme-warning, #f59e0b)'
 }}>
 <h4>Data URL Test</h4>
 <SafeSpan 
 html={`<img src="data:text/html,<script>alert('Data URL XSS')</script>" alt="test">`}
 placeholder="Testing data URLs..."
 />
 <p><small>✅ Malicious data URLs should be blocked</small></p>
 </div>

 <div style={{
 background: 'var(--theme-success, #10b981)',
 color: 'white',
 padding: '1rem',
 borderRadius: '8px',
 }}>
 <h4>✅ Safe Content (Should Render)</h4>
 <SafeSpan 
 html={`<p>This is <strong>safe content</strong> with <a href="https://example.com" target="_blank" rel="noopener noreferrer">external link</a></p>`}
 placeholder="Loading safe content..."
 />
 <p><small>✅ Safe HTML should render with security attributes added</small></p>
 </div>

 </div>
 </Content>
 </GridCell>
 </GridLayout>
 </Content>
 </Section>
 ),
};

// Interactive SafeSpan Component
const InteractiveSafeSpanComponent = () => {
 const [htmlContent, setHtmlContent] = useState(safeHtml);
 const [placeholder, setPlaceholder] = useState('Enter some HTML content...');

 return (
 <Section padding="large">
 <Content title="Interactive SafeSpan Demo" centered maxWidth="large">
 <GridLayout columns={2} spacing="large">
 <GridCell>
 <Content variant="outlined" spacing='comfortable'>
 <h3>HTML Input</h3>
 <textarea
 value={htmlContent}
 onChange={(e) => setHtmlContent(e.target.value)}
 placeholder="Enter HTML content to test..."
 style={{
 width: '100%',
 minHeight: '150px',
 padding: '1rem',
 border: '1px solid var(--theme-outline)',
 borderRadius: '8px',
 background: 'var(--theme-surface)',
 color: 'var(--theme-on-surface)',
 fontFamily: 'monospace',
 fontSize: '0.9rem',
 marginBottom: '1rem'
 }}
 />
 <input
 type="text"
 value={placeholder}
 onChange={(e) => setPlaceholder(e.target.value)}
 placeholder="Placeholder text..."
 style={{
 width: '100%',
 padding: '0.75rem',
 border: '1px solid var(--theme-outline)',
 borderRadius: '8px',
 background: 'var(--theme-surface)',
 color: 'var(--theme-on-surface)'
 }}
 />
 </Content>
 </GridCell>

 <GridCell>
 <Content variant="elevated" spacing='comfortable'>
 <h3>SafeSpan Output</h3>
 <div style={{
 background: 'var(--theme-surface-variant)',
 padding: '1rem',
 borderRadius: '8px',
 minHeight: '200px',
 border: '1px solid var(--theme-outline)'
 }}>
 <SafeSpan html={htmlContent} placeholder={placeholder} />
 </div>
 <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
 <strong>Try entering:</strong> HTML with scripts, event handlers, or other potentially dangerous content to see how it's automatically sanitized.
 </p>
 </Content>
 </GridCell>
 </GridLayout>

 <Content spacing='comfortable'>
 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
 <button
 onClick={() => setHtmlContent(safeHtml)}
 style={{
 padding: '0.75rem 1.5rem',
 background: 'var(--theme-primary)',
 color: 'var(--theme-on-primary)',
 border: 'none',
 borderRadius: '6px',
 cursor: 'pointer'
 }}
 >
 Load Safe HTML
 </button>
 <button
 onClick={() => setHtmlContent(unsafeHtml)}
 style={{
 padding: '0.75rem 1.5rem',
 background: 'var(--theme-error, #dc2626)',
 color: 'white',
 border: 'none',
 borderRadius: '6px',
 cursor: 'pointer'
 }}
 >
 Load Unsafe HTML
 </button>
 <button
 onClick={() => setHtmlContent(richContentHtml)}
 style={{
 padding: '0.75rem 1.5rem',
 background: 'transparent',
 color: 'var(--theme-primary)',
 border: '1px solid var(--theme-primary)',
 borderRadius: '6px',
 cursor: 'pointer'
 }}
 >
 Load Rich Content
 </button>
 <button
 onClick={() => setHtmlContent('')}
 style={{
 padding: '0.75rem 1.5rem',
 background: 'transparent',
 color: 'var(--theme-on-surface)',
 border: '1px solid var(--theme-outline)',
 borderRadius: '6px',
 cursor: 'pointer'
 }}
 >
 Clear Content
 </button>
 </div>
 </Content>
 </Content>
 </Section>
 );
};
InteractiveSafeSpanComponent.displayName = 'InteractiveSafeSpanComponent';

export const InteractiveExample: Story = {
 render: () => <InteractiveSafeSpanComponent />,
};