/**
 * CollapsibleLayout Component Stories - Advanced expandable/collapsible container with comprehensive features
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import {
 ArrowDropDown as ArrowDropDownIcon,
 ArrowDropUp as ArrowDropUpIcon,
 Business as BusinessIcon,
 CheckCircle as CheckCircleIcon,
 Delete as DeleteIcon,
 Edit as EditIcon,
 Info as InfoIcon,
 Person as PersonIcon,
 Settings as SettingsIcon,
 Visibility as VisibilityIcon,
 Warning as WarningIcon
} from '@mui/icons-material';
import {
 Alert,
 Avatar,
 Box,
 Card,
 CardContent,
 Chip,
 FormControlLabel,
 LinearProgress,
 List,
 ListItem,
 ListItemAvatar,
 ListItemText,
 Paper,
 Stack,
 Switch,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Typography,
} from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Code, CollapsibleLayout, QwickApp, TextField } from '../components';

// Sample data for different CollapsibleLayout configurations
const sampleCmsData = {
 'collapsible-layouts': {
 'simple-card': {
 title: 'Basic Information',
 subtitle: 'Personal details and contact information',
 defaultCollapsed: false,
 variant: 'outlined',
 headerSpacing: 'comfortable',
 contentSpacing: 'comfortable',
 },
 'settings-panel': {
 title: 'Advanced Settings',
 subtitle: 'Configure advanced options and preferences',
 defaultCollapsed: true,
 variant: 'elevated',
 headerSpacing: 'spacious',
 contentSpacing: 'spacious',
 leadIcon: '<SettingsIcon />',
 showDivider: true,
 },
 'notification-center': {
 title: 'Notifications',
 subtitle: '3 unread messages',
 defaultCollapsed: true,
 variant: 'filled',
 headerSpacing: 'compact',
 contentSpacing: 'compact',
 triggerArea: 'both',
 animationStyle: 'fade',
 },
 'data-table': {
 title: 'User Management',
 subtitle: 'Manage users and permissions',
 defaultCollapsed: false,
 variant: 'default',
 triggerArea: 'button',
 animationStyle: 'slide',
 persistState: true,
 },
 'help-section': {
 title: 'Help & Support',
 collapsedView: '<Typography color="text.secondary">Click to expand help section...</Typography>',
 defaultCollapsed: true,
 variant: 'outlined',
 animationStyle: 'scale',
 }
 }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
 title: 'Layout/CollapsibleLayout',
 component: CollapsibleLayout,
 parameters: {
 layout: 'padded',
 docs: {
 description: {
 component: `CollapsibleLayout is an advanced expandable/collapsible container for the QwickApps React Framework with comprehensive features and customization options.

**Key Features:**
- **Controlled & Uncontrolled States**: Supports both controlled (with collapsed prop) and uncontrolled (with defaultCollapsed) usage patterns
- **Multiple Animation Styles**: Fade, slide, and scale animations with customizable duration
- **Flexible Trigger Areas**: Header click, button only, or both trigger areas for expanding/collapsing
- **LocalStorage Persistence**: Optionally remember collapsed state across browser sessions
- **Visual Variants**: Default, outlined, elevated, and filled styles for different design contexts
- **Customizable Spacing**: Compact, comfortable, and spacious spacing options for header and content
- **Rich Content Support**: Header actions, collapsed preview, footer, and complex content with React nodes or HTML
- **Complete Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Data Binding**: Full CMS integration through dataSource prop
- **Icon Customization**: Custom collapse/expand icons with React nodes or HTML strings
- **Theme Integration**: Automatically integrates with QwickApp theme and Material-UI components

**Perfect For:**
- Settings panels and configuration sections
- Data tables with expandable details
- FAQ sections and help documentation
- Feature panels and content organization
- Complex forms with collapsible sections
- Dashboard widgets and information panels`,
 },
 },
 },
 tags: ['autodocs'],
 argTypes: {
 // State control
 collapsed: {
 control: 'boolean',
 description: 'Controlled collapsed state (undefined for uncontrolled)',
 },
 defaultCollapsed: {
 control: 'boolean',
 description: 'Initial collapsed state for uncontrolled component',
 },
 onToggle: {
 action: 'toggled',
 description: 'Callback fired when collapsed state changes',
 },

 // Content
 title: {
 control: 'text',
 description: 'Header title text',
 },
 subtitle: {
 control: 'text',
 description: 'Header subtitle text',
 },
 children: {
 control: 'text',
 description: 'Main content (ReactNode or string)',
 },
 collapsedView: {
 control: 'text',
 description: 'Content shown when collapsed (ReactNode or string)',
 },
 footerView: {
 control: 'text',
 description: 'Footer content (ReactNode or string)',
 },

 // Behavior
 triggerArea: {
 control: 'select',
 options: ['header', 'button', 'both'],
 description: 'Which area triggers expand/collapse',
 },
 animationStyle: {
 control: 'select',
 options: ['fade', 'slide', 'scale'],
 description: 'Animation style for expand/collapse',
 },
 animationDuration: {
 control: { type: 'number', min: 0, max: 2000 },
 description: 'Animation duration in milliseconds',
 },
 disableAnimations: {
 control: 'boolean',
 description: 'Disable all animations',
 },
 persistState: {
 control: 'boolean',
 description: 'Remember state in localStorage',
 },

 // Layout
 variant: {
 control: 'select',
 options: ['default', 'outlined', 'elevated', 'filled'],
 description: 'Visual style variant',
 },
 headerSpacing: {
 control: 'select',
 options: ['compact', 'comfortable', 'spacious'],
 description: 'Header padding/spacing',
 },
 contentSpacing: {
 control: 'select',
 options: ['compact', 'comfortable', 'spacious'],
 description: 'Content padding/spacing',
 },
 showDivider: {
 control: 'boolean',
 description: 'Show divider between header and content',
 },

 // Icons
 collapsedIcon: {
 control: 'text',
 description: 'Custom icon when collapsed',
 },
 expandedIcon: {
 control: 'text',
 description: 'Custom icon when expanded',
 },

 // Accessibility
 toggleAriaLabel: {
 control: 'text',
 description: 'ARIA label for toggle button',
 },
 },
} satisfies Meta<typeof CollapsibleLayout>;

export default meta;
type Story = StoryObj<typeof CollapsibleLayout>;

// ============================================
// BASIC STORIES
// ============================================

export const Default: Story = {
 render: () => (
 <QwickApp appId="collapsible-default" appName='Default CollapsibleLayout'>
 <CollapsibleLayout
 title="Basic Collapsible Section"
 subtitle="Click the header to expand or collapse this content"
 defaultCollapsed={false}
 onToggle={(collapsed) => console.log('Toggled:', collapsed)}
 >
 <Typography variant="body1">
 This is the main content of the collapsible layout. It can contain any React components,
 text, forms, tables, or other complex layouts. The content is shown when expanded and
 hidden when collapsed.
 </Typography>
 <Box sx={{ mt: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
 <Typography variant="body2">
 This content is inside a styled box within the collapsible layout.
 </Typography>
 </Box>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Default CollapsibleLayout with header title, subtitle, and simple content.',
 },
 },
 },
};

export const WithHeaderActions: Story = {
 render: () => (
 <QwickApp appId="collapsible-actions" appName='CollapsibleLayout with Header Actions'>
 <CollapsibleLayout
 title="User Profile Settings"
 subtitle="Manage your account preferences"
 defaultCollapsed={false}
 headerActions={
 <Stack direction="row" spacing={1}>
 <Chip label="Pro" color="primary" size="small" />
 <Button size="small" variant="outlined">Edit</Button>
 </Stack>
 }
 leadIcon={<PersonIcon color="primary" />}
 >
 <Stack spacing={2}>
 <TextField label="Display Name" defaultValue="John Doe" fullWidth />
 <TextField label="Email Address" defaultValue="john@example.com" fullWidth />
 <TextField label="Bio" multiline rows={3} defaultValue="Software developer passionate about creating amazing user experiences." fullWidth />
 <Box sx={{ display: 'flex', gap: 2 }}>
 <Button variant="contained">Save Changes</Button>
 <Button variant="outlined">Cancel</Button>
 </Box>
 </Stack>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout with lead icon, header actions (chip and button), and form content.',
 },
 },
 },
};

export const WithFooter: Story = {
 render: () => (
 <QwickApp appId="collapsible-footer" appName='CollapsibleLayout with Footer'>
 <CollapsibleLayout
 title="Project Overview"
 subtitle="Development status and team information"
 defaultCollapsed={false}
 footerView={
 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
 <Typography variant="caption" color="text.secondary">
 Last updated: 2 hours ago
 </Typography>
 <Button size="small" variant="text">View Details</Button>
 </Box>
 }
 >
 <Stack spacing={2}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <CheckCircleIcon color="success" />
 <Typography>Development: Complete</Typography>
 </Box>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <WarningIcon color="warning" />
 <Typography>Testing: In Progress</Typography>
 </Box>
 <LinearProgress variant="determinate" value={75} sx={{ mt: 2 }} />
 <Typography variant="body2" color="text.secondary">
 Project is 75% complete
 </Typography>
 </Stack>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout with footer content that remains visible at the bottom.',
 },
 },
 },
};

// ============================================
// VARIANT STORIES
// ============================================

export const AllVariants: Story = {
 render: () => (
 <QwickApp appId="collapsible-variants" appName='CollapsibleLayout Variants'>
 <Stack spacing={3}>
 <CollapsibleLayout
 title="Default Variant"
 subtitle="Basic styling with no container decoration"
 variant="default"
 defaultCollapsed={false}
 >
 <Typography>Content for default variant - clean and minimal appearance.</Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Outlined Variant"
 subtitle="Container with border outline"
 variant="outlined"
 defaultCollapsed={false}
 >
 <Typography>Content for outlined variant - defined with subtle border.</Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Elevated Variant"
 subtitle="Container with shadow elevation"
 variant="elevated"
 defaultCollapsed={false}
 >
 <Typography>Content for elevated variant - lifted appearance with shadow.</Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Filled Variant"
 subtitle="Container with background fill"
 variant="filled"
 defaultCollapsed={false}
 >
 <Typography>Content for filled variant - emphasized with background color.</Typography>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Comparison of all four visual variants: default, outlined, elevated, and filled.',
 },
 },
 },
};

// ============================================
// STATE STORIES
// ============================================

export const InitiallyCollapsed: Story = {
 render: () => (
 <QwickApp appId="collapsible-collapsed" appName='Initially Collapsed'>
 <CollapsibleLayout
 title="Collapsed by Default"
 subtitle="This section starts in collapsed state"
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This content was hidden initially and is now visible after expanding.
 Great for less important sections or to save space on page load.
 </Typography>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout that starts in collapsed state using defaultCollapsed prop.',
 },
 },
 },
};

const ControlledStateComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <QwickApp appId="collapsible-controlled" appName='Controlled State'>
 <Stack spacing={2}>
 <Box>
 <FormControlLabel
 control={
 <Switch 
 checked={!isCollapsed} 
 onChange={(e) => setIsCollapsed(!e.target.checked)}
 />
 }
 label="Show content"
 />
 </Box>
 
 <CollapsibleLayout
 title="Controlled CollapsibleLayout"
 subtitle="State controlled by external switch"
 collapsed={isCollapsed}
 onToggle={(collapsed) => {
 setIsCollapsed(collapsed);
 console.log('External control - Collapsed:', collapsed);
 }}
 variant="outlined"
 >
 <Alert severity="info">
 This CollapsibleLayout's state is controlled by the switch above. 
 You can also click the header to toggle, but the switch will update accordingly.
      </Alert>
      </CollapsibleLayout>
    </Stack>
    </QwickApp>
  );
};

export const ControlledState: Story = {
  render: () => <ControlledStateComponent />,
  parameters: {
    docs: {
      description: {
        story: 'CollapsibleLayout with controlled state managed by external component (switch).',
      },
    },
  },
};

export const WithPersistence: Story = {
 render: () => (
 <QwickApp appId="collapsible-persistence" appName='State Persistence'>
 <Stack spacing={2}>
 <Alert severity="info">
 Toggle this section and refresh the page - the state will be remembered!
 </Alert>
 
 <CollapsibleLayout
 title="Persistent State"
 subtitle="State is saved to localStorage"
 defaultCollapsed={false}
 persistState={true}
 storageKey="demo-persistent-section"
 variant="elevated"
 >
 <Typography>
 This section remembers its collapsed/expanded state using localStorage.
 Try collapsing it and refreshing the page - it will remain collapsed.
 </Typography>
 <Box sx={{ mt: 2, p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
 <Typography variant="body2">
 The storageKey "demo-persistent-section" is used to store the state.
 </Typography>
 </Box>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout with localStorage persistence to remember state across page refreshes.',
 },
 },
 },
};

// ============================================
// CONTENT STORIES
// ============================================

export const WithCollapsedView: Story = {
 render: () => (
 <QwickApp appId="collapsible-preview" appName='Collapsed View'>
 <CollapsibleLayout
 title="Article Preview"
 subtitle="Click to read the full article"
 defaultCollapsed={true}
 variant="outlined"
 collapsedView={
 <Box sx={{ p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
 <Typography variant="body2" color="text.secondary">
 📖 This article covers advanced React patterns and best practices for building
 scalable applications. Click header to expand and read more...
 </Typography>
 </Box>
 }
 >
 <Stack spacing={2}>
 <Typography variant="h6">Advanced React Patterns</Typography>
 <Typography>
 React has evolved significantly over the years, and with it, the patterns and practices
 that help developers build maintainable, scalable applications. In this comprehensive
 guide, we'll explore some of the most powerful advanced patterns.
 </Typography>
 <Typography variant="h6">1. Compound Components</Typography>
 <Typography>
 Compound components provide a flexible and intuitive API for components that need to
 work together. They allow you to express relationships between components more clearly.
 </Typography>
 <Typography variant="h6">2. Render Props Pattern</Typography>
 <Typography>
 The render props pattern is a technique for sharing code between React components using
 a prop whose value is a function.
 </Typography>
 <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
 Read More
 </Button>
 </Stack>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout with preview content shown when collapsed and full content when expanded.',
 },
 },
 },
};

export const ComplexContent: Story = {
 render: () => (
 <QwickApp appId="collapsible-complex" appName='Complex Content'>
 <CollapsibleLayout
 title="User Management Dashboard"
 subtitle="Manage users, roles, and permissions"
 defaultCollapsed={false}
 variant="elevated"
 headerActions={
 <Button size="small" variant="contained" startIcon={<PersonIcon />}>
 Add User
 </Button>
 }
 >
 <Stack spacing={3}>
 {/* Quick Stats */}
 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h4" color="primary">142</Typography>
 <Typography variant="caption">Total Users</Typography>
 </Paper>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h4" color="success.main">98</Typography>
 <Typography variant="caption">Active</Typography>
 </Paper>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h4" color="warning.main">12</Typography>
 <Typography variant="caption">Pending</Typography>
 </Paper>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h4" color="error.main">3</Typography>
 <Typography variant="caption">Inactive</Typography>
 </Paper>
 </Box>

 {/* User Table */}
 <TableContainer component={Paper}>
 <Table size="small">
 <TableHead>
 <TableRow>
 <TableCell>User</TableCell>
 <TableCell>Role</TableCell>
 <TableCell>Status</TableCell>
 <TableCell align="right">Actions</TableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 <TableRow>
 <TableCell>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
 <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
 <Box>
 <Typography variant="body2">John Doe</Typography>
 <Typography variant="caption" color="text.secondary">john@example.com</Typography>
 </Box>
 </Box>
 </TableCell>
 <TableCell>Admin</TableCell>
 <TableCell>
 <Chip label="Active" color="success" size="small" />
 </TableCell>
 <TableCell align="right">
 <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
 <Button size="small" startIcon={<EditIcon />}>Edit</Button>
 <Button size="small" color="error" startIcon={<DeleteIcon />}>Delete</Button>
 </Box>
 </TableCell>
 </TableRow>
 <TableRow>
 <TableCell>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
 <Avatar sx={{ width: 32, height: 32 }}>JS</Avatar>
 <Box>
 <Typography variant="body2">Jane Smith</Typography>
 <Typography variant="caption" color="text.secondary">jane@example.com</Typography>
 </Box>
 </Box>
 </TableCell>
 <TableCell>Editor</TableCell>
 <TableCell>
 <Chip label="Pending" color="warning" size="small" />
 </TableCell>
 <TableCell align="right">
 <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
 <Button size="small" startIcon={<EditIcon />}>Edit</Button>
 <Button size="small" color="error" startIcon={<DeleteIcon />}>Delete</Button>
 </Box>
 </TableCell>
 </TableRow>
 </TableBody>
 </Table>
 </TableContainer>
 </Stack>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout containing complex content: statistics cards, data table with actions, and mixed layouts.',
 },
 },
 },
};

