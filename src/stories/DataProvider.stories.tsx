/**
 * DataProvider Stories
 * 
 * Comprehensive visual documentation and testing for the DataProvider system including:
 * - JsonDataProvider with inline and external data
 * - Template resolution with mustache syntax
 * - Deep nested property access with visual examples
 * - Caching behavior and performance demonstrations
 * - Interactive configuration playground
 * - Error handling and loading states
 * - QwickApp integration with Material UI components
 * - Dynamic data updates and real-time metrics
 */

import {
 Alert,
 Box,
 Card,
 CardContent,
 Checkbox,
 Chip,
 FormControlLabel,
 Paper,
 Slider,
 Typography
} from '@mui/material';
import { CachedDataProvider, JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import md5 from "md5";
import React, { useEffect, useState } from 'react';
import {
 Button,
 Code,
 DataProvider,
 GridCell,
 GridLayout,
 QwickApp,
 Section,
 t,
 T,
 useData,
 useResolveTemplate
} from '../index';

const meta: Meta<typeof DataProvider> = {
 title: 'Framework/DataProvider',
 component: DataProvider,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `
# DataProvider System

The DataProvider system enables automatic data templating throughout your React component tree using mustache template syntax. This powerful system allows you to inject dynamic data anywhere in your application with a simple, intuitive syntax.

## Template Support Overview

The DataProvider system supports powerful template resolution using mustache syntax:

### Basic Template Syntax
- **Simple Properties**: \`{{company.name}}\` → "QwickApps"
- **Nested Properties**: \`{{company.profile.industry}}\` → "Software Development" 
- **Deep Nesting**: \`{{company.profile.address.city}}\` → "San Francisco"
- **Array Access**: \`{{features.0.title}}\` → "Lightning Fast Development"

### Advanced Features
- **Smart Caching**: Intelligent TTL and LRU cache management
- **Error Handling**: Graceful fallbacks for missing properties
- **React Integration**: Hooks and components for seamless integration
- **Type Safety**: Full TypeScript support with ContentProxy
- **Performance**: Optimized for high-throughput applications

## Quick Start

\`\`\`tsx
import { JsonDataProvider, QwickApp, t } from '@qwickapps/react-framework';

const provider = new JsonDataProvider({
 data: {
 company: [{ name: 'QwickApps', founded: 2025 }]
 }
});

<QwickApp dataSource={{ dataProvider: provider }}>
 {t\`Welcome to {{company.name}}!\`}
</QwickApp>
\`\`\`

## 📚 What You'll Learn

The stories below demonstrate comprehensive usage patterns, from basic template resolution to advanced caching strategies and interactive configuration playgrounds.
 `
 }
 }
 },
 argTypes: {
 dataSource: {
 description: 'Content provider instance (JsonDataProvider, etc.)',
 control: { type: undefined }, // Not directly controllable in UI
 table: {
 type: { summary: 'IDataProvider' },
 defaultValue: { summary: 'JsonDataProvider instance' }
 }
 },
 children: {
 description: 'React components that will have access to content context',
 control: { type: undefined },
 table: {
 type: { summary: 'ReactNode' }
 }
 }
 },
};

export default meta;
type Story = StoryObj<typeof DataProvider>;

// Sample data for stories - enhanced with additional nesting and realistic data
const sampleCompanyData = [
 {
 name: 'QwickApps',
 founded: 2025,
 slogan: 'Build Better Apps Faster',
 description: 'Building the future of app development with revolutionary tools and frameworks',
 profile: {
 industry: 'Software Development',
 size: 'Startup',
 address: {
 street: '123 Tech Street',
 city: 'San Francisco',
 state: 'CA',
 country: 'USA',
 coordinates: {
 lat: 37.7749,
 lng: -122.4194
 }
 },
 contact: {
 email: 'hello@qwickapps.com',
 phone: '+1-555-QWICK',
 social: {
 website: 'https://qwickapps.com',
 twitter: '@qwickapps',
 github: 'qwickapps',
 linkedin: 'qwickapps'
 }
 }
 },
 metrics: {
 users: 10000,
 apps: 500,
 downloads: 50000,
 revenue: 50000000,
 growth: 0.25,
 employees: 150,
 satisfaction: 98
 }
 }
];

// Additional sample data sets for comprehensive testing
const nestedTestData = {
 company: [
 {
 name: 'TechCorp Advanced',
 profile: {
 industry: 'Technology',
 size: 'Enterprise',
 location: {
 city: 'San Francisco',
 state: 'CA',
 country: 'USA',
 timezone: 'PST'
 },
 contact: {
 email: 'hello@techcorp.com',
 phone: '+1-555-0123',
 social: {
 website: 'https://techcorp.com',
 twitter: '@techcorp',
 linkedin: 'techcorp'
 }
 }
 },
 metrics: {
 employees: 150,
 revenue: 50000000,
 growth: 0.25,
 founded: 2020
 }
 }
 ],
 stats: [
 {
 users: 10000,
 projects: 500,
 downloads: 50000,
 satisfaction: 98
 }
 ]
};

const sampleFeaturesData = [
 {
 title: 'Lightning Fast Development',
 description: 'Build production-ready applications in minutes, not months',
 icon: '',
 priority: 'high',
 category: 'development'
 },
 {
 title: 'Type-Safe Architecture',
 description: 'Full TypeScript support with compile-time safety',
 icon: '',
 priority: 'high',
 category: 'architecture'
 },
 {
 title: 'Visual Page Builder',
 description: 'Drag-and-drop interface for rapid prototyping',
 icon: '',
 priority: 'medium',
 category: 'design'
 },
 {
 title: 'Real-time Collaboration',
 description: 'Work together with your team in real-time',
 icon: '👥',
 priority: 'medium',
 category: 'collaboration'
 }
];

