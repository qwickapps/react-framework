/**
 * Article Component Stories - HTML content transformer with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import { Article } from '../components/blocks/Article';
import QwickApp from '../components/QwickApp';

// Sample HTML content for different use cases
const simpleArticleHtml = `
 <h1>Getting Started with QwickApps React Framework</h1>
 <p>Welcome to the QwickApps React Framework, a comprehensive React-based solution for building modern web applications. This guide will walk you through the basics of using our framework.</p>
 
 <h2>Installation</h2>
 <p>To get started, install the framework using npm:</p>
 <pre><code class="language-bash">npm install @qwickapps/react-framework</code></pre>
 
 <h2>Key Features</h2>
 <ul>
 <li>Component-based architecture</li>
 <li>Built-in data binding</li>
 <li>Responsive design system</li>
 <li>TypeScript support</li>
 </ul>
 
 <p>For more information, visit our <a href="https://qwickapps.com">official website</a>.</p>
`;

const codeExamplesHtml = `
 <h1>Code Examples</h1>
 <p>Here are some practical examples of using QwickApps React Framework components.</p>
 
 <h2>Basic Component Usage</h2>
 <p>Create a simple ProductCard component:</p>
 <pre><code class="language-typescript">import { ProductCard } from '@qwickapps/react-framework';

const product = {
 id: 'product-1',
 name: 'Amazing Product',
 description: 'This product will change your life',
 price: '$99.99'
};

function MyApp() {
 return (
 &lt;ProductCard product={product} variant="detailed" /&gt;
 );
}</code></pre>

 <h2>Data Binding Example</h2>
 <p>Using data binding with CMS integration:</p>
 <pre><code class="language-jsx">&lt;QwickApp dataSource={dataProvider}&gt;
 &lt;ProductCard dataSource="products.featured" /&gt;
&lt;/QwickApp&gt;</code></pre>

 <p>You can also use inline code like <code>console.debug('hello')</code> within paragraphs.</p>
 
 <h2>Complex Multi-line Code</h2>
 <code>
function complexFunction() {
 const data = fetchData();
 return processData(data);
}
 </code>
`;

const blogSectionHtml = `
 <header class="blog-header">
 <h1>This Header Will Be Removed</h1>
 <p>When skipHeader is true</p>
 </header>

 <h1>Advanced QwickApps Techniques</h1>
 <p>Learn advanced patterns and best practices for building scalable applications.</p>

 <section class="blog-section" data-padding="large">
 <h2>Performance Optimization</h2>
 <p>QwickApps includes several built-in optimizations to ensure your applications run smoothly.</p>
 <pre><code class="language-typescript">// Lazy loading components
const LazyComponent = lazy(() => import('./MyComponent'));

function App() {
 return (
 &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
 &lt;LazyComponent /&gt;
 &lt;/Suspense&gt;
 );
}</code></pre>
 </section>

 <section class="blog-section" data-padding="medium">
 <h2>State Management</h2>
 <p>Effective state management strategies for complex applications.</p>
 <ul>
 <li>Use Context for shared state</li>
 <li>Implement custom hooks for business logic</li>
 <li>Consider external state libraries for complex needs</li>
 </ul>
 </section>

 <p>These sections demonstrate the blog-section transformation feature.</p>
`;

const tutorialHtml = `
 <h1>Complete Tutorial: Building a Dashboard</h1>
 
 <div class="tutorial-intro">
 <p><strong>What you'll learn:</strong> In this comprehensive tutorial, you'll build a complete dashboard application using QwickApps React Framework.</p>
 <p><strong>Prerequisites:</strong> Basic knowledge of React and TypeScript</p>
 <p><strong>Time required:</strong> Approximately 2 hours</p>
 </div>

 <h2>Step 1: Project Setup</h2>
 <p>First, create a new QwickApps project:</p>
 <pre><code class="language-bash">npx create-qwickapp my-dashboard
cd my-dashboard
npm start</code></pre>

 <h2>Step 2: Create the Layout</h2>
 <p>Set up the main dashboard layout with navigation:</p>
 <pre><code class="language-tsx">import { GridLayout, Navigation } from '@qwickapps/react-framework';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
 return (
 &lt;div className="dashboard"&gt;
 &lt;Navigation items={navItems} /&gt;
 &lt;main className="dashboard-content"&gt;
 &lt;GridLayout columns={2} spacing="large"&gt;
 {children}
 &lt;/GridLayout&gt;
 &lt;/main&gt;
 &lt;/div&gt;
 );
}</code></pre>

 <div class="tip-box">
 <h3>💡 Pro Tip</h3>
 <p>Use the <code>GridLayout</code> component for responsive layouts that automatically adapt to different screen sizes.</p>
 </div>

 <h2>Step 3: Add Data Visualization</h2>
 <p>Integrate charts and data visualization components.</p>
 
 <section class="blog-section">
 <h2>Final Result</h2>
 <p>Your completed dashboard will include:</p>
 <ul>
 <li>Responsive navigation</li>
 <li>Interactive charts</li>
 <li>Real-time data updates</li>
 <li>Mobile-friendly design</li>
 </ul>
 </section>
`;

// Sample CMS data for data binding stories
const sampleCmsData = {
 'articles': {
 'simple': { title: 'Simple Article', html: simpleArticleHtml, skipHeader: false },
 'code-examples': { title: 'Code Examples', html: codeExamplesHtml, skipHeader: false },
 'blog-sections': { title: 'Blog Sections', html: blogSectionHtml, skipHeader: true },
 'complete-tutorial': { title: 'Complete Tutorial', html: tutorialHtml, skipHeader: false },
 'tutorial': { title: 'Tutorial Content', html: tutorialHtml, skipHeader: false },
 'blog-post': { title: 'Blog Post', html: blogSectionHtml, skipHeader: true }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Blocks/Article',
 component: Article,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `Article is an intelligent HTML content transformer that automatically converts raw HTML into QwickApps React Framework components while preserving structure and styling.

**Key Features:**
- **Smart Code Block Detection**: Automatically transforms \`<pre><code>\` blocks into syntax-highlighted Code components
- **Blog Section Transformation**: Converts \`<section class="blog-section">\` into Section components with proper spacing
- **Header Stripping**: Optional removal of header elements for seamless integration with page layouts
- **HTML Structure Preservation**: Maintains all HTML attributes, classes, and structure
- **Data Binding**: Full CMS integration through dataSource prop
- **Safe Rendering**: Uses SafeSpan for secure HTML rendering
- **Responsive Typography**: Automatic styling for headings, paragraphs, and lists

**Perfect For:**
- Blog posts and articles from CMS systems
- Documentation and technical content
- Tutorial and guide content
- Legacy HTML content integration
- Markdown-to-HTML transformed content`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof Article>;

// Traditional Usage Examples
export const SimpleArticle: Story = {
 render: () => (
 <QwickApp appId="article-simple" appName='Simple Article'>
 <Article html={simpleArticleHtml} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic article with headings, paragraphs, lists, and code blocks that get transformed into proper components.',
 },
 },
 },
};

export const CodeExamples: Story = {
 render: () => (
 <QwickApp appId="article-code" appName='Article with Code Examples'>
 <Article html={codeExamplesHtml} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Article featuring various code examples including syntax-highlighted blocks and inline code snippets.',
 },
 },
 },
};

export const BlogSections: Story = {
 render: () => (
 <QwickApp appId="article-blog" appName='Article with Blog Sections'>
 <Article html={blogSectionHtml} skipHeader={false} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Article with blog sections that get transformed into Section components with proper spacing and layout.',
 },
 },
 },
};

export const HeaderSkipping: Story = {
 render: () => (
 <QwickApp appId="article-header-skip" appName='Article Header Skipping'>
 <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
 
 <Box>
 <Typography variant="h6" gutterBottom>With Header (skipHeader: false)</Typography>
 <Article html={blogSectionHtml} skipHeader={false} />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Without Header (skipHeader: true)</Typography>
 <Article html={blogSectionHtml} skipHeader={true} />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison showing how skipHeader removes header elements and the first h1 for seamless page integration.',
 },
 },
 },
};

export const TutorialContent: Story = {
 render: () => (
 <QwickApp appId="article-tutorial" appName='Tutorial Article'>
 <Article html={tutorialHtml} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Complex tutorial content with mixed HTML elements, code blocks, and structured sections.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="article-data-binding" appName='Article Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven Article</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Article components can be completely driven by CMS data, loading HTML content and configuration from your data source.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<Article dataSource="articles.simple" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.articles.simple, null, 2)}</Code>
 </Box>

 <Article dataSource="articles.simple"/>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Article with data binding - HTML content and configuration resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="article-data-advanced" appName='Advanced Article Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Article Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different Article instances can load different content types from separate data sources with varying configurations.
 </Typography>
 </Box>

 {/* Code Examples Article */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Code Examples</Typography>
 <Article dataSource="articles.code-examples" />
 </Box>

 {/* Tutorial Article */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Tutorial Content</Typography>
 <Article dataSource="articles.tutorial" />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple article types showcasing different content structures and transformations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="article-fallback" appName='Article Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Article components gracefully handle missing data sources with fallback HTML content.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<Article 
 dataSource="nonexistent.article" 
 html={fallbackHtml}
 skipHeader={true}
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <Article 
 dataSource="nonexistent.article"
 html={simpleArticleHtml}
 skipHeader={true}
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <Article dataSource="articles.simple" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Article with fallback HTML when dataSource is missing or unavailable.',
 },
 },
 },
};