export const WithHtmlContent: Story = {
 render: () => (
 <QwickApp appId="collapsible-html" appName='HTML Content'>
 <CollapsibleLayout
 title="Rich Content Section"
 subtitle="Supports both React components and HTML strings"
 defaultCollapsed={false}
 variant="outlined"
 leadIcon=""
 collapsedView="<p style='color: #666;'><em>Click to view rich HTML content...</em></p>"
 >
 <div>
 <h3>Mixed Content Support</h3>
 <p>This section demonstrates how CollapsibleLayout can handle various content types:</p>
 <ul>
 <li><strong>React Components:</strong> Full JSX support with interactive elements</li>
 <li><strong>HTML Strings:</strong> Raw HTML content rendered safely</li>
 <li><strong>Mixed Content:</strong> Combination of both types</li>
 </ul>
 
 <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginTop: '16px' }}>
 <h4>HTML String Example:</h4>
 <p>This content could come from a CMS or markdown processor.</p>
 <code>{'<CollapsibleLayout title="..." children="<div>HTML content</div>" />'}</code>
 </div>

 <Box sx={{ mt: 2, p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
 <Typography variant="body2">
 And this is a React component (Material-UI Box) mixed with the HTML content above.
 </Typography>
 </Box>
 </div>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout with mixed HTML string and React component content, demonstrating flexible content support.',
 },
 },
 },
};

