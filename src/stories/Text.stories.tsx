/**
 * Text Component Stories - Comprehensive typography with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Typography, Alert } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components/blocks';
import { makeSerializationStory } from './_templates/SerializationTemplate';
import QwickApp from '../components/QwickApp';
import React from 'react';

// Sample text content for different use cases
const sampleContent = {
  headings: {
    hero: 'Transform Your Ideas Into Reality',
    section: 'Why Choose QwickApps?',
    subsection: 'Built for Modern Development'
  },
  body: {
    introduction: 'QwickApps provides a comprehensive React framework with advanced serialization capabilities, making it easy to build dynamic, data-driven applications.',
    description: 'Our components are designed with accessibility, performance, and developer experience in mind. Each component supports full serialization for "WebView for React" functionality.',
    conclusion: 'Get started today and see how QwickApps can accelerate your development workflow.'
  },
  ui: {
    buttonText: 'Get Started Now',
    linkText: 'Learn More',
    caption: 'Photo by John Doe on Unsplash'
  }
};

// Sample CMS data for data binding examples
const sampleCmsData = {
  content: {
    heroTitle: {
      content: sampleContent.headings.hero,
      variant: 'h1',
      color: 'primary',
      align: 'center',
      gutterBottom: true,
      fontWeight: 'bold'
    },
    sectionHeading: {
      content: sampleContent.headings.section,
      variant: 'h2',
      color: 'textPrimary',
      align: 'left',
      gutterBottom: true,
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    },
    bodyText: {
      content: sampleContent.body.introduction,
      variant: 'body1',
      color: 'textSecondary',
      align: 'left',
      paragraph: true,
      lineHeight: '1.6'
    },
    callToAction: {
      content: sampleContent.ui.buttonText,
      variant: 'button',
      color: 'primary',
      align: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    caption: {
      content: sampleContent.ui.caption,
      variant: 'caption',
      color: 'textSecondary',
      align: 'right',
      fontStyle: 'italic'
    },
    customStyled: {
      content: 'Custom Typography Styling',
      variant: 'h3',
      customColor: '#ff6b35',
      fontSize: '2.5rem',
      fontFamily: '"Roboto Condensed", sans-serif',
      textDecoration: 'underline',
      maxWidth: '600px'
    }
  }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Text is a comprehensive typography component with advanced styling options and full serialization support.

**Key Features:**
- **Typography Variants**: Complete Material-UI variant support (h1-h6, body1/2, subtitle, etc.)
- **Rich Styling**: Color variants, alignment, font properties, and text formatting
- **Custom Typography**: Override fontSize, fontFamily, lineHeight, letterSpacing
- **Text Formatting**: Support for bold, italic, underline, and text transformation
- **Semantic HTML**: Proper HTML element rendering for accessibility (h1-h6, p, span, etc.)
- **Responsive Design**: MaxWidth control and responsive text sizing
- **Data Binding**: Full CMS integration through dataSource prop
- **Performance**: Optimized rendering with lazy evaluation
- **Accessibility**: Proper semantic markup and ARIA support
- **Customization**: Extensive styling options and theme integration

**Perfect For:**
- Headings and titles across all levels
- Body text and paragraphs
- UI labels and captions
- Call-to-action text
- Rich typography layouts
- Content management systems
- Dynamic text rendering

**Serialization Support:**
The Text component extends ModelView and supports full JSON serialization/deserialization for "WebView for React" functionality, making it perfect for dynamic content management and data-driven applications.`
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The text content to display'
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'],
      description: 'Typography variant that determines font size, weight, and line height'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error', 'warning', 'info', 'success', 'inherit'],
      description: 'Color variant for the text'
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify', 'inherit'],
      description: 'Text alignment'
    },
    component: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'legend'],
      description: 'HTML element to render'
    },
    fontWeight: {
      control: 'select',
      options: ['inherit', 'lighter', 'normal', 'bold', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description: 'Font weight'
    },
    noWrap: {
      control: 'boolean',
      description: 'Prevent text wrapping'
    },
    paragraph: {
      control: 'boolean',
      description: 'Apply paragraph spacing'
    },
    gutterBottom: {
      control: 'boolean',
      description: 'Add bottom margin'
    }
  }
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    content: 'This is the default text component with body1 variant.',
    variant: 'body1'
  }
};

export const Heading1: Story = {
  args: {
    content: 'Main Page Heading',
    variant: 'h1',
    color: 'primary',
    gutterBottom: true
  }
};

export const Heading2: Story = {
  args: {
    content: 'Section Heading',
    variant: 'h2',
    color: 'textPrimary',
    gutterBottom: true
  }
};

export const BodyText: Story = {
  args: {
    content: 'This is body text that provides detailed information about a topic. It uses the body1 variant which is optimized for readability and comfortable reading.',
    variant: 'body1',
    paragraph: true
  }
};

export const Caption: Story = {
  args: {
    content: 'This is a caption with smaller text',
    variant: 'caption',
    color: 'textSecondary'
  }
};

// Typography variants showcase
export const TypographyVariants: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 2 } }}>
      <Text content="Heading 1 - Main titles" variant="h1" />
      <Text content="Heading 2 - Section titles" variant="h2" />
      <Text content="Heading 3 - Subsection titles" variant="h3" />
      <Text content="Heading 4 - Card titles" variant="h4" />
      <Text content="Heading 5 - Component titles" variant="h5" />
      <Text content="Heading 6 - Small headings" variant="h6" />
      <Text content="Subtitle 1 - Primary subtitles" variant="subtitle1" />
      <Text content="Subtitle 2 - Secondary subtitles" variant="subtitle2" />
      <Text content="Body 1 - Primary body text for comfortable reading" variant="body1" />
      <Text content="Body 2 - Secondary body text, slightly smaller" variant="body2" />
      <Text content="BUTTON TEXT" variant="button" />
      <Text content="Caption text for images and small labels" variant="caption" />
      <Text content="OVERLINE TEXT FOR CATEGORIES" variant="overline" />
    </Box>
  )
};

// Color variants
export const ColorVariants: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 1 } }}>
      <Text content="Primary color text" color="primary" />
      <Text content="Secondary color text" color="secondary" />
      <Text content="Primary text color" color="textPrimary" />
      <Text content="Secondary text color" color="textSecondary" />
      <Text content="Error color text" color="error" />
      <Text content="Warning color text" color="warning" />
      <Text content="Info color text" color="info" />
      <Text content="Success color text" color="success" />
      <Text content="Inherit color text" color="inherit" />
    </Box>
  )
};

// Text alignment
export const TextAlignment: Story = {
  render: () => (
    <Box sx={{ width: '400px', border: '1px solid #e0e0e0', p: 2, '& > *': { mb: 1 } }}>
      <Text content="Left aligned text (default)" align="left" />
      <Text content="Center aligned text" align="center" />
      <Text content="Right aligned text" align="right" />
      <Text content="Justified text that spans multiple lines to demonstrate how justify alignment works with longer content." align="justify" />
    </Box>
  )
};

// Font weights
export const FontWeights: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 1 } }}>
      <Text content="Light weight (300)" fontWeight="300" />
      <Text content="Normal weight (400)" fontWeight="normal" />
      <Text content="Medium weight (500)" fontWeight="500" />
      <Text content="Bold weight (700)" fontWeight="bold" />
      <Text content="Extra bold weight (800)" fontWeight="800" />
    </Box>
  )
};

// Text decorations and transforms
export const TextFormatting: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 2 } }}>
      <Typography variant="h6">Text Decorations:</Typography>
      <Text content="Normal text" />
      <Text content="Underlined text" textDecoration="underline" />
      <Text content="Overlined text" textDecoration="overline" />
      <Text content="Line-through text" textDecoration="line-through" />
      
      <Typography variant="h6" sx={{ mt: 3 }}>Text Transforms:</Typography>
      <Text content="normal text case" textTransform="none" />
      <Text content="capitalized text" textTransform="capitalize" />
      <Text content="uppercase text" textTransform="uppercase" />
      <Text content="LOWERCASE TEXT" textTransform="lowercase" />
    </Box>
  )
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 3 } }}>
      <Text
        content="Custom Font Size"
        variant="h4"
        fontSize="3rem"
        color="primary"
      />
      <Text
        content="Custom Color and Font Family"
        variant="h5"
        customColor="#ff6b35"
        fontFamily='"Roboto Condensed", sans-serif'
      />
      <Text
        content="Custom Line Height and Letter Spacing"
        variant="body1"
        lineHeight="2"
        letterSpacing="0.2em"
        maxWidth="400px"
      />
    </Box>
  )
};

// Semantic HTML elements
export const SemanticElements: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 1 } }}>
      <Text content="Paragraph element" component="p" variant="body1" />
      <Text content="Span element" component="span" variant="body2" />
      <Text content="Div element" component="div" variant="subtitle1" />
      <Text content="H1 semantic element" component="h1" variant="h4" />
      <Text content="H2 semantic element" component="h2" variant="h5" />
      <Text content="Label element" component="label" variant="body1" />
    </Box>
  )
};

// Responsive text
export const ResponsiveText: Story = {
  render: () => (
    <Box sx={{ '& > *': { mb: 2 } }}>
      <Text
        content="Responsive heading that adapts to screen size"
        variant="h2"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
        }}
      />
      <Text
        content="This text has a maximum width and will wrap appropriately"
        variant="body1"
        maxWidth="300px"
        paragraph
      />
    </Box>
  )
};

// Data binding example
export const DataBinding: Story = {
  render: () => (
    <QwickApp dataProvider={dataProvider}>
      <Box sx={{ '& > *': { mb: 3 } }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            These Text components are populated from CMS data using the dataSource prop.
            Content, styling, and formatting are all managed through the data provider.
          </Typography>
        </Alert>

        <Text
          dataSource="content.heroTitle"
          dataBinding={{
            content: 'content',
            variant: 'variant',
            color: 'color',
            align: 'align',
            gutterBottom: 'gutterBottom',
            fontWeight: 'fontWeight'
          }}
        />

        <Text
          dataSource="content.sectionHeading"
          dataBinding={{
            content: 'content',
            variant: 'variant',
            color: 'color',
            textTransform: 'textTransform',
            letterSpacing: 'letterSpacing'
          }}
        />

        <Text
          dataSource="content.bodyText"
          dataBinding={{
            content: 'content',
            variant: 'variant',
            color: 'color',
            paragraph: 'paragraph',
            lineHeight: 'lineHeight'
          }}
        />

        <Text
          dataSource="content.callToAction"
          dataBinding={{
            content: 'content',
            variant: 'variant',
            color: 'color',
            fontWeight: 'fontWeight',
            textTransform: 'textTransform'
          }}
        />
      </Box>
    </QwickApp>
  )
};


// Serialization example - using the standardized template
export const SerializationExample: Story = {
  render: makeSerializationStory(() => (
    <Text 
      content="Serializable Typography Component"
      variant="h3"
      color="primary"
      align="center"
      fontWeight="bold"
      gutterBottom={true}
      customColor="#1976d2"
      fontSize="2rem"
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Text component serialization and deserialization using ComponentTransformer.',
      },
    },
  },
};

// Advanced layout example
export const AdvancedLayout: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Text
          content="Advanced Typography Layout"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
          <Text
            content="Feature One"
            variant="h4"
            color="primary"
            gutterBottom
          />
          <Text
            content="This is a detailed description of the first feature, showcasing how typography can be used effectively in card layouts."
            variant="body1"
            paragraph
          />
          <Text
            content="Learn More"
            variant="button"
            color="primary"
            fontWeight="bold"
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
          <Text
            content="Feature Two"
            variant="h4"
            color="secondary"
            gutterBottom
          />
          <Text
            content="Another feature description with different styling to show the flexibility of the Text component in various contexts."
            variant="body1"
            paragraph
          />
          <Text
            content="Get Started"
            variant="button"
            color="secondary"
            fontWeight="bold"
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
          <Text
            content="Feature Three"
            variant="h4"
            color="success"
            gutterBottom
          />
          <Text
            content="The final feature showcase, demonstrating consistent typography patterns across multiple content areas."
            variant="body1"
            paragraph
          />
          <Text
            content="Try Now"
            variant="button"
            color="success"
            fontWeight="bold"
          />
        </Paper>
      </Grid>
    </Grid>
  )
};