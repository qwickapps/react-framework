# FeatureCard

**Location:** `src/components/blocks/FeatureCard.tsx`  
**Schema:** `src/components/schemas/FeatureCardSchema.ts`

## Overview
The `FeatureCard` component is a flexible card component that supports both individual feature display and simple feature lists with data binding through `dataSource`. Perfect for showcasing product features, benefits, and capabilities with rich interactive elements.

## Key Features
- **Dual Variants**: Standard cards with rich content or simple list format
- **Interactive Elements**: Hover effects, click handlers, and custom actions
- **Flexible Content**: Icons, titles, descriptions, and action buttons
- **Elevation Control**: Material-UI Paper elevation for visual hierarchy
- **Data Binding**: Full CMS integration with JSON parsing support
- **Theme Integration**: Consistent styling with Material-UI theme system

## Component Architecture
The FeatureCard follows the QwickApps data binding pattern:

- **`FeatureCardView`**: Pure rendering component handling card display logic
- **`FeatureCard`**: Data binding wrapper supporting both props and dataSource
- **`FeatureCardSchema`**: Type-safe schema for CMS integration with JSON handling

## Props Interface
```typescript
interface FeatureItem {
  id: string;                       // Unique identifier
  icon?: React.ReactNode;           // Feature icon
  title: string;                    // Feature title
  description?: string;             // Feature description
  action?: React.ReactNode;         // Optional action button
}

interface FeatureCardAction {
  id: string;                       // Action identifier
  label: string;                    // Button text
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;               // Button state
  onClick: () => void;              // Click handler
}

interface FeatureCardProps extends WithBaseProps {
  feature?: FeatureItem;            // Feature data (standard variant)
  features?: string[];              // Feature strings (list variant)
  variant?: 'standard' | 'list';   // Card display variant
  actions?: FeatureCardAction[];    // Custom actions
  onClick?: () => void;             // Card click handler
  title?: string;                   // List variant title
  elevation?: number;               // Paper elevation (0-24)
}

interface FeatureCardWithDataBindingProps extends FeatureCardProps, DataBindingProps {
  bindingOptions?: DataBindingOptions;  // Advanced data binding config
}
```

## Usage Examples

### Traditional Props Usage - Standard Variant
```tsx
import FeatureCard from './blocks/FeatureCard';

const feature = {
  id: 'advanced-tooling',
  title: '🔧 Advanced Tooling',
  description: 'Professional development tools and utilities that streamline your workflow',
  icon: '🔧'
};

<FeatureCard
  feature={feature}
  variant="standard"
  elevation={3}
  actions={[
    {
      id: 'learn-more',
      label: 'Learn More',
      variant: 'contained',
      color: 'primary',
      onClick: () => console.log('Learn more clicked')
    }
  ]}
/>
```

### Traditional Props Usage - List Variant
```tsx
const features = [
  'Comprehensive component library',
  'Advanced theming capabilities',
  'Built-in accessibility support',
  'Performance optimization tools',
  'Responsive design system'
];

<FeatureCard
  features={features}
  variant="list"
  title="Framework Features"
  elevation={1}
/>
```

### Data Binding Usage
```tsx
import { DataProvider } from '../contexts/DataContext';
import { JsonDataProvider } from '../providers/JsonDataProvider';
import FeatureCard from './blocks/FeatureCard';

const dataProvider = new JsonDataProvider({ data: cmsData });

<DataProvider dataSource={{ dataProvider }}>
  <FeatureCard dataSource="product.single-feature" />
</DataProvider>
```

### JSON String Data
```tsx
// CMS data with JSON string features (automatically parsed)
<FeatureCard dataSource="landing.feature-highlight" />
```

### Interactive Card with Click Handler
```tsx
<FeatureCard
  feature={feature}
  onClick={() => console.log('Card clicked!')}
  elevation={4}
/>
```

## Data Binding Schema
The FeatureCard uses a comprehensive schema for CMS integration with JSON parsing:

```json
{
  "product.single-feature": {
    "feature": {
      "id": "lightning-fast",
      "title": "⚡ Lightning Fast Performance",
      "description": "Optimized for speed with sub-millisecond response times",
      "icon": "⚡"
    },
    "variant": "standard",
    "elevation": 3
  }
}
```

### JSON String Feature Support
```json
{
  "landing.feature-highlight": {
    "feature": "{\"id\":\"developer-experience\",\"title\":\"🎯 Developer Experience\",\"description\":\"Intuitive APIs and documentation\"}",
    "actions": "[{\"id\":\"learn-more\",\"label\":\"Learn More\",\"variant\":\"contained\"}]",
    "variant": "standard",
    "elevation": 4
  }
}
```

### List Variant Data
```json
{
  "marketing.feature-list": {
    "features": [
      "Zero configuration setup",
      "Full TypeScript support",
      "Hot module reloading",
      "Built-in testing framework"
    ],
    "variant": "list",
    "title": "Key Benefits",
    "elevation": 1
  }
}
```

## Variant Options
- **`standard`**: Rich feature cards with icons, titles, descriptions, and actions
- **`list`**: Simple bullet-point lists for concise information display

## Elevation Levels
- **0-1**: Flat design with minimal/no shadow
- **2-4**: Standard cards with balanced depth (default: 2)
- **5-8**: Emphasized cards for visual prominence
- **9-24**: High-impact cards for special highlights

## Interactive Features
- **Click Handlers**: Entire card can be clickable with hover effects
- **Action Buttons**: Multiple call-to-action buttons with different variants
- **Hover Effects**: Smooth transitions and visual feedback
- **Keyboard Navigation**: Full accessibility support with focus indicators

## Perfect For
- Individual feature highlights and benefit showcases
- Feature comparison cards and capability displays
- Simple feature lists and bullet point summaries
- Interactive elements with call-to-action buttons
- Product cards and service offerings
- Marketing feature grids and benefit sections

## Data Processing
The component includes intelligent data processing:
- **JSON Feature Parsing**: Automatically parses JSON string features
- **JSON Actions Parsing**: Converts JSON string actions to button arrays
- **JSON Features Parsing**: Handles JSON string arrays for list variant
- **Type Conversion**: Ensures elevation values are valid numbers
- **Error Handling**: Graceful fallbacks for malformed data

## Loading States
The component provides loading and error states during data binding:
- **Loading**: Shows placeholder feature with "Loading Feature..." content
- **Error**: Displays error feature with warning icon and error message
- **Empty Standard**: Shows "No Feature Available" when feature data is missing
- **Empty List**: Shows "No features available" when features array is empty

## Action System
The flexible action system supports:
- **Custom Actions**: Array of action objects with different variants
- **Button Variants**: Contained, outlined, and text button styles
- **Color Options**: Primary, secondary, error, and custom colors
- **Click Handlers**: Individual onClick functions for each action
- **Disabled State**: Support for disabled buttons

## Data Attributes
When using data binding, the component includes metadata attributes:
- `data-component="FeatureCard"`
- `data-data-source="[dataSource]"`
- `data-variant="[standard|list]"`
- `data-loading="true"` (during loading)
- `data-error="true"` (when error occurs)

## Copyright
(c) 2025 QwickApps.com. All rights reserved.