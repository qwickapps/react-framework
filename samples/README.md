# QwickApps React Framework Samples

This folder contains sample code demonstrating how to use the QwickApps React Framework components and features.

## Available Samples

### FrameworkDemo.tsx
**Complete framework demonstration** showing:
- Responsive navigation system
- Layout blocks (HeroBlock, Section, Content)
- Grid layouts and feature grids
- Theme integration
- Custom logo implementation
- Responsive breakpoint behavior

**Key Features Demonstrated:**
- QwickApp root component setup
- ResponsiveMenu with badges and navigation
- HeroBlock with background gradients and actions
- Multi-column layouts with GridLayout
- FeatureGrid component usage
- CSS custom properties for theming
- Component serialization examples (Code, Image, Text, HeroBlock, GridLayout, GridCell)
- Form components with state management (TextInputField, SelectInputField, FormBlock)

### ContentSample.tsx  
**Html and Markdown components demonstration** showing:
- HTML string to React component transformation
- Markdown to React component conversion
- Custom transformation rules
- Error handling and fallbacks
- Integration with existing Framework components

**Key Features Demonstrated:**
- Html component with default transformation rules
- Markdown component with syntax highlighting
- Custom TransformRule configuration
- Error handling in development vs production
- CMS integration patterns
- Side-by-side comparison of transformation approaches

### BasicSample.js
**Simple JavaScript example** showing:
- Basic QwickApp setup
- Simple component usage
- Minimal configuration approach

### CustomPaletteSample.js
**Theme and palette demonstration** showing:
- Custom palette creation
- Palette switching functionality
- Theme mode switching (light/dark/system)
- CSS custom property usage

## Running the Samples

### In Storybook (Recommended)

The samples are integrated into the Framework's Storybook for interactive exploration:

```bash
# Start Storybook
npm run storybook

# Navigate to the "Samples" section to explore each demo
```

### As Standalone Components

Each sample is designed as a standalone React component that can be imported and used:

```tsx
// Import any sample
import { FrameworkDemo } from './samples/FrameworkDemo';
import { ContentSample } from './samples/ContentSample';

// Use in your app
function App() {
  return (
    <div>
      <FrameworkDemo />
      {/* or */}
      <ContentSample />
    </div>
  );
}
```

### In Your Own Project

To use these samples as a starting point for your own application:

1. **Install the Framework:**
   ```bash
   npm install @qwickapps/react-framework
   ```

2. **Copy and modify any sample:**
   ```tsx
   import React from 'react';
   import {
     QwickApp,
     ResponsiveMenu,
     HeroBlock,
     Section,
     Content
   } from '@qwickapps/react-framework';

   // Start with a sample and customize to your needs
   function MyApp() {
     return (
       <QwickApp appName="My Application">
         {/* Your content here */}
       </QwickApp>
     );
   }
   ```

## Sample Categories

### Layout and Navigation
- **FrameworkDemo.tsx**: Complete responsive layout with navigation
- Shows responsive menu, hero sections, grid layouts
- **Component Serialization**: Demonstrates serializable components (Code, Image, Text, HeroBlock, GridLayout, GridCell)

### Content Management
- **ContentSample.tsx**: Html and Markdown component usage
- Demonstrates CMS integration patterns, content transformation

### Form Components and Serialization
- **FrameworkDemo.tsx**: Includes form component examples
- **Form State Management**: TextInputField, SelectInputField, HtmlInputField, ChoiceInputField, SwitchInputField, FormBlock
- **Serialization Examples**: Complete form workflows with state preservation through serialize/deserialize cycles
- **Validation Patterns**: Form validation rules and error handling preservation

### Theming and Styling
- **CustomPaletteSample.js**: Theme and palette customization
- Shows dynamic theme switching, custom palette creation

### Basic Integration
- **BasicSample.js**: Minimal setup and basic component usage
- Good starting point for new projects

## Key Concepts Demonstrated

### Responsive Design
All samples demonstrate:
- Automatic navigation adaptation (mobile → tablet → desktop)
- Responsive grid layouts
- Flexible content containers
- Breakpoint-aware styling

### Theme Integration
Samples show how to:
- Use CSS custom properties for theming
- Switch between light/dark modes
- Apply different color palettes
- Create theme-aware components

### Content Transformation
Content samples demonstrate:
- HTML string to React component conversion
- Markdown rendering with syntax highlighting
- Custom transformation rules
- Error handling and fallbacks
- CMS integration patterns

