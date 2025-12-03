/**
 * Logo Component Tests
 * Tests for the dynamic Logo component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Logo from '../../../components/Logo';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { PaletteProvider } from '../../../contexts/PaletteContext';

// Wrapper component for providers
const TestWrapper = ({ children }) => (
  <ThemeProvider>
    <PaletteProvider>
      {children}
    </PaletteProvider>
  </ThemeProvider>
);

const renderWithProviders = (component) => {
  return render(component, { wrapper: TestWrapper });
};

describe('Logo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    renderWithProviders(<Logo />);
    
    const logoElement = screen.getByRole('img', { name: /qwick apps logo/i });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveTextContent('QwickApps');
  });

  test('renders with custom name - single word', () => {
    renderWithProviders(<Logo name="Brand" />);
    
    const logoElement = screen.getByRole('img', { name: /brand logo/i });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveTextContent('Brand');
    // Should not have second part
    const secondPart = logoElement.querySelector('.logo-second-part');
    expect(secondPart).toBeNull();
  });

  test('renders with custom name - two words', () => {
    renderWithProviders(<Logo name="Qwick Apps" />);
    
    const logoElement = screen.getByRole('img', { name: /qwick apps logo/i });
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveTextContent('QwickApps');
  });

  test('renders with custom name - multiple words', () => {
    renderWithProviders(<Logo name="My Amazing Brand App" />);
    
    const logoElement = screen.getByRole('img', { name: /my amazing brand app logo/i });
    expect(logoElement).toBeInTheDocument();
    // First part should be "My Amazing Brand", second part should be "App"
    const firstPart = logoElement.querySelector('.logo-first-part');
    const secondPart = logoElement.querySelector('.logo-second-part');
    expect(firstPart).toHaveTextContent('My Amazing Brand');
    expect(secondPart).toHaveTextContent('App');
  });

  test('creates correct aria-label from name', () => {
    renderWithProviders(<Logo name="Custom App" />);
    
    const logoElement = screen.getByRole('img', { name: /custom app logo/i });
    expect(logoElement).toBeInTheDocument();
  });

  test('applies correct size classes', () => {
    const { rerender } = renderWithProviders(<Logo size="small" />);
    expect(screen.getByRole('img')).toHaveClass('logo-small');

    rerender(<Logo size="medium" />);
    expect(screen.getByRole('img')).toHaveClass('logo-medium');

    rerender(<Logo size="large" />);
    expect(screen.getByRole('img')).toHaveClass('logo-large');
  });

  test('applies correct variant classes', () => {
    const { rerender } = renderWithProviders(<Logo variant="default" />);
    expect(screen.getByRole('img')).toHaveClass('logo-default');

    rerender(<Logo variant="on-primary" />);
    expect(screen.getByRole('img')).toHaveClass('logo-on-primary');

    rerender(<Logo variant="high-contrast" />);
    expect(screen.getByRole('img')).toHaveClass('logo-high-contrast');
  });

  test('passes through additional props', () => {
    renderWithProviders(<Logo data-testid="custom-logo" className="custom-class" />);
    
    const logoElement = screen.getByTestId('custom-logo');
    expect(logoElement).toHaveClass('custom-class');
  });

  test('has correct accessibility attributes', () => {
    renderWithProviders(<Logo />);
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('aria-label', 'Qwick Apps Logo');
  });

  test('has correct accessibility attributes with custom name', () => {
    renderWithProviders(<Logo name="Custom Brand" />);
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveAttribute('aria-label', 'Custom Brand Logo');
  });

  test('shows badge circle by default', () => {
    renderWithProviders(<Logo />);
    
    const logoElement = screen.getByRole('img');
    const badgeElement = logoElement.querySelector('.logo-badge-circle');
    expect(badgeElement).toBeInTheDocument();
  });

  test('renders different badge shapes', () => {
    const { rerender } = renderWithProviders(<Logo badgeShape="star" />);
    expect(screen.getByRole('img').querySelector('.logo-badge-star')).toBeInTheDocument();

    rerender(<Logo badgeShape="square" />);
    expect(screen.getByRole('img').querySelector('.logo-badge-square')).toBeInTheDocument();

    rerender(<Logo badgeShape="heart" />);
    expect(screen.getByRole('img').querySelector('.logo-badge-heart')).toBeInTheDocument();
  });

  test('hides badge when badge is none', () => {
    renderWithProviders(<Logo badge="none" />);
    
    const logoElement = screen.getByRole('img');
    const badgeElement = logoElement.querySelector('.logo-badge');
    expect(badgeElement).not.toBeInTheDocument();
  });

  test('applies dynamic-logo class', () => {
    renderWithProviders(<Logo />);
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveClass('dynamic-logo');
  });

  test('renders as clickable when onClick provided', () => {
    const handleClick = jest.fn();
    renderWithProviders(<Logo onClick={handleClick} />);
    
    const logoElement = screen.getByRole('img');
    fireEvent.click(logoElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('combines custom className with default classes', () => {
    renderWithProviders(<Logo className="my-custom-class" size="large" variant="monochrome" />);
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toHaveClass('logo');
    expect(logoElement).toHaveClass('logo-large');
    expect(logoElement).toHaveClass('logo-monochrome');
    expect(logoElement).toHaveClass('my-custom-class');
  });
});
