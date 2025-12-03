#!/usr/bin/env node

/**
 * Build Palettes Script
 * - Adds version numbers to filenames
 * - Generates minified versions
 * - Updates manifest.json with new filenames
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src/palettes');
const DIST_DIR = path.join(__dirname, '../dist/palettes');
const PACKAGE_JSON = path.join(__dirname, '../package.json');

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
const VERSION = packageJson.version;

console.log(`Building palettes v${VERSION}...`);

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Simple CSS minifier
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace around selectors and braces
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    // Remove empty rules
    .replace(/[^{}]+\{\}/g, '')
    // Trim
    .trim();
}

// Convert PascalCase to kebab-case (PaletteAutumn -> palette-autumn)
function toKebabCase(str) {
  return str
    .replace(/^Palette/, '')  // Remove 'Palette' prefix
    .replace(/([a-z])([A-Z])/g, '$1-$2')  // Add hyphen before capitals
    .toLowerCase();
}

// Process palette files
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.css') && f.startsWith('Palette'));

files.forEach(file => {
  const baseName = file.replace('.css', '');
  const paletteId = toKebabCase(baseName);  // e.g., 'autumn'
  const content = fs.readFileSync(path.join(SRC_DIR, file), 'utf-8');

  // Generate filenames using kebab-case pattern
  const versionedName = `palette-${paletteId}.${VERSION}.css`;
  const versionedMinName = `palette-${paletteId}.${VERSION}.min.css`;
  const latestName = `palette-${paletteId}.latest.css`;
  const latestMinName = `palette-${paletteId}.latest.min.css`;

  // Write versioned files
  fs.writeFileSync(path.join(DIST_DIR, versionedName), content);
  console.log(`✓ ${versionedName}`);

  const minified = minifyCSS(content);
  fs.writeFileSync(path.join(DIST_DIR, versionedMinName), minified);
  console.log(`✓ ${versionedMinName}`);

  // Write latest aliases (same content as versioned)
  fs.writeFileSync(path.join(DIST_DIR, latestName), content);
  console.log(`✓ ${latestName}`);

  fs.writeFileSync(path.join(DIST_DIR, latestMinName), minified);
  console.log(`✓ ${latestMinName}`);
});

// Copy and update manifest.json
const manifestPath = path.join(SRC_DIR, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// Update version
manifest.version = VERSION;

// Update file references with kebab-case versioned names
manifest.palettes = manifest.palettes.map(palette => {
  const paletteId = palette.id;  // e.g., 'autumn', 'default'
  return {
    ...palette,
    version: VERSION,
    file: `palette-${paletteId}.${VERSION}.css`,
    fileMinified: `palette-${paletteId}.${VERSION}.min.css`,
    fileLatest: `palette-${paletteId}.latest.css`,
    fileLatestMinified: `palette-${paletteId}.latest.min.css`
  };
});

// Write updated manifest
fs.writeFileSync(
  path.join(DIST_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log(`✓ manifest.json (updated with kebab-case versioned filenames)`);

// Copy index.css if it exists
const indexCss = path.join(SRC_DIR, 'index.css');
if (fs.existsSync(indexCss)) {
  fs.copyFileSync(indexCss, path.join(DIST_DIR, 'index.css'));
  console.log(`✓ index.css`);
}

console.log('\n✅ Palette build complete!');
console.log(`   ${files.length} palettes × 4 versions each:`);
console.log(`   - palette-{id}.${VERSION}.css (versioned)`);
console.log(`   - palette-{id}.${VERSION}.min.css (versioned minified)`);
console.log(`   - palette-{id}.latest.css (latest alias)`);
console.log(`   - palette-{id}.latest.min.css (latest minified alias)`);
