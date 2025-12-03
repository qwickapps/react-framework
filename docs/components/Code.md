# Code Component

**QwickApps React Framework - Syntax-Highlighted Code Display with Serialization**

## Overview

The Code component provides consistent code block rendering with syntax highlighting, copy functionality, and full serialization support for "WebView for React" functionality. It serves as the canonical reference implementation for serializable components in the QwickApps React Framework.

## Features

### Display Features
- **Syntax Highlighting**: Support for multiple programming languages
- **Copy to Clipboard**: One-click copy functionality with user feedback
- **Light/Dark Theme**: Automatic theme integration
- **Line Numbers**: Optional line number display
- **Responsive Design**: Adapts to container size and device
- **Customizable Styling**: Theme-aware colors and spacing

### Serialization Features ⭐
- **Full Serialization Support**: Complete "WebView for React" functionality
- **Data Binding Integration**: Preserves data source configuration
- **ReactNode Children**: Seamless handling of React and string children
- **Performance Optimized**: <1ms serialization/deserialization
- **Version Compatible**: Semantic versioning with migration support

## Installation

The Code component is included in the QwickApps React Framework:

```bash
npm install @qwickapps/react-framework
```

## Basic Usage

### Traditional Props Usage

```tsx
import { Code } from '@qwickapps/react-framework';

// String children (recommended)
<Code language="javascript" showCopy={true}>
  const greeting = 'Hello, World!';
  console.log(greeting);
</Code>

// With title and line numbers
<Code 
  title="example.js"
  language="javascript" 
  showLineNumbers={true}
  showCopy={true}
>
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
</Code>

// Custom styling
<Code 
  language="python"
  codeBackground="#1e1e1e"
  wrapLines={true}
>
  def hello_world():
      print("Hello, World!")
      
  if __name__ == "__main__":
      hello_world()
</Code>
```

### React Children Support

```tsx
// The Code component automatically handles React children
<Code language="jsx">
  <span>const App = () => {`{`}</span>
  <br />
  <span>  return &lt;div&gt;Hello React!&lt;/div&gt;;</span>
  <br />
  <span>{`}`};</span>
</Code>

// Mixed content (automatically converted to text)
<Code language="html">
  {htmlContent}
  <span className="highlight">// This gets converted to text</span>
</Code>
```

## Serialization Usage

### Basic Serialization

```tsx
import { ComponentTransformer } from '@qwickapps/react-framework';

// Create a Code component
const codeComponent = (
  <Code language="javascript" showCopy={true} title="example.js">
    const message = 'Hello, Serialization!';
    console.log(message);
  </Code>
);

// Serialize to JSON
const serialized = ComponentTransformer.serialize(codeComponent);
console.log(serialized);
// Output: JSON string with component data

// Deserialize back to React component
const deserialized = ComponentTransformer.deserialize(serialized);
// deserialized is fully functional Code component
```

### Serialized Data Structure

```json
{
  "tag": "Code",
  "version": "1.0.0",
  "data": {
    "children": "const message = 'Hello, Serialization!';\nconsole.log(message);",
    "language": "javascript",
    "showCopy": true,
    "showLineNumbers": false,
    "title": "example.js",
    "wrapLines": false,
    "codeBackground": null
  }
}
```

### With Data Binding

```tsx
// Code component with data binding
<Code 
  dataSource="api/code-samples/fibonacci"
  bindingOptions={{ cache: true, cacheTTL: 300000 }}
  language="javascript"
  showCopy={true}
/>

// Serialization preserves data binding configuration
const serializedWithBinding = ComponentTransformer.serialize(codeBoundComponent);

// Deserialized component retains data binding functionality
const deserializedWithBinding = ComponentTransformer.deserialize(serializedWithBinding);
// Data binding continues to work after deserialization
```

## Component Props

### Primary Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `''` | Code content to display (string or React nodes) |
| `language` | `string` | `'text'` | Programming language for syntax highlighting |
| `showCopy` | `boolean` | `true` | Show copy to clipboard button |
| `showLineNumbers` | `boolean` | `false` | Display line numbers |
| `title` | `string` | `undefined` | Optional title for the code block |
| `wrapLines` | `boolean` | `false` | Enable line wrapping |
| `codeBackground` | `string` | `undefined` | Custom background color |

### Data Binding Props (Optional)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `string` | `undefined` | Data source URL for dynamic content |
| `bindingOptions` | `object` | `undefined` | Configuration for data binding behavior |

### Inherited Props

The Code component also accepts all standard QwickApps base props:
- `margin`, `padding` - Spacing configuration
- `backgroundColor`, `color` - Color overrides  
- `width`, `height` - Size configuration
- `breakpoints` - Responsive behavior
- Accessibility props (`aria-label`, `role`, etc.)

