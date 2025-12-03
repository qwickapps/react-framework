/**
 * SelectInputField Component Stories - Select dropdown with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import SelectInputField from '../components/input/SelectInputField';
import QwickApp from '../components/QwickApp';
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Sample select field data for different use cases
const sampleCmsData = {
 'selectInputFields': {
 'basic-dropdown': { 
 label: 'Country', 
 placeholder: 'Select your country',
 required: true,
 options: [
 { label: 'United States', value: 'us' },
 { label: 'Canada', value: 'ca' },
 { label: 'United Kingdom', value: 'uk' },
 { label: 'Germany', value: 'de' },
 { label: 'France', value: 'fr' },
 { label: 'Australia', value: 'au' },
 { label: 'Japan', value: 'jp' }
 ]
 },
 'user-role': { 
 label: 'User Role', 
 placeholder: 'Choose user role',
 required: true,
 helperText: 'Select the appropriate role for this user',
 options: [
 { label: 'Administrator', value: 'admin' },
 { label: 'Editor', value: 'editor' },
 { label: 'Author', value: 'author' },
 { label: 'Contributor', value: 'contributor' },
 { label: 'Subscriber', value: 'subscriber' }
 ]
 },
 'product-category': { 
 label: 'Product Category', 
 placeholder: 'Select category',
 helperText: 'Choose the most appropriate category',
 options: [
 { label: 'Electronics', value: 'electronics' },
 { label: 'Clothing & Fashion', value: 'clothing' },
 { label: 'Home & Garden', value: 'home-garden' },
 { label: 'Books & Media', value: 'books-media' },
 { label: 'Sports & Outdoors', value: 'sports' },
 { label: 'Health & Beauty', value: 'health-beauty' }
 ]
 },
 'priority-level': { 
 label: 'Priority Level', 
 placeholder: 'Set priority',
 required: true,
 options: [
 { label: '🔥 Critical', value: 'critical' },
 { label: ' High', value: 'high' },
 { label: '🟡 Medium', value: 'medium' },
 { label: '🔵 Low', value: 'low' },
 { label: '⚪ Minimal', value: 'minimal' }
 ]
 },
 'subscription-plan': { 
 label: 'Subscription Plan', 
 placeholder: 'Choose your plan',
 required: true,
 helperText: 'You can upgrade or downgrade at any time',
 options: [
 { label: 'Free Plan - $0/month', value: 'free' },
 { label: 'Starter Plan - $9/month', value: 'starter' },
 { label: 'Professional Plan - $29/month', value: 'professional' },
 { label: 'Enterprise Plan - $99/month', value: 'enterprise' }
 ]
 },
 'language-preference': { 
 label: 'Language Preference', 
 placeholder: 'Select language',
 helperText: 'Choose your preferred interface language',
 options: [
 { label: '🇺🇸 English', value: 'en' },
 { label: '🇪🇸 Spanish', value: 'es' },
 { label: '🇫🇷 French', value: 'fr' },
 { label: '🇩🇪 German', value: 'de' },
 { label: '🇮🇹 Italian', value: 'it' },
 { label: '🇯🇵 Japanese', value: 'ja' },
 { label: '🇰🇷 Korean', value: 'ko' },
 { label: '🇨🇳 Chinese (Simplified)', value: 'zh-cn' }
 ]
 },
 'status-select': { 
 label: 'Status', 
 value: 'active',
 options: [
 { label: '✅ Active', value: 'active' },
 { label: '⏸ Pending', value: 'pending' },
 { label: '❌ Inactive', value: 'inactive' },
 { label: '🛑 Suspended', value: 'suspended' }
 ]
 },
 'disabled-select': { 
 label: 'Read-only Field', 
 value: 'locked-value',
 disabled: true,
 helperText: 'This field cannot be modified',
 options: [
 { label: 'Locked Value', value: 'locked-value' },
 { label: 'Alternative Option', value: 'alt-option' }
 ]
 },
 'error-select': { 
 label: 'Department', 
 placeholder: 'Select department',
 error: 'Please select a valid department',
 required: true,
 options: [
 { label: 'Engineering', value: 'engineering' },
 { label: 'Design', value: 'design' },
 { label: 'Marketing', value: 'marketing' },
 { label: 'Sales', value: 'sales' }
 ]
 },
 'numeric-options': { 
 label: 'Team Size', 
 placeholder: 'Select team size',
 helperText: 'Approximate number of team members',
 options: [
 { label: '1-5 people', value: 5 },
 { label: '6-10 people', value: 10 },
 { label: '11-25 people', value: 25 },
 { label: '26-50 people', value: 50 },
 { label: '51-100 people', value: 100 },
 { label: '100+ people', value: 999 }
 ]
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Forms/SelectInputField',
 component: SelectInputField,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `SelectInputField is a dropdown select component with comprehensive features and data binding support for form building.

**Key Features:**
- **Flexible Options**: Support for string and numeric values with custom labels
- **Rich Option Display**: Support for emoji and formatted option labels
- **Validation States**: Built-in error handling and helper text display
- **Data Binding**: Full CMS integration through dataSource prop
- **Accessibility**: Complete ARIA support and keyboard navigation
- **Theme Integration**: Automatically uses QwickApp theme styling
- **Base Props**: Supports grid behavior and consistent styling patterns
- **Placeholder Support**: Configurable placeholder text for empty state

**Perfect For:**
- User role and permission selection
- Category and classification dropdowns
- Settings and preference selection
- Status and priority selection
- Language and region selection
- Any single-choice selection requirement`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof SelectInputField>;

export default meta;
type Story = StoryObj<typeof SelectInputField>;

// Traditional Usage Examples
export const BasicDropdown: Story = {
 render: () => (
 <QwickApp appId="select-basic" appName='Basic Select'>
 <SelectInputField 
 label="Country" 
 placeholder="Select your country"
 options={[
 { label: 'United States', value: 'us' },
 { label: 'Canada', value: 'ca' },
 { label: 'United Kingdom', value: 'uk' },
 { label: 'Germany', value: 'de' }
 ]}
 onChange={(value) => console.log('Country selected:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic select dropdown with country options.',
 },
 },
 },
};

export const WithIcons: Story = {
 render: () => (
 <QwickApp appId="select-icons" appName='Select with Icons'>
 <SelectInputField 
 label="Priority Level" 
 placeholder="Set priority"
 options={[
 { label: '🔥 Critical', value: 'critical' },
 { label: ' High', value: 'high' },
 { label: '🟡 Medium', value: 'medium' },
 { label: '🔵 Low', value: 'low' },
 { label: '⚪ Minimal', value: 'minimal' }
 ]}
 onChange={(value) => console.log('Priority selected:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Select dropdown with emoji icons in option labels.',
 },
 },
 },
};

export const NumericValues: Story = {
 render: () => (
 <QwickApp appId="select-numeric" appName='Select with Numeric Values'>
 <SelectInputField 
 label="Team Size" 
 placeholder="Select team size"
 helperText="Approximate number of team members"
 options={[
 { label: '1-5 people', value: 5 },
 { label: '6-10 people', value: 10 },
 { label: '11-25 people', value: 25 },
 { label: '26-50 people', value: 50 },
 { label: '100+ people', value: 999 }
 ]}
 onChange={(value) => console.log('Team size selected:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Select dropdown with numeric values and descriptive labels.',
 },
 },
 },
};

export const WithHelperText: Story = {
 render: () => (
 <QwickApp appId="select-helper" appName='Select with Helper Text'>
 <SelectInputField 
 label="Subscription Plan" 
 placeholder="Choose your plan"
 required={true}
 helperText="You can upgrade or downgrade at any time"
 options={[
 { label: 'Free Plan - $0/month', value: 'free' },
 { label: 'Starter Plan - $9/month', value: 'starter' },
 { label: 'Professional Plan - $29/month', value: 'professional' },
 { label: 'Enterprise Plan - $99/month', value: 'enterprise' }
 ]}
 onChange={(value) => console.log('Plan selected:', value)}
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Select dropdown with helper text and pricing information.',
 },
 },
 },
};

export const States: Story = {
 render: () => (
 <QwickApp appId="select-states" appName='Select Field States'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <SelectInputField 
 label="Normal State" 
 placeholder="Select an option"
 options={[
 { label: 'Option 1', value: 'option1' },
 { label: 'Option 2', value: 'option2' },
 { label: 'Option 3', value: 'option3' }
 ]}
 onChange={(value) => console.log('Normal selected:', value)}
 />
 
 <SelectInputField 
 label="Required Field" 
 placeholder="This field is required"
 required={true}
 options={[
 { label: 'Option A', value: 'a' },
 { label: 'Option B', value: 'b' }
 ]}
 onChange={(value) => console.log('Required selected:', value)}
 />
 
 <SelectInputField 
 label="Pre-selected Value" 
 value="active"
 options={[
 { label: '✅ Active', value: 'active' },
 { label: '❌ Inactive', value: 'inactive' }
 ]}
 onChange={(value) => console.log('Pre-selected changed:', value)}
 />
 
 <SelectInputField 
 label="Disabled Field" 
 value="locked"
 disabled={true}
 options={[
 { label: 'Locked Value', value: 'locked' },
 { label: 'Alternative', value: 'alt' }
 ]}
 />
 
 <SelectInputField 
 label="Error State" 
 placeholder="Select a department"
 error="Please select a valid department"
 options={[
 { label: 'Engineering', value: 'eng' },
 { label: 'Design', value: 'design' },
 { label: 'Marketing', value: 'marketing' }
 ]}
 onChange={(value) => console.log('Error field selected:', value)}
 />
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different select field states including normal, required, pre-selected, disabled, and error states.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="select-data-binding" appName='SelectInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Data-Driven Select</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 SelectInputField components can be completely driven by CMS data, loading options and configuration from your data source.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<SelectInputField dataSource="selectInputFields.basic-dropdown" />`}</Code>
 
 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.selectInputFields['basic-dropdown'], null, 2)}</Code>
 </Box>

 <SelectInputField dataSource="selectInputFields.basic-dropdown" />
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'SelectInputField with data binding - options and configuration resolved from CMS data through dataSource.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="select-data-advanced" appName='Advanced SelectInputField Data Binding' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Multiple Select Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different SelectInputField instances can load different option sets and configurations from separate data sources.
 </Typography>
 </Box>

 {/* User Management */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>User Management</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <SelectInputField dataSource="selectInputFields.user-role" />
 <SelectInputField dataSource="selectInputFields.status-select" />
 <SelectInputField dataSource="selectInputFields.language-preference" />
 </Box>
 </Box>

 {/* Business Settings */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Business Configuration</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <SelectInputField dataSource="selectInputFields.subscription-plan" />
 <SelectInputField dataSource="selectInputFields.numeric-options" />
 <SelectInputField dataSource="selectInputFields.basic-dropdown" />
 </Box>
 </Box>

 {/* Project Management */}
 <Box sx={{ mb: 4 }}>
 <Typography variant="h4" gutterBottom>Project Settings</Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <SelectInputField dataSource="selectInputFields.priority-level" />
 <SelectInputField dataSource="selectInputFields.product-category" />
 <SelectInputField dataSource="selectInputFields.error-select" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple select types showcasing different option sets and configurations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="select-fallback" appName='SelectInputField Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 SelectInputField components gracefully handle missing data sources with fallback options.
 </Typography>
 
 <Code title="Fallback Usage" language="tsx">{`<SelectInputField 
 dataSource="nonexistent.field" 
 label="Fallback Select"
 placeholder="Choose option"
 options={[
 { label: 'Fallback Option 1', value: 'fb1' },
 { label: 'Fallback Option 2', value: 'fb2' }
 ]}
/>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <SelectInputField 
 dataSource="nonexistent.field"
 label="Fallback Select"
 placeholder="Choose option"
 options={[
 { label: 'Fallback Option 1', value: 'fb1' },
 { label: 'Fallback Option 2', value: 'fb2' }
 ]}
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <SelectInputField dataSource="selectInputFields.basic-dropdown" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'SelectInputField with fallback options when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="select-real-world" appName='Real World SelectInputField Example' dataSource={{ dataProvider }}>
 <Box>
 
 {/* User Profile Setup */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>User Profile Setup</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Configure your account settings and preferences
 </Typography>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, maxWidth: 800 }}>
 <SelectInputField dataSource="selectInputFields.basic-dropdown" />
 <SelectInputField dataSource="selectInputFields.language-preference" />
 <SelectInputField dataSource="selectInputFields.user-role" />
 <SelectInputField dataSource="selectInputFields.subscription-plan" />
 </Box>
 </Box>
 
 {/* Project Management Dashboard */}
 <Box sx={{ mb: 6, p: 4, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>Project Configuration</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
 Set up your project parameters and team settings
 </Typography>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, maxWidth: 1000 }}>
 <SelectInputField dataSource="selectInputFields.priority-level" />
 <SelectInputField dataSource="selectInputFields.product-category" />
 <SelectInputField dataSource="selectInputFields.numeric-options" />
 </Box>
 </Box>
 
 {/* System Administration */}
 <Box sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
 <Typography variant="h3" gutterBottom>System Administration</Typography>
 <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
 Manage system-wide settings and user permissions
 </Typography>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
 <SelectInputField dataSource="selectInputFields.status-select" />
 <SelectInputField dataSource="selectInputFields.disabled-select" />
 <SelectInputField dataSource="selectInputFields.error-select" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example showing SelectInputField in various contexts: user profiles, project management, and system administration.',
 },
 },
 },
};

export const OptionsShowcase: Story = {
 render: () => (
 <QwickApp appId="select-showcase" appName='SelectInputField Options Showcase' dataSource={{ dataProvider }}>
 <Box>
 
 <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
 <Typography variant="h5" gutterBottom> Options Showcase</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 SelectInputField supports various option formats including icons, pricing, status indicators, and numeric values.
 </Typography>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 4 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Basic Text Options</Typography>
 <SelectInputField dataSource="selectInputFields.basic-dropdown" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Icon-Enhanced Options</Typography>
 <SelectInputField dataSource="selectInputFields.priority-level" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Pricing Options</Typography>
 <SelectInputField dataSource="selectInputFields.subscription-plan" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Status Indicators</Typography>
 <SelectInputField dataSource="selectInputFields.status-select" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Numeric Values</Typography>
 <SelectInputField dataSource="selectInputFields.numeric-options" />
 </Box>
 
 <Box>
 <Typography variant="h6" gutterBottom>Multi-language Options</Typography>
 <SelectInputField dataSource="selectInputFields.language-preference" />
 </Box>
 </Box>
 
 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comprehensive showcase of different SelectInputField option formats and styles.',
 },
 },
 },
};

// Serialization Demo
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <SelectInputField
      label="Serializable Select Field"
      options={[
        { value: 'option1', label: 'First Option' },
        { value: 'option2', label: 'Second Option' },
        { value: 'option3', label: 'Third Option' }
      ]}
      placeholder="Choose an option..."
      required={true}
      helpText="This select field demonstrates serialization"
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates SelectInputField serialization with options and configuration preserved.',
      },
    },
  },
};