// ============================================
// INTERACTION STORIES
// ============================================

export const TriggerAreas: Story = {
 render: () => (
 <QwickApp appId="collapsible-triggers" appName='Trigger Areas'>
 <Stack spacing={3}>
 <CollapsibleLayout
 title="Header Trigger"
 subtitle="Click anywhere on the header to toggle"
 triggerArea="header"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 With triggerArea="header", you can click anywhere on the header area to expand/collapse.
 No separate toggle button is shown.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Button Trigger"
 subtitle="Only the button toggles the content"
 triggerArea="button"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 With triggerArea="button", only the toggle button (shown on the right) can expand/collapse.
 Clicking the header text has no effect.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Both Triggers"
 subtitle="Header or button can toggle"
 triggerArea="both"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 With triggerArea="both", you can either click the header area OR use the toggle button.
 This provides maximum flexibility for users.
 </Typography>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different trigger areas: header only, button only, or both header and button.',
 },
 },
 },
};

export const CustomIcons: Story = {
 render: () => (
 <QwickApp appId="collapsible-icons" appName='Custom Icons'>
 <Stack spacing={3}>
 <CollapsibleLayout
 title="Custom React Icons"
 subtitle="Using Material-UI icons"
 triggerArea="both"
 defaultCollapsed={false}
 variant="outlined"
 collapsedIcon={<ArrowDropDownIcon />}
 expandedIcon={<ArrowDropUpIcon />}
 >
 <Typography>
 This layout uses custom Material-UI icons: ArrowDropDown when collapsed, ArrowDropUp when expanded.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="HTML String Icons"
 subtitle="Using emoji and HTML entities"
 triggerArea="both"
 defaultCollapsed={false}
 variant="outlined"
 collapsedIcon="▶"
 expandedIcon="🔽"
 >
 <Typography>
 This layout uses emoji strings as icons. You can also use HTML entities, Font Awesome classes,
 or any HTML string for the icons.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="No Custom Icons"
 subtitle="Uses default visibility icons"
 triggerArea="both"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 Without custom icons, the default Visibility/VisibilityOff icons are used from Material-UI.
 </Typography>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Custom toggle icons using React components, HTML strings, or default icons.',
 },
 },
 },
};

