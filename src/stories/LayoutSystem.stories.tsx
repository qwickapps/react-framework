/**
 * Layout System - Complete guide to QwickApps layout components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { GridLayout } from '../components/layout/GridLayout';
import { 
  HeroBlock, 
  Content, 
  Section 
} from '../components/blocks';
import { QwickApp } from '../components/QwickApp';

const meta: Meta = {
  title: 'Layout/Layout System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Complete layout system for building responsive, professional interfaces with minimal code.

**Key Features:**
- **GridLayout**: Flexible CSS Grid-based layout with automatic responsive behavior
- **GridCell**: Simple wrapper for custom content with base props support
- **LayoutBlocks**: Pre-built content blocks (Hero, Content, Feature Grid, Section)
- **Base Props**: Standardized props for all layout components (spacing, dimensions, grid behavior)
- **Responsive Design**: Automatic mobile-first responsive behavior
- **T-shirt Sizing**: Intuitive sizing system (tiny, small, medium, large, huge)

**Perfect For:**
- Landing pages and marketing websites
- Dashboard and admin panel layouts
- Content-heavy applications and blogs
- E-commerce product showcases
- Documentation and help systems
- Any application requiring structured, responsive layouts`,
      },
    },
  },
};

export default meta;

export const LayoutSystemOverview: StoryObj = {
  render: () => (
    <QwickApp appName="Layout System Demo">
      <Section sectionBackground="background.default" padding="comfortable">
        <Typography variant="h3" gutterBottom>
          QwickApps Layout System
        </Typography>
        
        <Typography variant="h5" color="text.secondary" paragraph>
          Build responsive layouts with our comprehensive layout component system
        </Typography>

        <GridLayout columns={2} spacing="large" margin="large">
          <Content
            title="GridLayout"
            variant="elevated"
            blockSpacing="comfortable"
          >
            <Typography paragraph>
              CSS Grid-based layout component that automatically wraps child components 
              with grid props in Material-UI Grid items.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Responsive" size="small" />
              <Chip label="Auto-wrapping" size="small" />
              <Chip label="Flexible columns" size="small" />
            </Box>
          </Content>

          <Content
            title="LayoutBlocks"
            variant="elevated"
            blockSpacing="comfortable"
          >
            <Typography paragraph>
              Pre-built content blocks including Hero sections, Content blocks, 
              Feature grids, and Section containers for rapid development.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Pre-styled" size="small" />
              <Chip label="Theme-aware" size="small" />
              <Chip label="Content-ready" size="small" />
            </Box>
          </Content>

          <Content
            title="Base Props System"
            variant="elevated"
            blockSpacing="comfortable"
            span={12}
          >
            <Typography paragraph>
              All layout components support standardized base props for consistent 
              styling, spacing, and grid behavior across your application.
            </Typography>
            <GridLayout columns={4} spacing="small">
              <Paper sx={{ p: 1, textAlign: 'center', background: '#e3f2fd' }}>
                <Typography variant="caption" display="block">Grid Props</Typography>
                <Typography variant="body2">span, xs, sm, md, lg, xl</Typography>
              </Paper>
              <Paper sx={{ p: 1, textAlign: 'center', background: '#e8f5e8' }}>
                <Typography variant="caption" display="block">Dimensions</Typography>
                <Typography variant="body2">width, height, min/max</Typography>
              </Paper>
              <Paper sx={{ p: 1, textAlign: 'center', background: '#fff3e0' }}>
                <Typography variant="caption" display="block">Spacing</Typography>
                <Typography variant="body2">padding, margin</Typography>
              </Paper>
              <Paper sx={{ p: 1, textAlign: 'center', background: '#fce4ec' }}>
                <Typography variant="caption" display="block">Styling</Typography>
                <Typography variant="body2">background, className, sx</Typography>
              </Paper>
            </GridLayout>
          </Content>
        </GridLayout>
      </Section>

      <Section sectionBackground="grey.50" padding="comfortable">
        <Typography variant="h4" gutterBottom>
          T-shirt Sizing System
        </Typography>
        
        <Typography variant="body1" paragraph>
          All components support intuitive t-shirt sizing for dimensions and spacing:
        </Typography>

        <GridLayout columns={5} spacing="medium">
          <Paper sx={{ p: 2, textAlign: 'center', background: 'primary.light' }}>
            <Typography variant="h6" color="primary.contrastText">Tiny</Typography>
            <Typography variant="caption" color="primary.contrastText">4px / 0.25rem</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', background: 'secondary.light' }}>
            <Typography variant="h6" color="secondary.contrastText">Small</Typography>
            <Typography variant="caption" color="secondary.contrastText">8px / 0.5rem</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', background: 'success.light' }}>
            <Typography variant="h6" color="success.contrastText">Medium</Typography>
            <Typography variant="caption" color="success.contrastText">16px / 1rem</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', background: 'warning.light' }}>
            <Typography variant="h6" color="warning.contrastText">Large</Typography>
            <Typography variant="caption" color="warning.contrastText">24px / 1.5rem</Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', background: 'error.light' }}>
            <Typography variant="h6" color="error.contrastText">Huge</Typography>
            <Typography variant="caption" color="error.contrastText">32px / 2rem</Typography>
          </Paper>
        </GridLayout>
      </Section>

      <HeroBlock
        title="Start Building Beautiful Layouts"
        subtitle="Use GridLayout and LayoutBlocks to create responsive, professional interfaces"
        actions={[
          { label: "View GridLayout Stories", variant: "primary" },
          { label: "View LayoutBlocks Stories", variant: "outlined" }
        ]}
        backgroundColor="primary"
        blockHeight="small"
      />
    </QwickApp>
  ),
};

export const GridLayoutDemo: StoryObj = {
  render: () => (
    <QwickApp appName="GridLayout Demo">
      <Section padding="comfortable">
        <Typography variant="h4" gutterBottom>
          GridLayout Examples
        </Typography>

        <Content title="Equal Column Distribution" blockSpacing="comfortable" margin="large">
          <Typography paragraph>
            Use the <code>columns</code> prop to automatically distribute children into equal-width columns:
          </Typography>
          <GridLayout columns={3} spacing="medium">
            <Paper sx={{ p: 2, textAlign: 'center', background: '#ffebee' }}>
              <Typography>Column 1</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', background: '#e8f5e8' }}>
              <Typography>Column 2</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', background: '#e3f2fd' }}>
              <Typography>Column 3</Typography>
            </Paper>
          </GridLayout>
        </Content>

        <Content title="Custom Grid Spans" blockSpacing="comfortable" margin="large">
          <Typography paragraph>
            Use <code>span</code> props on children for custom column widths:
          </Typography>
          <GridLayout spacing="medium">
            <Paper sx={{ p: 2, textAlign: 'center', background: '#f3e5f5' }} data-grid-span={8}>
              <Typography>Main Content (8 columns)</Typography>
            </Paper>
            <Paper sx={{ p: 2, textAlign: 'center', background: '#e0f2f1' }} data-grid-span={4}>
              <Typography>Sidebar (4 columns)</Typography>
            </Paper>
          </GridLayout>
        </Content>

        <Content title="Responsive Behavior" blockSpacing="comfortable" margin="large">
          <Typography paragraph>
            Use breakpoint props for responsive layouts:
          </Typography>
          <GridLayout spacing="medium">
            <Paper 
              sx={{ p: 2, textAlign: 'center', background: '#fff3e0' }}
              data-grid-xs={12}
              data-grid-sm={6}
              data-grid-md={4}
            >
              <Typography variant="body2">
                Mobile: Full width<br/>
                Tablet: Half width<br/>
                Desktop: One third
              </Typography>
            </Paper>
            <Paper 
              sx={{ p: 2, textAlign: 'center', background: '#fce4ec' }}
              data-grid-xs={12}
              data-grid-sm={6}
              data-grid-md={4}
            >
              <Typography variant="body2">
                Responsive<br/>
                Column 2
              </Typography>
            </Paper>
            <Paper 
              sx={{ p: 2, textAlign: 'center', background: '#e8eaf6' }}
              data-grid-xs={12}
              data-grid-sm={12}
              data-grid-md={4}
            >
              <Typography variant="body2">
                Mobile: Full width<br/>
                Tablet: Full width<br/>
                Desktop: One third
              </Typography>
            </Paper>
          </GridLayout>
        </Content>
      </Section>
    </QwickApp>
  ),
};