export const ContentTransformations: Story = {
 render: () => (
 <QwickApp appId="article-transformations" appName='Article Content Transformations'>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Transformation Showcase</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Demonstrates how Article intelligently transforms different HTML elements into QwickApps components.
 </Typography>
 </Box>

 {/* Before/After Comparison */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Code Block Transformation</Typography>
 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Raw HTML Input</Typography>
 <Code title="HTML" language="html">{`<pre><code class="language-javascript">
function greet(name) {
 return \`Hello, \${name}!\`;
}
</code></pre>`}</Code>
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Transformed Output</Typography>
 <pre><code className="language-javascript">{`function greet(name) {
 return \`Hello, \${name}!\`;
}`}</code></pre>
 </Box>
 </Box>
 </Box>

 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Blog Section Transformation</Typography>
 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Raw HTML Input</Typography>
 <Code title="HTML" language="html">{`<section class="blog-section">
 <h2>Section Title</h2>
 <p>Section content...</p>
</section>`}</Code>
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Transformed Output</Typography>
 <Typography variant="body2" color="text.secondary">
 → Becomes Section component with proper spacing and Content wrapper
 </Typography>
 </Box>
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Educational showcase of how Article transforms various HTML elements into QwickApps components.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="article-real-world" appName='Real World Article Example' dataSource={{ dataProvider }}>
 <Box>
 
 {/* Blog Post */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h3" gutterBottom>Latest Blog Post</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Direct from our CMS with header removal enabled
 </Typography>
 <Article dataSource="articles.blog-post" />
 </Box>
 
 {/* Documentation */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h3" gutterBottom>Documentation</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Technical content with code examples and proper syntax highlighting
 </Typography>
 <Article dataSource="articles.code-examples" />
 </Box>
 
 {/* Tutorial Content */}
 <Box>
 <Typography variant="h3" gutterBottom>Learning Resources</Typography>
 <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
 Step-by-step tutorials with mixed content types
 </Typography>
 <Article dataSource="articles.tutorial" />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example showing Article in various contexts: blog posts, documentation, and tutorials.',
 },
 },
 },
};

export const EmptyAndLoadingStates: Story = {
 render: () => (
 <QwickApp appId="article-states" appName='Article States' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> State Management</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Article handles various states including empty content and loading scenarios gracefully.
 </Typography>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Empty Content</Typography>
 <Article html="" />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Content</Typography>
 <Article dataSource="articles.simple" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Demonstrates empty state handling and normal article display states.',
 },
 },
 },
};