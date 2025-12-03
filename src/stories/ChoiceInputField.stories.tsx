/**
 * ChoiceInputField Component Stories - Dynamic options management with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Alert } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import ChoiceInputField from '../components/input/ChoiceInputField';
import QwickApp from '../components/QwickApp';
import { makeSerializationStory } from './_templates/SerializationTemplate';
import { useState } from 'react';

// Sample choice input field data for different use cases
const sampleCmsData = {
 'choiceInputFields': {
 'poll-question': { 
 label: 'Poll Options', 
 options: [
 'Strongly Agree',
 'Agree', 
 'Neutral',
 'Disagree',
 'Strongly Disagree'
 ],
 optionLabelPrefix: 'Choice',
 placeholder: 'Enter poll option...',
 addButtonText: 'Add Poll Option',
 rows: 1
 },
 'quiz-answers': { 
 label: 'Quiz Answer Options', 
 options: [
 '<b>JavaScript</b> - A programming language',
 '<i>Python</i> - Another programming language', 
 '<code>HTML</code> - Markup language',
 '<u>CSS</u> - Styling language'
 ],
 optionLabelPrefix: 'Answer',
 placeholder: 'Enter quiz answer with HTML formatting...',
 addButtonText: 'Add Answer',
 rows: 2
 },
 'feature-requests': { 
 label: 'Feature Request Categories', 
 options: [
 '<b> Performance</b><br/>Speed and optimization improvements',
 '<b> UI/UX</b><br/>Interface and experience enhancements', 
 '<b>⚙ Functionality</b><br/>New features and capabilities',
 '<b> Bug Fixes</b><br/>Issues and error corrections'
 ],
 optionLabelPrefix: 'Category',
 placeholder: 'Describe feature category with HTML...',
 addButtonText: 'Add Category',
 rows: 3
 },
 'product-benefits': { 
 label: 'Product Benefits', 
 options: [
 ' <b>Lightning Fast</b> - Optimized for speed',
 '🔒 <i>Secure by Design</i> - Built with security first', 
 ' <u>Mobile Responsive</u> - Works on all devices'
 ],
 optionLabelPrefix: 'Benefit',
 placeholder: 'Describe product benefit...',
 addButtonText: 'Add Benefit',
 rows: 2
 },
 'survey-responses': { 
 label: 'Survey Response Options', 
 options: [
 'Excellent',
 'Very Good', 
 'Good',
 'Fair',
 'Poor'
 ],
 optionLabelPrefix: 'Response',
 placeholder: 'Enter response option...',
 addButtonText: 'Add Response',
 rows: 1
 },
 'faq-categories': { 
 label: 'FAQ Categories', 
 options: [
 '<b>Getting Started</b><br/>Basic setup and onboarding questions',
 '<b>Account Management</b><br/>Profile, billing, and subscription questions', 
 '<b>Technical Support</b><br/>Technical issues and troubleshooting',
 '<b>Features & Usage</b><br/>How to use specific features'
 ],
 optionLabelPrefix: 'Category',
 placeholder: 'Define FAQ category with description...',
 addButtonText: 'Add FAQ Category',
 rows: 3
 },
 'menu-items': { 
 label: 'Navigation Menu Items', 
 options: [
 'Home',
 'About Us', 
 'Services',
 'Contact'
 ],
 optionLabelPrefix: 'Menu Item',
 placeholder: 'Enter menu item name...',
 addButtonText: 'Add Menu Item',
 rows: 1
 },
 'pricing-tiers': { 
 label: 'Pricing Tier Options', 
 options: [
 '<b>💎 Premium</b> - $99/month<br/><i>All features included</i>',
 '<b> Pro</b> - $49/month<br/><i>Most popular plan</i>', 
 '<b> Starter</b> - $19/month<br/><i>Perfect for beginners</i>'
 ],
 optionLabelPrefix: 'Tier',
 placeholder: 'Define pricing tier with details...',
 addButtonText: 'Add Pricing Tier',
 rows: 3
 },
 'team-roles': { 
 label: 'Team Role Definitions', 
 options: [
 '<b>👑 Project Manager</b><br/>Oversees project execution and team coordination',
 '<b> Senior Developer</b><br/>Leads technical development and code reviews'
 ],
 optionLabelPrefix: 'Role',
 placeholder: 'Define team role and responsibilities...',
 addButtonText: 'Add Team Role',
 rows: 3
 },
 'basic-options': { 
 label: 'Basic Options List', 
 options: [
 'Option A',
 'Option B'
 ],
 optionLabelPrefix: 'Option',
 placeholder: 'Enter option...',
 addButtonText: 'Add Option',
 rows: 1
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Forms/ChoiceInputField',
 component: ChoiceInputField,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `ChoiceInputField is a dynamic options management component with HTML formatting capabilities and data binding support for creating interactive choice lists.

**Key Features:**
- **Dynamic Options**: Add, edit, and manage multiple option inputs
- **HTML Formatting**: Each option supports rich HTML formatting through HtmlInputField
- **Flexible Configuration**: Customizable labels, placeholders, and button text
- **Data Binding**: Full CMS integration through dataSource prop
- **Interactive Management**: Built-in "Add Option" functionality for dynamic lists
- **Theme Integration**: Automatically uses QwickApp theme styling
- **Base Props**: Supports grid behavior and consistent styling patterns
- **Accessibility**: Complete ARIA support and keyboard navigation

**Perfect For:**
- Poll and survey question options
- Quiz and test answer choices
- Product feature lists and benefits
- FAQ category management
- Menu and navigation item creation
- Any dynamic list of formatted options`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof ChoiceInputField>;

export default meta;
type Story = StoryObj<typeof ChoiceInputField>;

// Interactive example component
function InteractiveChoiceExample({ 
 initialOptions = ['Option 1', 'Option 2'], 
 label = 'Interactive Options',
 optionLabelPrefix = 'Option'
}: {
 initialOptions?: string[];
 label?: string;
 optionLabelPrefix?: string;
}) {
 const [options, setOptions] = useState<string[]>(initialOptions);
 
 const handleOptionChange = (optionIndex: number, value: string) => {
 const newOptions = [...options];
 newOptions[optionIndex] = value;
 setOptions(newOptions);
 console.debug('Option changed:', { optionIndex, value, allOptions: newOptions });
 };
 
 const handleAddOption = () => {
 setOptions([...options, '']);
 console.debug('Added new option, total:', options.length + 1);
 };
 
 return (
 <ChoiceInputField
 label={label}
 options={options}
 optionLabelPrefix={optionLabelPrefix}
 onOptionChange={handleOptionChange}
 onAddOption={handleAddOption}
 placeholder="Enter option text. HTML formatting supported."
 />
 );
}

// Traditional Usage Examples
export const BasicChoices: Story = {
 render: () => (
 <QwickApp appId="choice-input-basic" appName='Basic Choice Input'>
 <InteractiveChoiceExample 
 initialOptions={['First Option', 'Second Option']}
 label="Basic Options List"
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic choice input field with editable options and add functionality.',
 },
 },
 },
};

export const PollOptions: Story = {
 render: () => (
 <QwickApp appId="choice-input-poll" appName='Poll Options'>
 <InteractiveChoiceExample 
 initialOptions={[
 'Strongly Agree',
 'Agree',
 'Neutral',
 'Disagree',
 'Strongly Disagree'
 ]}
 label="Poll Question Options"
 optionLabelPrefix="Choice"
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Choice input configured for poll question options with standard survey responses.',
 },
 },
 },
};

export const HtmlFormattedOptions: Story = {
 render: () => (
 <QwickApp appId="choice-input-html" appName='HTML Formatted Options'>
 <InteractiveChoiceExample 
 initialOptions={[
 '<b>JavaScript</b> - A programming language',
 '<i>Python</i> - Another programming language',
 '<code>HTML</code> - Markup language'
 ]}
 label="Quiz Answer Options"
 optionLabelPrefix="Answer"
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Choice input with HTML-formatted options for rich content like quiz answers.',
 },
 },
 },
};

export const ProductFeatures: Story = {
 render: () => (
 <QwickApp appId="choice-input-features" appName='Product Features'>
 <InteractiveChoiceExample 
 initialOptions={[
 ' <b>Lightning Fast</b> - Optimized for speed',
 '🔒 <i>Secure by Design</i> - Built with security first',
 ' <u>Mobile Responsive</u> - Works on all devices'
 ]}
 label="Product Benefits"
 optionLabelPrefix="Benefit"
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Choice input for managing product features and benefits with icons and formatting.',
 },
 },
 },
};

export const StaticDisplay: Story = {
 render: () => (
 <QwickApp appId="choice-input-static" appName='Static Choice Display'>
 <ChoiceInputField 
 label="Read-only Options"
 options={[
 'Option 1 (read-only)',
 'Option 2 (read-only)',
 'Option 3 (read-only)'
 ]}
 optionLabelPrefix="Item"
 disabled={true}
 // No onAddOption or onOptionChange = static display
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Static choice input display without edit functionality for read-only scenarios.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="choice-input-data-binding" appName='ChoiceInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven Choice Options</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 ChoiceInputField components can be completely driven by CMS data, loading options and configuration from your data source.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<ChoiceInputField dataSource="choiceInputFields.poll-question" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.choiceInputFields['poll-question'], null, 2)}</Code>
 </Box>

 <ChoiceInputField dataSource="choiceInputFields.poll-question" />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'ChoiceInputField with data binding - options and configuration resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="choice-input-data-advanced" appName='Advanced ChoiceInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Choice Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different ChoiceInputField instances can load different option sets and configurations from separate data sources.
 </Typography>
 </Box>

 {/* Survey & Polls */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Surveys & Polls</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 800 }}>
 <ChoiceInputField dataSource="choiceInputFields.poll-question" />
 <ChoiceInputField dataSource="choiceInputFields.survey-responses" />
 </Box>
 </Box>

 {/* Content Management */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Content & Learning</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 800 }}>
 <ChoiceInputField dataSource="choiceInputFields.quiz-answers" />
 <ChoiceInputField dataSource="choiceInputFields.faq-categories" />
 </Box>
 </Box>

 {/* Business Configuration */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Business & Product</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 800 }}>
 <ChoiceInputField dataSource="choiceInputFields.feature-requests" />
 <ChoiceInputField dataSource="choiceInputFields.pricing-tiers" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple choice types showcasing different configurations and use cases.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="choice-input-fallback" appName='ChoiceInputField Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 ChoiceInputField components gracefully handle missing data sources with fallback configurations.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<ChoiceInputField 
 dataSource="nonexistent.field" 
 label="Fallback Options"
 options={['Fallback 1', 'Fallback 2']}
 optionLabelPrefix="Option"
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <ChoiceInputField 
 dataSource="nonexistent.field"
 label="Fallback Options"
 options={['Fallback Option 1', 'Fallback Option 2']}
 optionLabelPrefix="Option"
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <ChoiceInputField dataSource="choiceInputFields.poll-question" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'ChoiceInputField with fallback options when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="choice-input-real-world" appName='Real World ChoiceInputField Example' dataSource={{ dataProvider }}>
 <Box>
 
 {/* Survey Platform */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Survey & Polling Platform</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Create comprehensive surveys and polls with customizable response options
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 900 }}>
 <ChoiceInputField dataSource="choiceInputFields.poll-question" />
 <ChoiceInputField dataSource="choiceInputFields.survey-responses" />
 </Box>
 </Box>
 
 {/* E-Learning System */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>E-Learning & Assessment</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
 Build interactive quizzes and organize educational content effectively
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 900 }}>
 <ChoiceInputField dataSource="choiceInputFields.quiz-answers" />
 <ChoiceInputField dataSource="choiceInputFields.faq-categories" />
 </Box>
 </Box>
 
 {/* Business Management */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Business Configuration</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Manage business features, pricing, and team structures dynamically
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 900 }}>
 <ChoiceInputField dataSource="choiceInputFields.feature-requests" />
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
 <ChoiceInputField dataSource="choiceInputFields.pricing-tiers" />
 <ChoiceInputField dataSource="choiceInputFields.team-roles" />
 </Box>
 </Box>
 </Box>
 
 {/* Website Management */}
 <Box sx={{ p: 4, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Website & Content Management</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
 Manage website navigation, product features, and content categories
 </Typography>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, maxWidth: 1000 }}>
 <ChoiceInputField dataSource="choiceInputFields.menu-items" />
 <ChoiceInputField dataSource="choiceInputFields.product-benefits" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example showing ChoiceInputField in various contexts: surveys, e-learning, business management, and website administration.',
 },
 },
 },
};

