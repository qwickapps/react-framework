/**
 * ThemeContext Tests
 * Tests for theme management functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

// Test component that uses the theme context
const TestComponent = () => {
  const { currentTheme, actualThemeMode, setPreferredTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="theme-mode">{currentTheme}</span>
      <span data-testid="actual-theme-mode">{actualThemeMode}</span>
      <button onClick={() => setPreferredTheme('dark')}>Switch to Dark</button>
      <button onClick={() => setPreferredTheme('light')}>Switch to Light</button>
      <button onClick={() => setPreferredTheme('system')}>Switch to System</button>
    </div>
  );
};

const renderWithThemeProvider = (component) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ThemeContext', () => {
  beforeEach(() => {
    // Reset document.documentElement mock
    document.documentElement.setAttribute.mockClear();
    document.documentElement.getAttribute.mockReturnValue(null);
    
    // Reset localStorage mocks 
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    
    // Restore window.matchMedia mock
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  test('provides default theme mode as light', () => {
    renderWithThemeProvider(<TestComponent />);
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  test('switches theme mode correctly', async () => {
    renderWithThemeProvider(<TestComponent />);
    
    const darkButton = screen.getByText('Switch to Dark');
    fireEvent.click(darkButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    });
  });

  test('persists theme preference to localStorage', () => {
    renderWithThemeProvider(<TestComponent />);
    
    const lightButton = screen.getByText('Switch to Light');
    fireEvent.click(lightButton);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('qwickapps-react-framework-theme', 'light');
  });

  test('loads theme from localStorage on initialization', () => {
    localStorage.getItem.mockImplementation(() => 'dark');
    
    renderWithThemeProvider(<TestComponent />);
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  test('resolves system theme mode correctly', () => {
    // Mock system preference as dark
    window.matchMedia.mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithThemeProvider(<TestComponent />);
    
    expect(screen.getByTestId('actual-theme-mode')).toHaveTextContent('dark');
  });

  test('updates theme mode when theme changes', () => {
    renderWithThemeProvider(<TestComponent />);
    
    const darkButton = screen.getByText('Switch to Dark');
    fireEvent.click(darkButton);
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  test('throws error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    consoleSpy.mockRestore();
  });
});
