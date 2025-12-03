#!/bin/bash
#
# QwickApps React Framework - Project Creation Script
# Convenience wrapper for the main creation script
#

echo "🚀 QwickApps React Framework - Project Creator"
echo "=============================================="
echo ""

# Check if project name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a project name"
    echo ""
    echo "Usage:"
    echo "  ./scripts/create-project.sh my-project-name"
    echo "  OR"
    echo "  npx @qwickapps/react-framework/scripts/create-qwickapps-project my-project-name"
    echo ""
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the main Node.js script
echo "Starting project creation..."
node "$SCRIPT_DIR/create-qwickapps-project.js" "$1"