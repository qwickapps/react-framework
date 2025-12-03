#!/usr/bin/env python3
"""
Comprehensive automated lint fixer for production code.
"""

import re
import subprocess
import sys
from pathlib import Path

def get_lint_errors(base_dir):
    """Get lint errors from eslint output."""
    result = subprocess.run(
        ['npm', 'run', 'lint:framework'],
        cwd=base_dir,
        capture_output=True,
        text=True
    )

    # Parse output for errors
    errors_by_file = {}
    current_file = None

    for line in result.stdout.split('\n') + result.stderr.split('\n'):
        # Skip test/story files
        if '__tests__' in line or '.test.' in line or '.stories.' in line:
            continue

        # File path line
        if line.startswith('/') and line.endswith(('.ts', '.tsx')):
            current_file = line.strip()
            errors_by_file[current_file] = []
        # Error line
        elif current_file and ':' in line and 'error' in line:
            errors_by_file[current_file].append(line.strip())

    return errors_by_file

def fix_unused_vars_in_destructuring(content):
    """Fix unused variables in destructuring by prefixing with underscore."""
    # Pattern: const { foo, bar } = obj; where foo is unused
    # This is complex and error-prone, so we'll be conservative
    return content

def fix_any_types(content):
    """Replace 'any' with 'unknown' in type annotations."""
    # Function parameters: name: any
    content = re.sub(
        r'\b(\w+)\s*:\s*any\b(?!\[\])',  # Don't match any[]
        r'\1: unknown',
        content
    )

    # Return types: ): any
    content = re.sub(
        r'\):\s*any\b(?!\[\])',
        r'): unknown',
        content
    )

    # Type aliases: type Foo = any
    content = re.sub(
        r'(type\s+\w+\s*=\s*)any\b',
        r'\1unknown',
        content
    )

    # Generic parameters: Array<any>
    content = re.sub(
        r'<any>',
        '<unknown>',
        content
    )

    # Interface/type properties: prop: any
    content = re.sub(
        r'(\s+\w+\??\s*:\s*)any\b(?!\[\])',
        r'\1unknown',
        content
    )

    return content

def fix_unused_function_params(content):
    """Prefix unused function parameters with underscore."""
    # This requires analyzing which params are actually unused
    # For now, we'll skip this as it needs semantic analysis
    return content

def fix_case_declarations(content):
    """Wrap case blocks with declarations in braces."""
    lines = content.split('\n')
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if this is a case statement
        if re.match(r'\s*case\s+', line):
            # Check if next line has a declaration
            if i + 1 < len(lines):
                next_line = lines[i + 1]
                if re.match(r'\s*(const|let|var)\s+', next_line):
                    # Find the break/return for this case
                    indent = len(line) - len(line.lstrip())
                    result.append(line + ' {')
                    i += 1

                    # Add lines until we find break/return
                    while i < len(lines):
                        current = lines[i]
                        result.append(current)

                        if 'break' in current or 'return' in current:
                            # Close the block
                            result.append(' ' * indent + '}')
                            break
                        i += 1
                    i += 1
                    continue

        result.append(line)
        i += 1

    return '\n'.join(result)

def fix_file(filepath):
    """Apply automated fixes to a file."""
    try:
        content = filepath.read_text()
        original_content = content

        # Apply fixes
        content = fix_any_types(content)
        # content = fix_case_declarations(content)  # Skip for now, too risky

        # Write back if changed
        if content != original_content:
            filepath.write_text(content)
            return True

        return False
    except Exception as e:
        print(f"Error fixing {filepath}: {e}", file=sys.stderr)
        return False

def main():
    base_dir = Path(__file__).parent
    src_dir = base_dir / 'src'

    # Find all production TypeScript files
    patterns = [
        'components/**/*.tsx',
        'components/**/*.ts',
        'contexts/**/*.tsx',
        'hooks/**/*.ts',
        'schemas/**/*.ts',
        'config/**/*.ts',
    ]

    fixed_count = 0
    for pattern in patterns:
        for filepath in src_dir.glob(pattern):
            # Skip test and story files
            if any(x in str(filepath) for x in ['__tests__', '.test.', '.stories.']):
                continue

            if fix_file(filepath):
                print(f"Fixed: {filepath.relative_to(src_dir)}")
                fixed_count += 1

    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == '__main__':
    main()
