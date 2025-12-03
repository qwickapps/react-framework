# Migration Guide: useBaseProps to ViewSchema Pattern

**Complete migration guide from useBaseProps pattern to ViewSchema v2.0.0 architecture**

## Overview

This guide provides comprehensive instructions for migrating components from the legacy useBaseProps pattern to the new ViewSchema v2.0.0 architecture. The new pattern provides enhanced CMS integration, better type safety, comprehensive property support, and improved serialization capabilities.

## Table of Contents

1. [Migration Benefits](#migration-benefits)
2. [Architecture Comparison](#architecture-comparison)
3. [Step-by-Step Migration](#step-by-step-migration)
4. [Common Migration Patterns](#common-migration-patterns)
5. [Property Mapping](#property-mapping)
6. [Event Handler Migration](#event-handler-migration)
7. [Testing Migration](#testing-migration)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

## Migration Benefits

### 🚀 **Enhanced Capabilities**
- **Complete Property Coverage**: 40+ properties vs limited useBaseProps coverage
- **CMS Integration**: Direct integration with headless CMS systems
- **Schema Validation**: Built-in validation with class-validator
- **Type Safety**: Comprehensive TypeScript interfaces
- **Serialization**: Full component serialization support

### 🎯 **Improved Developer Experience**
- **Consistent Interface**: Standardized property interface across all components
- **Better IntelliSense**: Enhanced IDE support with comprehensive type definitions
- **Validation**: Runtime validation of properties
- **Documentation**: Rich editor metadata for CMS integration

### 🔧 **Architectural Advantages**
- **Future-Proof**: Designed for modern React patterns and CMS integration
- **Maintainable**: Centralized property management and validation
- **Extensible**: Easy to add new properties and capabilities
- **Performance**: Optimized property processing pipeline

## Architecture Comparison

### Legacy useBaseProps Pattern

```typescript
// Legacy approach
interface ComponentProps extends WithBaseProps {
  title: string;
  description: string;
}

function LegacyComponent({ title, description, ...baseProps }: ComponentProps) {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(baseProps);
  
  return (
    <Box {...htmlProps} {...styleProps} {...restProps}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Box>
  );
}
```

### New ViewSchema Pattern

```typescript
// New schema-driven approach
interface ComponentProps extends SchemaProps<ViewSchema> {
  title: string;
  description: string;
}

function ModernComponent({ title, description, ...schemaProps }: ComponentProps) {
  return (
    <Container {...schemaProps}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Container>
  );
}
```

### Key Differences

| Aspect | useBaseProps Pattern | ViewSchema Pattern |
|--------|---------------------|--------------------------|
| **Properties** | Limited subset (~15) | Complete coverage (40+) |
| **Type Safety** | Basic interface | Schema validation |
| **CMS Integration** | Manual implementation | Built-in support |
| **Serialization** | Custom implementation | Automatic support |
| **Event Handlers** | Function props | String-based for serialization |
| **Validation** | None | Built-in class-validator |
| **Documentation** | Manual | Rich editor metadata |

## Step-by-Step Migration

### Step 1: Update Imports

**Before:**
```typescript
import { WithBaseProps, useBaseProps } from '@qwickapps/react-framework/hooks';
import { Box } from '@mui/material';
```

**After:**
```typescript
import { SchemaProps, ViewSchema } from '@qwickapps/react-framework';
import { Container } from '@qwickapps/react-framework/components/base';
```

### Step 2: Update Interface

**Before:**
```typescript
interface MyComponentProps extends WithBaseProps {
  title: string;
  content: string;
  showHeader?: boolean;
}
```

**After:**
```typescript
interface MyComponentProps extends SchemaProps<ViewSchema> {
  title: string;
  content: string;
  showHeader?: boolean;
}
```

### Step 3: Update Component Implementation

**Before:**
```typescript
function MyComponent({ 
  title, 
  content, 
  showHeader = true, 
  ...baseProps 
}: MyComponentProps) {
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(baseProps);
  
  return (
    <Box {...htmlProps} {...styleProps} {...restProps}>
      {showHeader && <h1>{title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Box>
  );
}
```

**After:**
```typescript
function MyComponent({ 
  title, 
  content, 
  showHeader = true, 
  ...schemaProps 
}: MyComponentProps) {
  return (
    <Container {...schemaProps}>
      {showHeader && <h1>{title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
}
```

### Step 4: Update Usage Sites

**Before:**
```typescript
<MyComponent
  title="Hello World"
  content="<p>Content here</p>"
  padding="medium"
  background="primary.main"
  xs={12}
  sm={6}
/>
```

**After:**
```typescript
<MyComponent
  title="Hello World"
  content="<p>Content here</p>"
  padding="medium"
  background="primary.main"
  xs="12"
  sm="6"
/>
```

### Step 5: Add Serialization Support (Optional)

```typescript
// Add serialization capabilities
MyComponent.tagName = 'MyComponent';
MyComponent.version = '2.0.0';
MyComponent.fromJson = (jsonData: any) => <MyComponent {...jsonData} />;
```

## Common Migration Patterns

### 1. Basic Component Migration

**Before:**
```typescript
function SimpleCard({ children, ...baseProps }: WithBaseProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(baseProps);
  
  return (
    <Box {...htmlProps} {...styleProps}>
      {children}
    </Box>
  );
}
```

**After:**
```typescript
function SimpleCard({ children, ...schemaProps }: SchemaProps<ViewSchema>) {
  return (
    <Container {...schemaProps}>
      {children}
    </Container>
  );
}
```

### 2. Component with Custom Props

**Before:**
```typescript
interface CardProps extends WithBaseProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

function Card({ title, subtitle, actions, children, ...baseProps }: CardProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(baseProps);
  
  return (
    <Box {...htmlProps} {...styleProps}>
      <header>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <main>{children}</main>
      {actions && <footer>{actions}</footer>}
    </Box>
  );
}
```

**After:**
```typescript
interface CardProps extends SchemaProps<ViewSchema> {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

function Card({ title, subtitle, actions, children, ...schemaProps }: CardProps) {
  return (
    <Container {...schemaProps}>
      <header>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <main>{children}</main>
      {actions && <footer>{actions}</footer>}
    </Container>
  );
}
```

### 3. Class Component Migration

**Before:**
```typescript
interface ComponentState {
  expanded: boolean;
}

class ExpandableCard extends React.Component<WithBaseProps, ComponentState> {
  state: ComponentState = { expanded: false };
  
  toggleExpanded = () => {
    this.setState(prev => ({ expanded: !prev.expanded }));
  };
  
  render() {
    const { children, ...baseProps } = this.props;
    const { gridProps, styleProps, htmlProps } = useBaseProps(baseProps);
    
    return (
      <Box {...htmlProps} {...styleProps}>
        <button onClick={this.toggleExpanded}>
          {this.state.expanded ? 'Collapse' : 'Expand'}
        </button>
        {this.state.expanded && <div>{children}</div>}
      </Box>
    );
  }
}
```

**After:**
```typescript
interface ComponentState {
  expanded: boolean;
}

function ExpandableCard({ children, ...schemaProps }: SchemaProps<ViewSchema>) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);
  
  return (
    <Container {...schemaProps}>
      <button onClick={toggleExpanded}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
      {expanded && <div>{children}</div>}
    </Container>
  );
}
```

### 4. Component with Event Handlers

**Before:**
```typescript
interface InteractiveCardProps extends WithBaseProps {
  onCardClick?: (cardId: string) => void;
  onCardHover?: (cardId: string) => void;
  cardId: string;
}

function InteractiveCard({ 
  onCardClick, 
  onCardHover, 
  cardId, 
  children, 
  ...baseProps 
}: InteractiveCardProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(baseProps);
  
  return (
    <Box 
      {...htmlProps} 
      {...styleProps}
      onClick={() => onCardClick?.(cardId)}
      onMouseEnter={() => onCardHover?.(cardId)}
    >
      {children}
    </Box>
  );
}
```

**After:**
```typescript
interface InteractiveCardProps extends SchemaProps<ViewSchema> {
  cardId: string;
}

function InteractiveCard({ cardId, children, ...schemaProps }: InteractiveCardProps) {
  // Convert event handlers to string format for schema compatibility
  const schemaWithEvents = {
    ...schemaProps,
    onClick: `function(event) { 
      const cardId = '${cardId}';
      window.dispatchEvent(new CustomEvent('card-click', { detail: { cardId } })); 
    }`,
    onMouseEnter: `function(event) { 
      const cardId = '${cardId}';
      window.dispatchEvent(new CustomEvent('card-hover', { detail: { cardId } })); 
    }`
  };
  
  return (
    <Container {...schemaWithEvents}>
      {children}
    </Container>
  );
}
```

## Property Mapping

### Grid Properties

| useBaseProps | ViewSchema | Notes |
|-------------|-----------------|-------|
| `xs={6}` | `xs="6"` | String values for schema |
| `sm={4}` | `sm="4"` | String values for schema |
| `md={3}` | `md="3"` | String values for schema |
| `span={12}` | `span="12"` | String values for schema |

### Spacing Properties

| useBaseProps | ViewSchema | Notes |
|-------------|-----------------|-------|
| `padding="medium"` | `padding="medium"` | Direct mapping |
| `margin="large"` | `margin="large"` | Direct mapping |
| `paddingX="small"` | `paddingX="small"` | Enhanced with more options |
| `marginY="tiny"` | `marginY="tiny"` | Enhanced with more options |

### Styling Properties

| useBaseProps | ViewSchema | Notes |
|-------------|-----------------|-------|
| `className="my-class"` | `className="my-class"` | Direct mapping |
| `style={{ color: 'red' }}` | `style='{"color": "red"}'` | JSON string format |
| `background="primary"` | `background="primary"` | Enhanced theme support |

### New Properties in ViewSchema

Properties available in ViewSchema that weren't in useBaseProps:

```typescript
// Dimension properties
minWidth?: string;
minHeight?: string;
maxWidth?: string;
maxHeight?: string;

// Individual spacing sides
paddingTop?: string;
paddingRight?: string;
paddingBottom?: string;
paddingLeft?: string;
marginTop?: string;
marginRight?: string;
marginBottom?: string;
marginLeft?: string;

// Background enhancements
backgroundImage?: string;
backgroundGradient?: string;

// Text alignment
textAlign?: 'left' | 'center' | 'right' | 'justify';

// Event handlers
onClick?: string;
onMouseEnter?: string;
onMouseLeave?: string;
onFocus?: string;
onBlur?: string;

// Enhanced accessibility
role?: string;
'aria-label'?: string;
'aria-labelledby'?: string;
'aria-describedby'?: string;

// MUI integration
sx?: string; // MUI sx prop as JSON string
```

## Event Handler Migration

Event handlers require special attention during migration due to serialization requirements.

### Function Props to String Handlers

**Before:**
```typescript
interface ComponentProps extends WithBaseProps {
  onClick?: (event: MouseEvent) => void;
  onSubmit?: (data: any) => void;
}

function Component({ onClick, onSubmit, ...baseProps }: ComponentProps) {
  return (
    <Box {...useBaseProps(baseProps)} onClick={onClick}>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onSubmit?.(Object.fromEntries(formData));
      }}>
        {/* form content */}
      </form>
    </Box>
  );
}
```

**After:**
```typescript
interface ComponentProps extends SchemaProps<ViewSchema> {
  submitHandler?: string; // Custom handler name
}

function Component({ submitHandler = 'defaultSubmit', ...schemaProps }: ComponentProps) {
  const schemaWithEvents = {
    ...schemaProps,
    onClick: `function(event) { 
      console.log('Component clicked');
      // Custom click logic here
    }`,
    // Handle form submission differently
  };
  
  return (
    <Container {...schemaWithEvents}>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // Call custom handler or dispatch event
        if (window[submitHandler]) {
          window[submitHandler](Object.fromEntries(formData));
        }
      }}>
        {/* form content */}
      </form>
    </Container>
  );
}
```

### Complex Event Handler Migration

**Before:**
```typescript
function ComplexComponent({ onDataUpdate, ...baseProps }: ComponentProps) {
  const handleComplexInteraction = useCallback((data: any) => {
    // Complex logic
    const processedData = processData(data);
    onDataUpdate?.(processedData);
  }, [onDataUpdate]);
  
  return (
    <Box {...useBaseProps(baseProps)}>
      <button onClick={() => handleComplexInteraction({ source: 'button' })}>
        Update Data
      </button>
    </Box>
  );
}
```

**After:**
```typescript
function ComplexComponent({ ...schemaProps }: ComponentProps) {
  // Move complex logic to internal handler
  const handleComplexInteraction = useCallback((data: any) => {
    const processedData = processData(data);
    // Dispatch custom event instead of callback prop
    window.dispatchEvent(new CustomEvent('data-update', {
      detail: processedData,
      bubbles: true
    }));
  }, []);
  
  const schemaWithEvents = {
    ...schemaProps,
    onClick: `function(event) {
      // Simple event handler in schema
      const data = { source: 'button', timestamp: Date.now() };
      window.dispatchEvent(new CustomEvent('complex-interaction', {
        detail: data,
        bubbles: true
      }));
    }`
  };
  
  // Listen for custom events
  useEffect(() => {
    const handleEvent = (event: CustomEvent) => {
      handleComplexInteraction(event.detail);
    };
    
    window.addEventListener('complex-interaction', handleEvent as EventListener);
    return () => window.removeEventListener('complex-interaction', handleEvent as EventListener);
  }, [handleComplexInteraction]);
  
  return (
    <Container {...schemaWithEvents}>
      <button>Update Data</button>
    </Container>
  );
}
```

## Testing Migration

### Update Test Files

**Before:**
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

test('renders component with base props', () => {
  render(
    <MyComponent
      title="Test Title"
      padding="medium"
      background="primary"
      xs={12}
    />
  );
  
  const title = screen.getByText('Test Title');
  expect(title).toBeInTheDocument();
});
```

**After:**
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

test('renders component with schema props', () => {
  render(
    <MyComponent
      title="Test Title"
      padding="medium"
      background="primary"
      xs="12"
    />
  );
  
  const title = screen.getByText('Test Title');
  expect(title).toBeInTheDocument();
});
```

### Test Property Conversion

```typescript
import { convertSchemaToProps } from '@qwickapps/react-framework/components/base';

test('converts schema props correctly', () => {
  const schemaProps = {
    xs: "6",
    padding: "medium",
    sx: '{"color": "red"}'
  };
  
  const converted = convertSchemaToProps(schemaProps);
  
  expect(converted.xs).toBe(6);
  expect(converted.padding).toBe("medium");
  expect(converted.sx).toEqual({ color: "red" });
});
```

### Test Event Handler Conversion

```typescript
import { convertEventHandler } from '@qwickapps/react-framework/components/base';

test('converts event handlers correctly', () => {
  const handlerString = 'function(event) { console.log("clicked"); }';
  const handler = convertEventHandler(handlerString);
  
  expect(typeof handler).toBe('function');
  
  // Test handler execution (be careful with console.log in tests)
  const mockConsole = jest.spyOn(console, 'log').mockImplementation();
  handler?.({} as any);
  expect(mockConsole).toHaveBeenCalledWith('clicked');
  mockConsole.mockRestore();
});
```

## Troubleshooting

### Common Migration Issues

#### 1. Grid Property Type Errors

**Problem:**
```typescript
// Error: Type 'number' is not assignable to type 'string'
<MyComponent xs={6} />
```

**Solution:**
```typescript
// Use string values for schema compatibility
<MyComponent xs="6" />
```

#### 2. Event Handler Not Working

**Problem:**
```typescript
// Function props don't work with schema
<MyComponent onClick={() => console.log('click')} />
```

**Solution:**
```typescript
// Use string-based event handlers
<MyComponent onClick="function(event) { console.log('click'); }" />
```

#### 3. Complex Style Objects

**Problem:**
```typescript
// Object styles don't serialize
<MyComponent sx={{ color: 'red', fontWeight: 'bold' }} />
```

**Solution:**
```typescript
// Use JSON string format
<MyComponent sx='{"color": "red", "fontWeight": "bold"}' />
```

#### 4. Missing Properties

**Problem:**
```typescript
// Property 'customProp' does not exist on type 'SchemaProps<ViewSchema>'
<MyComponent customProp="value" />
```

**Solution:**
```typescript
// Extend the interface properly
interface MyComponentProps extends SchemaProps<ViewSchema> {
  customProp: string;
}
```

### Validation Errors

```typescript
// Handle validation errors gracefully
import { validate } from 'class-validator';

async function validateComponent(props: Partial<ViewSchema>) {
  const schema = Object.assign(new ViewSchema(), props);
  const errors = await validate(schema);
  
  if (errors.length > 0) {
    console.warn('Validation errors:', errors.map(e => e.constraints));
    return false;
  }
  
  return true;
}
```

### Runtime Issues

```typescript
// Debug property conversion
function DebugComponent(props: SchemaProps<ViewSchema>) {
  const convertedProps = convertSchemaToProps(props);
  console.log('Original props:', props);
  console.log('Converted props:', convertedProps);
  
  return <Container {...props} />;
}
```

## Best Practices

### 1. Incremental Migration

Migrate components incrementally rather than all at once:

```typescript
// Phase 1: Create new schema-based version alongside old one
export function ModernComponent(props: SchemaProps<ViewSchema>) {
  return <Container {...props} />;
}

// Phase 2: Update usage sites gradually
export function LegacyComponent(props: WithBaseProps) {
  // Temporarily bridge to new component
  return <ModernComponent {...props} />;
}

// Phase 3: Remove legacy component when all usage sites updated
```

### 2. Property Validation

Always validate schema properties:

```typescript
function SafeComponent(props: SchemaProps<ViewSchema>) {
  // Validate props in development
  if (process.env.NODE_ENV === 'development') {
    validateComponent(props).then(isValid => {
      if (!isValid) {
        console.warn('Invalid props passed to SafeComponent');
      }
    });
  }
  
  return <Container {...props} />;
}
```

### 3. Type Safety

Maintain strict TypeScript usage:

```typescript
// Good - Explicit typing
interface StrictComponentProps extends SchemaProps<ViewSchema> {
  title: string;
  required: true;
  optional?: boolean;
}

// Avoid - Any types
interface LooseComponentProps {
  [key: string]: any; // Avoid this
}
```

### 4. Testing Strategy

Test both old and new components during migration:

```typescript
describe('Component Migration', () => {
  test('legacy component works', () => {
    // Test legacy component
  });
  
  test('new component works', () => {
    // Test new schema-based component
  });
  
  test('props are converted correctly', () => {
    // Test property conversion
  });
  
  test('event handlers work correctly', () => {
    // Test event handler conversion
  });
});
```

### 5. Documentation Updates

Update documentation alongside code changes:

```typescript
/**
 * ModernComponent - Migrated to ViewSchema v2.0.0
 * 
 * @example
 * <ModernComponent
 *   title="Hello"
 *   padding="medium"
 *   xs="12"
 *   sm="6"
 *   onClick="function(event) { console.log('clicked'); }"
 * />
 * 
 * Migration notes:
 * - Grid props now use string values: xs="6" instead of xs={6}
 * - Event handlers use string format for serialization
 * - All ViewSchema properties now supported
 */
export function ModernComponent(props: SchemaProps<ViewSchema>) {
  return <Container {...props} />;
}
```

## Migration Checklist

### Pre-Migration Checklist

- [ ] Review current component usage patterns
- [ ] Identify all props being used
- [ ] Check for complex event handlers
- [ ] Review test coverage
- [ ] Plan incremental migration strategy

### Migration Checklist

- [ ] Update imports (remove useBaseProps, add ViewSchema)
- [ ] Update component interface (WithBaseProps → SchemaProps<ViewSchema>)
- [ ] Replace useBaseProps logic with Container
- [ ] Convert grid props from numbers to strings
- [ ] Convert event handlers from functions to strings
- [ ] Convert style objects to JSON strings
- [ ] Update tests to use new prop formats
- [ ] Add serialization support if needed
- [ ] Test component functionality thoroughly

### Post-Migration Checklist

- [ ] All tests passing
- [ ] Component renders correctly
- [ ] Event handlers work as expected
- [ ] Grid layout functions properly
- [ ] Accessibility features maintained
- [ ] Performance is acceptable
- [ ] Documentation updated
- [ ] Usage examples updated

## Conclusion

Migrating from useBaseProps to ViewSchema provides significant benefits in terms of CMS integration, type safety, and architectural consistency. The migration process, while requiring attention to detail, results in more maintainable and feature-rich components.

The key points to remember:

1. **Property Format Changes**: Grid props use strings, style objects use JSON strings
2. **Event Handler Changes**: Functions become strings for serialization compatibility
3. **Enhanced Capabilities**: Access to 40+ properties instead of limited useBaseProps coverage
4. **Type Safety**: Built-in validation and comprehensive TypeScript support
5. **Future-Proof**: Designed for modern React patterns and CMS integration

Take the migration step by step, test thoroughly, and enjoy the enhanced capabilities of the ViewSchema architecture.

## Related Documentation

- [ViewSchema v2.0.0](../../components/base/ViewSchema.md) - Complete schema documentation
- [Container](../../components/base/ModelView.md) - Component implementation details
- [Component Architecture](../component-system.md) - Overall architecture overview
- [Schema System](../schema-system.md) - Schema system architecture

---

**Copyright (c) 2025 QwickApps.com. All rights reserved.**

This migration guide ensures a smooth transition to the ViewSchema v2.0.0 architecture while maintaining functionality and improving capabilities.