const DisabledStateComponent = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <QwickApp appId="collapsible-disabled" appName='Disabled State'>
 <Stack spacing={2}>
 <Box>
 <FormControlLabel
 control={
 <Switch 
 checked={disabled} 
 onChange={(e) => setDisabled(e.target.checked)}
 />
 }
 label="Simulate disabled state"
 />
 <Typography variant="caption" display="block" color="text.secondary">
 Note: There's no built-in disabled prop, but you can simulate it by removing event handlers
 </Typography>
 </Box>
 
 <CollapsibleLayout
 title="Conditional Functionality"
 subtitle={disabled ? "Functionality disabled" : "Click to toggle"}
 defaultCollapsed={false}
 variant="outlined"
 onToggle={disabled ? undefined : (collapsed) => console.log('Toggled:', collapsed)}
 triggerArea={disabled ? undefined : "both"}
 sx={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'default' }}
 >
 <Typography>
 {disabled 
 ? "This content cannot be toggled because the component is in a disabled-like state."
 : "This content can be toggled normally. Use the switch above to simulate a disabled state."
 }
 </Typography>
      </CollapsibleLayout>
    </Stack>
    </QwickApp>
  );
};

export const DisabledState: Story = {
  render: () => <DisabledStateComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating how to create a disabled-like state by conditionally removing event handlers.',
      },
    },
  },
};

