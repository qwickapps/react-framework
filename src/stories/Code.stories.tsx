/**
 * Code Component Stories - Syntax-highlighted code display with data binding support
 * 
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import { Box, Divider, Typography } from '@mui/material';
import { JsonDataProvider } from '@qwickapps/schema';
import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components/blocks';
import QwickApp from '../components/QwickApp';
import { makeSerializationStory } from './_templates/SerializationTemplate';

// Sample code content for different languages
const sampleJavaScript = `function calculateFibonacci(n) {
  if (n <= 1) return n;
  
  let prev = 0;
  let curr = 1;
  
  for (let i = 2; i <= n; i++) {
    const temp = curr;
    curr = prev + curr;
    prev = temp;
  }
  
  return curr;
}

// Usage example
console.log(calculateFibonacci(10)); // Output: 55`;

const sampleTypeScript = `interface User {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

class UserManager {
  private users: Map<string, User> = new Map();
  
  addUser(user: User): void {
    this.users.set(user.id, user);
  }
  
  getUser(id: string): User | undefined {
    return this.users.get(id);
  }
  
  updatePreferences(id: string, preferences: UserPreferences): boolean {
    const user = this.users.get(id);
    if (!user) return false;
    
    user.preferences = { ...user.preferences, ...preferences };
    return true;
  }
}`;

const samplePython = `import asyncio
import aiohttp
from typing import List, Dict, Optional

class APIClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            headers={'Authorization': f'Bearer {self.api_key}'}
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_data(self, endpoint: str) -> Dict:
        if not self.session:
            raise RuntimeError("Client not initialized. Use 'async with' context.")
        
        async with self.session.get(f"{self.base_url}/{endpoint}") as response:
            response.raise_for_status()
            return await response.json()

# Usage
async def main():
    async with APIClient("https://api.example.com", "your-api-key") as client:
        data = await client.fetch_data("users")
        print(f"Fetched {len(data)} users")

if __name__ == "__main__":
    asyncio.run(main())`;

const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QwickApps React Framework Demo</title>
    <style>
        .hero-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
        }
        
        .feature-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <section class="hero-section">
        <h1>Welcome to QwickApps</h1>
        <p>Build modern web applications with confidence</p>
    </section>
    
    <div class="feature-grid">
        <div class="feature-card">
            <h3>🚀 Fast Development</h3>
            <p>AI-powered component generation</p>
        </div>
        <div class="feature-card">
            <h3>🎨 Beautiful Design</h3>
            <p>Material-UI integration</p>
        </div>
        <div class="feature-card">
            <h3>📱 Responsive</h3>
            <p>Mobile-first approach</p>
        </div>
    </div>
</body>
</html>`;

const sampleJSON = `{
  "name": "qwickapps-react-framework",
  "version": "1.1.0",
  "description": "AI-driven React framework for modern web applications",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  },
  "dependencies": {
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@rollup/plugin-typescript": "^11.1.0",
    "rollup": "^3.29.0"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}`;

const sampleCSS = `.qwickapp-theme {
  --primary-color: #1976d2;
  --secondary-color: #dc004e;
  --background-color: #ffffff;
  --text-color: #333333;
  --border-radius: 8px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qwickapp-card {
  background: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.qwickapp-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.qwickapp-button {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: calc(var(--border-radius) / 2);
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.qwickapp-button:hover {
  background: #1565c0;
}

.qwickapp-button--secondary {
  background: var(--secondary-color);
}

.qwickapp-button--secondary:hover {
  background: #c51162;
}

@media (max-width: 768px) {
  .qwickapp-card {
    padding: 1rem;
  }
  
  .qwickapp-button {
    width: 100%;
  }
}`;

// Sample CMS data for data binding stories
const sampleCmsData = {
  'codes': {
    'javascript-fibonacci': {
      children: sampleJavaScript,
      language: 'javascript',
      title: 'fibonacci.js',
      showCopy: true,
      showLineNumbers: true
    },
    'typescript-user-manager': {
      children: sampleTypeScript,
      language: 'typescript',
      title: 'UserManager.ts',
      showCopy: true,
      showLineNumbers: false
    },
    'python-api-client': {
      children: samplePython,
      language: 'python',
      title: 'api_client.py',
      showCopy: true,
      showLineNumbers: true,
      wrapLines: false
    },
    'html-demo': {
      children: sampleHTML,
      language: 'html',
      title: 'demo.html',
      showCopy: true,
      showLineNumbers: false,
      wrapLines: true
    },
    'package-json': {
      children: sampleJSON,
      language: 'json',
      title: 'package.json',
      showCopy: false,
      showLineNumbers: true
    },
    'css-theme': {
      children: sampleCSS,
      language: 'css',
      title: 'theme.css',
      showCopy: true,
      showLineNumbers: false,
      wrapLines: true
    }
  }
};

const dataProvider = new JsonDataProvider({ data: sampleCmsData });

const meta = {
  title: 'Components/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Code is a syntax-highlighted code display component that supports multiple programming languages, copy functionality, and line numbers.

**Key Features:**
- **Syntax Highlighting**: Support for 20+ programming languages
- **Copy to Clipboard**: One-click code copying with visual feedback
- **Line Numbers**: Optional line number display for easier reference
- **Custom Styling**: Configurable background colors and themes
- **Responsive Design**: Adapts to different screen sizes with optional line wrapping
- **Data Binding**: Full CMS integration through dataSource prop
- **Title Support**: Display filenames or descriptions above code blocks
- **Overflow Handling**: Scrollable content with maximum height constraints
- **Theme Integration**: Automatic light/dark mode support

**Perfect For:**
- Technical documentation and tutorials
- Code examples and snippets
- API documentation with sample requests
- Configuration file displays
- Educational content with code samples
- Blog posts with code demonstrations`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof Code>;

// Traditional Usage Examples
export const JavaScriptExample: Story = {
  render: () => (
    <QwickApp appId="code-javascript" appName='JavaScript Code Example'>
      <Code language="javascript" title="fibonacci.js" showLineNumbers={true}>
        {sampleJavaScript}
      </Code>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'JavaScript code with syntax highlighting, line numbers, and copy functionality.',
      },
    },
  },
};

export const TypeScriptExample: Story = {
  render: () => (
    <QwickApp appId="code-typescript" appName='TypeScript Code Example'>
      <Code language="typescript" title="UserManager.ts">
        {sampleTypeScript}
      </Code>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TypeScript code with interface definitions and class implementation.',
      },
    },
  },
};

export const PythonExample: Story = {
  render: () => (
    <QwickApp appId="code-python" appName='Python Code Example'>
      <Code language="python" title="api_client.py" showLineNumbers={true}>
        {samplePython}
      </Code>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Python async code with type hints and context managers.',
      },
    },
  },
};

export const LanguageVariations: Story = {
  render: () => (
    <QwickApp appId="code-languages" appName='Multiple Programming Languages'>
      <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
        
        <Box>
          <Typography variant="h6" gutterBottom>HTML Document</Typography>
          <Code language="html" title="demo.html" wrapLines={true}>
            {sampleHTML}
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>JSON Configuration</Typography>
          <Code language="json" title="package.json" showCopy={false} showLineNumbers={true}>
            {sampleJSON}
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>CSS Styling</Typography>
          <Code language="css" title="theme.css" wrapLines={true}>
            {sampleCSS}
          </Code>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different programming languages demonstrating syntax highlighting capabilities.',
      },
    },
  },
};

export const CustomizationOptions: Story = {
  render: () => (
    <QwickApp appId="code-customization" appName='Code Customization Options'>
      <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
        
        <Box>
          <Typography variant="h6" gutterBottom>With Line Numbers</Typography>
          <Code language="javascript" showLineNumbers={true} title="with-line-numbers.js">
            {`console.log('Line 1');
console.log('Line 2');
console.log('Line 3');`}
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>No Copy Button</Typography>
          <Code language="javascript" showCopy={false} title="no-copy.js">
            {`// This code block has no copy button
const message = "Copy disabled for this example";`}
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Custom Background</Typography>
          <Code 
            language="javascript" 
            title="custom-bg.js"
            codeBackground="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            {`// Custom gradient background
const rainbow = "🌈";`}
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Line Wrapping Enabled</Typography>
          <Code language="javascript" wrapLines={true} title="long-lines.js">
            {`const veryLongVariableName = "This is a very long string that would normally overflow horizontally, but with wrapLines enabled, it will wrap to the next line instead of requiring horizontal scrolling.";`}
          </Code>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various customization options including line numbers, copy controls, backgrounds, and line wrapping.',
      },
    },
  },
};

export const EmptyAndErrorStates: Story = {
  render: () => (
    <QwickApp appId="code-states" appName='Code Component States'>
      <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
        
        <Box>
          <Typography variant="h6" gutterBottom>Empty Content</Typography>
          <Code title="empty.js">
            
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Whitespace Only</Typography>
          <Code title="whitespace.js">
            {`   
   
   `}
          </Code>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Valid Content</Typography>
          <Code language="javascript" title="valid.js">
            {`console.log("This is valid content");`}
          </Code>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates empty state handling and graceful fallbacks.',
      },
    },
  },
};

// Data Binding Examples
export const DataBindingBasic: Story = {
  render: () => (
    <QwickApp appId="code-data-binding" appName='Code Data Binding' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>📋 Data-Driven Code Display</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Code component can be completely driven by CMS data, automatically configuring language, styling, and functionality.
          </Typography>
          
          <Code title="Usage" language="tsx">{`<Code dataSource="codes.javascript-fibonacci" />`}</Code>
          
          <Code title="Data Structure" language="json">{JSON.stringify(sampleCmsData.codes['javascript-fibonacci'], null, 2)}</Code>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Box>
          <Typography variant="h4" gutterBottom>Dynamic JavaScript Example</Typography>
          <Code dataSource="codes.javascript-fibonacci" />
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code component with data binding - all configuration resolved from CMS data through dataSource.',
      },
    },
  },
};

export const DataBindingAdvanced: Story = {
  render: () => (
    <QwickApp appId="code-data-advanced" appName='Advanced Code Data Binding' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🎯 Multi-Language Code Examples</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Different Code instances can display various programming languages from separate data sources.
          </Typography>
        </Box>

        {/* TypeScript Example */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>TypeScript User Management</Typography>
          <Code dataSource="codes.typescript-user-manager" />
        </Box>

        {/* Python Example */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>Python Async API Client</Typography>
          <Code dataSource="codes.python-api-client" />
        </Box>

        {/* HTML Example */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>HTML Demo Page</Typography>
          <Code dataSource="codes.html-demo" />
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Advanced data binding with multiple programming languages showcasing different syntax highlighting.',
      },
    },
  },
};

