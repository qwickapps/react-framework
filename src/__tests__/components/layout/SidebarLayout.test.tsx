/**
 * Unit tests for SidebarLayout component.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarLayout, SidebarNavItem } from '../../../components/layout/SidebarLayout';

const HomeIcon = () => <svg data-testid="home-icon" />;
const SettingsIcon = () => <svg data-testid="settings-icon" />;

const navItems: SidebarNavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, badge: 3 },
];

describe('SidebarLayout', () => {
  describe('Basic render', () => {
    it('renders children in the content area', () => {
      render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <p>Main content</p>
        </SidebarLayout>
      );
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('renders all nav item labels', () => {
      render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <span />
        </SidebarLayout>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('applies custom className to root', () => {
      const { container } = render(
        <SidebarLayout navItems={navItems} activeNav="home" className="my-layout">
          <span />
        </SidebarLayout>
      );
      expect(container.querySelector('.my-layout')).toBeInTheDocument();
    });
  });

  describe('Active nav item', () => {
    it('marks the active nav item with aria-current=page', () => {
      render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <span />
        </SidebarLayout>
      );
      const homeButton = screen.getByRole('button', { name: 'Home' });
      expect(homeButton).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark inactive items with aria-current', () => {
      render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <span />
        </SidebarLayout>
      );
      const settingsButton = screen.getByRole('button', { name: /Settings/ });
      expect(settingsButton).not.toHaveAttribute('aria-current');
    });
  });

  describe('Navigation callback', () => {
    it('calls onNavChange with the item id when a nav button is clicked', () => {
      const onNavChange = jest.fn();
      render(
        <SidebarLayout navItems={navItems} activeNav="home" onNavChange={onNavChange}>
          <span />
        </SidebarLayout>
      );
      fireEvent.click(screen.getByRole('button', { name: /Settings/ }));
      expect(onNavChange).toHaveBeenCalledWith('settings');
    });
  });

  describe('Badge', () => {
    it('renders badge value for nav items with badge prop', () => {
      render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <span />
        </SidebarLayout>
      );
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('Slots', () => {
    it('renders sidebarHeader slot', () => {
      render(
        <SidebarLayout
          navItems={navItems}
          activeNav="home"
          sidebarHeader={<div>MyLogo</div>}
        >
          <span />
        </SidebarLayout>
      );
      expect(screen.getByText('MyLogo')).toBeInTheDocument();
    });

    it('renders sidebarFooter slot', () => {
      render(
        <SidebarLayout
          navItems={navItems}
          activeNav="home"
          sidebarFooter={<div>User Profile</div>}
        >
          <span />
        </SidebarLayout>
      );
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    it('renders topBarLeft and topBarRight slots', () => {
      render(
        <SidebarLayout
          navItems={navItems}
          activeNav="home"
          topBarLeft={<div>Left</div>}
          topBarRight={<div>Right</div>}
        >
          <span />
        </SidebarLayout>
      );
      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
    });
  });

  describe('Sidebar width', () => {
    it('applies custom sidebarWidth', () => {
      const { container } = render(
        <SidebarLayout navItems={navItems} activeNav="home" sidebarWidth={300}>
          <span />
        </SidebarLayout>
      );
      const sidebar = container.querySelector('aside') as HTMLElement;
      expect(sidebar.style.width).toBe('300px');
    });

    it('defaults sidebarWidth to 240', () => {
      const { container } = render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <span />
        </SidebarLayout>
      );
      const sidebar = container.querySelector('aside') as HTMLElement;
      expect(sidebar.style.width).toBe('240px');
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot for default render', () => {
      const { container } = render(
        <SidebarLayout navItems={navItems} activeNav="home">
          <p>Content</p>
        </SidebarLayout>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