// ============================================
// ANIMATION STORIES
// ============================================

export const AnimationStyles: Story = {
 render: () => (
 <QwickApp appId="collapsible-animations" appName='Animation Styles'>
 <Stack spacing={3}>
 <CollapsibleLayout
 title="Fade Animation"
 subtitle="Content fades in/out"
 animationStyle="fade"
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This content uses fade animation. The opacity transitions smoothly when expanding/collapsing.
 Great for subtle, elegant transitions.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Slide Animation (Default)"
 subtitle="Content slides down/up"
 animationStyle="slide"
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This content uses slide animation (the default). Height transitions create a smooth
 sliding effect. Most commonly used animation style.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Scale Animation"
 subtitle="Content scales and fades"
 animationStyle="scale"
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This content uses scale animation. It combines scaling and fading for a dynamic,
 attention-grabbing transition effect.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="No Animation"
 subtitle="Instant toggle"
 animationStyle="slide"
 disableAnimations={true}
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This content has animations disabled with disableAnimations={true}.
 The content appears/disappears instantly without any transition.
 </Typography>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different animation styles: fade, slide (default), scale, and disabled animations.',
 },
 },
 },
};

export const CustomAnimationDuration: Story = {
 render: () => (
 <QwickApp appId="collapsible-duration" appName='Animation Duration'>
 <Stack spacing={3}>
 <CollapsibleLayout
 title="Fast Animation (150ms)"
 subtitle="Quick transitions"
 animationDuration={150}
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This section uses a fast animation duration of 150ms for snappy, responsive transitions.
 Good for frequently toggled sections.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Default Animation (300ms)"
 subtitle="Standard timing"
 animationDuration={300}
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This section uses the default animation duration of 300ms. This provides a good balance
 between perceived performance and smooth visual feedback.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Slow Animation (800ms)"
 subtitle="Deliberate transitions"
 animationDuration={800}
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 This section uses a slow animation duration of 800ms for more deliberate, dramatic transitions.
 Can be used for emphasis or when the content change is significant.
 </Typography>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different animation durations: fast (150ms), default (300ms), and slow (800ms).',
 },
 },
 },
};

// ============================================
// SPACING STORIES
// ============================================

