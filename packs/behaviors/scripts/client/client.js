const clientSystem = client.registerSystem(0, 0);

// Setup which events to listen for
clientSystem.initialize = function ()
{
	// const eventDataDefaults = {narf: false};
	// clientSystem.registerEventData("gettingstarted:pinky", eventDataDefaults);
	const scriptLoggerConfig =
		clientSystem.createEventData("minecraft:script_logger_config");
	scriptLoggerConfig.data.log_errors = true;
	scriptLoggerConfig.data.log_information = true;
	scriptLoggerConfig.data.log_warnings = true;
	clientSystem
		.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);

	this.listenForEvent("minecraft:client_entered_world", (eventData) =>
		this.onClientEnteredWorld(eventData));
};

clientSystem.update = () =>
{
};

clientSystem.onClientEnteredWorld = function (eventData)
 {
    // Client has entered the world, show the starting screen
    let loadEventData = this.createEventData("minecraft:load_ui");
    loadEventData.data.path = "settings.html";
    loadEventData.data.options.is_showing_menu = false;
    loadEventData.data.options.absorbs_input = true;
    clientSystem.broadcastEvent("minecraft:load_ui", loadEventData);

    // Notify the server script that the player has finished loading in.
  //   let clientEnteredEventData = this.createEventData("rpg_game:client_entered_world");
	// aClientSystem.broadcastEvent("rpg_game:client_entered_world", clientEnteredEventData);
};
