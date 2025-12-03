/**
 * FormBlock Component Stories - Form layout component with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Link, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Code, FormBlock, QwickApp, QwickAppsLogo, SelectInputField, TextInputField } from '../components';
import { makeSerializationStory } from './_templates/SerializationTemplate';


// Sample form block data for different use cases
const sampleCmsData = {
 'formBlocks': {
 'login-form': {
 title: 'Welcome Back',
 description: 'Sign in to your account to continue',
 maxWidth: 'sm',
 background: 'default',
 form: null, // Will be provided via children in stories
 footer: null // Will be provided via children in stories
 },
 'registration-form': {
 title: 'Create Your Account',
 description: 'Join thousands of developers building with QwickApps React Framework',
 maxWidth: 'md',
 background: 'gradient',
 form: null,
 footer: null
 },
 'contact-form': {
 title: 'Get In Touch',
 description: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
 maxWidth: 'md',
 background: 'default',
 form: null,
 footer: null
 },
 'survey-form': {
 title: 'Customer Feedback Survey',
 description: 'Help us improve by sharing your thoughts and experiences',
 maxWidth: 'lg',
 background: 'gradient',
 form: null,
 footer: null
 },
 'subscription-form': {
 title: 'Choose Your Plan',
 description: 'Select the perfect plan for your needs and get started today',
 maxWidth: 'md',
 background: 'image',
 backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
 form: null,
 footer: null
 },
 'newsletter-form': {
 title: 'Stay Updated',
 description: 'Subscribe to our newsletter for the latest updates and insights',
 maxWidth: 'sm',
 background: 'default',
 form: null,
 footer: null
 },
 'profile-form': {
 title: 'Edit Profile',
 description: 'Update your personal information and preferences',
 maxWidth: 'md',
 background: 'default',
 form: null,
 footer: null
 },
 'feedback-form': {
 title: 'Share Your Feedback',
 description: 'Your input helps us build better products and experiences',
 maxWidth: 'lg',
 background: 'gradient',
 form: null,
 status: 'info',
 message: 'Your feedback is important to us and will be reviewed by our team.'
 },
 'error-form': {
 title: 'Form Submission',
 description: 'There was an issue processing your request',
 maxWidth: 'sm',
 background: 'default',
 form: null,
 status: 'error',
 message: 'Please check your information and try again.'
 },
 'success-form': {
 title: 'Thank You!',
 description: 'Your submission has been received successfully',
 maxWidth: 'sm',
 background: 'default',
 form: null,
 status: 'success',
 message: 'We will get back to you within 24 hours.'
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Forms/FormBlock',
 component: FormBlock,
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `FormBlock is a comprehensive form layout component that provides consistent styling and structure for form interfaces with data binding support.

**Key Features:**
- **Flexible Layouts**: Support for different container widths (xs, sm, md, lg)
- **Background Variants**: Default, gradient, and image background options
- **Header Integration**: Built-in header with logo, title, and description
- **Status Messages**: Alert-style status messages (info, success, warning, error)
- **Footer Support**: Customizable footer content for links and additional text
- **Data Binding**: Full CMS integration through dataSource prop
- **Theme Integration**: Responsive design with theme-aware styling
- **Accessibility**: Complete ARIA support and proper form structure

**Perfect For:**
- User authentication forms (login, registration, password reset)
- Contact and inquiry forms
- Survey and feedback collection
- Profile and settings management
- Subscription and payment forms
- Any form requiring professional layout and presentation`,
 },
 },
 },
 tags: ['autodocs'],
} satisfies Meta<typeof FormBlock>;

export default meta;
type Story = StoryObj<typeof FormBlock>;

// Traditional Usage Examples
export const LoginForm: Story = {
 render: () => (
 <QwickApp appId="form-login" appName='Login Form'>
 <FormBlock
 title="Welcome Back"
 description="Sign in to your account to continue"
 maxWidth="sm"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField
 label="Email Address"
 type="email"
 placeholder="your.email@example.com"
 required={true}
 onChange={(_value) => console.log('Email:', _value)}
 />
 <TextInputField
 label="Password"
 type="password"
 placeholder="Enter your password"
 required={true}
 onChange={() => console.log('Password:', '***')}
 />
 <Button
 label="Sign In"
 variant="primary"
 fullWidth={true}
 onClick={() => console.log('Login submitted')}
 />
 </Box>
 }
 footer={
 <Typography variant="body2" color="text.secondary">
 Don't have an account? <Link href="#" color="primary">Sign up here</Link>
 </Typography>
 }
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Basic login form with email and password fields in a clean layout.',
 },
 },
 },
};

export const RegistrationForm: Story = {
 render: () => (
 <QwickApp appId="form-registration" appName='Registration Form'>
 <FormBlock
 title="Create Your Account"
 description="Join thousands of developers building with QwickApps React Framework"
 maxWidth="md"
 background="gradient"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <TextInputField
 label="First Name"
 placeholder="John"
 required={true}
 onChange={(value) => console.log('First Name:', value)}
 />
 <TextInputField
 label="Last Name"
 placeholder="Doe"
 required={true}
 onChange={(value) => console.log('Last Name:', value)}
 />
 </Box>
 <TextInputField
 label="Email Address"
 type="email"
 placeholder="john.doe@example.com"
 required={true}
 helperText="We'll never share your email address"
 onChange={(_value) => console.log('Email:', _value)}
 />
 <TextInputField
 label="Password"
 type="password"
 placeholder="Create a strong password"
 required={true}
 helperText="Minimum 8 characters with mixed case and numbers"
 onChange={() => console.log('Password:', '***')}
 />
 <SelectInputField
 label="Country"
 placeholder="Select your country"
 required={true}
 options={[
 { label: 'United States', value: 'us' },
 { label: 'Canada', value: 'ca' },
 { label: 'United Kingdom', value: 'uk' },
 { label: 'Germany', value: 'de' },
 { label: 'Australia', value: 'au' }
 ]}
 onChange={(value) => console.log('Country:', value)}
 />
 <Button
 label="Create Account"
 variant="primary"
 fullWidth={true}
 buttonSize="large"
 onClick={() => console.log('Registration submitted')}
 />
 </Box>
 }
 footer={
 <Typography variant="body2" color="text.secondary">
 Already have an account? <Link href="#" color="primary">Sign in here</Link>
 </Typography>
 }
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Registration form with gradient background and comprehensive user information fields.',
 },
 },
 },
};

export const ContactForm: Story = {
 render: () => (
 <QwickApp appId="form-contact" appName='Contact Form'>
 <FormBlock
 title="Get In Touch"
 description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
 maxWidth="md"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <TextInputField
 label="Full Name"
 placeholder="Your full name"
 required={true}
 onChange={(value) => console.log('Name:', value)}
 />
 <TextInputField
 label="Email Address"
 type="email"
 placeholder="your.email@example.com"
 required={true}
 onChange={(_value) => console.log('Email:', _value)}
 />
 </Box>
 <TextInputField
 label="Subject"
 placeholder="What is this regarding?"
 required={true}
 onChange={(value) => console.log('Subject:', value)}
 />
 <TextInputField
 label="Message"
 placeholder="Tell us more about your inquiry..."
 multiline={true}
 rows={5}
 required={true}
 onChange={(value) => console.log('Message:', value)}
 />
 <Button
 label="Send Message"
 variant="primary"
 fullWidth={true}
 onClick={() => console.log('Contact form submitted')}
 />
 </Box>
 }
 footer={
 <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
 Need immediate assistance? Call us at <Link href="tel:+1-555-0123" color="primary">+1-555-0123</Link>
 </Typography>
 }
 />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Contact form with comprehensive fields and professional layout.',
 },
 },
 },
};

export const WithStatusMessages: Story = {
 render: () => (
 <QwickApp appId="form-status" appName='QwickApps'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

 {/* Info Status */}
 <FormBlock
 title="Newsletter Signup"
 description="Stay updated with our latest news"
 maxWidth="sm"
 status="info"
 message="Your subscription helps us create better content for you."
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField
 label="Email Address"
 type="email"
 placeholder="your.email@example.com"
 required={true}
 onChange={(_value) => console.log('Email:', _value)}
 />
 <Button
 label="Subscribe"
 variant="primary"
 fullWidth={true}
 onClick={() => console.log('Newsletter signup')}
 />
 </Box>
 }
 />

 {/* Success Status */}
 <FormBlock
 title="Thank You!"
 description="Your submission has been received"
 maxWidth="sm"
 status="success"
 message="We will get back to you within 24 hours."
 form={
 <Button
 label="Go Back to Homepage"
 variant="outlined"
 fullWidth={true}
 onClick={() => console.log('Back to home')}
 />
 }
 />

 {/* Error Status */}
 <FormBlock
 title="Form Error"
 description="There was an issue processing your request"
 maxWidth="sm"
 status="error"
 message="Please check your information and try again."
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', gap: 2 }}>
 <Button
 label="Try Again"
 variant="primary"
 fullWidth={true}
 onClick={() => console.log('Retry')}
 />
 <Button
 label="Contact Support"
 variant="outlined"
 fullWidth={true}
 onClick={() => console.log('Contact support')}
 />
 </Box>
 }
 />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Form blocks with different status message types: info, success, and error.',
 },
 },
 },
};

