import CssBaseline from '@mui/material/CssBaseline';
import type { Preview } from '@storybook/react';
import { QwickApp } from '../src/components/QwickApp';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <QwickApp 
          appId={false} 
          appName='QwickApps React Framework'
          style={{ padding: '1rem' }}
          themeMode='light'
          defaultPalette='ocean'
        >
          <CssBaseline />
          <Story />
        </QwickApp>
      );
    },
  ],
  // Removed theme/palette global controls to avoid confusion with story-specific controls
};

export default preview;