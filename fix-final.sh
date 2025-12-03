#!/bin/bash
# Final automated fixes for common lint errors

SRC_DIR="./src"

# Function to remove unused imports
fix_unused_imports() {
    local file="$1"

    # Remove unused ComponentTransformer import
    sed -i '' '/^import.*ComponentTransformer.*from/d' "$file" 2>/dev/null || true

    # Remove unused Paper import
    sed -i '' 's/import { \([^}]*\), Paper\([^}]*\) } from/import { \1\2 } from/g' "$file" 2>/dev/null || true
    sed -i '' 's/import { Paper, \([^}]*\) } from/import { \1 } from/g' "$file" 2>/dev/null || true
    sed -i '' 's/import { Paper } from.*$//' "$file" 2>/dev/null || true

    # Remove unused Divider import
    sed -i '' 's/import { \([^}]*\), Divider\([^}]*\) } from/import { \1\2 } from/g' "$file" 2>/dev/null || true
    sed -i '' 's/import { Divider, \([^}]*\) } from/import { \1 } from/g' "$file" 2>/dev/null || true
    sed -i '' 's/import { Divider } from.*$//' "$file" 2>/dev/null || true

    # Remove unused ModelView import
    sed -i '' '/^import.*ModelView.*from/d' "$file" 2>/dev/null || true

    # Clean up any resulting empty imports or double commas
    sed -i '' 's/{ , /{ /g' "$file" 2>/dev/null || true
    sed -i '' 's/, , /, /g' "$file" 2>/dev/null || true
    sed -i '' 's/, }/}/g' "$file" 2>/dev/null || true
    sed -i '' 's/{ }//' "$file" 2>/dev/null || true
}

# Find and fix all production TypeScript/TSX files
find "$SRC_DIR" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    ! -path "*/__tests__/*" \
    ! -name "*.test.*" \
    ! -name "*.stories.*" \
    -print0 | while IFS= read -r -d '' file; do

    echo "Processing: $file"
    fix_unused_imports "$file"
done

echo "Done!"
