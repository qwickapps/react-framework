import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

// Accessibility State
export interface AccessibilityState {
	highContrast: boolean;
	reducedMotion: boolean;
	largeText: boolean;
	focusVisible: boolean;
	isKeyboardUser: boolean;
	issues: AccessibilityIssue[];
	lastAnnouncement: Announcement | null;
	preferences: Record<string, unknown>;
}

export interface AccessibilityIssue {
	type: string;
	message: string;
	level: 'error' | 'warning' | 'info';
	element?: Element;
}

export interface Announcement {
	message: string;
	level: 'polite' | 'assertive';
	timestamp: number;
}

// Actions
type AccessibilityAction =
	| { type: 'SET_HIGH_CONTRAST'; payload: boolean }
	| { type: 'SET_REDUCED_MOTION'; payload: boolean }
	| { type: 'SET_LARGE_TEXT'; payload: boolean }
	| { type: 'SET_FOCUS_VISIBLE'; payload: boolean }
	| { type: 'SET_KEYBOARD_USER'; payload: boolean }
	| { type: 'ADD_ISSUE'; payload: AccessibilityIssue }
	| { type: 'CLEAR_ISSUES' }
	| { type: 'SET_ANNOUNCEMENT'; payload: Announcement };

// Context
export interface AccessibilityContextValue extends AccessibilityState {
	setHighContrast: (enabled: boolean) => void;
	setReducedMotion: (enabled: boolean) => void;
	setLargeText: (enabled: boolean) => void;
	setFocusVisible: (enabled: boolean) => void;
	announce: (message: string, level?: 'polite' | 'assertive') => void;
	announcePolite: (message: string) => void;
	announceAssertive: (message: string) => void;
	addIssue: (issue: AccessibilityIssue) => void;
	clearIssues: () => void;
	runAudit: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

// Reducer
const accessibilityReducer = (state: AccessibilityState, action: AccessibilityAction): AccessibilityState => {
	switch (action.type) {
		case 'SET_HIGH_CONTRAST':
			return { ...state, highContrast: action.payload };
		case 'SET_REDUCED_MOTION':
			return { ...state, reducedMotion: action.payload };
		case 'SET_LARGE_TEXT':
			return { ...state, largeText: action.payload };
		case 'SET_FOCUS_VISIBLE':
			return { ...state, focusVisible: action.payload };
		case 'SET_KEYBOARD_USER':
			return { ...state, isKeyboardUser: action.payload };
		case 'ADD_ISSUE':
			return { ...state, issues: [...state.issues, action.payload] };
		case 'CLEAR_ISSUES':
			return { ...state, issues: [] };
		case 'SET_ANNOUNCEMENT':
			return { ...state, lastAnnouncement: action.payload };
		default:
			return state;
	}
};

// Initial state
const initialState: AccessibilityState = {
	highContrast: false,
	reducedMotion: false,
	largeText: false,
	focusVisible: true,
	isKeyboardUser: false,
	issues: [],
	lastAnnouncement: null,
	preferences: {}
};

// ARIA Live Manager
class AriaLiveManager {
	private politeRegion: HTMLElement | null = null;
	private assertiveRegion: HTMLElement | null = null;

	constructor() {
		this.createLiveRegions();
	}

	private createLiveRegions() {
		if (typeof document === 'undefined') return;

		// Polite announcements
		this.politeRegion = document.createElement('div');
		this.politeRegion.setAttribute('aria-live', 'polite');
		this.politeRegion.setAttribute('aria-atomic', 'true');
		this.politeRegion.setAttribute('id', 'qwickapps-aria-live-polite');
		this.politeRegion.style.cssText = `
			position: absolute !important;
			left: -10000px !important;
			width: 1px !important;
			height: 1px !important;
			overflow: hidden !important;
		`;
		document.body.appendChild(this.politeRegion);

		// Assertive announcements
		this.assertiveRegion = document.createElement('div');
		this.assertiveRegion.setAttribute('aria-live', 'assertive');
		this.assertiveRegion.setAttribute('aria-atomic', 'true');
		this.assertiveRegion.setAttribute('id', 'qwickapps-aria-live-assertive');
		this.assertiveRegion.style.cssText = `
			position: absolute !important;
			left: -10000px !important;
			width: 1px !important;
			height: 1px !important;
			overflow: hidden !important;
		`;
		document.body.appendChild(this.assertiveRegion);
	}