export const BackgroundVariants: Story = {
 render: () => (
 <QwickApp appId="form-backgrounds" appName='Form Background Variants'>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

 {/* Default Background */}
 <FormBlock
 title="Default Background"
 description="Clean and simple form layout"
 maxWidth="sm"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField
 label="Name"
 placeholder="Your name"
 onChange={(value) => console.log('Name:', value)}
 />
 <Button label="Submit" variant="primary" fullWidth={true} />
 </Box>
 }
 />

 {/* Gradient Background */}
 <FormBlock
 title="Gradient Background"
 description="Eye-catching gradient styling"
 maxWidth="sm"
 background="gradient"
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField
 label="Name"
 placeholder="Your name"
 onChange={(value) => console.log('Name:', value)}
 />
 <Button label="Submit" variant="primary" fullWidth={true} />
 </Box>
 }
 />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FormBlock with different background variants: default and gradient.',
 },
 },
 },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
 render: () => (
 <QwickApp appId="form-data-binding" appName='FormBlock Data Binding' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> Data-Driven Form Layout</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FormBlock components can be driven by CMS data, loading layout configuration from your data source while providing custom form content.
 </Typography>

 <Code title="Usage" language="tsx">{`<FormBlock dataSource="formBlocks.login-form">
 <TextInputField label="Email" type="email" />
 <TextInputField label="Password" type="password" />
 <Button label="Sign In" variant="primary" />
</FormBlock>`}</Code>

 <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.formBlocks['login-form'], null, 2)}</Code>
 </Box>

 <FormBlock
 dataSource="formBlocks.login-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField
 label="Email Address"
 type="email"
 placeholder="your.email@example.com"
 required={true}
 onChange={(_value) => console.log('Email:', _value)}
 />
 <TextInputField
 label="Password"
 type="password"
 placeholder="Enter your password"
 required={true}
 onChange={() => console.log('Password:', '***')}
 />
 <Button
 label="Sign In"
 variant="primary"
 fullWidth={true}
 onClick={() => console.log('Login submitted')}
 />
 </Box>
 }
 footer={
 <Typography variant="body2" color="text.secondary">
 Don't have an account? <Link href="#" color="primary">Sign up here</Link>
 </Typography>
 }
 />

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FormBlock with data binding - layout configuration resolved from CMS data while form content is provided as children.',
 },
 },
 },
};

