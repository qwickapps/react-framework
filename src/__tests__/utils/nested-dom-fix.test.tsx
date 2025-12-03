/**
 * Test for DOM nesting fix in HTML transformation
 */

import { transformHtmlToReact, defaultMarkdownRules } from '../../utils/htmlTransform';

describe('DOM nesting fix', () => {
  it('should fix invalid paragraph nesting with block elements', () => {
    // This is the problematic HTML that marked.js creates from mixed content
    const invalidHtml = `
      <p>You can mix HTML with Markdown when needed:</p>
      <p><div style="padding: 16px; border: 1px solid #ccc;">
        This is <strong>HTML with Markdown</strong> inside it!
      </div></p>
      <p>Back to regular content.</p>
    `;

    // Should not throw React error
    expect(() => {
      const result = transformHtmlToReact(invalidHtml, { rules: defaultMarkdownRules });
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    }).not.toThrow();
  });

  it('should preserve valid nesting', () => {
    const validHtml = `
      <p>This is a valid paragraph with <strong>inline elements</strong>.</p>
      <div>This is a valid div with block content.</div>
    `;

    const result = transformHtmlToReact(validHtml, { rules: defaultMarkdownRules });
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle deeply nested invalid structures', () => {
    const deeplyNested = `
      <p>
        Outer paragraph
        <div>
          Block in paragraph
          <p>Paragraph in div in paragraph</p>
        </div>
      </p>
    `;

    expect(() => {
      const result = transformHtmlToReact(deeplyNested, { rules: defaultMarkdownRules });
      expect(result).toBeDefined();
    }).not.toThrow();
  });
});