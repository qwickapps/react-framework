/**
 * HtmlInputField Component Stories - Rich HTML text editor with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Alert } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import HtmlInputField from '../components/input/HtmlInputField';
import QwickApp from '../components/QwickApp';
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Sample HTML input field data for different use cases
const sampleCmsData = {
 'htmlInputFields': {
 'blog-content': { 
 label: 'Blog Post Content', 
 placeholder: 'Write your blog post content with HTML formatting...',
 required: true,
 multiline: true,
 rows: 6,
 value: '<p>Welcome to our <b>amazing</b> blog! Here you can share your <i>thoughts</i> and <u>experiences</u>.</p>'
 },
 'product-description': { 
 label: 'Product Description', 
 placeholder: 'Describe your product with rich formatting...',
 required: true,
 multiline: true,
 rows: 4,
 value: '<p>This <b>premium product</b> features:</p><br/>• Advanced <code>technology</code><br/>• <i>Elegant</i> design<br/>• <u>Lifetime warranty</u>'
 },
 'announcement-banner': { 
 label: 'Site Announcement', 
 placeholder: 'Create an announcement with HTML styling...',
 multiline: false,
 value: ' <b>New Feature Launch!</b> Experience our <i>enhanced</i> <code>user interface</code>'
 },
 'email-signature': { 
 label: 'Email Signature', 
 placeholder: 'Create your HTML email signature...',
 multiline: true,
 rows: 3,
 value: '<b>John Doe</b><br/><i>Senior Developer</i><br/>📧 john@example.com | +1-555-0123'
 },
 'newsletter-intro': { 
 label: 'Newsletter Introduction', 
 placeholder: 'Write the newsletter intro with formatting...',
 required: true,
 multiline: true,
 rows: 4,
 value: '<p>Hello <b>subscribers</b>! Welcome to our <i>monthly newsletter</i>.</p><p>This month we are excited to share <u>exciting updates</u> and <code>new features</code>.</p>'
 },
 'testimonial-quote': { 
 label: 'Customer Testimonial', 
 placeholder: 'Add customer testimonial with HTML styling...',
 multiline: true,
 rows: 3,
 value: '<i>"This product has <b>transformed</b> our workflow. The <code>automation features</code> are incredible!"</i><br/><br/>- <b>Sarah Johnson</b>, CEO'
 },
 'feature-highlight': { 
 label: 'Feature Highlight', 
 placeholder: 'Highlight key features with HTML...',
 multiline: true,
 rows: 5,
 value: '<p><b> Key Features:</b></p><p>• <u>Real-time</u> collaboration<br/>• <code>API integration</code><br/>• <i>Advanced</i> analytics<br/>• <b>24/7</b> support</p>'
 },
 'code-snippet': { 
 label: 'Code Documentation', 
 placeholder: 'Document code with HTML formatting...',
 multiline: true,
 rows: 4,
 value: '<p>Use the <code>useState</code> hook for <b>state management</b>:</p><br/><code>const [count, setCount] = useState(0);</code><br/><br/><i>Remember to import from React!</i>'
 },
 'event-details': { 
 label: 'Event Details', 
 placeholder: 'Add event information with styling...',
 multiline: true,
 rows: 5,
 value: '<b>🎪 Annual Tech Conference 2025</b><br/><br/>📅 <i>March 15-17, 2025</i><br/>📍 <u>San Francisco Convention Center</u><br/>🎟 <code>Early bird tickets available</code>'
 },
 'basic-html': { 
 label: 'Basic HTML Content', 
 placeholder: 'Enter HTML content...',
 multiline: true,
 rows: 4
 },
 'disabled-field': { 
 label: 'Read-only Content', 
 value: 'This content is <b>read-only</b> and <i>cannot be edited</i>.',
 disabled: true,
 multiline: true,
 rows: 2
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Forms/HtmlInputField',
 component: HtmlInputField,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `HtmlInputField is a rich text editor component with HTML formatting capabilities and data binding support for content creation.

**Key Features:**
- **Rich Text Formatting**: Built-in toolbar with bold, italic, underline, and code formatting
- **HTML Preview Mode**: Toggle between edit and preview modes to see rendered output
- **HTML Sanitization**: Automatic sanitization for security and safe rendering
- **Interactive Help**: Built-in help system showing supported HTML tags
- **Data Binding**: Full CMS integration through dataSource prop
- **Accessibility**: Complete ARIA support and keyboard navigation
- **Theme Integration**: Automatically uses QwickApp theme styling
- **Flexible Layout**: Support for single-line and multiline configurations

**Perfect For:**
- Blog and article content creation
- Product descriptions and marketing copy
- Email templates and signatures
- Rich text comments and feedback
- Documentation and help content
- Any content requiring HTML formatting capabilities`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof HtmlInputField>;

export default meta;
type Story = StoryObj<typeof HtmlInputField>;

// Traditional Usage Examples
export const BasicHtmlEditor: Story = {
 render: () => (
 <QwickApp appId="html-input-basic" appName='Basic HTML Editor'>
 <HtmlInputField 
 label="Content Editor" 
 placeholder="Enter HTML content..."
 multiline={true}
 rows={4}
 onChange={(value) => console.log('HTML content changed:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic HTML input field with formatting toolbar and preview capabilities.',
 },
 },
 },
};

export const BlogContentEditor: Story = {
 render: () => (
 <QwickApp appId="html-input-blog" appName='Blog Content Editor'>
 <HtmlInputField 
 label="Blog Post Content" 
 placeholder="Write your blog post content with HTML formatting..."
 required={true}
 multiline={true}
 rows={6}
 value='<p>Welcome to our <b>amazing</b> blog! Here you can share your <i>thoughts</i> and <u>experiences</u>.</p>'
 onChange={(value) => console.log('Blog content:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Rich HTML editor configured for blog post content creation with initial content.',
 },
 },
 },
};

export const ProductDescription: Story = {
 render: () => (
 <QwickApp appId="html-input-product" appName='Product Description Editor'>
 <HtmlInputField 
 label="Product Description" 
 placeholder="Describe your product with rich formatting..."
 required={true}
 multiline={true}
 rows={4}
 value='<p>This <b>premium product</b> features:</p><br/>• Advanced <code>technology</code><br/>• <i>Elegant</i> design<br/>• <u>Lifetime warranty</u>'
 onChange={(value) => console.log('Product description:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'HTML editor for product descriptions with formatting for features and highlights.',
 },
 },
 },
};

export const SingleLineHtml: Story = {
 render: () => (
 <QwickApp appId="html-input-single" appName='Single Line HTML'>
 <HtmlInputField 
 label="Site Announcement" 
 placeholder="Create an announcement with HTML styling..."
 multiline={false}
 value=' <b>New Feature Launch!</b> Experience our <i>enhanced</i> <code>user interface</code>'
 onChange={(value) => console.log('Announcement:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Single-line HTML input field for announcements and short formatted content.',
 },
 },
 },
};

export const FormattingShowcase: Story = {
 render: () => (
 <QwickApp appId="html-input-formatting" appName='HTML Formatting Showcase'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <Alert severity="info">
 <Typography variant="body2">
 Use the toolbar buttons to format selected text, or click for insertion. Toggle preview mode to see the rendered output.
 </Typography>
 </Alert>
 
 <HtmlInputField 
 label="Formatting Examples" 
 placeholder="Try the formatting tools above..."
 multiline={true}
 rows={6}
 value='<p>Examples of <b>formatting</b>:</p><br/>• <b>Bold text</b> for emphasis<br/>• <i>Italic text</i> for style<br/>• <u>Underlined text</u> for highlighting<br/>• <code>Code snippets</code> for technical content<br/><br/><p>Mix and match: <b><i>Bold italic</i></b> and <u><code>underlined code</code></u>!</p>'
 onChange={(value) => console.log('Formatted content:', value)}
 />
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Showcase of HTML formatting capabilities with examples of different text styles.',
 },
 },
 },
};

export const States: Story = {
 render: () => (
 <QwickApp appId="html-input-states" appName='HTML Input States'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
 <HtmlInputField 
 label="Normal State" 
 placeholder="Enter HTML content..."
 multiline={true}
 rows={3}
 onChange={(value) => console.log('Normal:', value)}
 />
 
 <HtmlInputField 
 label="Required Field" 
 placeholder="This field is required"
 required={true}
 multiline={true}
 rows={3}
 onChange={(value) => console.log('Required:', value)}
 />
 
 <HtmlInputField 
 label="Pre-filled Content" 
 value="<p>This field has <b>pre-filled</b> <i>content</i> with <code>formatting</code>.</p>"
 multiline={true}
 rows={3}
 onChange={(value) => console.log('Pre-filled:', value)}
 />
 
 <HtmlInputField 
 label="Disabled Field" 
 value="This content is <b>read-only</b> and <i>cannot be edited</i>."
 disabled={true}
 multiline={true}
 rows={2}
 />
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different HTML input field states including normal, required, pre-filled, and disabled.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="html-input-data-binding" appName='HtmlInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven HTML Editor</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 HtmlInputField components can be completely driven by CMS data, loading content and configuration from your data source.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<HtmlInputField dataSource="htmlInputFields.blog-content" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.htmlInputFields['blog-content'], null, 2)}</Code>
 </Box>

 <HtmlInputField dataSource="htmlInputFields.blog-content" />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'HtmlInputField with data binding - content and configuration resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="html-input-data-advanced" appName='Advanced HtmlInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Content Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different HtmlInputField instances can load different content types and configurations from separate data sources.
 </Typography>
 </Box>

 {/* Content Creation */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Content Creation</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
 <HtmlInputField dataSource="htmlInputFields.blog-content" />
 <HtmlInputField dataSource="htmlInputFields.newsletter-intro" />
 </Box>
 </Box>

 {/* Marketing Content */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Marketing & Sales</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
 <HtmlInputField dataSource="htmlInputFields.product-description" />
 <HtmlInputField dataSource="htmlInputFields.testimonial-quote" />
 <HtmlInputField dataSource="htmlInputFields.feature-highlight" />
 </Box>
 </Box>

 {/* Communication */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Communication</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
 <HtmlInputField dataSource="htmlInputFields.email-signature" />
 <HtmlInputField dataSource="htmlInputFields.announcement-banner" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple HTML content types showcasing different configurations and use cases.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="html-input-fallback" appName='HtmlInputField Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 HtmlInputField components gracefully handle missing data sources with fallback configurations.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<HtmlInputField 
 dataSource="nonexistent.field" 
 label="Fallback Editor"
 placeholder="This is fallback content"
 multiline={true}
 rows={4}
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <HtmlInputField 
 dataSource="nonexistent.field"
 label="Fallback Editor"
 placeholder="This is fallback content..."
 multiline={true}
 rows={4}
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <HtmlInputField dataSource="htmlInputFields.blog-content" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'HtmlInputField with fallback configuration when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="html-input-real-world" appName='Real World HtmlInputField Example' dataSource={{ dataProvider }}>
 <Box>
 
 {/* Content Management System */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Content Management</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Create and manage rich content with HTML formatting capabilities
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 900 }}>
 <HtmlInputField dataSource="htmlInputFields.blog-content" />
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <HtmlInputField dataSource="htmlInputFields.product-description" />
 <HtmlInputField dataSource="htmlInputFields.announcement-banner" />
 </Box>
 </Box>
 </Box>
 
 {/* Documentation Platform */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Documentation & Support</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
 Create technical documentation and support content with code formatting
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 900 }}>
 <HtmlInputField dataSource="htmlInputFields.code-snippet" />
 <HtmlInputField dataSource="htmlInputFields.feature-highlight" />
 </Box>
 </Box>
 
 {/* Event Management */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Event & Communication</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Manage event details, newsletters, and customer communications
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 900 }}>
 <HtmlInputField dataSource="htmlInputFields.event-details" />
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <HtmlInputField dataSource="htmlInputFields.newsletter-intro" />
 <HtmlInputField dataSource="htmlInputFields.email-signature" />
 </Box>
 </Box>
 </Box>
 
 {/* Customer Testimonials */}
 <Box sx={{ p: 4, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Customer Success</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
 Showcase customer testimonials and success stories
 </Typography>
 <Box sx={{ maxWidth: 700 }}>
 <HtmlInputField dataSource="htmlInputFields.testimonial-quote" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example showing HtmlInputField in various contexts: content management, documentation, events, and testimonials.',
 },
 },
 },
};

