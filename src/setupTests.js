// Jest setup for QwickApps Theme System tests
import '@testing-library/jest-dom';

// Mock paletteLoader to avoid import.meta.env issues in Jest
jest.mock('./utils/paletteLoader', () => ({
  loadPalette: jest.fn().mockResolvedValue(undefined),
  loadPaletteSync: jest.fn(),
  isPaletteLoaded: jest.fn().mockReturnValue(true),
  getLoadedPalettes: jest.fn().mockReturnValue([]),
  preloadPalettes: jest.fn().mockResolvedValue(undefined),
}));

// Mock CSS imports for components
jest.mock('./components/QwickApp.css', () => ({}));
jest.mock('./components/Logo.css', () => ({}));
jest.mock('../theme/palettes/index.css', () => ({}));

// Mock window.matchMedia for system theme detection
const matchMediaMock = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});

// Mock localStorage with proper Jest spies
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock document.documentElement for CSS variable testing
Object.defineProperty(document, 'documentElement', {
  writable: true,
  value: {
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    style: {
      setProperty: jest.fn(),
    },
  },
});

// Mock getComputedStyle
global.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(() => '#000000'),
}));

// Mock SVG getBBox method for Logo component tests
Element.prototype.getBBox = jest.fn(() => ({
  x: 0,
  y: 0,
  width: 100,
  height: 20
}));
