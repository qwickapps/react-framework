/**
 * DataContext Tests
 * 
 * Tests the React Context integration for DataProvider including:
 * - Context provider functionality
 * - Custom hooks (useData, useResolveTemplate)
 * - Tagged template function (t) and t.wrap
 * - Error handling for missing provider
 * - Loading states
 */

import { JsonDataProvider } from '@qwickapps/schema';
import { render, screen, waitFor } from '@testing-library/react';
import {
  DataProvider,
  t,
  useData,
  useDataProvider,
  useResolveTemplate,
  useTemplate
} from '../../contexts/DataContext';

// Test components for hook testing
const TestUseData = ({ fieldGroupId }) => {
  const { data, loading, error } = useData(fieldGroupId);

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error.message}</div>;

  return (
    <div data-testid="content">
      {data.map((item, index) => (
        <div key={index} data-testid={`item-${index}`}>
          {item.title || item.name || 'Untitled'}
        </div>
      ))}
    </div>
  );
};

const TestUseResolveTemplate = ({ template }) => {
  const { resolved, loading, error } = useResolveTemplate(template);

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error.message}</div>;

  return <div data-testid="resolved">{resolved}</div>;
};

const TestUseDataProvider = () => {
  const provider = useDataProvider();
  return <div data-testid="provider-type">{provider.constructor.name}</div>;
};

const TestErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    return <div data-testid="context-error">{error.message}</div>;
  }
};