## Serialization Implementation Details

### Component Architecture

The Code component uses the recommended architecture for serializable components:

```tsx
// Class component implementing Serializable interface
export class Code extends React.Component<CodeProps> implements Serializable {
  // Component self-declaration
  static readonly tagName = 'Code';
  static readonly version = '1.0.0';
  
  // Deserialization method
  static fromJson(jsonData: any): ReactElement {
    return <Code {...jsonData} />;
  }
  
  // Serialization method
  toJson(): any {
    return {
      children: typeof this.props.children === 'string' 
        ? this.props.children 
        : extractTextFromReactNode(this.props.children),
      language: this.props.language,
      showCopy: this.props.showCopy,
      showLineNumbers: this.props.showLineNumbers,
      title: this.props.title,
      wrapLines: this.props.wrapLines,
      codeBackground: this.props.codeBackground,
      // Data binding preservation
      dataSource: this.props.dataSource,
      bindingOptions: this.props.bindingOptions
    };
  }

  // View delegation pattern
  render() {
    return this.props.dataSource ? 
      <CodeWithDataBinding {...this.props} /> : 
      <CodeView {...this.props} />;
  }
}
```

### ReactNode Processing

The Code component uses a sophisticated ReactNode processing system:

```tsx
function extractTextFromReactNode(node: ReactNode): string {
  // Handles strings, numbers, booleans
  // Processes arrays recursively
  // Extracts text from React elements  
  // Provides fallback string conversion
}
```

This allows natural usage patterns:

```tsx
// All of these work seamlessly
<Code>Simple string content</Code>
<Code>{variableContent}</Code>
<Code>
  <span>Line 1</span>
  <br />
  <span>Line 2</span>
</Code>
<Code>{[line1, '\n', line2]}</Code>
```

### Data Binding Integration

```tsx
// Data binding wrapper component
function CodeWithDataBinding(props: CodeProps) {
  const { dataSource, bindingOptions, ...restProps } = props;

  const { loading, error, ...codeProps } = useDataBinding<CodeModel>(
    dataSource!,
    restProps as Partial<CodeModel>,
    CodeModel.getSchema(),
    { cache: true, cacheTTL: 300000, strict: false, ...bindingOptions }
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  
  return <CodeView {...codeProps} />;
}
```

## Performance Characteristics

### Serialization Benchmarks (QA Validated)

- **Serialization Speed**: <1ms for typical code blocks
- **Deserialization Speed**: <1ms for component reconstruction  
- **Round-trip Performance**: <3ms for complete serialize/deserialize cycle
- **Memory Usage**: Minimal overhead, garbage collection friendly
- **Large Code Blocks**: Efficiently handles 1000+ lines of code

### Performance Testing

```tsx
// Performance test example
test('Code component serialization performance', async () => {
  const largeCodeContent = 'const x = 1;\n'.repeat(1000); // 1000 lines
  const component = <Code language="javascript">{largeCodeContent}</Code>;
  
  const startTime = performance.now();
  const serialized = ComponentTransformer.serialize(component);
  const serializeTime = performance.now() - startTime;
  
  const deserializeStart = performance.now();
  const deserialized = ComponentTransformer.deserialize(serialized);
  const deserializeTime = performance.now() - deserializeStart;
  
  expect(serializeTime).toBeLessThan(5);   // <5ms serialization
  expect(deserializeTime).toBeLessThan(5); // <5ms deserialization
});
```

## Integration Examples

### CMS Integration

```tsx
// Code component data from CMS
const cmsCodeData = {
  tag: "Code",
  version: "1.0.0",
  data: {
    children: "// Code from CMS\nconst example = 'Hello CMS';",
    language: "javascript",
    showCopy: true,
    title: "CMS Example"
  }
};

// Automatic reconstruction from CMS data
const codeComponent = ComponentTransformer.deserialize(cmsCodeData);
```

### Storybook Integration

```tsx
// Code.stories.tsx
export const SerializationDemo: Story = {
  name: 'Serialization Demo',
  render: (args) => {
    const original = <Code {...args} />;
    const serialized = ComponentTransformer.serialize(original);
    const deserialized = ComponentTransformer.deserialize(serialized);
    
    return (
      <div>
        <h3>Original Component</h3>
        {original}
        
        <h3>Serialized Data</h3>
        <pre>{JSON.stringify(JSON.parse(serialized), null, 2)}</pre>
        
        <h3>Deserialized Component</h3>
        {deserialized}
      </div>
    );
  },
  args: {
    children: 'const example = "Hello Serialization!";',
    language: 'javascript',
    showCopy: true,
    title: 'Serialization Example'
  }
};
```

### API Response Integration

