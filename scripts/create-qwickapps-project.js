#!/usr/bin/env node

/**
 * QwickApps React Project Setup Script
 *
 * This script helps users create a new React project with QwickApps React Framework pre-configured.
 * It addresses the common issue where users try to use the framework without first setting up React.
 *
 * Usage:
 *   npx @qwickapps/react-framework/scripts/create-qwickapps-project my-app-name
 *   OR
 *   node scripts/create-qwickapps-project.js my-app-name
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// When run as: npx @qwickapps/react-framework create my-project
// argv[0] = node, argv[1] = script, argv[2] = "create", argv[3] = "my-project"
const projectName = process.argv[3] || process.argv[2];

if (!projectName || projectName === 'create') {
  console.error('❌ Error: Please provide a project name');
  console.log('Usage: npx @qwickapps/react-framework create my-app-name');
  process.exit(1);
}

// Convert project name to title case for display
const appDisplayName = projectName
  .split(/[-_\s]+/)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');

console.log(`🚀 Creating QwickApps React project: ${projectName}`);
console.log('This will:');
console.log('  1. Create a new React app with TypeScript');
console.log('  2. Install QwickApps React Framework');
console.log('  3. Install required peer dependencies');
console.log('  4. Set up a basic QwickApps application');
console.log('');

// Step 1: Create React app
console.log('📦 Step 1: Creating React app with TypeScript...');
const createReactApp = spawn('npx', [
  'create-react-app',
  projectName,
  '--template',
  'typescript'
], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

createReactApp.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Failed to create React app');
    process.exit(1);
  }

  // Step 2: Change to project directory and install QwickApps dependencies
  const projectPath = path.resolve(projectName);
  process.chdir(projectPath);

  console.log('📦 Step 2: Installing QwickApps React Framework and dependencies...');
  const installDeps = spawn('npm', [
    'install',
    '@qwickapps/react-framework',
    '@emotion/react',
    '@emotion/styled',
    '@mui/material',
    '@mui/icons-material',
    'react-router-dom'
  ], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  installDeps.on('close', (installCode) => {
    if (installCode !== 0) {
      console.error('❌ Failed to install QwickApps dependencies');
      process.exit(1);
    }

    // Step 3: Update App.tsx with QwickApps template
    console.log('⚙️  Step 3: Setting up QwickApps application template...');

    const appTsxContent = `import React from 'react';
import '@qwickapps/react-framework/index.css';
import './App.css';
import {
  QwickApp,
  Section,
  HeroBlock
} from '@qwickapps/react-framework';

function App() {
  return (
    <QwickApp
      appId="my-qwickapps-project"
      appName="${appDisplayName}"
      enableScaffolding={true}
      showThemeSwitcher={true}
      showPaletteSwitcher={true}
    >
      <HeroBlock
        title="Welcome to QwickApps! 🎉"
        subtitle="Your React application is ready with QwickApps framework"
        height="medium"
        backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        actions={[
          {
            label: 'Get Started',
            variant: 'primary'
          },
          {
            label: 'View Documentation',
            variant: 'secondary',
            href: 'https://github.com/raajkumars/qwickapps',
            target: '_blank'
          }
        ]}
      />

      <Section padding="large">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>What's Next?</h2>
          <p>
            Your QwickApps React application is set up and ready to go!
            Try switching themes and palettes using the controls in the header.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{ padding: '1.5rem', background: 'var(--theme-surface)', borderRadius: '8px' }}>
              <h3>🎨 Beautiful Theming</h3>
              <p>Light/dark mode with customizable color palettes</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--theme-surface)', borderRadius: '8px' }}>
              <h3>📱 Mobile Friendly</h3>
              <p>Responsive components that work on all devices</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--theme-surface)', borderRadius: '8px' }}>
              <h3>♿ Accessibility First</h3>
              <p>WCAG compliant components out of the box</p>
            </div>
          </div>
        </div>
      </Section>
    </QwickApp>
  );
}

export default App;
`;

    // Step 4: Update index.tsx to import CSS
    const indexTsxContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import '@qwickapps/react-framework/index.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`;

    try {
      // Write the updated files
      fs.writeFileSync(path.join('src', 'App.tsx'), appTsxContent);
      fs.writeFileSync(path.join('src', 'index.tsx'), indexTsxContent);

      // Create a README with additional instructions
      const readmeContent = `# ${projectName}

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [QwickApps React Framework](https://github.com/raajkumars/qwickapps).

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.\\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\\
You will also see any lint errors in the console.

### \`npm test\`

Launches the test runner in the interactive watch mode.\\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### \`npm run build\`

Builds the app for production to the \`build\` folder.\\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\\
Your app is ready to be deployed!

## QwickApps Features

This project includes the QwickApps React Framework with:

- 🎨 **Beautiful Theming**: Light/dark mode with customizable color palettes
- 📱 **Mobile Friendly**: Responsive components that work on all devices
- ♿ **Accessibility First**: WCAG compliant components out of the box
- 🧩 **Rich Component Library**: Pre-built components for rapid development
- 🔄 **Component Serialization**: Store and reconstruct components from JSON
- 🖨️ **Print Support**: Advanced print layouts and configurations

## Next Steps

1. **Explore Components**: Check out the [QwickApps documentation](https://github.com/raajkumars/qwickapps) for available components
2. **Customize Themes**: Try the theme and palette switchers in your app header
3. **Add More Components**: Import additional components from \`@qwickapps/react-framework\`
4. **Build Your App**: Start building your application features

## Learn More

- [QwickApps Documentation](https://github.com/raajkumars/qwickapps)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

## Troubleshooting

If you encounter any issues:

1. Make sure you're using Node.js 16 or later
2. Clear your npm cache: \`npm cache clean --force\`
3. Delete \`node_modules\` and \`package-lock.json\`, then run \`npm install\`
4. Check the [QwickApps issues](https://github.com/raajkumars/qwickapps/issues) for known problems

Happy coding with QwickApps! 🚀
`;

      fs.writeFileSync('README.md', readmeContent);

      console.log('✅ Setup complete!');
      console.log('');
      console.log('🎉 Your QwickApps React project is ready!');
      console.log('');
      console.log('Next steps:');
      console.log(`  cd ${projectName}`);
      console.log('  npm start');
      console.log('');
      console.log('Your app will open at http://localhost:3000');
      console.log('');
      console.log('Features included:');
      console.log('  ✅ QwickApps React Framework');
      console.log('  ✅ Material-UI components');
      console.log('  ✅ Emotion styling');
      console.log('  ✅ React Router');
      console.log('  ✅ Theme switching');
      console.log('  ✅ Responsive design');
      console.log('  ✅ Accessibility support');
      console.log('');
      console.log('Happy coding! 🚀');

    } catch (error) {
      console.error('❌ Error setting up QwickApps template:', error.message);
      process.exit(1);
    }
  });
});