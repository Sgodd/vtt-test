#!/bin/bash

# Simple ZIP Generator for Foundry VTT AI Lore Assistant

echo "📦 Creating release ZIP file..."

# Configuration
MODULE_NAME="lore-assistant"
VERSION=$(grep '"version"' module.json | sed 's/.*"version": "\(.*\)".*/\1/')
ZIP_NAME="${MODULE_NAME}.zip"

echo "🏷️  Module version: $VERSION"

# Remove existing zip if it exists
if [ -f "$ZIP_NAME" ]; then
    echo "🗑️  Removing existing $ZIP_NAME"
    rm "$ZIP_NAME"
fi

# Create the zip file with all necessary files
echo "🗜️  Creating $ZIP_NAME..."

zip -r "$ZIP_NAME" \
    scripts/ \
    styles/ \
    templates/ \
    lang/ \
    module.json \
    README.md \
    CHANGELOG.md \
    LICENSE

echo ""
echo "✅ Release ZIP created: $ZIP_NAME"
echo ""
echo "� Manual upload instructions:"
echo "1. Go to: https://github.com/sgodd/vtt-test/releases"
echo "2. Click 'Create a new release'"
echo "3. Tag version: v${VERSION}"
echo "4. Release title: AI Lore Assistant v${VERSION}"
echo "5. Upload BOTH files as assets:"
echo "   📄 module.json (drag the module.json file from this directory)"
echo "   📦 $ZIP_NAME (drag the generated zip file)"
echo "6. Publish the release"
echo ""
echo "� After publishing, your URLs will be:"
echo "   Manifest: https://github.com/sgodd/vtt-test/releases/latest/download/module.json"
echo "   Download: https://github.com/sgodd/vtt-test/releases/latest/download/$ZIP_NAME"
