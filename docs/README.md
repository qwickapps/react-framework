# QwickApps React Framework Documentation

**Comprehensive documentation for the QwickApps React Framework v1.4.1**

Welcome to the complete documentation for the QwickApps React Framework - a modern, schema-driven React component library with advanced print support, component serialization, and CMS integration capabilities.

## 📚 Documentation Structure

### 🏗️ Architecture
Comprehensive architecture documentation and design principles:

- **[Component System](./architecture/component-system.md)** - Complete component architecture with ViewSchema v2.0.0
- **[Schema System](./architecture/schema-system.md)** - Component serialization and data binding architecture

#### Migration Guides
- **[useBaseProps to ViewSchema](./architecture/migration-guides/useBaseProps-to-viewmodelschema.md)** - Complete migration guide for the new architecture

### 🧩 Components
Detailed component documentation organized by category:

#### Base Components
- **[ViewSchema](./components/base/ViewSchema.md)** - Comprehensive base schema for all components (v2.0.0)
- **[Container](./components/base/Container.md)** - Core schema-driven component implementation

#### Application Components
- **[QwickApp](./components/QwickApp.md)** - Root application wrapper
- **[ResponsiveMenu](./components/ResponsiveMenu.md)** - Adaptive navigation system
- **[SafeSpan](./components/SafeSpan.md)** - XSS-protected content renderer
- **[AccessibilityChecker](./components/AccessibilityChecker.md)** - Accessibility validation

#### Layout Components
- **[GridLayout](./components/layout/GridLayout.md)** - Responsive grid container with serialization
- **[GridCell](./components/layout/GridCell.md)** - Grid items with breakpoint support
- **[GridCellWrapper](./components/layout/GridCellWrapper.md)** - Grid cell wrapper utilities

#### Block Components
- **[Code](./components/blocks/Code.md)** - Syntax-highlighted code blocks (Reference Implementation)
- **[HeroBlock](./components/blocks/HeroBlock.md)** - Hero sections with complex serialization
- **[Content](./components/blocks/Content.md)** - Content containers with variants
- **[Section](./components/blocks/Section.md)** - Page section containers
- **[FeatureGrid](./components/blocks/FeatureGrid.md)** - Feature showcase grids
- **[FeatureCard](./components/blocks/FeatureCard.md)** - Individual feature cards
- **[Footer](./components/blocks/Footer.md)** - Page footer components
- **[CoverImageHeader](./components/blocks/CoverImageHeader.md)** - Cover image headers
- **[PageBannerHeader](./components/blocks/PageBannerHeader.md)** - Page banner headers

#### Form Components
- **[FormBlock](./components/forms/FormBlock.md)** - Form container with status management
- **[TextInputField](./components/input/TextInputField.md)** - Text input with serialization
- **[SelectInputField](./components/input/SelectInputField.md)** - Select dropdown with options
- **[HtmlInputField](./components/input/HtmlInputField.md)** - Rich text input field
- **[ChoiceInputField](./components/input/ChoiceInputField.md)** - Checkbox/radio groups
- **[TextField](./components/input/TextField.md)** - Basic text field component

#### Button Components
- **[Button](./components/buttons/Button.md)** - Enhanced button component
- **[ThemeSwitcher](./components/buttons/ThemeSwitcher.md)** - Theme toggle controls
- **[PaletteSwitcher](./components/buttons/PaletteSwitcher.md)** - Color palette controls

#### Utility Components
- **[Logo](./components/Logo.md)** - Dynamic logo component
- **[Scaffold](./components/Scaffold.md)** - Application scaffolding

#### Menu Components
- **[Menu](./components/menu/Menu.md)** - Generic menu component
- **[MenuItem](./components/menu/MenuItem.md)** - Individual menu items

#### Page Components
- **[Page](./components/pages/Page.md)** - Advanced page component with print support
- **[FormPage](./components/pages/FormPage.md)** - Form-specific page layouts

### 📖 Guides
Comprehensive implementation and usage guides:

- **[Component Serialization Guide](./guides/COMPONENT_SERIALIZATION_GUIDE.md)** - Complete serialization implementation guide
- **[Serializable Component Template](./guides/SERIALIZABLE_COMPONENT_TEMPLATE.md)** - Copy-paste boilerplate for new components

