# QwickApps React Framework

A complete React framework for building modern, responsive applications with intelligent navigation, flexible layouts, and a comprehensive theming system.

## What's New

### December 6, 2025 - Scaffold Layout & Spacing Improvements (v1.5.4)

- **Scaffold Layout Spacing**: Responsive base padding (16px mobile, 24px tablet, 32px desktop) plus nav element clearance
- **Scaffold Background Contrast**: Fixed nav/content contrast by using `--theme-background` for content areas
- **Body Margin Reset**: Added CSS reset to eliminate browser default 8px body margin

### December 5, 2025 - GridLayout equalHeight Fix (v1.5.3)

- **GridLayout equalHeight Fix**: Fixed `equalHeight` prop not working in MUI v6 - updated CSS selector to target Grid children correctly

### December 5, 2025 - Bug Fixes & Control Panel Icons (v1.5.2)

- **Control Panel Icons**: 10 new icons for admin UIs (`key`, `refresh`, `storage`, `manage_accounts`, `person_search`, `block`, `check_circle`, etc.)
- **Scaffold Background Fix**: Unified background colors between nav and content areas for consistent admin panel appearance
- **Button Icon Bug Fix**: Fixed issue where unmapped icon names appeared as text (e.g., "refresh Refresh")

### December 2, 2025 - Major Feature Release (v1.5.0)

#### New Components & Systems

- **Server-Side Rendering (SSR) Support**: Full SSR compatibility - works with Next.js, Remix, and other frameworks
- **ProductLogo Component**: Simplified product branding with automatic icon positioning and size variants
- **Icon Mapping System (`iconMap`)**: 50+ Material-UI icons accessible by name with `getIconComponent()` and `getIconEmoji()`
- **Dialog Components**: Themed `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions` using CSS variables
- **Captcha Component**: Universal CAPTCHA supporting reCAPTCHA v2/v3, hCaptcha, and Cloudflare Turnstile
- **Form Components**: `FormCheckbox`, `FormField`, `FormSelect` for CMS-driven forms

#### Palette & Theming

- **Palette Loader**: Dynamic CDN-first palette loading with `loadPalette()`, `preloadPalettes()`
- **Palette Manifest**: Metadata-driven palette discovery with `getAvailablePalettes()`, `getPalettesByCategory()`

#### Code Quality

- **Zero Lint Errors**: Fixed all 867 ESLint errors for production-ready code quality
- **TypeScript Strict**: Replaced `any` types with proper TypeScript types throughout
- **React Hooks Best Practices**: Fixed all hook rule violations with unconditional calls
- **Clean Install Validation**: Docker-based QA test validates package in fresh React projects

### October 9, 2025 - Icon System & CSS Theme Variables (v1.4.9)

- **Schema-Driven Icon System**: Button component now supports icon transformation from string names to Material-UI components using `finalize` function pattern
- **Icon Registry**: Comprehensive icon mapping with 30+ Material-UI icons (home, download, settings, dashboard, help, business, etc.) accessible via string names
- **CSS Theme Variables Integration**: Button component migrated from MUI color props to CSS theme variables (`--theme-primary`, `--theme-secondary`, etc.) for consistent theming
- **Menu Item Icons**: Navigation components (Scaffold, ResponsiveMenu) updated to support both string icon names and React icon components with DefaultIcon fallback
- **Type Safety**: Fixed ButtonProps type definition using `Omit` pattern to properly handle schema transformation from strings to React elements
- **Reusable Icon Utility**: Exported `getIconComponent()` function for use across navigation and menu components
- **Theme-Aware Colors**: Button colors automatically adapt to palette and theme changes using CSS variable system

### September 29, 2025 - Production Ready Release (v1.4.8)

- **NPM Publishing Ready**: Package prepared for official NPM distribution with optimized build configuration and comprehensive exports
- **Enhanced Build System**: Improved rollup configuration with both development and production builds, automatic CSS bundling, and TypeScript declarations
- **Complete API Exports**: All framework components, utilities, and configuration modules properly exported for external consumption
- **Project Creation Scripts**: Included automated project scaffolding tools for rapid QwickApps React Framework adoption
- **Storybook Integration**: Full component documentation and interactive examples ready for developers
- **Production Optimizations**: Stripped logging in production builds, optimized bundle sizes, and enhanced performance characteristics
- **Publishing Pipeline**: Configured with proper package metadata, repository links, and NPM publishing workflows

### September 13, 2025 - Schema-Driven Factory Pattern Architecture Completed ✅

- **Phase 2 Migration Complete**: Successfully migrated 10+ core components to schema-driven factory pattern with 100% feature parity maintained
- **Factory Pattern Architecture**: Complete implementation of `createSerializableView` factory generating functional components with static serialization methods
- **Container vs View Components**: Clear architectural distinction established - Container components (Section, HeroBlock, GridLayout) use `react-children` strategy, View components use appropriate serialization patterns
- **Security Enhancement**: Content-prop strategy from Phase 1 successfully maintained, preventing JSON deserialization vulnerabilities
- **Schema Integration**: Components extend ViewSchema or ContainerSchema for standardized prop definitions with existing BaseComponentProps compatibility
- **QA Results**: All unit tests updated and passing, all Storybook stories rendering correctly, serialization round-trip tests working, build passes successfully
- **Component Roster**: Section, HeroBlock, GridLayout, GridCell, Image, Button, TextInputField, SelectInputField, HtmlInputField, ChoiceInputField, SwitchInputField migrated
- **Performance**: All components maintain sub-millisecond serialization performance, factory pattern establishes foundation for future development
- **Architecture Ready**: Phase 3 cleanup now ready to remove ModelView legacy code and complete transition to modern schema-driven architecture

### September 9, 2025 - Advanced Print System with Professional Layout Control (v1.4.1)

- **Complete Print View System**: Professional print functionality for React Framework with intelligent detection, dynamic configuration, and sophisticated print layouts
- **Multi-Channel Print Detection**: Browser event integration (Ctrl+P/Cmd+P), and manual print mode controls with comprehensive state management
- **Advanced Print Configuration**: Complete PrintConfigSchema with theme control (light/dark), palette selection, monochrome optimization, and interactive element hiding
- **Dynamic Header/Footer System**: ReactNode | string support for print headers and footers with separate first-page variants, automatic height measurement, and CSS variable-driven positioning
- **Edge-to-Edge Printing**: Configurable page margins (0mm, 6mm, 12mm, 20mm, 25mm) with automatic CSS class application and complete borderless printing capabilities
- **Print Background Control**: Full background image/color support for printed pages with separate first-page backgrounds and professional document styling
- **CSS Variable Architecture**: Dynamic injection of print-specific variables (--print-header-height, --print-footer-height, --print-background) with automatic @page rule generation
- **Schema-Driven Architecture**: Complete integration with PageTemplateSchema for CMS-managed print configurations and serializable page content

### September 5, 2025 - Component Serialization System ("WebView for React")

- **Complete Component Serialization**: Full "WebView for React" functionality enabling components to be serialized to JSON and reconstructed while preserving functionality
- **Data Binding Preservation**: Serialization system seamlessly preserves data binding configuration across serialize/deserialize cycles
- **Code Component Reference Implementation**: Code component serves as the canonical example with <1ms serialization performance and comprehensive ReactNode handling
- **Image Component Schema Integration**: Image component successfully converted to Schema architecture with 300-500x performance targets exceeded and 100% backward compatibility
- **Text Component Schema Integration**: Text component successfully converted to Schema architecture with 125-500x performance targets exceeded, comprehensive typography serialization, and 96.3% test coverage
- **HeroBlock Component Complex Serialization**: **First component with nested component serialization** - HeroBlock successfully converted with Button actions array support and 500x performance targets exceeded (0.0009ms basic, 0.0058ms complex serialization)
- **GridLayout & GridCell Components**: **First responsive grid system with complete serialization** - GridLayout and GridCell components successfully converted to Schema with 3-169x performance targets exceeded and complete responsive breakpoint preservation
- **Responsive Grid Breakthrough**: GridLayout and GridCell establish patterns for responsive layout serialization with all breakpoint configurations (xs,sm,md,lg,xl) preserved through serialization cycles
- **Complex Layout Support**: GridLayout handles 1-6 column responsive layouts with nested GridCell components, maintaining complete functionality after reconstruction
- **Nested Component Breakthrough**: HeroBlock establishes architectural patterns for complex components with nested React elements, demonstrating serialization system capability for sophisticated component hierarchies
- **Production-Ready Components**: Code, Image, Text, HeroBlock, GridLayout, and GridCell components approved for production deployment with comprehensive QA validation
- **Typography Serialization**: Complete Material-UI Typography integration with all variants (h1-h6, body1/2, subtitle, button, caption, overline), color support, and text formatting preserved
- **Performance Excellence**: QA validation with enhanced test coverage, handles 1000+ components in <50ms, memory usage <50MB for large component trees
- **Production Ready**: Cross-browser compatibility, comprehensive error handling, and graceful fallback for unknown components
- **CMS Integration**: Components can be stored in CMS systems as JSON and reconstructed maintaining full React functionality

### September 4, 2025 - Stability & Inline Wrapper Guard

- **ProductCard Stability Fix**: Removed inline wrapper React components that caused subtree remounts and potential focus/state loss; replaced with stable JSX fragments.
- **Preventive Lint Rule**: Repo now enforces a custom `no-inline-component-wrapper` ESLint rule (scoped rollout) to block reintroduction of the remount pattern.
- **Internal Refactor Only**: No public API changes; safe patch update.

### September 2, 2025 - Built-in Error Handling & Accessibility

- **Automatic Error Boundaries**: QwickApp now automatically wraps all content with ErrorBoundary for robust error handling
- **Built-in Accessibility**: AccessibilityProvider automatically included for WCAG 2.1 AA compliance
- **Generic Components**: Moved ErrorBoundary, AccessibilityProvider, and Breadcrumbs to framework level
- **Complete Test Coverage**: Added comprehensive unit tests and Storybook stories for all new components
- **Zero Configuration**: Error handling and accessibility features work out-of-the-box with QwickApp

### September 1, 2025 - Optional Dependencies & Performance

- **Optional Logging**: Made `@qwickapps/logging` an optional dependency with console fallback
- **Reduced Bundle Size**: Core framework no longer includes logging overhead by default
- **React Error Fixes**: Fixed React error #62 in Markdown mixed content scenarios
- **DOM Nesting**: Added automatic cleanup of invalid DOM nesting from marked.js output

### August 31, 2025 - CMS Content Components  

- **Html Component**: Transform HTML strings into React components with configurable transformation rules
- **Markdown Component**: Convert Markdown to React components using marked library with Html component integration
- **Transform System**: Extensible HTML transformation architecture with optimized rule sets for Article and Markdown content
- **Content Simplification**: Article and Content components refactored to use Html component internally, eliminating duplicate transformation logic

## Features

### 🧭 **Responsive Navigation**

- **Mobile**: Bottom navigation bar for touch-friendly access
- **Tablet**: Expandable nav rail with collapsible sidebar
- **Desktop**: Top navigation with overflow drawer
- **Automatic**: Adapts based on screen size without configuration

### 📐 **Flexible Layout System**

