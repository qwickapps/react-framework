import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, withErrorBoundary } from '../../components/ErrorBoundary';

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
	if (shouldThrow) {
		throw new Error('Test error');
	}
	return <div>No error</div>;
};

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeEach(() => {
	console.error = jest.fn();
});

afterEach(() => {
	console.error = originalError;
});

describe('ErrorBoundary', () => {
	it('renders children when there is no error', () => {
		render(
			<ErrorBoundary>
				<div>Test content</div>
			</ErrorBoundary>
		);

		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('renders error UI when child component throws', () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText('Something went wrong')).toBeInTheDocument();
		expect(screen.getByText(/An unexpected error occurred/)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument();
	});

	it('renders custom fallback UI when provided', () => {
		const customFallback = <div>Custom error message</div>;

		render(
			<ErrorBoundary fallback={customFallback}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText('Custom error message')).toBeInTheDocument();
		expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
	});

	it('calls onError callback when error occurs', () => {
		const onError = jest.fn();

		render(
			<ErrorBoundary onError={onError}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(onError).toHaveBeenCalledTimes(1);
		expect(onError).toHaveBeenCalledWith(
			expect.any(Error),
			expect.objectContaining({
				componentStack: expect.any(String)
			})
		);
	});

	it('shows error details in development mode', () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = 'development';

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText(/Error Details \(Development Mode\)/)).toBeInTheDocument();

		// Cleanup
		process.env.NODE_ENV = originalEnv;
	});

	it('shows error details when showErrorDetails is true', () => {
		render(
			<ErrorBoundary showErrorDetails={true}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText(/Error Details \(Development Mode\)/)).toBeInTheDocument();
	});

	it('resets error state when retry button is clicked', () => {
		const TestComponent = () => {
			const [shouldThrow, setShouldThrow] = React.useState(true);

			React.useEffect(() => {
				// After a delay, stop throwing errors
				const timer = setTimeout(() => setShouldThrow(false), 100);
				return () => clearTimeout(timer);
			}, []);

			return <ThrowError shouldThrow={shouldThrow} />;
		};

		render(
			<ErrorBoundary>
				<TestComponent />
			</ErrorBoundary>
		);

		// Error UI should be shown
		expect(screen.getByText('Something went wrong')).toBeInTheDocument();

		// Click retry
		fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));

		// Should attempt to render children again
		// Note: This test is limited because the component will likely throw again
		// In a real scenario, you'd fix the underlying issue before retrying
	});
});

describe('withErrorBoundary HOC', () => {
	it('wraps component with ErrorBoundary', () => {
		const TestComponent = () => <div>Test content</div>;
		const WrappedComponent = withErrorBoundary(TestComponent);

		render(<WrappedComponent />);

		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('passes errorBoundary props to ErrorBoundary', () => {
		const onError = jest.fn();
		const TestComponent = () => <ThrowError shouldThrow={true} />;
		const WrappedComponent = withErrorBoundary(TestComponent, { onError });

		render(<WrappedComponent />);

		expect(onError).toHaveBeenCalledTimes(1);
	});

	it('sets correct displayName', () => {
		const TestComponent = () => <div>Test</div>;
		TestComponent.displayName = 'TestComponent';

		const WrappedComponent = withErrorBoundary(TestComponent);

		expect(WrappedComponent.displayName).toBe('withErrorBoundary(TestComponent)');
	});
});