#!/usr/bin/env node
/**
 * Automated lint fixer for qwickapps-react-framework
 * Fixes common lint errors systematically
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Pattern replacements for common fixes
const patterns = [
  // Fix TestWrapper dataProvider: any -> DataProvider | undefined
  {
    pattern: /dataProvider\?: any/g,
    replacement: 'dataProvider?: DataProvider | undefined',
    description: 'Fix TestWrapper dataProvider type'
  },
  // Fix as any -> as unknown in mocks
  {
    pattern: /(\w+): any;/g,
    replacement: '$1: unknown;',
    description: 'Replace any with unknown in type annotations',
    conditional: (line) => line.includes('Mock') || line.includes('mock')
  },
  // Fix unused containers - prefix with _
  {
    pattern: /const { container,/g,
    replacement: 'const { container: _container,',
    description: 'Prefix unused container variables'
  },
  {
    pattern: /const { container }/g,
    replacement: 'const { container: _container }',
    description: 'Prefix unused container variables (standalone)'
  },
  // Fix unused screen imports
  {
    pattern: /import \{ render, screen \} from '@testing-library\/react'/g,
    replacement: "import { render } from '@testing-library/react'",
    description: 'Remove unused screen import',
    conditional: (content) => !content.includes('screen.') && !content.includes('screen,')
  },
  // Fix hasOwnProperty -> Object.prototype.hasOwnProperty.call
  {
    pattern: /(\w+)\.hasOwnProperty\(([^)]+)\)/g,
    replacement: 'Object.prototype.hasOwnProperty.call($1, $2)',
    description: 'Fix hasOwnProperty usage'
  }
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  patterns.forEach(({ pattern, replacement, description, conditional }) => {
    if (conditional && !conditional(content)) {
      return;
    }

    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      console.log(`  ✓ ${description}`);
      content = newContent;
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// Get all TypeScript/TSX files in src directory
const srcDir = path.join(__dirname, 'src');
const files = glob.sync('**/*.{ts,tsx}', { cwd: srcDir, absolute: true });

console.log(`Processing ${files.length} files...\n`);

let modifiedCount = 0;
files.forEach(file => {
  const relativePath = path.relative(srcDir, file);
  const wasModified = fixFile(file);
  if (wasModified) {
    console.log(`Modified: ${relativePath}\n`);
    modifiedCount++;
  }
});

console.log(`\nTotal files modified: ${modifiedCount}`);