	announce(message: string, level: 'polite' | 'assertive' = 'polite') {
		if (level === 'assertive') {
			this.announceAssertive(message);
		} else {
			this.announcePolite(message);
		}
	}

	announcePolite(message: string) {
		if (!this.politeRegion) return;
		
		this.politeRegion.textContent = '';
		// Small delay ensures screen readers detect the change
		setTimeout(() => {
			if (this.politeRegion) {
				this.politeRegion.textContent = message;
			}
		}, 100);
	}

	announceAssertive(message: string) {
		if (!this.assertiveRegion) return;
		
		this.assertiveRegion.textContent = '';
		// Small delay ensures screen readers detect the change
		setTimeout(() => {
			if (this.assertiveRegion) {
				this.assertiveRegion.textContent = message;
			}
		}, 100);
	}
}

const ariaLiveManager = new AriaLiveManager();

// Props
export interface AccessibilityProviderProps {
	children: ReactNode;
	enableAudit?: boolean;
}

/**
 * Accessibility Provider Component
 * Provides comprehensive accessibility context and utilities
 * 
 * Features:
 * - System preference detection (high contrast, reduced motion)
 * - Keyboard navigation detection
 * - ARIA live announcements
 * - Focus management
 * - Accessibility auditing
 * - Settings persistence
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ 
	children, 
	enableAudit = process.env.NODE_ENV === 'development' 
}) => {
	const [state, dispatch] = useReducer(accessibilityReducer, initialState);

	useEffect(() => {
		// Detect user preferences from system
		detectUserPreferences();
		
		// Set up keyboard detection
		const keyboardCleanup = setupKeyboardDetection();
		
		// Initialize focus management
		initializeFocusManagement();
		
		// Run initial accessibility audit
		if (enableAudit) {
			runAccessibilityAudit();
		}

		// Cleanup
		return () => {
			if (keyboardCleanup) keyboardCleanup();
		};
	}, [enableAudit]);

	const detectUserPreferences = () => {
		if (typeof window === 'undefined') return;

		// High contrast mode
		if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
			dispatch({ type: 'SET_HIGH_CONTRAST', payload: true });
		}

		// Reduced motion
		if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			dispatch({ type: 'SET_REDUCED_MOTION', payload: true });
		}

		// Listen for changes
		if (window.matchMedia) {
			const contrastMedia = window.matchMedia('(prefers-contrast: high)');
			const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

			const contrastHandler = (e: MediaQueryListEvent) => {
				dispatch({ type: 'SET_HIGH_CONTRAST', payload: e.matches });
			};

			const motionHandler = (e: MediaQueryListEvent) => {
				dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches });
			};

			contrastMedia.addEventListener('change', contrastHandler);
			motionMedia.addEventListener('change', motionHandler);

			// Return cleanup function
			return () => {
				contrastMedia.removeEventListener('change', contrastHandler);
				motionMedia.removeEventListener('change', motionHandler);
			};
		}
	};

	const setupKeyboardDetection = () => {
		if (typeof document === 'undefined') return;

		let keyboardUser = false;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Tab') {
				keyboardUser = true;
				dispatch({ type: 'SET_KEYBOARD_USER', payload: true });
				document.body.classList.add('keyboard-user');
			}
		};

		const handleMouseDown = () => {
			if (keyboardUser) {
				keyboardUser = false;
				dispatch({ type: 'SET_KEYBOARD_USER', payload: false });
				document.body.classList.remove('keyboard-user');
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleMouseDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleMouseDown);
		};
	};

	const initializeFocusManagement = () => {
		if (typeof document === 'undefined') return;

		// Enhanced focus indicators for keyboard users
		const style = document.createElement('style');
		style.textContent = `
			.keyboard-user *:focus {
				outline: 3px solid #005cee !important;
				outline-offset: 2px !important;
			}
			
			.high-contrast *:focus {
				outline: 3px solid #ffffff !important;
				outline-offset: 2px !important;
				box-shadow: 0 0 0 1px #000000 !important;
			}
			
			.reduced-motion * {
				animation-duration: 0.01ms !important;
				animation-iteration-count: 1 !important;
				transition-duration: 0.01ms !important;
			}
			
			.large-text {
				font-size: 1.2em !important;
			}
		`;
		document.head.appendChild(style);
	};

	const runAccessibilityAudit = () => {
		if (typeof document === 'undefined') return;

		setTimeout(() => {
			const issues: AccessibilityIssue[] = [];

			// Check for images without alt text
			const images = document.querySelectorAll('img:not([alt])');
			images.forEach(img => {
				issues.push({
					type: 'missing-alt-text',
					message: 'Image missing alt attribute',
					level: 'error',
					element: img
				});
			});

			// Check for buttons without accessible names
			const buttons = document.querySelectorAll('button:not([aria-label]):not([title])');
			buttons.forEach(button => {
				if (!button.textContent?.trim()) {
					issues.push({
						type: 'unnamed-button',
						message: 'Button missing accessible name',
						level: 'error',
						element: button
					});
				}
			});

			// Check for form inputs without labels
			const inputs = document.querySelectorAll('input:not([aria-label]):not([title])');
			inputs.forEach(input => {
				const id = input.getAttribute('id');
				if (id) {
					const label = document.querySelector(`label[for="${id}"]`);
					if (!label) {
						issues.push({
							type: 'unlabeled-input',
							message: 'Form input missing label',
							level: 'error',
							element: input
						});
					}
				} else {
					issues.push({
						type: 'unlabeled-input',
						message: 'Form input missing label',
						level: 'error',
						element: input
					});
				}
			});

			dispatch({ type: 'CLEAR_ISSUES' });
			
			issues.forEach(issue => {
				dispatch({ type: 'ADD_ISSUE', payload: issue });
			});

			if (issues.length > 0) {
				console.group('🔍 Accessibility Issues Found');
				issues.forEach(issue => {
					const logMethod = issue.level === 'error' ? console.error : console.warn;
					logMethod(`${issue.type}: ${issue.message}`);
				});
				console.groupEnd();
			}
		}, 1000);
	};

	// Context value
	const contextValue: AccessibilityContextValue = {
		...state,
		
		// Actions
		setHighContrast: (enabled: boolean) => dispatch({ type: 'SET_HIGH_CONTRAST', payload: enabled }),
		setReducedMotion: (enabled: boolean) => dispatch({ type: 'SET_REDUCED_MOTION', payload: enabled }),
		setLargeText: (enabled: boolean) => dispatch({ type: 'SET_LARGE_TEXT', payload: enabled }),
		setFocusVisible: (enabled: boolean) => dispatch({ type: 'SET_FOCUS_VISIBLE', payload: enabled }),
		
		// Utilities
		announce: (message: string, level: 'polite' | 'assertive' = 'polite') => {
			ariaLiveManager.announce(message, level);
			dispatch({ type: 'SET_ANNOUNCEMENT', payload: { message, level, timestamp: Date.now() } });
		},
		
		announcePolite: (message: string) => {
			ariaLiveManager.announcePolite(message);
			dispatch({ type: 'SET_ANNOUNCEMENT', payload: { message, level: 'polite', timestamp: Date.now() } });
		},
		
		announceAssertive: (message: string) => {
			ariaLiveManager.announceAssertive(message);
			dispatch({ type: 'SET_ANNOUNCEMENT', payload: { message, level: 'assertive', timestamp: Date.now() } });
		},
		
		addIssue: (issue: AccessibilityIssue) => dispatch({ type: 'ADD_ISSUE', payload: issue }),
		clearIssues: () => dispatch({ type: 'CLEAR_ISSUES' }),
		
		// Audit function
		runAudit: runAccessibilityAudit
	};

	// Apply CSS classes based on preferences
	useEffect(() => {
		if (typeof document === 'undefined') return;

		const { highContrast, reducedMotion, largeText } = state;

		document.body.classList.toggle('high-contrast', highContrast);
		document.body.classList.toggle('reduced-motion', reducedMotion);
		document.body.classList.toggle('large-text', largeText);
		// Using specific properties is more granular than using entire state object
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.highContrast, state.reducedMotion, state.largeText]);

	return (
		<AccessibilityContext.Provider value={contextValue}>
			{children}
		</AccessibilityContext.Provider>
	);
};

/**
 * Hook to access accessibility context
 */
export const useAccessibility = (): AccessibilityContextValue => {
	const context = useContext(AccessibilityContext);
	
	if (!context) {
		throw new Error('useAccessibility must be used within an AccessibilityProvider');
	}
	
	return context;
};

/**
 * Higher-Order Component for accessibility enhancements
 */
export const withAccessibility = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	const AccessibilityEnhancedComponent = (props: P) => {
		const accessibility = useAccessibility();
		
		return (
			<WrappedComponent 
				{...props}
				accessibility={accessibility}
			/>
		);
	};

	AccessibilityEnhancedComponent.displayName = `withAccessibility(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return AccessibilityEnhancedComponent;
};

export default AccessibilityProvider;