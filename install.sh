#!/bin/bash

# AI Lore Assistant Installation Script for Foundry VTT

echo "🔧 Installing AI Lore Assistant to Foundry VTT..."

# Detect OS and set Foundry data path
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    FOUNDRY_DATA="$HOME/Library/Application Support/FoundryVTT/Data"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    FOUNDRY_DATA="$HOME/.local/share/FoundryVTT/Data"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash)
    FOUNDRY_DATA="$LOCALAPPDATA/FoundryVTT/Data"
else
    echo "❌ Unsupported operating system: $OSTYPE"
    exit 1
fi

MODULES_DIR="$FOUNDRY_DATA/modules"
MODULE_NAME="foundry-vtt-lore-assistant"
TARGET_DIR="$MODULES_DIR/$MODULE_NAME"

# Check if Foundry data directory exists
if [ ! -d "$FOUNDRY_DATA" ]; then
    echo "❌ Foundry VTT data directory not found at: $FOUNDRY_DATA"
    echo "   Please make sure Foundry VTT is installed and has been run at least once."
    exit 1
fi

# Create modules directory if it doesn't exist
mkdir -p "$MODULES_DIR"

# Get the directory of this script (where the module files are)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📁 Source: $SCRIPT_DIR"
echo "📁 Target: $TARGET_DIR"

# Ask user for installation method
echo ""
echo "Choose installation method:"
echo "1) Copy files (recommended for distribution)"
echo "2) Create symbolic link (recommended for development)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "📦 Copying module files..."
        if [ -d "$TARGET_DIR" ]; then
            echo "⚠️  Module directory already exists. Removing old version..."
            rm -rf "$TARGET_DIR"
        fi
        cp -r "$SCRIPT_DIR" "$TARGET_DIR"
        echo "✅ Module copied successfully!"
        ;;
    2)
        echo "🔗 Creating symbolic link..."
        if [ -e "$TARGET_DIR" ]; then
            echo "⚠️  Target already exists. Removing..."
            rm -rf "$TARGET_DIR"
        fi
        ln -s "$SCRIPT_DIR" "$TARGET_DIR"
        echo "✅ Symbolic link created successfully!"
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "🎉 Installation complete!"
echo ""
echo "Next steps:"
echo "1. Start or restart Foundry VTT"
echo "2. Create or enter a world"
echo "3. Go to 'Manage Modules' in the world"
echo "4. Enable 'AI Lore Assistant'"
echo "5. Get an OpenAI API key from https://platform.openai.com/api-keys"
echo "6. Configure the module settings with your API key"
echo ""
echo "📖 See README.md for detailed usage instructions"
