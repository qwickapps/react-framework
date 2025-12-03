/**
 * Data Binding Hook for AI-Driven Component System
 * 
 * This hook enables components to resolve props from CMS data sources
 * instead of hardcoded props, allowing AI agents to generate both
 * content and presentation dynamically.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { DataBindingMeta, Model } from '@qwickapps/schema';
import { useMemo } from 'react';
import { useDataSafe } from '../contexts/DataContext';

/**
 * Hook for resolving component props from data sources
 * 
 * @param dataSource - Data source identifier (e.g., "company.description", "pages.home.hero-block")
 * @param fallbackProps - Props to use when dataSource is unavailable
 * @param schema - Component schema for validation
 * @param options - Data binding configuration options
 * @returns Resolved props with data binding metadata
 */
export function useDataBinding<T extends Model>(
  dataSource?: string,
  fallbackProps?: Partial<T>
): T & DataBindingMeta {
  // Determine if we should use data binding
  const isDataSourceAvailable = dataSource && dataSource.trim().length > 0;

  // Get data - always call the hook unconditionally, but pass empty string if not available
  const safeDataResult = useDataSafe(isDataSourceAvailable ? dataSource : '');

  // Resolve the final props
  const resolvedData = useMemo(() => {
    if (!isDataSourceAvailable || safeDataResult.data === undefined) {
      // No data source provided, use fallback props as-is
      return fallbackProps || ({} as Partial<T>);
    }

    const resolved = {
      ...(fallbackProps || {}),
      ...safeDataResult.data
    } as Partial<T>;

    return resolved;
  }, [isDataSourceAvailable, safeDataResult.data, fallbackProps]);

  // Build the data binding metadata (not currently returned but available for future use)
  // const metadata: DataBindingMeta = {
  //   loading: safeDataResult.loading,
  //   error: safeDataResult.error,
  //   dataSource,
  //   cached: false // TODO: Implement cache detection
  // };

  // Return resolved data with metadata, ensuring data properties aren't overridden
  return {
    ...resolvedData,
    // Metadata with explicit property names to avoid conflicts with data
    $loading: safeDataResult.loading,
    $error: safeDataResult.error,
    $dataSource: dataSource,
    $cached: false,
    // Keep old names for backward compatibility, but data takes precedence
    ...(Object.prototype.hasOwnProperty.call(resolvedData, 'loading') ? {} : { loading: safeDataResult.loading }),
    ...(Object.prototype.hasOwnProperty.call(resolvedData, 'error') ? {} : { error: safeDataResult.error }),
    cached: false
  } as T & DataBindingMeta;
}

// Old validation function removed - using new schema system

export default useDataBinding;