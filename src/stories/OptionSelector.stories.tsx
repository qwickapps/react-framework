/**
 * Storybook Stories for OptionSelector Component
 *
 * Demonstrates universal option selection with three display modes:
 * - Text: Buttons with labels (sizes, quantities)
 * - Color: Circular color swatches with hex backgrounds
 * - Image: Rounded rectangle image swatches (patterns, textures)
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/material';
import OptionSelector from '../components/blocks/OptionSelector';
import { SelectOption } from '../components/blocks/OptionSelector';

const meta = {
  title: 'Blocks/OptionSelector',
  component: OptionSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Universal option selector supporting text, color swatches, and image patterns. Used for product variants, color selection, and pattern choices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    displayMode: {
      control: 'select',
      options: ['text', 'color', 'image'],
      description: 'Visual display mode for options',
    },
    variant: {
      control: 'select',
      options: ['buttons', 'dropdown', 'grid'],
      description: 'Display variant',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'wrap'],
      description: 'Layout direction for buttons/grid',
    },
    visualSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size for color/image modes',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show label below visual swatches',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all selections',
    },
  },
} satisfies Meta<typeof OptionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Size options for text mode
const sizeOptions: SelectOption[] = [
  { id: 'xs', label: 'XS', available: true },
  { id: 's', label: 'S', available: true },
  { id: 'm', label: 'M', available: true },
  { id: 'l', label: 'L', available: true },
  { id: 'xl', label: 'XL', available: true },
  { id: 'xxl', label: 'XXL', available: false },
];

// Color options for color mode
const colorOptions: SelectOption[] = [
  { id: 'red', label: 'Red', hexValue: '#FF0000', available: true },
  { id: 'blue', label: 'Blue', hexValue: '#0000FF', available: true },
  { id: 'green', label: 'Green', hexValue: '#00FF00', available: true },
  { id: 'yellow', label: 'Yellow', hexValue: '#FFFF00', available: false },
  { id: 'purple', label: 'Purple', hexValue: '#9C27B0', available: true },
  { id: 'orange', label: 'Orange', hexValue: '#FF9800', available: true },
  { id: 'pink', label: 'Pink', hexValue: '#E91E63', available: true },
  { id: 'teal', label: 'Teal', hexValue: '#009688', available: false },
];

// Pattern options for image mode (using placeholder images)
const patternOptions: SelectOption[] = [
  {
    id: 'stripes',
    label: 'Stripes',
    imageUrl: 'https://via.placeholder.com/100/4A90E2/FFFFFF?text=Stripes',
    available: true
  },
  {
    id: 'dots',
    label: 'Polka Dots',
    imageUrl: 'https://via.placeholder.com/100/E24A90/FFFFFF?text=Dots',
    available: true
  },
  {
    id: 'plaid',
    label: 'Plaid',
    imageUrl: 'https://via.placeholder.com/100/90E24A/FFFFFF?text=Plaid',
    available: false
  },
  {
    id: 'floral',
    label: 'Floral',
    imageUrl: 'https://via.placeholder.com/100/E2904A/FFFFFF?text=Floral',
    available: true
  },
];

// ==================== TEXT MODE STORIES ====================

export const TextModeGrid: Story = {
  args: {
    options: sizeOptions,
    selectedOption: 'm',
    displayMode: 'text',
    variant: 'grid',
    label: 'Select Size',
    onOptionSelect: (optionId) => console.log('Selected:', optionId),
  },
};

export const TextModeHorizontal: Story = {
  args: {
    options: sizeOptions,
    selectedOption: 's',
    displayMode: 'text',
    variant: 'buttons',
    layout: 'horizontal',
    label: 'Select Size',
  },
};

export const TextModeDropdown: Story = {
  args: {
    options: sizeOptions,
    selectedOption: 'l',
    displayMode: 'text',
    variant: 'dropdown',
    label: 'Select Size',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300 }}>
        <Story />
      </Box>
    ),
  ],
};

// ==================== COLOR MODE STORIES ====================

export const ColorModeGrid: Story = {
  args: {
    options: colorOptions,
    selectedOption: 'blue',
    displayMode: 'color',
    variant: 'grid',
    visualSize: 'medium',
    showLabel: false,
    label: 'Select Color',
  },
};

export const ColorModeWithLabels: Story = {
  args: {
    options: colorOptions,
    selectedOption: 'red',
    displayMode: 'color',
    variant: 'grid',
    visualSize: 'medium',
    showLabel: true,
    label: 'Select Color',
  },
};

export const ColorModeSmall: Story = {
  args: {
    options: colorOptions,
    selectedOption: 'purple',
    displayMode: 'color',
    variant: 'grid',
    visualSize: 'small',
    showLabel: false,
    label: 'Select Color',
  },
};

export const ColorModeLarge: Story = {
  args: {
    options: colorOptions,
    selectedOption: 'orange',
    displayMode: 'color',
    variant: 'grid',
    visualSize: 'large',
    showLabel: true,
    label: 'Select Color',
  },
};

export const ColorModeHorizontal: Story = {
  args: {
    options: colorOptions.slice(0, 4),
    selectedOption: 'green',
    displayMode: 'color',
    variant: 'buttons',
    layout: 'horizontal',
    visualSize: 'medium',
    showLabel: true,
    label: 'Select Color',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
};

// ==================== IMAGE MODE STORIES ====================

export const ImageModeGrid: Story = {
  args: {
    options: patternOptions,
    selectedOption: 'stripes',
    displayMode: 'image',
    variant: 'grid',
    visualSize: 'medium',
    showLabel: false,
    label: 'Select Pattern',
  },
};

export const ImageModeWithLabels: Story = {
  args: {
    options: patternOptions,
    selectedOption: 'floral',
    displayMode: 'image',
    variant: 'grid',
    visualSize: 'large',
    showLabel: true,
    label: 'Select Pattern',
  },
};

export const ImageModeSmall: Story = {
  args: {
    options: patternOptions,
    selectedOption: 'dots',
    displayMode: 'image',
    variant: 'grid',
    visualSize: 'small',
    showLabel: false,
    label: 'Select Pattern',
  },
};

// ==================== SPECIAL USE CASES ====================

export const WithPriceAdjustments: Story = {
  args: {
    options: [
      { id: 's', label: 'S', available: true, price: 0 },
      { id: 'm', label: 'M', available: true, price: 0 },
      { id: 'l', label: 'L', available: true, price: 500 },
      { id: 'xl', label: 'XL', available: true, price: 1000 },
      { id: 'xxl', label: 'XXL', available: false, price: 1500 },
    ],
    selectedOption: 'l',
    displayMode: 'text',
    variant: 'dropdown',
    label: 'Select Size',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300 }}>
        <Story />
      </Box>
    ),
  ],
};

export const AllDisabled: Story = {
  args: {
    options: sizeOptions,
    selectedOption: 'm',
    displayMode: 'text',
    variant: 'grid',
    label: 'Select Size',
    disabled: true,
  },
};

export const SomeUnavailable: Story = {
  args: {
    options: colorOptions,
    selectedOption: 'blue',
    displayMode: 'color',
    variant: 'grid',
    visualSize: 'medium',
    showLabel: true,
    label: 'Select Color (some unavailable)',
  },
};

// ==================== REAL-WORLD EXAMPLES ====================

export const EcommerceProductSizes: Story = {
  name: 'E-commerce: Product Sizes',
  render: () => {
    const [selectedSize, setSelectedSize] = React.useState('m');

    return (
      <Box sx={{ maxWidth: 400, p: 3, bgcolor: 'var(--theme-background)', borderRadius: 2 }}>
        <OptionSelector
          options={sizeOptions}
          selectedOption={selectedSize}
          onOptionSelect={setSelectedSize}
          displayMode="text"
          variant="grid"
          label="Size"
        />
      </Box>
    );
  },
};

export const EcommerceProductColors: Story = {
  name: 'E-commerce: Product Colors',
  render: () => {
    const [selectedColor, setSelectedColor] = React.useState('red');

    return (
      <Box sx={{ maxWidth: 400, p: 3, bgcolor: 'var(--theme-background)', borderRadius: 2 }}>
        <OptionSelector
          options={colorOptions}
          selectedOption={selectedColor}
          onOptionSelect={setSelectedColor}
          displayMode="color"
          variant="grid"
          visualSize="large"
          showLabel={true}
          label="Color"
        />
      </Box>
    );
  },
};

export const EcommerceProductPatterns: Story = {
  name: 'E-commerce: Product Patterns',
  render: () => {
    const [selectedPattern, setSelectedPattern] = React.useState('stripes');

    return (
      <Box sx={{ maxWidth: 400, p: 3, bgcolor: 'var(--theme-background)', borderRadius: 2 }}>
        <OptionSelector
          options={patternOptions}
          selectedOption={selectedPattern}
          onOptionSelect={setSelectedPattern}
          displayMode="image"
          variant="grid"
          visualSize="large"
          showLabel={true}
          label="Pattern"
        />
      </Box>
    );
  },
};

export const CompleteProductVariantSelector: Story = {
  name: 'Complete: Product Variant Selector',
  render: () => {
    const [selectedSize, setSelectedSize] = React.useState('m');
    const [selectedColor, setSelectedColor] = React.useState('blue');
    const [selectedPattern, setSelectedPattern] = React.useState('stripes');

    return (
      <Box sx={{ maxWidth: 600, p: 3, bgcolor: 'var(--theme-background)', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Size Selection */}
          <OptionSelector
            options={sizeOptions}
            selectedOption={selectedSize}
            onOptionSelect={setSelectedSize}
            displayMode="text"
            variant="grid"
            label="Size"
          />

          {/* Color Selection */}
          <OptionSelector
            options={colorOptions}
            selectedOption={selectedColor}
            onOptionSelect={setSelectedColor}
            displayMode="color"
            variant="grid"
            visualSize="medium"
            showLabel={true}
            label="Color"
          />

          {/* Pattern Selection */}
          <OptionSelector
            options={patternOptions}
            selectedOption={selectedPattern}
            onOptionSelect={setSelectedPattern}
            displayMode="image"
            variant="grid"
            visualSize="medium"
            showLabel={true}
            label="Pattern"
          />

          {/* Summary */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'var(--theme-surface)',
              borderRadius: 1,
              border: '1px solid var(--theme-border-main)'
            }}
          >
            <strong>Selected:</strong> Size {selectedSize.toUpperCase()}, {selectedColor} color, {selectedPattern} pattern
          </Box>
        </Box>
      </Box>
    );
  },
};

