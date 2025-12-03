const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const srcDir = path.join(__dirname, '../src');

console.log('🎨 Bundling QwickApp Framework CSS...');

try {
    // Read all CSS from dist/index.css but replace the @import with actual content
    const mainCss = fs.readFileSync(path.join(distDir, 'index.css'), 'utf8');
    const palettesCss = fs.readFileSync(path.join(srcDir, 'palettes/index.css'), 'utf8');

    // Replace the @import line with the actual content
    const bundledCss = mainCss.replace('@import "../palettes/index.css";', palettesCss);

    // Write the bundled CSS
    const outputFile = path.join(distDir, 'index.bundled.css');
    fs.writeFileSync(outputFile, bundledCss);

    console.log(`✅ Created bundled CSS: ${outputFile}`);
    console.log(`📊 Size: ${(bundledCss.length / 1024).toFixed(2)} KB`);
    console.log('🎉 CSS bundling complete!');
} catch (error) {
    console.error('❌ Error bundling CSS:', error.message);
    process.exit(1);
}