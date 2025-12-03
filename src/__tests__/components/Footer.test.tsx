/**
 * Unit tests for Footer component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../blocks/Footer';
import type { FooterSection, FooterItem } from '../../blocks/Footer';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../../contexts';

// Test data for data binding
const sampleCmsData = {
  'footer.main': [{
    sections: [
      {
        id: 'company',
        title: 'Company',
        items: [
          { id: 'about', label: 'About Us', href: '/about' },
          { id: 'careers', label: 'Careers', href: '/careers' },
          { id: 'contact', label: 'Contact', href: '/contact' }
        ]
      },
      {
        id: 'products',
        title: 'Products',
        items: [
          { id: 'framework', label: 'Framework', href: '/framework' },
          { id: 'builder', label: 'Builder', href: '/builder', external: true },
          { id: 'docs', label: 'Documentation', href: '/docs' }
        ]
      },
      {
        id: 'resources',
        title: 'Resources',
        items: [
          { id: 'blog', label: 'Blog', href: '/blog' },
          { id: 'guides', label: 'Guides', href: '/guides' },
          { id: 'support', label: 'Support', href: '/support' }
        ]
      }
    ],
    logo: '<strong>QwickApps</strong>',
    copyright: '© 2025 QwickApps. All rights reserved.',
    legalText: 'Privacy Policy | Terms of Service',
    orientation: 'vertical',
    variant: 'default',
    showDivider: true
  }],
  'footer.simple': [{
    sections: [
      {
        id: 'links',
        items: [
          { id: 'home', label: 'Home', href: '/' },
          { id: 'about', label: 'About', href: '/about' },
          { id: 'contact', label: 'Contact', href: '/contact' }
        ]
      }
    ],
    copyright: '© 2025 Simple Site.',
    orientation: 'horizontal',
    variant: 'contained',
    showDivider: false
  }],
  'footer.minimal': [{
    copyright: '© 2025 Minimal Footer',
    variant: 'outlined'
  }],
  'footer.empty': [{}]
};

// Sample footer sections for testing
const sampleSections: FooterSection[] = [
  {
    id: 'company',
    title: 'Company',
    items: [
      { id: 'about', label: 'About Us', href: '/about' },
      { id: 'careers', label: 'Careers', href: '/careers' },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ]
  },
  {
    id: 'products',
    title: 'Products',
    items: [
      { id: 'app', label: 'QwickApp', href: '/app' },
      { id: 'docs', label: 'Documentation', href: '/docs', external: true }
    ]
  }
];

const sampleItems: FooterItem[] = [
  { id: 'item1', label: 'Regular Item' },
  { id: 'item2', label: 'Link Item', href: '/link' },
  { id: 'item3', label: 'External Link', href: 'https://example.com', external: true },
  { id: 'item4', label: 'Click Item', onClick: jest.fn() }
];

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

describe.skip('Footer', () => {
  describe('Traditional Props Usage', () => {
    it('renders basic footer without content', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      );

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders footer with sections', () => {
      render(
        <TestWrapper>
          <Footer sections={sampleSections} />
        </TestWrapper>
      );

      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('QwickApp')).toBeInTheDocument();
    });

    it('renders footer with copyright and legal text', () => {
      render(
        <TestWrapper>
          <Footer 
            copyright="© 2025 Test Company"
            legalText="Privacy Policy | Terms"
          />
        </TestWrapper>
      );

      expect(screen.getByText('© 2025 Test Company')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy | Terms')).toBeInTheDocument();
    });

    it('renders footer with logo', () => {
      const TestLogo = () => <div>Test Logo</div>;
      
      render(
        <TestWrapper>
          <Footer logo={<TestLogo />} />
        </TestWrapper>
      );

      expect(screen.getByText('Test Logo')).toBeInTheDocument();
    });

    it('handles different orientations', () => {
      const orientations = ['vertical', 'horizontal'] as const;
      
      orientations.forEach(orientation => {
        const { unmount } = render(
          <TestWrapper>
            <Footer 
              sections={sampleSections}
              orientation={orientation}
            />
          </TestWrapper>
        );

        expect(screen.getByText('Company')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles different variants', () => {
      const variants = ['default', 'contained', 'outlined'] as const;
      
      variants.forEach(variant => {
        const { unmount } = render(
          <TestWrapper>
            <Footer 
              sections={sampleSections}
              variant={variant}
            />
          </TestWrapper>
        );

        expect(screen.getByText('Company')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles showDivider prop', () => {
      render(
        <TestWrapper>
          <Footer 
            sections={sampleSections}
            showDivider={false}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Company')).toBeInTheDocument();
    });

    it('handles footer items with links', () => {
      const sectionsWithLinks: FooterSection[] = [
        {
          id: 'test',
          title: 'Test Section',
          items: [
            { id: 'internal', label: 'Internal Link', href: '/internal' },
            { id: 'external', label: 'External Link', href: 'https://example.com', external: true }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer sections={sectionsWithLinks} />
        </TestWrapper>
      );

      const internalLink = screen.getByText('Internal Link').closest('a');
      const externalLink = screen.getByText('External Link').closest('a');

      expect(internalLink).toHaveAttribute('href', '/internal');
      expect(externalLink).toHaveAttribute('href', 'https://example.com');
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('handles footer items with click handlers', () => {
      const handleClick = jest.fn();
      const sectionsWithClicks: FooterSection[] = [
        {
          id: 'test',
          title: 'Test Section',
          items: [
            { id: 'clickable', label: 'Click Me', onClick: handleClick }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer sections={sectionsWithClicks} />
        </TestWrapper>
      );

      const clickableItem = screen.getByText('Click Me');
      fireEvent.click(clickableItem);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports grid props', () => {
      const { container } = render(
        <TestWrapper>
          <Footer 
            sections={sampleSections}
            span={12}
            xs={12}
            md={6}
          />
        </TestWrapper>
      );

      const element = container.querySelector('[data-grid-span]');
      expect(element).toHaveAttribute('data-grid-span', '12');
      expect(element).toBeInTheDocument();
    });

    it('renders section without title', () => {
      const sectionsWithoutTitle: FooterSection[] = [
        {
          id: 'no-title',
          items: [
            { id: 'item1', label: 'Item 1', href: '/item1' },
            { id: 'item2', label: 'Item 2', href: '/item2' }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer sections={sectionsWithoutTitle} />
        </TestWrapper>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders with custom CSS classes and styles', () => {
      render(
        <TestWrapper>
          <Footer
            sections={sampleSections}
            className="custom-footer"
            sx={{ backgroundColor: 'red' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Company')).toBeInTheDocument();
    });
  });

  describe.skip('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (main footer)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer dataSource="footer.main" />
        </TestWrapper>
      );

      await screen.findByText('Company');
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Framework')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('© 2025 QwickApps. All rights reserved.')).toBeInTheDocument();
    });

    it('renders with dataSource prop (simple footer)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer dataSource="footer.simple" />
        </TestWrapper>
      );

      await screen.findByText('Home');
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('© 2025 Simple Site.')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer dataSource="footer.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading Footer...')).toBeInTheDocument();
    });

    it('uses fallback props when dataSource has no content', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer 
            dataSource="nonexistent.footer"
            copyright="Fallback Copyright"
            sections={sampleSections}
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback Copyright');
      expect(screen.getByText('Company')).toBeInTheDocument();
    });

    it('handles minimal footer from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer dataSource="footer.minimal" />
        </TestWrapper>
      );

      await screen.findByText('© 2025 Minimal Footer');
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer 
            dataSource="footer.main"
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText('Company');
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <Footer 
            dataSource="footer.empty"
            copyright="Fallback for Empty Data"
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback for Empty Data');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty sections array', () => {
      render(
        <TestWrapper>
          <Footer 
            sections={[]}
            copyright="Empty sections footer"
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty sections footer')).toBeInTheDocument();
    });

    it('handles sections with empty items', () => {
      const emptySections: FooterSection[] = [
        {
          id: 'empty',
          title: 'Empty Section',
          items: []
        }
      ];

      render(
        <TestWrapper>
          <Footer sections={emptySections} />
        </TestWrapper>
      );

      expect(screen.getByText('Empty Section')).toBeInTheDocument();
    });

    it('handles very long section titles and item labels', () => {
      const longSections: FooterSection[] = [
        {
          id: 'long',
          title: 'Very '.repeat(20) + 'Long Section Title',
          items: [
            { 
              id: 'long-item', 
              label: 'Very '.repeat(15) + 'Long Item Label',
              href: '/long-item'
            }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer sections={longSections} />
        </TestWrapper>
      );

      expect(screen.getByText(/Very.*Long Section Title/)).toBeInTheDocument();
      expect(screen.getByText(/Very.*Long Item Label/)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      const specialSections: FooterSection[] = [
        {
          id: 'special',
          title: 'Special: &<>"\' Characters',
          items: [
            { 
              id: 'special-item', 
              label: 'Item with & < > " \' chars',
              href: '/special'
            }
          ]
        }
      ];

      render(
        <TestWrapper>
          <Footer 
            sections={specialSections}
            copyright="© 2025 Company & Associates"
          />
        </TestWrapper>
      );

      expect(screen.getByText(/Special:.*Characters/)).toBeInTheDocument();
      expect(screen.getByText(/Item with.*chars/)).toBeInTheDocument();
      expect(screen.getByText(/© 2025 Company & Associates/)).toBeInTheDocument();
    });

    it('handles footer without any props', () => {
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      );

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('handles mixed item types in single section', () => {
      const mixedSection: FooterSection[] = [
        {
          id: 'mixed',
          title: 'Mixed Items',
          items: sampleItems
        }
      ];

      render(
        <TestWrapper>
          <Footer sections={mixedSection} />
        </TestWrapper>
      );

      expect(screen.getByText('Regular Item')).toBeInTheDocument();
      expect(screen.getByText('Link Item')).toBeInTheDocument();
      expect(screen.getByText('External Link')).toBeInTheDocument();
      expect(screen.getByText('Click Item')).toBeInTheDocument();
    });
  });
});