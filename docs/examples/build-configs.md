# Example Build Configurations for QwickApps React Framework Consumers

This document provides ready-to-use build configurations for applications using the QwickApps React Framework, with proper logging control for development and production deployments.

## Vite Configuration

### vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const stripLogs = process.env.STRIP_LOGS === 'true';

  return {
    plugins: [
      react(),
      // Optionally strip logs completely in production
      stripLogs && replace({
        preventAssignment: true,
        delimiters: ['', ''],
        values: {
          'logger.debug': '(() => {})',
          'logger.info': '(() => {})',
          'logger.warn': '(() => {})',
          'devLog': '(() => {})',
          'devWarn': '(() => {})',
          'devError': '(() => {})',
        }
      })
    ].filter(Boolean),
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      minify: isProd ? 'terser' : false,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : undefined,
    },
  };
});
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "build:prod": "vite build --mode production",
    "build:prod:strip": "STRIP_LOGS=true vite build --mode production",
    "preview": "vite preview",
    "deploy:dev": "npm run build:dev && npm run deploy:target",
    "deploy": "npm run build:prod:strip && npm run deploy:target",
    "deploy:target": "# Your deployment command here (e.g., aws s3 sync, netlify deploy, etc.)"
  }
}
```

## Create React App (with Craco)

### craco.config.js

```javascript
const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ],
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production' && process.env.STRIP_LOGS === 'true') {
        // Add terser plugin configuration to strip logs
        const TerserPlugin = webpackConfig.optimization.minimizer.find(
          (minimizer) => minimizer.constructor.name === 'TerserPlugin'
        );
        
        if (TerserPlugin) {
          TerserPlugin.options.terserOptions = {
            ...TerserPlugin.options.terserOptions,
            compress: {
              ...TerserPlugin.options.terserOptions.compress,
              drop_console: true,
              pure_funcs: ['logger.debug', 'logger.info', 'logger.warn', 'devLog', 'devWarn', 'devError'],
            },
          };
        }
      }
      return webpackConfig;
    },
  },
};
```

### package.json Scripts

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "build:dev": "REACT_APP_ENV=development craco build",
    "build:prod": "REACT_APP_ENV=production craco build",
    "build:prod:strip": "REACT_APP_ENV=production STRIP_LOGS=true craco build",
    "test": "craco test",
    "deploy:dev": "npm run build:dev && npm run deploy:target",
    "deploy": "npm run build:prod:strip && npm run deploy:target",
    "deploy:target": "# Your deployment command here"
  },
  "devDependencies": {
    "@craco/craco": "^7.1.0"
  }
}
```

## Next.js Configuration

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer && process.env.STRIP_LOGS === 'true') {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions = {
            ...minimizer.options.terserOptions,
            compress: {
              ...minimizer.options.terserOptions?.compress,
              drop_console: true,
              pure_funcs: ['logger.debug', 'logger.info', 'logger.warn', 'devLog', 'devWarn', 'devError'],
            },
          };
        }
      });
    }
    return config;
  },
};

module.exports = nextConfig;
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:dev": "NODE_ENV=development next build",
    "build:prod": "NODE_ENV=production next build",
    "build:prod:strip": "NODE_ENV=production STRIP_LOGS=true next build",
    "start": "next start",
    "deploy:dev": "npm run build:dev && npm run deploy:target",
    "deploy": "npm run build:prod:strip && npm run deploy:target",
    "deploy:target": "# Your deployment command here (e.g., vercel deploy)"
  }
}
```

## Webpack 5 (Standalone)

### webpack.config.js

```javascript
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isProd = argv.mode === 'production';
  const stripLogs = process.env.STRIP_LOGS === 'true';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: stripLogs,
              drop_debugger: true,
              pure_funcs: stripLogs ? 
                ['logger.debug', 'logger.info', 'logger.warn', 'devLog', 'devWarn', 'devError'] : 
                [],
            },
          },
        }),
      ] : [],
    },
  };
};
```

### package.json Scripts

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "build:prod": "webpack --mode production",
    "build:prod:strip": "STRIP_LOGS=true webpack --mode production",
    "watch": "webpack --mode development --watch",
    "deploy:dev": "npm run build:dev && npm run deploy:target",
    "deploy": "npm run build:prod:strip && npm run deploy:target",
    "deploy:target": "# Your deployment command here"
  }
}
```

## Rollup Configuration

### rollup.config.js

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const stripLogs = process.env.STRIP_LOGS === 'true';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      ...(stripLogs && {
        delimiters: ['', ''],
        values: {
          'logger.debug': '(() => {})',
          'logger.info': '(() => {})',
          'logger.warn': '(() => {})',
          'devLog': '(() => {})',
          'devWarn': '(() => {})',
          'devError': '(() => {})',
        }
      })
    }),
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    isProd && terser({
      compress: {
        drop_console: stripLogs,
        drop_debugger: true,
      },
    }),
  ].filter(Boolean),
};
```

### package.json Scripts

```json
{
  "scripts": {
    "build": "rollup -c",
    "build:dev": "NODE_ENV=development rollup -c",
    "build:prod": "NODE_ENV=production rollup -c",
    "build:prod:strip": "NODE_ENV=production STRIP_LOGS=true rollup -c",
    "watch": "rollup -c -w",
    "deploy:dev": "npm run build:dev && npm run deploy:target",
    "deploy": "npm run build:prod:strip && npm run deploy:target",
    "deploy:target": "# Your deployment command here"
  }
}
```

## Common Deployment Targets

### AWS S3 + CloudFront

```json
{
  "scripts": {
    "deploy:target": "aws s3 sync dist/ s3://your-bucket-name --delete && aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths '/*'"
  }
}
```

### Netlify

```json
{
  "scripts": {
    "deploy:target": "netlify deploy --prod --dir=dist"
  }
}
```

### Vercel

```json
{
  "scripts": {
    "deploy:target": "vercel --prod"
  }
}
```

### GitHub Pages

```json
{
  "scripts": {
    "deploy:target": "gh-pages -d dist"
  }
}
```

## Environment Variables

Create `.env` files for different environments:

### .env.development

```bash
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DEBUG=true
```

### .env.production

```bash
NODE_ENV=production
REACT_APP_API_URL=https://api.production.com
REACT_APP_DEBUG=false
```

## Testing Build Outputs

To verify logging is properly controlled:

### Development Build Test

```bash
npm run build:dev
# Check dist/bundle.js for logger calls - they should be present
grep -c "logger\." dist/bundle.js
# Should return a number > 0
```

### Production Build Test

```bash
npm run build:prod:strip
# Check dist/bundle.js for logger calls - they should be removed
grep -c "logger\." dist/bundle.js
# Should return 0 or very low number (from strings, not actual calls)
```

## CI/CD Pipeline Example (GitHub Actions)

```yaml
name: Deploy

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for Development
      if: github.ref == 'refs/heads/develop'
      run: npm run build:dev
    
    - name: Build for Production
      if: github.ref == 'refs/heads/main'
      run: npm run build:prod:strip
    
    - name: Deploy to Development
      if: github.ref == 'refs/heads/develop'
      run: npm run deploy:dev
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: Deploy to Production
      if: github.ref == 'refs/heads/main'
      run: npm run deploy
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Summary

The key pattern across all build tools:

1. **Development builds** (`deploy:dev`) - Full logging enabled for debugging
2. **Production builds** (`deploy`) - Logging code completely stripped for optimal performance
3. **Environment control** - NODE_ENV controls runtime behavior
4. **Build-time stripping** - STRIP_LOGS flag removes code entirely

Choose the configuration that matches your build tool and customize the deployment target for your infrastructure.