export const EditorFeatureShowcase: Story = {
 render: () => (
 <QwickApp appId="html-input-features" appName='HTML Editor Features Showcase' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Editor Features</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Comprehensive showcase of HtmlInputField features including formatting, preview, and various content types.
 </Typography>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Rich Blog Content</Typography>
 <HtmlInputField dataSource="htmlInputFields.blog-content" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Product Marketing</Typography>
 <HtmlInputField dataSource="htmlInputFields.product-description" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Code Documentation</Typography>
 <HtmlInputField dataSource="htmlInputFields.code-snippet" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Event Information</Typography>
 <HtmlInputField dataSource="htmlInputFields.event-details" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Email Templates</Typography>
 <HtmlInputField dataSource="htmlInputFields.email-signature" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Customer Feedback</Typography>
 <HtmlInputField dataSource="htmlInputFields.testimonial-quote" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comprehensive showcase of HtmlInputField capabilities across different content types and use cases.',
 },
 },
 },
};

// Serialization Demo
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <HtmlInputField
      label="Serializable HTML Field"
      placeholder="Enter HTML content..."
      required={false}
      rows={4}
      value="<b>Bold text</b> and <i>italic text</i> with <code>code</code>"
      helpText="This field supports HTML formatting and demonstrates serialization"
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates HtmlInputField serialization with HTML content and formatting preserved.',
      },
    },
  },
};