describe.skip('DataContext', () => {
  let mockDataSource;

  beforeEach(() => {
    mockDataSource = {
      dataProvider: new JsonDataProvider({
        data: {
          company: [
            { name: 'QwickApps', founded: 2025, industry: 'Software' }
          ],
          features: [
            { title: 'Fast', description: 'Lightning speed' },
            { title: 'Secure', description: 'Bank-level security' }
          ],
          empty: []
        }
      }),
      cacheProvider: false, // Disable caching for tests
      enableLogging: false
    };
  });

  describe('DataProvider Component', () => {
    it('should provide data context to children', async () => {
      render(
        <DataProvider dataSource={mockDataSource}>
          <TestUseData fieldGroupId="company" />
        </DataProvider>
      );

      // Initially loading
      expect(screen.getByTestId('loading')).toBeInTheDocument();

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument();
      });

      expect(screen.getByTestId('item-0')).toHaveTextContent('QwickApps');
    });

    it('should throw error when useDataContext used outside provider', () => {
      // Mock console.error to avoid noise in test output
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<TestUseData fieldGroupId="company" />);
      }).toThrow('useDataContext must be used within a DataProvider');

      console.error = originalError;
    });
  });

  describe('useData Hook', () => {
    const renderWithProvider = (component) => {
      return render(
        <DataProvider dataSource={mockDataSource}>
          {component}
        </DataProvider>
      );
    };

    it('should fetch and return data', async () => {
      renderWithProvider(<TestUseData fieldGroupId="features" />);

      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument();
      });

      expect(screen.getByTestId('item-0')).toHaveTextContent('Fast');
      expect(screen.getByTestId('item-1')).toHaveTextContent('Secure');
    });

    it('should handle empty field group', async () => {
      renderWithProvider(<TestUseData fieldGroupId="empty" />);

      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument();
      });

      // Should render container but no items
      expect(screen.queryByTestId('item-0')).not.toBeInTheDocument();
    });

    it('should handle non-existent field group', async () => {
      renderWithProvider(<TestUseData fieldGroupId="nonexistent" />);

      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('item-0')).not.toBeInTheDocument();
    });

    it('should show loading state initially', () => {
      renderWithProvider(<TestUseData fieldGroupId="company" />);
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('should handle provider errors', async () => {
      const errorDataProvider = {
        getData: jest.fn().mockRejectedValue(new Error('Provider error')),
        clearCache: jest.fn()
      };

      const errorDataSource = {
        dataProvider: errorDataProvider,
        cacheProvider: false,
        enableLogging: false
      };

      render(
        <DataProvider dataSource={errorDataSource}>
          <TestUseData fieldGroupId="company" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('Provider error');
    });
  });

  describe('useResolveTemplate Hook', () => {
    const renderWithProvider = (component) => {
      return render(
        <DataProvider dataSource={mockDataSource}>
          {component}
        </DataProvider>
      );
    };

    it('should resolve simple templates', async () => {
      renderWithProvider(<TestUseResolveTemplate template="Welcome to {{company.name}}!" />);

      await waitFor(() => {
        expect(screen.getByTestId('resolved')).toBeInTheDocument();
      });

      expect(screen.getByTestId('resolved')).toHaveTextContent('Welcome to QwickApps!');
    });

    it('should handle templates without mustache syntax', async () => {
      renderWithProvider(<TestUseResolveTemplate template="Plain text" />);

      // Should resolve immediately without loading
      expect(screen.getByTestId('resolved')).toHaveTextContent('Plain text');
    });

    it('should show loading state for complex templates', () => {
      renderWithProvider(<TestUseResolveTemplate template="{{company.name}} - {{company.industry}}" />);

      // May show loading briefly
      const loading = screen.queryByTestId('loading');
      const resolved = screen.queryByTestId('resolved');

      expect(loading || resolved).toBeInTheDocument();
    });

    it('should handle template resolution errors', async () => {
      const errorTemplateResolver = {
        resolve: jest.fn().mockImplementation(() => {
          throw new Error('Template error');
        })
      };

      const errorDataSource = {
        dataProvider: new JsonDataProvider({ data: {} }),
        templateResolver: errorTemplateResolver,
        cacheProvider: false,
        enableLogging: false
      };

      render(
        <DataProvider dataSource={errorDataSource}>
          <TestUseResolveTemplate template="{{company.name}}" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('Template error');
    });
  });

  describe('useDataProvider Hook', () => {
    it('should return the provider instance', () => {
      render(
        <DataProvider dataSource={mockDataSource}>
          <TestUseDataProvider />
        </DataProvider>
      );

      expect(screen.getByTestId('provider-type')).toHaveTextContent('TemplateResolver');
    });

    it('should throw error when used outside provider', () => {
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<TestUseDataProvider />);
      }).toThrow('useDataContext must be used within a DataProvider');

      console.error = originalError;
    });
  });

  describe('Tagged Template Function (t)', () => {
    const TestTaggedTemplate = ({ template, fallback }) => {
      return (
        <div data-testid="template-result">
          {template || fallback || 'No content'}
        </div>
      );
    };

    const renderWithProvider = (component) => {
      return render(
        <DataProvider dataSource={mockDataSource}>
          {component}
        </DataProvider>
      );
    };

    it('should resolve and render templates', async () => {
      const TestComponent = () => (
        <div data-testid="template-result">
          {t`Founded in {{company.founded}}`}
        </div>
      );

      renderWithProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByText('Founded in 2025')).toBeInTheDocument();
      });
    });

    it('should support fallback with || operator', async () => {
      const TestComponent = () => {
        const resolved = useTemplate('{{nonexistent.property}}');
        return (
          <div data-testid="template-result">
            {resolved || 'Default fallback'}
          </div>
        );
      };

      renderWithProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByText('Default fallback')).toBeInTheDocument();
      });
    });

    it('should show error details in development', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const errorTemplateResolver = {
        resolve: jest.fn().mockImplementation(() => {
          throw new Error('Template error');
        })
      };

      const errorDataSource = {
        dataProvider: new JsonDataProvider({ data: {} }),
        templateResolver: errorTemplateResolver,
        cacheProvider: false,
        enableLogging: false
      };

      const TestComponent = () => (
        <div data-testid="template-result">
          {t`{{error.template}}`}
        </div>
      );

      render(
        <DataProvider dataSource={errorDataSource}>
          <TestComponent />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('[Template Error: Template error]')).toBeInTheDocument();
      });

      process.env.NODE_ENV = originalEnv;
    });

    it('should return null on error in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const errorTemplateResolver = {
        resolve: jest.fn().mockImplementation(() => {
          throw new Error('Template error');
        })
      };

      const errorDataSource = {
        dataProvider: new JsonDataProvider({ data: {} }),
        templateResolver: errorTemplateResolver,
        cacheProvider: false,
        enableLogging: false
      };

      const TestComponent = () => {
        const resolved = useTemplate('{{error.template}}');
        return (
          <div data-testid="template-result">
            {resolved || 'Error fallback'}
          </div>
        );
      };

      render(
        <DataProvider dataSource={errorDataSource}>
          <TestComponent />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Error fallback')).toBeInTheDocument();
      });

      process.env.NODE_ENV = originalEnv;
    });

    it('should support custom wrapper with t.wrap', async () => {
      const TestComponent = () => (
        <div data-testid="template-result">
          {t.wrap(({ children }) => <strong data-testid="wrapper">{children}</strong>)`{{company.name}}`}
        </div>
      );

      renderWithProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('wrapper')).toHaveTextContent('QwickApps');
      });
    });

    it('should handle plain text without templates', async () => {
      const TestComponent = () => (
        <div data-testid="template-result">
          {t`Plain text content`}
        </div>
      );

      renderWithProvider(<TestComponent />);

      expect(screen.getByText('Plain text content')).toBeInTheDocument();
    });

    it('should throw error when used outside provider', () => {
      const originalError = console.error;
      console.error = jest.fn();

      const TestComponent = () => (
        <div data-testid="template-result">
          {t`{{company.name}}`}
        </div>
      );

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useDataContext must be used within a DataProvider');

      console.error = originalError;
    });
  });

  describe('Integration Tests', () => {
    it('should work with multiple hooks in same component', async () => {
      const CombinedTest = () => {
        const { data: companies } = useData('company');
        const { resolved } = useResolveTemplate('{{company.name}} offers {{features.0.title}} solutions');

        return (
          <div>
            <div data-testid="companies">{companies.length} companies</div>
            <div data-testid="resolved-template">{resolved}</div>
          </div>
        );
      };

      render(
        <DataProvider dataSource={mockDataSource}>
          <CombinedTest />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('companies')).toHaveTextContent('1 companies');
        expect(screen.getByTestId('first-feature')).toHaveTextContent('Fast');
        // Template resolution might still be in progress
        expect(screen.getByTestId('resolved-template')).toBeInTheDocument();
      });
    });

    it('should handle provider changes', async () => {
      const newDataSource = {
        dataProvider: new JsonDataProvider({
          data: {
            company: [{ name: 'New Company' }]
          }
        }),
        cacheProvider: false,
        enableLogging: false
      };

      const { rerender } = render(
        <DataProvider dataSource={mockDataSource}>
          <TestUseDataItem fieldGroupId="company" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('item')).toHaveTextContent('QwickApps');
      });

      // Change provider
      rerender(
        <DataProvider dataSource={newDataSource}>
          <TestUseDataItem fieldGroupId="company" />
        </DataProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('item')).toHaveTextContent('New Company');
      });
    });
  });
});