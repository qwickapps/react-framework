# Clean Environment Validation Test

This directory contains tests that validate `@qwickapps/react-framework` can be installed and used correctly in a completely clean environment.

## Purpose

Before publishing to npm, we need to ensure:

1. **All exports work** - Components, hooks, utilities are properly exported
2. **TypeScript types resolve** - No missing type definitions
3. **Peer dependencies are correct** - Package works with declared peer deps
4. **CSS imports work** - Styles are bundled and importable
5. **No hidden dependencies** - Package doesn't rely on monorepo internals

## Running the Validation

```bash
# From the package root
npm run validate:clean-install

# Or directly
./qa/clean-install/validate.sh
```

## What It Does

1. **Builds both packages** - `@qwickapps/schema` and `@qwickapps/react-framework`
2. **Creates npm tarballs** - Simulates what npm publish would create
3. **Runs Docker container** - Fresh Node.js environment
4. **Creates Vite React project** - Standard React + TypeScript setup
5. **Installs packages** - From local tarballs (like npm would)
6. **Builds the project** - TypeScript compilation + Vite bundling

If any step fails, the validation fails and publishing should be blocked.

## Test Application

The `test-app.tsx` file imports and uses major components:

- `QwickApp`, `Scaffold` - Core layout
- `HeroBlock`, `Section`, `FeatureGrid` - Content blocks
- `Button`, `ThemeSwitcher`, `PaletteSwitcher` - Interactive components
- `TextInputField`, `SelectInputField` - Form components
- `Html`, `Markdown`, `Code`, `Text` - Content rendering
- `Footer` - Page footer

## Requirements

- Docker must be installed and running
- Package must be buildable (`npm run build` must pass)

## Troubleshooting

### "Module has no exported member"
An export is missing from `src/components/index.ts` or the component uses default export without a named re-export.

### "Property does not exist on type"
The TypeScript interface doesn't match what's documented. Check the actual prop names in the component source.

### "Cannot find module"
CSS or package import path is incorrect. Verify the `exports` field in `package.json`.