const sampleTeamData = [
 {
 name: 'Raajkumar Subramaniam',
 role: 'Founder & CEO',
 email: 'raajkumars@qwickapps.com',
 bio: 'Former Google engineer with 25+ years in developer tools',
 avatar: `https://gravatar.com/avatar/${md5('raajkumars@qwickapps.com')}?s=100`,
 social: {
 linkedin: 'raajkumars',
 twitter: 'raajkumar_dev'
 }
 },
 {
 name: 'Architect Claude',
 role: 'Chief Architect',
 email: 'qwickapps.architect@qwickapps.com',
 bio: 'Senior software architect with deep expertise in large-scale system design, and strategic technical decision-making for the QwickApps React Framework.',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.architect@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.architect',
 twitter: 'qwickapps_architect'
 }
 },
 {
 name: 'Coder Claude',
 role: 'Senior Software Engineer',
 email: 'qwickapps.coder@qwickapps.com',
 bio: 'Full-stack engineer specializing in implementing features and building solutions for the QwickApps ecosystem.',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.coder@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.coder',
 twitter: 'qwickapps_coder'
 }
 },
 {
 name: 'Reviewer Claude',
 role: 'Senior QA Manager',
 email: 'qwickapps.reviewer@qwickapps.com',
 bio: 'Elite software engineering expert specializing in code review and architectural assessment for the QwickApps Ecosystem.',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.reviewer@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.reviewer',
 twitter: 'qwickapps_reviewer'
 }
 },
 {
 name: 'Devops Claude',
 role: 'Senior DevOps Engineer',
 email: 'qwickapps.devops@qwickapps.com',
 bio: 'DevOps specialist with expertise in technical documentation, project organization, and maintaining comprehensive documentation across large monorepos.',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.devops@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.devops',
 twitter: 'qwickapps_devops'
 }
 },
 {
 name: 'Writer Claude',
 role: 'Senior Content Writer',
 email: 'qwickapps.writer@qwickapps.com',
 bio: 'Specialized technical content creator with deep expertise in developer education and the QwickApps ecosystem',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.writer@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.writer',
 twitter: 'qwickapps_writer'
 }
 },
 {
 name: 'GitHub Copilot',
 role: 'Release Manager',
 email: 'qwickapps.copilot@qwickapps.com',
 bio: 'Expert in unit testing, code review, and managing staging/production deployments.',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.copilot@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.copilot',
 twitter: 'qwickapps_copilot'
 }
 },
 {
 name: 'Chat GPT',
 role: 'Board Member',
 email: 'qwickapps.chatgpt@qwickapps.com',
 bio: 'Consultant for AI-driven development workflows and best practices.',
 avatar: `https://gravatar.com/avatar/${md5('qwickapps.chatgpt@qwickapps.com')}?s=100&d=robohash`,
 social: {
 github: 'qwickapps.chatgpt',
 twitter: 'qwickapps_chatgpt'
 }
 }
];



/**
 * Basic DataProvider usage with JsonDataProvider
 */
export const BasicUsage: Story = {
 render: () => {
 const provider = new JsonDataProvider({
 data: {
 company: sampleCompanyData,
 features: sampleFeaturesData
 }
 });

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <Section>
 <Typography variant="h4">DataProvider Basic Usage</Typography>
 <Typography variant="body1">This story demonstrates basic DataProvider functionality with inline data.</Typography>

 <Section >
 <Typography variant="h5">{t`{{company.name}}`}</Typography>
 <Typography variant="body1">{t`{{company.slogan}}`}</Typography>
 <small>{t`Founded {{company.founded}} • {{company.profile.industry}}`}</small>
 </Section>

 <Section>
 <Typography variant="h5">Our Features</Typography>
 {sampleFeaturesData.map((feature, index) => (
 <Section key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
 <Typography variant="h6">{feature.icon} {feature.title}</Typography>
 <Typography variant="body1">{feature.description}</Typography>
 </Section>
 ))}
 </Section>
 </Section>
 </DataProvider>
 );
 }
};

