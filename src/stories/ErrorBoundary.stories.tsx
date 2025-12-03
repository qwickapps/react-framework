import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary, withErrorBoundary } from '../components/ErrorBoundary';
import React from 'react';

// Test component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Intentional error for testing ErrorBoundary');
  }
  return <div>This component is working fine!</div>;
};

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Framework/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A React Error Boundary component that catches JavaScript errors and displays a user-friendly fallback UI with recovery options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fallback: {
      description: 'Custom fallback UI to display when an error occurs',
    },
    onError: {
      description: 'Callback function called when an error is caught',
      action: 'onError',
    },
    showErrorDetails: {
      description: 'Whether to show error details (overrides development mode detection)',
      control: 'boolean',
    },
    children: {
      description: 'Child components to wrap with error boundary',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with working component
export const Default: Story = {
  args: {
    children: <div>This is a working component wrapped in ErrorBoundary</div>,
  },
};

// Story that demonstrates error handling
export const WithError: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates ErrorBoundary catching an error and displaying the fallback UI.',
      },
    },
  },
};

// Story with custom fallback UI
export const CustomFallback: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    fallback: (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        background: '#ffe6e6',
        border: '2px solid #ff9999',
        borderRadius: '8px',
        color: '#cc0000'
      }}>
        <h3>🚨 Custom Error UI</h3>
        <p>Something went wrong, but we have a custom fallback!</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how to provide a custom fallback UI instead of the default error message.',
      },
    },
  },
};

// Story showing error details in development mode
export const WithErrorDetails: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    showErrorDetails: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows error details including stack trace (normally only shown in development mode).',
      },
    },
  },
};

// Story demonstrating the HOC
const TestComponent = () => <div>Component enhanced with ErrorBoundary HOC</div>;
const EnhancedComponent = withErrorBoundary(TestComponent);

export const HigherOrderComponent: Story = {
  render: () => <EnhancedComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates using the withErrorBoundary Higher-Order Component to wrap any component with error handling.',
      },
    },
  },
};

// Interactive story for testing retry functionality
const InteractiveComponent = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={() => setShouldThrow(!shouldThrow)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          background: shouldThrow ? '#ff4444' : '#44aa44',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {shouldThrow ? 'Fix Component' : 'Break Component'}
      </button>

      <ErrorBoundary>
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo where you can break and fix the component to see ErrorBoundary in action.',
      },
    },
  },
};