export const DataBindingAdvanced: Story = {
 render: () => (
 <QwickApp appId="form-data-advanced" appName='Advanced FormBlock Data Binding' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> Multiple Form Types</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 Different FormBlock instances can load different layout configurations from separate data sources.
 </Typography>
 </Box>

 {/* Authentication Forms */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Authentication Forms</Typography>

 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
 <FormBlock
 dataSource="formBlocks.login-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField
 label="Email"
 type="email"
 placeholder="your.email@example.com"
 required={true}
 />
 <TextInputField
 label="Password"
 type="password"
 placeholder="Enter password"
 required={true}
 />
 <Button label="Sign In" variant="primary" fullWidth={true} />
 </Box>
 }
 />

 <FormBlock
 dataSource="formBlocks.registration-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <TextInputField label="First Name" placeholder="John" required={true} />
 <TextInputField label="Last Name" placeholder="Doe" required={true} />
 </Box>
 <TextInputField label="Email" type="email" placeholder="john@example.com" required={true} />
 <TextInputField label="Password" type="password" placeholder="Create password" required={true} />
 <Button label="Create Account" variant="primary" fullWidth={true} buttonSize="large" />
 </Box>
 }
 />
 </Box>
 </Box>

 {/* Communication Forms */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Communication Forms</Typography>

 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
 <FormBlock
 dataSource="formBlocks.contact-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <TextInputField label="Name" placeholder="Your name" required={true} />
 <TextInputField label="Email" type="email" placeholder="your.email@example.com" required={true} />
 </Box>
 <TextInputField label="Subject" placeholder="What's this about?" required={true} />
 <TextInputField label="Message" multiline={true} rows={4} placeholder="Your message..." required={true} />
 <Button label="Send Message" variant="primary" fullWidth={true} />
 </Box>
 }
 />

 <FormBlock
 dataSource="formBlocks.newsletter-form"
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField label="Email" type="email" placeholder="your.email@example.com" required={true} />
 <Button label="Subscribe" variant="primary" fullWidth={true} />
 </Box>
 }
 />
 </Box>
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Advanced data binding with multiple form types showcasing different layouts and background configurations.',
 },
 },
 },
};

