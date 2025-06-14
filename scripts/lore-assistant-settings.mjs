export class LoreAssistantSettings extends FormApplication {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: "lore-assistant-settings",
			title: "AI Lore Assistant Settings",
			template:
				"modules/foundry-vtt-lore-assistant/templates/settings.hbs",
			width: 500,
			height: 600,
			closeOnSubmit: true,
		});
	}

	static registerSettings() {
		// API Key
		game.settings.register("foundry-vtt-lore-assistant", "apiKey", {
			name: "OpenAI API Key",
			hint: "Your OpenAI API key. You can get one from https://platform.openai.com/api-keys",
			scope: "world",
			config: false,
			type: String,
			default: "",
		});

		// Model selection
		game.settings.register("foundry-vtt-lore-assistant", "model", {
			name: "AI Model",
			hint: "The OpenAI model to use for generating content.",
			scope: "world",
			config: false,
			type: String,
			choices: {
				"gpt-3.5-turbo": "GPT-3.5 Turbo (Faster, less expensive)",
				"gpt-4": "GPT-4 (More capable, more expensive)",
				"gpt-4-turbo": "GPT-4 Turbo (Best balance)",
				"gpt-4o": "GPT-4o (Latest model)",
			},
			default: "gpt-3.5-turbo",
		});

		// Max tokens
		game.settings.register("foundry-vtt-lore-assistant", "maxTokens", {
			name: "Max Tokens",
			hint: "Maximum number of tokens in the response (affects length and cost).",
			scope: "world",
			config: false,
			type: Number,
			range: {
				min: 100,
				max: 4000,
				step: 100,
			},
			default: 1000,
		});

		// Temperature
		game.settings.register("foundry-vtt-lore-assistant", "temperature", {
			name: "Creativity (Temperature)",
			hint: "Controls randomness. Lower values are more focused, higher values are more creative.",
			scope: "world",
			config: false,
			type: Number,
			range: {
				min: 0,
				max: 2,
				step: 0.1,
			},
			default: 0.8,
		});

		// Auto-save responses
		game.settings.register("foundry-vtt-lore-assistant", "autoSave", {
			name: "Auto-save Responses",
			hint: "Automatically save interesting responses as journal entries.",
			scope: "world",
			config: false,
			type: Boolean,
			default: false,
		});

		// Response format
		game.settings.register("foundry-vtt-lore-assistant", "responseFormat", {
			name: "Response Format",
			hint: "Preferred format for AI responses.",
			scope: "world",
			config: false,
			type: String,
			choices: {
				markdown: "Markdown",
				html: "HTML",
				plain: "Plain Text",
			},
			default: "markdown",
		});
	}

	getData() {
		return {
			apiKey: game.settings.get("foundry-vtt-lore-assistant", "apiKey"),
			model: game.settings.get("foundry-vtt-lore-assistant", "model"),
			maxTokens: game.settings.get(
				"foundry-vtt-lore-assistant",
				"maxTokens"
			),
			temperature: game.settings.get(
				"foundry-vtt-lore-assistant",
				"temperature"
			),
			autoSave: game.settings.get(
				"foundry-vtt-lore-assistant",
				"autoSave"
			),
			responseFormat: game.settings.get(
				"foundry-vtt-lore-assistant",
				"responseFormat"
			),
			models: {
				"gpt-3.5-turbo": "GPT-3.5 Turbo (Faster, less expensive)",
				"gpt-4": "GPT-4 (More capable, more expensive)",
				"gpt-4-turbo": "GPT-4 Turbo (Best balance)",
				"gpt-4o": "GPT-4o (Latest model)",
			},
			formats: {
				markdown: "Markdown",
				html: "HTML",
				plain: "Plain Text",
			},
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		html.find("#test-connection").on(
			"click",
			this._onTestConnection.bind(this)
		);
		html.find("#reset-settings").on(
			"click",
			this._onResetSettings.bind(this)
		);
	}

	async _onTestConnection(event) {
		event.preventDefault();

		const button = $(event.currentTarget);
		const originalText = button.text();

		button.text("Testing...").prop("disabled", true);

		try {
			// Temporarily save current form values
			const formData = this._getSubmitData();
			await game.settings.set(
				"foundry-vtt-lore-assistant",
				"apiKey",
				formData.apiKey
			);
			await game.settings.set(
				"foundry-vtt-lore-assistant",
				"model",
				formData.model
			);

			const success = await game.loreAssistant.api.testConnection();

			if (success) {
				ui.notifications.info("✅ Connection successful!");
			} else {
				ui.notifications.error(
					"❌ Connection failed. Please check your API key and settings."
				);
			}
		} catch (error) {
			ui.notifications.error(`❌ Connection failed: ${error.message}`);
		}

		button.text(originalText).prop("disabled", false);
	}

	_onResetSettings(event) {
		event.preventDefault();

		Dialog.confirm({
			title: "Reset Settings",
			content:
				"<p>Are you sure you want to reset all settings to their default values?</p>",
			yes: () => {
				this.element.find("#apiKey").val("");
				this.element.find("#model").val("gpt-3.5-turbo");
				this.element.find("#maxTokens").val(1000);
				this.element.find("#temperature").val(0.8);
				this.element.find("#autoSave").prop("checked", false);
				this.element.find("#responseFormat").val("markdown");
			},
		});
	}

	async _updateObject(event, formData) {
		await game.settings.set(
			"foundry-vtt-lore-assistant",
			"apiKey",
			formData.apiKey
		);
		await game.settings.set(
			"foundry-vtt-lore-assistant",
			"model",
			formData.model
		);
		await game.settings.set(
			"foundry-vtt-lore-assistant",
			"maxTokens",
			formData.maxTokens
		);
		await game.settings.set(
			"foundry-vtt-lore-assistant",
			"temperature",
			formData.temperature
		);
		await game.settings.set(
			"foundry-vtt-lore-assistant",
			"autoSave",
			formData.autoSave
		);
		await game.settings.set(
			"foundry-vtt-lore-assistant",
			"responseFormat",
			formData.responseFormat
		);

		ui.notifications.info("Settings saved successfully!");
	}
}
