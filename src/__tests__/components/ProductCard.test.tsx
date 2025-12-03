/**
 * Unit tests for ProductCard component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '../../blocks/ProductCard';
import type { Product } from '../../blocks/ProductCard';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../../contexts';

// Sample product data
const sampleProduct: Product = {
  id: 'test-product',
  name: 'Test Product',
  category: 'Testing',
  description: 'A comprehensive testing framework for modern applications',
  shortDescription: 'Modern testing framework',
  features: ['Easy setup', 'Fast execution', 'Comprehensive reporting'],
  technologies: ['React', 'TypeScript', 'Jest'],
  status: 'launched',
  image: 'https://example.com/test-product.jpg',
  url: 'https://example.com/product'
};

const sampleProductBeta: Product = {
  id: 'beta-product',
  name: 'Beta Product',
  category: 'Development',
  description: 'Beta version of our next-generation platform',
  features: ['Cutting edge features', 'Early access', 'Community feedback'],
  technologies: ['Next.js', 'GraphQL'],
  status: 'beta'
};

const sampleProductComingSoon: Product = {
  id: 'coming-soon-product',
  name: 'Future Product',
  category: 'Innovation',
  description: 'Revolutionary new product coming soon',
  features: ['AI-powered', 'Cloud-native', 'Scalable'],
  technologies: ['AI/ML', 'Kubernetes'],
  status: 'coming-soon'
};

// Test data for data binding
const sampleCmsData = {
  'products.main-product': [{
    product: sampleProduct,
    variant: 'detailed',
    showImage: true,
    showTechnologies: true
  }],
  'products.compact-list': [{
    product: sampleProductBeta,
    variant: 'compact',
    showImage: false,
    maxFeaturesCompact: 2
  }],
  'products.coming-soon': [{
    product: sampleProductComingSoon,
    variant: 'detailed'
  }]
};

// Mock window.open for Jest
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn()
});

// Wrapper component for tests that need providers
const TestWrapper: React.FC<{ children: React.ReactNode; dataProvider?: unknown }> = ({ 
  children, 
  dataProvider 
}) => (
  <ThemeProvider>
    <PaletteProvider>
      {dataProvider ? (
        <DataProvider dataSource={dataProvider}>
          {children}
        </DataProvider>
      ) : (
        children
      )}
    </PaletteProvider>
  </ThemeProvider>
);

describe.skip('ProductCard', () => {
  describe('Traditional Props Usage', () => {
    it('renders launched product correctly', () => {
      render(
        <TestWrapper>
          <ProductCard product={sampleProduct} />
        </TestWrapper>
      );

      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
      expect(screen.getByText('Modern testing framework')).toBeInTheDocument();
      expect(screen.getByText('launched')).toBeInTheDocument();
      expect(screen.getByText('Launch App')).toBeInTheDocument();
    });

    it('renders beta product with correct status', () => {
      render(
        <TestWrapper>
          <ProductCard product={sampleProductBeta} />
        </TestWrapper>
      );

      expect(screen.getByText('Beta Product')).toBeInTheDocument();
      expect(screen.getByText('beta')).toBeInTheDocument();
      expect(screen.getByText('Try Beta')).toBeInTheDocument();
    });

    it('renders coming soon product with disabled button', () => {
      render(
        <TestWrapper>
          <ProductCard product={sampleProductComingSoon} />
        </TestWrapper>
      );

      expect(screen.getByText('Future Product')).toBeInTheDocument();
      expect(screen.getByText('coming soon')).toBeInTheDocument();
      
      const comingSoonButton = screen.getByText('Coming Soon');
      expect(comingSoonButton).toBeDisabled();
    });

    it('renders detailed variant correctly', () => {
      render(
        <TestWrapper>
          <ProductCard product={sampleProduct} variant="detailed" />
        </TestWrapper>
      );

      // Should show full description in detailed mode
      expect(screen.getByText('A comprehensive testing framework for modern applications')).toBeInTheDocument();
      
      // Should show technologies in detailed mode
      expect(screen.getByText('Technologies:')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders compact variant correctly', () => {
      render(
        <TestWrapper>
          <ProductCard product={sampleProduct} variant="compact" maxFeaturesCompact={2} />
        </TestWrapper>
      );

      // Should show short description in compact mode
      expect(screen.getByText('Modern testing framework')).toBeInTheDocument();
      
      // Should limit features in compact mode
      expect(screen.getByText('Easy setup')).toBeInTheDocument();
      expect(screen.getByText('Fast execution')).toBeInTheDocument();
      expect(screen.getByText('+1 more features')).toBeInTheDocument();
      
      // Should not show technologies section in compact mode
      expect(screen.queryByText('Technologies:')).not.toBeInTheDocument();
    });

    it('handles click events correctly', () => {
      const mockClick = jest.fn();
      render(
        <TestWrapper>
          <ProductCard product={sampleProduct} onClick={mockClick} variant="compact" />
        </TestWrapper>
      );

      const card = screen.getByText('Test Product').closest('.product-card');
      if (card) {
        fireEvent.click(card);
        expect(mockClick).toHaveBeenCalled();
      }
    });

    it('renders without image when showImage is false', () => {
      render(
        <TestWrapper>
          <ProductCard product={sampleProduct} showImage={false} />
        </TestWrapper>
      );

      expect(screen.queryByAltText('Test Product')).not.toBeInTheDocument();
    });

    it('shows empty state when no product is provided', () => {
      render(
        <TestWrapper>
          <ProductCard />
        </TestWrapper>
      );

      expect(screen.getByText('No Product Available')).toBeInTheDocument();
      expect(screen.getByText('Empty')).toBeInTheDocument();
      expect(screen.getByText('No product data found in the specified data source')).toBeInTheDocument();
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (detailed variant)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard dataSource="products.main-product" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
      });

      expect(screen.getByText('Testing')).toBeInTheDocument();
      expect(screen.getByText('A comprehensive testing framework for modern applications')).toBeInTheDocument();
      expect(screen.getByText('Technologies:')).toBeInTheDocument();
    });

    it('renders with dataSource prop (compact variant)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard dataSource="products.compact-list" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Beta Product')).toBeInTheDocument();
      });

      expect(screen.getByText('Try Beta')).toBeInTheDocument();
      // Should limit features to 2 in compact mode
      expect(screen.getByText('Cutting edge features')).toBeInTheDocument();
      expect(screen.getByText('Early access')).toBeInTheDocument();
      expect(screen.getByText('+1 more features')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard dataSource="products.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Product...')).toBeInTheDocument();
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('includes data attributes when using dataSource', async () => {
      const { container } = render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard dataSource="products.main-product" />
        </TestWrapper>
      );

      await waitFor(() => {
        const card = container.querySelector('[data-component="ProductCard"]');
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute('data-data-source', 'products.main-product');
        expect(card).toHaveAttribute('data-variant', 'detailed');
      });
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard 
            dataSource="products.nonexistent-key" 
            product={sampleProduct}
            variant="compact"
          />
        </TestWrapper>
      );

      // Should eventually show the fallback product
      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('handles different product statuses from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard dataSource="products.coming-soon" />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Future Product')).toBeInTheDocument();
      });

      expect(screen.getByText('coming soon')).toBeInTheDocument();
      
      const comingSoonButton = screen.getByText('Coming Soon');
      expect(comingSoonButton).toBeDisabled();
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <ProductCard 
            dataSource="products.main-product" 
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles missing product image gracefully', () => {
      const productWithoutImage = { ...sampleProduct, image: undefined };
      
      render(
        <TestWrapper>
          <ProductCard product={productWithoutImage} />
        </TestWrapper>
      );

      expect(screen.queryByAltText('Test Product')).not.toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('handles empty features array', () => {
      const productWithNoFeatures = { ...sampleProduct, features: [] };
      
      render(
        <TestWrapper>
          <ProductCard product={productWithNoFeatures} />
        </TestWrapper>
      );

      expect(screen.getByText('Key Features:')).toBeInTheDocument();
      // Should not show any feature items
      expect(screen.queryByText('Easy setup')).not.toBeInTheDocument();
    });

    it('handles custom actions', () => {
      const customActions = [
        {
          id: 'custom',
          label: 'Custom Action',
          onClick: jest.fn()
        }
      ];

      render(
        <TestWrapper>
          <ProductCard product={sampleProduct} actions={customActions} />
        </TestWrapper>
      );

      const customButton = screen.getByText('Custom Action');
      expect(customButton).toBeInTheDocument();
      
      fireEvent.click(customButton);
      expect(customActions[0].onClick).toHaveBeenCalled();
    });
  });
});