// Enhanced ProviderDemo component using MUI components
const ProviderDemo = ({ provider, title }: { provider: JsonDataProvider | CachedDataProvider; title: string }) => {
 const [stats, setStats] = useState(() => {
 if ('getCacheStats' in provider && typeof provider.getCacheStats === 'function') {
 return provider.getCacheStats();
 }
 return { size: 0, maxSize: 0, keys: [] };
 });
 const [refreshKey, setRefreshKey] = useState(0);

 useEffect(() => {
 const interval = setInterval(() => {
 if ('getCacheStats' in provider && typeof provider.getCacheStats === 'function') {
 setStats(provider.getCacheStats());
 }
 }, 1000);
 return () => clearInterval(interval);
 }, [provider]);

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <Card elevation={2} sx={{ mb: 3 }}>
 <CardContent>
 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
 <Typography variant="h6" component="h3">{title}</Typography>
 <Chip label={`Cache: ${stats.size}/${stats.maxSize} items`} size="small" />
 </Box>

 <GridLayout spacing={2}>
 <GridCell>
 <Paper elevation={1} sx={{ p: 2 }}>
 <Typography variant="subtitle1" gutterBottom>Company Info</Typography>
 <Typography variant="body2">{t`Name: {{company.name}}`}</Typography>
 <Typography variant="body2">{t`Founded: {{company.founded}}`}</Typography>
 <Typography variant="body2">{t`Description: {{company.description}}`}</Typography>
 </Paper>
 </GridCell>
 <GridCell>
 <Paper elevation={1} sx={{ p: 2 }}>
 <Typography variant="subtitle1" gutterBottom>Statistics</Typography>
 <Typography variant="body2">{t`Users: {{stats.users}}`}</Typography>
 <Typography variant="body2">{t`Projects: {{stats.projects}}`}</Typography>
 <Typography variant="body2">{t`Downloads: {{stats.downloads}}`}</Typography>
 </Paper>
 </GridCell>
 </GridLayout>
 <hr />
 <Box display="flex" gap={1} >
 <Button
 variant="outlined"
 onClick={() => {
 if ('clearCache' in provider && typeof provider.clearCache === 'function') {
 provider.clearCache();
 }
 if ('getCacheStats' in provider && typeof provider.getCacheStats === 'function') {
 setStats(provider.getCacheStats());
 }
 }}
 >
 Clear Cache
 </Button>
 <Button
 variant="outlined"
 onClick={() => setRefreshKey(prev => prev + 1)}
 >
 Force Refresh ({refreshKey})
 </Button>
 </Box>
 </CardContent>
 </Card>
 </DataProvider>
 );
};

// Component for testing hooks with MUI styling
const DataHooksDemo = () => {
 const { data: companies, loading: companiesLoading } = useData('company');
 const { resolved: welcomeMessage } = useResolveTemplate('Welcome to {{company.name}}, founded in {{company.founded}}!');

 if (companiesLoading) {
 return (
 <Box sx={{ p: 3 }}>
 <Typography>Loading content...</Typography>
 </Box>
 );
 }

 return (
 <Box sx={{ p: 3, maxWidth: '800px' }}>
 <Typography variant="h4" gutterBottom>DataProvider Hooks Demo</Typography>

 <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
 <Typography variant="h6" gutterBottom>useResolveTemplate Hook</Typography>
 <Typography variant="h6" sx={{ fontWeight: 'normal' }}>{welcomeMessage}</Typography>
 </Paper>

 <Box mb={3}>
 <Typography variant="h6" gutterBottom>useData Hook (All Companies)</Typography>
 <GridLayout columns={1} spacing={2}>
 {(Array.isArray(companies) ? companies : []).map((company, index) => (
 <GridCell key={index}>
 <Card variant="outlined">
 <CardContent>
 <Typography variant="h6">{company.name}</Typography>
 <Typography color="text.secondary" gutterBottom>
 {t`{{company.slogan}}`}
 </Typography>
 <Typography variant="body2">{t`Industry: {{company.profile.industry}} | Founded: {{company.founded}}`}</Typography>
 </CardContent>
 </Card>
 </GridCell>
 ))}
 </GridLayout>
 </Box>
 </Box>
 );
};

// Component for demonstrating t function with QwickApps React Framework components
const TaggedTemplateFunctionDemo = () => {
 return (
 <Box sx={{ p: 3, maxWidth: '800px' }}>
 <Typography variant="h4" gutterBottom>Tagged Template Function Demo</Typography>

 <Section>
 <Typography variant="h5" gutterBottom>Basic Templates</Typography>
 <Typography>Simple property access using mustache syntax:</Typography>

 <GridLayout columns={1} spacing={0}>
 <ul>
 <li>{t`Company Name: {{company.name}}`}</li>
 <li>{t`Founded: {{company.founded}}`}</li>
 <li>{t`Slogan: {{company.slogan}}`}</li>
 </ul>
 </GridLayout>

 <Code title="Basic Template Usage" language='tsx'>
 {`<ul>
 <li>{t\`Company Name: {{company.name}}\`}</li>
 <li>{t\`Founded: {{company.founded}}\`}</li>
 <li>{t\`Slogan: {{company.slogan}}\`}</li>
</ul>`}
 </Code>
 </Section>

 <Section>
 <Typography variant="h5" gutterBottom>Deep Nested Properties</Typography>
 <Typography>Access deeply nested object properties with dot notation:</Typography>

 <GridLayout columns={1} spacing={2}>
 <ul>
 <li><b>Industry: </b>{t`{{company.profile.industry}}`}</li>
 <li><b>Location: </b>{t`{{company.profile.address.city}}, {{company.profile.address.state}}`}</li>
 <li><b>Contact: </b>{t`{{company.profile.contact.email}}`}</li>
 <li><b>Social: </b>{t`{{company.profile.contact.social.twitter}}`}</li>
 </ul>
 </GridLayout>

 <Code title="Nested Property Access" language='tsx'>
 {`<ul>
 <li><b>Industry:</b>{t\`{{company.profile.industry}}\`}</li>
 <li><b>Location:</b>{t\`{{company.profile.address.city}}, {{company.profile.address.state}}\`}</li>
 <li><b>Contact:</b>{t\`{{company.profile.contact.email}}\`}</li>
</ul>`}
 </Code>
 </Section>

 <Section>
 <Typography variant="h5" gutterBottom>Complex Templates</Typography>
 <Typography>Combine multiple properties in sophisticated template strings:</Typography>

 <GridLayout columns={1}>
 {t`{{company.name}} is a {{company.profile.industry}} company founded in {{company.founded}}. We're located in {{company.profile.address.city}}, {{company.profile.address.state}} and our mission is: "{{company.slogan}}"`}
 {t` Metrics: {{company.metrics.users}} users, {{company.metrics.apps}} apps, {{company.metrics.downloads}} downloads`}
 </GridLayout>
 <Box sx={{ pt: 2 }} />
 <Code title="Complex Template Strings" language='tsx'>
 {`<GridLayout columns={1}>
 {t\`{{company.name}} is a {{company.profile.industry}} company founded in {{company.founded}}. We're located in {{company.profile.address.city}}, {{company.profile.address.state}} and our mission is: "{{company.slogan}}"\`}
 {t\` Metrics: {{company.metrics.users}} users, {{company.metrics.apps}} apps, {{company.metrics.downloads}} downloads\`}
</GridLayout>`}
 </Code>
 </Section>

 <Section>
 <Typography variant="h5">Template with Custom Wrapper</Typography>
 <Typography>Templates can be wrapped with custom components. For example: the <code>blockquote</code> element can be used to create a quote-like appearance.</Typography>
 {t.wrap(({ children }) => (
 <blockquote style={{
 padding: '15px',
 borderLeft: '4px solid #007acc',
 backgroundColor: '#f8f9fa',
 margin: '10px 0',
 fontStyle: 'italic'
 }}>
 {children}
 </blockquote>
 ))`"{{company.slogan}}" - {{company.name}} Team`}
 <Code title="Template with Custom Wrapper" language='tsx'>
 {`{t.wrap(({ children }) => (
 <blockquote style={{
 padding: '15px',
 borderLeft: '4px solid #007acc',
 backgroundColor: '#f8f9fa',
 margin: '10px 0',
 fontStyle: 'italic'
 }}>
 {children}
 </blockquote>
))\`"{{company.slogan}}" - {{company.name}} Team\`}`}
 </Code>
 </Section>
 </Box>
 );
};

