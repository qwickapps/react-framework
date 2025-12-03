/**
 * Integration tests for HeroBlock with data binding functionality
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HeroBlock from '../../blocks/HeroBlock';
import { DataProvider } from '../../../contexts/DataContext';
import { JsonDataProvider } from '@qwickapps/schema';

describe.skip('HeroBlock Integration (Traditional + Data Binding)', () => {
  const testData = {
    'pages.home.hero': [
      {
        title: 'Build Apps 10x Faster',
        subtitle: 'The most developer-friendly React framework that turns complex UI development into a joy',
        backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        actions: [
          { label: 'Get Started Free', variant: 'primary', buttonSize: 'large' },
          { label: 'Watch Demo', variant: 'outlined', buttonSize: 'large', icon: '▶️' }
        ],
        textAlign: 'center',
        blockHeight: 'large',
        overlayOpacity: 0.6
      }
    ],
    'marketing.landing': [
      {
        title: '🚀 Launch Your Product Today',
        subtitle: 'Skip the boilerplate, focus on what matters most - your unique features',
        backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
        backgroundColor: 'primary',
        blockHeight: 'viewport',
        textAlign: 'left',
        overlayOpacity: 0.8
      }
    ],
    'company.about': [
      {
        title: 'About Our Mission',
        subtitle: 'Empowering developers worldwide to build amazing applications',
        backgroundColor: 'secondary',
        blockHeight: 'medium',
        textAlign: 'center'
      }
    ],
    'empty.hero': [{}]
  };

  const dataProvider = new JsonDataProvider({ data: testData });

  it('should work as traditional HeroBlock without dataSource', () => {
    const { container } = render(
      <HeroBlock 
        title="Traditional Hero Block" 
        subtitle="Without data binding support"
        backgroundColor="primary"
        textAlign="center"
        blockHeight="medium"
      />
    );

    expect(container.innerHTML).toContain('Traditional Hero Block');
    expect(container.innerHTML).toContain('Without data binding support');
  });

  it('should work with dataSource prop (data binding)', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="pages.home.hero" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Build Apps 10x Faster');
      expect(container.innerHTML).toContain('developer-friendly React framework');
      expect(container.innerHTML).toContain('Get Started Free');
      expect(container.innerHTML).toContain('Watch Demo');
    });
  });

  it('should use fallback props when dataSource has no content', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock 
          dataSource="empty.hero" 
          title="Fallback Hero Title"
          subtitle="Fallback subtitle for hero"
          backgroundColor="default"
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Fallback Hero Title');
      expect(container.innerHTML).toContain('Fallback subtitle for hero');
    });
  });

  it('should include data attributes when using dataSource', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="pages.home.hero" />
      </DataProvider>
    );

    await waitFor(() => {
      const heroElement = container.querySelector('[data-component="HeroBlock"]');
      expect(heroElement).toHaveAttribute('data-component', 'HeroBlock');
      expect(heroElement).toHaveAttribute('data-data-source', 'pages.home.hero');
    });
  });

  it('should work with base props like grid attributes', () => {
    const { container } = render(
      <HeroBlock 
        title="Grid Test Hero"
        span={12}
        xs={12}
        lg={10}
      />
    );

    const heroWrapper = container.querySelector('[data-grid-span]');
    expect(heroWrapper).toHaveAttribute('data-grid-span', '12');
    expect(heroWrapper).toHaveAttribute('data-grid-xs', '12');
    expect(heroWrapper).toHaveAttribute('data-grid-lg', '10');
  });

  it('should handle custom binding options', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock 
          dataSource="nonexistent.hero"
          bindingOptions={{
            fallback: {
              title: 'Custom fallback hero',
              subtitle: 'Custom fallback description',
              backgroundColor: 'surface'
            }
          }}
        />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Custom fallback hero');
      expect(container.innerHTML).toContain('Custom fallback description');
    });
  });

  it('should render actions from data binding', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="pages.home.hero" />
      </DataProvider>
    );

    await waitFor(() => {
      // Check that action buttons are rendered
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Get Started Free');
      expect(buttons[1]).toHaveTextContent('Watch Demo');
    });
  });

  it('should handle loading state', () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="slow.loading.hero" />
      </DataProvider>
    );

    // Should show loading content initially
    expect(container.innerHTML).toContain('Loading...');
  });

  it('should work with background images', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="marketing.landing" />
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('🚀 Launch Your Product Today');
      expect(container.innerHTML).toContain('Skip the boilerplate');
      
      // Check for background image styling
      const heroSection = container.querySelector('section');
      expect(heroSection).toHaveStyle({
        backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64)'
      });
    });
  });

  it('should work with different text alignments', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="marketing.landing" />
      </DataProvider>
    );

    await waitFor(() => {
      // Check for left text alignment
      const containerElement = container.querySelector('[style*="text-align"]');
      expect(containerElement).toHaveStyle({ textAlign: 'left' });
    });
  });

  it('should preserve children content with data binding', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="pages.home.hero">
          <div>Custom child content in hero</div>
        </HeroBlock>
      </DataProvider>
    );

    await waitFor(() => {
      expect(container.innerHTML).toContain('Build Apps 10x Faster');
      expect(container.innerHTML).toContain('Custom child content in hero');
    });
  });

  it('should work with different block heights', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="marketing.landing" />
      </DataProvider>
    );

    await waitFor(() => {
      const heroSection = container.querySelector('section');
      // Should have viewport height styling
      expect(heroSection).toHaveStyle({ minHeight: '100vh' });
    });
  });

  it('should handle background gradients', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="pages.home.hero" />
      </DataProvider>
    );

    await waitFor(() => {
      const heroSection = container.querySelector('section');
      expect(heroSection).toHaveStyle({
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      });
    });
  });

  it('should render overlay when background image is present', async () => {
    const { container } = render(
      <DataProvider dataSource={{ dataProvider }}>
        <HeroBlock dataSource="marketing.landing" />
      </DataProvider>
    );

    await waitFor(() => {
      // Check for overlay element
      const overlay = container.querySelector('[style*="position: absolute"]');
      expect(overlay).toBeTruthy();
      expect(overlay).toHaveStyle({ opacity: '0.8' }); // From test data
    });
  });
});