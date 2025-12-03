# QwickApps React Framework - Quick Start Guide

## The Problem We Solved

Customers were getting the error: `'react-scripts' is not recognized as an internal or external command` because they were trying to use QwickApps React Framework directly without first setting up a React project.

**QwickApps React Framework is a React component library**, not a project generator. It requires an existing React project to work.

## Solutions

### 🚀 Option 1: Quick Start Script (Recommended)

Create a new QwickApps project in one command:

```bash
npx @qwickapps/react-framework create my-project-name
cd my-project-name
npm start
```

This will:
1. Create a new React app with TypeScript
2. Install QwickApps React Framework and all dependencies
3. Set up a complete QwickApps application template
4. Your app runs at `http://localhost:3000`

### 📦 Option 2: Manual Setup

If you have an existing React project:

```bash
npm install @qwickapps/react-framework @emotion/react @emotion/styled @mui/material @mui/icons-material react-router-dom
```

Then follow the [manual setup guide](./README.md#manual-setup-for-existing-react-projects).

### 🔧 Option 3: Create React App First

```bash
npx create-react-app my-project --template typescript
cd my-project
npm install @qwickapps/react-framework @emotion/react @emotion/styled @mui/material @mui/icons-material react-router-dom
```

## What's Included

Your new QwickApps project includes:

- ✅ **React 18** with TypeScript
- ✅ **QwickApps React Framework** with all components
- ✅ **Material-UI** for icons and components
- ✅ **Emotion** for styling
- ✅ **React Router** for navigation
- ✅ **Pre-configured template** with:
  - Hero section
  - Theme switching (light/dark)
  - Palette switching (multiple color schemes)
  - Responsive design
  - Accessibility support

## Next Steps

1. **Start developing**: Your app is ready to extend with more QwickApps components
2. **Explore components**: Check the [README](./README.md) for all available components
3. **Customize themes**: Try the theme and palette switchers
4. **Add features**: Import more components from `@qwickapps/react-framework`

## Troubleshooting

- **Node.js Version**: Use Node.js 16 or later
- **Clear Cache**: `npm cache clean --force` if installation fails
- **Dependency Issues**: Delete `node_modules` and `package-lock.json`, then `npm install`

## Support

- [GitHub Issues](https://github.com/raajkumars/qwickapps/issues)
- [Documentation](./README.md)
- [Component Examples](./docs/)

---

**Happy coding with QwickApps! 🚀**