### 🔧 API Reference
API documentation and technical references:

- **[Build Configurations](./examples/build-configs.md)** - Build and deployment configurations

## 🚀 Quick Start

### Basic Installation and Setup

```bash
npm install @qwickapps/react-framework
```

```tsx
import { 
  QwickApp, 
  ResponsiveMenu, 
  Container 
} from '@qwickapps/react-framework';

function App() {
  return (
    <QwickApp appName="MyApp" appId="com.mycompany.app">
      <ResponsiveMenu items={menuItems} />
      
      <Container
        padding="large"
        background="surface.main"
        xs="12"
        md="6"
        role="main"
        aria-label="Main content area"
      >
        <h1>Welcome to MyApp</h1>
        <p>Built with QwickApps React Framework</p>
      </Container>
    </QwickApp>
  );
}
```

## 🆕 What's New in v1.4.1

### ViewSchema v2.0.0 Architecture
- **Complete UI Control**: 40+ properties for comprehensive component customization
- **Schema-Driven Development**: Type-safe, validated component properties
- **CMS Integration**: Direct integration with headless CMS systems
- **Enhanced Serialization**: Full component serialization with data binding preservation

### Advanced Print System
- **Intelligent Print Detection**: Automatic print mode via URL parameters and browser events
- **Professional Print Layouts**: Headers, footers, margins, backgrounds with CSS variable system
- **Print Configuration**: Complete PrintConfigSchema with theme control and optimization
- **Edge-to-Edge Printing**: Configurable margins from 0mm to 25mm with automatic CSS application

### Component Serialization System
- **"WebView for React"**: Serialize React components to JSON and reconstruct with full functionality
- **Production-Ready Components**: 11+ components with complete ModelView architecture
- **Complex Serialization**: Nested components, responsive layouts, and form state preservation
- **Performance Optimized**: <1ms serialization, handles 1000+ components efficiently

### Enhanced Developer Experience
- **Migration Guide**: Complete guide from useBaseProps to ViewSchema patterns
- **Comprehensive Documentation**: Organized documentation with architectural overviews
- **Type Safety**: Full TypeScript support with validation
- **Testing Utilities**: Enhanced testing tools and component validation

## 📋 Key Concepts

### ViewSchema v2.0.0
The foundation of all components, providing:
- **Grid Layout System**: Responsive breakpoints (xs, sm, md, lg, xl) with Material-UI integration
- **Comprehensive Spacing**: T-shirt sizing (tiny, small, medium, large, huge) with directional control
- **Advanced Styling**: Theme integration, CSS variables, and MUI sx prop support
- **Complete Accessibility**: WCAG 2.1 AA compliance with ARIA attributes
- **Event System**: String-based event handlers for CMS compatibility

### Component Serialization
Transform React components into JSON and back:
```tsx
// Serialize component to JSON
const serialized = ComponentTransformer.serialize(
  <Code language="javascript" showCopy={true}>
    const example = 'Hello, World!';
  </Code>
);

// Reconstruct from JSON
const component = ComponentTransformer.deserialize(serialized);
```

### Print System Integration
Professional print layouts with complete control:
```tsx
<Page
  title="Document Title"
  printConfig={{
    theme: 'light',
    hideScaffolding: true,
    printHeader: 'CONFIDENTIAL',
    printFooter: 'Page [page] of [total]',
    pageMargins: '20mm',
    showPrintDate: true
  }}
>
  <h1>Printable Content</h1>
</Page>
```

### CMS Integration
Direct integration with headless CMS systems:
```tsx
// Schema properties stored as JSON in CMS
const cmsConfig = {
  padding: "medium",
  background: "surface.main",
  xs: "12",
  sm: "6",
  onClick: "function(event) { /* CMS-defined handler */ }"
};

// Render from CMS data
<Container {...cmsConfig}>
  {cmsContent}
</Container>
```

## 🛠️ Development Workflow