export const SpacingVariations: Story = {
 render: () => (
 <QwickApp appId="collapsible-spacing" appName='Spacing Variations'>
 <Stack spacing={3}>
 <CollapsibleLayout
 title="Compact Spacing"
 subtitle="Minimal padding for dense layouts"
 headerSpacing="compact"
 contentSpacing="compact"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 This layout uses compact spacing for both header and content. Perfect for dense interfaces,
 dashboards, or when you need to fit more content in limited space.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Comfortable Spacing (Default)"
 subtitle="Balanced padding for most use cases"
 headerSpacing="comfortable"
 contentSpacing="comfortable"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 This layout uses comfortable spacing (the default). This provides a good balance between
 content density and visual breathing room, suitable for most applications.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Spacious Layout"
 subtitle="Generous padding for premium feel"
 headerSpacing="spacious"
 contentSpacing="spacious"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 This layout uses spacious padding for both header and content. Creates a more premium,
 luxurious feel with plenty of whitespace. Good for marketing pages or feature highlights.
 </Typography>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Mixed Spacing"
 subtitle="Compact header with spacious content"
 headerSpacing="compact"
 contentSpacing="spacious"
 defaultCollapsed={false}
 variant="outlined"
 >
 <Typography>
 This layout demonstrates mixed spacing: compact header to save vertical space,
 but spacious content for better readability. You can mix and match as needed.
 </Typography>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Different spacing options: compact, comfortable (default), spacious, and mixed combinations.',
 },
 },
 },
};

// ============================================
// ADVANCED STORIES
// ============================================

export const MultipleCollapsibleLayouts: Story = {
 render: () => (
 <QwickApp appId="collapsible-multiple" appName='Multiple CollapsibleLayouts'>
 <Stack spacing={2}>
 <Typography variant="h5" gutterBottom>
 Settings Dashboard
 </Typography>
 
 <CollapsibleLayout
 title="Account Settings"
 subtitle="Profile, security, and preferences"
 defaultCollapsed={false}
 variant="outlined"
 leadIcon={<PersonIcon color="primary" />}
 >
 <Stack spacing={2}>
 <TextField label="Display Name" defaultValue="John Doe" size="small" />
 <TextField label="Email" defaultValue="john@example.com" size="small" />
 <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Privacy Settings"
 subtitle="Data usage and visibility preferences"
 defaultCollapsed={true}
 variant="outlined"
 leadIcon={<VisibilityIcon color="secondary" />}
 >
 <Stack spacing={2}>
 <FormControlLabel control={<Switch defaultChecked />} label="Public profile" />
 <FormControlLabel control={<Switch />} label="Show online status" />
 <FormControlLabel control={<Switch defaultChecked />} label="Allow friend requests" />
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Advanced Settings"
 subtitle="Developer and system options"
 defaultCollapsed={true}
 variant="outlined"
 leadIcon={<SettingsIcon color="action" />}
 headerActions={
 <Chip label="Expert" color="warning" size="small" />
 }
 >
 <Stack spacing={2}>
 <Alert severity="warning">
 These settings are for advanced users only. Changing these may affect application behavior.
 </Alert>
 <FormControlLabel control={<Switch />} label="Debug mode" />
 <FormControlLabel control={<Switch />} label="Beta features" />
 <TextField label="API Endpoint" defaultValue="https://api.example.com" size="small" fullWidth />
 </Stack>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Multiple CollapsibleLayout sections working together in a settings dashboard interface.',
 },
 },
 },
};

export const NestedCollapsibleLayouts: Story = {
 render: () => (
 <QwickApp appId="collapsible-nested" appName='Nested CollapsibleLayouts'>
 <CollapsibleLayout
 title="Project Configuration"
 subtitle="Comprehensive project settings and options"
 defaultCollapsed={false}
 variant="elevated"
 leadIcon={<BusinessIcon />}
 >
 <Stack spacing={2}>
 <Typography variant="h6">Basic Information</Typography>
 <TextField label="Project Name" defaultValue="My Awesome Project" fullWidth />
 
 <CollapsibleLayout
 title="Build Settings"
 subtitle="Compilation and deployment options"
 defaultCollapsed={true}
 variant="outlined"
 headerSpacing="compact"
 contentSpacing="compact"
 >
 <Stack spacing={1}>
 <FormControlLabel control={<Switch defaultChecked />} label="Enable minification" />
 <FormControlLabel control={<Switch />} label="Source maps" />
 <TextField label="Output directory" defaultValue="./dist" size="small" />
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Environment Variables"
 subtitle="Configure environment-specific values"
 defaultCollapsed={true}
 variant="outlined"
 headerSpacing="compact"
 contentSpacing="compact"
 >
 <Stack spacing={1}>
 <TextField label="API_URL" defaultValue="https://api.prod.example.com" size="small" />
 <TextField label="APP_ENV" defaultValue="production" size="small" />
 
 <CollapsibleLayout
 title="Development Overrides"
 subtitle="Values for development environment"
 defaultCollapsed={true}
 variant="default"
 headerSpacing="compact"
 contentSpacing="compact"
 showDivider={false}
 >
 <Stack spacing={1}>
 <TextField label="DEV_API_URL" defaultValue="http://localhost:3000" size="small" />
 <TextField label="DEBUG_LEVEL" defaultValue="verbose" size="small" />
 </Stack>
 </CollapsibleLayout>
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Security Settings"
 subtitle="Authentication and authorization"
 defaultCollapsed={true}
 variant="outlined"
 headerSpacing="compact"
 contentSpacing="compact"
 >
 <Stack spacing={1}>
 <FormControlLabel control={<Switch defaultChecked />} label="Require authentication" />
 <FormControlLabel control={<Switch defaultChecked />} label="Enable CORS" />
 <TextField label="Allowed origins" defaultValue="*.example.com" size="small" />
 </Stack>
 </CollapsibleLayout>
 </Stack>
 </CollapsibleLayout>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Nested CollapsibleLayout sections creating a hierarchical configuration interface with multiple levels.',
 },
 },
 },
};

