# FeatureGrid

**Location:** `src/components/blocks/FeatureGrid.tsx`  
**Schema:** `src/components/schemas/FeatureGridSchema.ts`

## Overview
The `FeatureGrid` component is a powerful responsive grid component for showcasing multiple features with support for both traditional props and data binding through `dataSource`. Perfect for product feature showcases, benefit highlights, and comprehensive capability demonstrations.

## Key Features
- **Responsive Grid Layout**: Customizable column count with automatic responsive behavior
- **Feature Cards**: Rich feature display with icons, titles, descriptions, and actions
- **Flexible Spacing**: Three gap options for optimal visual hierarchy
- **Equal Height Control**: Option for consistent grid appearance or natural content flow
- **Data Binding**: Full CMS integration with JSON array support
- **Array Processing**: Smart parsing of JSON strings and nested feature objects

## Component Architecture
The FeatureGrid follows the QwickApps data binding pattern:

- **`FeatureGridView`**: Pure rendering component handling grid display logic
- **`FeatureGrid`**: Data binding wrapper supporting both props and dataSource
- **`FeatureGridSchema`**: Type-safe schema for CMS integration with array handling

## Props Interface
```typescript
interface FeatureItem {
  id: string;                       // Unique identifier
  icon?: React.ReactNode;           // Feature icon
  title: string;                    // Feature title
  description: string;              // Feature description
  action?: React.ReactNode;         // Optional action/button
}

interface FeatureGridProps extends WithBaseProps {
  features: FeatureItem[];          // Array of feature items
  columns?: 1 | 2 | 3 | 4 | 5 | 6; // Number of columns (default: 3)
  gap?: 'small' | 'medium' | 'large'; // Grid gap (default: medium)
  equalHeight?: boolean;            // Equal height for grid items (default: true)
}

interface FeatureGridWithDataBindingProps extends FeatureGridProps, DataBindingProps {
  bindingOptions?: DataBindingOptions;  // Advanced data binding config
}
```

## Usage Examples

### Traditional Props Usage
```tsx
import FeatureGrid from './blocks/FeatureGrid';

const features = [
  {
    id: 'fast',
    title: '⚡ Lightning Fast',
    description: 'Optimized performance for instant loading',
    icon: '⚡'
  },
  {
    id: 'beautiful',
    title: '🎨 Beautiful UI',
    description: 'Professional components and layouts',
    icon: '🎨'
  },
  {
    id: 'mobile',
    title: '📱 Mobile First',
    description: 'Responsive design principles built in',
    icon: '📱'
  }
];

<FeatureGrid
  features={features}
  columns={3}
  gap="medium"
  equalHeight={true}
/>
```

### Data Binding Usage
```tsx
import { DataProvider } from '../contexts/DataContext';
import { JsonDataProvider } from '../providers/JsonDataProvider';
import FeatureGrid from './blocks/FeatureGrid';

const dataProvider = new JsonDataProvider({ data: cmsData });

<DataProvider dataSource={{ dataProvider }}>
  <FeatureGrid dataSource="pages.home.features" />
</DataProvider>
```

### JSON String Features
```tsx
// CMS data with JSON string features (automatically parsed)
<FeatureGrid dataSource="product.key-features" />
```

### Custom Configuration
```tsx
<FeatureGrid
  features={features}
  columns={4}
  gap="large"
  equalHeight={false}
/>
```

## Data Binding Schema
The FeatureGrid uses a comprehensive schema for CMS integration with array handling:

```json
{
  "pages.home.features": {
    "features": [
      {
        "id": "fast",
        "title": "⚡ Lightning Fast",
        "description": "Optimized performance for instant loading",
        "icon": "⚡"
      },
      {
        "id": "beautiful", 
        "title": "🎨 Beautiful UI",
        "description": "Professional components and layouts",
        "icon": "🎨"
      }
    ],
    "columns": 3,
    "gap": "medium",
    "equalHeight": true
  }
}
```

### JSON String Support
```json
{
  "product.features": {
    "features": "[{\"id\":\"feature-1\",\"title\":\"Easy Setup\",\"description\":\"Quick configuration\"}]",
    "columns": 2,
    "gap": "large"
  }
}
```

## Column Options
- **1 Column**: Single column layout for detailed features
- **2 Columns**: Balanced layout for key feature pairs
- **3 Columns**: Default layout optimal for most use cases
- **4 Columns**: Comprehensive showcase for many features
- **5-6 Columns**: Dense layouts for compact feature lists

## Gap Spacing
- **`small`**: Compact spacing for dense information layouts
- **`medium`**: Standard spacing for balanced appearance (default)
- **`large`**: Generous spacing for emphasis and visual breathing room

## Equal Height Control
- **`true`** (default): All feature cards maintain equal height for consistent grid appearance
- **`false`**: Cards adjust to natural content height, useful when descriptions vary significantly

## Feature Item Structure
Each feature item supports:
- **`id`**: Unique identifier (required)
- **`title`**: Feature headline (required)  
- **`description`**: Feature details (required)
- **`icon`**: Visual icon (optional) - supports React nodes, emojis, or components
- **`action`**: Custom action button (optional) - React node for custom interactions

## Perfect For
- Product feature showcases and benefit highlights
- Service offerings and capability demonstrations  
- Technology stack presentations
- Marketing benefit grids and value propositions
- Feature comparison and highlight sections
- "Why choose us" sections with compelling benefits

## Data Processing
The component includes intelligent data processing:
- **JSON Parsing**: Automatically parses JSON strings in features arrays
- **Type Conversion**: Converts string booleans and numbers to proper types
- **Error Handling**: Graceful fallbacks for malformed data
- **Empty State**: Handles missing or empty feature arrays

## Loading States
The component provides loading and error states during data binding:
- **Loading**: Shows placeholder features with "Loading Feature..." content
- **Error**: Displays error feature with warning icon and error message
- **Empty**: Shows "No Features Available" when no features are found

## Data Attributes
When using data binding, the component includes metadata attributes:
- `data-component="FeatureGrid"`
- `data-data-source="[dataSource]"`
- `data-feature-count="[number]"`
- `data-loading="true"` (during loading)
- `data-error="true"` (when error occurs)

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
