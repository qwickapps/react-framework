/**
 * DataContext - React Context for Data Provider
 * 
 * Provides data templating capabilities throughout the React component tree
 * via React Context API. Supports mustache template resolution and caching.
 * Enables JSX components to use mustache syntax to reference named data elements.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { ITemplateResolver, TemplateResolverConfig } from '../types';
import { TemplateResolver } from '../templates';
import { Model } from '@qwickapps/schema';

/**
 * Data Context interface
 */
interface DataContextValue {
  provider: ITemplateResolver | null;
  get<T extends Model>(slug: string): Promise<T | undefined>;
  select<T extends Model>(schema: string, options?: unknown): Promise<T[]>;
  resolveTemplate(template: string): Promise<string>;
}

/**
 * React Context for data provider
 */
const DataContext = createContext<DataContextValue | null>(null);

/**
 * Props for DataProvider component
 */
export interface DataProviderProps {
  /** The data source configuration (follows new SRP architecture) */
  dataSource: TemplateResolverConfig;
  /** Child components that will have access to data templating */
  children: ReactNode;
}

/**
 * DataProvider component that wraps children with data templating capabilities
 * 
 * Enables JSX components to use mustache syntax for data interpolation:
 * - {t`Welcome {{company.name}}!`} 
 * - {useData('users')} for data fetching
 * - Template resolution with caching support
 * 
 * Usage (new SRP architecture):
 * ```tsx
 * <DataProvider dataSource={{
 *   dataProvider: new JsonDataProvider({ data: { ... } }),
 *   cache: true,
 *   templateResolver: new MustacheTemplateResolver()
 * }}>
 *   <MyComponent /> // Can use useData() hooks and t`` templates
 * </DataProvider>
 * ```
 */
export function DataProvider({ dataSource, children }: DataProviderProps) {
  // Create TemplateResolver internally
  const dataProvider = new TemplateResolver(dataSource);
  
  const contextValue: DataContextValue = {
    provider: dataProvider,
    get: async <T extends Model>(slug: string): Promise<T | undefined> => {
      const result = await dataProvider.get(slug);
      return result && result.data ? (result.data as T) : undefined;
    },
    select: async <T extends Model>(schema: string, options?: unknown): Promise<T[]> => {
      const result = await dataProvider.select(schema, options);
      return result && Array.isArray(result.data) ? (result.data as T[]) : [];
    },
    resolveTemplate: (template: string) => dataProvider.resolveTemplate(template)
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

/**
 * Hook to access the data context
 * 
 * @throws Error if used outside of DataProvider
 */
export function useDataContext(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider. Did you wrap your component with <DataProvider>?');
  }
  return context;
}

/**
 * Hook to get data by unique slug (safe version that doesn't throw)
 * 
 * @param slug - The unique slug to fetch data for
 * @returns Data with loading state information
 */
export function useDataSafe<T extends Model>(slug: string): {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
} {
  const context = useContext(DataContext);

  // Always call hooks before any returns
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Always call useEffect unconditionally
  useEffect(() => {
    // Only fetch if context exists
    if (!context) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await context.get<T>(slug);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };

    fetchData();
  }, [context, slug]);

  // Return early if no context
  if (!context) {
    return { data: undefined, loading: false, error: null };
  }

  return { data, loading, error };
}

/**
 * Hook to get data by field group ID
 * 
 * @param fieldGroupId - The field group to fetch
 * @returns Data and loading state
 */
export function useData<T extends Model>(fieldGroupId: string): {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const { get } = useDataContext();
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!fieldGroupId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await get<T>(fieldGroupId);
      setData(result ? result : undefined);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setLoading(false);
    }
  }, [fieldGroupId, get]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook to resolve a template string with mustache syntax
 * 
 * @param template - Template string with {{fieldGroup.property}} syntax
 * @returns Resolved template string and loading state
 */
export function useResolveTemplate(template: string) {
  const { resolveTemplate } = useDataContext();
  const [resolved, setResolved] = useState(template);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function resolve() {
      if (!template) {
        setResolved(template);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await resolveTemplate(template);
        
        if (isMounted) {
          setResolved(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setResolved(template); // Fallback to original template
          setLoading(false);
        }
      }
    }

    resolve();

    return () => {
      isMounted = false;
    };
  }, [template, resolveTemplate]);

  return { resolved, loading, error };
}

/**
 * Hook to access data provider directly for advanced use cases
 */
export function useDataProvider(): ITemplateResolver {
  const { provider } = useDataContext();
  if (!provider) {
    throw new Error('Data provider not available');
  }
  return provider;
}

/**
 * Template component for inline template resolution
 * 
 * This is a React-friendly component for template resolution
 * that works well with conditional rendering and fallbacks.
 * 
 * Usage:
 * ```tsx
 * <T template="Welcome to {{company.name}}!" fallback="Loading..." />
 * <T template="Hello {{user.name}}" fallback="Guest" />
 * ```
 */
export const T: React.FC<{ template: string; fallback?: ReactNode; wrapper?: React.ComponentType<{ children: ReactNode }> }> = ({
  template,
  fallback,
  wrapper: Wrapper
}) => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('T component must be used within a DataProvider. Did you wrap your component with <DataProvider>?');
  }

  const { resolved, loading, error } = useResolveTemplate(template);

  if (loading) {
    return fallback ? <>{fallback}</> : null;
  } else if (error) {
    if (process.env.NODE_ENV === 'development') {
      return <>[Template Error: {error.message}]</>;
    } else {
      return fallback ? <>{fallback}</> : null;
    }
  } else {
    const content = <>{resolved}</>;
    return Wrapper ? <Wrapper>{content}</Wrapper> : content;
  }
};

/**
 * Hook to resolve template with tagged template literal syntax
 * 
 * This returns the resolved value directly so it can be used with || operator
 */
export function useTemplate(template: string): string | null {
  const { resolved, loading, error } = useResolveTemplate(template);
  
  if (loading) {
    return null;
  } else if (error) {
    if (process.env.NODE_ENV === 'development') {
      return `[Template Error: ${error.message}]`;
    } else {
      return null;
    }
  } else {
    return resolved;
  }
}

/**
 * Tagged template function for inline data templating
 * 
 * Enables JSX components to use mustache syntax for data interpolation:
 * 
 * Usage:
 * ```tsx
 * {t`Welcome to {{company.name}}!`}
 * {t`Hello {{user.name}}` || 'Loading...'}
 * {t.wrap(CustomComponent)`{{company.slogan}}`}
 * ```
 */
export function t(strings: TemplateStringsArray, ...values: unknown[]): ReactNode {
  // First do regular template literal interpolation
  const template = String.raw(strings, ...values);
  
  // Return a component that uses the hook
  const TemplateResolver = () => {
    const resolved = useTemplate(template);
    return resolved;
  };
  
  return <TemplateResolver />;
}

/**
 * Tagged template function with custom wrapper component
 * 
 * Usage:
 * ```tsx
 * {t.wrap(QuoteComponent)`{{company.slogan}}`}
 * ```
 */
t.wrap = (WrapperComponent: React.ComponentType<{ children: ReactNode }>) => 
  (strings: TemplateStringsArray, ...values: unknown[]): ReactNode => {
    const template = String.raw(strings, ...values);
    
    const WrappedTemplate = () => {
      const resolved = useTemplate(template);
      return resolved ? <WrapperComponent>{resolved}</WrapperComponent> : null;
    };
    
    return <WrappedTemplate />;
  };