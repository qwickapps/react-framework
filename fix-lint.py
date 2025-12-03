#!/usr/bin/env python3
"""
Intelligent lint fixer for qwickapps-react-framework
Analyzes lint errors and fixes them contextually
"""

import re
import subprocess
import sys
from pathlib import Path

def get_lint_errors():
    """Run lint and parse errors"""
    result = subprocess.run(
        ['npm', 'run', 'lint:framework'],
        capture_output=True,
        text=True,
        cwd='/Users/raajkumars/Projects/qwickapps'
    )

    errors = []
    current_file = None

    for line in result.stdout.split('\n') + result.stderr.split('\n'):
        if line.startswith('/Users'):
            current_file = line.strip()
        elif current_file and 'error' in line:
            parts = line.strip().split()
            if len(parts) >= 3:
                location = parts[0]
                errors.append({
                    'file': current_file,
                    'location': location,
                    'line': line
                })

    return errors

def fix_unused_vars(file_path, errors):
    """Fix unused variable errors"""
    with open(file_path, 'r') as f:
        content = f.read()
        lines = content.split('\n')

    modified = False
    for error in errors:
        if 'no-unused-vars' in error['line']:
            line_num = int(error['location'].split(':')[0]) - 1
            if line_num < len(lines):
                line = lines[line_num]

                # Fix unused imports
                if "'screen' is defined but never used" in error['line']:
                    lines[line_num] = re.sub(r',\s*screen', '', line)
                    lines[line_num] = re.sub(r'screen,\s*', '', lines[line_num])
                    modified = True
                elif "'render' is defined but never used" in error['line']:
                    lines[line_num] = re.sub(r',\s*render', '', line)
                    lines[line_num] = re.sub(r'render,\s*', '', lines[line_num])
                    modified = True
                # Fix unused destructured vars
                elif "'container' is assigned a value but never used" in error['line']:
                    lines[line_num] = re.sub(r'container', '_container', line)
                    modified = True
                elif  "'_container' is assigned a value but never used" in error['line']:
                    # Remove it entirely from destructuring
                    lines[line_num] = re.sub(r',\s*container:\s*_container', '', line)
                    lines[line_num] = re.sub(r'container:\s*_container,\s*', '', lines[line_num])
                    modified = True

    if modified:
        with open(file_path, 'w') as f:
            f.write('\n'.join(lines))
        return True
    return False

def fix_any_types(file_path, errors):
    """Fix 'any' type errors"""
    with open(file_path, 'r') as f:
        content = f.read()

    modified = False

    # Common patterns to fix
    patterns = [
        # Mock function types
        (r':\s*any;', ': unknown;', lambda c: 'mock' in c.lower() or 'Mock' in c),
        # as any assertions
        (r'\)\s*as\s*any;', ') as unknown;', lambda c: True),
        # Window assertions for tests
        (r'\(window as any\)', '(window as Window & typeof globalThis)', lambda c: 'window' in c),
    ]

    for pattern, replacement, condition in patterns:
        if condition(content):
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                content = new_content
                modified = True

    if modified:
        with open(file_path, 'w') as f:
            f.write(content)
        return True
    return False

def main():
    print("Analyzing lint errors...")
    errors = get_lint_errors()

    if not errors:
        print("No errors found!")
        return 0

    print(f"Found {len(errors)} errors")

    # Group errors by file
    files_with_errors = {}
    for error in errors:
        file_path = error['file']
        if file_path not in files_with_errors:
            files_with_errors[file_path] = []
        files_with_errors[file_path].append(error)

    fixed_count = 0
    for file_path, file_errors in files_with_errors.items():
        if fix_unused_vars(file_path, file_errors):
            print(f"Fixed unused vars in {Path(file_path).name}")
            fixed_count += 1
        if fix_any_types(file_path, file_errors):
            print(f"Fixed any types in {Path(file_path).name}")
            fixed_count += 1

    print(f"\nFixed issues in {fixed_count} files")
    return 0

if __name__ == '__main__':
    sys.exit(main())
