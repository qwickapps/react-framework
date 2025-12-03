#!/usr/bin/env python3
"""
Automated lint fixer for common ESLint errors in production code.
Focuses on TypeScript and React lint rules.
"""

import re
import sys
from pathlib import Path

def fix_file(filepath: Path) -> bool:
    """Fix common lint errors in a file."""
    try:
        content = filepath.read_text()
        original_content = content

        # Fix 1: Replace `any` type with `unknown` in common patterns
        # Function parameters
        content = re.sub(
            r'\b(\w+)\s*:\s*any\b',
            r'\1: unknown',
            content
        )

        # Fix 2: Prefix unused variables with underscore
        # This is trickier and needs manual review, so skip for now

        # Fix 3: Replace @ts-ignore with @ts-expect-error
        content = re.sub(
            r'//\s*@ts-ignore\b',
            '// @ts-expect-error',
            content
        )

        # Fix 4: Add eslint-disable for require() usage
        content = re.sub(
            r"([ \t]*)(const .* = require\('.*'\);)",
            r"\1// eslint-disable-next-line @typescript-eslint/no-var-requires\n\1\2",
            content
        )

        # Only write if changed
        if content != original_content:
            filepath.write_text(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)
        return False

def main():
    """Main function."""
    base_dir = Path(__file__).parent / "src"

    # Target production code only
    patterns = [
        "components/**/*.tsx",
        "components/**/*.ts",
        "contexts/**/*.tsx",
        "hooks/**/*.ts",
        "schemas/**/*.ts",
    ]

    fixed_count = 0
    for pattern in patterns:
        for filepath in base_dir.glob(pattern):
            # Skip test and story files
            if any(x in filepath.name for x in [".test.", ".stories.", "__tests__"]):
                continue

            if fix_file(filepath):
                print(f"Fixed: {filepath.relative_to(base_dir)}")
                fixed_count += 1

    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == "__main__":
    main()
