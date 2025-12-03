# Component Architecture Overview

**Modern component architecture with ViewSchema v2.0.0, serialization, and CMS integration**

## Overview

The QwickApps React Framework component architecture has evolved to support modern development patterns with comprehensive CMS integration, component serialization, and enhanced developer experience. The architecture centers around ViewSchema v2.0.0, providing a unified interface for all UI components with complete property control and serialization capabilities.

## Table of Contents

1. [Architecture Principles](#architecture-principles)
2. [Component Hierarchy](#component-hierarchy)
3. [ViewSchema Architecture](#viewmodelschema-architecture)
4. [Component Layers](#component-layers)
5. [Property Processing Pipeline](#property-processing-pipeline)
6. [Serialization System](#serialization-system)
7. [Data Binding Integration](#data-binding-integration)
8. [Event System](#event-system)
9. [Testing Architecture](#testing-architecture)
10. [Performance Considerations](#performance-considerations)

## Architecture Principles

### 🎯 **Schema-Driven Design**
- **Unified Interface**: All components share a common ViewSchema interface
- **Type Safety**: Comprehensive TypeScript interfaces with validation
- **CMS Integration**: Direct integration with headless CMS systems
- **Serialization**: Complete component serialization for persistence and transmission

### 🧩 **Component Composition**
- **Functional Components**: Modern React functional component approach
- **Composition Over Inheritance**: Favor composition patterns
- **Reusable Patterns**: Standardized component patterns across the framework
- **Extensibility**: Easy to extend and customize components

### ⚡ **Performance First**
- **Memoization**: Intelligent property conversion caching
- **Lazy Loading**: Load components and validation on demand
- **Minimal Re-renders**: Optimized property change detection
- **Bundle Optimization**: Tree-shakable exports for minimal bundle size

### 🔒 **Security & Accessibility**
- **XSS Protection**: Safe content rendering with sanitization
- **WCAG Compliance**: Built-in accessibility features
- **Event Security**: Secure event handler conversion
- **Content Security**: CSP-friendly implementations

## Component Hierarchy

### Core Architecture Layers

```
Application Layer
├── QwickApp (Root)
├── ResponsiveMenu (Navigation)
└── Page System
    └── Page Components

Component Layer
├── Base Components
│   ├── Container (Core)
│   └── ViewSchema (Schema)
├── Layout Components
│   ├── GridLayout
│   ├── GridCell
│   └── Section
├── Block Components
│   ├── HeroBlock
│   ├── Content
│   └── Code
├── Form Components
│   ├── FormBlock
│   ├── TextInputField
│   └── SelectInputField
└── Utility Components
    ├── Logo
    ├── SafeSpan
    └── ThemeSwitcher

Infrastructure Layer
├── Schema System
│   ├── ViewSchema
│   ├── ComponentTransformer
│   └── Serialization
├── Hook System
│   ├── useBaseProps
│   ├── usePrintMode
│   └── useDataBinding
└── Utility System
    ├── Theme System
    ├── Accessibility
    └── Performance
```

### Component Classification

#### **Base Components**
Foundation components that other components build upon:
- `Container` - Core schema-driven component
- `ViewSchema` - Comprehensive property schema
- `LegacyModelView` - Backward compatibility layer

#### **Layout Components**
Components for page structure and responsive design:
- `GridLayout` - Responsive grid container
- `GridCell` - Grid item with breakpoint support
- `Section` - Page section container
- `CollapsibleLayout` - Expandable/collapsible sections

#### **Block Components**
Content-focused components for rich layouts:
- `HeroBlock` - Hero sections with background support
- `Content` - Content containers with variants
- `Code` - Syntax-highlighted code blocks
- `Image` - Responsive images with optimization
- `Text` - Typography with Material-UI integration

#### **Form Components**
Complete form system with serialization:
- `FormBlock` - Form container with status management
- `TextInputField` - Text input with validation
- `SelectInputField` - Select dropdown with options
- `HtmlInputField` - Rich text input
- `ChoiceInputField` - Checkbox/radio groups
- `SwitchInputField` - Boolean toggle switches

#### **Navigation Components**
Responsive navigation system:
- `ResponsiveMenu` - Adaptive navigation (mobile/tablet/desktop)
- `Menu` - Generic menu component
- `MenuItem` - Individual menu items with actions

## ViewSchema Architecture

### Schema Structure

```typescript
@Schema('ViewSchema', '2.0.0')
export class ViewSchema extends Model {
  // Grid Layout Properties (6 properties)
  span?: string;    // Column span: 'auto', 'grow', '1'-'12'
  xs?: string;      // Extra small breakpoint
  sm?: string;      // Small breakpoint  
  md?: string;      // Medium breakpoint
  lg?: string;      // Large breakpoint
  xl?: string;      // Extra large breakpoint
  
  // Styling Properties (3 properties)  
  className?: string;    // CSS class names
  sx?: string;          // MUI sx prop as JSON string
  style?: string;       // Inline styles as JSON string
  
  // Dimension Properties (6 properties)
  width?: string;       // Component width
  height?: string;      // Component height
  minWidth?: string;    // Minimum width constraint
  minHeight?: string;   // Minimum height constraint
  maxWidth?: string;    // Maximum width constraint
  maxHeight?: string;   // Maximum height constraint
  
  // Spacing Properties (14 properties)
  padding?: string;     // All-side padding
  paddingTop?: string;  // Individual side padding
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingX?: string;    // Horizontal padding
  paddingY?: string;    // Vertical padding
  margin?: string;      // All-side margin
  marginTop?: string;   // Individual side margins
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginX?: string;     // Horizontal margin
  marginY?: string;     // Vertical margin
  
  // Background Properties (3 properties)
  background?: string;         // Color, theme path, CSS value
  backgroundImage?: string;    // Image URL
  backgroundGradient?: string; // CSS gradient
  
  // Text Properties (1 property)
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  
  // HTML & Accessibility Properties (6 properties)
  id?: string;                 // Element ID
  role?: string;              // ARIA role
  'aria-label'?: string;      // Accessibility label
  'aria-labelledby'?: string; // Label references
  'aria-describedby'?: string; // Description references
  'data-testid'?: string;     // Test automation ID
  
  // Event Handler Properties (5 properties)
  onClick?: string;           // Click handler as JavaScript string
  onMouseEnter?: string;      // Mouse enter handler
  onMouseLeave?: string;      // Mouse leave handler
  onFocus?: string;          // Focus handler
  onBlur?: string;           // Blur handler
}
```

### Property Categories

#### **Grid Layout System**
Complete responsive grid integration with Material-UI:
```typescript
// Responsive breakpoint system
xs: "12"  // Full width on mobile
sm: "6"   // Half width on small screens
md: "4"   // Third width on medium screens
lg: "3"   // Quarter width on large screens
xl: "2"   // 1/6 width on extra large screens

// Special values
span: "auto"  // Automatic sizing
span: "grow"  // Grow to fill available space
```

#### **Dimension Control System**
Comprehensive dimensional control with multiple unit support:
```typescript
// T-shirt sizing
width: "small"   // Predefined size
height: "medium" // Predefined size

// CSS values
width: "300px"   // Pixel values
height: "50vh"   // Viewport relative

// Responsive keywords
maxWidth: "lg"   // Breakpoint reference
minWidth: "xs"   // Breakpoint reference
```

#### **Spacing System**
Precise spacing control with t-shirt sizing:
```typescript
// T-shirt sizes with pixel values
none: "0px"     // No spacing
tiny: "4px"     // Minimal spacing
small: "8px"    // Small spacing
medium: "16px"  // Standard spacing
large: "32px"   // Large spacing
huge: "64px"    // Maximum spacing

// Directional control
paddingX: "medium"  // Left + right padding
paddingY: "small"   // Top + bottom padding
marginTop: "large"  // Individual side control
```

## Component Layers

### Layer 1: Schema Foundation

The foundation layer provides the core schema and validation:

```typescript
// ViewSchema - Base schema for all components
@Schema('ViewSchema', '2.0.0')
export class ViewSchema extends Model {
  // 40+ properties for complete UI control
}

// Property validation with class-validator
@IsOptional()
@IsString()  
@IsIn(['left', 'center', 'right', 'justify'])
textAlign?: 'left' | 'center' | 'right' | 'justify';
```

### Layer 2: Component Implementation

Implementation layer with property conversion and rendering:

```typescript
// Container - Core implementation component
export function Container(props: ContainerProps) {
  // Convert schema properties to React props
  const convertedProps = useMemo(() => convertSchemaToProps(props), [props]);
  
  // Process properties through existing utility
  const { gridProps, styleProps, htmlProps } = useBaseProps(convertedProps);
  
  // Render as Material-UI Box with processed props
  return <Box {...htmlProps} {...styleProps}>{props.children}</Box>;
}
```

### Layer 3: Component Composition

Higher-level components built on the foundation:

```typescript
// Example: Card component using ViewSchema
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

### Layer 4: Application Integration

Application-level integration with CMS and data binding:

```typescript
// CMS-driven component rendering
function CMSComponent({ componentId }: { componentId: string }) {
  const [config, setConfig] = useState<ComponentConfig | null>(null);
  
  useEffect(() => {
    // Fetch component configuration from CMS
    fetchComponentConfig(componentId).then(setConfig);
  }, [componentId]);
  
  if (!config) return <div>Loading...</div>;
  
  // Render component with CMS-provided schema properties
  return (
    <Card {...config.schemaProps} title={config.content.title}>
      {config.content.body}
    </Card>
  );
}
```

## Property Processing Pipeline

### Pipeline Architecture

```
ViewSchema Props → convertSchemaToProps() → useBaseProps() → Material-UI Box
         ↓                        ↓                   ↓               ↓
   String Values      →    React Prop Types    → Processed Props → Final DOM
   JSON Strings       →    Object Values       → CSS Classes    → Styled Elements
   Event Strings      →    Function Handlers   → Event Binding  → Interactive Elements
```

### Step 1: Property Conversion

Convert schema string values to appropriate React prop types:

```typescript
function convertSchemaToProps(schema: Partial<ViewSchema>): ConvertedProps {
  return {
    // Grid conversion: strings to numbers or special values
    xs: convertGridValue(schema.xs),           // "6" → 6
    span: convertGridSpan(schema.span),        // "auto" → "auto"
    
    // JSON parsing: strings to objects  
    sx: parseJSONProp(schema.sx),              // '{"color":"red"}' → {color:"red"}
    style: parseJSONProp(schema.style),        // '{"margin":"10px"}' → {margin:"10px"}
    
    // Event conversion: strings to functions
    onClick: convertEventHandler(schema.onClick), // "function(){...}" → ()=>{...}
    
    // Pass-through values
    className: schema.className,               // Direct mapping
    padding: schema.padding,                   // Direct mapping
    background: schema.background              // Direct mapping
  };
}
```

### Step 2: Property Processing

Process converted properties through useBaseProps utility:

```typescript
function useBaseProps(props: ConvertedProps) {
  return {
    // Grid properties for responsive layout
    gridProps: extractGridProps(props),      // xs, sm, md, lg, xl, span
    
    // Style properties for visual presentation
    styleProps: extractStyleProps(props),    // sx, style, className, colors, spacing
    
    // HTML properties for DOM attributes
    htmlProps: extractHtmlProps(props),      // id, role, aria-*, data-*, events
    
    // Remaining properties
    restProps: extractRestProps(props)       // Any unprocessed properties
  };
}
```

### Step 3: Component Rendering

Apply processed properties to final rendered component:

```typescript
function Container(props: ContainerProps) {
  const convertedProps = convertSchemaToProps(props);
  const { gridProps, styleProps, htmlProps, restProps } = useBaseProps(convertedProps);
  
  return (
    <Box
      {...htmlProps}      // DOM attributes, events, accessibility
      {...styleProps}     // Styling, theming, spacing
      {...restProps}      // Additional properties
      component="div"     // Base element type
    >
      {props.children}
    </Box>
  );
}
```

## Serialization System

### Serialization Architecture

```typescript
interface Serializable {
  toJson(): any;  // Component instance → JSON data
}

interface SerializableConstructor {
  readonly tagName: string;    // Component identifier
  readonly version: string;    // Semantic version
  fromJson(jsonData: any): ReactElement;  // JSON data → React element
}
```

### Component Registration

```typescript
// Automatic registration on import
import { ComponentTransformer } from '@qwickapps/react-framework';

class MyComponent implements Serializable {
  static readonly tagName = 'MyComponent';
  static readonly version = '1.0.0';
  
  static fromJson(jsonData: any): ReactElement {
    return <MyComponent {...jsonData} />;
  }
  
  toJson(): any {
    return {
      // Component-specific properties
      title: this.props.title,
      // ALWAYS preserve data binding
      dataSource: this.props.dataSource,
      bindingOptions: this.props.bindingOptions
    };
  }
}

// Auto-registration when imported
ComponentTransformer.registerComponent(MyComponent);
```

### Serialization Example

```typescript
// Create component
const component = (
  <Card 
    title="Sample Card"
    padding="medium"
    xs="12"
    sm="6"
    onClick="function(event) { console.log('clicked'); }"
  >
    <p>Card content</p>
  </Card>
);

// Serialize to JSON
const serialized = ComponentTransformer.serialize(component);

// Serialized format:
{
  "tag": "Card",
  "version": "2.0.0", 
  "data": {
    "title": "Sample Card",
    "padding": "medium",
    "xs": "12",
    "sm": "6",
    "onClick": "function(event) { console.log('clicked'); }",
    "children": "<p>Card content</p>"
  }
}

// Deserialize back to component
const reconstructed = ComponentTransformer.deserialize(serialized);
```

## Data Binding Integration

### Data Binding Architecture

```typescript
interface WithDataBinding {
  dataSource?: string;           // API endpoint or data identifier
  bindingOptions?: BindingOptions; // Configuration for data fetching
}

interface BindingOptions {
  cache?: boolean;              // Enable response caching
  cacheTTL?: number;           // Cache time-to-live in milliseconds
  refreshInterval?: number;     // Auto-refresh interval
  transform?: string;          // Data transformation function
  fallback?: any;              // Fallback data when loading fails
}
```

### Data Binding Usage

```typescript
// Component with data binding
function DataBoundCard() {
  return (
    <Card
      // Data binding configuration
      dataSource="api/cards/featured"
      bindingOptions={{
        cache: true,
        cacheTTL: 300000,        // 5 minutes
        refreshInterval: 60000,   // 1 minute
        fallback: { title: "Loading...", content: "Please wait..." }
      }}
      
      // Static schema properties
      padding="medium"
      background="surface.main"
      xs="12"
      sm="6"
    />
  );
}
```

### Data Binding Implementation

```typescript
function useDataBinding(
  dataSource: string,
  staticProps: any,
  schema: any,
  options: BindingOptions = {}
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch data from source
    fetchDataFromSource(dataSource, options)
      .then(responseData => {
        // Transform data according to schema
        const boundData = bindDataToSchema(responseData, schema);
        setData({ ...staticProps, ...boundData });
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setData(options.fallback || staticProps);
        setLoading(false);
      });
  }, [dataSource, options.cacheTTL]);
  
  return { data, loading, error };
}
```

## Event System

### Event Handler Architecture

Event handlers in the schema system use strings for serialization compatibility:

```typescript
// String-based event handlers for schema
interface EventHandlers {
  onClick?: string;           // "function(event) { /* handler */ }"
  onMouseEnter?: string;      // Mouse interaction handlers
  onMouseLeave?: string;      // Mouse interaction handlers
  onFocus?: string;          // Focus/blur handlers
  onBlur?: string;           // Focus/blur handlers
}
```

### Event Handler Conversion

```typescript
function convertEventHandler(handlerStr?: string): ((event: any) => void) | undefined {
  if (!handlerStr) return undefined;
  
  try {
    // Create safe function from string
    const func = new Function('event', `
      try {
        ${handlerStr.startsWith('function') ? `return (${handlerStr})(event)` : handlerStr}
      } catch (error) {
        console.error('Error executing event handler:', error);
      }
    `);
    
    return (event: any) => func(event);
  } catch (error) {
    console.error('Error parsing event handler:', error);
    return undefined;
  }
}
```

### Event Handler Best Practices

```typescript
// Good - Simple, safe event handlers
const safeEventHandlers = {
  onClick: `
    function(event) {
      try {
        const id = event.currentTarget.dataset.itemId;
        window.location.href = '/item/' + id;
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  `,
  
  onMouseEnter: `
    function(event) {
      event.currentTarget.classList.add('hovered');
    }
  `
};

// Avoid - Complex or unsafe handlers
const unsafeEventHandlers = {
  onClick: `
    function(event) {
      eval(someUntrustedCode);              // DANGEROUS
      fetch('/api/complex-side-effect');    // AVOID SIDE EFFECTS
      window.globalComplexFunction();       // AVOID DEPENDENCIES
    }
  `
};
```

## Testing Architecture

### Testing Strategy

```typescript
describe('Component Architecture', () => {
  // Test schema property conversion
  describe('Property Conversion', () => {
    test('converts grid properties correctly', () => {
      const schema = { xs: "6", sm: "4", md: "auto" };
      const converted = convertSchemaToProps(schema);
      
      expect(converted.xs).toBe(6);
      expect(converted.sm).toBe(4);
      expect(converted.md).toBe("auto");
    });
    
    test('converts style objects correctly', () => {
      const schema = { sx: '{"color": "red"}' };
      const converted = convertSchemaToProps(schema);
      
      expect(converted.sx).toEqual({ color: "red" });
    });
  });
  
  // Test component rendering
  describe('Component Rendering', () => {
    test('renders with schema properties', () => {
      render(
        <Container
          padding="medium"
          background="primary.main"
          xs="12"
          data-testid="test-component"
        >
          <p>Test content</p>
        </Container>
      );
      
      const component = screen.getByTestId('test-component');
      expect(component).toHaveTextContent('Test content');
    });
  });
  
  // Test serialization
  describe('Component Serialization', () => {
    test('serializes and deserializes correctly', () => {
      const component = <TestComponent title="Test" padding="medium" />;
      const serialized = ComponentTransformer.serialize(component);
      const deserialized = ComponentTransformer.deserialize(serialized);
      
      expect(deserialized).toBeTruthy();
    });
  });
  
  // Test event handlers
  describe('Event System', () => {
    test('converts event handlers correctly', () => {
      const handlerStr = 'function(event) { console.log("test"); }';
      const handler = convertEventHandler(handlerStr);
      
      expect(typeof handler).toBe('function');
    });
  });
});
```

### Component Testing Utilities

```typescript
// Reusable test utility for schema-based components
export function testSchemaComponent<T>(
  ComponentClass: any,
  testCases: Array<{ name: string; props: T; expectedBehavior: string }>
) {
  describe(`${ComponentClass.name} Schema Tests`, () => {
    testCases.forEach(({ name, props, expectedBehavior }) => {
      test(`${name} - ${expectedBehavior}`, () => {
        render(React.createElement(ComponentClass, props));
        // Test specific behavior based on expectedBehavior
      });
    });
  });
}

// Performance testing utility
export function testComponentPerformance(
  ComponentClass: any,
  props: any,
  performanceThreshold: number = 5
) {
  test(`${ComponentClass.name} renders within performance threshold`, () => {
    const startTime = performance.now();
    render(React.createElement(ComponentClass, props));
    const endTime = performance.now();
    
    const renderTime = endTime - startTime;
    expect(renderTime).toBeLessThan(performanceThreshold);
  });
}
```

## Performance Considerations

### Performance Optimization Strategies

#### **1. Property Conversion Memoization**

```typescript
function OptimizedComponent(props: ContainerProps) {
  // Memoize expensive property conversion
  const convertedProps = useMemo(() => {
    return convertSchemaToProps(props);
  }, [props]);
  
  const processedProps = useMemo(() => {
    return useBaseProps(convertedProps);
  }, [convertedProps]);
  
  return <Box {...processedProps}>{props.children}</Box>;
}
```

#### **2. Selective Re-rendering**

```typescript
const MemoizedComponent = React.memo(function Component(props: ContainerProps) {
  return <Container {...props} />;
}, (prevProps, nextProps) => {
  // Custom comparison logic for schema properties
  return shallowEqual(prevProps, nextProps);
});
```

#### **3. Event Handler Caching**

```typescript
const eventHandlerCache = new Map<string, Function>();

function convertEventHandler(handlerStr?: string): Function | undefined {
  if (!handlerStr) return undefined;
  
  // Check cache first
  if (eventHandlerCache.has(handlerStr)) {
    return eventHandlerCache.get(handlerStr);
  }
  
  // Convert and cache
  const handler = createHandlerFromString(handlerStr);
  eventHandlerCache.set(handlerStr, handler);
  
  return handler;
}
```

#### **4. Schema Validation Optimization**

```typescript
// Validate schemas at build time when possible
const schemaValidationCache = new Map<string, boolean>();

async function validateSchemaOnce(schema: ViewSchema): Promise<boolean> {
  const schemaKey = JSON.stringify(schema);
  
  if (schemaValidationCache.has(schemaKey)) {
    return schemaValidationCache.get(schemaKey)!;
  }
  
  const isValid = await validate(schema);
  schemaValidationCache.set(schemaKey, isValid);
  
  return isValid;
}
```

### Performance Benchmarks

| Operation | Target Performance | Typical Performance |
|-----------|-------------------|-------------------|
| Property Conversion | <1ms | ~0.5ms |
| Event Handler Conversion | <0.5ms | ~0.2ms |
| Schema Validation | <3ms | ~2ms |
| Component Render | <5ms | ~3ms |
| Serialization | <2ms | ~1ms |
| Deserialization | <2ms | ~1.5ms |

### Performance Monitoring

```typescript
// Performance monitoring utility
function withPerformanceMonitoring<T>(
  componentName: string,
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  return function PerformanceMonitoredComponent(props: T) {
    const renderStartTime = useRef<number>();
    
    renderStartTime.current = performance.now();
    
    useEffect(() => {
      const renderTime = performance.now() - renderStartTime.current!;
      
      if (renderTime > 5) { // Threshold: 5ms
        console.warn(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
      
      // Send to analytics if needed
      if (window.analytics) {
        window.analytics.track('component_render_time', {
          component: componentName,
          renderTime: renderTime
        });
      }
    });
    
    return <WrappedComponent {...props} />;
  };
}
```

## Migration Strategies

### Incremental Migration Approach

1. **Phase 1**: Create new schema-based components alongside existing ones
2. **Phase 2**: Gradually update usage sites to use new components
3. **Phase 3**: Remove legacy components when all usage sites are updated
4. **Phase 4**: Optimize and enhance new components

### Component Migration Template

```typescript
// Legacy component (Phase 1)
function LegacyCard(props: WithBaseProps) {
  const { gridProps, styleProps, htmlProps } = useBaseProps(props);
  return <Box {...htmlProps} {...styleProps}>{props.children}</Box>;
}

// New schema-based component (Phase 1)
function ModernCard(props: SchemaProps<ViewSchema>) {
  return <Container {...props}>{props.children}</Container>;
}

// Bridge component (Phase 2) 
function Card(props: WithBaseProps | SchemaProps<ViewSchema>) {
  // Detect property format and route accordingly
  if ('xs' in props && typeof props.xs === 'number') {
    // Legacy format - convert to schema format
    return <ModernCard {...convertLegacyToSchema(props)} />;
  }
  // Schema format
  return <ModernCard {...props as SchemaProps<ViewSchema>} />;
}

// Final component (Phase 3)
export { ModernCard as Card };
```

## Future Enhancements

### Planned Architecture Improvements

1. **Enhanced Data Binding**: Complete data binding system integration
2. **Advanced Validation**: Custom validation rules and schema extensions
3. **Performance Optimization**: Further performance improvements and caching
4. **Tool Integration**: Enhanced IDE support and development tools
5. **CMS Enhancements**: Advanced CMS editor configurations
6. **Testing Tools**: Specialized testing utilities for schema-based components

### Extensibility Points

The architecture is designed with extensibility in mind:

```typescript
// Custom schema extensions
@Schema('CustomViewSchema', '1.0.0')
export class CustomViewSchema extends ViewSchema {
  @Field()
  customProperty?: string;
  
  @Field()
  customBehavior?: boolean;
}

// Custom component implementations
function CustomComponent(props: SchemaProps<CustomViewSchema>) {
  return (
    <Container {...props}>
      {/* Custom component logic */}
    </Container>
  );
}

// Custom property processors
function useCustomProps(props: Partial<CustomViewSchema>) {
  const baseProps = useBaseProps(props);
  
  return {
    ...baseProps,
    customProps: {
      customProperty: props.customProperty,
      customBehavior: props.customBehavior
    }
  };
}
```

## Related Documentation

- [ViewSchema v2.0.0](../components/base/ViewSchema.md) - Complete schema documentation
- [Container](../components/base/ModelView.md) - Core component implementation
- [Migration Guide](./migration-guides/useBaseProps-to-viewmodelschema.md) - Migration from legacy patterns
- [Schema System](./schema-system.md) - Detailed schema architecture
- [Serialization Guide](../guides/COMPONENT_SERIALIZATION_GUIDE.md) - Component serialization

---

**Copyright (c) 2025 QwickApps.com. All rights reserved.**

The QwickApps React Framework component architecture provides a modern, scalable foundation for building CMS-integrated React applications with complete type safety, serialization support, and exceptional developer experience.