- **Hero Blocks**: Full-width hero sections with background images/gradients
- **Multi-Column Layouts**: Responsive 2-5 column layouts with equal heights
- **Content Blocks**: Styled containers with variants (elevated, outlined, filled)
- **Feature Grids**: Showcase features with icons, titles, and actions
- **Section Containers**: Configurable spacing and background variants
- **CollapsibleLayout**: Advanced expandable/collapsible containers with state management

### 🎨 **Advanced Theming**

- **Theme Management**: Light, dark, and system theme support
- **Color Palettes**: Multiple built-in palettes (Ocean, Autumn, Spring, Winter)
- **CSS Variables**: Dynamic theme switching without re-renders
- **Custom Palettes**: Easy to create and integrate custom color schemes

### 🧩 **Component Library**

- **Logo Component**: Dynamic, customizable logos with badges and animations
- **Theme Controls**: Built-in theme and palette switchers
- **Form Components**: Accessible, themed form inputs with complete serialization support
- **Advanced Form Fields**: TextInputField, SelectInputField, HtmlInputField, ChoiceInputField, SwitchInputField with controlled state preservation
- **Form Containers**: FormBlock component with nested form component support and status messaging
- **Safe Components**: XSS-protected content rendering
- **Html Component**: Transform HTML strings to React components with configurable rules
- **Markdown Component**: Convert Markdown to React components with syntax highlighting
- **Transform System**: Extensible HTML element transformation with fallback handling

### 🔄 **Component Serialization System**

- **"WebView for React" Functionality**: Serialize React components to JSON and reconstruct with full functionality preserved
- **Complete Form Serialization**: **First form state management serialization system** - All form components preserve controlled component state, validation rules, and error handling
- **Production-Ready Components**: 11 components with complete Schema architecture and comprehensive QA validation (Code, Image, Text, HeroBlock, GridLayout, GridCell, TextInputField, SelectInputField, HtmlInputField, ChoiceInputField, SwitchInputField, FormBlock)
- **Form Components Innovation**: TextInputField, SelectInputField, HtmlInputField, ChoiceInputField, SwitchInputField, and FormBlock with 97.5% test pass rate and 0.4ms average serialization
- **Complex Form Data Handling**: Options arrays, HTML content, validation configurations, choice fields, and boolean controls fully supported through serialization
- **Production Form Workflows**: Complete form creation, editing, validation, and submission workflows preserved through serialize/deserialize cycles
- **Nested Component Serialization**: HeroBlock component pioneered nested component serialization with Button actions array support
- **Responsive Grid Serialization**: GridLayout and GridCell components provide first responsive grid system with complete serialization and breakpoint preservation
- **Complex Component Architecture**: Components handle sophisticated hierarchical structures with background images, gradients, responsive layouts, and interactive elements
- **Breakpoint Preservation**: All responsive breakpoint configurations (xs,sm,md,lg,xl) fully preserved through serialization cycles
- **Data Binding Integration**: Components maintain data source connections through serialization cycles
- **Performance Optimized**: <1ms serialization/deserialization, handles 1000+ components efficiently, 2.5-500x performance targets exceeded
- **CMS Ready**: Store components in databases/CMS systems and reconstruct as living React components
- **Graceful Fallbacks**: Unknown components automatically use HTML fallback rendering
- **Cross-Platform**: Consistent serialization across all major browsers and environments

### 🛡️ **Built-in Error Handling & Accessibility**

- **ErrorBoundary**: Automatic error catching with user-friendly fallback UI and retry functionality
- **AccessibilityProvider**: WCAG 2.1 AA compliance with system preference detection and ARIA announcements
- **Breadcrumbs**: Accessible navigation hierarchy with keyboard support and customization
- **Automatic Integration**: All features automatically enabled in QwickApp without configuration

### 📄 **Serializable Page System with Advanced Print Support**

- **Schema-Driven Architecture**: Complete page templates with ViewSchema, PrintConfigSchema, and PageTemplateSchema for full serialization
- **Intelligent Print Detection**: Automatic print mode activation via browser events (Ctrl+P/Cmd+P) with comprehensive state management
- **Advanced Print Configuration**: Complete print theming system with headers, footers, backgrounds, page margins (0mm-25mm), and CSS variable-driven positioning
- **Dynamic Print Layout**: Edge-to-edge printing capabilities with configurable page margins, automatic height measurement, and proper page break handling
- **Print Content Control**: ReactNode | string support for headers/footers, background image/color support, and interactive element hiding
- **Template-Driven Development**: JSON-serializable page configurations with metadata, SEO optimization, and complete customization
- **CMS-Ready Integration**: Dynamic page content through dataSource with seamless database and headless CMS connectivity
- **Page Context System**: Automatic QwickApp scaffolding integration with print-aware navigation and routing

### 🚀 **Developer Experience**

- **TypeScript First**: Full TypeScript support with comprehensive types
- **Storybook**: Interactive component documentation
- **Performance**: Optimized rendering and minimal bundle size
- **Accessibility**: WCAG-compliant components with ARIA support

## Installation

### 🚀 Quick Start (Recommended)

**Create a new QwickApps project in one command:**

```bash
npx @qwickapps/react-framework/scripts/create-qwickapps-project my-qwickapps-project
cd my-qwickapps-project
npm start
```

This will:

1. Create a new React app with TypeScript
2. Install QwickApps React Framework and all dependencies
3. Set up a complete QwickApps application template
4. Start the development server

Your app will be running at `http://localhost:3000` with QwickApps pre-configured!

### 📦 Manual Installation

If you have an existing React project, install the framework manually:

```bash
npm install @qwickapps/react-framework @emotion/react @emotion/styled @mui/material @mui/icons-material react-router-dom
```

### Optional Dependencies

The framework uses console-based logging by default. For advanced logging features, optionally install:

```bash
npm install @qwickapps/logging
```

This will enable structured logging with configurable levels and outputs. If not installed, the framework automatically falls back to console logging.

## Quick Start

### ⚡ Already Used the Quick Start Script?