### Component Development
1. **Start with ViewSchema**: Extend SchemaProps<ViewSchema> for all components
2. **Use Container**: Wrap content with Container for schema support
3. **Add Serialization**: Implement serialization support for CMS compatibility
4. **Test Thoroughly**: Use provided testing utilities and validation

### Migration from Legacy Components
1. **Read Migration Guide**: Follow the comprehensive [migration guide](./architecture/migration-guides/useBaseProps-to-viewmodelschema.md)
2. **Update Interfaces**: Change from WithBaseProps to SchemaProps<ViewSchema>
3. **Convert Properties**: Update grid props from numbers to strings
4. **Test Integration**: Ensure all functionality is preserved

## 🎯 Best Practices

### Property Usage
```tsx
// Good - Schema-compatible properties
<Container
  xs="12"           // String values for serialization
  sm="6"            // String values for grid props
  padding="medium"  // T-shirt sizing
  sx='{"borderRadius": 2}'  // JSON strings for complex objects
  onClick="function(event) { console.log('clicked'); }"  // String handlers
/>
```

### Component Architecture
```tsx
// Recommended component structure
interface MyComponentProps extends SchemaProps<ViewSchema> {
  title: string;
  description: string;
}

function MyComponent({ title, description, ...schemaProps }: MyComponentProps) {
  return (
    <Container {...schemaProps}>
      <h2>{title}</h2>
      <p>{description}</p>
    </Container>
  );
}

// Add serialization support
MyComponent.tagName = 'MyComponent';
MyComponent.version = '2.0.0';
MyComponent.fromJson = (jsonData: any) => <MyComponent {...jsonData} />;
```

## 🧪 Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import { validateComponent } from '@qwickapps/react-framework/testing';

test('component renders with schema properties', async () => {
  const props = {
    title: 'Test Component',
    padding: 'medium',
    xs: '12',
    sm: '6'
  };
  
  // Validate schema properties
  const isValid = await validateComponent(props);
  expect(isValid).toBe(true);
  
  // Test rendering
  render(<MyComponent {...props} />);
  expect(screen.getByText('Test Component')).toBeInTheDocument();
});
```

### Serialization Testing
```tsx
import { ComponentTransformer } from '@qwickapps/react-framework';

test('component serializes and deserializes correctly', () => {
  const component = <MyComponent title="Test" padding="medium" />;
  
  // Test serialization
  const serialized = ComponentTransformer.serialize(component);
  expect(serialized).toBeTruthy();
  
  // Test deserialization
  const deserialized = ComponentTransformer.deserialize(serialized);
  expect(deserialized).toBeTruthy();
});
```

## 📝 Contributing

### Documentation Updates
When adding new components or features:

1. **Component Documentation**: Create comprehensive component docs in appropriate category
2. **Architecture Updates**: Update architecture docs for significant changes
3. **Migration Guides**: Create migration guides for breaking changes
4. **Examples**: Provide working examples and use cases
5. **Testing**: Include testing examples and utilities

### Code Standards
- **TypeScript First**: All components must have comprehensive TypeScript interfaces
- **Schema Integration**: New components should extend ViewSchema
- **Serialization**: Components should support serialization when appropriate
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Testing**: Include comprehensive unit and integration tests

## 🔗 External Links

- **[GitHub Repository](https://github.com/qwickapps/react-framework)** - Source code and issues
- **[QwickApps.com](https://qwickapps.com)** - Official website and ecosystem
- **[NPM Package](https://www.npmjs.com/package/@qwickapps/react-framework)** - Package registry

## 📄 License

This software is licensed under the **PolyForm Shield License 1.0.0**.

- ✅ Free to use for non-competitive purposes
- ✅ Source code available for learning and development
- ❌ Cannot be used to compete with QwickApps
- ❌ Cannot be reverse engineered for competitive purposes

For complete license terms, see [LICENSE](../LICENSE) and [LICENSE-POLYFORM-SHIELD.txt](../LICENSE-POLYFORM-SHIELD.txt).

**Need commercial licensing?** Contact us at **legal@qwickapps.com**

---

**Copyright (c) 2025 QwickApps.com. All rights reserved.**

This documentation provides comprehensive guidance for using the QwickApps React Framework effectively. For the most up-to-date information, always refer to the specific component documentation and architecture guides.