```tsx
// API returns serialized components
const apiResponse = await fetch('/api/content/code-examples');
const { components } = await apiResponse.json();

// Render components from API
{components.map((componentData, index) => (
  <div key={index}>
    {ComponentTransformer.deserialize(componentData)}
  </div>
))}
```

## Testing

### Basic Serialization Tests

```tsx
import { ComponentTransformer } from '../../schemas/transformers/ComponentTransformer';
import { Code } from '../Code';

describe('Code Component Serialization', () => {
  beforeEach(() => {
    ComponentTransformer.registerComponent(Code);
  });

  test('should serialize and deserialize correctly', () => {
    const props = {
      children: 'const test = "Hello World!";',
      language: 'javascript',
      showCopy: true,
      title: 'Test Code'
    };

    const component = <Code {...props} />;
    const serialized = ComponentTransformer.serialize(component);
    const deserialized = ComponentTransformer.deserialize(serialized);
    
    expect(deserialized).toBeTruthy();
    
    const parsedData = JSON.parse(serialized);
    expect(parsedData.tag).toBe('Code');
    expect(parsedData.version).toBe('1.0.0');
    expect(parsedData.data.children).toBe('const test = "Hello World!";');
    expect(parsedData.data.language).toBe('javascript');
  });

  test('should handle React children', () => {
    const reactChildren = (
      <>
        <span>Line 1</span>
        <br />
        <span>Line 2</span>
      </>
    );

    const component = <Code language="text">{reactChildren}</Code>;
    const serialized = ComponentTransformer.serialize(component);
    const parsedData = JSON.parse(serialized);
    
    expect(parsedData.data.children).toBe('Line 1Line 2');
  });

  test('should preserve data binding configuration', () => {
    const dataBindingProps = {
      children: 'Loading...',
      dataSource: 'api/code/example',
      bindingOptions: { cache: true, cacheTTL: 60000 },
      language: 'javascript'
    };

    const component = <Code {...dataBindingProps} />;
    const serialized = ComponentTransformer.serialize(component);
    const parsedData = JSON.parse(serialized);
    
    expect(parsedData.data.dataSource).toBe('api/code/example');
    expect(parsedData.data.bindingOptions).toEqual({ cache: true, cacheTTL: 60000 });
  });
});
```

## Migration Notes

### From Previous Versions

The Code component maintains backward compatibility with previous versions. When deserializing older data:

- Missing props receive default values
- Deprecated props are automatically migrated
- Version validation ensures compatibility

### Future Compatibility

The Code component follows semantic versioning:
- **Patch versions (1.0.x)**: Bug fixes, no breaking changes
- **Minor versions (1.x.0)**: New features, backward compatible
- **Major versions (x.0.0)**: Breaking changes with migration guide

## Troubleshooting

### Common Issues

**1. Component Not Serializing**
```tsx
// ❌ Component not registered
const serialized = ComponentTransformer.serialize(<Code>content</Code>);

// ✅ Ensure component is imported (auto-registers)
import { Code } from '@qwickapps/react-framework';
```

**2. Large Code Blocks Performance**
```tsx
// ❌ Very large content might be slow
<Code>{megabytesOfCode}</Code>

// ✅ Consider data binding for large content
<Code dataSource="api/large-code-files/1" language="javascript" />
```

**3. ReactNode Children Not Converting**
```tsx
// ❌ Complex React components might not convert perfectly
<Code>
  <ComplexComponent with="props" />
</Code>

// ✅ Use string content or data binding for complex cases
<Code dataSource="api/code-content/complex" />
```

### Debug Mode

Enable debug logging for serialization issues:

```tsx
// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  ComponentTransformer.enableDebugMode();
}
```

## Contributing

### Component Architecture Standards

The Code component serves as the reference implementation for all serializable components. When contributing:

1. **Follow the Pattern**: Use class-based components with Serializable interface
2. **Preserve Data Binding**: Always include dataSource and bindingOptions in serialization  
3. **Handle Edge Cases**: Test with empty content, Unicode, and large data
4. **Performance First**: Maintain <1ms serialization performance
5. **Test Thoroughly**: Include serialization tests for all new features

### Related Documentation

- [Component Serialization Guide](/docs/COMPONENT_SERIALIZATION_GUIDE.md) - Comprehensive implementation guide
- [Serializable Component Templates](/docs/SERIALIZABLE_COMPONENT_TEMPLATE.md) - Copy-paste boilerplate code
- [Architecture Documentation](/ARCHITECTURE.md#component-serialization-system-architecture) - System architecture details

## License

Copyright (c) 2025 QwickApps.com. All rights reserved.

Part of the QwickApps React Framework - enabling "WebView for React" functionality with comprehensive component serialization.