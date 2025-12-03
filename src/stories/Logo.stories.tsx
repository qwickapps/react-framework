/**
 * Logo Component Stories
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import type { Meta, StoryObj } from '@storybook/react';
import Logo from '../components/Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Logo component provides flexible brand identity display with dynamic theming, image support, and customization options.

**Key Features:**
- **Theme Integration**: Automatically adapts colors based on current theme and variant
- **Multiple Sizes**: Five size variants from tiny to extra-large with consistent scaling
- **Badge System**: Optional badges with customizable shapes, positions, and offsets
- **Image Support**: Optional images with flexible positioning (start, end, top, bottom)
- **Text Formatting**: Supports line breaks (\\n) and explicit spaces (\\s) for multi-line logos
- **Variant Support**: Multiple visual variants including high-contrast and monochrome options
- **Schema-based**: Uses LogoSchema for consistent data binding and validation
- **Animation Ready**: Built-in support for CSS animations and transitions
- **Responsive Design**: Scales appropriately across different screen sizes

**Perfect for:**
- Application headers and navigation bars
- Brand identity in sidebars and footers
- Loading screens and splash pages
- Social media profile displays
- Business card and contact layouts
- Multi-brand applications requiring flexible branding`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Logo name/text to display. Supports up to TWO parts with \\n for line breaks and \\s for explicit spaces.',
    },
    variant: {
      control: 'select',
      options: ['default', 'high-contrast', 'monochrome', 'on-primary'],
      description: 'Visual variant of the logo',
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large', 'extra-large'],
      description: 'Size variant of the logo (controls both text size and component height)',
    },
    badge: {
      control: 'select',
      options: ['none', 'top-left', 'top-center', 'top-right', 'start', 'center', 'end', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Badge position and visibility',
    },
    badgeShape: {
      control: 'select',
      options: ['circle', 'star', 'square', 'heart'],
      description: 'Shape of the badge',
    },
    badgeOffset: {
      control: 'object',
      description: 'Offset from the calculated badge position. Automatically scales with logo size. Use this with any semantic position for precise control.',
    },
    fontFamily: {
      control: 'text',
      description: 'Font family for the logo text',
    },
    fontWeight: {
      control: 'text',
      description: 'Font weight for the logo text',
    },
    firstPartClass: {
      control: 'text',
      description: 'CSS class name for the first part of the logo text',
    },
    secondPartClass: {
      control: 'text',
      description: 'CSS class name for the second part of the logo text',
    },
    image: {
      control: 'text',
      description: 'Optional image to display alongside the logo text (image path or React component)',
    },
    imagePosition: {
      control: 'select',
      options: ['none', 'top-left', 'top-center', 'top-right', 'start', 'center', 'end', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Position of the image relative to the logo text',
    },
    onClick: {
      description: 'Click handler for the logo',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    name: 'Qwick Apps',
    variant: 'default',
    size: 'medium',
    badge: 'top-right',
  },
};

// Size Comparisons
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Tiny Logo" size="tiny" />
        <p>Tiny (16px font, 32px height)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Small Logo" size="small" />
        <p>Small (20px font, 40px height)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Medium Logo" size="medium" />
        <p>Medium (28px font, 50px height)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Large Logo" size="large" />
        <p>Large (36px font, 64px height)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="X-Large Logo" size="extra-large" />
        <p>Extra Large (48px font, 84px height)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all five Material UI-style logo sizes. Text, badges, and overall component height scale proportionally.',
      },
    },
  },
};

// Color Variant Comparisons
export const ColorVariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="default" />
        <p>Default</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="high-contrast" />
        <p>High Contrast</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo variant="monochrome" />
        <p>Monochrome</p>
      </div>
      <div style={{ textAlign: 'center', background: 'var(--palette-primary-main, #3b82f6)', padding: '20px', borderRadius: '8px' }}>
        <Logo variant="on-primary" />
        <p style={{ color: 'white', margin: '10px 0 0 0' }}>On Primary</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different color variants for various use cases and backgrounds.',
      },
    },
  },
};

// Badge Shape Comparisons
export const BadgeShapeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Circle Badge" badgeShape="circle" />
        <p>Circle</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Star Badge" badgeShape="star" />
        <p>Star</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Square Badge" badgeShape="square" />
        <p>Square</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Heart Badge" badgeShape="heart" />
        <p>Heart</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="No Badge" badge="none" />
        <p>None</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different badge shapes and the option to hide the badge completely.',
      },
    },
  },
};

// Badge Positioning
export const BadgePositioning: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'center', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="TL" size="large" badge="top-left" />
        <p>Top Left</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="TC" size="large" badge="top-center" />
        <p>Top Center</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="TR" size="large" badge="top-right" />
        <p>Top Right</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="ST" size="large" badge="start" />
        <p>Start (Left)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="C" size="large" badge="center" />
        <p>Center</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="EN" size="large" badge="end" />
        <p>End (Right)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="BL" size="large" badge="bottom-left" />
        <p>Bottom Left</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="BC" size="large" badge="bottom-center" />
        <p>Bottom Center</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="BR" size="large" badge="bottom-right" />
        <p>Bottom Right</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all semantic positioning options for the badge. Notice how the badge positions adapt to the text size and position.',
      },
    },
  },
};

// Font and Styling Customization
export const FontStylingComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Default Font" size="large" />
        <p>Default (Segoe UI, Bold)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Light Weight" fontWeight="300" size="large" />
        <p>Light Weight</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Serif Font" fontFamily="Georgia, serif" fontWeight="normal" size="large" />
        <p>Serif Font</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Custom Colors" 
          firstPartClass="custom-first-part" 
          secondPartClass="custom-second-part" 
          size="large" 
        />
        <p>Custom CSS Classes</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different font and styling options including weight, family, and custom CSS classes.',
      },
    },
  },
};

// Advanced Badge Positioning
export const AdvancedBadgePositioning: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Qwick Apps" size="large" />
        <p>Default Position</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Qwick Apps" size="large" badge="center" badgeOffset={{ x: -29, y: -12 }} />
        <p>Center + (-29, -12)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced badge positioning using semantic positions combined with offset adjustments. Offsets automatically scale with logo size for consistent relative positioning.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    name: 'Qwick Apps',
    variant: 'default',
    size: 'large',
    badge: 'top-right',
    badgeShape: 'circle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example - use the controls below to customize the logo in real-time.',
      },
    },
  },
};

// Text Formatting Examples
export const TextFormatting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="QwickApps" size="medium" />
        <p>Single word (one color)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Qwick Apps" size="medium" />
        <p>Two words (two colors, no space)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Qwick\sApps" size="medium" />
        <p>Explicit space (\\s)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Qwick\nApps" size="medium" />
        <p>Line break (\\n)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="My\sCompany\nInc" size="medium" />
        <p>Combined formatting</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Part1\nPart2\nPart3" size="medium" />
        <p>Multiple \\n (only 2 parts max)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text formatting examples showing single words, two-color text, explicit spaces (\\s), line breaks (\\n), and combined formatting. Note: Multiple \\n sequences only create TWO parts maximum.',
      },
    },
  },
};

// Badge Position Scaling Demo
export const BadgePositionScaling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo size="tiny" badge="center" badgeOffset={{ x: -29, y: -11 }} />
        <p>Tiny + Center + Offset</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="small" badge="center" badgeOffset={{ x: -29, y: -11 }} />
        <p>Small + same + Offset</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="medium" badge="center" badgeOffset={{ x: -29, y: -11 }} />
        <p>Medium + Same Offset</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="large" badge="center" badgeOffset={{ x: -29, y: -11 }} />
        <p>Large + Same Offset</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how badge offsets automatically scale with logo size. The same semantic position + offset values maintain consistent relative positioning across different sizes.',
      },
    },
  },
};

// Image Support Examples
export const WithImageSupport: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Qwick Apps" size="medium" />
        <p>Text Only</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Qwick Apps" 
          size="medium" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%23007bff'/><text x='16' y='20' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>Q</text></svg>" 
          imagePosition="start" 
        />
        <p>With Image (Start)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Qwick Apps" 
          size="medium" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%2316a34a'/><text x='16' y='20' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>A</text></svg>" 
          imagePosition="end" 
        />
        <p>With Image (End)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Qwick Apps" 
          size="medium" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%23dc2626'/><text x='16' y='20' text-anchor='middle' fill='white' font-size='14' font-weight='bold'>T</text></svg>" 
          imagePosition="top-center" 
        />
        <p>With Image (Top)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of Logo component with image support showing different positioning options.',
      },
    },
  },
};

// Image Position Comparison
export const ImagePositionComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', alignItems: 'center', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Start" 
          size="large" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect x='4' y='4' width='24' height='24' fill='%23007bff' rx='4'/></svg>" 
          imagePosition="start" 
        />
        <p>Start Position</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="End" 
          size="large" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect x='4' y='4' width='24' height='24' fill='%2316a34a' rx='4'/></svg>" 
          imagePosition="end" 
        />
        <p>End Position</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Top" 
          size="large" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect x='4' y='4' width='24' height='24' fill='%23dc2626' rx='4'/></svg>" 
          imagePosition="top-center" 
        />
        <p>Top Center</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Bottom" 
          size="large" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><rect x='4' y='4' width='24' height='24' fill='%23f59e0b' rx='4'/></svg>" 
          imagePosition="bottom-center" 
        />
        <p>Bottom Center</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different image positioning options relative to the logo text.',
      },
    },
  },
};

// Image with Different Sizes
export const ImageScaling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Tiny Logo" 
          size="tiny" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%23007bff'/></svg>" 
          imagePosition="start" 
        />
        <p>Tiny Size</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Small Logo" 
          size="small" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%23007bff'/></svg>" 
          imagePosition="start" 
        />
        <p>Small Size</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Medium Logo" 
          size="medium" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%23007bff'/></svg>" 
          imagePosition="start" 
        />
        <p>Medium Size</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo 
          name="Large Logo" 
          size="large" 
          image="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='%23007bff'/></svg>" 
          imagePosition="start" 
        />
        <p>Large Size</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how images scale proportionally with logo text size.',
      },
    },
  },
};