export const DataBindingWithFallback: Story = {
 render: () => (
 <QwickApp appId="form-fallback" appName='FormBlock Data Binding with Fallback' dataSource={{ dataProvider }}>
 <Box>

 <Box sx={{ p: 4, backgroundColor: 'background.paper', mb: 4 }}>
 <Typography variant="h5" gutterBottom> Fallback Support</Typography>
 <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
 FormBlock components gracefully handle missing data sources with fallback configurations.
 </Typography>

 <Code title="Fallback Usage" language="tsx">{`<FormBlock 
 dataSource="nonexistent.form" 
 title="Fallback Form"
 description="This uses fallback configuration"
 maxWidth="sm"
>
 <TextInputField label="Name" />
 <Button label="Submit" />
</FormBlock>`}</Code>
 </Box>

 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
 <Box>
 <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
 <FormBlock
 dataSource="nonexistent.form"
 title="Fallback Form"
 description="This uses fallback configuration"
 maxWidth="sm"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField label="Name" placeholder="Your name" />
 <Button label="Submit" variant="primary" fullWidth={true} />
 </Box>
 }
 />
 </Box>
 <Box>
 <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
 <FormBlock
 dataSource="formBlocks.login-form"
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField label="Email" type="email" placeholder="your.email@example.com" />
 <TextInputField label="Password" type="password" placeholder="Enter password" />
 <Button label="Sign In" variant="primary" fullWidth={true} />
 </Box>
 }
 />
 </Box>
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'FormBlock with fallback configuration when dataSource is missing or unavailable.',
 },
 },
 },
};