// ==================== THEME COMPLIANCE ====================

export const ThemeCompliance: Story = {
  name: 'Theme Compliance Test',
  render: () => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    return (
      <Box>
        <Box sx={{ mb: 3 }}>
          <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </Box>

        <Box
          sx={{
            p: 3,
            bgcolor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            '--theme-primary': mode === 'dark' ? '#90caf9' : '#1976d2',
            '--theme-surface': mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            '--theme-background': mode === 'dark' ? '#121212' : '#fafafa',
            '--theme-text-primary': mode === 'dark' ? '#ffffff' : '#000000',
            '--theme-text-secondary': mode === 'dark' ? '#b0b0b0' : '#666666',
            '--theme-border-main': mode === 'dark' ? '#404040' : '#e0e0e0',
            '--theme-border-emphasis': mode === 'dark' ? '#606060' : '#bdbdbd',
            '--theme-elevation-1': mode === 'dark'
              ? '0 2px 4px rgba(0,0,0,0.5)'
              : '0 2px 4px rgba(0,0,0,0.1)',
            '--theme-border-radius': '8px',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <OptionSelector
              options={sizeOptions}
              selectedOption="m"
              displayMode="text"
              variant="grid"
              label="Text Mode (Sizes)"
            />

            <OptionSelector
              options={colorOptions}
              selectedOption="blue"
              displayMode="color"
              variant="grid"
              visualSize="medium"
              showLabel={true}
              label="Color Mode (Swatches)"
            />

            <OptionSelector
              options={patternOptions}
              selectedOption="stripes"
              displayMode="image"
              variant="grid"
              visualSize="medium"
              showLabel={true}
              label="Image Mode (Patterns)"
            />
          </Box>
        </Box>
      </Box>
    );
  },
};
