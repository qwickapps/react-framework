#!/bin/bash

# Script to fix common lint errors in qwickapps-react-framework

set -e

SRCDIR="/Users/raajkumars/Projects/qwickapps/packages/qwickapps-react-framework/src"

echo "Fixing lint errors in production code..."

# Find all TypeScript/TSX files except tests and stories
FILES=$(find "$SRCDIR" -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/__tests__/*" \
  ! -name "*.test.ts" \
  ! -name "*.test.tsx" \
  ! -name "*.stories.ts" \
  ! -name "*.stories.tsx")

for file in $FILES; do
  echo "Processing: $file"

  # Fix 1: Replace `: any` with `: unknown` in parameter types and variable declarations
  # But be careful not to replace in comments or strings
  sed -i '' 's/\(: \)any\(\[\]\)/\1unknown\2/g' "$file"
  sed -i '' 's/\(: \)any\()\)/\1unknown\2/g' "$file"
  sed -i '' 's/\(: \)any\(;\)/\1unknown\2/g' "$file"
  sed -i '' 's/\(: \)any\( =\)/\1unknown\2/g' "$file"
  sed -i '' 's/\(: \)any\(,\)/\1unknown\2/g' "$file"
  sed -i '' 's/<any>/<unknown>/g' "$file"

  # Fix 2: Replace (foo as any) with (foo as Record<string, unknown>) for object contexts
  sed -i '' 's/(\([^)]*\) as any)\[/(\1 as Record<string, unknown>)[/g' "$file"

  # Fix 3: Replace Record<string, any> with Record<string, unknown>
  sed -i '' 's/Record<string, any>/Record<string, unknown>/g' "$file"
  sed -i '' 's/Record<\([^,]*\), any>/Record<\1, unknown>/g' "$file"

  # Fix 4: Replace @ts-ignore with @ts-expect-error
  sed -i '' 's/@ts-ignore/@ts-expect-error/g' "$file"

  # Fix 5: Fix no-sparse-arrays by removing double commas
  sed -i '' 's/\[\([^]]*\),\s*,\s*/[\1, /g' "$file"

  # Fix 6: Replace .hasOwnProperty with Object.prototype.hasOwnProperty.call
  sed -i '' 's/\([a-zA-Z0-9_]*\)\.hasOwnProperty(\([^)]*\))/Object.prototype.hasOwnProperty.call(\1, \2)/g' "$file"
done

echo "Done fixing common patterns. Some errors may still require manual fixes."
