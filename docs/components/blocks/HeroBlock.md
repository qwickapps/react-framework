# HeroBlock

**Location:** `src/components/blocks/HeroBlock.tsx`  
**Schema:** `src/components/schemas/HeroBlockSchema.ts`

## Overview
The `HeroBlock` component is a powerful full-width hero section component that supports both traditional props and data binding through `dataSource`. Perfect for landing pages, product launches, and marketing campaigns with professional background images, gradients, and call-to-action buttons.

## Key Features
- **Flexible Backgrounds**: Support for images, gradients, and theme colors
- **Responsive Typography**: Automatically scales from mobile to desktop  
- **Action Buttons**: Built-in support for multiple call-to-action buttons
- **Height Variants**: Small, medium, large, and full viewport options
- **Text Alignment**: Left, center, or right alignment options
- **Data Binding**: Full CMS integration through dataSource prop
- **Overlay Control**: Customizable overlay opacity for background images

## Component Architecture
The HeroBlock follows the QwickApps data binding pattern:

- **`HeroBlockView`**: Pure rendering component handling display logic
- **`HeroBlock`**: Data binding wrapper supporting both props and dataSource
- **`HeroBlockSchema`**: Type-safe schema for CMS integration

## Props Interface
```typescript
interface HeroBlockProps extends WithBaseProps {
  title: string;                    // Main headline text
  subtitle?: string;                // Subtitle or description text  
  backgroundImage?: string;         // Background image URL
  backgroundGradient?: string;      // Background gradient CSS value
  backgroundColor?: 'default' | 'primary' | 'secondary' | 'surface';
  actions?: ButtonProps[];          // Action buttons array
  children?: React.ReactNode;       // Additional content below text
  textAlign?: 'left' | 'center' | 'right';
  blockHeight?: 'small' | 'medium' | 'large' | 'viewport';
  overlayOpacity?: number;          // Custom overlay opacity (0-1)
}

interface HeroBlockWithDataBindingProps extends HeroBlockProps, DataBindingProps {
  bindingOptions?: DataBindingOptions;  // Advanced data binding config
}
```

## Usage Examples

### Traditional Props Usage
```tsx
import HeroBlock from './blocks/HeroBlock';

<HeroBlock
  title="Build Apps 10x Faster with QwickApps"
  subtitle="The most developer-friendly React framework"
  backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  textAlign="center"
  blockHeight="large"
  actions={[
    { label: 'Get Started Free', variant: 'primary', buttonSize: 'large' },
    { label: 'Watch Demo', variant: 'outlined', buttonSize: 'large' }
  ]}
/>
```

### Data Binding Usage
```tsx
import { DataProvider } from '../contexts/DataContext';
import { JsonDataProvider } from '../providers/JsonDataProvider';
import HeroBlock from './blocks/HeroBlock';

const dataProvider = new JsonDataProvider({ data: cmsData });

<DataProvider dataSource={{ dataProvider }}>
  <HeroBlock dataSource="pages.home.hero" />
</DataProvider>
```

### Fallback Support
```tsx
<HeroBlock 
  dataSource="nonexistent.hero"
  title="Fallback Hero Content"
  subtitle="Shows when data source is missing"
  backgroundColor="default"
/>
```

## Data Binding Schema
The HeroBlock uses a comprehensive schema for CMS integration:

```json
{
  "pages.home.hero": [{
    "title": "Build Apps 10x Faster",
    "subtitle": "The most developer-friendly React framework",
    "backgroundGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "actions": [
      { "label": "Get Started Free", "variant": "primary", "buttonSize": "large" },
      { "label": "Watch Demo", "variant": "outlined", "buttonSize": "large" }
    ],
    "textAlign": "center",
    "blockHeight": "large",
    "overlayOpacity": 0.6
  }]
}
```

## Height Variants
- **`small`** (300px): Compact hero for minimal messaging
- **`medium`** (400px): Balanced height for most use cases (default)
- **`large`** (600px): Expansive hero for maximum impact  
- **`viewport`** (100vh): Full-screen dramatic effect

## Background Options
- **Images**: High-quality background images with customizable overlay
- **Gradients**: CSS gradients for visual appeal
- **Theme Colors**: Consistent with application theme (primary, secondary, surface, default)

## Perfect For
- Landing page heroes and primary messaging
- Product launch announcements  
- Marketing campaigns and promotions
- About pages and company messaging
- Feature highlights and value propositions

## Loading States
The component provides loading and error states during data binding:
- **Loading**: Shows "Loading..." when resolving dataSource
- **Error**: Displays error message if data binding fails
- **Fallback**: Uses fallback props when dataSource has no content

## Data Attributes
When using data binding, the component includes metadata attributes:
- `data-component="HeroBlock"`
- `data-data-source="[dataSource]"`
- `data-loading="true"` (during loading)
- `data-error="true"` (when error occurs)

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
