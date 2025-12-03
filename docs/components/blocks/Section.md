# Section

**Location:** `src/components/blocks/Section.tsx`  
**Schema:** `src/components/schemas/SectionSchema.ts`

## Overview
The `Section` component is a foundational layout container that supports both traditional props and data binding through `dataSource`. Perfect for organizing page content with theme-aware backgrounds, responsive spacing, and semantic HTML structure.

## Key Features
- **Theme-Aware Backgrounds**: Support for CSS colors, gradients, and theme variables
- **Responsive Spacing**: Six padding presets from none to extra-large
- **Container Control**: Customizable max width with responsive breakpoints
- **Semantic HTML**: Choose appropriate HTML elements (section, article, main, div)
- **Data Binding**: Full CMS integration through dataSource prop
- **Grid Integration**: Works with QwickApps grid system

## Component Architecture
The Section follows the QwickApps data binding pattern:

- **`SectionView`**: Pure rendering component handling display logic
- **`Section`**: Data binding wrapper supporting both props and dataSource
- **`SectionSchema`**: Type-safe schema for CMS integration

## Props Interface
```typescript
interface SectionProps extends WithBaseProps {
  children: React.ReactNode;         // Section content
  background?: string;               // CSS background color/gradient/theme variable
  color?: string;                    // Text color
  padding?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  contentMaxWidth?: BreakpointValue; // Container max width
  component?: 'div' | 'section' | 'article' | 'main';
}

interface SectionWithDataBindingProps extends SectionProps, DataBindingProps {
  bindingOptions?: DataBindingOptions;  // Advanced data binding config
}
```

## Usage Examples

### Traditional Props Usage
```tsx
import Section from './blocks/Section';

<Section
  background="#f8f9fa"
  color="#212529"
  padding="large"
  contentMaxWidth="lg"
  component="section"
>
  <h2>Page Content Section</h2>
  <p>Your content with consistent theming and spacing</p>
</Section>
```

### Data Binding Usage
```tsx
import { DataProvider } from '../contexts/DataContext';
import { JsonDataProvider } from '../providers/JsonDataProvider';
import Section from './blocks/Section';

const dataProvider = new JsonDataProvider({ data: cmsData });

<DataProvider dataSource={{ dataProvider }}>
  <Section dataSource="pages.home.intro-section">
    <YourContent />
  </Section>
</DataProvider>
```

### Theme Variables
```tsx
<Section
  background="var(--theme-primary)"
  color="var(--theme-on-primary)"
  padding="medium"
  contentMaxWidth="xl"
>
  <h2>Theme-Consistent Section</h2>
</Section>
```

### Semantic HTML Elements
```tsx
{/* Main content area */}
<Section component="main" background="#ffffff" padding="large">
  <MainContent />
</Section>

{/* Article content */}
<Section component="article" background="#f5f5f5" padding="medium">
  <ArticleContent />
</Section>

{/* Non-semantic container */}
<Section component="div" padding="none" contentMaxWidth={false}>
  <FullWidthContent />
</Section>
```

## Data Binding Schema
The Section uses a comprehensive schema for CMS integration:

```json
{
  "pages.home.intro-section": [{
    "background": "var(--theme-primary)",
    "color": "var(--theme-on-primary)",
    "padding": "large",
    "contentMaxWidth": "lg",
    "component": "section"
  }]
}
```

## Padding Variants
- **`none`** (0px): Compact sections with no vertical spacing
- **`tiny`** (8px): Minimal spacing for tight layouts
- **`small`** (16px): Small spacing for condensed content
- **`medium`** (32px): Standard spacing for most use cases (default)
- **`large`** (64px): Generous spacing for emphasis
- **`extra-large`** (96px): Maximum spacing for dramatic separation

## Content Width Options
- **`xs`** (444px): Extra small container for narrow content
- **`sm`** (600px): Small container for compact layouts
- **`md`** (900px): Medium container for standard content
- **`lg`** (1200px): Large container for most use cases (default)
- **`xl`** (1536px): Extra large container for wide layouts
- **`false`**: Full width with no maximum constraint

## Semantic HTML Elements
- **`section`**: General thematic groupings of content (default)
- **`article`**: Standalone, reusable content pieces
- **`main`**: Primary content area of the page
- **`div`**: Non-semantic containers for styling purposes

## Perfect For
- Page section containers and layout organization
- Content areas with consistent spacing and styling
- Theme-based background and text color management
- Responsive content width control
- Semantic HTML structure for accessibility

## Loading States
The component provides loading and error states during data binding:
- **Loading**: Shows "Loading section content..." when resolving dataSource
- **Error**: Displays error message if data binding fails
- **Fallback**: Uses fallback props when dataSource has no content

## Data Attributes
When using data binding, the component includes metadata attributes:
- `data-component="Section"`
- `data-data-source="[dataSource]"`
- `data-loading="true"` (during loading)
- `data-error="true"` (when error occurs)

## Copyright
(c) 2025 QwickApps.com. All rights reserved.
