# Content

**Location:** `src/components/blocks/Content.tsx`

## Overview
The `Content` component is a versatile, general-purpose container that supports both traditional props and **data binding through dataSource**. Perfect for sections, cards, hero areas, and CMS-driven content blocks.

## Features
- **Data Binding Support**: Use `dataSource` prop for CMS-driven content
- **Flexible Content**: Optional title, subtitle, and child content
- **Action Buttons**: Built-in support for multiple action buttons
- **Visual Variants**: default, elevated, outlined, filled styles
- **Responsive Layout**: Configurable spacing, max width, and alignment
- **Theme Integration**: Consistent styling with QwickApps theme system
- **Loading & Error States**: Graceful handling of data binding states

## Props

### Core Props
- `title`: string – Block title
- `subtitle`: string – Block subtitle  
- `children`: ReactNode – Block content
- `actions`: ButtonProps[] – Action buttons with full Button component support
- `variant`: 'default' | 'elevated' | 'outlined' | 'filled' – Visual style
- `blockSpacing`: 'none' | 'compact' | 'comfortable' | 'spacious' – Internal padding
- `contentMaxWidth`: BreakpointValue – Maximum width constraint
- `centered`: boolean – Center align all content
- (plus base props from `WithBaseProps`)

### Data Binding Props
- `dataSource`: string – CMS field group ID for data-driven rendering
- `bindingOptions`: DataBindingOptions – Advanced data binding configuration

## Usage

### Traditional Props
```tsx
import Content from './blocks/Content';

<Content 
  title="Welcome to Our Platform" 
  subtitle="Get started with powerful tools"
  variant="elevated"
  centered={true}
  actions={[
    { label: 'Get Started', variant: 'primary' },
    { label: 'Learn More', variant: 'outlined' }
  ]}
>
  <p>Your content goes here.</p>
</Content>
```

### Data Binding (CMS-Driven)
```tsx
import Content from './blocks/Content';
import { DataProvider } from '../../contexts/DataContext';

<DataProvider dataSource={{ dataProvider }}>
  <Content dataSource="pages.home.intro" />
</DataProvider>
```

### Mixed Usage (Data + Fallback)
```tsx
<Content 
  dataSource="cms.hero-section"
  title="Fallback Title"
  subtitle="Shows if CMS data unavailable"
  variant="outlined"
/>
```

## Data Schema
Content components expect the following data structure when using `dataSource`:

```json
{
  "title": "Page Title",
  "subtitle": "Supporting description",
  "actions": [
    {
      "label": "Primary Action",
      "variant": "primary",
      "href": "/path"
    }
  ],
  "variant": "elevated",
  "blockSpacing": "spacious",
  "contentMaxWidth": "lg",
  "centered": true
}
```

## Variants

- **default**: Clean minimal styling for standard content
- **elevated**: Shadow and background for visual prominence  
- **outlined**: Clear borders and defined content areas
- **filled**: Background color highlighting for emphasis

## Block Spacing

- **none**: No internal padding (0px)
- **compact**: Minimal padding (16px) 
- **comfortable**: Balanced padding (24px) - default
- **spacious**: Generous padding (32px)

## Best Practices

### Traditional Usage
- Use for section containers, feature highlights, and structured content areas
- Choose variants based on visual importance (elevated for key sections)
- Combine with Section and GridLayout for comprehensive page layouts

### Data Binding Usage  
- Ideal for CMS-driven marketing pages, landing pages, and dynamic content
- Always provide fallback props for graceful degradation
- Use meaningful dataSource names that reflect content purpose
- Test loading and error states in your data provider implementation

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