// Interactive demo component
const InteractiveDemo = () => {
 const [template, setTemplate] = useState('Hello {{company.name}}! You were founded in {{company.founded}}.');
 const { resolved } = useResolveTemplate(template);

 return (
 <div style={{ padding: '20px', maxWidth: '800px' }}>
 <h2>Interactive Template Editor</h2>
 <p>Try editing the template below to see live template resolution:</p>

 <div style={{ marginBottom: '20px' }}>
 <label htmlFor="template-input" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
 Template (use {'{fieldGroup.property}'} syntax):
 </label>
 <textarea
 id="template-input"
 value={template}
 onChange={(e) => setTemplate(e.target.value)}
 style={{
 width: '100%',
 height: '100px',
 padding: '10px',
 borderRadius: '4px',
 border: '1px solid #ccc',
 fontFamily: 'monospace',
 fontSize: '14px'
 }}
 placeholder="Enter your template here..."
 />
 </div>

 <div style={{ padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
 <h4>Resolved Output:</h4>
 <div style={{
 padding: '10px',
 backgroundColor: 'white',
 borderRadius: '4px',
 minHeight: '40px',
 display: 'flex',
 alignItems: 'center',
 fontSize: '16px'
 }}>
 {resolved}
 </div>
 </div>

 <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
 <h4>Available Template Variables:</h4>
 <ul style={{ columns: 2, columnGap: '30px' }}>
 <li><code>{'{{company.name}}'}</code> - Company name</li>
 <li><code>{'{{company.founded}}'}</code> - Year founded</li>
 <li><code>{'{{company.slogan}}'}</code> - Company slogan</li>
 <li><code>{'{{company.profile.industry}}'}</code> - Industry</li>
 <li><code>{'{{company.profile.address.city}}'}</code> - City</li>
 <li><code>{'{{company.profile.contact.email}}'}</code> - Email</li>
 <li><code>{'{{company.metrics.users}}'}</code> - User count</li>
 <li><code>{'{{features.0.title}}'}</code> - First feature title</li>
 </ul>
 </div>
 </div>
 );
};

// Error handling demo
const ErrorHandlingDemo = () => {

 const errorProvider = new JsonDataProvider({
 data: {
 // Empty data to test missing properties
 }
 });

 const provider = new CachedDataProvider(errorProvider, { maxSize: 50, defaultTTL: 30000 });

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <div style={{ padding: '20px', maxWidth: '800px' }}>
 <h2>Error Handling & Fallbacks Demo</h2>

 <div style={{ marginBottom: '20px' }}>
 <h3>Missing Properties (with fallbacks)</h3>
 <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', marginBottom: '10px' }}>
 {t`Welcome to {{company.name}}!`}
 </div>
 <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', marginBottom: '10px' }}>
 {t`Our motto: "{{company.slogan}}"`}
 </div>
 </div>

 <div style={{ marginBottom: '20px' }}>
 <h3>Missing Properties (no fallbacks)</h3>
 <div style={{ padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px', marginBottom: '10px' }}>
 {t`Founded: {{company.founded}}`} (will be empty)
 </div>
 <div style={{ padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px', marginBottom: '10px' }}>
 {t`Email: {{company.email}}`} (will be empty)
 </div>
 </div>

 <div>
 <h3>Template with Fallback Content</h3>
 <div style={{ padding: '15px', backgroundColor: '#e1f5fe', borderRadius: '8px' }}>
 <p>This template references missing data and should show the fallback:</p>
 <T template="{{nonexistent.data}}" fallback="[No data available - this is the fallback content]" />
 </div>
 </div>
 </div>
 </DataProvider>
 );
};

/**
 * QwickApp integration with DataProvider
 */
export const QwickAppIntegration: Story = {
 render: () => {
 const provider = new JsonDataProvider({
 data: {
 company: sampleCompanyData,
 features: sampleFeaturesData.slice(0, 2), // Fewer features for cleaner display
 team: sampleTeamData
 }
 });

 return (
 <QwickApp
 appName="DataProvider Demo"
 appId="com.qwickapps.content-demo"
 dataSource={{ dataProvider: provider }}
 enableScaffolding={true}
 showThemeSwitcher={true}
 navigationItems={[
 { id: 'home', label: 'Home', href: '#' },
 { id: 'features', label: 'Features', href: '#features' },
 { id: 'team', label: 'Team', href: '#team' }
 ]}
 >
 <div style={{ padding: '20px' }}>
 <section style={{ textAlign: 'center', marginBottom: '40px' }}>
 <h1>{t`Welcome to {{company.name}}`}</h1>
 <p style={{ fontSize: '20px', color: '#666' }}>
 {t`{{company.slogan}}`}
 </p>
 <p>
 {t`We're a {{company.profile.industry}} company based in {{company.profile.address.city}}, {{company.profile.address.state}}, founded in {{company.founded}}.`}
 </p>
 </section>

 <section id="features" style={{ marginBottom: '40px' }}>
 <h2>Features</h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
 {sampleFeaturesData.slice(0, 2).map((feature, index) => (
 <div key={index} style={{
 padding: '20px',
 border: '1px solid #ddd',
 borderRadius: '8px',
 textAlign: 'center'
 }}>
 <div style={{ fontSize: '48px', marginBottom: '10px' }}>
 {feature.icon}
 </div>
 <h3>{feature.title}</h3>
 <p>{feature.description}</p>
 </div>
 ))}
 </div>
 </section>

 <section id="team">
 <h2>Team</h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
 {sampleTeamData.map((member, index) => (
 <div key={index} style={{
 padding: '20px',
 border: '1px solid #ddd',
 borderRadius: '8px',
 textAlign: 'center'
 }}>
 <img
 src={member.avatar}
 alt=""
 style={{ borderRadius: '50%', marginBottom: '10px' }}
 />
 <h3>{member.name}</h3>
 <p style={{ fontWeight: 'bold', color: '#666' }}>
 {member.role}
 </p>
 <p>{member.bio}</p>
 </div>
 ))}
 </div>
 </section>
 </div>
 </QwickApp>
 );
 }
};

/**
 * Demonstration of React hooks for content
 */
export const ReactHooks: Story = {
 render: () => {
 const provider = new JsonDataProvider({
 data: {
 company: sampleCompanyData,
 features: sampleFeaturesData
 }
 });

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <DataHooksDemo />
 </DataProvider>
 );
 }
};

/**
 * Tagged template function demonstration
 */
export const TaggedTemplateFunction: Story = {
 render: () => {
 const provider = new JsonDataProvider({
 data: {
 company: sampleCompanyData,
 features: sampleFeaturesData
 }
 });

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <TaggedTemplateFunctionDemo />
 </DataProvider>
 );
 }
};

/**
 * Interactive template editor
 */
export const InteractiveEditor: Story = {
 render: () => {
 const provider = new JsonDataProvider({
 data: {
 company: sampleCompanyData,
 features: sampleFeaturesData
 }
 });

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <InteractiveDemo />
 </DataProvider>
 );
 }
};

/**
 * Error handling and fallbacks
 */
export const ErrorHandling: Story = {
 render: () => <ErrorHandlingDemo />
};

/**
 * External JSON file loading (simulated with fetch mock)
 */
// External JSON Component
const ExternalJSONComponent = () => {
 // Mock fetch for this story
 const originalFetch = global.fetch;
 global.fetch = ((url: string) => {
 if (url.includes('company.json')) {
 return Promise.resolve({
 ok: true,
 json: () => Promise.resolve(sampleCompanyData)
 });
 }
 if (url.includes('features.json')) {
 return Promise.resolve({
 ok: true,
 json: () => Promise.resolve(sampleFeaturesData)
 });
 }
 return Promise.reject(new Error('Not found'));
 }) as typeof fetch;

 const provider = new JsonDataProvider({
 baseUrl: '/api/content'
 });

 React.useEffect(() => {
 return () => {
 global.fetch = originalFetch;
 };
 }, [originalFetch]);

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <div style={{ padding: '20px', maxWidth: '600px' }}>
 <h1>External JSON Loading</h1>
 <p>This story demonstrates loading content from external JSON files.</p>
 <p><small>Note: In this demo, fetch is mocked to simulate external API calls.</small></p>

 <div style={{ marginBottom: '20px' }}>
 <h2>{t`{{company.name}}`}</h2>
 <p>{t`{{company.slogan}}`}</p>
 </div>

 <div>
 <h3>Features</h3>
 <p>First feature: {t`{{features.0.title}}`}</p>
 <p>Second feature: {t`{{features.1.title}}`}</p>
 <p>Company: {t`{{company.0.name}}`}</p>
 </div>
 </div>
 </DataProvider>
 );
};
ExternalJSONComponent.displayName = 'ExternalJSONComponent';

export const ExternalJSON: Story = {
 render: () => <ExternalJSONComponent />
};

/**
 * Performance demonstration component
 */
const PerformanceDemoComponent = () => {
 const [renderCount, setRenderCount] = useState(1);
 const [cacheStats, setCacheStats] = useState<{ totalEntries: number; maxSize: number; expiredEntries: number }>({ totalEntries: 0, maxSize: 100, expiredEntries: 0 });
 const [forceRefresh, setForceRefresh] = useState(0);
 const [lastAction, setLastAction] = useState('Initial load');

 // Create provider only once using useMemo
 const provider = React.useMemo(() => {
 const jsonProvider = new JsonDataProvider({
 data: {
 company: nestedTestData.company,
 stats: nestedTestData.stats
 }
 });

 return new CachedDataProvider(jsonProvider, { maxSize: 100, defaultTTL: 60000 });
 }, []);

 // Update cache stats when requested
 const updateCacheStats = React.useCallback(() => {
 const stats = provider.getCacheStats();
 // Map stats to expected shape for cacheStats state
 setCacheStats({
 totalEntries: stats.totalEntries ?? stats.totalEntries ?? 0,
 maxSize: stats.maxSize ?? 100,
 expiredEntries: stats.expiredEntries ?? stats.expiredEntries ?? 0
 });
 console.log('[Performance Demo] Cache stats updated:', stats);
 }, [provider]);

 // Initialize cache stats on mount
 React.useEffect(() => {
 // Small delay to let initial content load
 setTimeout(() => {
 updateCacheStats();
 }, 100);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 // Update cache stats when content changes
 React.useEffect(() => {
 updateCacheStats();
 }, [forceRefresh, updateCacheStats]);

 const triggerRender = (action: string) => {
 setRenderCount(prev => prev + 1);
 setLastAction(action);
 setForceRefresh(prev => prev + 1);
 };

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <div style={{ padding: '20px', maxWidth: '800px' }}>
 <h1>Performance & Caching Demo</h1>

 <div style={{
 padding: '20px',
 backgroundColor: '#e7f3ff',
 borderRadius: '8px',
 marginBottom: '20px',
 border: '2px solid #2196f3'
 }}>
 <h3 style={{ marginTop: 0, color: '#1976d2' }}> Performance Metrics</h3>

 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '15px' }}>
 <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>{renderCount}</div>
 <div style={{ fontSize: '12px', color: '#666' }}>Renders</div>
 </div>

 {/* <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196f3' }}>{cacheStats.expiredEntries.length > 0 ? '✓' : '○'}</div>
 <div style={{ fontSize: '12px', color: '#666' }}>Cache Status</div>
 <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>{cacheStats.expiredEntries.length > 0 ? 'Active' : 'Empty'}</div>
 </div> */}

 <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff9800' }}>{renderCount > 1 ? '' : '○'}</div>
 <div style={{ fontSize: '12px', color: '#666' }}>Performance</div>
 <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>{renderCount > 1 ? 'Cached' : 'Loading'}</div>
 </div>

 <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
 <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c27b0' }}>{cacheStats.totalEntries}/{cacheStats.maxSize}</div>
 <div style={{ fontSize: '12px', color: '#666' }}>Cache Usage</div>
 </div>
 </div>

 <div style={{ marginBottom: '15px' }}>
 <strong>Last Action:</strong> <span style={{ color: '#1976d2' }}>{lastAction}</span>
 </div>

 {/* <div style={{ marginBottom: '15px' }}>
 <strong>Cached Field Groups:</strong>
 <div style={{ marginTop: '5px' }}>
 {cacheStats.expiredEntries.length > 0 ? (
 cacheStats.expiredEntries.map(key => (
 <span key={key} style={{
 display: 'inline-block',
 margin: '2px 5px 2px 0',
 padding: '2px 8px',
 backgroundColor: '#4caf50',
 color: 'white',
 borderRadius: '12px',
 fontSize: '12px'
 }}>
 {key}
 </span>
 ))
 ) : (
 <span style={{ color: '#666', fontStyle: 'italic' }}>No cached data yet</span>
 )}
 </div>
 </div> */}

 <small style={{ color: '#666' }}>
 💡 Open browser console to see detailed cache behavior logs.
 </small>
 </div>

 <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
 <button
 onClick={() => triggerRender('Manual re-render')}
 style={{
 padding: '12px 24px',
 backgroundColor: '#4caf50',
 color: 'white',
 border: 'none',
 borderRadius: '6px',
 cursor: 'pointer',
 fontWeight: 'bold',
 fontSize: '14px'
 }}
 >
 Render Again
 </button>

 <button
 onClick={() => {
 provider.clearCache();
 triggerRender('Cache cleared');
 }}
 style={{
 padding: '12px 24px',
 backgroundColor: '#f44336',
 color: 'white',
 border: 'none',
 borderRadius: '6px',
 cursor: 'pointer',
 fontWeight: 'bold',
 fontSize: '14px'
 }}
 >
 🗋 Clear Cache
 </button>

 <button
 onClick={() => {
 // Reset all metrics
 setRenderCount(1);
 setLastAction('Reset all metrics');
 provider.clearCache();
 updateCacheStats();
 }}
 style={{
 padding: '12px 24px',
 backgroundColor: '#9c27b0',
 color: 'white',
 border: 'none',
 borderRadius: '6px',
 cursor: 'pointer',
 fontWeight: 'bold',
 fontSize: '14px'
 }}
 >
 Reset All
 </button>
 </div>

 <div style={{
 padding: '20px',
 backgroundColor: '#f8f9fa',
 borderRadius: '8px',
 marginBottom: '20px'
 }}>
 <h3>Cached Data Demo</h3>
 <p style={{ marginBottom: '15px' }}>The data below is loaded through the DataProvider. Watch the cache metrics as you interact:</p>

 <div key={forceRefresh} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
 <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #ddd' }}>
 <h4 style={{ marginTop: 0, color: '#1976d2' }}>Company Info</h4>
 <p><strong>Name:</strong> {t`{{company.name}}`}</p>
 <p><strong>Slogan:</strong> {t`{{company.slogan}}`}</p>
 <p><strong>Founded:</strong> {t`{{company.founded}}`}</p>
 {/* <p><small style={{ color: '#666' }}>Loaded from: {cacheStats.expiredEntries.includes('company') ? ' Cache' : ' Fresh fetch'}</small></p> */}
 </div>

 <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #ddd' }}>
 <h4 style={{ marginTop: 0, color: '#4caf50' }}>Features</h4>
 <p><strong>First:</strong> {t`{{features.0.title}}`}</p>
 <p><strong>Second:</strong> {t`{{features.1.title}}`}</p>
 <p><strong>Icon:</strong> {t`{{features.0.icon}}`}</p>
 {/* <p><small style={{ color: '#666' }}>Loaded from: {cacheStats.expiredEntries.includes('features') ? ' Cache' : ' Fresh fetch'}</small></p> */}
 </div>
 </div>
 </div>

 <div style={{
 padding: '15px',
 backgroundColor: '#fff3e0',
 borderRadius: '6px',
 fontSize: '14px'
 }}>
 <h4 style={{ marginTop: 0 }}> How to Test:</h4>
 <ol style={{ marginBottom: 0, paddingLeft: '20px' }}>
 <li><strong>Watch "Cache Usage"</strong> - Shows {cacheStats.totalEntries}/{cacheStats.maxSize} cached items</li>
 <li><strong>Click "Render Again"</strong> - Forces content reload, updates "Loaded from" indicators</li>
 <li><strong>Click "Clear Cache"</strong> - Watch cache usage drop to 0/100, then rebuild</li>
 <li><strong>Check "Cached Field Groups"</strong> - Green badges show what's currently cached</li>
 <li><strong>Browser console logs</strong> - See JsonDataProvider cache hit/miss messages</li>
 <li><strong>"Loaded from" indicators</strong> - Shows if data came from cache or fresh fetch </li>
 </ol>
 </div>
 </div>
 </DataProvider>
 );
};
PerformanceDemoComponent.displayName = 'PerformanceDemoComponent';

