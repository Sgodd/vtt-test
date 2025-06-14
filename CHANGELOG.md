# Changelog

All notable changes to the AI Lore Assistant module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-06-14

### Added

-   Initial release of AI Lore Assistant
-   OpenAI API integration with support for multiple models (GPT-3.5, GPT-4, GPT-4 Turbo, GPT-4o)
-   Interactive UI with tabbed interface (Generator, History, Settings)
-   Quick action buttons for common content types:
    -   Random NPC generation
    -   Tavern descriptions
    -   Quest hooks
    -   Location descriptions
    -   Organization creation
    -   Mystery generation
-   Conversation history with persistent storage
-   Export conversation history to markdown files
-   Copy responses to clipboard functionality
-   Create journal entries directly from generated content
-   Integration with actor and item sheets (Generate Lore buttons)
-   Chat command support (`/lore` command)
-   Sidebar button for easy access
-   Comprehensive settings panel with:
    -   API key configuration
    -   Model selection
    -   Token limit controls
    -   Temperature/creativity controls
    -   Response format options
    -   Auto-save preferences
-   World-aware context system that considers:
    -   Existing actors and their types
    -   Scene names
    -   Journal entries
    -   Game system
-   Connection testing functionality
-   Responsive design for different screen sizes
-   Localization support (English included)
-   Comprehensive documentation and usage guides

### Features

-   **AI-Powered Content Generation**: Generate rich, contextual lore using OpenAI's language models
-   **Context Awareness**: Considers existing world content for consistency
-   **Modern UI**: Clean, intuitive interface with proper Foundry VTT styling
-   **Flexible Configuration**: Extensive settings for customizing AI behavior
-   **Content Management**: Easy saving, copying, and organizing of generated content
-   **Integration**: Seamless integration with Foundry VTT's actor and item systems
-   **Cost Management**: Token limits and model selection for cost control

### Technical Details

-   Compatible with Foundry VTT v11, v12, and v13
-   ES6 module architecture
-   Handlebars templating
-   CSS custom properties for theming
-   Proper error handling and user feedback
-   Security considerations for API key storage

[Unreleased]: https://github.com/sgodd/foundry-vtt-lore-assistant/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/sgodd/foundry-vtt-lore-assistant/releases/tag/v0.1.0