If you used the quick start script above, your app is already set up and running! Skip to the [Advanced Usage](#advanced-usage) section.

### 🔧 Manual Setup (for existing React projects)

If you're adding QwickApps to an existing React project or installed manually:

```tsx
import { 
  QwickApp, 
  ResponsiveMenu, 
  HeroBlock,
  Section,
  Content,
  ComponentTransformer 
} from '@qwickapps/react-framework';

const menuItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon />,
    onClick: () => navigate('/'),
    active: true,
  },
  {
    id: 'about',
    label: 'About',
    icon: <InfoIcon />,
    onClick: () => navigate('/about'),
  },
];

function App() {
  return (
    <QwickApp appName="MyApp" appId="com.mycompany.app">
      <ResponsiveMenu items={menuItems} />
      
      <HeroBlock
        title="Welcome to MyApp"
        subtitle="Build amazing applications with ease"
        backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        actions={
          <button>Get Started</button>
        }
      />
      
      <Section padding="large">
        <Content title="About Us" centered>
          <p>Your content here...</p>
        </Content>
      </Section>
    </QwickApp>
  );
}
```

### Custom Logo

```tsx
// Use built-in Logo component with appName
<QwickApp appName="MyApp" />

// Or provide a custom logo
<QwickApp 
  appName="MyApp"
  logo={<img src="/logo.png" alt="MyApp" />}
/>

// Custom logo with built-in Logo component
<QwickApp 
  appName="MyApp"
  logo={<Logo name="MyApp" size="large" badge="top-right" />}
/>
```

## Responsive Navigation

The `ResponsiveMenu` component automatically adapts to different screen sizes:

```tsx
import { ResponsiveMenu } from '@qwickapps/react-framework';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    onClick: () => navigate('/dashboard'),
    active: true,
  },
  {
    id: 'products',
    label: 'Products', 
    icon: <ProductsIcon />,
    onClick: () => navigate('/products'),
    badge: '5', // Show badge with count
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings', // Use href for links
    disabled: false,
  },
];

function App() {
  return (
    <QwickApp appName="MyApp">
      <ResponsiveMenu 
        items={menuItems}
        logoPosition="center" // 'left' | 'center' | 'right'
        onMenuToggle={(isOpen) => console.log('Menu state:', isOpen)}
      />
      {/* Your content */}
    </QwickApp>
  );
}
```

**Responsive Behavior:**

- **Mobile (< 768px)**: Bottom navigation bar
- **Tablet (768-1024px)**: Collapsible sidebar nav rail  
- **Desktop (> 1024px)**: Top navigation with drawer for overflow

## Layout Blocks

Build flexible, responsive layouts with pre-built components:

### Hero Blocks

```tsx
import { HeroBlock } from '@qwickapps/react-framework';

<HeroBlock
  title="Welcome to Our Platform"
  subtitle="The best way to manage your workflow"
  height="large" // 'small' | 'medium' | 'large' | 'fullscreen'
  backgroundImage="/hero-bg.jpg"
  backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  overlayOpacity={0.6}
  textAlign="center"
  actions={
    <div>
      <button>Get Started</button>
      <button>Learn More</button>
    </div>
  }
/>
```

### Multi-Column Layouts

```tsx
import { GridLayout, GridCell } from '@qwickapps/react-framework';

<GridLayout columns={3} spacing="large" equalHeight responsive>
  <GridCell padding="large" background="var(--theme-surface)">
    <h3>Feature One</h3>
    <p>Description here...</p>
  </GridCell>
  <GridCell padding="large" background="var(--theme-surface)">
    <h3>Feature Two</h3>
    <p>More content...</p>
  </GridCell>
  <GridCell padding="large" background="var(--theme-surface)">
    <h3>Feature Three</h3>
    <p>Even more content...</p>
  </GridCell>
</GridLayout>
```

### Feature Grids

```tsx
import { FeatureGrid } from '@qwickapps/react-framework';

<FeatureGrid
  columns={3}
  gap="large"
  features={[
    {
      id: 'fast',
      icon: <FastIcon />,
      title: 'Lightning Fast',
      description: 'Optimized for performance and speed',
      action: <button>Learn More</button>
    },
    {
      id: 'secure',
      icon: <SecureIcon />,
      title: 'Secure by Default',
      description: 'Built with security best practices',
      action: <button>Security Guide</button>
    },
    {
      id: 'scalable',
      icon: <ScaleIcon />,
      title: 'Highly Scalable',
      description: 'Grows with your application needs',
      action: <button>Architecture</button>
    },
  ]}
/>
```

### Content Blocks & Sections

```tsx
import { Section, Content } from '@qwickapps/react-framework';

<Section padding="large" background="alternate" maxWidth="large">
  <Content 
    title="About Our Company"
    variant="elevated" // 'default' | 'elevated' | 'outlined' | 'filled'
    padding="large"
    centered
  >
    <p>Your content here...</p>
  </Content>
</Section>
```

### CollapsibleLayout

Create advanced expandable/collapsible sections with comprehensive features:

```tsx
import { CollapsibleLayout } from '@qwickapps/react-framework';

<CollapsibleLayout
  title="User Settings"
  subtitle="Configure your account preferences"
  defaultCollapsed={false}
  variant="outlined" // 'default' | 'outlined' | 'elevated' | 'filled'
  triggerArea="header" // 'header' | 'button' | 'both'
  animationStyle="slide" // 'fade' | 'slide' | 'scale'
  persistState={true} // Remember state in localStorage
  leadIcon={<SettingsIcon />}
  headerActions={
    <Button size="small">Edit</Button>
  }
>
  <Stack spacing={2}>
    <TextField label="Display Name" />
    <TextField label="Email" />
    <Switch label="Email Notifications" />
  </Stack>
</CollapsibleLayout>
```

**Key Features:**

- **Controlled & Uncontrolled State**: Use `collapsed` prop for controlled state or `defaultCollapsed` for uncontrolled
- **State Persistence**: `persistState` option saves collapsed state to localStorage
- **Multiple Animations**: Choose from fade, slide, or scale animations with customizable duration
- **Flexible Triggers**: Header click, button only, or both can trigger expand/collapse
- **Rich Content Support**: Supports React components, HTML strings, and mixed content
- **Accessibility Built-in**: ARIA attributes, keyboard navigation, and screen reader support
- **Visual Variants**: Material-UI inspired variants (outlined, elevated, filled)
- **CMS Integration**: Full data binding support for content management systems

**Advanced Usage:**

```tsx
// Controlled state with custom icons
const [isCollapsed, setIsCollapsed] = useState(false);

<CollapsibleLayout
  title="Advanced Configuration"
  collapsed={isCollapsed}
  onToggle={setIsCollapsed}
  collapsedIcon={<ExpandMoreIcon />}
  expandedIcon={<ExpandLessIcon />}
  collapsedView={
    <Typography color="text.secondary">
      Click to view configuration options...
    </Typography>
  }
  footerView={
    <Button size="small">Save Changes</Button>
  }
>
  {/* Complex form content */}
</CollapsibleLayout>

// Data binding with CMS
<CollapsibleLayout dataSource="settings.user-preferences" />
```

## CMS Content Components

Transform HTML strings and Markdown content into React components with intelligent element transformation and syntax highlighting.

### Html Component Usage

Transform HTML strings into React components with configurable transformation rules:

```tsx
import { Html } from '@qwickapps/react-framework';

// Basic HTML transformation
<Html>
  {`<h1>Welcome</h1>
    <p>This is a paragraph with <code>inline code</code>.</p>
    <pre><code class="language-javascript">
      const greeting = "Hello, World!";
      console.log(greeting);
    </code></pre>`}
</Html>

// Custom transformation rules
const customRules = [
  {
    selector: 'button',
    transform: (element, key) => (
      <Button key={key} variant="contained">
        {element.textContent}
      </Button>
    )
  }
];

<Html transformConfig={{ rules: customRules }}>
  {htmlContent}
</Html>

// With header stripping (useful for articles)
<Html stripHeaders placeholder="No content available">
  {articleContent}
</Html>
```

**Default Transformations:**

- `<pre><code>` → Code component with syntax highlighting
- `<section class="blog-section">` → Section component
- `<button>` → Button component
- Other elements → Native HTML with SafeSpan content

### Markdown Component Usage

Convert Markdown to React components with full GitHub Flavored Markdown support:

```tsx
import { Markdown } from '@qwickapps/react-framework';

const markdownContent = `
# Welcome to Our Platform

This is **bold text** and this is *italic text*.

## Code Example

Here's some JavaScript:

\`\`\`javascript
const framework = "QwickApps";
console.log(\`Using \${framework} Framework\`);
\`\`\`

And some inline \`code\` here.

## Features

- React components
- Syntax highlighting  
- GitHub Flavored Markdown
- Configurable transformation
`;

<Markdown>{markdownContent}</Markdown>

// With custom HTML transformation config
<Markdown htmlTransformConfig={customConfig}>
  {markdownContent}
</Markdown>

// With placeholder for empty content
<Markdown placeholder="No content to display">
  {emptyContent}
</Markdown>
```

**Key Features:**

- GitHub Flavored Markdown support via marked library
- Automatic syntax highlighting for code blocks
- Inline code preservation
- Custom transformation rules for HTML elements
- Error handling with development debugging
- TypeScript support with comprehensive props interface

### Transform System Architecture

The transform system provides extensible HTML element transformation:

```tsx
import { TransformRule, TransformConfig } from '@qwickapps/react-framework';

// Define custom transformation rules
const articleRules: TransformRule[] = [
  {
    selector: 'pre',
    transform: (element, key) => {
      const codeChild = element.querySelector('code');
      if (!codeChild) return null;
      
      const language = Array.from(codeChild.classList)
        .find(cls => cls.startsWith('language-'))
        ?.replace('language-', '') || 'text';
      
      return (
        <Code key={key} language={language} showCopy>
          {codeChild.textContent || ''}
        </Code>
      );
    }
  },
  // Add more rules...
];

const config: TransformConfig = {
  rules: articleRules,
  sanitize: true,
  fallbackComponent: (element, key) => (
    <SafeSpan key={key} html={element.outerHTML} />
  )
};

// Use with Html or Markdown components
<Html transformConfig={config}>{htmlContent}</Html>
<Markdown htmlTransformConfig={config}>{markdownContent}</Markdown>
```

**Built-in Rule Sets:**

- `defaultArticleRules` - Optimized for blog/article content with header stripping
- `defaultMarkdownRules` - Optimized for Markdown content with inline code preservation

### Integration with Existing Components

The Html and Markdown components integrate seamlessly with existing Framework components:

```tsx
// Article component now uses Html internally
<Article title="Blog Post" author="John Doe">
  {htmlContent} {/* Automatically transformed via Html component */}
</Article>

// Content component detects string children and uses Html
<Content title="Dynamic Content">
  {dynamicHtmlFromCMS} {/* String content automatically transformed */}
</Content>

// Section with Markdown content
<Section padding="large">
  <Content title="Documentation">
    <Markdown>{documentationMarkdown}</Markdown>
  </Content>
</Section>
```

### Error Handling and Fallbacks

Both components provide comprehensive error handling:

```tsx
// Development mode shows detailed errors
<Html>{malformedHtml}</Html> // Shows red border with error details

// Production mode gracefully degrades
<Markdown>{invalidMarkdown}</Markdown> // Falls back to SafeSpan rendering

// Custom error handling
<Html 
  placeholder="Content temporarily unavailable"
  fallbackComponent={(element, key) => (
    <div key={key}>Custom fallback for {element.tagName}</div>
  )}
>
  {riskyContent}
</Html>
```

## Serializable Page System

The QwickApps React Framework includes a sophisticated Page System that enables serializable page templates with comprehensive print support, intelligent print detection, and seamless CMS integration through a schema-driven architecture.

### Core Page System Features

#### 🎯 **Schema-Driven Architecture**

- **ViewSchema**: Base schema with common UI attributes (styling, accessibility, layout)
- **PrintConfigSchema**: Complete print mode configuration with theming and optimization
- **PageTemplateSchema**: Full page models extending ViewSchema with metadata, SEO, and print settings
- **JSON Serialization**: Complete page configurations stored and transmitted as JSON

#### 🖨️ **Intelligent Print Detection**

- **Automatic URL Detection**: `?print=true` parameter triggers print mode instantly
- **Browser Event Integration**: Captures Ctrl+P and print menu events automatically
- **Manual Control**: Programmatic print mode activation with custom configurations
- **Scaffolding Awareness**: Automatically hides navigation and headers in print mode

#### 📊 **CMS Integration Ready**

- **Database Storage**: Store complete page templates as JSON in any database
- **Headless CMS**: Direct integration with Strapi, Contentful, Sanity, and custom APIs
- **Dynamic Loading**: Fetch page templates at runtime with fallback handling
- **Version Control**: Schema versioning for backward compatibility and migrations

### Page Component Usage

#### Basic Page Implementation

```tsx
import { Page, usePrintMode, PageTemplateSchema } from '@qwickapps/react-framework';

// Simple page with props
function HomePage() {
  return (
    <Page
      title="Welcome to Our App"
      description="Experience the best of our platform"
      variant="default"
      padding="large"
      printConfig={{
        theme: 'light',
        hideScaffolding: true,
        showPrintDate: true
      }}
    >
      <h1>Welcome!</h1>
      <p>Your page content here...</p>
    </Page>
  );
}

// Schema-driven page with complete serialization
const pageTemplate: PageTemplateSchema = {
  slug: "about-us",
  name: "About Us", 
  title: "About Our Company | MyApp",
  description: "Learn more about our company history and values",
  metaKeywords: "company, about, history, values, team",
  metaAuthor: "Company Team",
  children: `
    <h1>About Our Company</h1>
    <p>Founded in 2020, we are dedicated to creating amazing experiences...</p>
    <section class="team">
      <h2>Our Team</h2>
      <p>Meet the people behind our success...</p>
    </section>
  `,
  printConfig: {
    theme: "light",
    hideScaffolding: true,
    hideInteractiveElements: true,
    optimizeForMonochrome: true,
    printTitle: "Company Overview - About Us",
    printHeader: "Company Information",
    printFooter: "© 2025 Our Company • Confidential",
    showPrintDate: true
  },
  showInNavigation: true,
  navigationPriority: 2,
  indexable: true
};

function AboutPage() {
  return <Page template={pageTemplate} />;
}
```

### Schema Architecture

#### ViewSchema - Base UI Schema

```tsx
import { ViewSchema } from '@qwickapps/react-framework';

// Base schema for all UI components - provides consistent styling and accessibility
interface ViewSchema {
  // Styling Properties
  className?: string;              // CSS class name for custom styling
  style?: string;                  // Inline styles as JSON string
  id?: string;                     // Unique HTML element ID
  hidden?: boolean;                // Component visibility control
  
  // Accessibility Properties
  'aria-label'?: string;           // Accessibility label for screen readers
  'aria-describedby'?: string;     // IDs of elements describing this component
  'aria-labelledby'?: string;      // IDs of elements labeling this component
  role?: string;                   // ARIA role (button, navigation, main, etc.)
  
  // Testing Properties
  'data-testid'?: string;          // Test automation identifier
}

// Example: Custom component extending ViewSchema
class CustomCard extends ViewSchema {
  @Field()
  title?: string;
  
  @Field()
  content?: string;
  
  // Inherits all styling and accessibility properties from ViewSchema
}
```

#### PrintConfigSchema - Print Configuration

```tsx
import { PrintConfigSchema } from '@qwickapps/react-framework';

interface PrintConfigSchema {
  // Theme & Appearance
  theme?: 'light' | 'dark';              // Print theme mode
  palette?: string;                      // Color palette (default, autumn, cosmic, etc.)
  optimizeForMonochrome?: boolean;       // Black & white print optimization
  
  // Layout Control
  hideScaffolding?: boolean;             // Hide navigation, headers, footers
  hideInteractiveElements?: boolean;     // Hide buttons, forms, interactive content
  
  // Print Metadata
  printTitle?: string;                   // Custom title for print header
  printHeader?: string;                  // Custom header text
  printFooter?: string;                  // Custom footer text
  showPrintDate?: boolean;               // Include print timestamp
}

// Advanced print configuration examples
const reportPrintConfig: PrintConfigSchema = {
  theme: 'light',
  palette: 'default',
  hideScaffolding: true,
  hideInteractiveElements: true,
  optimizeForMonochrome: true,
  printTitle: 'Quarterly Sales Report - Q4 2024',
  printHeader: 'CONFIDENTIAL - Internal Use Only',
  printFooter: 'Page [page] of [total] • Generated on [date] • QwickApps.com',
  showPrintDate: true
};

const invoicePrintConfig: PrintConfigSchema = {
  theme: 'light',
  hideScaffolding: true,
  hideInteractiveElements: true,
  printTitle: 'Invoice #INV-2024-001',
  printFooter: 'Thank you for your business!',
  showPrintDate: false // Don't show print date on invoices
};
```

#### PageTemplateSchema - Complete Page Model

```tsx
import { PageTemplateSchema, PrintConfigSchema } from '@qwickapps/react-framework';

interface PageTemplateSchema extends ViewSchema {
  // Page Identity & Navigation
  slug?: string;                    // URL-friendly identifier (e.g., "about-us")
  name?: string;                    // Human-readable page name
  icon?: string;                    // Page icon for navigation
  
  // SEO & Metadata
  title?: string;                   // HTML title tag content
  description?: string;             // Meta description for search engines
  metaKeywords?: string;            // SEO keywords (comma-separated)
  metaAuthor?: string;              // Page author information
  canonicalUrl?: string;            // Canonical URL for SEO
  indexable?: boolean;              // Allow search engine indexing
  
  // Content & Layout
  children?: React.ReactNode | string;    // Page content (JSX or HTML string)
  layout?: string;                  // Layout template identifier
  
  // Print Configuration
  printConfig?: PrintConfigSchema;  // Print mode settings
  
  // Access Control
  requiresAuth?: boolean;           // Authentication required
  requiredRoles?: string;           // Required user roles (comma-separated)
  
  // Navigation Control
  showInNavigation?: boolean;       // Include in navigation menus
  navigationPriority?: number;      // Menu ordering (lower = higher priority)
}

// Complete page template examples
const productPageTemplate: PageTemplateSchema = {
  // Identity
  slug: "premium-widgets",
  name: "Premium Widgets",
  icon: "widgets",
  
  // SEO
  title: "Premium Widgets - Best Quality Widgets | Our Store",
  description: "Discover our premium widget collection with superior quality and innovative designs.",
  metaKeywords: "widgets, premium, quality, innovative, store",
  metaAuthor: "Product Team",
  canonicalUrl: "https://ourstore.com/products/premium-widgets",
  indexable: true,
  
  // Content (can be HTML string or React components)
  children: `
    <div class="product-page">
      <h1>Premium Widgets</h1>
      <div class="product-gallery">
        <!-- Product images would go here -->
      </div>
      <div class="product-details">
        <h2>Product Features</h2>
        <ul>
          <li>Superior build quality</li>
          <li>Innovative design</li>
          <li>5-year warranty</li>
        </ul>
      </div>
      <div class="product-actions">
        <button class="btn-primary">Add to Cart</button>
        <button class="btn-secondary">Add to Wishlist</button>
      </div>
    </div>
  `,
  
  // Print configuration for product pages
  printConfig: {
    theme: 'light',
    hideScaffolding: true,
    hideInteractiveElements: true,      // Hide Add to Cart buttons when printing
    printTitle: 'Premium Widgets - Product Information',
    printFooter: 'Visit ourstore.com for latest pricing and availability',
    showPrintDate: true
  },
  
  // Navigation
  showInNavigation: true,
  navigationPriority: 5,
  
  // Access (no authentication required for product pages)
  requiresAuth: false
};

const adminDashboardTemplate: PageTemplateSchema = {
  slug: "admin-dashboard",
  name: "Admin Dashboard",
  title: "Administrator Dashboard | Our App",
  description: "Administrative dashboard with user management and analytics",
  
  // Restricted content
  requiresAuth: true,
  requiredRoles: "admin,superuser",
  showInNavigation: true,
  navigationPriority: 1,
  indexable: false,  // Don't index admin pages
  
  // Admin-specific print configuration
  printConfig: {
    theme: 'light',
    hideScaffolding: true,
    printTitle: 'Administrator Dashboard Report',
    printHeader: 'CONFIDENTIAL - Administrative Data',
    showPrintDate: true,
    optimizeForMonochrome: true
  }
};
```

### Print Mode Integration

#### usePrintMode Hook - Comprehensive Print Control

```tsx
import { usePrintMode } from '@qwickapps/react-framework';

function DocumentPage() {
  const { 
    isPrintMode, 
    printConfig, 
    enterPrintMode, 
    exitPrintMode, 
    togglePrintMode 
  } = usePrintMode({
    theme: 'light',
    hideScaffolding: true,
    showPrintDate: true,
    printTitle: 'Important Document',
    optimizeForMonochrome: false
  });

  // Print mode is automatically detected from:
  // 1. URL parameter: ?print=true
  // 2. Browser print events (Ctrl+P, File > Print)
  // 3. Manual activation via the functions below

  const handleCustomPrint = () => {
    // Enter print mode with custom configuration
    enterPrintMode({
      theme: 'light',
      hideInteractiveElements: true,
      printTitle: 'Custom Print Title',
      printHeader: 'CONFIDENTIAL',
      optimizeForMonochrome: true
    });
    
    // Trigger browser print dialog
    setTimeout(() => window.print(), 100);
  };

  return (
    <div>
      {/* Print mode indicator */}
      {isPrintMode && (
        <div className="print-mode-banner">
          <span>📄 Print Mode Active</span>
          <span>Theme: {printConfig.theme}</span>
          <span>Monochrome: {printConfig.optimizeForMonochrome ? 'Yes' : 'No'}</span>
        </div>
      )}
      
      {/* Print controls (hidden in print mode) */}
      {!isPrintMode && (
        <div className="print-controls">
          <button onClick={() => togglePrintMode()}>
            Toggle Print Mode
          </button>
          <button onClick={handleCustomPrint}>
            Print Document
          </button>
          <button onClick={() => {
            enterPrintMode({ optimizeForMonochrome: true });
          }}>
            Print in B&W
          </button>
        </div>
      )}
      
      {/* Page content */}
      <main>
        <h1>Document Title</h1>
        <p>Your document content here...</p>
      </main>
    </div>
  );
}
```

#### Print URL Integration

```tsx
// Automatic print mode via URL
// Navigate to: https://yourapp.com/document?print=true

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/document" element={
          <Page 
            title="Document"
            printConfig={{
              hideScaffolding: true,
              showPrintDate: true,
              printTitle: 'Important Document'
            }}
          >
            <DocumentContent />
          </Page>
        } />
      </Routes>
    </Router>
  );
}

