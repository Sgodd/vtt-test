import { LoreAssistantApp } from "./lore-assistant-app.mjs";
import { LoreAssistantAPI } from "./lore-assistant-api.mjs";
import { LoreAssistantSettings } from "./lore-assistant-settings.mjs";

// Initialize the module
Hooks.once("init", async function () {
	console.log("AI Lore Assistant | Initializing...");

	// Register module settings
	LoreAssistantSettings.registerSettings();

	// Register the application
	game.loreAssistant = {
		app: null,
		api: new LoreAssistantAPI(),
	};

	console.log("AI Lore Assistant | Initialized");
});

// Add the Lore Assistant button to the sidebar
Hooks.once("ready", async function () {
	console.log("AI Lore Assistant | Ready");

	// Add button to sidebar
	const sidebarTab = $(`
        <li class="scene-control" data-control="lore-assistant" title="AI Lore Assistant">
            <i class="fas fa-book-open"></i>
        </li>
    `);

	$("#sidebar-tabs").append(sidebarTab);

	// Add event listener for the button
	sidebarTab.on("click", () => {
		if (!game.loreAssistant.app) {
			game.loreAssistant.app = new LoreAssistantApp();
		}
		game.loreAssistant.app.render(true);
	});
});

// Register chat commands
Hooks.on("chatMessage", (app, message, data) => {
	if (message.startsWith("/lore")) {
		const query = message.substring(5).trim();
		if (query) {
			if (!game.loreAssistant.app) {
				game.loreAssistant.app = new LoreAssistantApp();
			}
			game.loreAssistant.app.render(true);
			// Set the query in the app
			setTimeout(() => {
				game.loreAssistant.app.setQuery(query);
			}, 100);
		}
		return false; // Prevent the message from being sent to chat
	}
});

// Add context menu option to actors and items
Hooks.on("getActorSheetHeaderButtons", (app, buttons) => {
	buttons.unshift({
		label: "Generate Lore",
		class: "lore-assistant-generate",
		icon: "fas fa-book-open",
		onclick: () => {
			if (!game.loreAssistant.app) {
				game.loreAssistant.app = new LoreAssistantApp();
			}
			game.loreAssistant.app.render(true);
			setTimeout(() => {
				const actorName = app.actor.name;
				const actorType = app.actor.type;
				game.loreAssistant.app.setQuery(
					`Generate background lore for ${actorName}, a ${actorType}`
				);
			}, 100);
		},
	});
});

Hooks.on("getItemSheetHeaderButtons", (app, buttons) => {
	buttons.unshift({
		label: "Generate Lore",
		class: "lore-assistant-generate",
		icon: "fas fa-book-open",
		onclick: () => {
			if (!game.loreAssistant.app) {
				game.loreAssistant.app = new LoreAssistantApp();
			}
			game.loreAssistant.app.render(true);
			setTimeout(() => {
				const itemName = app.item.name;
				const itemType = app.item.type;
				game.loreAssistant.app.setQuery(
					`Generate lore and history for ${itemName}, a ${itemType}`
				);
			}, 100);
		},
	});
});
