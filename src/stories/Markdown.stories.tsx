/**
 * Markdown Component Stories
 * 
 * Demonstrates Markdown rendering capabilities with Framework component integration.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from '../components/Markdown';

const meta: Meta<typeof Markdown> = {
 title: 'Components/Markdown',
 component: Markdown,
 parameters: {
 layout: 'centered',
 docs: {
 description: {
 component: 'The Markdown component converts Markdown strings to React components via Html transformation. Supports GitHub Flavored Markdown with Framework component integration for code blocks, buttons, and more.',
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 children: {
 control: 'text',
 description: 'Markdown content as string',
 },
 sanitize: {
 control: 'boolean',
 description: 'Whether to sanitize HTML output',
 },
 placeholder: {
 control: 'text',
 description: 'Fallback content when Markdown is empty',
 },
 component: {
 control: 'text',
 description: 'Container element type',
 },
 },
};

export default meta;
type Story = StoryObj<typeof Markdown>;

export const BasicMarkdown: Story = {
 args: {
 children: `# Welcome to QwickApps React Framework

This is a **basic example** of Markdown content being rendered with the Markdown component.

## Features

- Automatic **bold** and *italic* text
- [Links](https://qwickapps.com) work perfectly
- Lists are properly formatted
- Code blocks get syntax highlighting

### Getting Started

Just wrap your Markdown content in the \`<Markdown>\` component and you're ready to go!`,
 },
 parameters: {
 docs: {
 description: {
 story: 'Basic Markdown content with headings, emphasis, links, and lists. All content gets Framework styling automatically.',
 },
 },
 },
};

export const CodeExamples: Story = {
 args: {
 children: `# Code Examples

The Markdown component automatically transforms code blocks into the Framework Code component.

## JavaScript Example

\`\`\`javascript
function createApp(options) {
 return {
 name: options.appName,
 version: '1.0.0',
 start() {
 console.log(\`Starting \${this.name}...\`);
 }
 };
}

const app = createApp({ appName: 'My QwickApp' });
app.start();
\`\`\`

## TypeScript Interface

\`\`\`typescript
interface AppConfig {
 name: string;
 version: string;
 features: string[];
 debug?: boolean;
}

const config: AppConfig = {
 name: 'QwickApp',
 version: '1.0.0',
 features: ['responsive', 'theming', 'components']
};
\`\`\`

## Inline Code

You can also use \`inline code\` within paragraphs. The Markdown component preserves inline code elements while transforming block-level code into the Framework Code component.

## Plain Code Block

\`\`\`
This is a plain code block without language specification.
It still gets the Code component treatment with copy functionality.
\`\`\``,
 },
 parameters: {
 docs: {
 description: {
 story: 'Code blocks in Markdown are automatically transformed into Framework Code components with syntax highlighting and interactive features.',
 },
 },
 },
};

export const GitHubFlavoredMarkdown: Story = {
 args: {
 children: `# GitHub Flavored Markdown Support

The Markdown component supports GitHub Flavored Markdown (GFM) features.

## Strikethrough

You can ~~strike through~~ text using double tildes.

## Task Lists

- [x] Implement Markdown component
- [x] Add Code component integration
- [ ] Add more transformation rules
- [ ] Create comprehensive documentation

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | All heading levels |
| Code Blocks | ✅ | With syntax highlighting |
| Tables | ✅ | Basic table support |
| Task Lists | ✅ | Interactive checkboxes |
| Strikethrough | ✅ | Double tilde syntax |

## Blockquotes

> This is a blockquote in Markdown.
> 
> It can span multiple lines and gets proper Framework styling.
> 
> > Nested blockquotes are also supported.

## Horizontal Rules

Content above the rule.

---

Content below the rule.`,
 },
 parameters: {
 docs: {
 description: {
 story: 'GitHub Flavored Markdown features like strikethrough, task lists, and tables are fully supported.',
 },
 },
 },
};

export const ComplexDocument: Story = {
 args: {
 children: `# QwickApps React Framework Guide

Welcome to the comprehensive guide for using the QwickApps React Framework with Markdown content.

## Quick Start

Getting started with QwickApps is easy:

1. **Install** the framework: \`npm install @qwickapps/react-framework\`
2. **Import** components: \`import { QwickApp, Markdown } from '@qwickapps/react-framework'\`
3. **Start building** amazing applications!

### Basic Usage Example

\`\`\`tsx
import { Markdown } from '@qwickapps/react-framework';

function DocumentPage({ content }: { content: string }) {
 return (
 <div>
 <Markdown>{content}</Markdown>
 </div>
 );
}
\`\`\`

## Advanced Features

### Code Highlighting

The framework automatically highlights code in various languages:

\`\`\`python
def fibonacci(n):
 if n <= 1:
 return n
 return fibonacci(n-1) + fibonacci(n-2)

# Generate first 10 Fibonacci numbers
for i in range(10):
 print(f"F({i}) = {fibonacci(i)}")
\`\`\`

### Interactive Elements

> **Note:** While Markdown doesn't natively support buttons, you can mix HTML with Markdown for interactive content when needed.

### Lists and Organization

**Key Benefits:**
- **Performance**: Optimized rendering pipeline
- **Theming**: Automatic theme integration
- **Flexibility**: Configurable transformation rules
- **Responsive**: Mobile-first design approach
- ♿ **Accessibility**: WCAG compliant components

**Supported Content Types:**
1. Headings (H1-H6)
2. Paragraphs and text formatting
3. Lists (ordered and unordered)
4. Links and images
5. Code blocks and inline code
6. Blockquotes
7. Tables
8. Horizontal rules

## Best Practices

When working with the Markdown component:

- ✅ **Do** use semantic Markdown structure
- ✅ **Do** leverage code blocks for syntax highlighting
- ✅ **Do** use appropriate heading levels
- ❌ **Don't** rely on HTML for basic formatting
- ❌ **Don't** nest complex HTML structures unnecessarily

## Conclusion

The QwickApps React Framework Markdown component provides a powerful way to render content while maintaining consistency with your application's design system.

---

*Happy coding with QwickApps! *`,
 },
 parameters: {
 docs: {
 description: {
 story: 'A comprehensive document demonstrating various Markdown features working together in a real-world scenario.',
 },
 },
 },
};

export const EmptyContent: Story = {
 args: {
 children: '',
 placeholder: 'No documentation available yet. Check back later!',
 },
 parameters: {
 docs: {
 description: {
 story: 'When no Markdown content is provided, a placeholder message can be displayed with appropriate styling.',
 },
 },
 },
};

export const CustomConfiguration: Story = {
 args: {
 children: `# Custom Configuration

This example shows Markdown with custom marked options.

Line 1
Line 2

The breaks option can convert single line breaks to \`<br>\` tags.`,
 markedOptions: {
 breaks: true,
 },
 },
 parameters: {
 docs: {
 description: {
 story: 'The Markdown component accepts custom marked.js options for fine-tuning the parsing behavior.',
 },
 },
 },
};

export const MixedContent: Story = {
 args: {
 children: `# Mixed HTML and Markdown

You can mix HTML with Markdown when needed:

<div style="padding: 16px; border: 1px solid #ccc; border-radius: 8px; background: #f9f9f9;">
 This is **HTML with Markdown** inside it!
 
 \`\`\`javascript
 const mixed = 'HTML and Markdown';
 console.log(\`Working with \${mixed}\`);
 \`\`\`
</div>

Back to regular **Markdown content** here.

## Comparison Table

| Approach | Pros | Cons |
|----------|------|------|
| Pure Markdown | Clean syntax | Limited styling |
| Mixed Content | Full flexibility | More complex |
| HTML Only | Complete control | Verbose syntax |

Choose the approach that best fits your content needs!`,
 },
 parameters: {
 docs: {
 description: {
 story: 'Markdown content can include HTML elements when additional structure or styling is needed.',
 },
 },
 },
};