### Component Composition
All samples illustrate:
- Proper component nesting and hierarchy
- Base props system usage
- Layout block composition
- Feature integration patterns

### Component Serialization
Samples demonstrate:
- "WebView for React" functionality with JSON serialization
- Form state management preservation through serialize/deserialize cycles
- Complex data structure handling (options arrays, HTML content, validation configurations)
- Production form workflows (creation, editing, validation, submission) preservation
- CMS integration with serializable components
- Performance-optimized serialization (0.4ms average for form components)

## Best Practices Shown

### Performance
- Tree-shakable imports
- Efficient component composition
- Proper memoization patterns
- Minimal re-renders

### Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML structure

### Developer Experience
- TypeScript usage throughout
- Clear prop interfaces
- Comprehensive error handling
- Development vs production behavior

### Security
- Safe HTML rendering
- XSS protection patterns
- Content sanitization
- Secure fallback mechanisms

## Customization Examples

### Creating Custom Transformation Rules

```tsx
import { TransformRule, TransformConfig } from '@qwickapps/react-framework';

const myCustomRules: TransformRule[] = [
  {
    selector: '.my-custom-class',
    transform: (element, key) => (
      <MyCustomComponent key={key} data={element.dataset} />
    )
  }
];

const config: TransformConfig = {
  rules: myCustomRules,
  sanitize: true,
};

<Html transformConfig={config}>{htmlContent}</Html>
```

### Custom Theme Integration

```tsx
<QwickApp 
  appName="MyApp"
  defaultTheme="dark"
  defaultPalette="ocean"
>
  <style>
    {`:root {
      --my-custom-color: var(--theme-primary);
      --my-spacing: 2rem;
    }`}
  </style>
  {/* Your components */}
</QwickApp>
```

### Navigation Customization

```tsx
const customMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    onClick: () => navigate('/dashboard'),
    active: location.pathname === '/dashboard',
    badge: unreadCount > 0 ? unreadCount.toString() : undefined,
  },
  // More items...
];

<ResponsiveMenu 
  items={customMenuItems}
  logoPosition="center"
  onMenuToggle={handleMenuToggle}
/>
```

### Form Components with Serialization

```tsx
import { 
  ComponentTransformer, 
  FormBlock, TextInputField, SelectInputField, 
  HtmlInputField, ChoiceInputField, SwitchInputField 
} from '@qwickapps/react-framework';

// Create form with state management
const registrationForm = (
  <FormBlock title="User Registration" status="active">
    <TextInputField 
      value="John Doe"
      placeholder="Full Name"
      required={true}
      validation={{ minLength: 2, maxLength: 50 }}
    />
    <SelectInputField
      value="developer"
      options={[
        { label: "Developer", value: "developer" },
        { label: "Designer", value: "designer" },
        { label: "Manager", value: "manager" }
      ]}
      required={true}
    />
    <HtmlInputField
      value="<p>Professional <strong>summary</strong></p>"
      placeholder="Brief summary"
    />
    <ChoiceInputField
      value={["javascript", "react"]}
      options={[
        { label: "JavaScript", value: "javascript" },
        { label: "React", value: "react" },
        { label: "TypeScript", value: "typescript" }
      ]}
    />
    <SwitchInputField
      value={true}
      label="Receive notifications"
      validation={{ required: true }}
    />
  </FormBlock>
);

// Serialize form (preserves all state and validation)
const serializedForm = ComponentTransformer.serialize(registrationForm);

// Store in CMS or transmit across boundaries
localStorage.setItem('savedForm', serializedForm);

// Later: reconstruct with full functionality preserved
const savedForm = localStorage.getItem('savedForm');
const reconstructedForm = ComponentTransformer.deserialize(savedForm);
// Form maintains all controlled state, validation rules, and functionality
```

## Integration Testing

Each sample includes patterns for:
- Component integration testing
- Theme switching validation
- Responsive behavior testing
- Content transformation testing
- Accessibility compliance testing

## Next Steps

After exploring these samples:

1. **Choose a starting point** - Pick the sample closest to your use case
2. **Customize the theme** - Modify palettes and styling to match your brand
3. **Add your content** - Replace sample content with your application data
4. **Extend functionality** - Add custom components and features as needed
5. **Test thoroughly** - Use the testing patterns shown in the samples

For complete API documentation, see the main [README.md](../README.md) and [ARCHITECTURE.md](../ARCHITECTURE.md) files.