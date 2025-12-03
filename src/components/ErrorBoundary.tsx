import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './buttons/Button';

declare global {
	interface Window {
		qwickapps?: {
			logError?: (error: Error, errorInfo: ErrorInfo) => void;
		};
	}
}

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	showErrorDetails?: boolean;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

/**
 * Generic ErrorBoundary component for catching and handling React errors
 * 
 * Features:
 * - Catches JavaScript errors anywhere in child component tree
 * - Displays fallback UI with retry functionality
 * - Shows error details in development mode
 * - Customizable error handling and fallback UI
 * - Automatic error logging
 */
export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null
		};
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return { 
			hasError: true,
			error,
			errorInfo: null
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log error details
		this.setState({
			error,
			errorInfo
		});

		// Log to console for debugging
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		// Custom error handler
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}

		// Send error to logging service if available
		if (typeof window !== 'undefined') {
			// @ts-expect-error - Global error logging service may not be defined
			if (window.qwickapps?.logError) {
				window.qwickapps.logError(error, errorInfo);
			}
		}
	}

	handleRetry = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null
		});
	};

	handleRefresh = () => {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<div 
					className="error-boundary" 
					role="alert"
					style={{
						padding: '2rem',
						textAlign: 'center',
						backgroundColor: '#fef2f2',
						border: '1px solid #fecaca',
						borderRadius: '8px',
						margin: '1rem',
						color: '#991b1b'
					}}
				>
					<div style={{ marginBottom: '1.5rem' }}>
						<h2 style={{ 
							fontSize: '1.5rem', 
							fontWeight: 'bold', 
							marginBottom: '0.5rem',
							color: '#991b1b'
						}}>
							Something went wrong
						</h2>
						<p style={{ 
							color: '#7f1d1d',
							marginBottom: '1rem' 
						}}>
							An unexpected error occurred in the application. Please try again or refresh the page.
						</p>
					</div>

					<div style={{ 
						display: 'flex', 
						gap: '0.75rem', 
						justifyContent: 'center',
						marginBottom: '1rem'
					}}>
						<Button
							variant="contained"
							onClick={this.handleRetry}
						>
							Try Again
						</Button>

						<Button
							variant="outlined"
							onClick={this.handleRefresh}
						>
							Refresh Page
						</Button>
					</div>

					{/* Show error details in development or when explicitly enabled */}
					{(process.env.NODE_ENV === 'development' || this.props.showErrorDetails) && this.state.error && (
						<details 
							style={{ 
								textAlign: 'left', 
								marginTop: '1rem',
								padding: '1rem',
								backgroundColor: '#f9fafb',
								border: '1px solid #d1d5db',
								borderRadius: '6px'
							}}
						>
							<summary style={{ 
								cursor: 'pointer', 
								fontWeight: 'bold',
								marginBottom: '0.5rem',
								color: '#374151'
							}}>
								Error Details (Development Mode)
							</summary>
							<pre style={{ 
								fontSize: '0.75rem',
								color: '#374151',
								whiteSpace: 'pre-wrap',
								overflow: 'auto'
							}}>
								{this.state.error.toString()}
								{this.state.errorInfo?.componentStack && (
									<>
										<br />
										<br />
										Component Stack:
										{this.state.errorInfo.componentStack}
									</>
								)}
							</pre>
						</details>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * Higher-order component that wraps a component with ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	errorBoundaryProps?: Omit<Props, 'children'>
) {
	const WithErrorBoundaryComponent = (props: P) => (
		<ErrorBoundary {...errorBoundaryProps}>
			<WrappedComponent {...props} />
		</ErrorBoundary>
	);

	WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return WithErrorBoundaryComponent;
}

export default ErrorBoundary;