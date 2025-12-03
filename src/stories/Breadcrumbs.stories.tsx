import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, useBreadcrumbs, type BreadcrumbItem } from '../components/Breadcrumbs';
import React from 'react';

// Icons for demo
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

// Demo component with navigation simulation
const BreadcrumbDemo = () => {
  const { breadcrumbs, setBreadcrumbs, addBreadcrumb, removeBreadcrumb, clearBreadcrumbs } = useBreadcrumbs();
  const [currentPath, setCurrentPath] = React.useState('Home > Documents > Projects');

  const samplePaths = [
    'Home',
    'Home > Documents',
    'Home > Documents > Projects',
    'Home > Documents > Projects > QwickApps',
    'Home > Documents > Projects > QwickApps > Framework',
    'Home > Store > Products',
    'Home > Store > Products > Electronics > Computers',
  ];

  const pathToBreadcrumbs = (path: string): BreadcrumbItem[] => {
    const parts = path.split(' > ');
    return parts.map((part, index) => ({
      label: part,
      href: `/${part.toLowerCase().replace(/\s+/g, '-')}`,
      icon: index === 0 ? <HomeIcon /> : 
            index === parts.length - 1 ? <FileIcon /> : 
            <FolderIcon />,
      current: index === parts.length - 1
    }));
  };

  React.useEffect(() => {
    setBreadcrumbs(pathToBreadcrumbs(currentPath));
  }, [currentPath, setBreadcrumbs]);

  const handleNavigate = (item: BreadcrumbItem, index: number) => {
    const newPath = breadcrumbs.slice(0, index + 1).map(b => b.label).join(' > ');
    setCurrentPath(newPath);
    alert(`Navigated to: ${item.label}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Interactive Breadcrumbs Demo</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Current Navigation:</h3>
        <Breadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Navigate to Different Paths:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {samplePaths.map((path) => (
            <button
              key={path}
              onClick={() => setCurrentPath(path)}
              style={{
                padding: '0.5rem 1rem',
                background: path === currentPath ? '#007cba' : '#f0f0f0',
                color: path === currentPath ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {path}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>Breadcrumb Controls:</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => addBreadcrumb({ label: 'New Item', href: '/new' })}
            style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Add Item
          </button>
          <button
            onClick={() => removeBreadcrumb(breadcrumbs.length - 1)}
            style={{ padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Remove Last
          </button>
          <button
            onClick={clearBreadcrumbs}
            style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A navigation breadcrumb component that shows the current page location within the application hierarchy. Supports accessibility, keyboard navigation, and customization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of breadcrumb items to display',
    },
    separator: {
      description: 'Custom separator between breadcrumb items',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes to apply',
      control: 'text',
    },
    onNavigate: {
      description: 'Callback function when a breadcrumb is clicked',
      action: 'navigate',
    },
    maxItems: {
      description: 'Maximum number of items to show (truncates with ellipsis)',
      control: { type: 'number', min: 1, max: 10 },
    },
    showRoot: {
      description: 'Whether to show the root (first) item',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample breadcrumb data
const sampleBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Products', href: '/products', icon: <FolderIcon /> },
  { label: 'Electronics', href: '/products/electronics', icon: <FolderIcon /> },
  { label: 'Laptop', href: '/products/electronics/laptop', icon: <FileIcon />, current: true },
];

// Default story
export const Default: Story = {
  args: {
    items: sampleBreadcrumbs,
  },
};

// Story with custom separator
export const CustomSeparator: Story = {
  args: {
    items: sampleBreadcrumbs,
    separator: '→',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with a custom arrow separator instead of the default slash.',
      },
    },
  },
};

// Story with emoji separator
export const EmojiSeparator: Story = {
  args: {
    items: sampleBreadcrumbs,
    separator: '🏠',
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with an emoji separator for a more playful look.',
      },
    },
  },
};

// Story with max items (truncation)
export const TruncatedItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level1/level2' },
      { label: 'Level 3', href: '/level1/level2/level3' },
      { label: 'Level 4', href: '/level1/level2/level3/level4' },
      { label: 'Current Page', href: '/level1/level2/level3/level4/current', current: true },
    ],
    maxItems: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are too many items, middle items are replaced with ellipsis.',
      },
    },
  },
};

// Story without root item
export const WithoutRoot: Story = {
  args: {
    items: sampleBreadcrumbs,
    showRoot: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs without showing the root (first) item.',
      },
    },
  },
};

// Story without icons
export const WithoutIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptop', href: '/products/electronics/laptop', current: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple breadcrumbs without icons, just text navigation.',
      },
    },
  },
};

// Story with navigation handler
export const WithNavigation: Story = {
  args: {
    items: sampleBreadcrumbs,
    onNavigate: (item, index) => {
      alert(`Clicked on "${item.label}" at index ${index}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with a navigation handler that prevents default link behavior.',
      },
    },
  },
};

// Interactive demo story
export const InteractiveDemo: Story = {
  render: () => <BreadcrumbDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing breadcrumb navigation with the useBreadcrumbs hook.',
      },
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  args: {
    items: sampleBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story: 'This breadcrumb component includes proper ARIA labels, keyboard navigation, and screen reader support. Try using Tab and Enter keys to navigate.',
      },
    },
  },
};