export const DataBindingWithFallback: Story = {
  render: () => (
    <QwickApp appId="code-fallback" appName='Code Data Binding with Fallback' dataSource={{ dataProvider }}>
      <Box>
        
        <Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom>🛡️ Fallback Support</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Code component gracefully handles missing data sources with fallback props and content.
          </Typography>
          
          <Code title="Fallback Usage" language="tsx">{`<Code 
  dataSource="codes.nonexistent" 
  title="Fallback Example"
  language="javascript"
>
  {\`// This is fallback content
  console.log("Data source not found");\`}
</Code>`}</Code>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Missing Data Source (Fallback)</Typography>
            <Code 
              dataSource="codes.nonexistent"
              title="fallback-example.js"
              language="javascript"
            >
              {`// This is fallback content when data source is missing
console.log("Using fallback props and content");

function handleMissingData() {
  return "Graceful degradation in action";
}`}
            </Code>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Valid Data Source</Typography>
            <Code dataSource="codes.css-theme" />
          </Box>
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code component with fallback props when dataSource is missing or unavailable.',
      },
    },
  },
};

export const SerializationDemo: Story = {
  render: makeSerializationStory(() => (
    <Code 
      language="typescript" 
      title="user-manager.ts"
      showLineNumbers={true}
      showCopy={true}
      wrapLines={false}
      codeBackground="linear-gradient(135deg, #667eea20, #764ba220)"
      sx={{ mb: 2, border: "1px solid #ddd" }}
      onClick={() => { console.log("Code component clicked!"); }}
      role="region"
      aria-label="TypeScript code demonstration"
      data-testid="serializable-code-block"
      content={`// Complex TypeScript example with all Code features
interface User {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

class UserManager {
  private users: Map<string, User> = new Map();
  
  addUser(user: User): void {
    this.users.set(user.id, user);
  }
  
  getUser(id: string): User | undefined {
    return this.users.get(id);
  }
  
  updatePreferences(id: string, preferences: UserPreferences): boolean {
    const user = this.users.get(id);
    if (!user) return false;
    
    user.preferences = { ...user.preferences, ...preferences };
    return true;
  }
}`}
    />
  )),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Code component serialization and deserialization using ComponentTransformer.',
      },
    },
  },
};

