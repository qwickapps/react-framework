/**
 * Form Components Stories - Comprehensive showcase of all form components
 * 
 * Demonstrates all form components with serialization examples:
 * - TextInputField: Text input with validation and different types
 * - SelectInputField: Dropdown selection with complex options
 * - HtmlInputField: Rich HTML editor with formatting controls
 * - ChoiceInputField: Dynamic option management
 * - SwitchInputField: Boolean toggle controls
 * - FormBlock: Complete form layout container
 * 
 * Includes serialization examples to demonstrate "WebView for React" functionality.
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Button, Alert } from '@mui/material';
import { ComponentTransformer } from '../schemas/transformers/ComponentTransformer';
import { Code } from '../components/blocks';

// Import form components
import { TextInputField } from '../components/input/TextInputField';
import { SelectInputField } from '../components/input/SelectInputField';
import { HtmlInputField } from '../components/input/HtmlInputField';
import { ChoiceInputField } from '../components/input/ChoiceInputField';
import { SwitchInputField } from '../components/input/SwitchInputField';
import { FormBlock } from '../components/forms/FormBlock';

// Ensure components are registered for serialization
import '../schemas/transformers/registry';

const meta: Meta = {
  title: 'Form Components/Complete Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Comprehensive showcase of all form components with serialization capabilities.
Each component extends ModelView and supports JSON serialization/deserialization.

**Features:**
- Full form component library
- JSON serialization for "WebView for React"
- Data binding support
- Validation and error handling
- Performance optimized
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Helper component for serialization demonstration
const SerializationDemo: React.FC<{ 
  title: string; 
  component: React.ReactElement; 
}> = ({ title, component }) => {
  const [serializedData, setSerializedData] = useState<string>('');
  const [deserializedComponent, setDeserializedComponent] = useState<React.ReactElement | null>(null);
  const [error, setError] = useState<string>('');

  const handleSerialize = () => {
    try {
      const serialized = ComponentTransformer.serialize(component);
      setSerializedData(serialized);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Serialization failed');
    }
  };

  const handleDeserialize = () => {
    try {
      if (serializedData) {
        const deserialized = ComponentTransformer.deserialize(serializedData) as React.ReactElement;
        setDeserializedComponent(deserialized);
        setError('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deserialization failed');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      {/* Original Component */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Original Component:
        </Typography>
        {component}
      </Box>

      {/* Serialization Controls */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={handleSerialize}
        >
          Serialize to JSON
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={handleDeserialize}
          disabled={!serializedData}
        >
          Deserialize from JSON
        </Button>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Serialized JSON */}
      {serializedData && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Serialized JSON:
          </Typography>
          <Code 
            language="json"
            content={JSON.stringify(JSON.parse(serializedData), null, 2)}
            showCopy={true}
            showLineNumbers={false}
            sx={{ maxHeight: 200, overflow: 'auto' }}
          />
        </Box>
      )}

      {/* Deserialized Component */}
      {deserializedComponent && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Deserialized Component:
          </Typography>
          <Box sx={{ p: 2, border: '2px dashed', borderColor: 'success.main', borderRadius: 1 }}>
            {deserializedComponent}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export const TextInputFieldShowcase: Story = {
  name: 'TextInputField - Text Input Component',
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        TextInputField Serialization Examples
      </Typography>
      
      <SerializationDemo
        title="Basic Text Input"
        component={
          <TextInputField
            label="Full Name"
            value="John Doe"
            placeholder="Enter your full name"
            required={true}
          />
        }
      />

      <SerializationDemo
        title="Email Input with Validation"
        component={
          <TextInputField
            label="Email Address"
            value="user@example.com"
            type="email"
            required={true}
            helperText="We'll never share your email with anyone else."
          />
        }
      />

      <SerializationDemo
        title="Multiline Textarea"
        component={
          <TextInputField
            label="Description"
            value="This is a multi-line description field that can contain longer text content."
            multiline={true}
            rows={4}
            placeholder="Enter a detailed description..."
          />
        }
      />

      <SerializationDemo
        title="Password Input with Error State"
        component={
          <TextInputField
            label="Password"
            value=""
            type="password"
            required={true}
            error="Password must be at least 8 characters long"
            placeholder="Enter a secure password"
          />
        }
      />
    </Box>
  )
};