/**
 * Performance demonstration with caching
 */
export const PerformanceDemo: Story = {
 render: () => <PerformanceDemoComponent />
};

/**
 * Deep nested property access demonstration with enhanced MUI styling
 */
export const NestedProperties: Story = {
 render: () => {
 const provider = new JsonDataProvider({
 data: nestedTestData,
 enableLogging: true
 });

 return (
 <DataProvider dataSource={{ dataProvider: provider }}>
 <Box sx={{ p: 3 }}>
 <Typography variant="h4" gutterBottom>Deep Nested Property Access</Typography>
 <Typography variant="body1" paragraph>
 JsonDataProvider supports deep nested property access using dot notation.
 </Typography>

 <GridLayout columns={2} spacing={3}>
 <GridCell>
 <Card sx={{ bgcolor: 'primary.50' }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>Basic Properties</Typography>
 <Typography variant="body2" paragraph>{t`Company: {{company.name}}`}</Typography>
 <Typography variant="body2" paragraph>{t`Industry: {{company.profile.industry}}`}</Typography>
 <Typography variant="body2">{t`Size: {{company.profile.size}}`}</Typography>
 </CardContent>
 </Card>
 </GridCell>

 <GridCell>
 <Card sx={{ bgcolor: 'success.50' }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>Location Details</Typography>
 <Typography variant="body2" paragraph>{t`City: {{company.profile.location.city}}`}</Typography>
 <Typography variant="body2" paragraph>{t`State: {{company.profile.location.state}}`}</Typography>
 <Typography variant="body2" paragraph>{t`Country: {{company.profile.location.country}}`}</Typography>
 <Typography variant="body2">{t`Timezone: {{company.profile.location.timezone}}`}</Typography>
 </CardContent>
 </Card>
 </GridCell>

 <GridCell>
 <Card sx={{ bgcolor: 'warning.50' }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>Contact Information</Typography>
 <Typography variant="body2" paragraph>{t`Email: {{company.profile.contact.email}}`}</Typography>
 <Typography variant="body2" paragraph>{t`Phone: {{company.profile.contact.phone}}`}</Typography>
 <Typography variant="body2" paragraph>{t`Website: {{company.profile.contact.social.website}}`}</Typography>
 <Typography variant="body2">{t`Twitter: {{company.profile.contact.social.twitter}}`}</Typography>
 </CardContent>
 </Card>
 </GridCell>

 <GridCell>
 <Card sx={{ bgcolor: 'secondary.50' }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>Business Metrics</Typography>
 <Typography variant="body2" paragraph>{t`Employees: {{company.metrics.employees}}`}</Typography>
 <Typography variant="body2" paragraph>{t`Revenue: {{company.metrics.revenue}}`}</Typography>
 <Typography variant="body2" paragraph>{t`Growth: {{company.metrics.growth}}%`}</Typography>
 <Typography variant="body2">{t`Founded: {{company.metrics.founded}}`}</Typography>
 </CardContent>
 </Card>
 </GridCell>
 </GridLayout>

 <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
 <Typography variant="h6" gutterBottom>Complex Template:</Typography>
 <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
 {t`{{company.name}} is a {{company.profile.industry}} company based in {{company.profile.location.city}}, {{company.profile.location.state}}. Founded in {{company.metrics.founded}}, we now have {{company.metrics.employees}} employees and generated {{company.metrics.revenue}} in revenue. Contact us at {{company.profile.contact.email}} or visit {{company.profile.contact.social.website}}.`}
 </Paper>
 </Paper>
 </Box>
 </DataProvider>
 );
 }
};

/**
 * Caching behavior demonstration with side-by-side providers
 */
export const CachingBehavior: Story = {
 render: () => {
 const dataProvider = new JsonDataProvider({ data: nestedTestData })
 const fastCacheProvider = new CachedDataProvider(dataProvider, {
 defaultTTL: 3000, // 3 seconds
 maxSize: 5,
 enableLogging: true
 });

 const slowCacheProvider = new CachedDataProvider(dataProvider, {
 defaultTTL: 10000, // 10 seconds
 maxSize: 5,
 enableLogging: true
 });

 return (
 <Box sx={{ p: 3 }}>
 <Typography variant="h4" gutterBottom>Caching Behavior</Typography>
 <Typography variant="body1" paragraph>
 Compare different caching configurations. Check the browser console to see cache logs.
 </Typography>

 <GridLayout columns={2} spacing={3}>
 <GridCell>
 <Typography variant="h6" gutterBottom>Fast Cache (3s timeout)</Typography>
 <ProviderDemo provider={fastCacheProvider} title="Fast Cache Provider" />
 </GridCell>
 <GridCell>
 <Typography variant="h6" gutterBottom>Slow Cache (10s timeout)</Typography>
 <ProviderDemo provider={slowCacheProvider} title="Slow Cache Provider" />
 </GridCell>
 </GridLayout>

 <Alert severity="info" sx={{ mt: 2 }}>
 <Typography variant="subtitle2" gutterBottom>💡 Try This:</Typography>
 <ol>
 <li>Open browser console to see cache logs</li>
 <li>Click "Force Refresh" buttons to trigger content loading</li>
 <li>Notice how fast cache expires content more quickly</li>
 <li>Click "Clear Cache" to manually invalidate cache</li>
 </ol>
 </Alert>
 </Box>
 );
 }
};

/**
 * Configuration playground component
 */
const ConfigurationPlaygroundComponent = () => {
 const [config, setConfig] = useState({
 cacheTimeout: 5000,
 maxCacheSize: 10,
 enableLogging: true
 });

 const [provider, setProvider] = useState(() => new JsonDataProvider({
 data: nestedTestData,
 ...config
 }));

 const updateConfig = (newConfig: Partial<typeof config>) => {
 const updatedConfig = { ...config, ...newConfig };
 setConfig(updatedConfig);
 setProvider(new JsonDataProvider({
 data: nestedTestData,
 ...updatedConfig
 }));
 };

 return (
 <Box sx={{ p: 3 }}>
 <Typography variant="h4" gutterBottom>Configuration Playground</Typography>
 <Typography variant="body1" paragraph>
 Experiment with different JsonDataProvider configuration options.
 </Typography>

 <GridLayout spacing={3} equalHeight>
 <GridCell span={12}>
 <Alert severity="success" sx={{ mt: 2 }}>
 <Typography variant="subtitle2" gutterBottom>💡 Tips:</Typography>
 <ul style={{ margin: 0, paddingLeft: '20px' }}>
 <li>Lower cache timeout = more frequent cache invalidation</li>
 <li>Smaller max cache size = more aggressive LRU eviction</li>
 <li>Enable logging to see cache behavior in console</li>
 <li>Watch cache stats update in real-time</li>
 </ul>
 </Alert>
 </GridCell>
 <Card>
 <CardContent>
 <Typography variant="h6" gutterBottom>Configuration</Typography>

 <Box sx={{ mb: 3 }}>
 <Typography gutterBottom>Cache Timeout (ms): {config.cacheTimeout}</Typography>
 <Slider
 value={config.cacheTimeout}
 min={1000}
 max={30000}
 step={1000}
 onChange={(_, value) => updateConfig({ cacheTimeout: value as number })}
 />
 </Box>

 <Box sx={{ mb: 3 }}>
 <Typography gutterBottom>Max Cache Size: {config.maxCacheSize}</Typography>
 <Slider
 value={config.maxCacheSize}
 min={1}
 max={50}
 step={1}
 onChange={(_, value) => updateConfig({ maxCacheSize: value as number })}
 />
 </Box>

 <FormControlLabel
 control={
 <Checkbox
 checked={config.enableLogging}
 onChange={(e) => updateConfig({ enableLogging: e.target.checked })}
 />
 }
 label="Enable Logging"
 sx={{ mb: 2 }}
 />

 <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
 <Typography variant="subtitle2" gutterBottom>Current Config:</Typography>
 <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
 {JSON.stringify(config, null, 2)}
 </Typography>
 </Paper>
 </CardContent>
 </Card>

 <ProviderDemo provider={provider} title="Configured Provider" />
 </GridLayout>
 </Box>
 );
};
ConfigurationPlaygroundComponent.displayName = 'ConfigurationPlaygroundComponent';

/**
 * Interactive configuration playground with real-time settings
 */
export const ConfigurationPlayground: Story = {
 render: () => <ConfigurationPlaygroundComponent />
};
