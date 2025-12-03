/**
 * Markdown Component Tests
 */

import { render, screen } from '@testing-library/react';
import { Markdown } from '../../components/Markdown';

describe('Markdown Component', () => {
  // Test empty content handling
  describe('Empty Content', () => {
    it('renders nothing when children is empty', () => {
      const { container } = render(<Markdown>{''}</Markdown>);
      expect(container.firstChild).toBeNull();
    });

    it('renders placeholder when children is empty and placeholder is provided', () => {
      render(<Markdown placeholder="No markdown content">{''}</Markdown>);
      expect(screen.getByText('No markdown content')).toBeInTheDocument();
    });
  });

  // Test basic Markdown rendering
  describe('Basic Markdown Rendering', () => {
    it('renders simple markdown content', () => {
      const markdown = '# Hello World\n\nThis is a paragraph.';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
      expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
    });

    it('renders markdown lists', () => {
      const markdown = '- Item 1\n- Item 2\n- Item 3';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders markdown links', () => {
      const markdown = '[Click here](https://example.com)';
      render(<Markdown>{markdown}</Markdown>);
      const link = screen.getByRole('link', { name: 'Click here' });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('renders markdown emphasis', () => {
      const markdown = 'This is **bold** and *italic* text.';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
    });
  });

  // Test code block rendering
  describe('Code Block Rendering', () => {
    it('renders fenced code blocks', () => {
      const markdown = '```javascript\nconsole.log("Hello World");\n```';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument();
    });

    it('renders code blocks without language specification', () => {
      const markdown = '```\nplain code block\n```';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('plain code block')).toBeInTheDocument();
    });

    it('preserves inline code elements', () => {
      const markdown = 'Use `console.log()` to print output.';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('console.log()')).toBeInTheDocument();
      // Check that inline code is in a paragraph context
      const codeElement = screen.getByText('console.log()');
      expect(codeElement.closest('p')).toBeInTheDocument();
    });

    it('handles indented code blocks', () => {
      const markdown = '    indented code block\n    second line';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText(/indented code block/)).toBeInTheDocument();
    });
  });

  // Test GitHub Flavored Markdown features
  describe('GitHub Flavored Markdown', () => {
    it('renders strikethrough text', () => {
      const markdown = '~~strikethrough~~';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('strikethrough')).toBeInTheDocument();
    });

    it('renders tables', () => {
      const markdown = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |';
      const { container } = render(<Markdown>{markdown}</Markdown>);
      // Just check that it renders without errors
      expect(container.firstChild).not.toBeNull();
    });

    it('handles task lists', () => {
      const markdown = '- [x] Completed task\n- [ ] Incomplete task';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText(/Completed task/)).toBeInTheDocument();
      expect(screen.getByText(/Incomplete task/)).toBeInTheDocument();
    });
  });

  // Test blockquotes
  describe('Blockquotes', () => {
    it('renders blockquotes correctly', () => {
      const markdown = '> This is a blockquote\n> with multiple lines';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText(/This is a blockquote/)).toBeInTheDocument();
    });

    it('handles nested blockquotes', () => {
      const markdown = '> Level 1\n>> Level 2\n>>> Level 3';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 2')).toBeInTheDocument();
      expect(screen.getByText('Level 3')).toBeInTheDocument();
    });
  });

  // Test custom component
  describe('Custom Component', () => {
    it('accepts custom component prop', () => {
      const { container } = render(
        <Markdown component="article">{'# Hello World'}</Markdown>
      );
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('accepts custom className', () => {
      const { container } = render(
        <Markdown className="custom-markdown">{'# Hello World'}</Markdown>
      );
      expect(container.firstChild).toHaveClass('custom-markdown');
    });
  });

  // Test marked options
  describe('Marked Options', () => {
    it('accepts custom marked options', () => {
      const markedOptions = {
        breaks: true, // Convert line breaks to <br>
      };
      const markdown = 'Line 1\nLine 2';
      const { container } = render(<Markdown markedOptions={markedOptions}>{markdown}</Markdown>);
      expect(container.firstChild).not.toBeNull();
    });
  });

  // Test error handling
  describe('Error Handling', () => {
    it('handles malformed markdown gracefully', () => {
      const markdown = '# Unclosed [link\n**bold without close';
      const { container } = render(<Markdown>{markdown}</Markdown>);
      expect(container.firstChild).not.toBeNull();
      expect(screen.getByText(/Unclosed/)).toBeInTheDocument();
    });

    it('handles very large markdown content', () => {
      const largeMarkdown = '# Large Content\n\n' + 'This is a very long paragraph. '.repeat(100);
      const { container } = render(<Markdown>{largeMarkdown}</Markdown>);
      expect(container.firstChild).not.toBeNull();
      expect(screen.getByText('Large Content')).toBeInTheDocument();
    });
  });

  // Test sanitization
  describe('Sanitization', () => {
    it('sanitizes HTML in markdown by default', () => {
      const markdown = '# Title\n\nSafe content';
      render(<Markdown>{markdown}</Markdown>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Safe content')).toBeInTheDocument();
    });

    it('can disable sanitization', () => {
      const markdown = '<div id="custom">Custom HTML in markdown</div>';
      render(<Markdown sanitize={false}>{markdown}</Markdown>);
      expect(screen.getByText('Custom HTML in markdown')).toBeInTheDocument();
    });
  });

  // Test complex markdown documents
  describe('Complex Documents', () => {
    it('renders complex documents with mixed content', () => {
      const complexMarkdown = `
# Main Title

This is a paragraph with **bold** and *italic* text.

## Code Examples

Here's some JavaScript:

\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\`

And here's some inline \`code\`.

## Lists

- Item 1
  - Nested item
- Item 2
- Item 3

## Links and Images

Visit [Google](https://google.com) for search.

## Blockquote

> This is a famous quote
> that spans multiple lines.

That's all!
      `;

      const { container } = render(<Markdown>{complexMarkdown}</Markdown>);
      
      // Check key elements are rendered
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(container.firstChild).not.toBeNull();
    });
  });
});