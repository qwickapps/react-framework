/**
 * Navigation Context - Smart navigation that auto-detects React Router
 *
 * Provides navigation functions that work with React Router when available,
 * falling back to window.location for non-router apps or SSR.
 *
 * Usage:
 * - Wrap your app with NavigationProvider (done automatically by QwickApp)
 * - Use useNavigation() hook to get navigate function and location
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { createContext, useContext, type ReactNode } from 'react';
import {
  useNavigate,
  useLocation,
  useInRouterContext,
} from 'react-router-dom';

/**
 * Location type matching React Router's location shape
 */
export interface NavigationLocation {
  pathname: string;
  search: string;
  hash: string;
}

/**
 * Navigate function type
 */
export type NavigateFunction = (to: string | number) => void;

/**
 * Navigation context value
 */
export interface NavigationContextValue {
  navigate: NavigateFunction;
  location: NavigationLocation | undefined;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Internal provider that uses React Router hooks
 * Only rendered when we're inside a Router context
 */
function ReactRouterNavigationProvider({ children }: { children: ReactNode }) {
  const reactRouterNavigate = useNavigate();
  const reactRouterLocation = useLocation();

  const navigate: NavigateFunction = (to) => {
    if (typeof to === 'string') {
      reactRouterNavigate(to);
    } else if (typeof to === 'number') {
      reactRouterNavigate(to);
    }
  };

  // Defensive check for location - fall back to window.location if React Router's location is undefined
  const location: NavigationLocation | undefined = reactRouterLocation
    ? {
        pathname: reactRouterLocation.pathname,
        search: reactRouterLocation.search,
        hash: reactRouterLocation.hash,
      }
    : typeof window !== 'undefined'
      ? {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
        }
      : undefined;

  return (
    <NavigationContext.Provider value={{ navigate, location }}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Internal provider that uses window.location fallback
 * Used when not inside a React Router context
 */
function FallbackNavigationProvider({ children }: { children: ReactNode }) {
  const navigate: NavigateFunction = (to) => {
    if (typeof window === 'undefined') return;

    if (typeof to === 'string') {
      window.location.href = to;
    } else if (typeof to === 'number') {
      window.history.go(to);
    }
  };

  const location: NavigationLocation | undefined =
    typeof window !== 'undefined'
      ? {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
        }
      : undefined;

  return (
    <NavigationContext.Provider value={{ navigate, location }}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Smart Navigation Provider
 *
 * Automatically detects if the app is inside a React Router context:
 * - If inside Router: uses React Router's useNavigate/useLocation (respects basename)
 * - If outside Router: falls back to window.location
 *
 * This is included automatically by QwickApp - you don't need to add it manually.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  // Check if we're inside a React Router using the official hook
  // This is more reliable than checking internal UNSAFE contexts
  const isInRouter = useInRouterContext();

  if (isInRouter) {
    // We're inside a Router, use React Router's navigation
    return (
      <ReactRouterNavigationProvider>{children}</ReactRouterNavigationProvider>
    );
  }

  // Not inside a Router, use window.location fallback
  return <FallbackNavigationProvider>{children}</FallbackNavigationProvider>;
}

/**
 * Hook to access navigation functions
 *
 * @returns Object containing navigate function and current location
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { navigate, location } = useNavigation();
 *
 *   const handleClick = () => {
 *     navigate('/dashboard');
 *   };
 *
 *   return <button onClick={handleClick}>Go to Dashboard</button>;
 * }
 * ```
 */
export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      'useNavigation must be used within a NavigationProvider. ' +
        'Make sure your component is wrapped in QwickApp or NavigationProvider.'
    );
  }

  return context;
}