// The Page component automatically detects ?print=true and activates print mode
```

### CMS and Database Integration

#### Dynamic Page Loading from CMS

```tsx
import { Page, PageTemplateSchema } from '@qwickapps/react-framework';

// Headless CMS integration example
function CMSPage({ pageSlug }: { pageSlug: string }) {
  const [pageTemplate, setPageTemplate] = useState<PageTemplateSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch page template from CMS
    fetchPageFromCMS(pageSlug)
      .then(template => {
        setPageTemplate(template);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [pageSlug]);

  // Loading state
  if (loading) {
    return (
      <Page title="Loading..." loading={{ type: 'spinner', message: 'Loading page...' }}>
        <div>Loading page content...</div>
      </Page>
    );
  }

  // Error state
  if (error) {
    return (
      <Page 
        title="Error" 
        message={{ type: 'error', content: `Failed to load page: ${error}` }}
      >
        <div>Page could not be loaded</div>
      </Page>
    );
  }

  // Render page from CMS template
  return pageTemplate ? (
    <Page template={pageTemplate} />
  ) : (
    <Page title="Not Found" message={{ type: 'warning', content: 'Page not found' }}>
      <h1>Page Not Found</h1>
      <p>The requested page could not be found.</p>
    </Page>
  );
}

// CMS API integration function
async function fetchPageFromCMS(slug: string): Promise<PageTemplateSchema> {
  // Example: Strapi CMS integration
  const response = await fetch(`/api/pages?filters[slug][$eq]=${slug}&populate=*`);
  if (!response.ok) {
    throw new Error('Page not found');
  }
  
  const { data } = await response.json();
  if (!data.length) {
    throw new Error('Page not found');
  }
  
  const cmsPage = data[0].attributes;
  
  // Transform CMS data to PageTemplateSchema
  const pageTemplate: PageTemplateSchema = {
    slug: cmsPage.slug,
    name: cmsPage.name,
    title: cmsPage.seoTitle || cmsPage.name,
    description: cmsPage.seoDescription,
    metaKeywords: cmsPage.metaKeywords,
    metaAuthor: cmsPage.author?.name,
    children: cmsPage.content,
    printConfig: {
      theme: cmsPage.printTheme || 'light',
      hideScaffolding: cmsPage.printHideNavigation ?? true,
      showPrintDate: cmsPage.printShowDate ?? true,
      printTitle: cmsPage.printTitle || cmsPage.name
    },
    showInNavigation: cmsPage.showInMenu ?? true,
    navigationPriority: cmsPage.menuOrder || 0,
    requiresAuth: cmsPage.requiresAuthentication ?? false,
    indexable: cmsPage.seoIndexable ?? true
  };
  
  return pageTemplate;
}
```

#### Database Storage Example

```tsx
// Example: Storing page templates in database
const pageTemplates = [
  {
    id: 1,
    template: JSON.stringify({
      slug: "home",
      name: "Home",
      title: "Welcome to Our App | Home",
      description: "Experience the best of our platform",
      children: "<h1>Welcome!</h1><p>Get started with our amazing features...</p>",
      printConfig: {
        theme: "light",
        hideScaffolding: true,
        showPrintDate: true
      }
    } as PageTemplateSchema)
  },
  // More templates...
];

// Loading page from database
function DatabasePage({ pageId }: { pageId: number }) {
  const [template, setTemplate] = useState<PageTemplateSchema | null>(null);

  useEffect(() => {
    // Simulate database fetch
    const dbPage = pageTemplates.find(p => p.id === pageId);
    if (dbPage) {
      setTemplate(JSON.parse(dbPage.template));
    }
  }, [pageId]);

  return template ? <Page template={template} /> : <div>Loading...</div>;
}
```

### Page Context and Lifecycle

#### Advanced Page Context Usage

```tsx
import { usePageContext, usePage } from '@qwickapps/react-framework';

function PageAwareComponent() {
  const { route, isPrintMode, printConfig } = usePageContext();
  const { setTitle, setDescription } = usePage();

  useEffect(() => {
    // Dynamic page metadata updates
    setTitle(`Dynamic Title - ${Date.now()}`);
    setDescription('Dynamically updated description');
  }, []);

  // Render differently based on print mode
  if (isPrintMode) {
    return (
      <div className="print-optimized">
        <h2>Print-Optimized View</h2>
        <p>Current route: {route}</p>
        <p>Print theme: {printConfig.theme}</p>
        <p>Print date shown: {printConfig.showPrintDate ? 'Yes' : 'No'}</p>
        {/* Simplified content for printing */}
      </div>
    );
  }

  return (
    <div className="interactive-view">
      <h2>Interactive View</h2>
      <p>Route: {route}</p>
      <button onClick={() => alert('Interactive element')}>
        Click me
      </button>
      {/* Full interactive content */}
    </div>
  );
}
```

### Page Variants and Layout Options

#### Advanced Page Styling

```tsx
// Different page layout variants for different use cases
function LayoutExamples() {
  return (
    <>
      {/* Centered layout for landing pages */}
      <Page 
        variant="centered" 
        padding="large" 
        maxWidth="medium"
        background="default"
        title="Landing Page"
      >
        <h1>Welcome to Our App</h1>
        <p>Centered content with medium width</p>
      </Page>

      {/* Full width for dashboards */}
      <Page 
        variant="fullwidth" 
        padding="small" 
        background="surface"
        title="Dashboard"
      >
        <div className="dashboard-grid">
          {/* Dashboard widgets */}
        </div>
      </Page>

      {/* Narrow layout for articles/blogs */}
      <Page 
        variant="narrow" 
        padding="large" 
        background="default"
        title="Blog Article"
        printConfig={{
          hideScaffolding: true,
          optimizeForMonochrome: true,
          printTitle: 'Article Title'
        }}
      >
        <article>
          <h1>Article Title</h1>
          <p>Narrow layout optimized for reading...</p>
        </article>
      </Page>

      {/* Wide layout for data tables */}
      <Page 
        variant="wide" 
        padding="medium" 
        background="surface"
        title="Data Tables"
      >
        <table className="data-table">
          {/* Wide table content */}
        </table>
      </Page>
    </>
  );
}
```

## Advanced Print System

The QwickApps React Framework includes a sophisticated print system that enables professional print layouts with intelligent detection, dynamic configuration, and comprehensive theming support.

### Print Mode Detection

The print system automatically detects print mode through multiple channels:

#### URL Parameter Detection

```tsx
// Navigate to URL with print parameter to automatically enter print mode
https://yourapp.com/document?print=true

// Print mode activates immediately with configured settings
```

#### Browser Print Event Detection

```tsx
// Automatic detection of Ctrl+P (Windows/Linux) or Cmd+P (Mac)
// Also detects File > Print menu usage
// Print mode applies before print dialog opens
```

#### Manual Print Mode Control

```tsx
import { usePrintMode } from '@qwickapps/react-framework';

function DocumentPage() {
  const { 
    isPrintMode, 
    printConfig, 
    enterPrintMode, 
    exitPrintMode, 
    togglePrintMode,
    triggerPrint 
  } = usePrintMode();

  const handlePrint = () => {
    // Enter print mode with custom configuration
    triggerPrint({
      theme: 'light',
      hideScaffolding: true,
      showPrintDate: true,
      printTitle: 'Custom Document Title'
    });
    
    // Trigger browser print dialog
    setTimeout(() => window.print(), 100);
  };

  return (
    <div>
      {isPrintMode ? (
        <div className="print-mode-banner">
          Print Mode Active - {printConfig.theme} theme
        </div>
      ) : (
        <button onClick={handlePrint}>Print Document</button>
      )}
      
      <main>
        <h1>Document Content</h1>
        <p>Your document content here...</p>
      </main>
    </div>
  );
}
```

### Print Configuration System

#### Complete Print Configuration Options

```tsx
import { PrintConfigSchema } from '@qwickapps/react-framework';

const advancedPrintConfig: PrintConfigSchema = {
  // Theme Control
  theme: 'light' | 'dark',                    // Print theme mode
  palette: 'default' | 'autumn' | 'cosmic',   // Color palette
  optimizeForMonochrome: true,                 // B&W optimization
  
  // Layout Control
  hideScaffolding: true,                       // Hide navigation/headers
  hideInteractiveElements: true,               // Hide buttons/forms
  pageMargins: '12mm',                         // 0mm, 6mm, 12mm, 20mm, 25mm
  
  // Custom Headers & Footers
  printTitle: 'Quarterly Report - Q4 2024',   // Custom document title
  printHeader: '<div>CONFIDENTIAL</div>',     // Custom header content
  printFooter: 'Page [page] of [total]',      // Custom footer content
  printHeaderFirstPage: '<div>Cover Page</div>', // Different first page header
  printFooterFirstPage: 'Generated: [date]',     // Different first page footer
  
  // Background & Styling
  printBackground: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  printBackgroundFirstPage: 'url(/logo-watermark.png) center, #ffffff',
  
  // Header/Footer Sizing
  printHeaderHeight: '60px',                   // CSS units (px, mm, etc.)
  printFooterHeight: '40px',                   // CSS units (px, mm, etc.)
  
  // Metadata
  showPrintDate: true                          // Include print timestamp
};
```

#### Page Component with Print Configuration

```tsx
import { Page, PrintConfigSchema } from '@qwickapps/react-framework';

// Using Page component with print configuration
function ReportPage() {
  const printConfig: Partial<PrintConfigSchema> = {
    theme: 'light',
    hideScaffolding: true,
    hideInteractiveElements: true,
    optimizeForMonochrome: true,
    printTitle: 'Annual Sales Report',
    printHeader: 'CONFIDENTIAL - Internal Use Only',
    printFooter: 'Company © 2024 • Generated on [date]',
    pageMargins: '20mm',
    showPrintDate: true
  };

  return (
    <Page
      title="Annual Sales Report"
      description="Comprehensive sales analysis for fiscal year"
      printConfig={printConfig}
    >
      <h1>Annual Sales Report</h1>
      <div className="report-content">
        {/* Report content */}
      </div>
    </Page>
  );
}
```

### Page Margins and Layout Options

#### Edge-to-Edge Printing (0mm margins)

```tsx
const borderlessPrintConfig = {
  pageMargins: '0mm',        // Complete edge-to-edge printing
  printBackground: '#f0f0f0' // Background covers entire page
};
```

#### Standard Margin Options

```tsx
const marginOptions = {
  compact: { pageMargins: '6mm' },      // Minimal margins
  standard: { pageMargins: '12mm' },     // Standard business documents
  large: { pageMargins: '20mm' },        // Formal documents
  formal: { pageMargins: '25mm' }        // Academic/legal documents
};
```

### Dynamic CSS Variable System

The print system uses CSS variables for dynamic header/footer positioning:

```css
/* Automatically generated during print mode */
@media print {
  .page-print-mode {
    --print-header-height: 60px;    /* Measured or configured */
    --print-footer-height: 40px;    /* Measured or configured */
    --print-background: transparent; /* Configured background */
  }
}

/* Use in your custom print styles */
.custom-print-content {
  margin-top: var(--print-header-height);
  margin-bottom: var(--print-footer-height);
  background: var(--print-background);
}
```

### Advanced Print Headers and Footers

#### ReactNode Headers/Footers

```tsx
import { SafeSpan } from '@qwickapps/react-framework';

const customPrintConfig = {
  // React component header
  printHeader: (
    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
      <h2>Company Annual Report</h2>
      <p>Confidential - Internal Use Only</p>
    </div>
  ),
  
  // HTML string footer
  printFooter: `
    <div style="display: flex; justify-content: space-between;">
      <span>© 2024 Company Name</span>
      <span>Page [page] of [total]</span>
      <span>Generated: ${new Date().toLocaleDateString()}</span>
    </div>
  `,
  
  // Different first page header
  printHeaderFirstPage: (
    <div className="cover-page-header">
      <img src="/company-logo.png" alt="Company Logo" />
      <h1>Annual Report 2024</h1>
    </div>
  )
};
```

#### Template Variables in Headers/Footers

```tsx
const templatePrintConfig = {
  printFooter: 'Page [page] of [total] • Generated on [date] • company.com',
  printHeader: 'Document: [title] • Department: [department] • Classification: [level]'
};

// Template variables are automatically replaced:
// [page] → Current page number
// [total] → Total page count  
// [date] → Current date/time
// [title] → Document title
// Custom variables from page context
```

### Print-Specific Page Variants

#### Different Layout Variants for Print

```tsx
function DocumentPage() {
  return (
    <Page
      variant="narrow"           // Optimized for reading
      padding="large"
      background="default"
      printConfig={{
        hideScaffolding: true,
        optimizeForMonochrome: true,
        printTitle: 'Article Title'
      }}
    >
      <article>
        <h1>Article Title</h1>
        <p>Content optimized for print...</p>
      </article>
    </Page>
  );
}

// Wide layout for tables and data
function DataTablePage() {
  return (
    <Page
      variant="wide"
      padding="small"
      printConfig={{
        pageMargins: '6mm',        // Minimize margins for tables
        hideScaffolding: true,
        printTitle: 'Data Report'
      }}
    >
      <table className="data-table">
        {/* Wide table content */}
      </table>
    </Page>
  );
}
```

### Integration with Page Templates

#### Schema-Driven Print Configuration

```tsx
import { PageTemplateSchema } from '@qwickapps/react-framework';

const pageTemplate: PageTemplateSchema = {
  slug: "financial-report",
  name: "Financial Report",
  title: "Q4 Financial Report | Company",
  description: "Quarterly financial analysis and projections",
  
  // Complete print configuration in schema
  printConfig: {
    theme: "light",
    hideScaffolding: true,
    hideInteractiveElements: true,
    optimizeForMonochrome: true,
    printTitle: "Q4 2024 Financial Report",
    printHeader: "CONFIDENTIAL - Financial Department",
    printFooter: "© 2024 Company • Internal Use Only",
    pageMargins: "20mm",
    showPrintDate: true,
    printBackground: "linear-gradient(to bottom, #f8f9fa, #ffffff)"
  },
  
  children: `
    <div class="financial-report">
      <h1>Q4 Financial Performance</h1>
      <section class="metrics">
        <!-- Financial content -->
      </section>
    </div>
  `
};

// Use template-driven page
function FinancialReportPage() {
  return <Page template={pageTemplate} />;
}
```

### Print Mode Context and State Management

#### Accessing Print State Throughout App

```tsx
import { usePageContext } from '@qwickapps/react-framework';

function PrintAwareComponent() {
  const { 
    isPrintMode, 
    printConfig, 
    triggerPrint 
  } = usePageContext();

  // Conditional rendering based on print mode
  if (isPrintMode) {
    return (
      <div className="print-optimized">
        <h2>Print-Optimized View</h2>
        <p>Simplified content for printing</p>
        <p>Theme: {printConfig.theme}</p>
      </div>
    );
  }

  return (
    <div className="interactive-view">
      <h2>Interactive View</h2>
      <button onClick={() => triggerPrint({ 
        optimizeForMonochrome: true,
        printTitle: 'Custom Print Title'
      })}>
        Print This Page
      </button>
    </div>
  );
}
```

### Print CSS Classes and Styling

#### Automatic Print Mode Classes

```css
/* Page automatically gets print mode classes */
.page-print-mode {
  /* Applied when in print mode */
}

.page-print-borderless {
  /* Applied when pageMargins: '0mm' */
}

.page-print-compact {
  /* Applied when pageMargins: '6mm' */
}

.page-print-large {
  /* Applied when pageMargins: '20mm' */
}

.page-print-formal {
  /* Applied when pageMargins: '25mm' */
}

.has-background {
  /* Applied when custom background is specified */
}
```

#### Custom Print Styling

```css
/* Print-specific component styling */
@media print {
  .interactive-element {
    display: none !important; /* Hide interactive elements */
  }
  
  .print-only {
    display: block !important; /* Show print-only content */
  }
  
  .page-break-before {
    page-break-before: always; /* Force page breaks */
  }
  
  .no-break {
    page-break-inside: avoid; /* Prevent breaking */
  }
}

/* Print header/footer styling */
.page-print-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--print-header-height);
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
}