export const WithDataBinding: Story = {
 render: () => (
 <QwickApp appId="collapsible-databinding" appName='Data Binding' dataSource={{ dataProvider }}>
 <Stack spacing={3}>
 <Box sx={{ p: 3, backgroundColor: 'background.paper', borderRadius: 1 }}>
 <Typography variant="h5" gutterBottom> Data-Driven CollapsibleLayouts</Typography>
 <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
 CollapsibleLayout components can be completely driven by CMS data, loading configuration 
 and content from your data source.
 </Typography>
 
 <Code title="Usage" language="tsx">{`<CollapsibleLayout dataSource="collapsible-layouts.simple-card" />`}</Code>
 </Box>

 <CollapsibleLayout dataSource="collapsible-layouts.simple-card">
 <Stack spacing={2}>
 <TextField label="Full Name" defaultValue="John Doe" />
 <TextField label="Email Address" defaultValue="john.doe@example.com" />
 <TextField label="Phone Number" defaultValue="+1 (555) 123-4567" />
 <TextField label="Company" defaultValue="Acme Corporation" />
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout dataSource="collapsible-layouts.settings-panel">
 <Stack spacing={2}>
 <FormControlLabel control={<Switch />} label="Enable advanced features" />
 <FormControlLabel control={<Switch defaultChecked />} label="Auto-save changes" />
 <TextField label="Session timeout (minutes)" defaultValue="30" type="number" />
 <TextField 
 label="Notification preferences" 
 select 
 defaultValue="email"
 SelectProps={{ native: true }}
 >
 <option value="email">Email only</option>
 <option value="push">Push only</option>
 <option value="both">Both</option>
 <option value="none">None</option>
 </TextField>
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout dataSource="collapsible-layouts.notification-center">
 <List dense>
 <ListItem>
 <ListItemAvatar>
 <Avatar>
 <InfoIcon />
 </Avatar>
 </ListItemAvatar>
 <ListItemText
 primary="System Update Available"
 secondary="Version 2.1.0 includes bug fixes and performance improvements"
 />
 </ListItem>
 <ListItem>
 <ListItemAvatar>
 <Avatar>
 <CheckCircleIcon />
 </Avatar>
 </ListItemAvatar>
 <ListItemText
 primary="Backup Completed"
 secondary="Daily backup completed successfully at 3:00 AM"
 />
 </ListItem>
 <ListItem>
 <ListItemAvatar>
 <Avatar>
 <WarningIcon />
 </Avatar>
 </ListItemAvatar>
 <ListItemText
 primary="Storage Usage Warning"
 secondary="You are using 85% of your storage quota"
 />
 </ListItem>
 </List>
 </CollapsibleLayout>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'CollapsibleLayout components configured entirely through data binding with CMS data sources.',
 },
 },
 },
};

