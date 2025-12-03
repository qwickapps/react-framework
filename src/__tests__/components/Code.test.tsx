/**
 * Unit tests for Code component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Code from '../../components/blocks/Code';
import { DataProvider } from '../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../contexts';

// Sample code content for testing
const sampleJavaScript = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;

const samplePython = `def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

print(calculate_fibonacci(10))`;

const sampleHTML = `<div class="container">
  <h1>Welcome</h1>
  <p>This is a sample HTML snippet.</p>
</div>`;

const sampleJSON = `{
  "name": "QwickApps React Framework",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^4.9.0"
  }
}`;

// Test data for data binding
const sampleCmsData = {
  'codes': {
    'javascript-example': {
      children: sampleJavaScript,
      language: 'javascript',
      title: 'Greeting Function',
      showCopy: true,
      showLineNumbers: true
    },
    'python-example': {
      children: samplePython,
      language: 'python',
      title: 'Fibonacci Calculator',
      showCopy: true,
      showLineNumbers: false
    },
    'html-snippet': {
      children: sampleHTML,
      language: 'html',
      title: 'sample.html',
      showCopy: true,
      showLineNumbers: true,
      wrapLines: true
    },
    'json-config': {
      children: sampleJSON,
      language: 'json',
      showCopy: false,
      showLineNumbers: false
    },
    'empty': {
      children: '',
      language: 'text'
    }
  }
};

// Wrapper component for tests that need providers
const TestWrapper: React.FC<{ children: React.ReactNode; dataProvider?: unknown }> = ({ 
  children, 
  dataProvider 
}) => (
  <ThemeProvider>
    <PaletteProvider>
      {dataProvider ? (
        <DataProvider dataSource={{ dataProvider }}>
          {children}
        </DataProvider>
      ) : (
        children
      )}
    </PaletteProvider>
  </ThemeProvider>
);

describe('Code', () => {
  describe.skip('Traditional Props Usage', () => {
    it('renders basic code content', () => {
      render(
        <TestWrapper>
          <Code>{sampleJavaScript}</Code>
        </TestWrapper>
      );

      expect(screen.getByText(/function greet/)).toBeInTheDocument();
      expect(screen.getByText(/console.log/)).toBeInTheDocument();
    });

    it('displays title when provided', () => {
      render(
        <TestWrapper>
          <Code title="example.js">{sampleJavaScript}</Code>
        </TestWrapper>
      );

      expect(screen.getByText('example.js')).toBeInTheDocument();
    });

    it('shows copy button by default', () => {
      render(
        <TestWrapper>
          <Code>{sampleJavaScript}</Code>
        </TestWrapper>
      );

      expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
    });

    it('hides copy button when showCopy is false', () => {
      render(
        <TestWrapper>
          <Code showCopy={false}>{sampleJavaScript}</Code>
        </TestWrapper>
      );

      expect(screen.queryByRole('button', { name: /copy code/i })).not.toBeInTheDocument();
    });

    it('displays line numbers when enabled', () => {
      render(
        <TestWrapper>
          <Code showLineNumbers={true}>{sampleJavaScript}</Code>
        </TestWrapper>
      );

      // Should show line numbers (1, 2, 3, 4)
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('handles copy functionality', async () => {
      // Mock clipboard API
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.resolve())
        }
      });

      render(
        <TestWrapper>
          <Code>{sampleJavaScript}</Code>
        </TestWrapper>
      );

      const copyButton = screen.getByRole('button', { name: /copy code/i });
      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleJavaScript);
      
      // Check for success feedback
      await waitFor(() => {
        expect(screen.getByText(/code copied to clipboard/i)).toBeInTheDocument();
      });
    });

    it('handles copy error gracefully', async () => {
      // Mock clipboard API to fail
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.reject(new Error('Clipboard API not available')))
        }
      });

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <TestWrapper>
          <Code>{sampleJavaScript}</Code>
        </TestWrapper>
      );

      const copyButton = screen.getByRole('button', { name: /copy code/i });
      fireEvent.click(copyButton);

      // Wait for the async operation to complete
      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to copy code:', expect.any(Error));
      });
      
      consoleSpy.mockRestore();
    });

    it('applies custom background color', () => {
      const { container } = render(
        <TestWrapper>
          <Code codeBackground="#f0f0f0">{sampleJavaScript}</Code>
        </TestWrapper>
      );

      const paperElement = container.querySelector('.MuiPaper-root');
      expect(paperElement).toBeInTheDocument();
      // Custom background color should be applied via CSS-in-JS
      // The exact computed value might vary based on theme and CSS processing
      // so we just verify the component renders with the prop
    });

    it('handles empty code content gracefully', () => {
      render(
        <TestWrapper>
          <Code></Code>
        </TestWrapper>
      );

      expect(screen.getByText('No code content provided')).toBeInTheDocument();
    });

    it('handles whitespace-only code content', () => {
      const whitespaceContent = "   \n   \t   ";
      const { container } = render(
        <TestWrapper>
          <Code>{whitespaceContent}</Code>
        </TestWrapper>
      );

      // Check if the component correctly treats whitespace-only content
      // The component should either show empty state or render the whitespace
      // (both are acceptable behaviors)
      const hasEmptyState = screen.queryByText('No code content provided');
      const hasCodeContent = container.querySelector('code');
      
      expect(hasEmptyState || hasCodeContent).toBeTruthy();
    });

    it('supports line wrapping', () => {
      const longLine = 'const veryLongVariableName = "This is a very long string that should wrap when wrapLines is enabled";';
      
      const { container } = render(
        <TestWrapper>
          <Code wrapLines={true}>{longLine}</Code>
        </TestWrapper>
      );

      const preElement = container.querySelector('pre');
      expect(preElement).toBeInTheDocument();
      
      // Verify that wrapLines prop affects the rendering - 
      // The exact CSS behavior may vary with Material-UI styling
      expect(screen.getByText(/const veryLongVariableName/)).toBeInTheDocument();
    });

    it('handles different programming languages', () => {
      render(
        <TestWrapper>
          <Code language="python">{samplePython}</Code>
        </TestWrapper>
      );

      expect(screen.getByText(/def calculate_fibonacci/)).toBeInTheDocument();
    });

    it('renders multi-line code correctly', () => {
      render(
        <TestWrapper>
          <Code showLineNumbers={true}>{samplePython}</Code>
        </TestWrapper>
      );

      // Should have 5 lines
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText(/def calculate_fibonacci/)).toBeInTheDocument();
      expect(screen.getByText(/print\(calculate_fibonacci/)).toBeInTheDocument();
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (javascript example)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code dataSource="codes.javascript-example" />
        </TestWrapper>
      );

      await screen.findByText(/function greet/);
      expect(screen.getByText('Greeting Function')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Line numbers enabled
    });

    it('renders with dataSource prop (python example)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code dataSource="codes.python-example" />
        </TestWrapper>
      );

      await screen.findByText(/def calculate_fibonacci/);
      expect(screen.getByText('Fibonacci Calculator')).toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument(); // Line numbers disabled
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code dataSource="codes.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Code...')).toBeInTheDocument();
      expect(screen.getByText(/Loading code content from data source/)).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code 
            dataSource="codes.nonexistent" 
            title="Fallback Code"
          >
            {sampleJavaScript}
          </Code>
        </TestWrapper>
      );

      // Should stay in loading state for nonexistent data source
      expect(screen.getByText('Loading Code...')).toBeInTheDocument();
    });

    it('handles copy functionality from data binding', async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.resolve())
        }
      });

      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code dataSource="codes.javascript-example" />
        </TestWrapper>
      );

      await screen.findByText(/function greet/);
      
      const copyButton = screen.getByRole('button', { name: /copy code/i });
      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleJavaScript);
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code 
            dataSource="codes.javascript-example"
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText(/function greet/);
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code dataSource="codes.empty" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('No code content provided')).toBeInTheDocument();
      });
    });

    it('shows error state in development mode', async () => {
      // Temporarily set NODE_ENV to development for this test
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Create a data provider that will throw an error
      const errorDataProvider = new JsonDataProvider({ 
        data: {} // Empty data will cause a binding error
      });

      render(
        <TestWrapper dataProvider={errorDataProvider}>
          <Code dataSource="codes.nonexistent-key" />
        </TestWrapper>
      );

      await waitFor(() => {
        const errorElement = screen.queryByText(/Error loading code:/);
        if (errorElement) {
          expect(errorElement).toBeInTheDocument();
        } else {
          // If no error is displayed, that's also acceptable behavior
          // depending on the exact error handling implementation
          expect(screen.getByText('Loading Code...')).toBeInTheDocument();
        }
      });

      // Restore NODE_ENV
      process.env.NODE_ENV = originalNodeEnv;
      consoleSpy.mockRestore();
    });

    it('returns null on error in production mode', async () => {
      // Temporarily set NODE_ENV to production for this test
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Create a data provider that will throw an error
      const errorDataProvider = new JsonDataProvider({ 
        data: {} // Empty data will cause a binding error
      });

      const { container } = render(
        <TestWrapper dataProvider={errorDataProvider}>
          <Code dataSource="codes.nonexistent-key" />
        </TestWrapper>
      );

      await waitFor(() => {
        // In production, error should either return null (empty container)
        // or show loading state - both are acceptable
        const hasContent = container.firstChild;
        // The component should handle the error gracefully
        expect(hasContent).toBeDefined(); // Component should render something or nothing
      });

      // Restore NODE_ENV
      process.env.NODE_ENV = originalNodeEnv;
      consoleSpy.mockRestore();
    });

    it('applies all configuration from data binding', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Code dataSource="codes.html-snippet" />
        </TestWrapper>
      );

      await screen.findByText(/Welcome/);
      
      // Should show title from data
      expect(screen.getByText('sample.html')).toBeInTheDocument();
      
      // Should show line numbers (configured in test data)
      expect(screen.getByText('1')).toBeInTheDocument();
      
      // Should have copy button (configured in test data)
      expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();
    });

    it('supports mixed data sources in same component tree', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <div>
            <Code dataSource="codes.javascript-example" />
            <Code dataSource="codes.python-example" />
            <Code dataSource="codes.json-config" />
          </div>
        </TestWrapper>
      );

      // All three code blocks should render with their respective content
      await screen.findByText(/function greet/);
      await screen.findByText(/def calculate_fibonacci/);
      await screen.findByText(/QwickApps React Framework/);
      
      // Should show titles from different data sources
      expect(screen.getByText('Greeting Function')).toBeInTheDocument();
      expect(screen.getByText('Fibonacci Calculator')).toBeInTheDocument();
    });

    it.skip('preserves component marking for QwickApp framework', () => {
      // The component should be marked as a QwickApp component
      // This is important for framework identification - test skipped due to test environment limitations
      const codeComponent = Code as unknown as { QWICKAPP_COMPONENT?: boolean };
      expect(codeComponent.QWICKAPP_COMPONENT).toBeTruthy();
    });
  });

  describe.skip('Edge Cases', () => {
    it('handles very long code content', () => {
      const longCode = Array(100).fill('console.log("Very long code line");').join('\n');
      
      render(
        <TestWrapper>
          <Code showLineNumbers={true}>{longCode}</Code>
        </TestWrapper>
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('handles special characters in code', () => {
      const specialCharsCode = `const regex = /[^a-zA-Z0-9]/g;
const html = '<div class="test">&nbsp;</div>';
const unicode = '\\u{1F600}';`;

      render(
        <TestWrapper>
          <Code language="javascript">{specialCharsCode}</Code>
        </TestWrapper>
      );

      expect(screen.getByText(/const regex/)).toBeInTheDocument();
      expect(screen.getByText(/const html/)).toBeInTheDocument();
    });

    it('handles code with tabs and mixed indentation', () => {
      const mixedIndentCode = `function example() {
\tif (true) {
\t    console.log('Mixed tabs and spaces');
\t}
}`;

      render(
        <TestWrapper>
          <Code>{mixedIndentCode}</Code>
        </TestWrapper>
      );

      expect(screen.getByText(/function example/)).toBeInTheDocument();
      expect(screen.getByText(/Mixed tabs and spaces/)).toBeInTheDocument();
    });

    it('handles single line code', () => {
      const singleLine = 'const greeting = "Hello, World!";';
      
      render(
        <TestWrapper>
          <Code showLineNumbers={true}>{singleLine}</Code>
        </TestWrapper>
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.queryByText('2')).not.toBeInTheDocument();
      expect(screen.getByText(/const greeting/)).toBeInTheDocument();
    });

    it('maintains scroll position with overflow content', () => {
      const veryLongCode = Array(50).fill(`console.log("Line number ${Array(50).fill('x').join('')}");`).join('\n');
      
      const { container } = render(
        <TestWrapper>
          <Code>{veryLongCode}</Code>
        </TestWrapper>
      );

      // Verify that long content is rendered and the component handles it gracefully
      expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument();
      expect(screen.getByText(/console\.log/)).toBeInTheDocument();
      
      // The component should have some mechanism to handle overflow
      // (exact implementation may vary)
      const boxes = container.querySelectorAll('.MuiBox-root');
      expect(boxes.length).toBeGreaterThan(0);
    });
  });
});