import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumbs, useBreadcrumbs, type BreadcrumbItem } from '../../components/Breadcrumbs';

// Test component for useBreadcrumbs hook
const BreadcrumbHookTest = () => {
  const { breadcrumbs, addBreadcrumb, removeBreadcrumb, setBreadcrumbs, clearBreadcrumbs } = useBreadcrumbs();

  return (
    <div>
      <div data-testid="breadcrumb-count">{breadcrumbs.length}</div>
      <button onClick={() => addBreadcrumb({ label: 'Test', href: '/test' })}>
        Add Breadcrumb
      </button>
      <button onClick={() => removeBreadcrumb(0)}>
        Remove First
      </button>
      <button onClick={() => setBreadcrumbs([{ label: 'Set', href: '/set' }])}>
        Set Breadcrumbs
      </button>
      <button onClick={clearBreadcrumbs}>
        Clear All
      </button>
    </div>
  );
};

// Sample breadcrumb data
const sampleBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics', current: true },
];

describe('Breadcrumbs', () => {
  it('renders breadcrumb items correctly', () => {
    render(<Breadcrumbs items={sampleBreadcrumbs} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders with proper ARIA attributes', () => {
    render(<Breadcrumbs items={sampleBreadcrumbs} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb navigation');
    
    // Electronics has current: true, so it should be wrapped in a span with aria-current="page"
    const currentItemText = screen.getByText('Electronics');
    const currentItem = currentItemText.parentElement;
    expect(currentItem?.tagName).toBe('SPAN');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders custom separator', () => {
    render(<Breadcrumbs items={sampleBreadcrumbs} separator=">" />);
    
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2); // Should have 2 separators for 3 items
  });

  it('applies custom className', () => {
    render(<Breadcrumbs items={sampleBreadcrumbs} className="custom-breadcrumbs" />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('breadcrumbs', 'custom-breadcrumbs');
  });

  it('handles navigation clicks with onNavigate', () => {
    const onNavigate = jest.fn();
    render(<Breadcrumbs items={sampleBreadcrumbs} onNavigate={onNavigate} />);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    expect(onNavigate).toHaveBeenCalledWith(
      sampleBreadcrumbs[0],
      0
    );
  });

  it('handles keyboard navigation', () => {
    const onNavigate = jest.fn();
    render(<Breadcrumbs items={sampleBreadcrumbs} onNavigate={onNavigate} />);

    const homeLink = screen.getByText('Home');
    
    // Test Enter key
    fireEvent.keyDown(homeLink, { key: 'Enter' });
    expect(onNavigate).toHaveBeenCalledWith(sampleBreadcrumbs[0], 0);

    // Test Space key
    fireEvent.keyDown(homeLink, { key: ' ' });
    expect(onNavigate).toHaveBeenCalledTimes(2);
  });

  it('truncates items when maxItems is set', () => {
    const manyItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level1', href: '/level1' },
      { label: 'Level2', href: '/level2' },
      { label: 'Level3', href: '/level3' },
      { label: 'Level4', href: '/level4' },
      { label: 'Current', href: '/current', current: true },
    ];

    render(<Breadcrumbs items={manyItems} maxItems={4} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    
    // Should not show middle items
    expect(screen.queryByText('Level2')).not.toBeInTheDocument();
    expect(screen.queryByText('Level3')).not.toBeInTheDocument();
  });

  it('hides root item when showRoot is false', () => {
    render(<Breadcrumbs items={sampleBreadcrumbs} showRoot={false} />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders with icons when provided', () => {
    const itemsWithIcons: BreadcrumbItem[] = [
      { 
        label: 'Home', 
        href: '/', 
        icon: <span data-testid="home-icon">🏠</span> 
      },
      { 
        label: 'Products', 
        href: '/products', 
        icon: <span data-testid="products-icon">📦</span> 
      },
    ];

    render(<Breadcrumbs items={itemsWithIcons} />);

    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('products-icon')).toBeInTheDocument();
  });

  it('does not render when only one item or less', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'Home', href: '/' }]} />);
    expect(container.firstChild).toBeNull();

    const { container: emptyContainer } = render(<Breadcrumbs items={[]} />);
    expect(emptyContainer.firstChild).toBeNull();
  });

  it('renders non-clickable items correctly', () => {
    const nonClickableItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }, // Clickable: has href, not current
      { label: 'Current', current: true }, // Non-clickable: current is true
    ];

    render(<Breadcrumbs items={nonClickableItems} />);

    // Home should be clickable - find the parent element (the <a> tag)
    const homeElement = screen.getByText('Home').parentElement;
    expect(homeElement?.tagName).toBe('A');
    
    // Current should not be clickable - find the parent element (should be <span>)
    const currentElement = screen.getByText('Current').parentElement;
    expect(currentElement?.tagName).toBe('SPAN');
  });

  it('prevents navigation for ellipsis items', () => {
    const onNavigate = jest.fn();
    const manyItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level1', href: '/level1' },
      { label: 'Level2', href: '/level2' },
      { label: 'Level3', href: '/level3' },
      { label: 'Current', href: '/current', current: true },
    ];

    render(<Breadcrumbs items={manyItems} maxItems={3} onNavigate={onNavigate} />);

    const ellipsis = screen.getByText('...');
    fireEvent.click(ellipsis);

    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('handles default link behavior when no onNavigate is provided', () => {
    // Create a mock for window.location.href
    const originalLocation = window.location;
    delete (window as Window & typeof globalThis).location;
    window.location = { ...originalLocation, href: '' } as Location;

    const itemsWithHref: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Current', href: '/current' }, // Need at least 2 items for breadcrumbs to render
    ];

    render(<Breadcrumbs items={itemsWithHref} />);

    const homeLink = screen.getByText('Home');
    fireEvent.keyDown(homeLink, { key: 'Enter' });

    // Should attempt to navigate using href
    expect(window.location.href).toBe('/');

    // Restore original location
    window.location = originalLocation;
  });
});

describe('useBreadcrumbs hook', () => {
  it('provides initial empty breadcrumbs', () => {
    render(<BreadcrumbHookTest />);

    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('0');
  });

  it('allows adding breadcrumbs', () => {
    render(<BreadcrumbHookTest />);

    const addButton = screen.getByText('Add Breadcrumb');
    fireEvent.click(addButton);

    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('1');
  });

  it('allows removing breadcrumbs', () => {
    render(<BreadcrumbHookTest />);

    // Add a breadcrumb first
    const addButton = screen.getByText('Add Breadcrumb');
    fireEvent.click(addButton);
    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('1');

    // Remove it
    const removeButton = screen.getByText('Remove First');
    fireEvent.click(removeButton);
    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('0');
  });

  it('allows setting breadcrumbs', () => {
    render(<BreadcrumbHookTest />);

    const setButton = screen.getByText('Set Breadcrumbs');
    fireEvent.click(setButton);

    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('1');
  });

  it('allows clearing all breadcrumbs', () => {
    render(<BreadcrumbHookTest />);

    // Add multiple breadcrumbs
    const addButton = screen.getByText('Add Breadcrumb');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('2');

    // Clear all
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);
    expect(screen.getByTestId('breadcrumb-count')).toHaveTextContent('0');
  });
});