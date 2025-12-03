import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility } from '../../components/AccessibilityProvider';

// Test component that uses accessibility hook
const TestComponent = () => {
  const {
    highContrast,
    reducedMotion,
    largeText,
    focusVisible,
    isKeyboardUser,
    issues,
    setHighContrast,
    setReducedMotion,
    setLargeText,
    announce,
    announcePolite,
    announceAssertive,
    addIssue,
    clearIssues,
    runAudit
  } = useAccessibility();

  return (
    <div>
      <div data-testid="high-contrast">{highContrast.toString()}</div>
      <div data-testid="reduced-motion">{reducedMotion.toString()}</div>
      <div data-testid="large-text">{largeText.toString()}</div>
      <div data-testid="focus-visible">{focusVisible.toString()}</div>
      <div data-testid="keyboard-user">{isKeyboardUser.toString()}</div>
      <div data-testid="issues-count">{issues.length}</div>
      
      <button onClick={() => setHighContrast(!highContrast)}>Toggle High Contrast</button>
      <button onClick={() => setReducedMotion(!reducedMotion)}>Toggle Reduced Motion</button>
      <button onClick={() => setLargeText(!largeText)}>Toggle Large Text</button>
      <button onClick={() => announce('Test message')}>Announce</button>
      <button onClick={() => announcePolite('Polite message')}>Announce Polite</button>
      <button onClick={() => announceAssertive('Assertive message')}>Announce Assertive</button>
      <button onClick={() => addIssue({ type: 'test', message: 'Test issue', level: 'error' })}>Add Issue</button>
      <button onClick={clearIssues}>Clear Issues</button>
      <button onClick={runAudit}>Run Audit</button>
    </div>
  );
};

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  return jest.fn(() => ({
    matches,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
};

// Mock console methods
const originalError = console.error;
const originalGroup = console.group;
const originalGroupEnd = console.groupEnd;
const originalWarn = console.warn;

beforeEach(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockMatchMedia(false),
  });
  
  // Mock console methods
  console.error = jest.fn();
  console.group = jest.fn();
  console.groupEnd = jest.fn();
  console.warn = jest.fn();
});

afterEach(() => {
  // Restore console methods
  console.error = originalError;
  console.group = originalGroup;
  console.groupEnd = originalGroupEnd;
  console.warn = originalWarn;
  
  // Clean up DOM
  document.body.classList.remove('keyboard-user', 'high-contrast', 'reduced-motion', 'large-text');
});

describe('AccessibilityProvider', () => {
  it('renders children correctly', () => {
    render(
      <AccessibilityProvider>
        <div data-testid="child">Test content</div>
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides initial accessibility state', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
    expect(screen.getByTestId('large-text')).toHaveTextContent('false');
    expect(screen.getByTestId('focus-visible')).toHaveTextContent('true');
    expect(screen.getByTestId('keyboard-user')).toHaveTextContent('false');
    expect(screen.getByTestId('issues-count')).toHaveTextContent('0');
  });

  it('allows toggling high contrast mode', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Toggle High Contrast');
    fireEvent.click(button);

    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
    expect(document.body).toHaveClass('high-contrast');
  });

  it('allows toggling reduced motion mode', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Toggle Reduced Motion');
    fireEvent.click(button);

    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
    expect(document.body).toHaveClass('reduced-motion');
  });

  it('allows toggling large text mode', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Toggle Large Text');
    fireEvent.click(button);

    expect(screen.getByTestId('large-text')).toHaveTextContent('true');
    expect(document.body).toHaveClass('large-text');
  });

  it('detects keyboard usage', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Simulate Tab key press
    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' });
    });

    expect(screen.getByTestId('keyboard-user')).toHaveTextContent('true');
    expect(document.body).toHaveClass('keyboard-user');

    // Simulate mouse click
    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(screen.getByTestId('keyboard-user')).toHaveTextContent('false');
    expect(document.body).not.toHaveClass('keyboard-user');
  });

  it('creates ARIA live regions', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const politeRegion = document.getElementById('qwickapps-aria-live-polite');
    const assertiveRegion = document.getElementById('qwickapps-aria-live-assertive');

    expect(politeRegion).toBeInTheDocument();
    expect(politeRegion).toHaveAttribute('aria-live', 'polite');
    expect(assertiveRegion).toBeInTheDocument();
    expect(assertiveRegion).toHaveAttribute('aria-live', 'assertive');
  });

  it('handles polite announcements', async () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Announce Polite');
    fireEvent.click(button);

    await waitFor(() => {
      const politeRegion = document.getElementById('qwickapps-aria-live-polite');
      expect(politeRegion).toHaveTextContent('Polite message');
    });
  });

  it('handles assertive announcements', async () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Announce Assertive');
    fireEvent.click(button);

    await waitFor(() => {
      const assertiveRegion = document.getElementById('qwickapps-aria-live-assertive');
      expect(assertiveRegion).toHaveTextContent('Assertive message');
    });
  });

  it('manages accessibility issues', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Add an issue
    const addButton = screen.getByText('Add Issue');
    fireEvent.click(addButton);
    expect(screen.getByTestId('issues-count')).toHaveTextContent('1');

    // Clear issues
    const clearButton = screen.getByText('Clear Issues');
    fireEvent.click(clearButton);
    expect(screen.getByTestId('issues-count')).toHaveTextContent('0');
  });

  it('runs accessibility audit when enabled', async () => {
    render(
      <AccessibilityProvider enableAudit={true}>
        <TestComponent />
        {/* Add elements that will trigger audit issues */}
        <img src="test.jpg" />
        <button></button>
        <input type="text" />
      </AccessibilityProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('issues-count')).not.toHaveTextContent('0');
    }, { timeout: 2000 });
  });

  it('does not run audit when disabled', () => {
    render(
      <AccessibilityProvider enableAudit={false}>
        <TestComponent />
        <img src="test.jpg" />
        <button></button>
        <input type="text" />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('issues-count')).toHaveTextContent('0');
  });

  it('detects system high contrast preference', () => {
    // Mock high contrast preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn((query) => ({
        matches: query === '(prefers-contrast: high)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
  });

  it('detects system reduced motion preference', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
  });

  it('throws error when hook is used outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAccessibility must be used within an AccessibilityProvider');

    spy.mockRestore();
  });
});