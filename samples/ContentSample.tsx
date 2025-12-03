/**
 * QwickApps React Framework - Html and Markdown Components Demo
 * 
 * This example demonstrates how to use the Html and Markdown components
 * for transforming content strings into React components with configurable rules.
 */

import React from 'react';
import {
  QwickApp,
  ResponsiveMenu,
  Section,
  Content,
  Html,
  Markdown,
  GridLayout,
  GridCell,
  type MenuItem,
  type TransformRule,
  type TransformConfig,
} from '../src';

// Sample menu for the demo
const menuItems: MenuItem[] = [
  {
    id: 'html',
    label: 'HTML Demo',
    icon: <span>📄</span>,
    active: true,
    onClick: () => console.log('HTML Demo'),
  },
  {
    id: 'markdown',
    label: 'Markdown Demo',
    icon: <span>📝</span>,
    onClick: () => console.log('Markdown Demo'),
  },
  {
    id: 'transform',
    label: 'Transform Rules',
    icon: <span>⚙️</span>,
    onClick: () => console.log('Transform Rules'),
  },
];

// Sample HTML content for demonstration
const sampleHtmlContent = `
<h1>Welcome to Our Blog</h1>
<p>This is a sample blog post that demonstrates HTML-to-React transformation.</p>

<h2>Code Examples</h2>
<p>Here's some JavaScript code:</p>
<pre><code class="language-javascript">
const greeting = "Hello, World!";
console.log(greeting);

function createApp() {
  return {
    name: "MyApp",
    version: "1.0.0"
  };
}
</code></pre>

<p>And here's some inline <code>code</code> in a paragraph.</p>

<section class="blog-section" data-padding="large">
  <h2>Features Section</h2>
  <p>This section will be transformed into a Section component.</p>
  <button data-variant="contained">Call to Action</button>
</section>

<h2>More Content</h2>
<p>Additional content that showcases the transformation capabilities.</p>
<ul>
  <li>Automatic syntax highlighting</li>
  <li>Component transformation</li>
  <li>Configurable rules</li>
</ul>
`;

// Sample Markdown content
const sampleMarkdownContent = `
# Markdown Demo

This is a **comprehensive** demonstration of *Markdown* to React component transformation.

## Features

- **GitHub Flavored Markdown** support
- Automatic \`syntax highlighting\` for code blocks  
- Seamless integration with Html component
- Custom transformation rules

## Code Example

Here's a TypeScript example:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

function findUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}
\`\`\`

## Inline Code

You can use inline \`const result = process()\` code seamlessly.

## Lists and More

1. **Ordered lists** work perfectly
2. With proper **formatting**
3. And *emphasis* support

### Unordered Lists
- Item one
- Item two with \`inline code\`
- Item three

> **Note**: This is a blockquote that demonstrates how Markdown content
> is preserved and transformed appropriately.

## Links and Text

Visit [QwickApps](https://qwickapps.com) for more information about our framework.

**Bold text**, *italic text*, and ~~strikethrough~~ are all supported.
`;

