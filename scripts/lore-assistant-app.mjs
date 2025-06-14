export class LoreAssistantApp extends Application {
	constructor(options = {}) {
		super(options);
		this.currentQuery = "";
		this.conversationHistory = [];
		this.isGenerating = false;
	}

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: "lore-assistant",
			title: "AI Lore Assistant",
			template:
				"modules/foundry-vtt-lore-assistant/templates/lore-assistant.hbs",
			width: 600,
			height: 700,
			resizable: true,
			tabs: [
				{
					navSelector: ".tabs",
					contentSelector: ".tab-content",
					initial: "generator",
				},
			],
		});
	}

	getData() {
		return {
			isGenerating: this.isGenerating,
			conversationHistory: this.conversationHistory,
			currentQuery: this.currentQuery,
			hasApiKey: !!game.settings.get(
				"foundry-vtt-lore-assistant",
				"apiKey"
			),
			worldName: game.world.title,
		};
	}

	activateListeners(html) {
		super.activateListeners(html);

		// Query submission
		html.find("#lore-query-form").on(
			"submit",
			this._onSubmitQuery.bind(this)
		);
		html.find("#generate-lore").on(
			"click",
			this._onGenerateLore.bind(this)
		);

		// Quick action buttons
		html.find(".quick-action").on("click", this._onQuickAction.bind(this));

		// Clear conversation
		html.find("#clear-conversation").on(
			"click",
			this._onClearConversation.bind(this)
		);

		// Settings button
		html.find("#open-settings").on(
			"click",
			this._onOpenSettings.bind(this)
		);

		// Export conversation
		html.find("#export-conversation").on(
			"click",
			this._onExportConversation.bind(this)
		);

		// Insert to journal
		html.find(".insert-journal").on(
			"click",
			this._onInsertToJournal.bind(this)
		);

		// Copy to clipboard
		html.find(".copy-response").on(
			"click",
			this._onCopyResponse.bind(this)
		);
	}

	setQuery(query) {
		this.currentQuery = query;
		if (this.rendered) {
			this.element.find("#lore-query").val(query);
		}
	}

	async _onSubmitQuery(event) {
		event.preventDefault();
		await this._onGenerateLore();
	}

	async _onGenerateLore() {
		const query = this.element.find("#lore-query").val().trim();
		if (!query) return;

		if (!game.settings.get("foundry-vtt-lore-assistant", "apiKey")) {
			ui.notifications.warn(
				"Please configure your API key in the module settings first."
			);
			this._onOpenSettings();
			return;
		}

		this.isGenerating = true;
		this.render();

		try {
			const response = await game.loreAssistant.api.generateLore(query, {
				worldContext: this._getWorldContext(),
				conversationHistory: this.conversationHistory.slice(-10), // Keep last 10 exchanges
			});

			this.conversationHistory.push({
				id: foundry.utils.randomID(),
				query: query,
				response: response,
				timestamp: new Date().toISOString(),
			});

			// Clear the input
			this.element.find("#lore-query").val("");
		} catch (error) {
			console.error("AI Lore Assistant | Error generating lore:", error);
			ui.notifications.error(
				"Failed to generate lore. Please check your API configuration."
			);
		}

		this.isGenerating = false;
		this.render();
	}

	_onQuickAction(event) {
		const action = event.currentTarget.dataset.action;
		const queries = {
			"random-npc":
				"Generate a random NPC with name, appearance, personality, and background",
			tavern: "Describe a tavern with its atmosphere, patrons, and rumors",
			"quest-hook": "Create an interesting quest hook or adventure seed",
			location:
				"Describe an interesting location with history and notable features",
			organization:
				"Create a faction or organization with goals and key members",
			mystery: "Generate a mystery or intrigue suitable for the campaign",
		};

		if (queries[action]) {
			this.element.find("#lore-query").val(queries[action]);
		}
	}

	_onClearConversation() {
		Dialog.confirm({
			title: "Clear Conversation",
			content:
				"<p>Are you sure you want to clear the entire conversation history?</p>",
			yes: () => {
				this.conversationHistory = [];
				this.render();
			},
		});
	}

	_onOpenSettings() {
		new LoreAssistantSettings().render(true);
	}

	async _onExportConversation() {
		if (this.conversationHistory.length === 0) {
			ui.notifications.info("No conversation to export.");
			return;
		}

		const content = this.conversationHistory
			.map((entry) => {
				return `**Query:** ${entry.query}\n\n**Response:**\n${entry.response}\n\n---\n`;
			})
			.join("\n");

		const timestamp = new Date()
			.toISOString()
			.slice(0, 19)
			.replace(/:/g, "-");
		const filename = `lore-assistant-export-${timestamp}.md`;

		const element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/markdown;charset=utf-8," + encodeURIComponent(content)
		);
		element.setAttribute("download", filename);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);

		ui.notifications.info(`Conversation exported as ${filename}`);
	}

	async _onInsertToJournal(event) {
		const entryId = event.currentTarget.dataset.entryId;
		const entry = this.conversationHistory.find((e) => e.id === entryId);

		if (!entry) return;

		const journalData = {
			name: `Lore: ${entry.query.substring(0, 50)}...`,
			content: `<h2>${entry.query}</h2>\n<div class="lore-response">${entry.response}</div>`,
			folder: null,
		};

		try {
			const journal = await JournalEntry.create(journalData);
			ui.notifications.info(`Created journal entry: ${journal.name}`);
		} catch (error) {
			console.error("Error creating journal entry:", error);
			ui.notifications.error("Failed to create journal entry.");
		}
	}

	_onCopyResponse(event) {
		const entryId = event.currentTarget.dataset.entryId;
		const entry = this.conversationHistory.find((e) => e.id === entryId);

		if (!entry) return;

		navigator.clipboard
			.writeText(entry.response)
			.then(() => {
				ui.notifications.info("Response copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy text:", err);
				ui.notifications.error("Failed to copy to clipboard.");
			});
	}

	_getWorldContext() {
		const world = game.world;
		const actors = game.actors.contents.map((a) => ({
			name: a.name,
			type: a.type,
		}));
		const scenes = game.scenes.contents.map((s) => s.name);
		const journals = game.journal.contents.map((j) => j.name);

		return {
			worldName: world.title,
			worldDescription: world.description || "",
			actorCount: actors.length,
			sceneNames: scenes.slice(0, 10), // Limit to avoid token limits
			journalNames: journals.slice(0, 10),
			gameSystem: game.system.id,
		};
	}
}