.page-print-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--print-footer-height);
  background: white;
  border-top: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
}
```

### Print System Best Practices

#### Performance Optimization

```tsx
// Efficient print mode detection
const { isPrintMode } = usePrintMode();

// Conditional loading of print-specific components
const PrintableContent = lazy(() => import('./PrintableContent'));

// Memoized print configuration
const printConfig = useMemo(() => ({
  theme: 'light',
  hideScaffolding: true,
  optimizeForMonochrome: true
}), []);
```

#### Accessibility in Print Mode

```tsx
const accessiblePrintConfig = {
  // High contrast for accessibility
  optimizeForMonochrome: true,
  theme: 'light',
  
  // Clear headers for navigation
  printHeader: 'Document Title - Section Navigation',
  
  // Informative footers
  printFooter: 'Page [page] of [total] - Contact: support@company.com'
};
```

#### Multi-Page Document Handling

```tsx
function MultiPageDocument() {
  return (
    <Page printConfig={{
      pageMargins: '20mm',
      printHeader: 'Multi-Page Report',
      printFooter: 'Page [page] of [total]',
      printBackground: 'white'
    }}>
      <section className="page-break-before">
        <h1>Chapter 1</h1>
        <p>Content that starts on a new page...</p>
      </section>
      
      <section className="page-break-before">
        <h1>Chapter 2</h1>
        <p>Content that starts on another new page...</p>
      </section>
      
      <div className="no-break">
        <h2>Important Section</h2>
        <p>Content that should not be split across pages...</p>
      </div>
    </Page>
  );
}
```

### Migration Guide

#### Converting Legacy Pages to New System

```tsx
// BEFORE: Legacy page implementation
function LegacyHomePage() {
  useEffect(() => {
    document.title = "Home | My App";
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Welcome to My App</h1>
      </div>
      <div className="page-content">
        <p>Some content here...</p>
      </div>
    </div>
  );
}

// AFTER: New Page system (Method 1: Props-based)
function NewHomePage() {
  return (
    <Page
      title="Home | My App"
      description="Welcome to our application"
      variant="default"
      padding="medium"
      printConfig={{
        hideScaffolding: true,
        showPrintDate: true
      }}
    >
      <h1>Welcome to My App</h1>
      <p>Some content here...</p>
    </Page>
  );
}

// AFTER: New Page system (Method 2: Template-based)
const homePageTemplate: PageTemplateSchema = {
  slug: "home",
  name: "Home",
  title: "Home | My App",
  description: "Welcome to our application",
  children: `
    <h1>Welcome to My App</h1>
    <p>Some content here...</p>
  `,
  printConfig: {
    theme: 'light',
    hideScaffolding: true,
    showPrintDate: true
  },
  showInNavigation: true,
  navigationPriority: 0
};

function TemplateHomePage() {
  return <Page template={homePageTemplate} />;
}

// AFTER: CMS-integrated page
function CMSHomePage() {
  return (
    <Page
      dataSource="api/pages/home"
      title="Home | My App"  // Fallback if CMS data fails
      description="Welcome to our application"
    >
      {/* Fallback content */}
      <h1>Loading...</h1>
    </Page>
  );
}
```

#### Print-Aware Migration

```tsx
// BEFORE: Manual print handling
function LegacyPrintablePage() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);
    
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return (
    <div className={isPrinting ? 'print-mode' : ''}>
      {!isPrinting && <nav>Navigation</nav>}
      <main>Content</main>
    </div>
  );
}