export const RealWorldExample: Story = {
  render: () => (
    <QwickApp appId="code-real-world" appName='Real World Code Examples' dataSource={{ dataProvider }}>
      <Box>
        
        {/* Introduction */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>QwickApps React Framework Examples</Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.7 }}>
            Real-world code examples demonstrating framework capabilities
          </Typography>
        </Box>
        
        {/* Backend Code */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>🐍 Backend API Development</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Async Python API client with proper error handling and type safety
          </Typography>
          <Code dataSource="codes.python-api-client" />
        </Box>
        
        {/* Frontend Code */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>⚛️ Frontend Component Logic</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            TypeScript user management with interfaces and class-based architecture
          </Typography>
          <Code dataSource="codes.typescript-user-manager" />
        </Box>
        
        {/* Configuration */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>📦 Project Configuration</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            Complete package.json setup for modern React development
          </Typography>
          <Code dataSource="codes.package-json" />
        </Box>
        
        {/* Styling */}
        <Box>
          <Typography variant="h4" gutterBottom>🎨 Theme & Styling</Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
            CSS custom properties for consistent design system
          </Typography>
          <Code dataSource="codes.css-theme" />
        </Box>
        
      </Box>
    </QwickApp>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example combining multiple Code instances in a complete development documentation layout.',
      },
    },
  },
};
