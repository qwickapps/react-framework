/**
 * HTML Transform Utilities Tests
 */

import { render } from '@testing-library/react';
import React from 'react';
import { 
  transformElement, 
  transformHtmlToReact, 
  stripHeaderFromContent,
  defaultArticleRules,
  defaultMarkdownRules
} from '../htmlTransform';

// Helper function to create DOM elements for testing
function createElementFromHTML(html: string): Element {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.firstElementChild!;
}

describe('HTML Transform Utilities', () => {
  
  describe('stripHeaderFromContent', () => {
    it('removes blog headers from HTML content', () => {
      const html = '<header class="blog-header"><h1>Title</h1></header><p>Content</p>';
      const result = stripHeaderFromContent(html);
      expect(result).not.toContain('<header');
      expect(result).toContain('<p>Content</p>');
    });

    it('removes standalone h1 elements', () => {
      const html = '<h1>Main Title</h1><p>Content follows</p>';
      const result = stripHeaderFromContent(html);
      expect(result).not.toContain('<h1>Main Title</h1>');
      expect(result).toContain('<p>Content follows</p>');
    });

    it('preserves content when no headers present', () => {
      const html = '<p>Just content</p><div>More content</div>';
      const result = stripHeaderFromContent(html);
      expect(result).toBe(html);
    });

    it('handles multiple header types', () => {
      const html = '<header class="blog-header">Header 1</header><div class="blog-header">Header 2</div><p>Content</p>';
      const result = stripHeaderFromContent(html);
      expect(result).not.toContain('Header 1');
      expect(result).not.toContain('Header 2');
      expect(result).toContain('<p>Content</p>');
    });
  });

  describe('transformElement', () => {
    it('transforms pre+code elements to Code components', () => {
      const element = createElementFromHTML('<pre><code class="language-javascript">console.log("test");</code></pre>');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('console.log("test");');
    });

    it('transforms blog sections to Section components', () => {
      const element = createElementFromHTML('<section class="blog-section"><h2>Section Title</h2><p>Content</p></section>');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('Section Title');
      expect(container.textContent).toContain('Content');
    });

    it('transforms button elements to Button components', () => {
      const element = createElementFromHTML('<button data-variant="contained">Click Me</button>');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('Click Me');
    });

    it('handles standalone code blocks', () => {
      const element = createElementFromHTML('<code>multi\nline\ncode</code>');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('multi\nline\ncode');
    });

    it('preserves inline code in paragraphs', () => {
      const element = createElementFromHTML('<p>Text with <code>inline code</code> here</p>');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('inline code');
    });

    it('handles void elements correctly', () => {
      const element = createElementFromHTML('<img src="test.jpg" alt="test" />');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'test.jpg');
      expect(img).toHaveAttribute('alt', 'test');
    });

    it('falls back to SafeSpan for unknown elements', () => {
      const element = createElementFromHTML('<div class="unknown">Some content</div>');
      const result = transformElement(element, 'test-key', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('Some content');
    });
  });

  describe('transformHtmlToReact', () => {
    it('transforms entire HTML documents', () => {
      const html = '<h1>Title</h1><p>Paragraph</p><pre><code>code block</code></pre>';
      const components = transformHtmlToReact(html, { rules: defaultArticleRules });
      
      expect(components).toHaveLength(3); // h1, p, and code block
      
      const { container } = render(<>{components}</>);
      expect(container.textContent).toContain('Title');
      expect(container.textContent).toContain('Paragraph');
      expect(container.textContent).toContain('code block');
    });

    it('returns empty array for empty HTML', () => {
      const components = transformHtmlToReact('', { rules: defaultArticleRules });
      expect(components).toEqual([]);
    });

    it('handles whitespace-only HTML', () => {
      const components = transformHtmlToReact('   \n   ', { rules: defaultArticleRules });
      expect(components).toEqual([]);
    });

    it('transforms complex nested structures', () => {
      const html = `
        <div class="container">
          <section class="blog-section">
            <h2>Section</h2>
            <pre><code class="language-python">print("hello")</code></pre>
          </section>
        </div>
      `;
      const components = transformHtmlToReact(html, { rules: defaultArticleRules });
      
      const { container } = render(<>{components}</>);
      expect(container.textContent).toContain('Section');
      expect(container.textContent).toContain('print("hello")');
    });
  });

  describe('defaultArticleRules', () => {
    it('includes pre+code transformation rule', () => {
      const preRule = defaultArticleRules.find(rule => rule.selector === 'pre');
      expect(preRule).toBeDefined();
    });

    it('includes standalone code transformation rule', () => {
      const codeRule = defaultArticleRules.find(rule => rule.selector === 'code');
      expect(codeRule).toBeDefined();
    });

    it('includes blog section transformation rule', () => {
      const sectionRule = defaultArticleRules.find(rule => rule.selector === 'section.blog-section');
      expect(sectionRule).toBeDefined();
    });

    it('includes button transformation rule', () => {
      const buttonRule = defaultArticleRules.find(rule => rule.selector === 'button');
      expect(buttonRule).toBeDefined();
    });
  });

  describe('defaultMarkdownRules', () => {
    it('includes pre+code transformation rule', () => {
      const preRule = defaultMarkdownRules.find(rule => rule.selector === 'pre');
      expect(preRule).toBeDefined();
    });

    it('includes code rule that preserves inline code', () => {
      const codeRule = defaultMarkdownRules.find(rule => rule.selector === 'code');
      expect(codeRule).toBeDefined();
      
      // Test that inline code returns null (no transformation)
      const element = createElementFromHTML('<code>inline</code>');
      const result = codeRule!.transform(element, 'test');
      expect(result).toBeNull();
    });

    it('has fewer rules than article rules (more conservative)', () => {
      expect(defaultMarkdownRules.length).toBeLessThan(defaultArticleRules.length);
    });
  });

  describe('Custom Transform Rules', () => {
    it('applies custom transformation rules', () => {
      const customRules = [{
        selector: 'em',
        transform: (element: Element, key: string) => (
          <strong key={key}>EMPHASIZED: {element.textContent}</strong>
        )
      }];

      const element = createElementFromHTML('<em>italic text</em>');
      const result = transformElement(element, 'test', { rules: customRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('EMPHASIZED: italic text');
    });

    it('combines custom rules with default rules', () => {
      const customRules = [...defaultArticleRules, {
        selector: 'span.highlight',
        transform: (element: Element, key: string) => (
          <mark key={key}>{element.textContent}</mark>
        )
      }];

      const html = '<span class="highlight">highlighted</span><pre><code>code</code></pre>';
      const components = transformHtmlToReact(html, { rules: customRules });
      
      const { container } = render(<>{components}</>);
      expect(container.textContent).toContain('highlighted');
      expect(container.textContent).toContain('code');
    });
  });

  describe('Error Handling', () => {
    it('handles malformed HTML elements', () => {
      const element = createElementFromHTML('<div>unclosed content');
      const result = transformElement(element, 'test', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('unclosed content');
    });

    it('handles elements with missing attributes', () => {
      const element = createElementFromHTML('<button>No attributes</button>');
      const result = transformElement(element, 'test', { rules: defaultArticleRules });
      
      const { container } = render(<>{result}</>);
      expect(container.textContent).toContain('No attributes');
    });

    it('handles empty elements', () => {
      const element = createElementFromHTML('<div></div>');
      const result = transformElement(element, 'test', { rules: defaultArticleRules });
      
      expect(result).toBeDefined();
    });
  });
});