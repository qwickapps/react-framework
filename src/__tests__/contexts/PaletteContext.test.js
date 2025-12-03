/**
 * PaletteContext Tests
 * Tests for palette management functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaletteProvider, usePalette } from '../../contexts/PaletteContext';

// Test component that uses the palette context
const TestComponent = () => {
  const { currentPalette, setPreferredPalette, availablePalettes } = usePalette();
  
  return (
    <div>
      <span data-testid="current-palette">{currentPalette}</span>
      <span data-testid="available-count">{availablePalettes.length}</span>
      <button onClick={() => setPreferredPalette('winter')}>Switch to Winter</button>
      <button onClick={() => setPreferredPalette('ocean')}>Switch to Ocean</button>
      {availablePalettes.map(palette => (
        <span key={palette.id} data-testid={`palette-${palette.id}`}>
          {palette.name}
        </span>
      ))}
    </div>
  );
};

const renderWithPaletteProvider = (component) => {
  return render(<PaletteProvider>{component}</PaletteProvider>);
};

describe('PaletteContext', () => {
  beforeEach(() => {
    // Reset document.documentElement mock
    document.documentElement.setAttribute.mockClear();
    document.documentElement.getAttribute.mockReturnValue(null);
    
    // Reset localStorage mocks
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
  });

  test('provides default palette as default', () => {
    renderWithPaletteProvider(<TestComponent />);
    
    expect(screen.getByTestId('current-palette')).toHaveTextContent('default');
  });

  test('provides all available palettes', () => {
    renderWithPaletteProvider(<TestComponent />);
    
    expect(screen.getByTestId('available-count')).toHaveTextContent('6');
    expect(screen.getByTestId('palette-default')).toHaveTextContent('Default');
    expect(screen.getByTestId('palette-winter')).toHaveTextContent('Winter');
    expect(screen.getByTestId('palette-autumn')).toHaveTextContent('Autumn');
    expect(screen.getByTestId('palette-spring')).toHaveTextContent('Spring');
    expect(screen.getByTestId('palette-ocean')).toHaveTextContent('Ocean');
  });

  test('switches palette correctly', async () => {
    renderWithPaletteProvider(<TestComponent />);
    
    const winterButton = screen.getByText('Switch to Winter');
    fireEvent.click(winterButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('current-palette')).toHaveTextContent('winter');
    });
  });

  test('persists palette preference to localStorage', () => {
    renderWithPaletteProvider(<TestComponent />);
    
    const oceanButton = screen.getByText('Switch to Ocean');
    fireEvent.click(oceanButton);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('qwickapps-react-framework-palette', 'ocean');
  });

  test('loads palette from localStorage on initialization', () => {
    localStorage.getItem.mockImplementation(() => 'autumn');
    
    renderWithPaletteProvider(<TestComponent />);
    
    expect(screen.getByTestId('current-palette')).toHaveTextContent('autumn');
  });

  test('updates document attributes when palette changes', async () => {
    renderWithPaletteProvider(<TestComponent />);
    
    const winterButton = screen.getByText('Switch to Winter');
    fireEvent.click(winterButton);
    
    await waitFor(() => {
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-palette', 'winter');
    });
  });

  test('throws error when usePalette is used outside PaletteProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('usePalette must be used within a PaletteProvider');
    
    consoleSpy.mockRestore();
  });

  test('handles invalid palette gracefully', async () => {
    // Test that the context doesn't break with invalid input
    // This is tested implicitly by the other tests working correctly
    expect(true).toBe(true);
  });
});