export const RealWorldExamples: Story = {
 render: () => (
 <QwickApp appId="collapsible-realworld" appName='Real World Examples'>
 <Stack spacing={4}>
 {/* FAQ Section */}
 <Box>
 <Typography variant="h4" gutterBottom>Frequently Asked Questions</Typography>
 <Stack spacing={2}>
 <CollapsibleLayout
 title="How do I integrate CollapsibleLayout with my CMS?"
 subtitle="Click to view integration steps"
 defaultCollapsed={true}
 variant="outlined"
 collapsedView={
 <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
 Integration involves setting up data providers and configuring data sources...
 </Typography>
 }
 >
 <Stack spacing={2}>
 <Typography>
 Integration with CMS systems is straightforward using the dataSource prop:
 </Typography>
 <Code language="tsx">{`// 1. Set up your data provider
const cmsProvider = new JsonDataProvider({ 
 data: yourCmsData 
});

// 2. Use CollapsibleLayout with data binding
<CollapsibleLayout dataSource="faq.integration" />`}</Code>
 <Typography>
 The component will automatically load title, content, styling, and behavior 
 configuration from your CMS data structure.
 </Typography>
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Can I customize the animations and styling?"
 subtitle="Comprehensive customization options"
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 Yes! CollapsibleLayout offers extensive customization options:
 </Typography>
 <ul>
 <li><strong>Animation styles:</strong> fade, slide, scale, or disabled</li>
 <li><strong>Visual variants:</strong> default, outlined, elevated, filled</li>
 <li><strong>Spacing options:</strong> compact, comfortable, spacious</li>
 <li><strong>Custom icons:</strong> React components or HTML strings</li>
 <li><strong>Trigger areas:</strong> header, button, or both</li>
 </ul>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="How does state persistence work?"
 subtitle="LocalStorage integration details"
 defaultCollapsed={true}
 variant="outlined"
 >
 <Typography>
 State persistence uses localStorage to remember collapsed/expanded state:
 </Typography>
 <Code language="tsx">{`<CollapsibleLayout
 persistState={true}
 storageKey="unique-section-id"
 title="Remembered Section"
/>`}</Code>
 <Typography sx={{ mt: 2 }}>
 The component will automatically save state changes and restore them when the page reloads.
 Each section needs a unique storageKey to avoid conflicts.
 </Typography>
 </CollapsibleLayout>
 </Stack>
 </Box>

 {/* Dashboard Widget */}
 <Box>
 <Typography variant="h4" gutterBottom>Dashboard Widget Example</Typography>
 <Card>
 <CollapsibleLayout
 title="Sales Performance"
 subtitle="Q4 2024 metrics and trends"
 variant="default"
 headerActions={
 <Box sx={{ display: 'flex', gap: 1 }}>
 <Chip label="Live" color="success" size="small" />
 <Button size="small" variant="text">Export</Button>
 </Box>
 }
 leadIcon={<Box sx={{ color: 'success.main' }}>📈</Box>}
 defaultCollapsed={false}
 >
 <CardContent>
 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h5" color="success.main">$124K</Typography>
 <Typography variant="caption">Revenue</Typography>
 </Paper>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h5" color="primary.main">856</Typography>
 <Typography variant="caption">Orders</Typography>
 </Paper>
 <Paper sx={{ p: 2, textAlign: 'center' }}>
 <Typography variant="h5" color="warning.main">12%</Typography>
 <Typography variant="caption">Growth</Typography>
 </Paper>
 </Box>
 <LinearProgress variant="determinate" value={78} sx={{ mb: 1 }} />
 <Typography variant="body2" color="text.secondary">
 78% of quarterly target achieved
 </Typography>
 </CardContent>
 </CollapsibleLayout>
 </Card>
 </Box>

 {/* Form Section */}
 <Box>
 <Typography variant="h4" gutterBottom>Form Organization</Typography>
 <Paper sx={{ p: 2 }}>
 <CollapsibleLayout
 title="Personal Information"
 subtitle="Basic details and contact information"
 defaultCollapsed={false}
 variant="default"
 showDivider={true}
 >
 <Stack spacing={2} sx={{ pt: 2 }}>
 <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
 <TextField label="First Name" defaultValue="John" />
 <TextField label="Last Name" defaultValue="Doe" />
 </Box>
 <TextField label="Email Address" defaultValue="john.doe@example.com" fullWidth />
 <TextField label="Phone Number" defaultValue="+1 (555) 123-4567" fullWidth />
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Address Information"
 subtitle="Billing and shipping addresses"
 defaultCollapsed={true}
 variant="default"
 showDivider={true}
 >
 <Stack spacing={2} sx={{ pt: 2 }}>
 <TextField label="Street Address" fullWidth />
 <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 2 }}>
 <TextField label="City" />
 <TextField label="State" />
 <TextField label="ZIP Code" />
 </Box>
 <TextField label="Country" fullWidth />
 </Stack>
 </CollapsibleLayout>

 <CollapsibleLayout
 title="Additional Options"
 subtitle="Preferences and special requests"
 defaultCollapsed={true}
 variant="default"
 >
 <Stack spacing={2} sx={{ pt: 2 }}>
 <FormControlLabel control={<Switch />} label="Subscribe to newsletter" />
 <FormControlLabel control={<Switch />} label="Receive SMS notifications" />
 <TextField 
 label="Special Instructions" 
 multiline 
 rows={3} 
 fullWidth 
 placeholder="Any special requests or instructions..."
 />
 </Stack>
 </CollapsibleLayout>

 <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
 <Button variant="contained" size="large">
 Save Information
 </Button>
 <Button variant="outlined" size="large">
 Cancel
 </Button>
 </Box>
 </Paper>
 </Box>
 </Stack>
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Real-world examples: FAQ sections, dashboard widgets, and organized form layouts.',
 },
 },
 },
};

// ============================================
// PLAYGROUND STORY
// ============================================

export const Playground: Story = {
 args: {
 title: 'Playground CollapsibleLayout',
 subtitle: 'Experiment with all the props and see the results',
 children: 'This is the main content area. You can customize all aspects of this CollapsibleLayout using the controls panel on the right. Try changing the variant, animation style, spacing, and other properties to see how they affect the appearance and behavior.',
 defaultCollapsed: false,
 variant: 'outlined',
 headerSpacing: 'comfortable',
 contentSpacing: 'comfortable',
 animationStyle: 'slide',
 animationDuration: 300,
 triggerArea: 'header',
 showDivider: true,
 disableAnimations: false,
 persistState: false,
 toggleAriaLabel: 'Toggle content visibility',
 },
 render: (args) => (
 <QwickApp appId="collapsible-playground" appName='CollapsibleLayout Playground'>
 <CollapsibleLayout {...args} />
 </QwickApp>
 ),
 parameters: {
 docs: {
 description: {
 story: 'Interactive playground to experiment with all CollapsibleLayout props and see real-time results.',
 },
 },
 },
};