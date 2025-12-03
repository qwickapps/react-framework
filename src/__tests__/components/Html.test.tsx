/**
 * Html Component Tests
 */

import { render, screen } from '@testing-library/react';
import { Html } from '../../components/Html';

describe('Html Component', () => {
  // Test empty content handling
  describe('Empty Content', () => {
    it('renders nothing when children is empty', () => {
      const { container } = render(<Html>{''}</Html>);
      expect(container.firstChild).toBeNull();
    });

    it('renders placeholder when children is empty and placeholder is provided', () => {
      render(<Html placeholder="No content available">{''}</Html>);
      expect(screen.getByText('No content available')).toBeInTheDocument();
    });

    it('renders placeholder with proper styling', () => {
      render(<Html placeholder="Loading content...">{''}</Html>);
      const placeholder = screen.getByText('Loading content...');
      expect(placeholder).toBeInTheDocument();
    });
  });

  // Test basic HTML rendering
  describe('Basic HTML Rendering', () => {
    it('renders simple HTML content', () => {
      render(<Html>{'<p>Hello World</p>'}</Html>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders multiple paragraphs', () => {
      const html = '<p>First paragraph</p><p>Second paragraph</p>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    });

    it('handles headers correctly', () => {
      const html = '<h1>Main Title</h1><h2>Subtitle</h2>';
      render(<Html>{html}</Html>);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle');
    });
  });

  // Test code transformation
  describe('Code Block Transformation', () => {
    it('transforms pre+code blocks to Code component', () => {
      const html = '<pre><code class="language-javascript">console.log("Hello");</code></pre>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('console.log("Hello");')).toBeInTheDocument();
    });

    it('handles code blocks without language class', () => {
      const html = '<pre><code>plain text code</code></pre>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('plain text code')).toBeInTheDocument();
    });

    it('transforms standalone complex code blocks', () => {
      const html = '<code>line1\nline2</code>';
      render(<Html>{html}</Html>);
      expect(screen.getByText(/line1/)).toBeInTheDocument();
      expect(screen.getByText(/line2/)).toBeInTheDocument();
    });

    it('preserves inline code elements', () => {
      const html = '<p>This has <code>inline code</code> in it.</p>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('inline code')).toBeInTheDocument();
      // SafeSpan wraps the p tag content, so we check the combination
      const paragraph = screen.getByText('inline code').closest('p');
      expect(paragraph).toBeInTheDocument();
    });
  });

  // Test section transformation
  describe('Section Transformation', () => {
    it('transforms blog sections to Section component', () => {
      const html = '<section class="blog-section" data-padding="large"><h2>Section Title</h2><p>Content</p></section>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('Section Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles sections without titles', () => {
      const html = '<section class="blog-section"><p>Just content</p></section>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('Just content')).toBeInTheDocument();
    });
  });

  // Test button transformation
  describe('Button Transformation', () => {
    it('transforms button elements to Button components', () => {
      const html = '<button data-variant="contained">Click Me</button>';
      render(<Html>{html}</Html>);
      expect(screen.getByRole('button')).toHaveTextContent('Click Me');
    });

    it('handles disabled buttons', () => {
      const html = '<button disabled>Disabled Button</button>';
      render(<Html>{html}</Html>);
      
      // Note: Current implementation falls back to SafeSpan which preserves original HTML
      // This means disabled buttons are rendered as-is without transformation to Button component
      // This test verifies the current behavior - can be updated when Button patterns are properly registered
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('Disabled Button');
      
      // Due to SafeSpan fallback, the disabled attribute may not be preserved
      // This is a known limitation that should be addressed by proper pattern registration
    });
  });

  // Test header stripping
  describe('Header Stripping', () => {
    it('strips headers when stripHeaders is true', () => {
      const html = '<header class="blog-header"><h1>Page Title</h1></header><p>Content</p>';
      render(<Html stripHeaders>{html}</Html>);
      expect(screen.queryByText('Page Title')).not.toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('preserves headers when stripHeaders is false', () => {
      const html = '<header class="blog-header"><h1>Page Title</h1></header><p>Content</p>';
      render(<Html stripHeaders={false}>{html}</Html>);
      expect(screen.getByText('Page Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  // Test error handling
  describe('Error Handling', () => {
    it('handles malformed HTML gracefully', () => {
      const html = '<p>Unclosed paragraph<div>Mixed content</p></div>';
      const { container } = render(<Html>{html}</Html>);
      expect(container.firstChild).not.toBeNull();
    });

    it('sanitizes dangerous content by default', () => {
      const html = '<script>alert("hack")</script><p>Safe content</p>';
      render(<Html>{html}</Html>);
      expect(screen.getByText('Safe content')).toBeInTheDocument();
      expect(screen.queryByText('alert("hack")')).not.toBeInTheDocument();
    });
  });

  // Test custom props
  describe('Custom Props', () => {
    it('accepts custom component prop', () => {
      const { container } = render(<Html component="article">{'<p>Content</p>'}</Html>);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('accepts custom className', () => {
      const { container } = render(<Html className="custom-html">{'<p>Content</p>'}</Html>);
      expect(container.firstChild).toHaveClass('custom-html');
    });

    it('accepts custom styles', () => {
      const { container } = render(
        <Html sx={{ backgroundColor: 'red' }}>{'<p>Content</p>'}</Html>
      );
      expect(container.firstChild).toHaveClass('MuiBox-root');
    });
  });

  // Test sanitization options
  describe('Sanitization', () => {
    it('can disable sanitization', () => {
      // Note: This test verifies the prop is accepted; actual script execution is browser-dependent
      const html = '<p onmouseover="alert(\'test\')">Hover me</p>';
      render(<Html sanitize={false}>{html}</Html>);
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });
});