export const RealWorldExample: Story = {
 render: () => (
 <QwickApp appId="form-real-world" appName='Real World FormBlock Example' dataSource={{ dataProvider }}>
 <Box>

 {/* Status Messages Showcase */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>Form Status Messages</Typography>

 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
 <FormBlock
 dataSource="formBlocks.feedback-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 <TextInputField label="Feedback" multiline={true} rows={4} placeholder="Share your thoughts..." />
 <Button label="Submit Feedback" variant="primary" fullWidth={true} />
 </Box>
 }
 />

 <FormBlock
 dataSource="formBlocks.success-form"
 form={
 <Button label="Continue" variant="primary" fullWidth={true} />
 }
 />

 <FormBlock
 dataSource="formBlocks.error-form"
 form={
 <Box sx={{ display: 'flex', gap: 2 }}>
 <Button label="Try Again" variant="primary" fullWidth={true} />
 <Button label="Get Help" variant="outlined" fullWidth={true} />
 </Box>
 }
 />
 </Box>
 </Box>

 {/* Business Forms */}
 <Box sx={{ mb: 6 }}>
 <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>Business Applications</Typography>

 <FormBlock
 dataSource="formBlocks.subscription-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
 <SelectInputField
 label="Subscription Plan"
 placeholder="Choose your plan"
 required={true}
 options={[
 { label: 'Starter - $9/month', value: 'starter' },
 { label: 'Professional - $29/month', value: 'professional' },
 { label: 'Enterprise - $99/month', value: 'enterprise' }
 ]}
 />
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <TextInputField label="Full Name" placeholder="John Doe" required={true} />
 <TextInputField label="Email" type="email" placeholder="john@company.com" required={true} />
 </Box>
 <TextInputField label="Company Name" placeholder="Your Company Inc." />
 <Button label="Start Subscription" variant="primary" fullWidth={true} buttonSize="large" />
 </Box>
 }
 footer={
 <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
 Cancel anytime. No hidden fees. <Link href="#" color="primary">View pricing details</Link>
 </Typography>
 }
 />
 </Box>

 {/* User Profile Management */}
 <Box>
 <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>User Management</Typography>

 <FormBlock
 dataSource="formBlocks.profile-form"
 coverImage={<QwickAppsLogo size="medium" />}
 form={
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
 <TextInputField label="First Name" placeholder="John" value="John" />
 <TextInputField label="Last Name" placeholder="Doe" value="Doe" />
 </Box>
 <TextInputField label="Email Address" type="email" placeholder="john.doe@example.com" value="john.doe@example.com" />
 <TextInputField label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" />
 <SelectInputField
 label="Country"
 value="us"
 options={[
 { label: 'United States', value: 'us' },
 { label: 'Canada', value: 'ca' },
 { label: 'United Kingdom', value: 'uk' }
 ]}
 />
 <TextInputField
 label="Bio"
 multiline={true}
 rows={3}
 placeholder="Tell us about yourself..."
 value="Senior developer with expertise in React and TypeScript."
 />
 <Box sx={{ display: 'flex', gap: 2 }}>
 <Button label="Update Profile" variant="primary" fullWidth={true} />
 <Button label="Cancel" variant="outlined" fullWidth={true} />
 </Box>
 </Box>
 }
 />
 </Box>

 </Box>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world example showing FormBlock in various contexts: status messages, business subscriptions, and user management.',
 },
 },
 },
};

/**
 * SerializationDemo - FormBlock serialization using template
 */
export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <FormBlock
      title="User Registration"
      description="Create your account and personalize your experience"
      status="info"
      message="Please fill out all required fields to complete registration"
      maxWidth="md"
      background="gradient"
    >
      <TextInputField
        label="Full Name"
        value="John Doe"
        placeholder="Enter your full name"
        required={true}
      />
      
      <TextInputField
        label="Email Address"
        value="user@example.com"
        type="email"
        placeholder="your@email.com"
        required={true}
        helperText="We'll use this to send you important updates"
      />
      
      <SelectInputField
        label="Country"
        value="us"
        placeholder="Select your country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' }
        ]}
        required={true}
      />
      
      <Button label="Create Account" variant="primary" />
    </FormBlock>
  )),
  parameters: {
    docs: {
      description: {
        story: 'Shows FormBlock serialization with nested form components using the standardized makeSerializationStory template. Demonstrates react-children strategy for form container components.',
      },
    },
  },
};