// AFTER: Automatic print handling with Page system
function NewPrintablePage() {
  return (
    <Page
      title="Printable Document"
      printConfig={{
        hideScaffolding: true,              // Automatically hides navigation
        hideInteractiveElements: true,       // Hides buttons when printing
        optimizeForMonochrome: true,         // Optimizes for B&W printing
        printTitle: 'Important Document',    // Custom print title
        showPrintDate: true                  // Shows print date
      }}
    >
      <main>Content</main>
      <button>Interactive Element</button>  {/* Hidden in print mode */}
    </Page>
  );
}
```

### Best Practices

#### Page System Best Practices

1. **Use Templates for CMS**: Always use `PageTemplateSchema` for CMS-driven content
2. **Print Configuration**: Define print behavior early in development
3. **SEO Optimization**: Always include title, description, and metadata
4. **Accessibility**: Use proper heading hierarchy and ARIA attributes
5. **Performance**: Lazy load heavy content and optimize images for print

#### Schema Design Patterns

```tsx
// Good: Comprehensive page template
const wellDesignedTemplate: PageTemplateSchema = {
  // Clear identity
  slug: "user-guide",
  name: "User Guide",
  
  // Complete SEO
  title: "User Guide - How to Use Our App | MyApp",
  description: "Comprehensive guide to using all features of MyApp effectively",
  metaKeywords: "user guide, tutorial, help, documentation",
  metaAuthor: "Documentation Team",
  
  // Print-optimized
  printConfig: {
    theme: 'light',
    hideScaffolding: true,
    hideInteractiveElements: true,
    printTitle: 'User Guide v2.1',
    printFooter: 'For latest updates, visit myapp.com/guide',
    showPrintDate: true,
    optimizeForMonochrome: true
  },
  
  // Proper navigation
  showInNavigation: true,
  navigationPriority: 3,
  
  // No authentication needed for user guide
  requiresAuth: false,
  indexable: true
};
```

## Component Serialization System

The QwickApps React Framework includes a powerful Component Serialization System that enables "WebView for React" functionality. Components can be serialized to JSON, transmitted across boundaries, stored in databases or CMS systems, and reconstructed as fully functional React components.

### Basic Serialization Usage

```tsx
import { 
  ComponentTransformer, 
  Code, Image, Text, HeroBlock, GridLayout, GridCell, Button,
  TextInputField, SelectInputField, HtmlInputField, ChoiceInputField, SwitchInputField, FormBlock
} from '@qwickapps/react-framework';

// Create components
const codeComponent = (
  <Code language="javascript" showCopy={true} title="example.js">
    const greeting = 'Hello, Serialization!';
    console.log(greeting);
  </Code>
);

const imageComponent = (
  <Image 
    src="/example.jpg" 
    alt="Example image"
    width={400}
    height={300}
    responsive={true}
    loading="lazy"
  />
);

const textComponent = (
  <Text 
    variant="h2" 
    color="primary" 
    align="center"
    component="h1"
    gutterBottom={true}
  >
    Welcome to Component Serialization!
  </Text>
);

// Complex component with nested elements
const heroBlockComponent = (
  <HeroBlock
    title="Serializable Hero Section"
    subtitle="Full functionality preserved through JSON serialization"
    backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    height="medium"
    actions={[
      <Button key="primary" variant="contained" color="primary">Get Started</Button>,
      <Button key="secondary" variant="outlined" color="secondary">Learn More</Button>
    ]}
  />
);

// Responsive grid layout with nested components
const gridLayoutComponent = (
  <GridLayout columns={3} spacing="large" equalHeight responsive>
    <GridCell xs={12} sm={6} md={4} padding="medium">
      <Text variant="h3">Feature One</Text>
      <Text variant="body1">Description of the first feature</Text>
    </GridCell>
    <GridCell xs={12} sm={6} md={4} padding="medium">
      <Text variant="h3">Feature Two</Text>
      <Text variant="body1">Description of the second feature</Text>
    </GridCell>
    <GridCell xs={12} sm={12} md={4} padding="medium">
      <Text variant="h3">Feature Three</Text>
      <Text variant="body1">Description of the third feature</Text>
    </GridCell>
  </GridLayout>
);

