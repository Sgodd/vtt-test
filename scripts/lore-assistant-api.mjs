export class LoreAssistantAPI {
	constructor() {
		this.baseUrl = "https://api.openai.com/v1/chat/completions";
	}

	async generateLore(prompt, options = {}) {
		const apiKey = game.settings.get(
			"foundry-vtt-lore-assistant",
			"apiKey"
		);
		const model = game.settings.get("foundry-vtt-lore-assistant", "model");
		const maxTokens = game.settings.get(
			"foundry-vtt-lore-assistant",
			"maxTokens"
		);
		const temperature = game.settings.get(
			"foundry-vtt-lore-assistant",
			"temperature"
		);

		if (!apiKey) {
			throw new Error("API key not configured");
		}

		const systemPrompt = this._buildSystemPrompt(options.worldContext);
		const messages = this._buildMessages(
			systemPrompt,
			prompt,
			options.conversationHistory
		);

		const requestBody = {
			model: model,
			messages: messages,
			max_tokens: maxTokens,
			temperature: temperature,
			presence_penalty: 0.6,
			frequency_penalty: 0.3,
		};

		try {
			const response = await fetch(this.baseUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(
					`API request failed: ${response.status} ${
						response.statusText
					}${errorData ? " - " + JSON.stringify(errorData) : ""}`
				);
			}

			const data = await response.json();

			if (!data.choices || !data.choices[0] || !data.choices[0].message) {
				throw new Error("Invalid API response format");
			}

			return data.choices[0].message.content.trim();
		} catch (error) {
			console.error("AI Lore Assistant | API Error:", error);
			throw error;
		}
	}

	_buildSystemPrompt(worldContext) {
		let systemPrompt = `You are an expert AI lore assistant for tabletop role-playing games. Your role is to help Game Masters and players create rich, immersive world-building content including:

- NPCs with detailed backgrounds, motivations, and personalities
- Locations with atmospheric descriptions and history
- Plot hooks and quest ideas
- Organizations, factions, and political intrigue
- Cultural details and customs
- Historical events and legends
- Items with interesting backstories

Guidelines:
1. Always provide creative, original content that fits typical fantasy/RPG settings
2. Keep responses detailed but concise (200-800 words typically)
3. Include practical details that can be used in gameplay
4. Consider how your suggestions fit into broader campaign narratives
5. Ask clarifying questions if the request is too vague
6. Format responses with clear headings and bullet points when appropriate
7. Include hooks for further development or player interaction`;

		if (worldContext) {
			systemPrompt += `\n\nCURRENT CAMPAIGN CONTEXT:
- World Name: ${worldContext.worldName}
- Game System: ${worldContext.gameSystem}
- World Description: ${
				worldContext.worldDescription || "No description provided"
			}
- Number of Actors/NPCs: ${worldContext.actorCount}`;

			if (worldContext.sceneNames && worldContext.sceneNames.length > 0) {
				systemPrompt += `\n- Known Locations: ${worldContext.sceneNames.join(
					", "
				)}`;
			}

			if (
				worldContext.journalNames &&
				worldContext.journalNames.length > 0
			) {
				systemPrompt += `\n- Existing Lore/Journals: ${worldContext.journalNames.join(
					", "
				)}`;
			}

			systemPrompt += `\n\nPlease consider this context when generating content to ensure consistency with the existing campaign world.`;
		}

		return systemPrompt;
	}

	_buildMessages(systemPrompt, currentPrompt, conversationHistory = []) {
		const messages = [{ role: "system", content: systemPrompt }];

		// Add conversation history (keep it manageable)
		if (conversationHistory && conversationHistory.length > 0) {
			conversationHistory.forEach((entry) => {
				messages.push(
					{ role: "user", content: entry.query },
					{ role: "assistant", content: entry.response }
				);
			});
		}

		// Add current prompt
		messages.push({ role: "user", content: currentPrompt });

		return messages;
	}

	async testConnection() {
		try {
			await this.generateLore(
				'Test connection - respond with "Connection successful!"'
			);
			return true;
		} catch (error) {
			console.error("Connection test failed:", error);
			return false;
		}
	}
}