export const InteractiveDemo: Story = {
 render: () => (
 <QwickApp appId="choice-input-interactive" appName='Interactive ChoiceInputField Demo'>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom>🎮 Interactive Demo</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Try editing the options below. You can modify existing options or add new ones using the "Add Option" button.
 </Typography>
 
 <Alert severity="info" sx={{ mb: 3 }}>
 <Typography variant="body2">
 Each option supports HTML formatting. Try using <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>, <code>&lt;u&gt;</code>, or <code>&lt;code&gt;</code> tags!
 </Typography>
 </Alert>
 </Box>

 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 800 }}>
 <InteractiveChoiceExample 
 initialOptions={[
 '<b>Excellent</b> - Outstanding quality',
 '<i>Very Good</i> - Above expectations',
 'Good - Meets expectations'
 ]}
 label="Customer Satisfaction Survey"
 optionLabelPrefix="Rating"
 />
 
 <InteractiveChoiceExample 
 initialOptions={[
 ' <b>Marketing</b>',
 ' <b>Development</b>',
 ' <b>Design</b>'
 ]}
 label="Department Selection"
 optionLabelPrefix="Department"
 />
 
 <InteractiveChoiceExample 
 initialOptions={[
 '<code>React</code> - UI Library',
 '<code>TypeScript</code> - Type Safety'
 ]}
 label="Technology Stack"
 optionLabelPrefix="Technology"
 />
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Interactive demonstration of ChoiceInputField functionality with real-time editing and HTML formatting.',
 },
 },
 },
};

// Serialization Demo
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <ChoiceInputField
      label="Serializable Choice Input"
      options={[
        'Option 1 - First Choice',
        'Option 2 - Second Choice',
        'Option 3 - Third Choice'
      ]}
      optionLabelPrefix="Choice"
      placeholder="Enter new option..."
      addButtonText="Add Option"
      rows={3}
      maxOptions={5}
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates ChoiceInputField serialization with all configuration options preserved.',
      },
    },
  },
};
