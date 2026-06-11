/**
 * Unit tests for MobileTabBar component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MobileTabBar,
  MobileTabItem,
} from '../../../components/layout/MobileTabBar';

const HomeIcon = ({ size, color }: { size: number; color: string; filled: boolean }) => (
  <svg
    data-testid="home-icon"
    width={size}
    height={size}
    fill={color}
  />
);

const SearchIcon = ({ size, color }: { size: number; color: string; filled: boolean }) => (
  <svg
    data-testid="search-icon"
    width={size}
    height={size}
    fill={color}
  />
);

const tabItems: MobileTabItem[] = [
  { id: 'home', label: 'Home', icon: (p) => <HomeIcon {...p} /> },
  { id: 'search', label: 'Search', icon: (p) => <SearchIcon {...p} />, badge: 5 },
];

describe('MobileTabBar', () => {
  describe('Basic render', () => {
    it('renders all tab item labels', () => {
      render(<MobileTabBar items={tabItems} activeId="home" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('renders icons for each tab', () => {
      render(<MobileTabBar items={tabItems} activeId="home" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('applies custom className to the nav element', () => {
      const { container } = render(
        <MobileTabBar items={tabItems} activeId="home" className="my-tab-bar" />
      );
      expect(container.querySelector('.my-tab-bar')).toBeInTheDocument();
    });
  });

  describe('Active state', () => {
    it('marks the active tab button with aria-current=page', () => {
      render(<MobileTabBar items={tabItems} activeId="home" />);
      const homeBtn = screen.getByRole('button', { name: 'Home' });
      expect(homeBtn).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark inactive tabs with aria-current', () => {
      render(<MobileTabBar items={tabItems} activeId="home" />);
      const searchBtn = screen.getByRole('button', { name: 'Search' });
      expect(searchBtn).not.toHaveAttribute('aria-current');
    });
  });

  describe('Interaction', () => {
    it('calls onTabChange with the tab id when clicked', () => {
      const onTabChange = jest.fn();
      render(
        <MobileTabBar items={tabItems} activeId="home" onTabChange={onTabChange} />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Search' }));
      expect(onTabChange).toHaveBeenCalledWith('search');
    });
  });

  describe('Badge', () => {
    it('renders badge count for items with a badge prop', () => {
      render(<MobileTabBar items={tabItems} activeId="home" />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('does not render a badge for items without badge prop', () => {
      const itemsNoBadge: MobileTabItem[] = [
        { id: 'home', label: 'Home', icon: (p) => <HomeIcon {...p} /> },
      ];
      render(<MobileTabBar items={itemsNoBadge} activeId="home" />);
      // No numeric badge text should appear
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });
  });

  describe('Safe area bottom', () => {
    it('applies default safeAreaBottom padding', () => {
      const { container } = render(
        <MobileTabBar items={tabItems} activeId="home" />
      );
      const nav = container.querySelector('nav') as HTMLElement;
      expect(nav.style.paddingBottom).toBe('28px');
    });

    it('applies custom safeAreaBottom padding', () => {
      const { container } = render(
        <MobileTabBar items={tabItems} activeId="home" safeAreaBottom={40} />
      );
      const nav = container.querySelector('nav') as HTMLElement;
      expect(nav.style.paddingBottom).toBe('40px');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for default render', () => {
      const { container } = render(
        <MobileTabBar items={tabItems} activeId="home" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with search active and badge', () => {
      const { container } = render(
        <MobileTabBar items={tabItems} activeId="search" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