// Custom transformation rules for demo
const customTransformRules: TransformRule[] = [
  {
    selector: 'blockquote',
    transform: (element, key) => (
      <div
        key={key}
        style={{
          borderLeft: '4px solid var(--theme-primary)',
          paddingLeft: '1rem',
          margin: '1rem 0',
          background: 'var(--theme-surface-variant)',
          padding: '1rem',
          borderRadius: '0 8px 8px 0',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: element.innerHTML }} />
      </div>
    )
  },
  {
    selector: 'h1',
    transform: (element, key) => (
      <h1
        key={key}
        style={{
          color: 'var(--theme-primary)',
          borderBottom: '2px solid var(--theme-primary)',
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        {element.textContent}
      </h1>
    )
  }
];

const customConfig: TransformConfig = {
  rules: customTransformRules,
  sanitize: true,
};

export const ContentSample: React.FC = () => {
  return (
    <QwickApp 
      appName="Content Demo"
      appId="com.qwickapps.content-demo"
      defaultTheme="system"
      defaultPalette="ocean"
    >
      <ResponsiveMenu 
        items={menuItems}
        logoPosition="left"
      />

      <main>
        {/* Introduction */}
        <Section padding="large" background="surface">
          <Content title="Html & Markdown Components Demo" centered maxWidth="large">
            <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Explore the powerful Html and Markdown components that transform content strings 
              into React components with configurable transformation rules.
            </p>
          </Content>
        </Section>

        {/* Side by Side Comparison */}
        <Section padding="extra-large">
          <GridLayout columns={2} gap="large">
            {/* Html Component Demo */}
            <GridCell>
              <Content title="Html Component" variant="elevated" padding="large">
                <p style={{ marginBottom: '1rem' }}>
                  Transform HTML strings with configurable rules. Default transformations include:
                </p>
                <ul style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <li><code>&lt;pre&gt;&lt;code&gt;</code> → Code component</li>
                  <li><code>&lt;section class="blog-section"&gt;</code> → Section component</li>
                  <li><code>&lt;button&gt;</code> → Button component</li>
                </ul>
                
                <div style={{ 
                  border: '1px solid var(--theme-outline)',
                  borderRadius: '8px',
                  padding: '1rem',
                  background: 'var(--theme-surface)',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  <Html stripHeaders>{sampleHtmlContent}</Html>
                </div>
              </Content>
            </GridCell>

            {/* Markdown Component Demo */}
            <GridCell>
              <Content title="Markdown Component" variant="elevated" padding="large">
                <p style={{ marginBottom: '1rem' }}>
                  Convert Markdown to React components with GitHub Flavored Markdown support:
                </p>
                <ul style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <li>Syntax highlighting for code blocks</li>
                  <li>Inline code preservation</li>
                  <li>Full GFM feature support</li>
                </ul>

                <div style={{ 
                  border: '1px solid var(--theme-outline)',
                  borderRadius: '8px',
                  padding: '1rem',
                  background: 'var(--theme-surface)',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  <Markdown>{sampleMarkdownContent}</Markdown>
                </div>
              </Content>
            </GridCell>
          </GridLayout>
        </Section>

        {/* Custom Rules Demo */}
        <Section padding="large" background="alternate">
          <Content title="Custom Transformation Rules" centered maxWidth="large">
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Create custom transformation rules to handle specific HTML elements in unique ways.
            </p>

            <GridLayout columns={2} gap="large">
              <GridCell>
                <Content title="Default Rules" variant="outlined" padding="medium">
                  <Html>{sampleHtmlContent}</Html>
                </Content>
              </GridCell>

              <GridCell>
                <Content title="Custom Rules" variant="outlined" padding="medium">
                  <Html transformConfig={customConfig}>{sampleHtmlContent}</Html>
                </Content>
              </GridCell>
            </GridLayout>
          </Content>
        </Section>

        {/* Integration Examples */}
        <Section padding="extra-large">
          <Content title="Integration with Existing Components" centered maxWidth="large">
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Html and Markdown components integrate seamlessly with the Framework component system.
            </p>

            <GridLayout columns={1} gap="large">
              <GridCell>
                <Content title="Article with Html Content" variant="elevated" padding="large">
                  <p>The Article component automatically uses Html internally for string content:</p>
                  <div style={{ 
                    background: 'var(--theme-surface-variant)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <Html>
                      {`<h2>Dynamic Content from CMS</h2>
                      <p>This content comes from a headless CMS and is automatically transformed.</p>
                      <pre><code class="language-json">
{
  "title": "Blog Post",
  "content": "<p>HTML content from CMS</p>",
  "published": true
}
                      </code></pre>`}
                    </Html>
                  </div>
                </Content>
              </GridCell>

              <GridCell>
                <Content title="Error Handling Demo" variant="outlined" padding="large">
                  <p>Both components provide comprehensive error handling:</p>
                  <div style={{ marginTop: '1rem' }}>
                    <h4>Malformed HTML (Development Mode)</h4>
                    <Html placeholder="Content not available">
                      {`<div><p>Unclosed paragraph<div>Nested incorrectly`}
                    </Html>
                  </div>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <h4>Empty Content with Placeholder</h4>
                    <Markdown placeholder="No content to display">
                      {""}
                    </Markdown>
                  </div>
                </Content>
              </GridCell>
            </GridLayout>
          </Content>
        </Section>

        {/* Usage Code Examples */}
        <Section padding="large" background="surface">
          <Content title="Usage Examples" centered maxWidth="large">
            <GridLayout columns={2} gap="large">
              <GridCell>
                <h3>Basic Html Component</h3>
                <pre style={{
                  background: 'var(--theme-surface-variant)',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                }}>
                  {`import { Html } from '@qwickapps/react-framework';

// Basic usage
<Html>{htmlString}</Html>

// With header stripping
<Html stripHeaders placeholder="No content">
  {articleContent}
</Html>

// Custom transformation rules
<Html transformConfig={customRules}>
  {htmlContent}
</Html>`}
                </pre>
              </GridCell>

              <GridCell>
                <h3>Basic Markdown Component</h3>
                <pre style={{
                  background: 'var(--theme-surface-variant)',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                }}>
                  {`import { Markdown } from '@qwickapps/react-framework';

// Basic usage
<Markdown>{markdownString}</Markdown>

// With custom HTML transform config
<Markdown htmlTransformConfig={customConfig}>
  {markdownContent}
</Markdown>

// With marked.js options
<Markdown markedOptions={{ breaks: true }}>
  {content}
</Markdown>`}
                </pre>
              </GridCell>
            </GridLayout>
          </Content>
        </Section>
      </main>
    </QwickApp>
  );
};

export default ContentSample;