/**
 * Html Component Stories
 * 
 * Demonstrates HTML transformation capabilities of the Html component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Html } from '../components/Html';

const meta: Meta<typeof Html> = {
  title: 'Components/Html',
  component: Html,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The Html component transforms HTML strings into Framework components using configurable transformation rules. Perfect for rendering dynamic HTML content from data sources with Framework component styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'HTML content as string',
    },
    stripHeaders: {
      control: 'boolean',
      description: 'Whether to strip header elements (useful for articles)',
    },
    sanitize: {
      control: 'boolean',
      description: 'Whether to sanitize HTML content',
    },
    placeholder: {
      control: 'text',
      description: 'Fallback content when HTML is empty',
    },
    component: {
      control: 'text',
      description: 'Container element type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Html>;

export const BasicContent: Story = {
  args: {
    children: '<h2>Welcome to QwickApps</h2><p>This is a <strong>basic example</strong> of HTML content being transformed into Framework components.</p><p>Notice how the styling automatically matches the theme.</p>',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic HTML content with headings and paragraphs. The component automatically applies Framework styling.',
      },
    },
  },
};

export const CodeBlocks: Story = {
  args: {
    children: `
      <h3>Code Transformation Examples</h3>
      <p>Here's a JavaScript code block:</p>
      <pre><code class="language-javascript">
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
      </code></pre>
      <p>And here's some inline <code>const x = 42</code> code.</p>
      <p>Multi-line code blocks are transformed too:</p>
      <code>
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];
      </code>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'Code blocks are automatically transformed into the Framework Code component with syntax highlighting and copy functionality.',
      },
    },
  },
};

export const BlogSections: Story = {
  args: {
    children: `
      <section class="blog-section" data-padding="large">
        <h2>Introduction</h2>
        <p>This section demonstrates how blog sections are transformed into Framework Section components.</p>
      </section>
      
      <section class="blog-section" data-padding="medium">
        <h2>Features</h2>
        <ul>
          <li>Automatic spacing control via data-padding</li>
          <li>Section titles become Typography components</li>
          <li>Content is properly contained and styled</li>
        </ul>
      </section>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'Blog sections with class="blog-section" are transformed into Framework Section components with configurable padding.',
      },
    },
  },
};

export const InteractiveElements: Story = {
  args: {
    children: `
      <h3>Interactive Elements</h3>
      <p>Buttons are transformed into Framework Button components:</p>
      <button data-variant="contained">Primary Action</button>
      <button data-variant="outlined">Secondary Action</button>
      <button disabled>Disabled Button</button>
      
      <p>Other elements maintain their HTML structure but get Framework styling:</p>
      <blockquote>
        This is a blockquote that will be styled according to the current theme.
      </blockquote>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive elements like buttons are transformed into Framework components while maintaining their functionality.',
      },
    },
  },
};

export const HeaderStripping: Story = {
  args: {
    children: `
      <header class="blog-header">
        <h1>Article Title</h1>
        <p>This header will be stripped when stripHeaders=true</p>
      </header>
      
      <h1>Standalone H1</h1>
      <p>This standalone H1 will also be removed when stripHeaders=true</p>
      
      <h2>Main Content</h2>
      <p>This content will always be preserved.</p>
    `,
    stripHeaders: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When stripHeaders is enabled, blog headers and standalone H1 elements are removed. Useful for articles where headers are handled separately.',
      },
    },
  },
};

export const EmptyContent: Story = {
  args: {
    children: '',
    placeholder: 'No content available at this time.',
  },
  parameters: {
    docs: {
      description: {
        story: 'When no content is provided, a placeholder message can be shown with appropriate styling.',
      },
    },
  },
};

export const CustomContainer: Story = {
  args: {
    children: '<h2>Article Title</h2><p>This content is rendered inside an article element instead of the default div.</p>',
    component: 'article',
  },
  parameters: {
    docs: {
      description: {
        story: 'The container element can be customized using the component prop.',
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    children: `
      <article>
        <h1>Complete Article Example</h1>
        
        <section class="blog-section" data-padding="large">
          <h2>Introduction</h2>
          <p>This is a comprehensive example showing various HTML elements being transformed.</p>
          
          <pre><code class="language-typescript">
interface HtmlProps {
  children: string;
  transformConfig?: TransformConfig;
  stripHeaders?: boolean;
  sanitize?: boolean;
}
          </code></pre>
        </section>
        
        <section class="blog-section" data-padding="medium">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Code Highlighting:</strong> Automatic syntax highlighting for code blocks</li>
            <li><strong>Button Components:</strong> HTML buttons become Framework buttons</li>
            <li><strong>Section Management:</strong> Blog sections get proper spacing and layout</li>
            <li><strong>Theme Integration:</strong> All content respects the current theme</li>
          </ul>
          
          <p>Try these interactive elements:</p>
          <button data-variant="contained">Get Started</button>
          <button data-variant="outlined">Learn More</button>
        </section>
        
        <blockquote>
          <p>"The Html component makes it easy to render dynamic content while maintaining consistent Framework styling and behavior."</p>
        </blockquote>
      </article>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'A complex example demonstrating multiple transformation rules working together in a single HTML document.',
      },
    },
  },
};

export const SanitizedContent: Story = {
  args: {
    children: `
      <h3>Sanitized Content Example</h3>
      <p>This content includes potentially dangerous elements that are sanitized:</p>
      <script>alert('This would be dangerous!');</script>
      <p onclick="alert('Click handler')">This paragraph has an onclick handler that will be removed.</p>
      <p>But this <strong>safe content</strong> is preserved perfectly.</p>
      <p>Links are also handled safely: <a href="https://qwickapps.com">Visit QwickApps</a></p>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'HTML content is automatically sanitized to remove dangerous elements and attributes while preserving safe content.',
      },
    },
  },
};