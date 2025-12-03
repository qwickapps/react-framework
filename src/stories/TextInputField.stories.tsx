/**
 * TextInputField Component Stories - Reusable text input with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Paper } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import TextInputField from '../components/input/TextInputField';
import QwickApp from '../components/QwickApp';
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Sample text input field data for different use cases
const sampleCmsData = {
 'textInputFields': {
 'basic-text': { 
 label: 'Full Name', 
 placeholder: 'Enter your full name',
 required: true,
 type: 'text'
 },
 'email-field': { 
 label: 'Email Address', 
 placeholder: 'your.email@example.com',
 type: 'email',
 required: true,
 helperText: 'We will never share your email address'
 },
 'password-field': { 
 label: 'Password', 
 placeholder: 'Enter a strong password',
 type: 'password',
 required: true,
 helperText: 'Minimum 8 characters with mixed case and numbers'
 },
 'phone-field': { 
 label: 'Phone Number', 
 placeholder: '+1 (555) 123-4567',
 type: 'tel',
 helperText: 'Include country code for international numbers'
 },
 'number-field': { 
 label: 'Age', 
 placeholder: '25',
 type: 'number',
 required: false
 },
 'search-field': { 
 label: 'Search', 
 placeholder: 'Search products, articles, or help...',
 type: 'search',
 helperText: 'Use keywords to find what you need'
 },
 'multiline-field': { 
 label: 'Description', 
 placeholder: 'Tell us more about yourself...',
 multiline: true,
 rows: 4,
 helperText: 'Provide a brief description (optional)'
 },
 'large-textarea': { 
 label: 'Comments', 
 placeholder: 'Share your thoughts, feedback, or questions...',
 multiline: true,
 rows: 6,
 maxRows: 10,
 required: true
 },
 'disabled-field': { 
 label: 'Account ID', 
 value: 'USR-12345',
 disabled: true,
 helperText: 'This field cannot be modified'
 },
 'error-field': { 
 label: 'Username', 
 placeholder: 'Choose a unique username',
 error: 'This username is already taken',
 required: true
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Forms/TextInputField',
 component: TextInputField,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `TextInputField is a reusable text input component with consistent styling and comprehensive features for form building.

**Key Features:**
- **Multiple Input Types**: Support for text, email, password, number, tel, search, and more
- **Multiline Support**: Configurable textarea mode with rows and maxRows
- **Validation States**: Built-in error handling and helper text display
- **Data Binding**: Full CMS integration through dataSource prop
- **Accessibility**: Complete ARIA support and keyboard navigation
- **Theme Integration**: Automatically uses QwickApp theme styling
- **Base Props**: Supports grid behavior and consistent styling patterns
- **Flexible Configuration**: Comprehensive props for customization

**Perfect For:**
- User registration and login forms
- Contact and feedback forms
- Search and filter interfaces
- Profile and settings forms
- Any text input requirement with consistent styling`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof TextInputField>;

export default meta;
type Story = StoryObj<typeof TextInputField>;

// Traditional Usage Examples
export const BasicText: Story = {
 render: () => (
 <QwickApp appId="text-input-basic" appName='Basic Text Input'>
 <TextInputField 
 label="Full Name" 
 placeholder="Enter your full name"
 onChange={(value) => console.log('Name changed:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic text input field with label and placeholder.',
 },
 },
 },
};

export const EmailField: Story = {
 render: () => (
 <QwickApp appId="text-input-email" appName='Email Text Input'>
 <TextInputField 
 label="Email Address" 
 type="email"
 placeholder="your.email@example.com"
 required={true}
 helperText="We will never share your email address"
 onChange={(value) => console.log('Email changed:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Email input field with validation type and helper text.',
 },
 },
 },
};

export const PasswordField: Story = {
 render: () => (
 <QwickApp appId="text-input-password" appName='Password Text Input'>
 <TextInputField 
 label="Password" 
 type="password"
 placeholder="Enter a strong password"
 required={true}
 helperText="Minimum 8 characters with mixed case and numbers"
 onChange={(value) => console.log('Password changed:', value.length > 0 ? '***' : '')}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Password input field with masked text and security guidance.',
 },
 },
 },
};

export const MultilineField: Story = {
 render: () => (
 <QwickApp appId="text-input-multiline" appName='Multiline Text Input'>
 <TextInputField 
 label="Description" 
 placeholder="Tell us more about yourself..."
 multiline={true}
 rows={4}
 helperText="Provide a brief description (optional)"
 onChange={(value) => console.log('Description changed:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Multiline textarea input with configurable rows.',
 },
 },
 },
};

export const InputTypes: Story = {
 render: () => (
 <QwickApp appId="text-input-types" appName='Input Types'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <TextInputField 
 label="Number Input" 
 type="number"
 placeholder="25"
 onChange={(value) => console.log('Number:', value)}
 />
 <TextInputField 
 label="Phone Number" 
 type="tel"
 placeholder="+1 (555) 123-4567"
 onChange={(value) => console.log('Phone:', value)}
 />
 <TextInputField 
 label="Search Field" 
 type="search"
 placeholder="Search products, articles, or help..."
 onChange={(value) => console.log('Search:', value)}
 />
 <TextInputField 
 label="URL Input" 
 type="url"
 placeholder="https://example.com"
 onChange={(value) => console.log('URL:', value)}
 />
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Various input types with appropriate placeholders and validation.',
 },
 },
 },
};

export const States: Story = {
 render: () => (
 <QwickApp appId="text-input-states" appName='Input Field States'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <TextInputField 
 label="Normal State" 
 placeholder="Enter text here"
 onChange={(value) => console.log('Normal:', value)}
 />
 <TextInputField 
 label="Required Field" 
 placeholder="This field is required"
 required={true}
 onChange={(value) => console.log('Required:', value)}
 />
 <TextInputField 
 label="Disabled Field" 
 value="This field is disabled"
 disabled={true}
 />
 <TextInputField 
 label="Error State" 
 placeholder="Enter a valid value"
 error="This field contains an error"
 onChange={(value) => console.log('Error field:', value)}
 />
 <TextInputField 
 label="With Helper Text" 
 placeholder="Enter your information"
 helperText="This is helpful information about this field"
 onChange={(value) => console.log('With helper:', value)}
 />
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different input field states including normal, required, disabled, error, and helper text.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="text-input-data-binding" appName='TextInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven Text Input</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 TextInputField components can be completely driven by CMS data, loading configuration and behavior from your data source.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<TextInputField dataSource="textInputFields.basic-text" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.textInputFields['basic-text'], null, 2)}</Code>
 </Box>

 <TextInputField dataSource="textInputFields.basic-text" />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'TextInputField with data binding - configuration resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="text-input-data-advanced" appName='Advanced TextInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Input Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different TextInputField instances can load different configurations from separate data sources.
 </Typography>
 </Box>

 {/* Basic Contact Form */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Contact Information</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <TextInputField dataSource="textInputFields.basic-text" />
 <TextInputField dataSource="textInputFields.email-field" />
 <TextInputField dataSource="textInputFields.phone-field" />
 </Box>
 </Box>

 {/* Account Setup */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Account Setup</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <TextInputField dataSource="textInputFields.email-field" />
 <TextInputField dataSource="textInputFields.password-field" />
 <TextInputField dataSource="textInputFields.number-field" />
 </Box>
 </Box>

 {/* Text Areas */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Extended Information</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600 }}>
 <TextInputField dataSource="textInputFields.multiline-field" />
 <TextInputField dataSource="textInputFields.large-textarea" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple text input types showcasing different configurations and field types.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="text-input-fallback" appName='TextInputField Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 TextInputField components gracefully handle missing data sources with fallback configurations.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<TextInputField 
 dataSource="nonexistent.field" 
 label="Fallback Input"
 placeholder="This is fallback content"
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <TextInputField 
 dataSource="nonexistent.field"
 label="Fallback Input"
 placeholder="This is fallback content"
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <TextInputField dataSource="textInputFields.basic-text" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'TextInputField with fallback configuration when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="text-input-real-world" appName='Real World TextInputField Example' dataSource={{ dataProvider }}>
 <Box>
 
 {/* Registration Form */}
 <Paper sx={{ p: 4, mb: 4 }}>
 <Typography variant="h3" gutterBottom>Create Your Account</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Join thousands of developers building with QwickApps React Framework
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <TextInputField dataSource="textInputFields.basic-text" />
 <TextInputField dataSource="textInputFields.email-field" />
 <TextInputField dataSource="textInputFields.password-field" />
 </Box>
 </Paper>
 
 {/* Contact Form */}
 <Paper sx={{ p: 4, mb: 4 }}>
 <Typography variant="h3" gutterBottom>Get In Touch</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Have questions? We'd love to hear from you.
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
 <TextInputField dataSource="textInputFields.basic-text" />
 <TextInputField dataSource="textInputFields.email-field" />
 </Box>
 <TextInputField dataSource="textInputFields.phone-field" />
 <TextInputField dataSource="textInputFields.large-textarea" />
 </Box>
 </Paper>
 
 {/* Search Interface */}
 <Paper sx={{ p: 4 }}>
 <Typography variant="h3" gutterBottom>Search & Discovery</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Find exactly what you need with our powerful search
 </Typography>
 <Box sx={{ maxWidth: 500 }}>
 <TextInputField dataSource="textInputFields.search-field" />
 </Box>
 </Paper>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example showing TextInputField in various contexts: registration forms, contact forms, and search interfaces.',
 },
 },
 },
};

export const FieldStatesShowcase: Story = {
 render: () => (
 <QwickApp appId="text-input-showcase" appName='TextInputField States Showcase' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> State Management</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 TextInputField handles various states including error, disabled, and different field types gracefully.
 </Typography>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Normal State</Typography>
 <TextInputField dataSource="textInputFields.basic-text" />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Error State</Typography>
 <TextInputField dataSource="textInputFields.error-field" />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Disabled State</Typography>
 <TextInputField dataSource="textInputFields.disabled-field" />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Multiline Field</Typography>
 <TextInputField dataSource="textInputFields.multiline-field" />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Email Field</Typography>
 <TextInputField dataSource="textInputFields.email-field" />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Password Field</Typography>
 <TextInputField dataSource="textInputFields.password-field" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comprehensive showcase of different TextInputField states and configurations.',
 },
 },
 },
};

// Serialization Demo
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <TextInputField
      label="Serializable Text Field"
      placeholder="Enter your text here..."
      required={true}
      disabled={false}
      rows={3}
      maxLength={100}
      helpText="This field demonstrates serialization capabilities"
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates TextInputField serialization with all configuration options preserved.',
      },
    },
  },
};
