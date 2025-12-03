/**
 * Unit tests for PageBannerHeader component
 * 
 * Tests both traditional props usage and data binding functionality
 * with the new schema system.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageBannerHeader from '../../blocks/PageBannerHeader';
import { JsonDataProvider } from '@qwickapps/schema';
import { ThemeProvider, PaletteProvider } from '../../../contexts';
import QwickApp from '../../QwickApp';

// Test data for data binding - using nested structure
const sampleCmsData = {
  'pageBannerHeaders': {
    'aboutBanner': {
      coverImage: '/images/about-banner.jpg',
      coverImageAlt: 'About us banner',
      profileImage: '/images/company-logo.jpg',
      profileImageAlt: 'Company logo',
      profileImageSize: 'large',
      overline: 'About Us',
      title: 'QwickApps React Framework',
      subtitle: 'Building the future of web development',
      metadata: [
        { label: 'Developers', value: '50+' },
        { label: 'Projects', value: '1000+' }
      ],
      tags: ['React', 'TypeScript', 'Material-UI', 'Open Source'],
      maxVisibleActions: 2,
      height: 300,
      profilePosition: 'bottom-left'
    },
    'teamHero': {
      coverImage: '/images/team-banner.jpg',
      title: 'Meet Our Team',
      subtitle: 'Passionate developers creating amazing software',
      profilePosition: 'overlay-center',
      height: 250
    },
    'minimalHeader': {
      title: 'Simple Header',
      subtitle: 'Clean and minimal design',
      profilePosition: 'bottom-center'
    },
    'emptyData': {},
    'loadingTest': {
      title: 'Loading Test',
      subtitle: 'Testing loading state behavior'
    },
    'errorTest': {
      title: 'Error Test',
      subtitle: 'Testing error state behavior'
    }
  }
};

// Mock HeaderAction type
const mockActions = [
  { 
    id: 'primary', 
    label: 'Primary Action', 
    priority: 1,
    onClick: jest.fn(),
    disabled: false,
    destructive: false
  },
  { 
    id: 'secondary', 
    label: 'Secondary Action', 
    priority: 2,
    onClick: jest.fn(),
    disabled: false,
    destructive: false
  }
];

// Wrapper component for tests that need providers
const TestWrapper: React.FC<{ children: React.ReactNode; dataProvider?: unknown }> = ({ 
  children, 
  dataProvider 
}) => (
  <ThemeProvider>
    <PaletteProvider>
      {dataProvider ? (
        <QwickApp appId="test-pagebanner" appName="PageBannerHeader Test" dataSource={{ dataProvider }}>
          {children}
        </QwickApp>
      ) : (
        children
      )}
    </PaletteProvider>
  </ThemeProvider>
);

describe('PageBannerHeader', () => {
  describe('Traditional Props Usage', () => {
    it('renders basic header with title only', () => {
      render(
        <TestWrapper>
          <PageBannerHeader title="Basic Header" />
        </TestWrapper>
      );

      expect(screen.getByText('Basic Header')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders full header with all props', () => {
      render(
        <TestWrapper>
          <PageBannerHeader 
            coverImage="/test-cover.jpg"
            coverImageAlt="Test cover"
            profileImage="/test-profile.jpg"
            profileImageAlt="Test profile"
            overline="Test Overline"
            title="Full Header"
            subtitle="Complete header with all features"
            metadata={[
              { label: 'followers', value: '1.2k' },
              { label: 'posts', value: 42 }
            ]}
            tags={['React', 'TypeScript']}
            actions={mockActions}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Overline')).toBeInTheDocument();
      expect(screen.getByText('Full Header')).toBeInTheDocument();
      expect(screen.getByText('Complete header with all features')).toBeInTheDocument();
      expect(screen.getByText('1.2k')).toBeInTheDocument();
      expect(screen.getByText('followers')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('posts')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Primary Action')).toBeInTheDocument();
      expect(screen.getByText('Secondary Action')).toBeInTheDocument();
    });

    it('renders with different profile image sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      
      sizes.forEach(size => {
        const { unmount } = render(
          <TestWrapper>
            <PageBannerHeader 
              title={`${size} profile`}
              profileImage="/test-profile.jpg"
              profileImageSize={size}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${size} profile`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('renders with different profile positions', () => {
      const positions = ['bottom-left', 'bottom-center', 'overlay-center'] as const;
      
      positions.forEach(position => {
        const { unmount } = render(
          <TestWrapper>
            <PageBannerHeader 
              title={`${position} position`}
              profileImage="/test-profile.jpg"
              profilePosition={position}
            />
          </TestWrapper>
        );

        expect(screen.getByText(`${position} position`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('handles action button clicks', () => {
      const handleClick = jest.fn();
      const actionWithClick = [{ 
        id: 'test', 
        label: 'Click Me', 
        priority: 1,
        onClick: handleClick,
        disabled: false,
        destructive: false
      }];

      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Action Test"
            actions={actionWithClick}
          />
        </TestWrapper>
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles overflow actions with menu', () => {
      const manyActions = Array.from({ length: 5 }, (_, i) => ({
        id: `action-${i}`,
        label: `Action ${i + 1}`,
        priority: i + 1,
        onClick: jest.fn(),
        disabled: false,
        destructive: false
      }));

      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Overflow Test"
            actions={manyActions}
            maxVisibleActions={2}
          />
        </TestWrapper>
      );

      // First 2 actions should be visible
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
      
      // Overflow menu button should be present
      const menuButton = screen.getByLabelText('More actions');
      expect(menuButton).toBeInTheDocument();
      
      // Click to open menu
      fireEvent.click(menuButton);
      
      // Remaining actions should be in the menu
      expect(screen.getByText('Action 3')).toBeInTheDocument();
      expect(screen.getByText('Action 4')).toBeInTheDocument();
      expect(screen.getByText('Action 5')).toBeInTheDocument();
    });

    it('renders with custom height', () => {
      render(
        <TestWrapper>
          <PageBannerHeader
            title="Custom Height"
            coverImage="/test-cover.jpg"
            height={400}
          />
        </TestWrapper>
      );

      // Check that the component renders without errors
      expect(screen.getByText('Custom Height')).toBeInTheDocument();
    });

    it('supports grid props', () => {
      const { container } = render(
        <TestWrapper>
          <PageBannerHeader 
            title="Grid Test"
            span={6}
            xs={12}
            md={8}
          />
        </TestWrapper>
      );

      const element = container.querySelector('[data-grid-span]');
      expect(element).toHaveAttribute('data-grid-span', '6');
      expect(element).toBeInTheDocument();
    });

    it('handles profile image as React node', () => {
      const CustomProfile = () => <div>Custom Profile</div>;
      
      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Custom Profile Test"
            profileImage={<CustomProfile />}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Profile Test')).toBeInTheDocument();
      expect(screen.getByText('Custom Profile')).toBeInTheDocument();
    });

    it('handles destructive actions', () => {
      const destructiveAction = [{
        id: 'delete',
        label: 'Delete',
        priority: 1,
        onClick: jest.fn(),
        disabled: false,
        destructive: true
      }];

      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Destructive Action Test"
            actions={destructiveAction}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('handles disabled actions', () => {
      const disabledAction = [{
        id: 'disabled',
        label: 'Disabled',
        priority: 1,
        onClick: jest.fn(),
        disabled: true,
        destructive: false
      }];

      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Disabled Action Test"
            actions={disabledAction}
          />
        </TestWrapper>
      );

      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
    });

    it('renders without cover image', () => {
      render(
        <TestWrapper>
          <PageBannerHeader 
            title="No Cover Image"
            subtitle="Just title and subtitle"
          />
        </TestWrapper>
      );

      expect(screen.getByText('No Cover Image')).toBeInTheDocument();
      expect(screen.getByText('Just title and subtitle')).toBeInTheDocument();
    });

    it('renders with tags as React nodes', () => {
      const customTags = [
        'String Tag',
        <span key="custom">Custom Tag</span>
      ];

      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Custom Tags Test"
            tags={customTags}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Tags Test')).toBeInTheDocument();
      expect(screen.getByText('String Tag')).toBeInTheDocument();
      expect(screen.getByText('Custom Tag')).toBeInTheDocument();
    });
  });

  describe('Data Binding Usage', () => {
    let dataProvider: JsonDataProvider;

    beforeEach(() => {
      dataProvider = new JsonDataProvider({ data: sampleCmsData });
    });

    it('renders with dataSource prop (about banner)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader dataSource="pageBannerHeaders.aboutBanner" />
        </TestWrapper>
      );

      await screen.findByText('QwickApps React Framework');
      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Building the future of web development')).toBeInTheDocument();
      expect(screen.getByText('50+')).toBeInTheDocument();
      expect(screen.getByText('Developers')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('renders with dataSource prop (team hero)', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader dataSource="pageBannerHeaders.teamHero" />
        </TestWrapper>
      );

      await screen.findByText('Meet Our Team');
      expect(screen.getByText('Passionate developers creating amazing software')).toBeInTheDocument();
    });

    it('shows loading state while data is loading', () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader dataSource="pageBannerHeaders.nonexistent" />
        </TestWrapper>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading page banner content...')).toBeInTheDocument();
    });

    it('shows loading state when dataSource does not exist', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader 
            dataSource="pageBannerHeaders.nonexistent"
            title="Fallback Title"
            subtitle="Fallback subtitle"
          />
        </TestWrapper>
      );

      // When dataSource doesn't exist, component shows loading state
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading page banner content...')).toBeInTheDocument();
    });

    it('handles minimal header from data', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader dataSource="pageBannerHeaders.minimalHeader" />
        </TestWrapper>
      );

      await screen.findByText('Simple Header');
      expect(screen.getByText('Clean and minimal design')).toBeInTheDocument();
    });

    it('works with custom binding options', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader 
            dataSource="pageBannerHeaders.aboutBanner"
            bindingOptions={{ cache: false, strict: true }}
          />
        </TestWrapper>
      );

      await screen.findByText('QwickApps React Framework');
    });

    it('handles empty data from CMS', async () => {
      render(
        <TestWrapper dataProvider={dataProvider}>
          <PageBannerHeader 
            dataSource="pageBannerHeaders.emptyData"
            title="Fallback for Empty Data"
          />
        </TestWrapper>
      );

      await screen.findByText('Fallback for Empty Data');
    });

    it('shows error state in development mode', () => {
      // Mock console.error to avoid test noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Mock process.env.NODE_ENV
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      // Create an empty data provider which should cause loading/error state
      const emptyDataProvider = new JsonDataProvider({ data: {} });
      
      render(
        <TestWrapper dataProvider={emptyDataProvider}>
          <PageBannerHeader dataSource="pageBannerHeaders.nonexistentData" />
        </TestWrapper>
      );

      // Should show loading initially, then fallback to null or show fallback content
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      // Restore environment
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });

    it('returns loading state when no data provider available', () => {
      // Mock console.error to avoid test noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Mock process.env.NODE_ENV
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const emptyDataProvider = new JsonDataProvider({ data: {} });

      render(
        <TestWrapper dataProvider={emptyDataProvider}>
          <PageBannerHeader dataSource="pageBannerHeaders.nonexistentData" />
        </TestWrapper>
      );

      // Should show loading state when data is not available
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      // Restore environment
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty metadata array', () => {
      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Empty Metadata"
            metadata={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty Metadata')).toBeInTheDocument();
    });

    it('handles empty tags array', () => {
      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Empty Tags"
            tags={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty Tags')).toBeInTheDocument();
    });

    it('handles empty actions array', () => {
      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Empty Actions"
            actions={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Empty Actions')).toBeInTheDocument();
    });

    it('handles long title text', () => {
      const longTitle = 'Very '.repeat(20) + 'Long Title That Should Handle Wrapping Properly';

      render(
        <TestWrapper>
          <PageBannerHeader title={longTitle} />
        </TestWrapper>
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      render(
        <TestWrapper>
          <PageBannerHeader 
            title="Special: &lt;&gt;&amp;&quot;&apos;"
            subtitle="Content with special chars: &amp; &lt; &gt;"
          />
        </TestWrapper>
      );

      expect(screen.getByText(/Special:/, { exact: false })).toBeInTheDocument();
      expect(screen.getByText(/Content with special chars:/, { exact: false })).toBeInTheDocument();
    });

    it('handles custom CSS classes and styles', () => {
      render(
        <TestWrapper>
          <PageBannerHeader
            title="Custom Styled"
            className="custom-header"
            sx={{ border: '1px solid red' }}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Custom Styled')).toBeInTheDocument();
    });

    it('renders without optional props', () => {
      render(
        <TestWrapper>
          <PageBannerHeader title="Minimal Props" />
        </TestWrapper>
      );

      expect(screen.getByText('Minimal Props')).toBeInTheDocument();
    });
  });
});