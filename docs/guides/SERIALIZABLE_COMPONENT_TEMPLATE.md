# Serializable Component Templates

**QwickApps React Framework - Copy-Paste Boilerplate Templates**

This document provides ready-to-use templates for implementing serializable components. Copy the appropriate template and customize it for your specific component needs.

## Table of Contents

1. [Basic Component Template](#basic-component-template)
2. [Component with Complex Props](#component-with-complex-props)
3. [Component with Nested Children](#component-with-nested-children)
4. [Component with Data Binding](#component-with-data-binding)
5. [Component with Arrays/Objects](#component-with-arraysObjects)
6. [Component with Error Handling](#component-with-error-handling)
7. [Utility Functions](#utility-functions)
8. [Test Templates](#test-templates)

## Basic Component Template

### Simple Component with Basic Props

```typescript
import React, { ReactNode, ReactElement } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Serializable } from '../../schemas/types/Serializable';
import { useBaseProps } from '../../hooks';

// Define component props interface
export interface BasicComponentProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  color?: string;
  // Add your custom props here
}

// Functional view component (for Material-UI and hooks)
function BasicComponentView({
  title,
  subtitle,
  children,
  variant = 'default',
  color,
  ...restProps
}: BasicComponentProps) {
  const { styleProps, htmlProps } = useBaseProps(restProps);

  return (
    <Paper
      {...htmlProps}
      {...styleProps}
      variant={variant === 'outlined' ? 'outlined' : 'elevation'}
      elevation={variant === 'elevated' ? 2 : 0}
      sx={{
        p: 2,
        borderColor: color,
        ...styleProps.sx
      }}
    >
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      
      {children && (
        <Box sx={{ mt: 1 }}>
          {typeof children === 'string' ? (
            <Typography variant="body1">{children}</Typography>
          ) : (
            children
          )}
        </Box>
      )}
    </Paper>
  );
}

// Serializable class component
export class BasicComponent extends React.Component<BasicComponentProps> implements Serializable {
  // Component self-declaration
  static readonly tagName = 'BasicComponent';
  static readonly version = '1.0.0';
  
  // Deserialization: JSON data → React element
  static fromJson(jsonData: any): ReactElement {
    return <BasicComponent {...jsonData} />;
  }
  
  // Serialization: Component instance → JSON data
  toJson(): any {
    return {
      title: this.props.title,
      subtitle: this.props.subtitle,
      children: typeof this.props.children === 'string' 
        ? this.props.children 
        : extractTextFromReactNode(this.props.children),
      variant: this.props.variant,
      color: this.props.color,
      // Add your serializable props here
    };
  }

  render() {
    return <BasicComponentView {...this.props} />;
  }
}

// Utility function for children processing
function extractTextFromReactNode(node: ReactNode): string {
  if (node === null || node === undefined) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (typeof node === 'boolean') {
    return node ? 'true' : 'false';
  }

  if (Array.isArray(node)) {
    return node.map(child => extractTextFromReactNode(child)).join('');
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    const element = node as any;
    if (element.props && element.props.children) {
      return extractTextFromReactNode(element.props.children);
    }
  }

  return String(node);
}

export default BasicComponent;
```

## Component with Complex Props

### Component Handling Objects, Arrays, and Nested Data

```typescript
import React, { ReactNode, ReactElement } from 'react';
import { Card, CardContent, Typography, List, ListItem, Chip } from '@mui/material';
import { Serializable } from '../../schemas/types/Serializable';

// Complex data interfaces
export interface ComplexItem {
  id: string;
  name: string;
  value: number;
  metadata?: Record<string, any>;
}

export interface ComplexConfig {
  theme: string;
  layout: 'grid' | 'list' | 'card';
  itemsPerPage: number;
  sortBy: string;
  filters: string[];
}

export interface ComplexComponentProps {
  title: string;
  items: ComplexItem[];
  config: ComplexConfig;
  metadata?: Record<string, any>;
  tags?: string[];
  // Add more complex props as needed
}

function ComplexComponentView({
  title,
  items = [],
  config,
  metadata = {},
  tags = [],
  ...restProps
}: ComplexComponentProps) {
  return (
    <Card {...restProps}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>
        
        {tags.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {tags.map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
            ))}
          </div>
        )}
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Layout: {config.layout} | Items: {items.length}
        </Typography>
        
        <List dense>
          {items.slice(0, config.itemsPerPage).map(item => (
            <ListItem key={item.id}>
              <div>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Value: {item.value}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export class ComplexComponent extends React.Component<ComplexComponentProps> implements Serializable {
  static readonly tagName = 'ComplexComponent';
  static readonly version = '1.0.0';
  
  static fromJson(jsonData: any): ReactElement {
    // Handle data validation and migration if needed
    const validatedData = ComplexComponent.validateJsonData(jsonData);
    return <ComplexComponent {...validatedData} />;
  }
  
  // Validation method for complex data
  private static validateJsonData(data: any): ComplexComponentProps {
    return {
      title: data.title || 'Untitled',
      items: Array.isArray(data.items) ? data.items : [],
      config: {
        theme: data.config?.theme || 'default',
        layout: data.config?.layout || 'list',
        itemsPerPage: data.config?.itemsPerPage || 10,
        sortBy: data.config?.sortBy || 'name',
        filters: Array.isArray(data.config?.filters) ? data.config.filters : [],
      },
      metadata: data.metadata || {},
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  }
  
  toJson(): any {
    return {
      title: this.props.title,
      items: this.props.items.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        metadata: item.metadata || {},
      })),
      config: {
        theme: this.props.config.theme,
        layout: this.props.config.layout,
        itemsPerPage: this.props.config.itemsPerPage,
        sortBy: this.props.config.sortBy,
        filters: [...this.props.config.filters],
      },
      metadata: { ...this.props.metadata },
      tags: [...this.props.tags],
    };
  }

  render() {
    return <ComplexComponentView {...this.props} />;
  }
}

export default ComplexComponent;
```

## Component with Data Binding

### Component with QwickApps Data Binding Integration

```typescript
import React, { ReactNode, ReactElement } from 'react';
import { 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { WithDataBinding } from '@qwickapps/schema';
import { useDataBinding } from '../../hooks';
import { Serializable } from '../../schemas/types/Serializable';
import DataBoundModel from '../../schemas/DataBoundSchema'; // Your schema model

// Extend WithDataBinding for data binding support
export interface DataBoundComponentProps extends WithDataBinding {
  title: string;
  description?: string;
  showMetadata?: boolean;
  // Your component-specific props
}

// View component
function DataBoundComponentView({
  title,
  description,
  showMetadata = false,
  ...restProps
}: Omit<DataBoundComponentProps, 'dataSource' | 'bindingOptions'>) {
  return (
    <Paper sx={{ p: 2 }} {...restProps}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      
      {description && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
      )}
      
      {showMetadata && (
        <Typography variant="caption" display="block" color="text.secondary">
          Loaded from data source
        </Typography>
      )}
    </Paper>
  );
}

// Data binding wrapper component
function DataBoundComponentWithDataBinding(props: DataBoundComponentProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  // Use data binding hook
  const { 
    dataSource: _source, 
    loading, 
    error, 
    cached, 
    ...boundProps 
  } = useDataBinding<DataBoundModel>(
    dataSource!,
    restProps as Partial<DataBoundModel>,
    DataBoundModel.getSchema(),
    { 
      cache: true, 
      cacheTTL: 300000, 
      strict: false, 
      ...bindingOptions 
    }
  );

  // Loading state
  if (loading) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading...
        </Typography>
      </Paper>
    );
  }

  // Error state
  if (error) {
    console.error('Error loading data:', error);
    
    // Show error in development, fallback in production
    if (process.env.NODE_ENV !== 'production') {
      return (
        <Alert severity="error">
          Error Loading Data: {error.message}
        </Alert>
      );
    }
    
    // Use fallback props in production
    return <DataBoundComponentView {...restProps} />;
  }

  // Success - render with bound data
  return <DataBoundComponentView {...boundProps} showMetadata={cached} />;
}

// Serializable class component
export class DataBoundComponent extends React.Component<DataBoundComponentProps> implements Serializable {
  static readonly tagName = 'DataBoundComponent';
  static readonly version = '1.0.0';
  
  static fromJson(jsonData: any): ReactElement {
    return <DataBoundComponent {...jsonData} />;
  }
  
  toJson(): any {
    return {
      title: this.props.title,
      description: this.props.description,
      showMetadata: this.props.showMetadata,
      
      // CRITICAL: Always preserve data binding configuration
      dataSource: this.props.dataSource,
      bindingOptions: this.props.bindingOptions,
    };
  }

  render() {
    const { dataSource, bindingOptions, ...restProps } = this.props;

    // Route to appropriate component based on data binding
    if (!dataSource) {
      return <DataBoundComponentView {...restProps} />;
    }

    return <DataBoundComponentWithDataBinding {...this.props} />;
  }
}

export default DataBoundComponent;
```

## Component with Arrays/Objects

### Component Managing Collections and Complex Data

```typescript
import React, { ReactNode, ReactElement } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Chip
} from '@mui/material';
import { Serializable } from '../../schemas/types/Serializable';

// Data interfaces
export interface TableItem {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  value: number;
  tags: string[];
  metadata: Record<string, any>;
}

export interface TableColumn {
  field: keyof TableItem;
  label: string;
  width?: number;
  sortable?: boolean;
}

export interface CollectionComponentProps {
  title: string;
  items: TableItem[];
  columns: TableColumn[];
  maxItems?: number;
  showSummary?: boolean;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

function CollectionComponentView({
  title,
  items = [],
  columns = [],
  maxItems = 100,
  showSummary = true,
  sortBy,
  sortDirection = 'asc'
}: CollectionComponentProps) {
  // Sort items if needed
  const sortedItems = React.useMemo(() => {
    if (!sortBy) return items;
    
    return [...items].sort((a, b) => {
      const aValue = a[sortBy as keyof TableItem];
      const bValue = b[sortBy as keyof TableItem];
      
      let result = 0;
      if (aValue < bValue) result = -1;
      if (aValue > bValue) result = 1;
      
      return sortDirection === 'desc' ? -result : result;
    });
  }, [items, sortBy, sortDirection]);

  const displayItems = sortedItems.slice(0, maxItems);
  
  const summary = React.useMemo(() => {
    const activeCount = items.filter(item => item.status === 'active').length;
    const totalValue = items.reduce((sum, item) => sum + item.value, 0);
    
    return { activeCount, totalValue, totalItems: items.length };
  }, [items]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      
      {showSummary && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {summary.totalItems} items • {summary.activeCount} active • Total value: {summary.totalValue}
        </Typography>
      )}
      
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell 
                  key={column.field}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayItems.map(item => (
              <TableRow key={item.id}>
                {columns.map(column => (
                  <TableCell key={column.field}>
                    {column.field === 'status' ? (
                      <Chip 
                        label={item[column.field]} 
                        size="small"
                        color={
                          item.status === 'active' ? 'success' : 
                          item.status === 'inactive' ? 'error' : 'warning'
                        }
                      />
                    ) : column.field === 'tags' ? (
                      <div>
                        {item.tags.slice(0, 2).map(tag => (
                          <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
                        ))}
                        {item.tags.length > 2 && (
                          <Typography variant="caption">+{item.tags.length - 2}</Typography>
                        )}
                      </div>
                    ) : (
                      String(item[column.field])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {items.length > maxItems && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Showing {maxItems} of {items.length} items
        </Typography>
      )}
    </Paper>
  );
}

export class CollectionComponent extends React.Component<CollectionComponentProps> implements Serializable {
  static readonly tagName = 'CollectionComponent';
  static readonly version = '1.0.0';
  
  static fromJson(jsonData: any): ReactElement {
    // Validate and clean data
    const validatedData = CollectionComponent.validateData(jsonData);
    return <CollectionComponent {...validatedData} />;
  }
  
  private static validateData(data: any): CollectionComponentProps {
    return {
      title: data.title || 'Collection',
      items: Array.isArray(data.items) ? data.items.map(CollectionComponent.validateItem) : [],
      columns: Array.isArray(data.columns) ? data.columns : [],
      maxItems: typeof data.maxItems === 'number' ? data.maxItems : 100,
      showSummary: typeof data.showSummary === 'boolean' ? data.showSummary : true,
      sortBy: data.sortBy,
      sortDirection: data.sortDirection === 'desc' ? 'desc' : 'asc',
    };
  }
  
  private static validateItem(item: any): TableItem {
    return {
      id: item.id || String(Math.random()),
      name: item.name || 'Unnamed',
      status: ['active', 'inactive', 'pending'].includes(item.status) ? item.status : 'pending',
      value: typeof item.value === 'number' ? item.value : 0,
      tags: Array.isArray(item.tags) ? item.tags : [],
      metadata: item.metadata || {},
    };
  }
  
  toJson(): any {
    return {
      title: this.props.title,
      items: this.props.items.map(item => ({
        id: item.id,
        name: item.name,
        status: item.status,
        value: item.value,
        tags: [...item.tags],
        metadata: { ...item.metadata },
      })),
      columns: this.props.columns.map(column => ({
        field: column.field,
        label: column.label,
        width: column.width,
        sortable: column.sortable,
      })),
      maxItems: this.props.maxItems,
      showSummary: this.props.showSummary,
      sortBy: this.props.sortBy,
      sortDirection: this.props.sortDirection,
    };
  }

  render() {
    return <CollectionComponentView {...this.props} />;
  }
}

export default CollectionComponent;
```

## Component with Error Handling

### Robust Component with Comprehensive Error Handling

```typescript
import React, { ReactNode, ReactElement } from 'react';
import { Alert, Paper, Typography, Button } from '@mui/material';
import { Serializable } from '../../schemas/types/Serializable';

export interface ErrorHandledComponentProps {
  title: string;
  content?: string;
  children?: ReactNode;
  validateContent?: boolean;
  fallbackContent?: string;
}

// Error boundary for component errors
class ErrorBoundaryView extends React.Component<
  { children: ReactNode; fallback: ReactNode }, 
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function ErrorHandledComponentView({
  title,
  content,
  children,
  validateContent = true,
  fallbackContent = 'No content available'
}: ErrorHandledComponentProps) {
  // Content validation
  const validatedContent = React.useMemo(() => {
    if (!validateContent) return content;
    
    try {
      // Example validation: check for potentially harmful content
      if (content && content.includes('<script>')) {
        console.warn('Potentially unsafe content detected, using fallback');
        return fallbackContent;
      }
      
      return content;
    } catch (error) {
      console.error('Error validating content:', error);
      return fallbackContent;
    }
  }, [content, validateContent, fallbackContent]);

  const errorFallback = (
    <Alert severity="error" sx={{ m: 2 }}>
      <Typography variant="h6">Component Error</Typography>
      <Typography variant="body2">
        This component encountered an error and cannot be displayed properly.
      </Typography>
      <Button 
        size="small" 
        onClick={() => window.location.reload()} 
        sx={{ mt: 1 }}
      >
        Reload Page
      </Button>
    </Alert>
  );

  return (
    <ErrorBoundaryView fallback={errorFallback}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        
        {validatedContent && (
          <Typography variant="body1" paragraph>
            {validatedContent}
          </Typography>
        )}
        
        {children && (
          <div>
            {typeof children === 'string' ? (
              <Typography variant="body1">{children}</Typography>
            ) : (
              children
            )}
          </div>
        )}
        
        {!validatedContent && !children && (
          <Typography variant="body2" color="text.secondary" style={{ fontStyle: 'italic' }}>
            {fallbackContent}
          </Typography>
        )}
      </Paper>
    </ErrorBoundaryView>
  );
}

export class ErrorHandledComponent extends React.Component<ErrorHandledComponentProps> implements Serializable {
  static readonly tagName = 'ErrorHandledComponent';
  static readonly version = '1.0.0';
  
  static fromJson(jsonData: any): ReactElement {
    try {
      // Validate and sanitize JSON data
      const safeData = ErrorHandledComponent.sanitizeData(jsonData);
      return <ErrorHandledComponent {...safeData} />;
    } catch (error) {
      console.error('Error deserializing ErrorHandledComponent:', error);
      
      // Return safe fallback component
      return (
        <ErrorHandledComponent 
          title="Error Loading Component"
          content="This component could not be loaded due to data errors."
          validateContent={false}
        />
      );
    }
  }
  
  private static sanitizeData(data: any): ErrorHandledComponentProps {
    // Sanitize and validate all input data
    const sanitized: ErrorHandledComponentProps = {
      title: typeof data.title === 'string' ? data.title : 'Untitled Component',
      validateContent: true,
      fallbackContent: 'Content unavailable',
    };
    
    // Safely handle content
    if (typeof data.content === 'string') {
      sanitized.content = data.content;
    }
    
    // Safely handle children
    if (typeof data.children === 'string') {
      sanitized.children = data.children;
    }
    
    // Handle boolean flags
    if (typeof data.validateContent === 'boolean') {
      sanitized.validateContent = data.validateContent;
    }
    
    if (typeof data.fallbackContent === 'string') {
      sanitized.fallbackContent = data.fallbackContent;
    }
    
    return sanitized;
  }
  
  toJson(): any {
    try {
      return {
        title: this.props.title,
        content: this.props.content,
        children: typeof this.props.children === 'string' 
          ? this.props.children 
          : extractTextFromReactNode(this.props.children),
        validateContent: this.props.validateContent,
        fallbackContent: this.props.fallbackContent,
      };
    } catch (error) {
      console.error('Error serializing ErrorHandledComponent:', error);
      
      // Return minimal safe data
      return {
        title: this.props.title || 'Error Component',
        content: 'Serialization error occurred',
        validateContent: true,
        fallbackContent: 'Content unavailable',
      };
    }
  }

  render() {
    return <ErrorHandledComponentView {...this.props} />;
  }
}

// Utility function (same as in basic template)
function extractTextFromReactNode(node: ReactNode): string {
  if (node === null || node === undefined) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (typeof node === 'boolean') {
    return node ? 'true' : 'false';
  }

  if (Array.isArray(node)) {
    return node.map(child => extractTextFromReactNode(child)).join('');
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    const element = node as any;
    if (element.props && element.props.children) {
      return extractTextFromReactNode(element.props.children);
    }
  }

  return String(node);
}

export default ErrorHandledComponent;
```

## Utility Functions

### Reusable Utility Functions for Component Serialization

```typescript
// File: src/utils/serializationUtils.ts

import { ReactNode } from 'react';

/**
 * Extract text content from ReactNode for serialization
 * Handles all common ReactNode types safely
 */
export function extractTextFromReactNode(node: ReactNode): string {
  if (node === null || node === undefined) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (typeof node === 'boolean') {
    return node ? 'true' : 'false';
  }

  if (Array.isArray(node)) {
    return node.map(child => extractTextFromReactNode(child)).join('');
  }

  // Handle React elements
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const element = node as any;
    if (element.props && element.props.children) {
      return extractTextFromReactNode(element.props.children);
    }
  }

  // Fallback: convert to string
  return String(node);
}

/**
 * Safely serialize function props (exclude them)
 */
export function excludeFunctionProps(props: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (typeof value !== 'function') {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
}

/**
 * Deep clone object for safe serialization
 */
export function safeClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => safeClone(item)) as unknown as T;
  }
  
  const cloned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value !== 'function') {
      cloned[key] = safeClone(value);
    }
  }
  
  return cloned;
}

/**
 * Validate component version for migration
 */
export function isVersionCompatible(componentVersion: string, dataVersion?: string): boolean {
  if (!dataVersion) return true;
  
  const [compMajor] = componentVersion.split('.').map(Number);
  const [dataMajor] = dataVersion.split('.').map(Number);
  
  // Compatible if same major version
  return compMajor === dataMajor;
}

/**
 * Safe property access with fallback
 */
export function safeGet<T>(obj: any, path: string, fallback: T): T {
  try {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === null || current === undefined || !(key in current)) {
        return fallback;
      }
      current = current[key];
    }
    
    return current;
  } catch {
    return fallback;
  }
}
```

## Test Templates

### Comprehensive Test Templates for Serializable Components

```typescript
// File: src/components/__tests__/ComponentName.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import { ComponentTransformer } from '../../schemas/transformers/ComponentTransformer';
import { YourComponent } from '../YourComponent';

describe('YourComponent Serialization', () => {
  beforeEach(() => {
    // Ensure component is registered
    ComponentTransformer.registerComponent(YourComponent);
  });

  afterEach(() => {
    // Clean up registry
    ComponentTransformer.clearRegistry();
  });

  describe('Basic Serialization', () => {
    test('should serialize and deserialize correctly', () => {
      const props = {
        title: 'Test Component',
        subtitle: 'Test subtitle',
        children: 'Test content',
      };

      const component = <YourComponent {...props} />;
      
      // Serialize
      const serialized = ComponentTransformer.serialize(component);
      expect(serialized).toBeTruthy();
      
      // Deserialize
      const deserialized = ComponentTransformer.deserialize(serialized);
      expect(deserialized).toBeTruthy();
      
      // Verify structure
      const parsedData = JSON.parse(serialized);
      expect(parsedData.tag).toBe('YourComponent');
      expect(parsedData.version).toBe('1.0.0');
      expect(parsedData.data.title).toBe('Test Component');
    });

    test('should handle missing optional props', () => {
      const minimalProps = { title: 'Minimal Test' };
      const component = <YourComponent {...minimalProps} />;
      
      const serialized = ComponentTransformer.serialize(component);
      const deserialized = ComponentTransformer.deserialize(serialized);
      
      expect(deserialized).toBeTruthy();
      
      const parsedData = JSON.parse(serialized);
      expect(parsedData.data.title).toBe('Minimal Test');
    });

    test('should exclude function props', () => {
      const props = {
        title: 'Test',
        onClick: () => console.log('clicked'),
        onHover: () => console.log('hovered'),
      };

      const component = <YourComponent {...props} />;
      const serialized = ComponentTransformer.serialize(component);
      const parsedData = JSON.parse(serialized);
      
      expect(parsedData.data.title).toBe('Test');
      expect(parsedData.data.onClick).toBeUndefined();
      expect(parsedData.data.onHover).toBeUndefined();
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty children', () => {
      const props = { title: 'Test', children: '' };
      const component = <YourComponent {...props} />;
      
      const serialized = ComponentTransformer.serialize(component);
      const parsedData = JSON.parse(serialized);
      
      expect(parsedData.data.children).toBe('');
    });

    test('should handle null/undefined values', () => {
      const props = {
        title: 'Test',
        subtitle: null,
        children: undefined,
      };

      const component = <YourComponent {...props} />;
      const serialized = ComponentTransformer.serialize(component);
      const parsedData = JSON.parse(serialized);
      
      expect(parsedData.data.title).toBe('Test');
      // null/undefined handling depends on your implementation
    });

    test('should handle Unicode and special characters', () => {
      const unicodeProps = {
        title: '🚀 Unicode Test 中文 🎉',
        content: 'Special chars: <>&"\'',
        emoji: '👨‍💻👩‍🚀🏳️‍🌈',
      };

      const component = <YourComponent {...unicodeProps} />;
      const serialized = ComponentTransformer.serialize(component);
      const parsedData = JSON.parse(serialized);
      
      expect(parsedData.data.title).toBe(unicodeProps.title);
      expect(parsedData.data.content).toBe(unicodeProps.content);
      expect(parsedData.data.emoji).toBe(unicodeProps.emoji);
    });
  });

  describe('Performance', () => {
    test('should handle large data sets efficiently', () => {
      const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: i * 10,
      }));

      const props = { title: 'Large Data', items: largeDataSet };
      const component = <YourComponent {...props} />;
      
      const startTime = performance.now();
      const serialized = ComponentTransformer.serialize(component);
      const serializeTime = performance.now() - startTime;
      
      const deserializeStart = performance.now();
      const deserialized = ComponentTransformer.deserialize(serialized);
      const deserializeTime = performance.now() - deserializeStart;
      
      expect(serializeTime).toBeLessThan(50);   // <50ms serialization
      expect(deserializeTime).toBeLessThan(50); // <50ms deserialization
      expect(deserialized).toBeTruthy();
    });

    test('should handle repeated serialization efficiently', () => {
      const props = { title: 'Performance Test', items: [] };
      const component = <YourComponent {...props} />;
      
      const iterations = 100;
      const startTime = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        ComponentTransformer.serialize(component);
      }
      
      const endTime = performance.now();
      const avgTime = (endTime - startTime) / iterations;
      
      expect(avgTime).toBeLessThan(5); // <5ms average per operation
    });
  });

  describe('Data Binding (if applicable)', () => {
    test('should preserve data binding configuration', () => {
      const propsWithDataBinding = {
        title: 'Data Bound Component',
        dataSource: 'api/components/test',
        bindingOptions: { cache: true, cacheTTL: 60000 },
      };

      const component = <YourComponent {...propsWithDataBinding} />;
      const serialized = ComponentTransformer.serialize(component);
      const parsedData = JSON.parse(serialized);
      
      expect(parsedData.data.dataSource).toBe('api/components/test');
      expect(parsedData.data.bindingOptions).toEqual({ 
        cache: true, 
        cacheTTL: 60000 
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed JSON gracefully', () => {
      // Test with malformed data
      const malformedData = { 
        tag: 'YourComponent', 
        version: '1.0.0',
        data: { /* missing required props */ }
      };
      
      expect(() => {
        YourComponent.fromJson(malformedData.data);
      }).not.toThrow();
    });

    test('should provide meaningful error messages', () => {
      // Test error scenarios specific to your component
      console.spyOn(console, 'error').mockImplementation(() => {});
      
      try {
        // Trigger an error condition
        YourComponent.fromJson({});
      } catch (error) {
        expect(error).toBeDefined();
      }
      
      console.error.mockRestore();
    });
  });
});

// Generic test helper (reusable across components)
export function testComponentSerialization<T>(
  componentName: string,
  ComponentClass: any,
  testCases: Array<{ name: string; props: T; expectedData?: Partial<T> }>
) {
  describe(`${componentName} Serialization`, () => {
    beforeEach(() => {
      ComponentTransformer.registerComponent(ComponentClass);
    });

    testCases.forEach(({ name, props, expectedData }) => {
      test(name, () => {
        const component = React.createElement(ComponentClass, props);
        
        const serialized = ComponentTransformer.serialize(component);
        const deserialized = ComponentTransformer.deserialize(serialized);
        
        expect(deserialized).toBeTruthy();
        
        const parsedData = JSON.parse(serialized);
        expect(parsedData.tag).toBe(ComponentClass.tagName);
        expect(parsedData.version).toBe(ComponentClass.version);
        
        if (expectedData) {
          Object.entries(expectedData).forEach(([key, value]) => {
            expect(parsedData.data[key]).toEqual(value);
          });
        }
      });
    });
  });
}
```

---

## Usage Instructions

1. **Choose the appropriate template** based on your component's complexity and requirements
2. **Copy the template** into your component file
3. **Customize the interfaces and props** for your specific use case
4. **Implement the view logic** in the functional component
5. **Update the serialization methods** to handle your specific props
6. **Add tests** using the provided test templates
7. **Register your component** by importing it in your application

## Best Practices Reminder

- Always preserve `dataSource` and `bindingOptions` for data-bound components
- Exclude function props from serialization
- Use `extractTextFromReactNode` for consistent children processing
- Handle edge cases with proper validation
- Implement version migration for component evolution
- Test thoroughly with the provided test patterns

These templates provide a solid foundation for implementing serializable components in the QwickApps React Framework while maintaining consistency, performance, and reliability across your component library.