export const SelectInputFieldShowcase: Story = {
  name: 'SelectInputField - Dropdown Selection',
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        SelectInputField Serialization Examples
      </Typography>
      
      <SerializationDemo
        title="Basic Country Selection"
        component={
          <SelectInputField
            label="Country"
            value="us"
            placeholder="Select your country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'de', label: 'Germany' },
              { value: 'fr', label: 'France' }
            ]}
            required={true}
          />
        }
      />

      <SerializationDemo
        title="Priority Level with Disabled Options"
        component={
          <SelectInputField
            label="Priority Level"
            value="high"
            options={[
              { value: 'low', label: 'Low Priority', disabled: false },
              { value: 'medium', label: 'Medium Priority', disabled: false },
              { value: 'high', label: 'High Priority', disabled: false },
              { value: 'critical', label: 'Critical Priority', disabled: true }
            ]}
            helperText="Critical priority requires special permissions"
          />
        }
      />

      <SerializationDemo
        title="Numeric Values - Age Range"
        component={
          <SelectInputField
            label="Age Range"
            value={25}
            options={[
              { value: 18, label: '18-24 years' },
              { value: 25, label: '25-34 years' },
              { value: 35, label: '35-44 years' },
              { value: 45, label: '45+ years' }
            ]}
          />
        }
      />
    </Box>
  )
};

// Complete Form Component
const CompleteFormComponent = () => {
    const [formData] = useState({
      name: '',
      email: '',
      country: '',
      description: '',
      interests: ['Travel', 'Technology'],
      notifications: true,
      newsletter: false
    });

    const completeForm = (
      <FormBlock
        title="User Registration"
        description="Create your account and personalize your experience"
        status="info"
        message="Please fill out all required fields to complete registration"
        maxWidth="md"
        background="gradient"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
          <TextInputField
            label="Full Name"
            value={formData.name}
            placeholder="Enter your full name"
            required={true}
          />

          <TextInputField
            label="Email Address"
            value={formData.email}
            type="email"
            placeholder="your@email.com"
            required={true}
            helperText="We'll use this to send you important updates"
          />

          <SelectInputField
            label="Country"
            value={formData.country}
            placeholder="Select your country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'ca', label: 'Canada' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'de', label: 'Germany' },
              { value: 'fr', label: 'France' }
            ]}
            required={true}
          />

          <HtmlInputField
            label="About Yourself"
            value={formData.description}
            placeholder="Tell us about yourself (HTML formatting supported)"
            rows={4}
            multiline={true}
          />

          <ChoiceInputField
            label="Interests"
            options={formData.interests}
            optionLabelPrefix="Interest"
            placeholder="Add your interests..."
            addButtonText="Add Interest"
          />

          <SwitchInputField
            label="Email Notifications"
            checked={formData.notifications}
            helperText="Receive important updates via email"
            color="primary"
          />

          <SwitchInputField
            label="Newsletter Subscription"
            checked={formData.newsletter}
            helperText="Get weekly newsletters with tips and updates"
            color="secondary"
          />
        </Box>
      </FormBlock>
    );

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Complete Form Example - All Components Working Together
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          This example demonstrates all form components working together in a complete registration form.
          The entire form structure can be serialized and reconstructed using the ComponentTransformer.
        </Typography>
        
        <SerializationDemo
          title="Complete User Registration Form"
          component={completeForm}
        />
      </Box>
    );
};
CompleteFormComponent.displayName = 'CompleteFormComponent';

export const CompleteFormExample: Story = {
  name: 'Complete Form - All Components Together',
  render: () => <CompleteFormComponent />
};