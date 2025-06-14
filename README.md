# AI Lore Assistant for Foundry VTT

An intelligent lore assistant module for Foundry VTT that uses OpenAI's GPT models to help Game Masters and players create rich, immersive world-building content.

## Features

-   **🤖 AI-Powered Content Generation**: Generate NPCs, locations, quest hooks, organizations, and more
-   **🎯 Context-Aware**: Considers your world's existing content for consistency
-   **⚡ Quick Actions**: Pre-built prompts for common content types
-   **📚 Conversation History**: Keep track of all generated content
-   **📖 Journal Integration**: Easily save generated content as journal entries
-   **🎭 Actor/Item Integration**: Generate lore directly from character and item sheets
-   **💬 Chat Commands**: Use `/lore` command for quick access
-   **🎨 Modern UI**: Clean, intuitive interface with tabbed organization

## Installation

### Method 1: Module Browser (Recommended)

1. Open Foundry VTT and go to the "Add-on Modules" tab
2. Click "Install Module"
3. Search for "AI Lore Assistant" and click "Install"

### Method 2: Manifest URL

1. Open Foundry VTT and go to the "Add-on Modules" tab
2. Click "Install Module"
3. Paste this manifest URL: `https://github.com/sgodd/foundry-vtt-lore-assistant/releases/latest/download/module.json`
4. Click "Install"

### Method 3: Manual Installation

1. Download the latest release from [GitHub](https://github.com/sgodd/foundry-vtt-lore-assistant/releases)
2. Extract the files to your Foundry VTT modules folder
3. Restart Foundry VTT

## Setup

### 1. Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key (starts with `sk-`)

### 2. Configure the Module

1. Enable the module in your world
2. Click the book icon in the sidebar or use the Settings tab
3. Enter your OpenAI API key
4. Choose your preferred model (GPT-3.5 Turbo recommended for most users)
5. Adjust other settings as needed
6. Click "Test Connection" to verify setup

## Usage

### Opening the Assistant

-   **Sidebar Button**: Click the book icon in the left sidebar
-   **Chat Command**: Type `/lore [your query]` in chat
-   **Actor Sheets**: Click "Generate Lore" button on character sheets
-   **Item Sheets**: Click "Generate Lore" button on item sheets

### Quick Actions

Use the quick action buttons for common content types:

-   **Random NPC**: Generate a character with background and personality
-   **Tavern**: Create a tavern with atmosphere and patrons
-   **Quest Hook**: Generate adventure seeds and plot hooks
-   **Location**: Describe interesting places with history
-   **Organization**: Create factions with goals and members
-   **Mystery**: Generate intrigue suitable for campaigns

### Custom Prompts

Be specific for better results:

-   ❌ "Make an NPC"
-   ✅ "Create a mysterious elven merchant who sells rare magical components and has connections to the Shadowfell"

### Managing Content

-   **Copy Responses**: Click the copy button to copy text to clipboard
-   **Create Journal Entries**: Click the book button to save as journal entries
-   **Export Conversations**: Export your session history as a markdown file
-   **Clear History**: Remove all conversation history when needed

## Models and Pricing

The module supports several OpenAI models with different capabilities and costs:

| Model         | Speed  | Quality   | Cost (per 1K tokens) |
| ------------- | ------ | --------- | -------------------- |
| GPT-3.5 Turbo | Fast   | Good      | ~$0.001-0.002        |
| GPT-4         | Slow   | Excellent | ~$0.03-0.06          |
| GPT-4 Turbo   | Medium | Excellent | ~$0.01-0.03          |
| GPT-4o        | Fast   | Excellent | ~$0.005-0.015        |

**Typical Usage**: A standard response uses 200-800 tokens, costing $0.001-0.05 depending on the model.

## Configuration Options

### Basic Settings

-   **API Key**: Your OpenAI API key (required)
-   **Model**: Which AI model to use
-   **Max Tokens**: Maximum response length (100-4000)
-   **Temperature**: Creativity level (0-2, default 0.8)

### Advanced Settings

-   **Auto-save Responses**: Automatically create journal entries
-   **Response Format**: Markdown, HTML, or plain text output

## Tips for Best Results

### Writing Effective Prompts

-   Be specific about what you want
-   Include context about your campaign setting
-   Mention the tone or style you prefer
-   Ask for specific details (names, motivations, hooks)

### Examples of Good Prompts

```
"Create a dwarven blacksmith named Thorin who secretly forges weapons for a rebel group opposing the tyrannical king. Include his workshop description and a reason players might seek him out."

"Describe the Whispering Woods, a haunted forest where the trees themselves seem to speak. Include local legends and a specific mystery for players to investigate."

"Generate a corrupt noble family that controls the city's trade routes. Include family members, their scheme, and how players might get involved."
```

### World Consistency

The assistant considers your world's:

-   Existing actors and their names/types
-   Scene names and locations
-   Journal entries and lore
-   Game system being used

## Troubleshooting

### Common Issues

**"Please configure your API key" message**

-   Ensure you've entered a valid OpenAI API key in settings
-   API keys start with `sk-` and are about 51 characters long

**"Connection failed" error**

-   Check your internet connection
-   Verify your API key is correct and active
-   Ensure you have credits in your OpenAI account

**Responses are too short/long**

-   Adjust the "Max Tokens" setting (higher = longer responses)
-   Modify your prompts to be more or less specific

**Responses don't fit your world**

-   Add more specific context to your prompts
-   Create journal entries with your world's lore for the AI to reference

### Performance Tips

-   Use GPT-3.5 Turbo for faster, cheaper responses
-   Adjust temperature lower (0.3-0.5) for more focused responses
-   Clear conversation history periodically to improve context

## Privacy and Security

-   API keys are stored locally in your Foundry world
-   Conversation history is stored locally, not sent to external servers
-   Only your prompts and responses are sent to OpenAI's API
-   No personal data is collected by this module

## Support

-   **Issues**: [GitHub Issues](https://github.com/sgodd/foundry-vtt-lore-assistant/issues)
-   **Discussions**: [GitHub Discussions](https://github.com/sgodd/foundry-vtt-lore-assistant/discussions)
-   **Discord**: Find me as `sgodd` on various Foundry VTT Discord servers

## License

This module is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Changelog

### Version 0.1.0

-   Initial release
-   Basic AI content generation
-   OpenAI API integration
-   Conversation history
-   Journal entry creation
-   Quick action buttons
-   Chat command support
-   Actor/Item sheet integration

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on how to contribute to this project.

## Acknowledgments

-   Built for the amazing Foundry VTT community
-   Powered by OpenAI's excellent language models
-   Inspired by the creativity of Game Masters everywhere