// Form components with state management
const formComponent = (
  <FormBlock title="User Registration" status="active">
    <TextInputField 
      value="John Doe"
      placeholder="Enter your name"
      required={true}
      validation={{ minLength: 2 }}
    />
    <SelectInputField
      value="admin"
      options={[
        { label: "Administrator", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" }
      ]}
      required={true}
    />
    <HtmlInputField
      value="<p>Rich <strong>text</strong> content</p>"
      placeholder="Enter description"
    />
    <ChoiceInputField
      value={["option1", "option2"]}
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    />
    <SwitchInputField
      value={true}
      label="Enable notifications"
      validation={{ required: true }}
    />
  </FormBlock>
);

// Serialize to JSON string
const serializedCode = ComponentTransformer.serialize(codeComponent);
const serializedImage = ComponentTransformer.serialize(imageComponent);
const serializedText = ComponentTransformer.serialize(textComponent);
const serializedHero = ComponentTransformer.serialize(heroBlockComponent);
const serializedGrid = ComponentTransformer.serialize(gridLayoutComponent);
const serializedForm = ComponentTransformer.serialize(formComponent);

// Deserialize back to React components
const reconstructedCode = ComponentTransformer.deserialize(serializedCode);
const reconstructedImage = ComponentTransformer.deserialize(serializedImage);
const reconstructedText = ComponentTransformer.deserialize(serializedText);
const reconstructedHero = ComponentTransformer.deserialize(serializedHero);
const reconstructedGrid = ComponentTransformer.deserialize(serializedGrid);
const reconstructedForm = ComponentTransformer.deserialize(serializedForm);
// All components are fully functional with all properties preserved, including nested components, responsive breakpoints, and form state
```

### Serialized Data Format

Components are serialized using a standardized format:

```json
// Code Component
{
  "tag": "Code",
  "version": "1.0.0",
  "data": {
    "children": "const greeting = 'Hello, Serialization!';\nconsole.log(greeting);",
    "language": "javascript",
    "showCopy": true,
    "title": "example.js"
  }
}

// Image Component  
{
  "tag": "Image",
  "version": "1.0.0",
  "data": {
    "src": "/example.jpg",
    "alt": "Example image",
    "width": 400,
    "height": 300,
    "responsive": true,
    "loading": "lazy"
  }
}

// Text Component
{
  "tag": "Text",
  "version": "1.0.0",
  "data": {
    "children": "Welcome to Component Serialization!",
    "variant": "h2",
    "color": "primary",
    "align": "center",
    "component": "h1",
    "gutterBottom": true
  }
}

// HeroBlock Component with Nested Elements
{
  "tag": "HeroBlock", 
  "version": "1.0.0",
  "data": {
    "title": "Serializable Hero Section",
    "subtitle": "Full functionality preserved through JSON serialization",
    "backgroundGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "height": "medium",
    "actions": "[{\"key\":\"primary\",\"type\":\"Button\",\"props\":{\"variant\":\"contained\",\"color\":\"primary\",\"children\":\"Get Started\"}},{\"key\":\"secondary\",\"type\":\"Button\",\"props\":{\"variant\":\"outlined\",\"color\":\"secondary\",\"children\":\"Learn More\"}}]"
  }
}

// GridLayout Component with Responsive Configuration
{
  "tag": "GridLayout",
  "version": "1.0.0", 
  "data": {
    "columns": 3,
    "spacing": "large",
    "equalHeight": true,
    "responsive": true,
    "children": "[{\"tag\":\"GridCell\",\"version\":\"1.0.0\",\"data\":{\"xs\":12,\"sm\":6,\"md\":4,\"padding\":\"medium\",\"children\":\"Feature content...\"}},{\"tag\":\"GridCell\",\"version\":\"1.0.0\",\"data\":{\"xs\":12,\"sm\":6,\"md\":4,\"padding\":\"medium\",\"children\":\"More content...\"}}]"
  }
}

// GridCell Component with Responsive Breakpoints
{
  "tag": "GridCell",
  "version": "1.0.0",
  "data": {
    "xs": 12,
    "sm": 6, 
    "md": 4,
    "lg": 3,
    "xl": 2,
    "padding": "medium",
    "children": "Cell content with responsive breakpoint configuration"
  }
}
```

### CMS and API Integration

The serialization system is perfect for CMS integration:

```tsx
// API returns serialized components
const response = await fetch('/api/content/components');
const { components } = await response.json();

// Render components from API/CMS data
function DynamicContent() {
  return (
    <div>
      {components.map((componentData, index) => (
        <div key={index}>
          {ComponentTransformer.deserialize(componentData)}
        </div>
      ))}
    </div>
  );
}

// CMS provides serialized component data
const cmsData = {
  tag: "Code",
  version: "1.0.0",
  data: {
    children: "// Code from CMS\nconst cms = 'integration';",
    language: "javascript",
    showCopy: true,
    title: "CMS Example"
  }
};

// Automatic reconstruction from CMS
const cmsComponent = ComponentTransformer.deserialize(cmsData);
```

### Data Binding with Serialization

Components with data binding maintain their connections through serialization:

```tsx
// Component with data binding
const dataBoundComponent = (
  <Code 
    dataSource="api/code-examples/fibonacci"
    bindingOptions={{ cache: true, cacheTTL: 300000 }}
    language="javascript"
    showCopy={true}
  />
);

// Serialization preserves data binding configuration
const serialized = ComponentTransformer.serialize(dataBoundComponent);

// After deserialization, data binding continues to work
const deserialized = ComponentTransformer.deserialize(serialized);
// Component will still load data from "api/code-examples/fibonacci"
```

### Performance Characteristics

The serialization system is highly optimized:

- **Serialization Speed**: <1ms for typical components
- **Deserialization Speed**: <1ms for component reconstruction
- **Scalability**: Handles 1000+ components in <50ms
- **Memory Usage**: <50MB for component trees with 5000+ components
- **Cross-Browser**: Consistent performance across all major browsers

### Creating Serializable Components

The Code component serves as the reference implementation. To make your own components serializable:

```tsx
import React, { ReactElement } from 'react';
import { Serializable } from '@qwickapps/react-framework';

export class MyComponent extends React.Component<MyComponentProps> implements Serializable {
  // Component self-declaration
  static readonly tagName = 'MyComponent';
  static readonly version = '1.0.0';
  
  // Deserialization: JSON data → React element
  static fromJson(jsonData: any): ReactElement {
    return <MyComponent {...jsonData} />;
  }
  
  // Serialization: Component instance → JSON data
  toJson(): any {
    return {
      title: this.props.title,
      content: this.props.content,
      // Add all serializable props
    };
  }

  render() {
    return <MyComponentView {...this.props} />;
  }
}

// Components are automatically registered when imported
```

### Documentation and Resources

For complete implementation guidance:

- **Implementation Guide**: `/docs/COMPONENT_SERIALIZATION_GUIDE.md`
- **Component Templates**: `/docs/SERIALIZABLE_COMPONENT_TEMPLATE.md`
- **Migration Guide**: `/docs/SERIALIZATION_MIGRATION.md`
- **Architecture Details**: `/ARCHITECTURE.md#component-serialization-system-architecture`
- **Code Component Example**: `/src/components/blocks/Code.md`

## Theming System

### Theme Modes

```tsx
import { useTheme } from '@qwickapps/react-framework';

function ThemeControls() {
  const { themeMode, switchTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => switchTheme('light')}>Light</button>
      <button onClick={() => switchTheme('dark')}>Dark</button>
      <button onClick={() => switchTheme('system')}>System</button>
      <p>Current theme: {themeMode}</p>
    </div>
  );
}
```

### Color Palettes

```tsx
import { usePalette } from '@qwickapps/react-framework';

function PaletteControls() {
  const { currentPalette, switchPalette } = usePalette();
  
  return (
    <div>
      <button onClick={() => switchPalette('ocean')}>Ocean</button>
      <button onClick={() => switchPalette('autumn')}>Autumn</button>
      <button onClick={() => switchPalette('spring')}>Spring</button>
      <button onClick={() => switchPalette('winter')}>Winter</button>
      <p>Current palette: {currentPalette}</p>
    </div>
  );
}
```

### CSS Variables

The framework exposes CSS custom properties for consistent theming:

```css
.my-component {
  background: var(--theme-surface);
  color: var(--theme-on-surface);
  border: 1px solid var(--theme-border-main);
}

.primary-button {
  background: var(--theme-primary);
  color: var(--theme-on-primary);
  border-radius: var(--theme-border-radius);
}
```

**Available Variables:**

- `--theme-primary`, `--theme-on-primary`
- `--theme-secondary`, `--theme-on-secondary`
- `--theme-surface`, `--theme-on-surface`
- `--theme-background`, `--theme-on-background`
- `--theme-outline`, `--theme-outline-variant`
- `--theme-elevation-1`, `--theme-elevation-2`

## Component API

### QwickApp

```tsx
interface QwickAppProps {
  children: React.ReactNode;
  appId?: string | true | false; // Storage key strategy
  appName?: string; // Display name for built-in Logo
  logo?: React.ReactNode; // Custom logo component
  className?: string;
  style?: React.CSSProperties;
  defaultTheme?: 'light' | 'dark' | 'system';
  defaultPalette?: string;
}
```

### ResponsiveMenu

```tsx
interface ResponsiveMenuProps {
  items: MenuItem[];
  className?: string;
  logo?: React.ReactNode;
  showLogo?: boolean;
  logoPosition?: 'left' | 'center' | 'right';
  brandText?: string;
  onMenuToggle?: (isOpen: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
}
```

### Html Component

```tsx
interface HtmlProps extends WithBaseProps {
  children: string;                    // HTML content as string
  transformConfig?: TransformConfig;   // Custom transformation rules
  stripHeaders?: boolean;              // Strip header elements (default: false)
  sanitize?: boolean;                  // Sanitize HTML (default: true)
  sanitizeOptions?: any;               // Custom sanitization options
  placeholder?: string;                // Fallback when content is empty
  component?: React.ElementType;       // Container element (default: 'div')
}
```

### Markdown Component

```tsx
interface MarkdownProps extends WithBaseProps {
  children: string;                    // Markdown content as string
  htmlTransformConfig?: TransformConfig; // HTML transformation config
  sanitize?: boolean;                  // Sanitize HTML output (default: true)
  sanitizeOptions?: any;               // Custom sanitization options
  placeholder?: string;                // Fallback when content is empty
  component?: React.ElementType;       // Container element (default: 'div')
  markedOptions?: marked.MarkedOptions; // Marked library options
}
```

### Transform System

```tsx
interface TransformRule {
  selector: string;                    // CSS selector for elements to transform
  transform: (element: Element, key: string) => React.ReactNode;
}

interface TransformConfig {
  rules: TransformRule[];              // Array of transformation rules
  sanitize?: boolean;                  // Enable HTML sanitization
  sanitizeOptions?: any;               // Sanitization configuration
  fallbackComponent?: (element: Element, key: string) => React.ReactNode;
}
```

### CollapsibleLayout Component

```tsx
interface CollapsibleLayoutProps extends WithBaseProps, WithDataBinding {
  // State Management
  collapsed?: boolean;                 // Controlled collapsed state
  defaultCollapsed?: boolean;          // Initial collapsed state (uncontrolled)
  onToggle?: (collapsed: boolean) => void; // State change callback
  persistState?: boolean;              // Save state to localStorage
  storageKey?: string;                 // Custom storage key
  
  // Content
  title?: string;                      // Header title
  subtitle?: string;                   // Header subtitle  
  leadIcon?: ReactNode;                // Icon before title
  headerActions?: ReactNode;           // Actions in header (buttons, etc.)
  children?: ReactNode;                // Main expandable content
  collapsedView?: ReactNode;           // Content shown when collapsed
  footerView?: ReactNode;              // Always-visible footer content
  
  // Behavior
  triggerArea?: 'header' | 'button' | 'both'; // Click trigger area
  animationStyle?: 'fade' | 'slide' | 'scale'; // Animation type
  animationDuration?: number;          // Animation duration (ms)
  disableAnimations?: boolean;         // Disable all animations
  
  // Styling
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  headerSpacing?: 'compact' | 'comfortable' | 'spacious';
  contentSpacing?: 'compact' | 'comfortable' | 'spacious';
  showDivider?: boolean;               // Show section dividers
  
  // Icons
  collapsedIcon?: ReactNode;           // Custom collapsed state icon
  expandedIcon?: ReactNode;            // Custom expanded state icon
  
  // Accessibility
  toggleAriaLabel?: string;            // ARIA label for toggle button
  'aria-describedby'?: string;         // Describedby reference
  contentAriaProps?: object;           // Additional ARIA props
}
```

## Advanced Usage

### Custom Layout Composition

```tsx
function LandingPage() {
  return (
    <QwickApp appName="ProductApp">
      <ResponsiveMenu items={navigationItems} />
      
      {/* Hero Section */}
      <HeroBlock
        title="Revolutionary Product"
        subtitle="Transform your workflow today"
        backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        height="fullscreen"
        actions={<CallToActionButtons />}
      />
      
      {/* Features Section */}
      <Section padding="extra-large" background="alternate">
        <Content title="Why Choose Us?" centered maxWidth="large">
          <FeatureGrid columns={3} features={featureData} />
        </Content>
      </Section>
      
      {/* Content Sections */}
      <Section padding="extra-large">
        <GridLayout columns={2} gap="large">
          <GridCell>
            <Content title="For Developers" variant="elevated" padding="large">
              {/* Developer content */}
            </Content>
          </GridCell>
          <GridCell>
            <Content title="For Businesses" variant="elevated" padding="large">
              {/* Business content */}
            </Content>
          </GridCell>
        </GridLayout>
      </Section>
      
      {/* CTA Section */}
      <Section padding="large" background="primary">
        <Content centered>
          <CallToActionSection />
        </Content>
      </Section>
    </QwickApp>
  );
}
```

### Advanced CollapsibleLayout Patterns

```tsx
// Settings Dashboard with Multiple Sections
function SettingsDashboard() {
  return (
    <QwickApp appName="Settings">
      <Stack spacing={2}>
        <CollapsibleLayout
          title="Account Settings"
          subtitle="Profile and security preferences"
          defaultCollapsed={false}
          variant="outlined"
          leadIcon={<PersonIcon />}
          persistState={true}
          storageKey="settings-account"
        >
          <Stack spacing={2}>
            <TextField label="Display Name" />
            <TextField label="Email Address" />
            <Switch label="Two-Factor Authentication" />
          </Stack>
        </CollapsibleLayout>

        <CollapsibleLayout
          title="Privacy Settings"
          subtitle="Data usage and visibility"
          defaultCollapsed={true}
          variant="outlined" 
          leadIcon={<PrivacyIcon />}
          triggerArea="both"
          animationStyle="fade"
        >
          <Stack spacing={2}>
            <Switch label="Public Profile" />
            <Switch label="Activity Tracking" />
            <TextField 
              label="Data Retention" 
              select
              defaultValue="1year"
            />
          </Stack>
        </CollapsibleLayout>
      </Stack>
    </QwickApp>
  );
}

// FAQ Section with Collapsed Previews  
function FAQSection() {
  const faqs = [
    {
      question: "How do I integrate with my CMS?",
      preview: "Integration involves data providers and configuration...",
      answer: "Detailed integration steps with code examples..."
    },
    // ... more FAQs
  ];

  return (
    <Stack spacing={2}>
      {faqs.map((faq, index) => (
        <CollapsibleLayout
          key={index}
          title={faq.question}
          defaultCollapsed={true}
          variant="outlined"
          collapsedView={
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {faq.preview}
            </Typography>
          }
        >
          <Typography>{faq.answer}</Typography>
        </CollapsibleLayout>
      ))}
    </Stack>
  );
}

// Complex Data Dashboard
function DataDashboard() {
  return (
    <CollapsibleLayout
      title="Sales Analytics"
      subtitle="Q4 2024 performance metrics"
      variant="elevated"
      headerActions={
        <Stack direction="row" spacing={1}>
          <Chip label="Live" color="success" size="small" />
          <Button size="small">Export</Button>
        </Stack>
      }
      leadIcon={<ChartIcon />}
      footerView={
        <Typography variant="caption" color="text.secondary">
          Last updated: {new Date().toLocaleTimeString()}
        </Typography>
      }
    >
      {/* Complex dashboard content with charts, tables, etc. */}
      <DashboardContent />
    </CollapsibleLayout>
  );
}
```

### Accessing App Context

```tsx
import { useQwickApp } from '@qwickapps/react-framework';

function MyComponent() {
  const { appName, logo } = useQwickApp();
  
  return (
    <div>
      <h1>Welcome to {appName}</h1>
      {logo && <div>{logo}</div>}
    </div>
  );
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  QwickAppProps,
  ResponsiveMenuProps,
  MenuItem,
  HeroBlockProps,
  ColumnLayoutProps,
  FeatureItem,
  CollapsibleLayoutProps,
  CollapsibleLayoutViewProps,
  UseCollapsibleLayoutState,
  // Component Serialization Types
  Serializable,
  SerializableConstructor,
  ComponentTransformer,
} from '@qwickapps/react-framework';
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build package
npm run build
```

## Framework Best Practices

### Logging and Debugging

The framework uses the `@qwickapps/logging` package for centralized logging with development insights and zero production impact:

```typescript
import { loggers, createLogger } from '@qwickapps/react-framework';

// Use framework-specific loggers
const logger = loggers.navigation;
logger.debug('Route changed:', path);
logger.error('Navigation failed:', error);

// Or create custom loggers
const myLogger = createLogger('MyComponent');
myLogger.info('Component initialized');
```

**Key Benefits:**

- ✅ No boilerplate conditionals
- ✅ Automatic production silencing
- ✅ Namespaced for clarity
- ✅ TypeScript support
- ✅ Optional complete stripping

**Build Configuration:**

```json
// package.json - Consumer application
{
  "scripts": {
    "build:dev": "NODE_ENV=development vite build",
    "build:prod": "NODE_ENV=production STRIP_LOGS=true vite build",
    "deploy:dev": "npm run build:dev && npm run deploy",
    "deploy": "npm run build:prod && npm run deploy"
  }
}
```

For complete documentation, see [@qwickapps/logging](../qwickapps-logging/README.md).

### Component Development

1. **Always extend WithBaseProps** for consistent component API
2. **Use the GridLayout system** for responsive layouts
3. **Leverage pre-built hooks** like `useBaseProps` for standardization
4. **Follow the established patterns** in existing components

### Theme and Styling

1. **Use CSS variables** from the theme system
2. **Support both light and dark modes** by default
3. **Test with different palettes** to ensure flexibility
4. **Use t-shirt sizing** (tiny, small, medium, large, huge) for consistency

### Performance

1. **Import only what you need** - the package supports tree shaking
2. **Use React.memo** for expensive components
3. **Leverage the built-in performance monitoring** for theme changes
4. **Consider lazy loading** for large component trees

## Built-in Error Handling & Accessibility

QwickApp automatically includes robust error handling and accessibility features without any configuration needed.

### ErrorBoundary

All QwickApp instances are automatically wrapped with an ErrorBoundary that:

- Catches JavaScript errors anywhere in the component tree
- Displays user-friendly fallback UI with retry functionality
- Shows error details in development mode
- Supports custom error handling callbacks

```tsx
import { ErrorBoundary } from '@qwickapps/react-framework';

// For standalone usage outside QwickApp
<ErrorBoundary onError={(error, errorInfo) => console.log(error)}>
  <MyComponent />
</ErrorBoundary>

// Or use as Higher-Order Component
const SafeComponent = withErrorBoundary(MyComponent, {
  fallback: <div>Custom error UI</div>
});
```

### AccessibilityProvider

All QwickApp instances automatically include accessibility features:

- **System Preferences**: Detects high contrast, reduced motion preferences
- **Keyboard Navigation**: Enhanced focus indicators for keyboard users
- **Screen Reader Support**: ARIA live announcements
- **Accessibility Auditing**: Development-time accessibility issue detection

```tsx
import { useAccessibility } from '@qwickapps/react-framework';

function MyComponent() {
  const {
    highContrast,
    reducedMotion,
    isKeyboardUser,
    announce,
    runAudit
  } = useAccessibility();

  return (
    <div>
      {highContrast && <p>High contrast mode enabled</p>}
      <button onClick={() => announce('Action completed', 'polite')}>
        Complete Action
      </button>
    </div>
  );
}
```

### Breadcrumbs

Generic breadcrumb navigation with full accessibility support:

```tsx
import { Breadcrumbs, useBreadcrumbs } from '@qwickapps/react-framework';

const breadcrumbItems = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics', current: true },
];

function Navigation() {
  const handleNavigate = (item, index) => {
    console.log('Navigate to:', item.label);
  };

  return (
    <Breadcrumbs 
      items={breadcrumbItems}
      onNavigate={handleNavigate}
      separator="→"
      maxItems={4}
    />
  );
}

// Or use the hook for dynamic breadcrumbs
function DynamicBreadcrumbs() {
  const { breadcrumbs, addBreadcrumb, setBreadcrumbs } = useBreadcrumbs();
  
  return <Breadcrumbs items={breadcrumbs} />;
}
```

## License

This software is licensed under the **PolyForm Shield License 1.0.0**.

### 📋 **Quick Summary**

- ✅ **Free to use** for non-competitive purposes
- ✅ **Source code available** for learning and development
- ❌ **Cannot be used** to compete with QwickApps
- ❌ **Cannot be reverse engineered** for competitive purposes

### ✅ **Permitted Uses**

- Internal business applications
- Learning and educational projects
- Non-competitive commercial applications
- Academic research and teaching
- Contributing to this project

### ❌ **Prohibited Uses**

- Creating competing React frameworks
- Building competing CMS or application builder tools
- Reselling or redistributing as a competing product
- Reverse engineering to create competitive products

For complete license terms, see [LICENSE](./LICENSE) and [LICENSE-POLYFORM-SHIELD.txt](./LICENSE-POLYFORM-SHIELD.txt).

**Need commercial licensing?** Contact us at **<legal@qwickapps.com>**

## 📚 Complete Documentation

The QwickApps React Framework includes comprehensive documentation covering all aspects of development, architecture, and usage.

### 🎯 **Quick Links**

- **[📖 Documentation Hub](./docs/README.md)** - Complete documentation index and navigation
- **[🏗️ Component Architecture](./docs/architecture/component-system.md)** - Modern component architecture with ViewSchema v2.0.0
- **[🔄 Migration Guide](./docs/architecture/migration-guides/useBaseProps-to-viewmodelschema.md)** - Migrate from useBaseProps to ViewSchema pattern
- **[⚡ Serialization Guide](./docs/guides/COMPONENT_SERIALIZATION_GUIDE.md)** - Complete component serialization implementation guide

### 🧩 **Component Documentation**

#### Core Components

- **[ViewSchema v2.0.0](./docs/components/base/ViewSchema.md)** - Comprehensive base schema (40+ properties)
- **[Container](./docs/components/Container.md)** - Core schema-driven component implementation
- **[Page System](./docs/components/pages/Page.md)** - Advanced page component with print support

#### Layout & Content

- **[GridLayout](./docs/components/layout/GridLayout.md)** - Responsive grid system with serialization
- **[HeroBlock](./docs/components/blocks/HeroBlock.md)** - Hero sections with complex serialization
- **[Code Component](./docs/components/blocks/Code.md)** - Reference implementation for serialization

#### Form System

- **[FormBlock](./docs/components/forms/FormBlock.md)** - Form container with state management
- **[TextInputField](./docs/components/input/TextInputField.md)** - Text input with serialization support
- **[SelectInputField](./docs/components/input/SelectInputField.md)** - Select dropdown with options serialization

### 📋 **Quick Start with Documentation**

```tsx
import { 
  QwickApp, 
  Container,
  ViewSchema 
} from '@qwickapps/react-framework';

// Use ViewSchema v2.0.0 for complete UI control
interface MyComponentProps extends SchemaProps<ViewSchema> {
  title: string;
}

function MyComponent({ title, ...schemaProps }: MyComponentProps) {
  return (
    <Container {...schemaProps}>
      <h1>{title}</h1>
    </Container>
  );
}
```

For detailed implementation examples, architecture explanations, and migration guides, visit the **[Documentation Hub](./docs/README.md)**.

## About QwickApps

This framework is part of the QwickApps ecosystem, providing high-quality solutions for educational and productivity applications.

For more information, visit [QwickApps.com](https://qwickapps.com).

## Troubleshooting

### ❌ "react-scripts is not recognized" Error

**Problem**: You're getting an error like `'react-scripts' is not recognized as an internal or external command`

**Solution**: This happens when trying to use QwickApps React Framework without first setting up a React project. QwickApps is a React framework library, not a project generator.

**Fix Options:**

1. **Use the Quick Start Script (Recommended)**:

   ```bash
   npx @qwickapps/react-framework/scripts/create-qwickapps-project my-project-name
   ```

2. **Create React App First**:

   ```bash
   npx create-react-app my-project --template typescript
   cd my-project
   npm install @qwickapps/react-framework @emotion/react @emotion/styled @mui/material @mui/icons-material react-router-dom
   ```

3. **Use with Existing React Project**:
   - QwickApps works with any existing React 16.8+ project
   - Just install the dependencies and follow the manual setup guide above

### Other Common Issues

- **Node.js Version**: Make sure you're using Node.js 16 or later
- **Clear Cache**: If installation fails, try `npm cache clean --force`
- **Dependency Conflicts**: Delete `node_modules` and `package-lock.json`, then run `npm install`

For more help, [open an issue](https://github.com/raajkumars/qwickapps/issues) on GitHub.
